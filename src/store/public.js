export default {
    /**
     *  存储字典相关的、公共的一些信息
     */
    /**
     * 使用命名空间，当模块被注册后
     * getters、action、mutation 都会自动根据模块注册的路径调用整命名
     */
    namespaced: true,
    state: {
        // 国家
        country: [],
        // 七牛token
        qiniuToken: ""
    },
    // 提交
    mutations: {
        $_set_country(state, value) {
            state.country = value;
        },
        $_set_qiniuToken(state, value) {
            state.qiniuToken = value;
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
        country: state => {
            return state.country;
        },
        qiniuToken: state => {
            return state.qiniuToken;
        }
    }
};