<script setup lang="tsx">
import JsonEditor from "@/components/jsoneditor.vue";
import CodeMirror from "@/components/CodeMirror.vue";

import { ref, computed, inject, provide } from "vue";
const codeMirror = ref<any>(null);
// const data = computed(() => codeMirror.value?.data);
const getdata = () => {
  return codeMirror.value?.data;
};


const protocolSelect = ref(() => (
  <t-select
    autoWidth
    options={['GET', 'POST','PUT','DELETE','PUTCH'].map((value) => ({ label: value, value }))}
    defaultValue="GET"
  />
))

// 输送数据
defineExpose({
  getdata,
});
</script>

<template>
  <div class="base-box">
    <div>
      <t-input-adornment
        :prepend="protocolSelect"
      >
        <t-input />
      </t-input-adornment>
    </div>
    <CodeMirror ref="codeMirror"></CodeMirror>
  </div>
</template>

<style scoped>
:deep(.t-collapse-panel__content) {
  padding: 12px;
}
</style>
