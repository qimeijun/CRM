// export default class CWebSocket {
//     // 构造器
//     constructor(uri, userId) {
//         this.uri = uri;
//         this.userId = userId;
//         this.ws = {};
//     }
//     // 连接
//     connect() {
//         try {
//             if ('WebSocket' in window) {
//                 this.ws = new WebSocket(`${this.uri}/${this.userId}`)
//             } else if ('MozWebSocket' in window) {
//                 this.ws = new MozWebSoocket(`${this.uri}/${this.userId}`)
//             } else {
//                 console.log("无法连接");
//             }
//             if (this.ws) {
//                 this.ws.onopen = function (event) {
//                     if (event.target.readyState == 1) {
//                         console.log("连接成功了啊");
//                     }
//                 }
//             }
//             // 连接出错
//             this.ws.onerror = function (e) {
//                 console.error("WebSocket error observed:", e);
//             }
//         } catch (error) {
//             console.log("连接出错");
//         }
//         return this.ws;
//     }
//     // 消息发送
//     send() {
//         if (this.ws) {
//             this.ws.send({title: 'test', content: '这是测试内容'});
//         }
//     }
//     // websocket 关闭
//     close() {
//         this.ws.close();
//     }
//     // 心跳检测
//     heart() {}
// }