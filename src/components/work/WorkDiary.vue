<template>
    <section class="work-diary">
        <!-- 顶部按钮 start -->
        <div style="position: fixed; top: 1rem; right: .2rem;">
            <el-button type="primary" @click="onAddDiary">{{ $t("memberInfo.btn.addDiary") }}</el-button>
        </div>
        
        <!-- 顶部按钮 end -->
        <div class="work-diary__left">
            <div class="work-diary__left-top">
                <ul class="work-diary__menu">
                    <li v-for="(item, index) in menuList" :class="activeMenu == item.value ? 'active' : ''" :key="index" @click="onChangeMenu(item)">{{ item.name }}</li>
                </ul>
                <div style="margin-right: .1rem; display:flex; align-items: center;">
                    
                    <!-- <el-button type="primary" @click="onAddDiary" icon="el-icon-plus">{{ $t("memberInfo.btn.addDiary") }}</el-button> -->
                </div>
            </div>
            <!-- 工作日志模块 -->
            <el-scrollbar style="height: calc(100vh - 3.08rem);" >
            <div style="margin-top: 20px;" v-infinite-scroll="load" :infinite-scroll-immediate="false" :infinite-scroll-distance="100">
                <template v-if="workDiarList && workDiarList.length > 0">
                    <DiaryModule v-for="(item, index) in workDiarList" :key="index" :diary="item"></DiaryModule>
                </template>
                <template v-else>
                    <div style="height: calc(100vh - 3.3rem); background-color: white; border-radius: 8px; line-height: 200px; text-align: center;">
                        {{ $t("public.tips.noData") }}
                    </div>
                </template>
            </div>
            </el-scrollbar>
        </div>
        <div class="work-diary__right">
            <el-calendar class="work-diary__right-calendar" v-model="calendarValue">
                <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <div :class="(logMap.has(data.day.split('-')[2]) && data.type == 'current-month') ? 'have-log' : ''">
                        <el-badge :is-dot="logMap.get(data.day.split('-')[2]) && data.type == 'current-month'" class="item">
                            <span>
                                {{ data.day.split('-')[2] }}
                            </span>
                        </el-badge>
                    </div>
                </template>
            </el-calendar>
        </div>

        <!-- 添加工作日志 dialog start -->
        <el-dialog
        class="el-dialog__scroll"
        :title="$t('workDiary.add')"
        :visible.sync="addWorkDiaryDialogVisible"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        :close-on-click-modal="false"
        width="30%">
        <el-scrollbar class="scrollbar">
            <AddWorkDiary :id="id" :type="type" @onOperateSuccess="addWorkDiaryDialogVisible=false;getWorkDiary(activeMenu)"></AddWorkDiary>
        </el-scrollbar>
        </el-dialog>
        <!-- 添加工作日志 dialog end -->
    </section>
</template>
<script>
export default {
    props: {
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
        }
    },
    components: {
        AddWorkDiary: () => import("@/components/work/AddWorkDiary.vue"),
        DiaryModule: () => import("@/components/work/DiaryModule.vue"), 
    },
    data() {
        return {
            activeMenu: 'all',
            addWorkDiaryDialogVisible: false,
            calendarValue: new Date(),
            logMap: new Map(),
            workDiarList: [],
            page: {
                total: 0,
                pageSize: 5,
                pageNum: 1,
                totalPage: 1
            }
        }
    },
    computed: {
        menuList() {
            return [
                {
                    name: this.$t("memberInfo.workDiaryMenu[0]"),
                    value: "all",
                },
                {
                    name: this.$t("memberInfo.workDiaryMenu[1]"),
                    value: "project",
                },
                {
                    name: this.$t("memberInfo.workDiaryMenu[2]"),
                    value: "target",
                }
            ]
        },
    },
    methods: {
        load() {
            this.page.pageNum += 1;
            if (this.page.totalPage >= this.page.pageNum) {
                this.getWorkDiary(this.activeMenu);
            }
        },
        /**
         *  根据ID 查询工作日志
         */
        getWorkDiary(diaryType) {
            if (this.type == 'member') {
                this.$http.post('/customer/followup/info/user/withpaginglist', {
                    userId: this.id,
                    followType: diaryType,
                    pageSize: this.page.pageSize,
                    pageNum: this.page.pageNum
                }).then(res => {
                    if (res.iworkuCode == 200) {
                        this.page.pageNum > 1 ? this.workDiarList.push(...res.datas) : this.workDiarList = res.datas || [];
                        this.page.total = res.total;
                        this.page.totalPage = res.pages;
                    }
                });
            } else {
                this.$http.post('/customer/followup/info/withoutpaginglist', {
                    followItemId: this.id,
                    followType: diaryType
                }).then(res => {
                    if (res.iworkuCode == 200) {
                        this.page.pageNum > 1 ? this.workDiarList.push(...res.datas) : this.workDiarList = res.datas || [];
                        this.page.total = res.total;
                        this.page.totalPage = res.pages;
                    }
                });
            }
        },
        /**
         *  获取未读日志的日期
         */
        getCalendarList() {
            let params = {};
            if (this.type == 'member') {
                params.userId = this.id;
            } else {
                params.followItemId = this.id;
            }
            // 项目
            this.$http.post('/customer/followup/info/unread/date/withoutpaginglist', params).then(res => {
                if (res.iworkuCode == 200) {
                    res.datas.map(val => {
                        this.logMap.set(val.followDate.substr(-2), parseInt(val.unreadDateCount) > 0 ? true : false);
                    });
                    this.logMap = new Map(this.logMap);
                }
            });
        },
        /**
         * 切换顶部菜单
         */
        onChangeMenu(item) {
            this.activeMenu = item.value;
            this.page.pageNum = 1;
            if (item.value == 'project') {
                this.getWorkDiary(1)
            } else if (item.value == 'target') {
                this.getWorkDiary(2);
            } else {
                this.getWorkDiary();
            }
        },
        /**
         * 添加工作日志
         */
        onAddDiary() {
            this.addWorkDiaryDialogVisible = true;
        },
        /**
         *  根据日期查询工作日志
         */
        getWorkDiaryByDate(time) {
            let date = time.getDate();
            date < 10 ? date = `0${date}` : null;
            let month = time.getMonth() + 1;
            month < 10 ? month = `0${month}` : null;

            if (!this.logMap.has(`${date}`)) {
                return false;
            }
            let params = {
                followDate: `${time.getFullYear()}-${month}-${time.getDate()}`,
                pageSize: this.page.pageSize,
                pageNum: this.page.pageNum
            };
            if (this.type == 'project') {
                params.followItemId = this.id;
            } else if (this.type == 'member') {
                params.userId = this.id;
            }
            this.$http.post('/customer/followup/info/unread/withoutpaginglist', params).then(res => {
                if (res.iworkuCode == 200) {
                    this.page.pageNum > 1 ? this.workDiarList.push(...res.datas) : this.workDiarList = res.datas || [];
                    // 日期点击之后就设置为已读
                    this.logMap.set(`${date}`, false);
                    this.logMap = new Map(this.logMap);
                }
            });
        }
    },
    watch: {
        calendarValue(newVal, oldVal) {
            if (newVal) {
                // 获取月份
                let time = new Date(newVal);
                this.page.pageNum = 1;
                this.getWorkDiaryByDate(time);
            }
        },
        id: {
            handler(newval) {
                if (newval) {
                    this.getCalendarList();
                    this.getWorkDiary();
                }
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
.work-diary {
    display: flex;
    align-items: flex-start;
    margin-top: 10px;
    &__left {
        flex: 2;
        margin-right: .1rem;
        &-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: $--default-white;
            border-radius: $--default-border-radius;
        }
        .el-icon-date {
            margin-right: .1rem;
            font-size: 30px;
            cursor: pointer;
        }
    }
    &__menu {
        display: flex;
        li {
            padding: 20px;
            cursor: pointer;
            color: $--default-light-gray;
        }
        .active {
            color: $--default-black;
        }
    }

    &__right {
        display: flex;
        flex: 1;
        background-color: $--default-white;
        border-radius: $--default-border-radius;
        &-calendar {
            background-color: $--default-white;
            border-radius: $--default-border-radius;
        }
        .have-log {
            margin: auto;
            height: 100%;
            width: 100%;
            text-align: center;
            line-height: 24px;
            span {
                display: inline-block;
                height: 24px;
                width: 24px;
                background-color: $--default-color;
                color: $--default-white;
                border-radius: 50%;
            }
        }
    }
    
}
</style>
<style lang="scss">
.work-diary__right-calendar {
    .el-calendar-table  {
        td {
            position: relative;
            border: none !important;
            text-align: center;
        }
        .el-calendar-day {
            height: 50px;
            line-height: 35px;
        }
        td.is-today::after {
            content: "";
            position: absolute;
            display: inline-block;
            border-bottom: 3px solid $--default-color !important;
            width: 30px;
            top: 70%;
            left: 50%;
            transform: translate(-50%, 0);
        }
    }
}
</style>
