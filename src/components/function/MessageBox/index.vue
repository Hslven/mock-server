<script setup>
import { onMounted } from "vue";


const prop = defineProps({
  content: {
    message: String,
    title: String,
    width: 443,
    btn: {
      ok: Function,
      no: Function,
    },
  },
  top: "50%",
  dialogVisible: true,
});

onMounted(() => {
  console.log("Component mounted.");
  console.log(prop)
});
</script>

<template>
  <div class="confirm-container">
    <t-dialog
      :visible.sync="true" 
      :confirmBtn="null"
      :closeBtn="false"
      :footer="false"
      attach="body"
      style="position: relative"
      :top="top"
    >
     <t-button>123444</t-button>
      <!-- <div class="popupDom">
        <t-space style="align-items: center; height: 80px">
          {{ content.message }}
        </t-space>
        <t-space :size="0" style="margin-bottom: 16px">
          <t-button
            theme="default"
            style="height: 32px; width: 60px; margin-right: 20px"
            @click="close"
            >{{ (content.btn && content.btn.no) || "取消" }}</t-button
          >
          <t-button
            theme="primary"
            style="height: 32px; width: 60px"
            @click="ok"
            >{{ (content.btn && content.btn.ok) || "确认" }}</t-button
          >
        </t-space>
      </div> -->
    </t-dialog>
  </div>
</template>
