<script setup>
import JsonEditor from "@/components/jsoneditor.vue";
import CodeMirror from "@/components/CodeMirror.vue";
import { ref, computed, inject, provide } from "vue";

const transformProcess = (data) => {
  //   system.windowMax()
  //   console.log(123)
  // myApi.sendUrl(data)
  // myApi.window(data)
};
const codeMirror = ref(null);
// const data = computed(() => codeMirror.value?.data);
const getdata=()=>{
  return codeMirror.value?.data
}
// 输送数据
defineExpose({
  getdata
});
</script>

<template>
  <div class="base-box">
    <t-collapse
      :expandOnRowClick="false"
      :disabled="disabled"
      :borderless="true"
      :defaultExpandAll="true"
    >
      <t-collapse-panel value="1">
        <template #header>
          <t-input></t-input>
        </template>
        <template #default>
          <t-button @click="getData">123</t-button>
          <!-- <JsonEditor ref="jsonEdit"></JsonEditor> -->
          <CodeMirror ref="codeMirror"></CodeMirror>
        </template>
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<style scoped>
:deep(.t-collapse-panel__content) {
  padding: 12px;
}
</style>
