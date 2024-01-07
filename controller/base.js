const { ipcMain, BrowserWindow } = require('electron')
const fs = require('fs');
const path = require('path')
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

ipcMain.on('get-json', async (e, data) => {
    // win.maximize()
    // 将数据写入文件
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

