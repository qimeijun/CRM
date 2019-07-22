export default {
    /**
     * 使用命名空间，当模块被注册后
     * getters、action、mutation 都会自动根据模块注册的路径调用整命名
     */
    namespaced: true,
    state: {
        // 成员账号
        account: "",
        // 成员密码
        password: "",
    },
    // 提交
    mutations: {
        $_set_account(state, value) {
            state.account = value;
        },
        $_set_password(state, value) {
            state.password = value;
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
        account: state => {
            return state.account;
        },
        password: state => {
            return state.password;    
        }
    }
};