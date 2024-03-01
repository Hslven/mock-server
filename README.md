# 介绍
该项目旨在简化前端与后端的交互过程，实现前后端开发解耦。通过这种方法，前端开发可以摆脱对后端服务实际实现的完全依赖，在后端接口尚未完备的情况下，先行构建并高效推进前端功能的开发。

率先创建并利用 Mock Server，该服务能精确模拟后端接口的行为和响应数据，确保前端应用能够在接近真实的环境下进行功能调试、界面布局及交互设计。这样一来，前端开发得以独立开展，显著提升了开发速度与灵活性。

待到后端接口开发完毕，前端仅需简单地将请求地址从 Mock 接口切换至实际后端接口，无缝衔接前后端，从而大幅提高团队间的协作效率，有力推动项目的并行开发进程。


# 技术栈
Vue3+Electron+Vuex+Tdesign

# 安全简便

数据存储在本地文件，相同项目直接移动统一文件即可直接使用

# 启动方式
```
npm run dev
npm run start
```
## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

- [ ] 添加删除
- [x] content输入框左侧可选请求类型
- [x] 能够启动mock
- [ ] 需要能够编辑后重新启动
- [ ] 允许自定义创建Random
- [ ] 允许打开某个文件加载