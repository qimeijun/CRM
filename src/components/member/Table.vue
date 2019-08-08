<template>
    <div v-if="isDelete === false">
        <div
            :class="['member-table-list-tr', (!children && item.children && item.children.length > 0) ? 'member-table-list-tr--parent' : '', children ? 'member-table-list-tr--children':'', last ? 'member-table-list-tr--children-last' : '']"
        >
            <div class="member-table-list-user">
                <el-avatar :size="50" :src="`${$global.avatarURI}${item.userProfileImage}`"></el-avatar>
                <div class="member-table-list-user-right">
                    <span class="user-name">{{ $lang == $global.en ? item.userNameEn : item.userNameZh }}</span>
                    <span class="el-icon-location">{{ $lang == $global.en ? item.userCountryEn : item.userCountryZh }}</span>
                </div>
            </div>
            <div>{{ $lang == $global.en ? item.roleName : item.roleName }}</div>
            <div>{{ item.team }}</div>
            <div>{{ item.targetCompanyProcessingCount || 0}}</div>
            <div>{{ item.targetCompanyCount || 0 }}</div>
            <div style="flex: .8">{{ item.addTimeStr }}</div>
            <div style="flex: .3">
            <Operate>
                <ul>
                  <li class="member-table-list__click" @click="onRoute">
                    {{ $t("memberManagement.operate[0]") }}
                  </li>
                  <!-- 功能：管理员移交
                       权限： 
                          1、当前登录人是项目经理
                          2、当前登录人就是这个项目经理
                   -->
                  <li v-if="item.userRole == $global.userRole.projectManager && userInfo.id == item.id" class="member-table-list__click" @click="onHandAdministrator(item)">
                      {{ $t("memberManagement.operate[1]") }}
                  </li>
                  <!-- 人员删除： 
                       权限：
                         1、只有超级管理员、区域管理员、项目经理能删除成员
                         1、删除项目经理 需要在没有任何的员工前提下 并且只有超级管理员、区域管理员才可以删除
                         -->
                  
                  <template v-if="userInfo.userRole == $global.userRole.superAdministrator || userInfo.userRole == $global.userRole.regionalManager">
                    <template v-if="item.userRole == $global.userRole.member || (item.userRole == $global.userRole.projectManager && (item.userList && item.userList.length == 0))">
                      <li class="member-table-list__click"
                            @click="onDeleteMember(item)"
                        >{{ $t("memberManagement.operate[2]") }}</li>
                    </template>
                  </template>
                  <template v-if="userInfo.userRole == $global.userRole.projectManager">
                    <template v-if="item.userRole == $global.userRole.member">
                      <li class="member-table-list__click"
                            @click="onDeleteMember(item)"
                        >{{ $t("memberManagement.operate[2]") }}</li>
                    </template>
                  </template>
                </ul>
            </Operate>
            </div>
        </div>
        <!-- 移交管理员的dialog -->
        <el-dialog
            class="el-dialog__scroll"
            :title="$t('selectRegionalManager.title')"
            :visible.sync="changeAdministratorDialogVisible"
            top="5vh"
            :append-to-body="true"
            :modal="false"
            :lock-scroll="true"
            width="30%">
            <el-scrollbar class="scrollbar">
                <ChangeAdministrator @getManager="getManager" :oldAdminstrator="item" operate="handOver" :params="{type: 'handoverProjectManger', id:item.teamId }"></ChangeAdministrator>
            </el-scrollbar>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    ChangeAdministrator: () => import('@/components/member/ChangeAdministrator.vue')
  },
  props: {
    // 需要显示的数据
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    // 是否是子元素
    children: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 是否是子元素的最后一个
    last: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
      return {
          changeAdministratorDialogVisible: false,
          isDelete: false
      }
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"])
  },
  methods: {
    /**
     *  删除成员
     */
    onDeleteMember(item) {
      this.$confirm(
        `<i class="el-icon-question" style="color: #E50054; font-size: 48px;"></i><br/>${this.$t("memberManagement.deleteTip.content[0]")}`,
        this.$t("memberManagement.deleteTip.title"),
        {
          confirmButtonText: this.$t("memberManagement.deleteTip.btn[0]"),
          cancelButtonText: this.$t("memberManagement.deleteTip.btn[1]"),
          center: true,
          dangerouslyUseHTMLString: true
        }
      ).then(() => {
          /**
           * 确定删除
           * 如果有正在跟进的目标公司，就给出提示
           * 如果没有正在跟进的目标公司，就直接删除用户
           */
          if (this.item.targetCompanyCount > 0) {
            this.$confirm(
                `<i class="el-icon-question" style="color: #E50054; font-size: 48px;"></i><br/>${this.$t("memberManagement.deleteTip.content[1]")}<br/>${this.$t("memberManagement.deleteTip.content[2]")}`,
                this.$t("memberManagement.deleteTip.title"),
                {
                confirmButtonText: this.$t("memberManagement.deleteTip.btn[0]"),
                cancelButtonText: this.$t("memberManagement.deleteTip.btn[1]"),
                center: true,
                dangerouslyUseHTMLString: true
                }
            ).then(() => {
                // 确定
            }).catch(() => {
                // 取消
            });
          } else {
            this.$http.post('/user/info/remove', { userStatus: 2, id: item.id}).then(res => {
              if (res.iworkuCode == 200) {
                this.isDelete = true;
                this.$imessage({
                  content: this.$t('public.tips.success'),
                  type: "success"
                });
              }
            });
          }
        }).catch(() => {});
    },
    /**
     *  移交管理员
     */
    onHandAdministrator(item) {
        this.changeAdministratorDialogVisible = true;
    },
    /**
     *  获取管理员的信息
     */
    getManager(data) {
        this.changeAdministratorDialogVisible = false;
        // 修改这个团队的管理员
        this.$http.post('/user/team/user/rel/update/admin/user', { id: this.item.teamId, teamAdminUserId: data.id }).then(res => {
          if (res.iworkuCode == 200) {
            this.$imessage({
              content: this.$t('public.tips.success'),
              type: "success"
            });
            this.$parent.$parent.$parent.getRegionData();
          }
        });
    },
    /**
     *  页面跳转
     */
    onRoute() {
      // 存储团队ID
      this.$store.commit('members/$_set_memberInfo', {
        teamId: this.item.teamId, 
        userId: this.item.id, 
        username: this.item.userNameZh,
        userRole: this.item.userRole
      });
      this.$router.push({ path: `/member/detail/info/${this.item.id}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.member-table-list {
  &-tr {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $--default-light-gray-2;
    border-radius: $--default-border-radius;
    div {
      flex: 1;
      line-height: 30px;
      display: inline-block;
      padding: 0.1rem;
    }
  }
  
  &-tr--parent {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
  }
  &-tr--children {
    margin: 0px;
    border-radius: 0px !important;
    border-top: 1px solid #CFCFCF;
  }
  &-tr--children-last {
    border-bottom-left-radius: $--default-border-radius !important;
    border-bottom-right-radius: $--default-border-radius !important;
  }
  &__click {
    cursor: pointer;
  }
  &-user {
      display: flex !important;
     align-items: center !important;
    &-right {
        span {
            display: block;
        }
        .user-name {
            font-size:14px;
        }
        .el-icon-location {
            color: #909090;
            font-size: 14px;
        }
    }
  }
}
</style>
