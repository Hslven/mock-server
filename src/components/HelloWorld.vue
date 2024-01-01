<script setup>
import { ref } from 'vue';

// defineProps({
//   msg: String,
// });

const count = ref(0);
const transformProcess = (data) => {
  // system.windowMax()
  myApi.sendUrl(data)
};
</script>

<template>
  <t-button @click="transformProcess">确定</t-button>
  <div class="card">
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
