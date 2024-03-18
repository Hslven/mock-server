<script setup>
// 导入文件
const importFile = throttle(() => {
  store.commit("createActivity");
}, 1000);
const requestSuccessMethod = async (file) => {
  const result = await requestBefore(file);
  const formData = new FormData();
  formData.append("file", file.raw);
  if (result.status == "success") {
  }
};
const requestBefore = (file) => {
  return new Promise((resolve) => {
    // 控制上传进度
    let percent = 0;
    const percentTimer = setInterval(() => {
      if (percent + 10 < 99) {
        percent += 10;
        this.$refs.uploadRef.uploadFilePercent({ file, percent });
      } else {
        clearInterval(percentTimer);
      }
    }, 100);

    const timer = setTimeout(() => {
      // resolve 参数为关键代码
      resolve({
        status: "success",
        response: {},
      });

      clearTimeout(timer);
      clearInterval(percentTimer);
    }, 800);
  });
};
const requestFailMethod = (file /** UploadFile */) => {
  return new Promise((resolve) => {
    // resolve 参数为关键代码
    resolve({
      status: "fail",
      error: "上传失败，请检查文件是否符合规范",
    });
  });
};
</script>
<template>
  <t-upload
    ref="uploadRef"
    v-model="files"
    theme="custom"
    :requestMethod="requestSuccessMethod"
    :trigger-button-props="{
      theme: 'primary',
      variant: 'base',
    }"
    :beforeUpload="beforeUpload"
    accept=".xlsx"
    style="margin: 0 0 12px 0"
  >
    <t-button theme="default" variant="outline">
      <span style="font-size: 12px">import file</span>
    </t-button>
  </t-upload>
</template>
