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
        // 日程提醒颜色
        remindColor:[],
        // 目标公司重要程度
        grade:[],
        // 目标公司状态
        targetStatus: [],
        regionId: null,
        // 区域列表
        regionList: []
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
        $_set_remindColor(state, value) {
            state.remindColor = value;
        },
        $_set_grade(state, value) {
            state.grade = value;
        },
        $_remove_userInfo(state) {
            session.remove('user');
            state.userInfo = {};
        },
        $_set_targetStatus(state, value) {
            state.targetStatus = value;
        },
        $_set_regionId(state, value) {
            value === undefined ? value = null : null;
            state.regionId = value;
            session.set("regionId", value);
        },
        $_set_regionList(state, value) {
            state.regionList = [...state.regionList, ...value];
        },
        $_remove_region(state, value) {
            if (state.regionList && state.regionList.length > 0) {
                let index = state.regionList.findIndex(val => val.id == value);
                if (index > -1) {
                    state.regionList.splice(index, 1);
                }
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
        remindColor:state =>{
            return state.remindColor;
        },
        grade:state =>{
            return state.grade;
        },
        userInfo: state => {
            if (Object.keys(state.userInfo).length == 0) {
                return session.get('user') || {};
            } else {
                return state.userInfo;
            }
        },
        targetStatus:state => {
            return state.targetStatus;
        },
        regionId: state => {
            if (!state.regionId) {
                return session.get("regionId") || null;
            } else {
                return state.regionId;
            }
        },
        regionList: state => {
            return state.regionList;
        }
    }
};