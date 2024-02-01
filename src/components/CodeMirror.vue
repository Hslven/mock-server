<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import CodeMirror from "vue-codemirror6";
import { oneDark } from "@codemirror/theme-one-dark";
import { json } from "@codemirror/lang-json";
import { debounce } from "lodash";

const initJson = {
  name: `maybaby`,
  year: 25,
  weight: 45,
  height: 165,
  gutter: true,
};
// 初始化
let codeVal = ref("");
// 转成json字符串并格式化
codeVal.value = JSON.stringify(initJson, null, "\t");

// json语言
// const lang = json();
// 扩展
const extensions = [oneDark];

// 格式化 JSON
let error = ref("");
const formatJson = () => {
  try {
    if (codeVal.value.includes("，")) {
      throw new Error("JSON contains Chinese comma");
    }
    const parsed = JSON.parse(codeVal.value);
    codeVal.value = JSON.stringify(parsed, null, "\t");
    error.value = "";
  } catch (e) {
    // console.error(e.message);
    error.value = "* " + e.message;
  }
};
// 不知道为什么这里不会死循环
watch(
  () => codeVal.value,
  debounce((newVal) => {
      formatJson();
  }, 1000),
);

// 输送数据
defineExpose({
  data: codeVal.value,
});
</script>

<template>
  <div class="main">
    <code-mirror
      v-model="codeVal"
      basic
      :lang="json()"
      style="height: 400px"
      :extensions="extensions"
    />
    <code style="color: rgb(244, 38, 38)">{{ error }}</code>
  </div>
</template>
<style>
/* required! */
.cm-editor {
  height: 100%;
}
</style>
