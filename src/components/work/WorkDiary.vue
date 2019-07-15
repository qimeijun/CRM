<template>
    <section class="work-diary">
        <div class="work-diary__left">
            <div class="work-diary__left-top">
                <ul class="work-diary__menu">
                    <li v-for="(item, index) in menuList" :class="activeMenu == item.value ? 'active' : ''" :key="index" @click="onChangeMenu(item)">{{ item.name }}</li>
                </ul>
                <div style="margin-right: .1rem; display:flex; align-items: center;">
                    
                    <el-button type="primary" @click="onAddDiary" icon="el-icon-plus">{{ $t("memberInfo.btn.addDiary") }}</el-button>
                </div>
            </div>
            <!-- 工作日志模块 -->
            <div style="margin-top: 20px;">
                <DiaryModule></DiaryModule>
                <DiaryModule></DiaryModule>
                <DiaryModule></DiaryModule>
            </div>
        </div>
        <div class="work-diary__right">
            <el-calendar class="work-diary__right-calendar" v-model="calendarValue">
                <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <div @click="onnChangeDiary" :class="(logMap.has(data.day.split('-')[2]) && data.type == 'current-month') ? 'have-log' : ''">
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
        width="30%">
        <el-scrollbar class="scrollbar">
            <AddWorkDiary></AddWorkDiary>
        </el-scrollbar>
        </el-dialog>
        <!-- 添加工作日志 dialog end -->
    </section>
</template>
<script>
export default {
    components: {
        AddWorkDiary: () => import("@/components/work/AddWorkDiary.vue"),
        DiaryModule: () => import("@/components/work/DiaryModule.vue"), 
    },
    data() {
        return {
            activeMenu: 'all',
            addWorkDiaryDialogVisible: false,
            calendarValue: new Date(),
            menuList: [
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
            ],
            isHaveLog: [
                {
                    date: '02',
                    isRead: true
                },
                {
                    date: '12',
                    isRead: true
                },
                {
                    date: '22',
                    isRead: true
                }
            ],
            logMap: new Map()
        }
    },
    created() {
        this.dataProcessiong();
    },
    methods: {
        /**
         * 切换顶部菜单
         */
        onChangeMenu(item) {
            this.activeMenu = item.value;
        },
        /**
         * 添加工作日志
         */
        onAddDiary() {
            this.addWorkDiaryDialogVisible = true;
        },
        /**
         *  处理返回来的日历数据
         */
        dataProcessiong() {
            this.isHaveLog.map((val) => {
                this.logMap.set(val.date, val.isRead);
            });
        },
        /**
         *  点击日历，切换工作日志日期
         */
        onnChangeDiary() {
            console.log(this.calendarValue);
        }
    },
    watch: {
        calendarValue(newVal, oldVal) {
            if (newVal) {
                // 获取月份
                let month = new Date(newVal).getMonth() + 1;
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
.work-diary {
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
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
            border: none !important;
            text-align: center;
        }
        .el-calendar-day {
            height: 50px;
            line-height: 35px;
        }
    }
}
</style>
