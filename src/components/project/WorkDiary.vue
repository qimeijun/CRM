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
            isAllow: true
        }
    },
    computed: {
        ...mapGetters("ipublic", ["userInfo"])
    },
    created() {
        /**
         * 功能：给目标公司添加工作日志
         * 权限：
         *  1、未分配的项目公司不能添加工作日志
         *  2、已分配的项目公司属于当前这个登录人的管辖范围内
         */
        this.$http.get(`/customer/item/infobypk/${this.id}`).then(res => {
            if (res.iworkuCode == 200 && res.datas) {
                res.datas.probjectManager ? (function (_this, result) {
                    _this.$http.post("/user/info/find/user", {id: result.probjectManager}).then(ures => {
                    if (res.iworkuCode == 200 && _this.userInfo.userRole == _this.$global.userRole.regionalManager) {
                            let index = ures.datas.findIndex(val => _this.userInfo.id == val.userId);
                            index >= 0 ? _this.isAllow = true : _this.isAllow = false;
                        }
                    });
                }(this, res.datas)) : this.isAllow = false;
            }
        });
    }
}
</script>
