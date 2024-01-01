const { ipcMain, BrowserWindow } = require('electron')
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

ipcMain.handle('on-url-event', async (e, url) => {
    const result = await getSource(url)
    // win.maximize()
    return result
})

