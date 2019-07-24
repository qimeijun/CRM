<template>
<!-- 单个日志 -->
    <section class="diary-module">
        <div class="diary-module__left">
            <div class="time" :style="`background-color: ${diaryTypeColors[parseInt(item.type) - 1]}`">
                <p>2019</p>
                <p>Jun.6</p>
                <p>13:32</p>
            </div>
            <div class="type" :style="`background-color: ${diaryTypeColors[parseInt(item.type) - 1]}`">{{ $t("workDiary.diarType.daily") }}</div>
        </div>
        <div class="diary-module__right">
            <div class="project" :style="`background-color: ${diaryTypeColors[parseInt(item.type) - 1]}`">
                <span>
                    Taurus Wujiang taide electronics Co.,LTD
                </span>
                <el-dropdown @command="onHandleCommand"  style="color: white; cursor: pointer;">
                    <span class="el-dropdown-link">
                        {{ $t("workDiary.operate") }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu class="diary-module-drop-list" slot="dropdown">
                        <el-dropdown-item command="modify">{{ $t("workDiary.btn.modifyDiary") }}</el-dropdown-item>
                        <el-dropdown-item command="leave">{{ $t("workDiary.btn.leaveMessageNow") }}</el-dropdown-item>
                        <el-dropdown-item command="delete">{{ $t("workDiary.btn.delete") }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="target-company">
                目标公司：CÔNG TY CTHUTHUTHUTHUTHUTHUTHU
            </div>
            <div class="diary-content">
                <div style="font-size: 16px; color: black; line-height: 35px;">Truong Nam machines quality feedback</div>
                <div style="display: flex; align-items: center;">
                    <el-avatar style="margin-right: .2rem;" :size="40" src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"></el-avatar>
                    <span style="font-size: 12px;">Matilda McGee</span>
                </div>
                <!-- 订单 -->
                <div class="order">
                    订单信息待定
                </div>
                <!-- 订单 -->
                <div style="margin-top: 20px; margin-bottom: 20px; line-height: 20px;">
                    Dear All： Hereinafter attachment is Truong Nam report relates our machines for the first order Please take your time to review it and seriously to check the mistakes and solve these problems in next order. Thank you！
                </div>
                <el-button type="primary" size="mini">{{ $t("workDiary.btn.translate") }}</el-button>
                <!-- 翻译内容显示 start -->
                <div style="margin-top: 20px; margin-bottom: 20px; line-height: 20px;">
                    <p style="line-height: 30px;">翻译内容为：</p>
                    Dear All： Hereinafter attachment is Truong Nam report relates our machines for the first order Please take your time to review it and seriously to check the mistakes and solve these problems in next order. Thank you！
                </div>
                <!-- 翻译内容显示 end -->
                <!-- 聊天记录 -->
                <div class="chat-log">
                    <p style="margin-bottom: 10px;">{{ $t("workDiary.chatLog") }}</p>
                    <el-image class="img" src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"></el-image>
                    <el-image class="img" src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"></el-image>
                </div>
                <!-- 聊天记录 -->
                <div class="attachment">
                    <p>{{ $t("workDiary.attachment") }}</p>
                    <div>
                        <Attachment name="asdfs.psd"></Attachment>
                        <Attachment name="asdfs.xsd"></Attachment>
                        <Attachment name="asdfs.wsd"></Attachment>
                        <Attachment name="asdfs.ysd"></Attachment>
                    </div>
                </div>
                <el-button type="primary" size="mini" style="margin-top: 20px;">{{ $t("workDiary.btn.leaveMessage") }}</el-button>
                <!-- 留言信息 start -->
                <Message></Message>
                <!-- 留言信息 end -->
            </div>
        </div>
        <!-- 编辑工作日志 dialog start -->
        <el-dialog
        class="el-dialog__scroll"
        :title="$t('workDiary.modify')"
        :visible.sync="modifyWorkDiaryDialogVisible"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        width="30%">
        <el-scrollbar class="scrollbar">
            <ModifyWorkDiary></ModifyWorkDiary>
        </el-scrollbar>
        </el-dialog>
        <!-- 编辑工作日志 dialog end -->
    </section>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    type: '1'
                };
            }
        }
    },
    components: {
        Attachment: () => import('@/components/lib/Attachment.vue'),
        Message: () => import('@/components/work/DiaryMessage.vue'),
        ModifyWorkDiary: () => import("@/components/work/AddWorkDiary.vue"),
    },
    data() {
        return {
            modifyWorkDiaryDialogVisible: false,
            // diaryTypeColors: {
            //     order: "#E50054",
            //     daily: "#31376D",
            //     weekly: "#4937EA",
            //     monthly: "#8D43FF"
            // }
            // 分别是日报、周报、月报、订单
            diaryTypeColors: ["#31376D", "#4937EA", "#8D43FF", "#E50054"]
        }
    },
    methods: {
        /**
         *  留言菜单操作
         */
        onHandleCommand(command) {
            switch (command) {
                case 'modify':
                    this.modifyWorkDiaryDialogVisible =  true;
                    break;
                case 'leave':
                    break;
                case 'delete':
                    break;
            }
        }
    }
    
}
</script>
<style lang="scss" scoped>
$-scope-padding-lr: .2rem;
.diary-module {
    display: flex;
    margin-bottom: 20px;
    &__left {
        width: 50px;
        margin-right: .2rem;
        .time {
            padding: 10px 0;
            width:44px;
            border-radius: $--default-border-radius;
            background-color: #31376D;
            color: $--default-white;
            text-align: center;
            line-height: 25px;
            
        }
        .type {
            text-align: center;
            line-height: 25px;
            margin-top: 10px;
            width:44px;
            // background-color: #31376D;
            border-radius:12px;
            color: $--default-white;
        }
    }

    &__right {
        width: 100%;
        .project {
            display: flex;
            justify-content: space-between;
            padding: 10px $-scope-padding-lr;
            background-color: #31376D;
            color: $--default-white;
            border-radius: 8px 8px 0 0;
            font-size: 16px;
        }
        .target-company {
            padding: 10px $-scope-padding-lr;
            background-color: #E1DEF4;
            color: #31376D;
            font-size: 12px;
        }
        .diary-content {
            background-color: $--default-white;
            padding: 20px $-scope-padding-lr;
            border-radius: 0 0 $--default-border-radius $--default-border-radius;
            .attachment, .chat-log {
                font-size: 16px;
                margin-top: 20px;
            }
            .chat-log {
                .img {
                    max-height: 100px;
                    max-width: 100px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.diary-module-drop-list {
    padding: 10px 0 !important;
    li {
        padding: 0 10px !important;
    }
    li:hover {
        background-color: $--default-color !important;
        color: $--default-white !important;
    }
}
</style>
