<script setup>
import Content from "./layout/Content.vue";
import Aside from "./layout/Aside.vue";
import {
  ref,
  onMounted,
  onBeforeUnmount,
  inject,
  provide,
} from "vue";
import { useStore } from "vuex";
// 设置暗色模式
document.documentElement.setAttribute("theme-mode", "dark");
const store = useStore();
// 获取详情传入Conetnt
// const activityDetail = ref({
//   method: "GET",
//   url: "",
//   json: {},
// });
// provide("activityDetail", activityDetail);

// const getActivityDetail = (data) => {
//   activityDetail.value = data;
//   console.log(activityDetail.value);
//   // 这里不需要provide，默认是响应式
// };



</script>

<template>
  <t-layout style="height: 100vh">
    <t-aside style="width: 100%;">
      <!-- <Aside @getActivityDetail="getActivityDetail"></Aside> -->
      <Aside style="width: 250px;"></Aside>
    </t-aside>
    <t-layout>
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
