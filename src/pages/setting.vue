<template>
    <section class="setting">
        <ul class="setting__menu">
            <li v-for="(item, index) in menuList" :key="index" :class="activeMenu == item.name ? 'selected' : ''" @click="onChangeMenu(item)">{{ item.value }}</li>
        </ul>
        <el-scrollbar style="height: calc(100vh - 3rem);">
        <div class="setting__content">
            <UpdateMemberInfo referenceSource="setting" v-if="activeMenu == 'data'"></UpdateMemberInfo>
            <UpdatePassword v-else-if="activeMenu == 'password'" referenceSource="setting"></UpdatePassword>
        </div>
        </el-scrollbar>
    </section>
</template>
<script>
export default {
    components: {
        UpdateMemberInfo: () => import("@/components/member/ImproveMemeberInfo.vue"),
        UpdatePassword: () => import("@/components/member/UpdatePassword.vue")
    },
    data() {
        return {
            activeMenu: "data"
        }
    },
    computed: {
        menuList() {
            return [
                {
                    value: this.$t("setting.title[0]"),
                    name: "data"
                },
                {
                    value: this.$t("setting.title[1]"),
                    name: "password"
                }
            ]
        }
    },
    methods: {
        /**
         *  菜单切换
         */
        onChangeMenu(item) {
            this.activeMenu = item.name;
        }
    }
}
</script>
<style lang="scss" scoped>
.setting {
    margin: 20px auto 0;
    width:574px;
    height: 100vh;
    &__content {
        background-color: white;
        padding: .6rem .2rem .2rem;
        border-radius: 0 0 8px 8px;
    }

    &__menu {
        display: flex;
        justify-content: space-between;
        
        li {
            flex: 1;
            padding: 13px 0;
            text-align: center;
            font-size: 16px;
            background-color: white;
            border-radius:8px 8px 0px 0px;
            cursor: pointer;
        }
        li:first-child {
            margin-right: .1rem;
        }

        .selected {
            background-color: #8D43FF;
            color: $--default-white;
        }
    }
}
</style>
