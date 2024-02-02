/**
 * @description: vue文件类型声明
 * 解决：tsconfig.json在目录下找不到ts文件
 */
declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }