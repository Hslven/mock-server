<script setup>
import Monaco from "@/components/Monaco.vue";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { cloneDeep } from "lodash";
import { httpMethodOptions } from "@/hooks/Parameters";
import useKeydownSave from "@/hooks/useKeydownSave";

const store = useStore();
const monacoRef = ref(null);
const activityDetail = ref(null);

watchEffect(() => {
  activityDetail.value = cloneDeep(store.state.currentActivity);
});
useKeydownSave(monacoRef, activityDetail, store);
</script>

<template>
  <div class="base-box">
    <div style="display: flex; margin-bottom: 12px">
      <t-select
        autoWidth
        v-model="activityDetail.method"
        default-value="GET"
        :options="httpMethodOptions"
        style="width: fit-content; margin-right: -1px"
      ></t-select>
      <t-input v-model="activityDetail.url"></t-input>
    </div>
    <Monaco ref="monacoRef" :data="activityDetail.json"></Monaco>
  </div>
</template>

<style scoped>
:deep(.t-collapse-panel__content) {
  padding: 12px;
}
</style>
