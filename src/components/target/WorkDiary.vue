<template>
  <WorkDiary
    type="target"
    :id="$route.params.targetid"
    :itemid="$route.params.itemid"
    :isAllow="isAllow"
  ></WorkDiary>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isAllow: false
    };
  },
  components: {
    WorkDiary: () => import("@/components/work/WorkDiary.vue")
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"])
  },
  async created() {
    /**
     * 查询当前目标公司是否分配
     * 1、如果分配了并且当前登录者有权限管理这个目标公司，那就允许添加工作日志
     * 2、否则不允许
     */
    let res = await this.$http.get(
      `/target/company/infobypk/${this.$route.params.targetid}`
    );
    if (res.iworkuCode == 200 && res.datas) {
      let itemRes = await this.$http.get(
        `/customer/item/infobypk/${res.datas.targetCompany.itemId}`
      );
      if (itemRes.iworkuCode == 200) {
        //   项目结束状态不能操作
        if (itemRes.datas.itemStatus != 2) {
          // 如果这个目标公司未被分配，那么就不能进行操作
          res.datas.targetCompany.ownUser == 1
            ? (this.isAllow = false)
            : (function(_this, result) {
                result.datas.targetCompany.ownerUserId =
                  result.additionalParameters.targetCompanyUserInfo.id;
                _this.distinguishUserRoles(result.datas.targetCompany);
              })(this, res);
        } else {
          this.isAllow = false;
        }
      }
    }
  },
  methods: {
    distinguishUserRoles(targetCompany) {
      if (this.userInfo.userRole == this.$global.userRole.superAdministrator) {
        // 超级管理员可以做任何操作
        this.isAllow = true;
      } else if (targetCompany.ownerUserId == this.userInfo.id) {
        // 这个登录用户就是这个目标公司的持有者
        this.isAllow = true;
      } else if (
        this.userInfo.userRole == this.$global.userRole.projectManager &&
        this.userInfo.id == targetCompany.itemProjectManager
      ) {
        // 如果当前这个用户是项目经理，并且是这个项目的项目经理
        this.isAllow = true;
      } else if (
        this.userInfo.userRole == this.$global.userRole.regionalManager
      ) {
        // 如果当前用户是区域经理, 检查这个区域经理是不是这个项目经理的领导
        this.$http
          .post("/user/info/find/user", {
            id: targetCompany.itemProjectManager
          })
          .then(ures => {
            if (ures.iworkuCode == 200 && ures.datas) {
              let index = ures.datas.findIndex(
                val => this.userInfo.id == val.userId
              );
              index > -1 ? (this.isAllow = true) : (this.isAllow = false);
            }
          });
      }
    }
  }
};
</script>