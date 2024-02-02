const { contextBridge, ipcRenderer } = require('electron')


const getFileJson = (data) => ipcRenderer.invoke('get-file-json', data);
const writeFileJson = (data) => ipcRenderer.send('write-file-json', data);

contextBridge.exposeInMainWorld('base', {
    getFileJson,
    writeFileJson
})
