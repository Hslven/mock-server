/**
 * @description: vue文件类型声明
 * 解决：找不到模块“@/components/CodeMirror.vue”或其相应的类型声明。ts(2307)
 */
declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }