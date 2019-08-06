<template>
    <WorkDiary type="target" :id="$route.params.targetid" :itemid="$route.params.itemid" :isAllowAdd="isAllowAdd"></WorkDiary>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    data() {
        return {
            isAllowAdd: true
        }
    },
    components: {
        WorkDiary: () => import('@/components/work/WorkDiary.vue')
    },
    computed: {
        ...mapGetters("ipublic", ["userInfo"])
    },
    created() {
        /**
         * 查询当前目标公司是否分配
         * 1、如果分配了并且当前登录者有权限管理这个目标公司，那就允许添加工作日志
         * 2、否则不允许
         */
        this.$http.get(`/target/company/infobypk/${this.$route.params.targetid}`).then(res => {
        if (res.iworkuCode == 200 && res.datas) {
            res.datas.targetCompany.ownUser == 1 ? this.isAllowAdd = false : this.isAllowAdd = true;
            this.$http.post("/user/info/find/user", {id: res.datas.targetCompany.itemProjectManager}).then(ures => {
                if (res.iworkuCode == 200 && this.userInfo.userRole == this.$global.userRole.regionalManager) {
                    let index = ures.datas.findIndex(val => this.userInfo.id == val.userId);
                    index >= 0 ? this.isAllowAdd = true : this.isAllowAdd = false;
                }
            });
        }
      });
    }
}
</script>