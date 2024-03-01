<script setup>
// 在你的Vue3组件中
import * as monaco from "monaco-editor";
import { onMounted, ref, watchEffect, toRaw } from "vue";
import { isEqual } from "lodash";
import { useStore } from "vuex";
const props = defineProps({
  data: String,
});
const store = useStore();
const editorRef = ref(null); // 用于存放编辑器实例的ref
const getMonacoData = () => toRaw(editorRef.value).getValue();

onMounted(() => {
  editorRef.value = monaco.editor.create(
    document.getElementById("monaco-container"),
    {
      value: "",
      language: "json",
      theme: "vs-dark",
      autoIndent: true, //自动布局
      quickSuggestionsDelay: 0, //代码提示延时
    },
  );

  // 赋值错误标记,如果有变化再执行,因为onDidChangeModelDecorations执行次数太多
  let markersCopy = [];
  toRaw(editorRef.value).onDidChangeModelDecorations((e) => {
    const markers = monaco.editor.getModelMarkers();
    if (!isEqual(markersCopy, markers)) {
      markersCopy = markers;
      store.commit("setEditorError", markers);
    }
  });

  // 首屏渲染以及选择活动的时候渲染
  watchEffect(() => {
    const newData = props.data;
    toRaw(editorRef.value).setValue(newData);
  });
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
