<script setup>
import { ref, onMounted, watchEffect,} from "vue";
import { debounce } from "lodash";
import { useStore } from "vuex";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
// const store = useStore();
const props = defineProps({
  jsonData: Object,
});
// const jsonData = inject<Ref<ICode>>("activityDetail");

const editor = ref(null);
onMounted(() => {
  const container = document.getElementById("jsoneditor");
  editor.value = new JSONEditor(container, {
    mode: "code",
  });

  watchEffect(() => {
    editor.value.set(props.jsonData);
  });
});

// const error = ref("");
// const emit = defineEmits(["update:jsonData"]);
/* onst updateJsonData = debounce(() => {
  try {
    jsonData= editor.value.get();
    // store.commit("setActivityListStatic", {json:{...result}});
    // error.value = "";
  } catch (e) {
    // console.log(e);
    error.value = "* " + e.message;
  }
}, 300); */
</script>

<template>
  <div>
    <div id="jsoneditor" style="width: 100%; height: 400px"></div>
    <code style="color: rgb(244, 38, 38)">{{ error }}</code>
  </div>
</template>

<style scoped></style>
