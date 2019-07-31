/**
 *  自动登录
 */
import CryptoJS from "crypto-js"
export default (_this) => {
    let username = getCookie('username');
    let password = getCookie('password');
    // 密码解密
    if (password) {
        let bytes = CryptoJS.AES.decrypt(password, _this.$global.encryptionKey);
        params.userPassword = bytes.toString(CryptoJS.enc.Utf8);
    }
    this.$http.post('/websocket/login', {
        account: username,
        password: password
    }).then(res => {
        if (res.iworkuCode == 200) {
            _this.$store.commit('ipublic/$_set_userInfo', res.datas);
            _this.$router.push({ path: '/' });
        }
    });
}


function getCookie() {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}