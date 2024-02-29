import {
    createStore
} from 'vuex'
import {
    MessagePlugin
} from 'tdesign-vue-next';

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            activityList: [],
            currentActivity: {
                title: "",
                url: "",
                json: null,
                method: "GET",
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
        // 保存当前活动
        setCurrentActivity(state, data) {
            console.log(data)
            state.currentActivity = data;
            if (!data) this.commit('createActivity');
        },
        createActivity(state) {
            state.currentActivity = {
                id: ~~(Date.now() / 1000),
                title: "",
                url: "",
                json: JSON.stringify({},null,2),
                method: "GET",
                createTime: Date.now(),
            }
        },
        // 保存活动列表
        saveActivity(state, data) {
            this.commit('setCurrentActivity', data)
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
        // 保存文件
        saveFile(state) {
            service.writeFileJson(JSON.stringify(state.activityList, null, 2));
        }
    },
    /*  */
    actions: {
        // 读取文件数据
        async awaitActivityList({
            commit
        }) {
            const list = await service.getFileJson();
            commit('setActivityList', list);
        }
        // increment(context) {
        //     context.commit('increment')
        // },
    }
})

export default store