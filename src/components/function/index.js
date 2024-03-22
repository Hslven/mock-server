// Message.js文件
import {
    createApp
} from 'vue'
import MessageBox from "./MessageBox/index.vue"
import {
    Dialog,
    Button
} from 'tdesign-vue-next';

export function showMsg(msg, onClick) {
    const div = document.createElement('div');
    document.body.appendChild(div)
    //渲染组件
    const app = createApp(MessageBox, {
        props: {
            content: msg,
        }
    });
    app.component('t-button', Button)
        .component('t-dialog', Dialog)

    app.mount(div)
}