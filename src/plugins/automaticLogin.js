/**
 *  自动登录
 */
import CryptoJS from "crypto-js"
export default async (_this) => {
    let userInfo = _this.$store.getters['ipublic/userInfo'];
    // 如果已经登录过的，就不需要再自动登录了
    if (userInfo && userInfo.jwtValue) {
        return false
    }
    let username = getCookie('username');
    let password = getCookie('password');
    // 用户名和密码必须都存在
    if (!username || !password) {
        return false;
    }
    // 密码解密
    if (password) {
        let bytes = CryptoJS.AES.decrypt(password, _this.$global.encryptionKey);
        password = bytes.toString(CryptoJS.enc.Utf8);
    }
    let res = await _this.$http.post('/websocket/login', {
        account: username,
        password: password
    })
    if (res.iworkuCode == 200) {
        _this.$store.commit('ipublic/$_set_userInfo', res.datas);
        _this.$router.push({ path: '/' });
    }
}


function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}