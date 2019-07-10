<template>
    <section class="team-work-diary">
        <div class="team-work-diary__left">
            <div class="team-work-diary__left-top">
                <ul class="team-work-diary__menu">
                    <li v-for="(item, index) in menuList" :class="activeMenu == item.value ? 'active' : ''" :key="index" @click="onChangeMenu(item)">{{ item.name }}</li>
                </ul>
                <div style="margin-right: .1rem; display:flex; align-items: center;">
                    <i class="el-icon-date"></i>
                    <el-button type="primary" @click="onAddDiary" icon="el-icon-plus">{{ $t("memberInfo.btn.addDiary") }}</el-button>
                </div>
            </div>
        </div>
        <div class="team-work-diary__right">
            <el-calendar class="team-work-diary__right-calendar" v-model="calendarValue">
                <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <p :class="(isHaveLog.includes(data.day.split('-')[2]) && data.type == 'current-month') ? 'have-log': ''">
                        {{ data.day.split('-')[2] }}
                    </p>
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
import AddWorkDiary from "@/components/AddWorkDiary.vue"
export default {
    components: {
        AddWorkDiary
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
            isHaveLog: ['01', '03', '10', '20']
        }
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
.team-work-diary {
    display: flex;
    margin-top: 20px;
    &__left {
        flex: 1;
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
            border-radius: 50%;
            height: 50px;
            width: 50px;
            background-color: $--default-color;
            color: $--default-white;
            text-align: center;
            line-height: 50px;
        }
    }
    
}
</style>
