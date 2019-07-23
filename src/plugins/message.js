import Vue from 'vue'
import IMessage from "@/components/global/Message.vue"

const messageConstructor = Vue.extend(IMessage);
Vue.prototype.$imessage = (options) => {
    let message = new messageConstructor({el: document.createElement('div')});
    message.content = options.content;
    message.type = options.type;
    document.body.appendChild(message.$el);
};