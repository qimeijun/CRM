<template>
<!-- 日志留言 -->
    <section class="diary-message">
        <div class="parent">
            <div class="name">
                <span class="user">{{ message.followAddUserNameZh || message.followAddUserNameEn }}: </span>
                <div>
                    <span class="time">{{ message.followAddTimeStr }}</span>
                    <span v-if="message.followAddUser != userInfo.id" @click="onShowLeaveMesssageForm(message)" style="color:#4937EA; margin-left: .2rem; cursor: pointer;">{{ $t("workDiary.btn.reply") }}</span>
                </div>
            </div>
            <div class="content">
                {{ message.followContent }}
            </div>
            <div v-if="message && message.followFiles" class="attchment">
                <Attachment v-for="(aItem, aIndex) in message.followFiles.split(';')" :key="aIndex" :name="aItem"></Attachment>
            </div>
            <template v-if="message && message.nodeList && Object.prototype.toString.call(message.nodeList) == '[object Array]'">
            <div v-for="(item, index) in message.nodeList" :key="index" class="child">
                <div class="name">
                    <span class="user">{{ item.followAddUserNameZh || item.followAddUserNameEn }}: </span>
                    <div>
                        <span class="time">{{ item.followAddTimeStr }}</span>
                        <span v-if="item.followAddUser != userInfo.id" @click="onShowLeaveMesssageForm(item)" style="color:#4937EA; margin-left: .2rem; cursor: pointer;">{{ $t("workDiary.btn.reply") }}</span>
                    </div>
                </div>
                <div class="content">
                    {{ item.followContent }}
                </div>
                <div v-if="item && item.followFiles" class="attchment">
                    <Attachment v-for="(aItem, aIndex) in item.followFiles.split(';')" :key="aIndex" :name="aItem"></Attachment>
                </div>
            </div>
            </template>
            <LeaveMessage v-if="isShowLeaveMessageForm" :parent="currentParentMessage" @onOperateSuccess="onCloseLeaveMessage"></LeaveMessage>
        </div>
    </section>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    props: {
        /**
         *  关于留言的信息
         */
        message: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        Attachment: () => import('@/components/lib/Attachment.vue'),
        LeaveMessage: () => import("@/components/work/LeaveMessage.vue")
    },
    data() {
        return {
            isShowLeaveMessageForm: false,
            currentParentMessage: {}
        }
    },
    computed: {
        ...mapGetters("ipublic", ["userInfo"])
    },
    methods: {
        /**
         *  关闭留言表单
         */
        onCloseLeaveMessage() {
            this.isShowLeaveMessageForm = false;
        },
        /**
         *  显示留言表单
         */
        onShowLeaveMesssageForm(current) {
            this.currentParentMessage = current;
            this.isShowLeaveMessageForm = true;
        }
    },
    watch: {
        message: {
            handler(newVal){},
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
.diary-message {
    margin-top: 20px;
    border-radius: $--default-border-radius;
    border: 1px solid #BBBBBB;
    padding: .2rem;
    .name {
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        .user, .time {
            color: #1E1E1E;
            // font-weight: 600;
        }
    }
    .content {
        color: #7B7B7B;
        word-break: break-all;
    }
    .child {
        margin-left: .3rem;
        margin-top: 20px;
    }
    .attchment {
        margin-top: 15px;
    }
}
</style>
