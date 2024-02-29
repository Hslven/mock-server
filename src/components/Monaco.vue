<script setup>
// 在你的Vue3组件中
import { onMounted, ref, watchEffect, watch, toRaw } from "vue";
import * as monaco from "monaco-editor";

const props = defineProps({
  data: String,
});

const editorRef = ref(null); // 用于存放编辑器实例的ref
// toRaw(editorRef.value).onDidChangeModelContent(() => { });
watch(
  () => props.data,
  (newData) => {
    toRaw(editorRef.value).setValue(newData, null, 2);
  },
);

const getMonacoData = () => {
  // 如果空，返回空对象
  if (!toRaw(editorRef.value).getValue()) {
    return {};
  }
  //   return JSON.parse(toRaw(editorRef.value).getValue());
  return toRaw(editorRef.value).getValue();
};

onMounted(() => {
  editorRef.value = monaco.editor.create(
    document.getElementById("monaco-container"),
    {
      value: "",
      language: "javascript",
      theme: "vs-dark",
      autoIndent: true, //自动布局
      quickSuggestionsDelay: 100, //代码提示延时
    },
  );
});

defineExpose({
  getMonacoData,
});
</script>

<template>
  {{ props.data }}
  <div id="monaco-container" style="width: 100%; height: 600px"></div>
</template>

<style scoped>
.editor-container {
  width: 100%;
}
.monaco-editor {
  width: 100%;
}
</style>
