<template>
    <WorkDiary type="member" :id="id" :isAllow="isAllow"></WorkDiary>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    data() {
        return {
            id: this.$route.params.id,
            isAllow: true
        }
    },
    computed: {
        ...mapGetters("ipublic", ["userInfo"])
    },
    components: {
        WorkDiary: () => import('@/components/work/WorkDiary.vue')
    },
    created() {
        /**
         *  权限设置：
         *  1、如果当前登录的用户是区域经理或者是项目管理员，就查询登录用户是否是这个用户的上级
         */
        if (this.userInfo.id == this.id ) {
            // 用户自己
            this.isAllow = true;
        } else if (this.userInfo.userRole != this.$global.userRole.member && this.userInfo.userRole != this.$global.userRole.customer) {
            this.$http.post("/user/info/find/user", {
                id: this.id
            }).then(res => {
                if (res.iworkuCode == 200 && res.datas) {
                    let index = res.datas.findIndex(val => val.userId == this.userInfo.id);
                    index > -1 ? this.isAllow = true : this.isAllow = false;
                }
            });
        }
    }
}
</script>
