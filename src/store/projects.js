export default {
    
    namespaced: true,
    state: {
        search: {
            seek: "",
            tag: []
        },
        // 公海检索
        publicSearch: {
            seek: "",
            tag: [],
            type: ""
        },
        // 私海检索
        privateSearch: {
            member: "",
            type: "",
            tag: [],
            seek: ""
        }
    },
    // 提交
    mutations: {
        $_set_search: (state, value) => {
            if (value && Object.prototype.toString.call(value) === '[object Object]') {
                state.search = {...value};
            }
        },
        $_set_publicSearch: (state, value) => {
            if (value && Object.prototype.toString.call(value) === '[object Object]') {
                state.publicSearch = {...value};
            }
        },
        $_set_privateSearch: (state, value) => {
            if (value && Object.prototype.toString.call(value) === '[object Object]') {
                state.privateSearch = {...value};
            }
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
        search: (state) => {
            return state.search
        },
        publicSearch: (state) => {
            return state.publicSearch;
        },
        privateSearch: (state) => {
            return state.privateSearch;
        }
    }
};