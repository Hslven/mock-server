import {
    onMounted,
    onUnmounted
} from 'vue';
import {
    debounce
} from "lodash";


function useKeydownSave(monacoRef, activityDetail, store) {
    const keydownSave = debounce(async (event) => {
        if (event.key === "d") {
            event.preventDefault();
            console.log(store.state);
        }
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault();
            activityDetail.value.json = monacoRef.value.getMonacoData();
            store.commit("saveActivity", activityDetail.value);
            store.commit('saveFile');
        }
    }, 200);

    onMounted(() => {
        window.addEventListener("keydown", keydownSave);
    });
    onUnmounted(() => {
        window.removeEventListener("keydown", keydownSave);
    });
}
export default useKeydownSave