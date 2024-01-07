<script setup>
import Content from "./layout/Content.vue";
import AsideMenu from "./layout/Aside.vue";
import { ref, onMounted, inject, provide } from "vue";
// 设置暗色模式
document.documentElement.setAttribute("theme-mode", "dark");

const content = ref(null);
const connection = () => {
  const data = content.value.getdata()
  base.getJson(data);
};
</script>

<template>
  <t-layout style="height: 100vh">
    <t-aside style="flex: 2">
      <AsideMenu></AsideMenu>
    </t-aside>
    <t-layout style="flex: 6">
      <!-- <t-header class="header">Header</t-header> -->
      <t-content>
        <t-row><t-button @click="connection">启动</t-button></t-row>
        <Content ref="content" />
      </t-content>
      <!-- <t-footer>Footer</t-footer> -->
    </t-layout>
  </t-layout>
</template>

<style scoped>
.header {
  /* -webkit-app-region: drag; */
  height: 30px;
  background: var(--primary-color);
}
</style>
