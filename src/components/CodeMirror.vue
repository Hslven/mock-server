<script setup lang="ts">
import CodeMirror from "vue-codemirror6";
import { ref, watch, watchEffect, inject, Ref } from "vue";
import { oneDark } from "@codemirror/theme-one-dark";
import { json } from "@codemirror/lang-json";
import { debounce } from "lodash";
import type { ICode } from "../interface/codeMirror";
// 扩展
const extensions = [oneDark];
const props = defineProps({
  jsonData: Object,
});

// 初始化
// let activityDetail = inject<Ref<ICode>>("activityDetail");

let codeVal = ref("");
watchEffect(() => {
  codeVal.value = JSON.stringify(props.jsonData, null, "\t");
});

// 格式化 JSON
let error = ref("");
const formatJson = debounce(() => {
  try {
    const parsed = JSON.parse(codeVal.value);
    if (Object.keys(parsed).length === 0) return;
    codeVal.value = JSON.stringify(parsed, null, "\t");
    error.value = "";
  } catch (e) {
    // console.error(e.message);
    error.value = "* " + e.message;
  }
}, 300);
// 不知道为什么这里不会死循环
// watch(
//   () => codeVal.value,
//   debounce((_newVal) => {
//     formatJson();
//   }, 1000),
// );

// 输送数据
// defineExpose({
//   data: codeVal.value,
// });
</script>

<template>

  <code-mirror
    v-model="codeVal"
    basic
    :lang="json()"
    style="height: 400px"
    :extensions="extensions"
    @input="formatJson"
  />
  <!-- update:modelValue="formatJson"：这是 Vue 3 中的新语法，用于替代 Vue 2 中的.sync -->
  <code style="color: rgb(244, 38, 38)">{{ error }}</code>
</template>
<style>
/* required! */
.cm-editor {
  height: 100%;
}
</style>
