const fs = require('fs');
const path = require('path')
const { exec, spawn } = require('child_process');
const { ipcMain, BrowserWindow } = require('electron')
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
    const data = await fs.promises.readFile(filePath, 'utf-8');
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

// ipcMain.handle('start-service', async (event) => {
//     const childProcess = spawn('node', ['C:/Users/dev04/Desktop/node_modules(1)'])
//     let data = {
//         status: 0,
//         message: '服务启动成功',
//         data: childProcess
//     }
//     childProcess.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);
//         event.reply('start-service', data.toString());
//     });
//     childProcess.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });
//     childProcess.on('close', (code) => {
//         console.log(`子进程退出，退出码 ${code}`);
//     });
//     return childProcess;
// });

// 启动服务
ipcMain.handle('start-service', async (event) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn('node', ['C:/Users/dev04/Desktop/node_modules(1)']);
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
            result.message = data.toString();
        });

        childProcess.on('close', (code) => {
            result.message = `子进程退出，退出码 ${code}`;
            resolve(result);
        });

        childProcess.on('error', (error) => {
            reject(error);
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