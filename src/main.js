import { createApp } from 'vue'
import './style.css'
import TDesign from 'tdesign-vue-next';
import App from './App.vue';
import directive from '@/components/directive';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
// 注册全局指令
app.use(directive);
app.use(TDesign).mount('#app')
