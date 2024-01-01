const { contextBridge, ipcRenderer } = require('electron')

const sendUrl = async (url) => {
    let result = await ipcRenderer.invoke('on-url-event', url)
    return result
}
const windowMin = () => ipcRenderer.send('window-min')
const windowMax =  () =>  ipcRenderer.send('window-max')
const windowClose = () => ipcRenderer.send('window-close')

contextBridge.exposeInMainWorld('myApi', {
    sendUrl,

})
contextBridge.exposeInMainWorld('system', {
    windowMin,
    windowMax,
    windowClose
})
