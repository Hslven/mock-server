<script setup>
// 在你的Vue3组件中
import { onMounted, ref, watch, toRaw } from "vue";
import * as monaco from "monaco-editor";

const editorRef = ref(null); // 用于存放编辑器实例的ref
const props = defineProps({
  data: Object,
});
// toRaw(editorRef.value).onDidChangeModelContent(() => {
//     // console.log(toRaw(editorRef.value).getValue());
//     const newValue = JSON.parse(toRaw(editorRef.value).getValue());
//     emit('update:data', newValue);
//     console.log(props.data);
//   });

co con's't

onMounted(() => {
  editorRef.value = monaco.editor.create(
    document.getElementById("monaco-container"),
    {
      value: "",
      language: "json",
      theme: "vs-dark",
      autoIndent: true, //自动布局
      quickSuggestionsDelay: 100, //代码提示延时
    },
  );
});
watch(
  () => props.data,
  (newData) => {
    toRaw(editorRef.value).setValue(JSON.stringify(newData, null, 2));
  },
);
</script>

<template>
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
