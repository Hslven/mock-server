<script setup lang="ts">
import { ref, onMounted, Raw, computed } from "vue";
import { throttle } from "lodash";
import { useStore } from "vuex";
import type { ICode } from "../interface/codeMirror";
// 设置暗色模式
const store = useStore();
document.documentElement.setAttribute("theme-mode", "dark");
const activityList = computed(() => store.state.activityList);
// 获取数据
// const activityList = ref<ICode[]>([]);
onMounted(async () => {
  // @ts-ignore
  // activityList.value = await base.getFileJson();
  await store.dispatch("awaitActivityList");
});

// 获取详情传出
const getActivityDetail = (id: number) => {
  const data = activityList.value.find(
    (item: ICode) => item.id === id,
  );
  //   emit("getActivityDetail", data);
  store.commit("setCurrentActivity", data);
};

// 添加活动
const addContext = throttle(() => {
  store.commit("createActivity");
  console.log(store.state.currentActivity)
}, 1000);
const saveFile = () => {};
const runServer = () => {};
const emit = defineEmits(["getActivityDetail"]);
</script>

<template>
  <div class="base-box-weaken">
    <t-row
      style="
        justify-content: center;
        gap: 12px;
        border-bottom: 1px solid #343538;
      "
    >
      <t-button @click="addContext">New Request</t-button>
      <t-button @click="runServer">Run Server</t-button>
      <t-button @click="saveFile">Save File</t-button>
    </t-row>
    <t-row>
      <div
        class="aside-activity-list"
        v-for="item in activityList"
        :key="item.id"
        @click="getActivityDetail(item.id)"
      >
        <t-row>
          <t-col style="margin-right: 12px" v-method="item.method">{{
            item.method
          }}</t-col>
          <t-col>{{ item.url }}</t-col>
        </t-row>
        <t-row> {{ item.createTime }} </t-row>
      </div>
    </t-row>
  </div>
</template>

<style scoped>
.t-row {
  width: 100%;
}
.aside-activity-list {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #343538;
}
.aside-activity-list:hover {
  /* 根据背景色，将亮度l调整为原背景色的1.2倍 */
  background-color: hsl(from var(--primary-color) h s calc(l * 1.2));
}
</style>
