const { app, BrowserWindow } = require('electron')
const { PORT } = require('./common')
const WinState = require('electron-win-state')
const path = require('path')
require('./controller/getSource')
//所有窗体
let windows = {
    mainWindow: null, //主窗口
}


const createWindow = () => {
    const winState = new WinState.default({
        dafaultWidth: 1000,
        defaultHeight: 800,
        electronStoreOptions: {
            name: 'window-state-main'
        }
    })
    windows.mainWindow = new BrowserWindow({
        // 自定义窗口状态
        ...winState.winOptions,
        frame: false, // 隐藏默认头部
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: false,
            preload: path.resolve(__dirname, './preload/index.js')
        }
    })
    windows.mainWindow.loadURL(`http://localhost:${PORT}/`)
    // 打开开发者工具
    windows.mainWindow.webContents.openDevTools()
    winState.manage(windows.mainWindow)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

