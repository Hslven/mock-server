<script setup>
// 在你的Vue3组件中
import { onMounted, ref } from "vue";
import * as monaco from "monaco-editor";

const editorRef = ref(null); // 用于存放编辑器实例的ref

onMounted(() => {
    editorRef.value = monaco.editor.create(document.getElementById("monaco-container"), {
        value: "function hello() {\n\talert('Hello world!');\n}",
        language: "javascript",
        theme:'vs-dark'
    })
});

</script>

<template>
  <div id="monaco-container" style="width: 100%; height: 600px;"></div>
</template>
