<template>
<!-- 单个日志 -->
    <section class="diary-module" v-if="!isDeleteDiary">
        <div class="diary-module__left">
            <div class="time" :style="`background-color: ${diaryTypeColors[parseInt(item.followNodeType) - 1]}`">
                <p>{{ timeInfo.year }}</p>
                <p>{{ timeInfo.month }}.{{ timeInfo.day }}</p>
                <p>{{ timeInfo.hour }}:{{ timeInfo.minute }}</p>
            </div>
            <div class="type" :style="`background-color: ${diaryTypeColors[parseInt(item.followNodeType) - 1]}`">
                <template v-if="item.followNodeType == '1'">{{ $t('workDiary.diarType.daily') }}</template>
                <template v-else-if="item.followNodeType == '2'">{{ $t('workDiary.diarType.weekly') }}</template>
                <template v-else-if="item.followNodeType == '3'">{{ $t('workDiary.diarType.monthly') }}</template>
                <template v-else-if="item.followNodeType == '4'">{{ $t('workDiary.diarType.order') }}</template>
            </div>
        </div>
        <div class="diary-module__right">
            <div class="project" :style="`background-color: ${diaryTypeColors[parseInt(item.followNodeType) - 1]}`">
                <span>
                    {{ item.followItemIdName }}
                </span>
                <el-dropdown v-if="isAllowOperate" @command="onHandleCommand" style="color: white; cursor: pointer;">
                    <span class="el-dropdown-link">
                        {{ $t("workDiary.operate") }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu class="diary-module-drop-list" slot="dropdown">
                        <!-- 
                            功能：编辑日志
                            权限：
                                1、自己
                                2、上级
                         -->
                         <template v-if="(item.followAddUser == userInfo.id) || isAllow">
                            <el-dropdown-item command="modify">{{ $t("workDiary.btn.modifyDiary") }}</el-dropdown-item>
                         </template>
                         <!-- 
                             功能：留言
                             权限：
                                1、只要不是自己就可以留言
                          -->
                        <template v-if="item.followAddUser != userInfo.id">
                            <el-dropdown-item command="leave">{{ $t("workDiary.btn.leaveMessageNow") }}</el-dropdown-item>
                        </template>
                        <!-- 
                            功能：删除
                            权限：
                                1、超级管理员
                                2、区域管理员
                         -->
                        <el-dropdown-item v-if="[$global.userRole.superAdministrator, $global.userRole.regionalManager].includes(userInfo.userRole)" command="delete">{{ $t("workDiary.btn.delete") }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div v-if="item.followTargetCompanyName" class="target-company">
                {{ $t("workDiary.targetCompany") }}：{{ item.followTargetCompanyName }}
            </div>
            <div class="diary-content">
                <div style="font-size: 16px; color: black; line-height: 35px;">{{ item.followTitle }}</div>
                <div style="display: flex; align-items: center;">
                    <el-avatar style="margin-right: .2rem;" :size="40" :src="`${$global.avatarURI}${item.followAddUserProfileImage}`"></el-avatar>
                    <span style="font-size: 12px;">{{ item.followAddUserNameZh || item.followAddUserNameEn }}</span>
                </div>
                <!-- 订单 -->
                <div class="order" v-if="item.followNodeType == '4'">
                    <!-- 订单信息待定 -->
                    <div>
                        <span>{{ $t('workDiary.form.orderNo') }}:</span>
                        {{ item.orderCode }}
                    </div>
                    <div>
                        <span>{{ $t('workDiary.form.orderPrice') }}：</span>
                        {{ item.orderAmount }}{{ $t("public.dollar") }}
                    </div>
                    <div>
                        <span>{{ $t('workDiary.form.orderNum') }}：</span>
                        {{ item.orderNumber }}件
                    </div>
                    <div>
                        <span>{{ $t('workDiary.form.orderType') }}:</span>
                        {{ $t(`workDiary.orderType[${item.orderType}]`) }}
                    </div>
                    <div>
                        <span>{{ $t('workDiary.form.orderName') }}:</span>
                        {{ item.productName }}
                    </div>
                </div>
                <!-- 订单 -->
                <div class="dairy-content" style="margin-top: 20px; margin-bottom: 20px; line-height: 20px; word-break: break-all;" >
                    <div v-html="item.followContent"></div>
                </div>
                <el-button v-if="item.followContent" @click="onTranslate(item.followContent)" type="primary" size="mini" :disabled="translateContent ? true : false" :loading="translateBtnLoading">{{ $t("workDiary.btn.translate") }}</el-button>
                <!-- 翻译内容显示 start -->
                <div v-if="translateContent" style="margin-top: 20px; margin-bottom: 20px; line-height: 20px;word-break: break-all;">
                    <p style="line-height: 30px;">{{ $t("workDiary.translateTip") }}：</p>
                    {{ translateContent }}
                </div>
                <!-- 翻译内容显示 end -->
                <!-- 聊天记录 -->
                <div v-if="item && item.followLog" class="chat-log">
                    <p style="margin-bottom: 10px;">{{ $t("workDiary.chatLog") }}</p>
                    <template v-for="(cItem, cIndex) in item.followLog.split(';')">
                        <a :href="`${$global.avatarURI}${cItem}`" target="_blank" :key="cIndex">
                            <el-image  class="img" :src="`${$global.avatarURI}${cItem}`"></el-image>
                        </a>
                    </template>
                </div>
                <!-- 聊天记录 -->
                <div v-if="item && item.followFiles" class="attachment">
                    <p>{{ $t("workDiary.attachment") }}</p>
                    <div>
                        <Attachment v-for="(aItem, aIndex) in item.followFiles.split(';')" :key="aIndex" :name="aItem"></Attachment>
                    </div>
                </div>
                <!-- 
                    功能：留言
                    权限：
                        1、除了自己，都可以
                 -->
                <LeaveMessage v-if="item.followAddUser != userInfo.id" :parent="item" @onCloseLeaveMessage="onQueryDiary"></LeaveMessage>
                <!-- 留言信息 start -->
                <template v-if="item && item.nodeList && item.nodeList.length > 0">
                    <Message v-for="(nItem, nIndex) in item.nodeList" :key="nIndex" :message="nItem" @onCloseLeaveMessage="onQueryDiary"></Message>
                </template>
                
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
        :close-on-click-modal="false"
        width="30%">
        <el-scrollbar class="scrollbar">
            <ModifyWorkDiary :id="$parent.id" :type="$parent.type" :diaryInfo="diary" @onOperateSuccess="modifyWorkDiaryDialogVisible=false;onQueryDiary();"></ModifyWorkDiary>
        </el-scrollbar>
        </el-dialog>
        <!-- 编辑工作日志 dialog end -->
    </section>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    props: {
        diary: {
            type: Object,
            default() {
                return {};
            }
        },
        isAllow: {
            type: Boolean,
            default() {
                return true
            }
        },
        // 项目ID、目标公司ID、成员ID
        id: {
            type: String,
            default() {
                return "";
            }
        },
        /**
         * project 项目公司
         * target  目标公司
         * member  成员
         */
        type: {
            type: String,
            default() {
                return 'project';
            }
        },
    },
    components: {
        Attachment: () => import('@/components/lib/Attachment.vue'),
        Message: () => import('@/components/work/DiaryMessage.vue'),
        ModifyWorkDiary: () => import("@/components/work/AddWorkDiary.vue"),
        LeaveMessage: () => import("@/components/work/LeaveMessage.vue")
    },
    data() {
        return {
            item: {},
            modifyWorkDiaryDialogVisible: false,
            // 分别是日报、周报、月报、订单
            diaryTypeColors: ["#31376D", "#4937EA", "#8D43FF", "#E50054"],
            translateContent: "",
            translateBtnLoading: false,
            monthEnglish: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            timeInfo: {
                year: '2019',
                day: '2',
                month: 'Jun',
                hour: "12",
                minute: "12"
            },
            isAllowOperate: true,
            isDeleteDiary: false
        }
    },
    computed: {
        ...mapGetters("ipublic", ["userInfo"]),
        userRole() {
            return this.$store.getters["members/memberInfo"].userRole
        }
    },
    methods: {
        /**
         *  根据ID查询详情
         */
        onQueryDiary() {
            this.$http.get(`/customer/followup/info/infobypk/${this.diary.id}`).then(res => {
                if (res.iworkuCode == 200) {
                    this.item = res.datas;
                }
            });
        },
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
                    this.deleteDiary();
                    break;
            }
        },
        onTranslate(content) {
            if (!content) {
                return false;
            } 
            let params = {};
            switch (this.$global.lang) {
                case 'en':
                    params.to = 'en';
                    break;
                case 'zh':
                    params.to = 'zh';
                    break;
                default:
                    params.to = 'en';
            }
            params.querry = content;
            this.translateBtnLoading = true;
            this.$http.post('/third_party/translate/find', params).then(res => {
                this.translateBtnLoading = false;
                if (res.iworkuCode == 200) {
                    this.translateContent = res.datas && res.datas.result;
                }  
            });
        },
        /**
         *  删除日志
         */
        deleteDiary() {
            this.$http.post('/customer/followup/info/delete', {followId: this.diary.id}).then(res => {
                if (res.iworkuCode == 200) {
                    this.isDeleteDiary = true;
                    this.$imessage({
                        content: this.$t("public.tips.success"),
                        type: "success"
                    });
                }
            });
        }
    },
    watch: {
        diary: {
            handler(newVal) {
                if (newVal.id) {
                    this.item = newVal;
                }
                // 处理时间
                if (newVal.followAddTimeStr) {
                    let time = new Date(this.$global.localTime({ time: newVal.followAddTimeStr }));
                    this.timeInfo.year = time.getFullYear();
                    let month = time.getMonth() + 1;
                    this.timeInfo.day = time.getDate();
                    this.timeInfo.hour = time.getHours();
                    this.timeInfo.minute = time.getMinutes();
                    this.timeInfo.month = this.monthEnglish[month];
                }
            },
            immediate: true
        },
        id: {
            async handler(newVal) {
                if (newVal && this.type == 'target') {
                    let res = await this.$http.get(`/target/company/infobypk/${newVal}`);
                    if (res.iworkuCode == 200 && res.datas && res.datas.targetCompany.ownUser == 2 && this.userInfo.userRole == this.$global.userRole.regionalManager) {
                        
                        this.$http.post("/user/info/find/user", {id: res.datas.targetCompany.itemProjectManager}).then(ures => {
                            if (ures.iworkuCode == 200 && res.datas) {
                                let index = ures.datas.findIndex(val => this.userInfo.id == val.userId);
                                index > -1 ? this.isAllowOperate = true : this.isAllowOperate = false;
                            }
                        });
                    }
                }
            },
            immediate: true
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
            .order {
                margin-top: 15px;
                line-height: 30px;
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

.dairy-content {
    img {
        margin-bottom: 20px;
        max-width: 50%;
        display: block;
    }
        } 
</style>
