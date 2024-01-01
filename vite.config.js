import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { PORT } = require('./common')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置@代表src
  resolve: {
    alias: {
      '@': '/src'
    },

  },
  // 配置启动端口
  server: {
    port: PORT
  }
})
