import { createApp } from 'vue'
import TDesign from 'tdesign-vue-next';
import App from './App.vue';
import './style.css'
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
// 全局指令
import directive from '@/components/directive';
// vuex
import store from './store';


const app = createApp(App);

app.use(directive);
app.use(store);
app.use(TDesign).mount('#app')
