export default {
    /**
     * 使用命名空间，当模块被注册后
     * getters、action、mutation 都会自动根据模块注册的路径调用整命名
     */
    namespaced: true,
    state: {
        content: "hello !!!! I'm Vuex, welcome!!!!"
    },
    // 提交
    mutations: {
        $_set_content(state) {
            state.content = "I'm changed!!!!"
        }
    },
    // 提交到 mutations 中
    actions: {
        a_content({ commit }) {
            commit('content');
        }
    },
    // 计算属性
    getters: {
        content: state => {
            return state.content;
        }
    }
};