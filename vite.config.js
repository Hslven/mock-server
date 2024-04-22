import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
import { PORT } from "./common";
export default defineConfig({
    base: "./",
    plugins: [
        vue(),
        vueJsx(),
        monacoEditorPlugin({
            languageWorkers: ["typescript", "json", "html"],
        }),
    ],
    resolve: {
        alias: {
            "@": "/src",
            "~": "/",
        },
    },
    //   build: {
    //     rollupOptions: {
    //       // 若有 tree shaking 需要优化，可以添加 commonjs()
    //       external: ["vue"],
    //       output: {
    //         assetFileNames: ({ name }) => {
    //           if (/\.css$/.test(name))
    //             return "static/css/[name].[hash].css";
    //           return "static/[ext]/[name].[hash][extname]";
    //         },
    //       },
    //     },
    //   },
    // 配置启动端口
    server: {
        port: PORT,
    },
});

// https://vitejs.dev/config/
