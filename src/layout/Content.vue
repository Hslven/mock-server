<script setup lang="tsx">
// import JsonEditor from "@/components/jsoneditor.vue";
import CodeMirror from "@/components/CodeMirror.vue";

import { ref, onMounted, inject, provide, Ref } from "vue";
const codeMirror = ref<any>(null);
const getdata = () => {
  return codeMirror.value?.data;
};

// 这里修改使用inject
// const props = defineProps({
//   activityDetail: Object,
// });
const activityDetail = inject<Ref<{ method: string }>>("activityDetail");
const protocolSelect = ref(() => (
  <t-select
    autoWidth
    options={["GET", "POST", "PUT", "DELETE", "PATCH"].map(
      (value) => ({ label: value, value }),
    )}
    defaultValue="GET"
    value={activityDetail.value.method}
    /* value={props.activityDetail.method} */
  />
));
// 输送数据
defineExpose({
  getdata,
});
</script>

<template>
  <div class="base-box">
    <div>
      <t-input-adornment :prepend="protocolSelect">
        <t-input />
      </t-input-adornment>
    </div>
    <CodeMirror ref="codeMirror" :value="activityDetail"></CodeMirror>
  </div>
</template>

<style scoped>
:deep(.t-collapse-panel__content) {
  padding: 12px;
}
</style>
