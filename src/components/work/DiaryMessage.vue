<template>
<!-- 日志留言 -->
    <section class="diary-message">
        <div class="parent">
            <div class="name">
                <span class="user">Pualthin Pow: </span>
                <div>
                    <span class="time">2019/04/23 12:23:23</span>
                    <span @click="onShowLeaveMesssageForm" style="color:#4937EA; margin-left: .2rem; cursor: pointer;">{{ $t("workDiary.btn.reply") }}</span>
                </div>
            </div>
            <div class="content">
                I have check the report,this client is suitable for us. I will communicate with my boss.I will reply you ASAP.
            </div>
            <div class="child">
                <div class="name">
                    <span class="user">Pualthin Pow: </span>
                    <div>
                        <span class="time">2019/04/23 12:23:23</span>
                        <span @click="onShowLeaveMesssageForm" style="color:#4937EA; margin-left: .2rem; cursor: pointer;">{{ $t("workDiary.btn.reply") }}</span>
                    </div>
                </div>
                <div class="content">
                    I have check the report,this client is suitable for us. I will communicate with my boss.I will reply you ASAP.
                </div>
                <div class="attchment">
                    <Attachment name="sdfsdf.pdf"></Attachment>
                    <Attachment name="sdfsdf.wdf"></Attachment>
                    <Attachment name="sdfsdf.xdf"></Attachment>
                </div>
            </div>
            <div class="child">
                <div class="name">
                    <span class="user">Pualthin Pow: </span>
                    <div>
                        <span class="time">2019/04/23 12:23:23</span>
                        <span @click="onShowLeaveMesssageForm" style="color:#4937EA; margin-left: .2rem; cursor: pointer;">{{ $t("workDiary.btn.reply") }}</span>
                    </div>
                </div>
                <div class="content">
                    I have check the report,this client is suitable for us. I will communicate with my boss.I will reply you ASAP.
                </div>
                <div class="attchment">
                    <Attachment name="sdfsdf.pdf"></Attachment>
                    <Attachment name="sdfsdf.wdf"></Attachment>
                    <Attachment name="sdfsdf.xdf"></Attachment>
                </div>
                <LeaveMessage v-if="isShowLeaveMessageForm" @onCloseLeaveMessage="onCloseLeaveMessage"></LeaveMessage>
            </div>
            
        </div>
    </section>
</template>
<script>
export default {
    prop: {
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
            isShowLeaveMessageForm: false
        }
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
        onShowLeaveMesssageForm() {
            this.isShowLeaveMessageForm = true;
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
