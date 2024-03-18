import { createApp } from "vue";
import TDesign from "tdesign-vue-next";
import App from "./App.vue";
import i18n from "./i18n";
// 引入组件库的少量全局样式变量
import "tdesign-vue-next/es/style/index.css";
import "./style.css";
// 全局指令
import directive from "@/components/directive";
// vuex
import store from "./store";

const app = createApp(App);

app.use(directive).use(store).use(TDesign).use(i18n).mount("#app");
