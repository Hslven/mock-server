<script setup lang="tsx">
import JsonEditor from "@/components/jsoneditor.vue";
// import CodeMirror from "@/components/CodeMirror.vue";
import type { ICode } from "../interface/codeMirror";
import { ref, computed, watch, Ref, inject } from "vue";
import { useStore } from "vuex";

const codeMirror = ref<any>(null);
const store = useStore();

// 这里修改使用inject
// const props = defineProps({
//   activityDetail: Object,
// });
const activityDetail = computed(() => store.state.currentActivity);
console.log(activityDetail.value);
// const activityDetail = inject<Ref<ICode>>("activityDetail");

// 点击事件获取activityDetail数据后渲染对应数据
// watch(
//   () => activityDetail.value,
//   (newVal) => {
//     input.value = newVal.url;
//     select.value = newVal.method;
//   },
// );
const options = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
  { label: "PATCH", value: "PATCH" },
];
</script>

<template>
  <div class="base-box">
    
    <div style="display: flex; margin-bottom: 12px">
      <t-select
        autoWidth
        v-model="activityDetail.method"
        :options="options"
        style="width: fit-content; margin-right: -1px"
      ></t-select>
      <t-input v-model="activityDetail.url"></t-input>
    </div>
    <!-- <CodeMirror
      ref="codeMirror"
      :jsonData.sync="activityDetail.json"
    ></CodeMirror> -->
    <JsonEditor :jsonData="activityDetail.json" />
  </div>
</template>

<style scoped>
:deep(.t-collapse-panel__content) {
  padding: 12px;
}
</style>
