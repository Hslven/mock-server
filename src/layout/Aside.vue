<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  Raw,
  onUnmounted,
  computed,
} from "vue";
import { throttle } from "lodash";
import { useStore } from "vuex";
import type { ICode } from "../interface/codeMirror";
import { debounce } from "lodash";
import { MessagePlugin } from "tdesign-vue-next";

// 设置暗色模式
document.documentElement.setAttribute("theme-mode", "dark");
const store = useStore();
const activityList = computed(() => store.state.activityList);
const activityId = ref(null);
const emit = defineEmits(["getActivityDetail"]);

// 获取数据
// const activityList = ref<ICode[]>([]);

// 获取详情
const getActivityDetail = (id: number) => {
  activityId.value = id;
  const data = activityList.value.find(
    (item: ICode) => item.id === id,
  );
  store.commit("setCurrentActivity", data);
};

// 添加活动
const newRequest = throttle(() => {
  store.commit("createActivity");
}, 1000);

const startService = async () => {
  // @ts-ignore
  const { code, message } = await service.startService();
  if (!code) {
    console.log(message);
    MessagePlugin.success('服务启动成功：'+message);
  }else{
    MessagePlugin.error('服务启动失败：'+message);
  }
};

onMounted(async () => {
  // @ts-ignore
  //   activityList.value = await base.getFileJson();
  await store.dispatch("awaitActivityList");
});

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
      <t-button @click="newRequest">New Request</t-button>
      <t-button @click="startService">Run Server</t-button>
      <!-- <t-button @click="saveFile">Save File</t-button> -->
    </t-row>
    <t-row>
      <div
        class="aside-activity-list"
        :style="store.state.currentActivity.id === item.id ? 'background-color: #343538' : ''"
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
        <t-row> {{ new Date(item.createTime).toLocaleString('zh-cn', { hour12: false }) }} </t-row>
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
