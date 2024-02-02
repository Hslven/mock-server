<script setup>
import { ref, onMounted } from "vue";
// 设置暗色模式
document.documentElement.setAttribute("theme-mode", "dark");

// 获取数据
const activityList = ref([]);
onMounted(async () => {
  activityList.value = await base.getFileJson();
});

// 获取详情传出
const getActivityDetail = (id) => {
  const data  = activityList.value.find(
    (item) => item.id === id,
  );
  emit("getActivityDetail", data);
};

const addContext = () => {};
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
        <t-row> 8 days ago </t-row>
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
