import Vue from 'vue'

Vue.prototype.$global = {
    /** 七牛上传文件服务器 */
    qiniuURL: "https://upload.qiniup.com",
    lang: {
        en: 'en',
        zh: 'zh'
    },
    // 默认存储用户信息的时间: 7天；
    userSaveTime: 7,
    userRole: {
        // 超级管理员
        superAdministrator: "c24c6bbc-a1f6-11e9-b080-946e68be8353",
        // 区域经理
        regionalManager: "c24fa6ba-a1f6-11e9-b080-946e68be8353",
        // 项目经理
        projectManager: "c253d82b-a1f6-11e9-b080-946e68be8353",
        // 成员
        member: "c2581574-a1f6-11e9-b080-946e68be8353",
        // 顾客
        customer: "c25bb273-a1f6-11e9-b080-946e68be8353"
    },
    avatarURI: process.env.VUE_APP_QINIU,
    userRoleById: {
        "c24c6bbc-a1f6-11e9-b080-946e68be8353": "超级管理员",
        "c24fa6ba-a1f6-11e9-b080-946e68be8353": "区域经理",
        "c253d82b-a1f6-11e9-b080-946e68be8353": "项目经理",
        "c2581574-a1f6-11e9-b080-946e68be8353": "成员",
        "c25bb273-a1f6-11e9-b080-946e68be8353": "客户",
    }
}