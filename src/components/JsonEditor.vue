<script setup>
import { ref, onMounted, provide, inject, defineExpose } from "vue";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

onMounted(() => {
  const editor = ref(null);
  const container = document.getElementById("jsoneditor");
  editor.value = new JSONEditor(container, {
    mode: "code",
  });

  // set json
  const json = {
    Array: [1, 22, 3],
    Boolean: true,
    Null: null,
    Number: 123,
    Object: { a: "b", c: "d" },
    String: "Hello World",
  };
  editor.value.set(json);
  // return { editor };
});



</script>

<template>
  <div>
    <div id="jsoneditor" style="width: 100%; height: 400px"></div>
  </div>
</template>

<style scoped></style>
