import { createStore } from 'vuex'
import { MessagePlugin } from 'tdesign-vue-next';

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            activityList: [],
            currentActivity: {

            }
        }
    },
    /*  */
    getters: {
        doubleCount(state) {
            return state.count * 2
        }
    },
    mutations: {
        setActivityList(state, data) {
            state.activityList = data;
        },
        setCurrentActivity(state, data) {
            state.currentActivity = data;
            if (!data) this.commit('createActivity');
        },
        createActivity(state) {
            state.currentActivity = {
                id: ~~(Date.now() / 1000),
                title: "",
                url: "",
                json: {},
                method: "GET",
                createTime: Date.now(),
            }
        },
        saveActivity(state) {
            // 如果相同id覆盖,同时防止指向同一个地址
            const index = state.activityList.findIndex(item => item.id === state.currentActivity.id)
            try {
                if (index > -1) {
                    state.activityList[index] = Object.assign({}, state.currentActivity);
                } else {
                    // 存入默认数据再保存
                    this.commit('createActivity');
                    state.activityList.push(Object.assign({}, state.currentActivity));
                }
                MessagePlugin.success("保存成功");
            } catch (e) {
                MessagePlugin.error("保存失败:" + e);
            }
        },
    },
    /*  */
    actions: {
        async awaitActivityList({ commit }) {
            const list = await base.getFileJson();
            commit('setActivityList', list);
        }

        // increment(context) {
        //     context.commit('increment')
        // },
    }
})

export default store