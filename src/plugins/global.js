import Vue from 'vue'

Vue.prototype.$global = {
    /** 七牛上传文件服务器 */
    qiniuURL: "https://upload.qiniup.com",
    lang: {
        en: 'en',
        zh: 'zh',
        vi: 'vi'
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
    encryptionKey: "iworku",
    /**
     *  将国际时间转换成本地时间
     */
    localTime: ({ time,  sparator='/', hour=true}={}) => {
        /**
         * time: 时间
         * sparator： 显示的分隔符, 默认斜杠
         * hour: 默认值为true，显示小时分秒
         */
        if (!time) {
            return false;
        }
        let offset = -(new Date().getTimezoneOffset() * 60 * 1000)
        let serverTime = new Date(time.replace(/-/g, '/')).getTime()
        // 将时间转换成时间戳
        let utcTime = new Date(serverTime + offset)
        let month = utcTime.getMonth() + 1 > 9 ? utcTime.getMonth() : `0${utcTime.getMonth() + 1}`
        let date = utcTime.getDate() > 9 ? utcTime.getDate() : `0${utcTime.getDate()}`
        
        let result = `${utcTime.getFullYear()}${sparator}${month}${sparator}${date}`;
        if (hour) {
            let hours = utcTime.getHours() > 9 ? utcTime.getHours() : `0${utcTime.getHours()}`
            let minutes = utcTime.getMinutes() > 9 ? utcTime.getMinutes() : `0${utcTime.getMinutes()}`
            let seconds = utcTime.getSeconds() > 9 ? utcTime.getSeconds() : `0${utcTime.getSeconds()}`
            result += ` ${hours}:${minutes}:${seconds}`
        }
        return result
    }, 
    /**
     *  将本地时间转换成国际时间
     *  type: month 返回格式 yyyy-MM
     *        date 返回格式 yyyy-MM-dd
     */
    interTime: (time=new Date(), type='date') => {
        if (!time) {
            return false;
        }
        let offset = new Date().getTimezoneOffset() * 60000
        let localTime = new Date(`${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} 23:59:59`).getTime();
        let serverTime = new Date(localTime + offset);
        let month = serverTime.getMonth() + 1 > 9 ? serverTime.getMonth() + 1 : `0${serverTime.getMonth() + 1}`
        
        let result = `${serverTime.getFullYear()}-${month}`;
        if (type == 'date') {
            let date = serverTime.getDate() > 9 ? serverTime.getDate() : `0${serverTime.getDate()}`
            result += `-${date}`
        }
        return result;
    },
    dialogWidth: "40%"
}