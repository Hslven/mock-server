const fs = require('fs').promises;
const path = require('path')
const {
    exec,
    spawn
} = require('child_process');
const {
    ipcMain,
    BrowserWindow
} = require('electron')
const WebSocket = require('ws');

const getSource = (url) => {
    // const win = new BrowserWindow({
    //     width: 500,
    //     height: 500,
    //     show: false,
    //     webPreferences: {
    //         offscreen: true
    //     }
    // })
}

/**
 * 获取文件数据
 * 
 * @return Array
 */
ipcMain.handle('get-file-json', async () => {
    const filePath = path.join(__dirname, 'data.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
});

/**
 * 数据写入json
 * 
 * @return File
 */
ipcMain.on('write-file-json', async (e, data) => {
    // win.maximize()
    // 将数据写入文件
    console.log(data)
    const filePath = path.join(__dirname, 'data.json');
    // console.log(filePath)
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('写入文件失败:', err);
        } else {
            console.log('数据已成功写入文件');
        }
    });
})


// 启动服务
ipcMain.handle('start-service', async (event) => {
    const data = await fs.readFile(path.join(__dirname, 'data.json'), 'utf-8');
    const module = JSON.parse(data).map(item => {
        return {
            url: item.url,
            methods: item.method,
            response: `(ctx) => {return${JSON.stringify(item.json)}}`
        }
    })
    const content = `const Mock = require('mockjs');
    const Random = Mock.Random;
    module.exports = ${JSON.stringify(module,null,2)}
    `;
    const filePath = path.join(__dirname, '..', 'server', 'mock', 'primary', 'default.js');
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            return console.error('写入文件失败:', err);
        }
        console.log('数据已成功写入文件');
    });

    return new Promise(async (resolve, reject) => {

        const childProcess = spawn('node', ['server/index.js']);
        const result = {
            code: null,
            message: null,
        };

        childProcess.stdout.on('data', (data) => {
            result.code = 0;
            result.message = data.toString();
            // 发送启动进度更新
            resolve(result);
        });

        childProcess.stderr.on('data', (data) => {
            result.code = 1;
            if (data.toString().includes('EADDRINUSE')) {
                result.message = '服务已经启动';
            } else if (data.toString().includes('Error: Cannot find module')) {
                result.message = '请先安装依赖';
            } else {
                result.message = data.toString();
            }
            resolve(result);
        });
        // childProcess.on('close', (code) => {
        //     if (code !== 0) {
        //         result.code = 1;
        //         result.message = `服务异常退出，退出码：${code}`;
        //     } else if (childProcess.pid) {
        //         result.code = 0;
        //         result.message = `服务已经启动`;
        //     }
        //     resolve(result);
        // });

        childProcess.on('error', (error) => {
            result.code = 1;
            result.message = error.message;
            resolve(result);
        });
    });
});

// 关闭服务
ipcMain.handle('close-service', async (event, childProcess) => {
    return new Promise((resolve, reject) => {
        childProcess.kill();
        resolve();
    });
});