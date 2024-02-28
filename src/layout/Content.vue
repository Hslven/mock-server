<script setup lang="tsx">
// import JsonEditor from "@/components/jsoneditor.vue";
import Monaco from "@/components/Monaco.vue";
import { ref,watchEffect,onMounted,onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { cloneDeep,debounce } from "lodash";

const store = useStore();
const activityDetail = ref({
  url: "",
  json: {},
  method: "GET",
});
watchEffect(() => {
  activityDetail.value = cloneDeep(store.state.currentActivity);
  console.log(activityDetail.value);
});

const options = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
  { label: "PATCH", value: "PATCH" },
];

const save = debounce((event) => {
  if (event.key === "d") {
    event.preventDefault();
    console.log(store.state);
  }
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    console.log(activityDetail.value)
    // 保存 activityDetail 的代码
    store.commit("saveActivity",activityDetail.value);
  }
}, 200);
onMounted(() => {
  window.addEventListener("keydown", save);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", save);
});
</script>

<template>
  <div class="base-box">
    <div style="display: flex; margin-bottom: 12px">
      <t-select
        autoWidth
        v-model="activityDetail.method"
        default-value="GET"
        :options="options"
        style="width: fit-content; margin-right: -1px"
      ></t-select>
      <t-input v-model="activityDetail.url"></t-input>
    </div>
    <Monaco :data="activityDetail.json"></Monaco>
  </div>
</template>

<style scoped>
:deep(.t-collapse-panel__content) {
  padding: 12px;
}
</style>
