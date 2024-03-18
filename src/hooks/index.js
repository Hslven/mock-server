import { onMounted, onUnmounted } from "vue";
import { debounce } from "lodash";
import { MessagePlugin } from "tdesign-vue-next";

/**
 * 使用keydown事件来实现自动保存功能。
 * @param {Object} monacoRef - Monaco编辑器的引用对象，用于获取编辑器中的数据。
 * @param {Object} activityDetail - 当前活动的详细信息，用于更新和保存。
 * @param {Object} store - Vuex的store对象，用于访问和修改应用的状态。
 */
export function useKeydownSave(monacoRef, activityDetail, store) {
  const keydownSave = debounce(async (event) => {
    if (event.key === "d") {
      event.preventDefault();
      console.log(store.state);
    }
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      if (store.state.hasErrorMarkers.length > 0) {
        return MessagePlugin.error(
          `${store.state.hasErrorMarkers[0].message} as line:${store.state.hasErrorMarkers[0].endLineNumber}`,
        );
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

/**
 * 时间估值
 * @param {string} timestamp 时间戳
 * @return {string} 返回格式化后的字符串
 */
export function useApproximateDate(timestamp) {
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const MS_PER_WEEK = 7 * MS_PER_DAY;
    const MS_PER_MONTH = 30 * MS_PER_DAY;
    const MS_PER_YEAR = 365 * MS_PER_DAY;
  
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < MS_PER_DAY) {
      return "today";
    } else if (diff < MS_PER_WEEK) {
      const days = Math.floor(diff / MS_PER_DAY);
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (diff < MS_PER_MONTH) {
      const weeks = Math.floor(diff / MS_PER_WEEK);
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (diff < MS_PER_YEAR) {
      const months = Math.floor(diff / MS_PER_MONTH);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else {
      const years = Math.floor(diff / MS_PER_YEAR);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
  }
  
