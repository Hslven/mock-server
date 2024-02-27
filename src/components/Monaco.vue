<script setup>
// 在你的Vue3组件中
import { onMounted, ref, watch, toRaw } from "vue";
import * as monaco from "monaco-editor";

const editorRef = ref(null); // 用于存放编辑器实例的ref
const props = defineProps({
  data: Object,
});
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
