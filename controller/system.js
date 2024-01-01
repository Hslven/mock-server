const { ipcMain, BrowserWindow } = require('electron')
const { win } = require('../main.js')
//登录窗口最小化 
ipcMain.on('window-min', function () {
    win.minimize();
})
//登录窗口最大化 
ipcMain.handle('window-max', async ()=> {
    console.log(124)
    if (win.isFullScreen()) {
        win.setFullScreen(false);
    } else {
        win.setFullScreen(true);
    }
})
//登录窗口关闭
ipcMain.on('window-close', function () {
    win.close();
})