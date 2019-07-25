import Vue from 'vue'
const session = {
    set(key, value) {
        if (Object.prototype.toString.call(value) !== "[object String]") {
            sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            sessionStorage.setItem(key, value);
        }
    },
    get (key) {
       let res = sessionStorage.getItem(key);
       try {
           res = JSON.parse(res);
       } catch (error) {
           res = res;
       }
       return res;
    },
    remove(key) {
        sessionStorage.remove(key);
    },
    clear() {
        sessionStorage.clear();
    }
}
Vue.prototype.$session = session;
export default session;