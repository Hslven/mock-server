<script setup>
import Content from "./layout/Content.vue";
import Aside from "./layout/Aside.vue";
import { ref, onMounted, inject, provide } from "vue";
// 设置暗色模式
document.documentElement.setAttribute("theme-mode", "dark");

// 获取详情传入Conetnt
const activityDetail = ref({
  method: "GET",
  url: "",
  data: "",
});
provide("activityDetail", activityDetail);

const getActivityDetail = (data) => {
  activityDetail.value = data;
  // 这里不需要provide，默认是响应式
};
</script>

<template>
  <t-layout style="height: 100vh">
    <t-aside style="flex: 2">
      <Aside @getActivityDetail="getActivityDetail"></Aside>
    </t-aside>
    <t-layout style="flex: 6">
      <!-- <t-header class="header">Header</t-header> -->
      <t-content>
        <!-- <Content ref="content" :activityDetail="activityDetail" /> -->
        <Content />
      </t-content>
      <!-- <t-footer>Footer</t-footer> -->
    </t-layout>
  </t-layout>
</template>

<style scoped></style>
