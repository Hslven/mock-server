<script setup lang="ts">
import { ref, onMounted } from "vue";
import CodeMirror from "vue-codemirror6";
import { oneDark } from "@codemirror/theme-one-dark";
import { json } from "@codemirror/lang-json";

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
const lang = json();
// 扩展
const extensions = [oneDark];

// 格式化 JSON
const formatJson = () => {
  try {
    if (codeVal.value.includes("，")) {
      throw new Error("JSON contains Chinese comma");
    }
    const parsed = JSON.parse(codeVal.value);
    codeVal.value = JSON.stringify(parsed, null, "\t");
  } catch (e) {
    console.error(e.message);
  }
};

// 输送数据
defineExpose({
  data: codeVal.value,
});
</script>

<template>
  <div class="main">
    <button @click="formatJson">格式化</button>
    <code-mirror
      v-model="codeVal"
      basic
      :lang="lang"
      style="height: 400px"
      :extensions="extensions"
    />
  </div>
</template>
<style>
/* required! */
.cm-editor {
  height: 100%;
}
</style>
