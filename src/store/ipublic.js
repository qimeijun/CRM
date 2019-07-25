import session from '../plugins/session.js'
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
        qiniuToken: "",
        // 公司行业
        industry: [],
        // 项目状态
        itemStatus:[],
        // 登录用户信息
        userInfo: {},
        // 客户类型
        targetType:[],
    },
    // 提交
    mutations: {
        $_set_country(state, value) {
            state.country = value;
        },
        $_set_qiniuToken(state, value) {
            state.qiniuToken = value;
        },
         $_set_industry(state, value) {
            state.industry = value;
        },
         $_set_itemStatus(state, value) {
            state.itemStatus = value;
        },
        $_set_userInfo(state, value) {
            session.set('user', value);
            state.userInfo = value;
        },
        $_set_targetType(state, value) {
            state.targetType = value;
        },
        $_remove_userInfo(state) {
            session.remove('user');
            state.userInfo = {};
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
        },
        industry:state =>{
            return state.industry;
        },
        itemStatus:state =>{
            return state.itemStatus;
        },
        targetType:state =>{
            return state.targetType;
        },
        userInfo: state => {
            if (Object.keys(state.userInfo).length == 0) {
                return session.get('user') || {};
            } else {
                return state.userInfo;
            }
        }
    }
};