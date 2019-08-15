<template>
    <WorkDiary type="project" :id="id" :isAllow="isAllow"></WorkDiary>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    components: {
        WorkDiary: () => import('@/components/work/WorkDiary.vue')
    },
    data() {
        return {
            id: this.$route.params.itemid,
            isAllow: false
        }
    },
    computed: {
        ...mapGetters("ipublic", ["userInfo"])
    },
    created() {
        /**
         * 功能：给项目公司添加工作日志
         * 权限：
         *  1、未分配的项目公司不能添加工作日志
         *  2、已分配的项目公司属于当前这个登录人的管辖范围内
         */
        if (this.userInfo.userRole == this.$global.userRole.superAdministrator) {
            // 超级管理员
            this.isAllow = true;
        } else if (this.userInfo.userRole == this.$global.userRole.projectManager) {
            this.$http.get(`/customer/item/infobypk/${this.id}`).then(res => {
                if (res.iworkuCode == 200 && res.datas) {
                    (res.datas.probjectManager == this.userInfo.id && res.datas.itemStatus!=2) ? this.isAllow = true : this.isAllow = false;
                }
            });
        } else if (this.userInfo.userRole == this.$global.userRole.regionalManager) {
            this.$http.get(`/customer/item/infobypk/${this.id}`).then(res => {
                if (res.iworkuCode == 200 && res.datas) {
                    (res.datas.probjectManager&&res.datas.itemStatus!=2) ? (function (_this, result) {
                        _this.$http.post("/user/info/find/user", {id: result.probjectManager}).then(ures => {
                        if (ures.iworkuCode == 200) {
                                let index = ures.datas.findIndex(val => (_this.userInfo.id == val.userId ));
                                index >= 0 ? _this.isAllow = true : _this.isAllow = false;
                            }
                        });
                    }(this, res.datas)) : this.isAllow = false;
                }
            });
        }
    }
}
</script>
