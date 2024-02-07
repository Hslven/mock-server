const { contextBridge, ipcRenderer } = require('electron')


const getFileJson = () => ipcRenderer.invoke('get-file-json');
const writeFileJson = (data) => ipcRenderer.send('write-file-json', data);
const startService = () => ipcRenderer.invoke('start-service',);
// const listenToProgress = () => ipcRenderer.on('service-start-progress', (event, data) => {
//     console.log(`Received start progress: ${data}`);
// });


contextBridge.exposeInMainWorld('service', {
    getFileJson,
    writeFileJson,
    startService
})
