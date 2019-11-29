<template>

<el-scrollbar class="setting-scrollbar" style="height: calc(100vh - .8rem);">
    <section class="setting">
        <ul class="setting__menu">
            <li v-for="(item, index) in menuList" :key="index" :class="activeMenu == item.name ? 'selected' : ''" @click="onChangeMenu(item)">{{ item.value }}</li>
        </ul>        
        <div class="setting__content">
            <!-- 用户信息修改 
                角色： 超级管理员、区域管理员、项目经理、普通成员 -->
            <UpdateMemberInfo v-if="activeMenu == 'data' && userInfo.userRole !== $global.userRole.customer" referenceSource="setting" :user="userInfo"></UpdateMemberInfo>
            <UpdateUserInfo v-else-if="activeMenu === 'data' && userInfo.userRole === $global.userRole.customer" referenceSource="setting"></UpdateUserInfo>
            <UpdatePassword v-else-if="activeMenu == 'password'" :user="userInfo" referenceSource="setting"></UpdatePassword>
        </div>
    </section>
    </el-scrollbar>
</template>
<script>
import { mapGetters} from 'vuex'
export default {
    components: {
        UpdateMemberInfo: () => import("@/components/member/ImproveMemeberInfo.vue"),
        UpdatePassword: () => import("@/components/member/UpdatePassword.vue"),
        UpdateUserInfo: () => import("@/components/customer/UpdateUserInfo.vue")
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
                    value: this.userInfo.userRole === this.$global.userRole.customer ? this.$t("setting.title[2]") : this.$t("setting.title[0]"),
                    name: "data"
                },
                {
                    value: this.$t("setting.title[1]"),
                    name: "password"
                }
            ]
        },
        ...mapGetters('ipublic', ['userInfo'])
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