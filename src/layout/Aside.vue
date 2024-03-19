<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { throttle } from "lodash";
import { useStore } from "vuex";
import type { ICode } from "../interface/codeMirror";
import { MessagePlugin } from "tdesign-vue-next";
import ButtonAdamgiebl from "@/components/dom/ButtonAdamgiebl.vue";
import { useApproximateDate } from "@/hooks/index";

// 设置暗色模式
document.documentElement.setAttribute("theme-mode", "dark");
const store = useStore();
const activityList = computed(() => store.state.activityList);
const activityId = ref(null);
const files = ref([]);
const emit = defineEmits(["getActivityDetail"]);

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
const newActivity = throttle(() => {
  store.commit("createActivity");
}, 1000);

// 删除活动
const deleteActivity = () => {
  const index = activityList.value.findIndex(
    (item) => item.id === activityId.value,
  );
  store.commit("deleteActivity", activityList.value[index].id);
  store.commit("setCurrentActivity", activityList.value[index]);
};

const startService = async () => {
  // @ts-ignore
  const { code, message } = await service.startService();
  if (code) {
    return MessagePlugin.error("服务启动失败：" + message);
  }
  MessagePlugin.success("服务启动成功：" + message);
};

onMounted(async () => {
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
      <t-button @click="newActivity">{{ $t("button.new") }}</t-button>
      <ButtonAdamgiebl @click="startService">{{
        $t("button.run")
      }}</ButtonAdamgiebl>
      <t-button @click="deleteActivity">{{
        $t("button.delete")
      }}</t-button>
    </t-row>
    <t-row style="height: 84vh; overflow-y: auto">
      <div
        class="aside-activity-list"
        :style="
          store.state.currentActivity.id === item.id
            ? 'background-color: #343538'
            : ''
        "
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
        <t-row>
          {{
            useApproximateDate(item.createTime)
          }}
        </t-row>
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
