import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import  monacoEditorPlugin  from 'vite-plugin-monaco-editor';
import { PORT } from './common'
export default defineConfig({
    plugins: [vue(), vueJsx(), monacoEditorPlugin({
        languageWorkers: ['editorWorkerService', 'typescript', 'json', 'html']
    })],
    // 配置@代表src
    resolve: {
        alias: {
            '@': '/src',
            '~': '/'
        },
    },
    // 配置启动端口
    server: {
        port: PORT
    }
})

// https://vitejs.dev/config/