import { createStore } from "vuex";
import { MessagePlugin } from "tdesign-vue-next";
import { getNewActivityParameters } from "@/hooks/Parameters";
import { cloneDeep } from "lodash";
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      // 是否有错误标记
      hasErrorMarkers: [],
      activityList: [],
      // 刚渲染显示的数据
      currentActivity: getNewActivityParameters(),
    };
  },
  /*  */
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  mutations: {
    setEditorError(state, data) {
        
      console.error(data);
      state.hasErrorMarkers = data;
    },
    setActivityList(state, data) {
      state.activityList = data;
    },
    // 保存当前活动
    setCurrentActivity(state, data) {
      Object.assign(state.currentActivity, data);
      if (!data) this.commit("createActivity");
    },
    createActivity(state) {
      const obj = {
        id: ~~(Date.now() / 1000),
        createTime: Date.now(),
        ...getNewActivityParameters(),
      };
      // state.activityList.push(obj)
      // 新建之后显示的数据
      state.currentActivity = obj;
    },
    // 保存活动列表
    saveActivity(state, data) {
      this.commit("setCurrentActivity", data);
      // 如果相同id覆盖,同时防止指向同一个地址
      const index = state.activityList.findIndex(
        (item) => item.id === state.currentActivity.id,
      );
      if (index > -1) {
        state.activityList[index] = cloneDeep(state.currentActivity);
      } else {
        state.activityList.push(cloneDeep(state.currentActivity));
      }
      MessagePlugin.success("保存成功");
      console.log(state.activityList);
    },
    // 保存文件
    saveFile(state) {
      service.writeFileJson(
        JSON.stringify(state.activityList, null, 2),
      );
    },
  },
  actions: {
    // 读取文件数据
    async awaitActivityList({ commit }) {
      const list = await service.getFileJson();
      commit("setActivityList", list);
    },
  },
});

export default store;
