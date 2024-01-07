const { contextBridge, ipcRenderer } = require('electron')


const getJson = (data) => ipcRenderer.send('get-json', data);


contextBridge.exposeInMainWorld('base', {
    getJson,
})
