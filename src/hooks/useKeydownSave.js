import { onMounted, onUnmounted } from "vue";
import { debounce } from "lodash";
import { MessagePlugin } from "tdesign-vue-next";

function useKeydownSave(monacoRef, activityDetail, store) {
  const keydownSave = debounce(async (event) => {
    if (event.key === "d") {
      event.preventDefault();
      console.log(store.state);
    }
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      if (store.state.hasErrorMarkers.length > 0) {
        return MessagePlugin.error(`${store.state.hasErrorMarkers[0].message} as line:${store.state.hasErrorMarkers[0].endLineNumber}`);
      }
      activityDetail.value.json = monacoRef.value.getMonacoData();
      store.commit("saveActivity", activityDetail.value);
      store.commit("saveFile");
    }
  }, 200);

  onMounted(() => {
    window.addEventListener("keydown", keydownSave);
  });
  onUnmounted(() => {
    window.removeEventListener("keydown", keydownSave);
  });
}
export default useKeydownSave;
