<template>
  <section class="member-team">
    <!-- 顶部按钮 start -->
    <!-- 
      功能：添加成员
      权限：
        1、这个团队的项目经理
        2、超级管理员
        3、区域经理
     -->
    <div v-if="teamInfo.teamSatus == 1 && ([$global.userRole.superAdministrator, $global.userRole.regionalManager].includes(userInfo.userRole) || userInfo.id == teamInfo.projectManager.id)" style="position: fixed; top: 1rem; right: .2rem;">
        <el-button type="primary" @click="addMemberDialogVisible=true;">{{ $t("memberManagement.btn.addMember") }}</el-button>
    </div>
    <!-- 顶部按钮 start -->
    <div class="member-team__list">
      <div class="member-team__list-name">
        <div
          v-if="Object.keys(teamInfo).length == 0"
          class="member-team__list-name--no"
          @click="addTeam"
        >{{ $t("memberInfo.noTeam") }}</div>
        <template v-else>
          <div
            class="member-team__list-name--data"
            :style="(teamInfo.teamColor && teamInfo.teamColor.includes(';')) ? `background:linear-gradient(315deg,${teamInfo.teamColor.split(';')[0]} 0%,${teamInfo.teamColor.split(';')[1]} 100%);` : `background-color: ${teamInfo.teamColor}`"
          >
            <div class="operate">
              <!-- 
                功能：团队操作
                权限：
                  1、成员：不能有任何操作
                  2、拥有这个团队的项目经理：能操作所有
                  3、区域经理和超级管理员：能冻结团队 -->
              <el-dropdown v-if="userInfo.userRole != $global.userRole.member && userInfo.userRole != $global.userRole.customer" @command="onHandleCommand" style="color: white;">
                <span class="el-dropdown-link">
                  {{ $t("memberInfo.operate") }}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu class="iworku-popper" slot="dropdown">
                  <!-- 
                    功能：编辑团队信息 和 移交管理员
                    权限：
                      1、项目经理
                      2、超级管理员
                      3、区域管理员
                      4、在团队正常的情况下
                   -->
                  <template v-if="teamInfo.teamSatus == 1 && [$global.userRole.projectManager, $global.userRole.superAdministrator, $global.userRole.regionalManager].includes(userInfo.userRole)">
                    <el-dropdown-item command="modify">{{ $t("memberInfo.teamOperate[0]") }}</el-dropdown-item>
                    <el-dropdown-item command="handOver">{{ $t("memberInfo.teamOperate[1]") }}</el-dropdown-item>
                  </template>
                  <!-- 
                    功能：将团队冻结
                    权限：
                      1、超级管理员
                      2、区域管理员
                   -->
                  <el-dropdown-item v-if="teamInfo.teamSatus == 1 && [$global.userRole.superAdministrator, $global.userRole.regionalManager].includes(userInfo.userRole)" command="frozen">
                    {{ $t("memberInfo.teamOperate[2]") }}
                  </el-dropdown-item>
                  <!-- 
                    功能：激活团队
                    权限
                      1、超级管理员
                      2、区域管理员
                   -->
                  <el-dropdown-item v-if="teamInfo.teamSatus == 2 && [$global.userRole.superAdministrator, $global.userRole.regionalManager].includes(userInfo.userRole)" command="active">
                    {{ $t("memberInfo.teamOperate[3]") }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="user-name">{{ teamInfo.teamName }}</div>
            <div class="leader">Leader: {{ (teamInfo.projectManager && teamInfo.projectManager.userNameZh) }}</div>
            <div class="location">
              <el-avatar :size="25" :src="`${$global.avatarURI}${teamInfo.teamCountryLogo}`" style="margin-right:10px;"></el-avatar>
              {{ $lang == $global.lang.en ? teamInfo.teamCountryEn : teamInfo.teamCountryZh }}
            </div>
          </div>
        </template>
      </div>
      <div class="member-team__list-member">
        <ul>
          <template v-if="teamInfo && teamInfo.userInfoList && teamInfo.userInfoList.length > 0">
            <template v-for="(item, index) in teamInfo.userInfoList">
            <li
              v-if="item && item.isDelete !== true"
              :key="index"
              style="background-color: white;"
            >
              <div
                style="margin: 20px; padding-top: 13px; display: flex; justify-content: space-between; align-items: center;"
              >
                <div style="display: flex; width: 30%;">
                  <el-avatar :size="50" :src="`${$global.avatarURI}${item.userProfileImage}`"></el-avatar>
                  <div
                    style="margin-right: auto;margin-left: .2rem; font-size: 14px;line-height: 35px;"
                  >
                    <span
                      style="display: block; color: #030303; "
                    >{{ item.userNameZh }}</span>
                    <span
                      class="el-icon-location"
                      style="display: block;color:#909090"
                    >{{ $lang == $global.lang.en ? item.userCountryEn : item.userCountryZh }}</span>
                  </div>
                </div>
                <span>{{ item.roleName }}</span>
                <div style="line-height: 30px;">
                  <span style="display: block;color:#7B7B7B;">{{ $t("memberInfo.joinTime") }}</span>
                  <span>{{ $global.localTime({ time: item.addTimeStr }) }}</span>
                </div>
                <Operate>
                  <ul class="member-team__operate">
                    <li @click="onRoute(item)">
                      {{ $t("memberInfo.teamMemberOperate[0]") }}
                    </li>
                    <!-- 团队移交 对象是项目经理，并且当前登录用户是这个团队的项目经理 -->
                    <!-- 
                      功能：团队移交
                      权限：
                        1、超级管理员、区域经理、项目经理
                        2、团队正常的情况下
                     -->
                    <li v-if="teamInfo.teamSatus == 1 && (item.userRole == $global.userRole.projectManager) && (userInfo.userRole == item.userRole || [$global.userRole.superAdministrator, $global.userRole.regionalManager].includes(userInfo.userRole))"
                      @click="handOverAdministratorDialogVisible=true;"
                    >{{ $t("memberInfo.teamMemberOperate[1]") }}</li>
                    <!-- 
                      功能：成员删除
                      权限：
                        1、只有成员和客户角色没有权限删除
                        2、团队正常的情况下
                      -->
                    <li v-if="teamInfo.teamSatus == 1 && item.userRole == $global.userRole.member && !([$global.userRole.member, $global.userRole.customer].includes(userInfo.userRole))" @click="onDeleteMember(item, index)">{{ $t("memberInfo.teamMemberOperate[2]") }}</li>
                  </ul>
                </Operate>
              </div>
            </li>
            </template>
          </template>
          <template v-else>
            <li v-for="(item, index) in 3" :key="index" style="margin-bottom: 10px;"></li>
          </template>
        </ul>
      </div>
    </div>
    <div class="member-team__statistics" :style="(!teamId || teamId == 'null') ? `background-color: #d4d4d4;` : `background-color: white;`">
      <div class="member-team__statistics-filter">
        <el-dropdown v-if="teamId && teamId != 'null'" @command="onChangeStatisticsType">
          <span class="el-dropdown-link" style="cursor: pointer;color: black;">
            {{ statisticsSelectParams.type == 'performance' ? $t("memberInfo.teamStatistics[0]") : $t("memberInfo.teamStatistics[1]") }}
            <i
              class="el-icon-caret-bottom el-icon--right"
            ></i>
          </span>
          <el-dropdown-menu class="member-team-dropdown" slot="dropdown">
            <el-dropdown-item command="performance">{{ $t("memberInfo.teamStatistics[0]") }}</el-dropdown-item>
            <el-dropdown-item command="compare">{{ $t("memberInfo.teamStatistics[1]") }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-if="teamId && teamId != 'null'" style="display: flex; align-items: center;">
            <!-- 时间类型， 年份或者月份 -->
          <el-dropdown @command="onChangeTime">
            <span class="el-dropdown-link" style="cursor: pointer; color: black;">
              {{ statisticsSelectParams.timeType == 'month' ? $t("memberInfo.teamStatisticsTime[0]") : $t("memberInfo.teamStatisticsTime[1]") }}
              <i
                class="el-icon-caret-bottom el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu class="member-team-dropdown" slot="dropdown">
              <el-dropdown-item command="month">{{ $t("memberInfo.teamStatisticsTime[0]") }}</el-dropdown-item>
              <el-dropdown-item command="year">{{ $t("memberInfo.teamStatisticsTime[1]") }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div style="margin-left: 10px; position: relative;">
              {{ statisticsSelectParams.year }}
              <span class="icon-top" @click="statisticsSelectParams.year--;"></span>
              <span class="icon-bottom" @click="statisticsSelectParams.year++;"></span>
          </div>
          <div v-if="statisticsSelectParams.timeType == 'month'" style="margin-left: 30px; position: relative;">
              {{ statisticsSelectParams.month }}
              <span class="icon-top" @click="minusMonth"></span>
              <span class="icon-bottom" @click="plusMonth"></span>
           </div>
        </div>
      </div>
      <Statistics
        :id="teamId"
        :team="teamInfo.userInfoList"
        :params="statisticsSelectParams"
      ></Statistics>
    </div>

    <!-- 编辑或者添加团队 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('team.add')"
      :visible.sync="updateTeamDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :close-on-click-modal="false"
      :width="$global.dialogWidth"
    >
      <el-scrollbar>
        <UpdateTeam :team="teamInfo" @updateTeam="updateTeamInfo"></UpdateTeam>
      </el-scrollbar>
    </el-dialog>
    <!-- 编辑或者添加团队 dialog end -->
    <!-- 移交管理员 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('memberInfo.handOverTeam')"
      :visible.sync="handOverAdministratorDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :close-on-click-modal="false"
      :width="$global.dialogWidth"
    >
      <el-scrollbar>
        <HandOverAdministrator
          :oldAdminstrator="teamInfo.projectManager"
          @getManager="getManager"
          operate="handOver"
          :params="{type: 'handOverTeamManger', data: teamInfo.userInfoList }"
        ></HandOverAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 移交管理员 dialog end -->

    <!-- 添加新成员 dialog start -->
    <el-dialog
        class="el-dialog__scroll"
        :title="$t('selectRegionalManager.title')"
        :visible.sync="addMemberDialogVisible"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        :close-on-click-modal="false"
        :width="$global.dialogWidth"
      >
        <el-scrollbar>
          <AddMember :params="{orgId: teamInfo.id, userRole: $global.userRole.member}" @onOperateSuccess="addMemberDialogVisible=false; getTeamInfo()"></AddMember>
        </el-scrollbar>
      </el-dialog>
    <!-- 添加新成员 dialog end -->

    <!-- 添加团队 dialog start -->
    <el-dialog
        class="el-dialog__scroll"
        :title="$t('selectRegionalManager.title')"
        :visible.sync="addTeamDialogVisible"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        :close-on-click-modal="false"
        :width="$global.dialogWidth"
      >
        <el-scrollbar>
          <AddTeam @updateTeam="addTeamDialogVisible=false; getTeamInfo();"></AddTeam>
        </el-scrollbar>
      </el-dialog>
    <!-- 添加团队 dialog end -->
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    UpdateTeam: () => import("@/components/team/UpdateTeam.vue"),
    HandOverAdministrator: () =>
      import("@/components/member/ChangeAdministrator.vue"),
    Statistics: () => import("@/components/team/Statistics.vue"),
    // 添加新成员
    AddMember: () => import("@/components/member/AddMember.vue"),
    AddTeam: () => import("@/components/team/UpdateTeam.vue"),
  },
  data() {
    return {
      updateTeamDialogVisible: false,
      handOverAdministratorDialogVisible: false,
      addMemberDialogVisible: false,
      addTeamDialogVisible: false,
      teamId: this.$route.params.id,
      teamInfo: {},
      statisticsSelectParams: {
        type: "performance",
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        timeType: "year"
      }
    };
  },
  computed: {
    ...mapGetters('ipublic', ['userInfo']),
    memberInfo() {
      return this.$store.getters["members/memberInfo"]
    }
  },
  created() {
    this.getTeamInfo();
  },
  methods: {
    // 获取团队信息
    getTeamInfo() {
      if (!this.teamId || this.teamId == 'null') {
        return false;
      }
      this.$http.get(`/user/team/infobypk/${this.teamId}`).then(res => {
        if (res.iworkuCode == 200) {
          res.datas.userInfoList && res.datas.userInfoList.unshift(res.datas.projectManager);
          this.teamInfo = res.datas;
        }
      });
    },
    /**
     *  添加团队
     *  只有项目经理才能添加
     */
    addTeam() {
      if (this.userInfo.userRole == this.$global.userRole.projectManager && this.memberInfo.userId == this.userInfo.id) {
        this.addTeamDialogVisible = true;
      }
    },
    /**
     *  团队菜单操作
     */
    onHandleCommand(command) {
      switch (command) {
        case "modify":
          this.onModifyTeam();
          break;
        case "handOver":
          this.onHandOverAdministrator();
          break;
        case "frozen":
          this.onFrozenTeam();
          break;
        case "active":
          this.onActiveTeam();
          break;
      }
    },
    /**
     *  编辑团队信息
     */
    onModifyTeam() {
      this.updateTeamDialogVisible = true;
    },
    /**
     *  移交团队管理员身份
     */
    onHandOverAdministrator() {
      this.handOverAdministratorDialogVisible = true;
    },
    /**
     *  冻结团队
     */
    onFrozenTeam() {
      this.$http.post('/user/team/update', {id: this.teamInfo.id, teamSatus: 2}).then(res => {
        if (res.iworkuCode == 200) {
          this.getTeamInfo();
          this.$imessage({
            content: this.$t("public.tips.success"),
            type: "success"
          });
        }
      });
    },
    /**
     *  激活团队
     */
    onActiveTeam() {
      this.$http.post('/user/team/update', {id: this.teamInfo.id, teamSatus: 1}).then(res => {
        if (res.iworkuCode == 200) {
          this.getTeamInfo();
          this.$imessage({
            content: this.$t("public.tips.success"),
            type: "success"
          });
        }
      });
    },
    /**
     *  接受子组件的信息，更新信息
     */
    updateTeamInfo() {
      this.updateTeamDialogVisible = false;
      this.getTeamInfo();
    },
    /**
     *  获取更改的管理员信息
     */
    getManager(data) {
      this.handOverAdministratorDialogVisible = false;
      // 团队中移交管理员
      this.$http.post('/user/team/user/rel/update/admin/user', {id: this.teamInfo.id, teamAdminUserId: data.id}).then(res => {
        if (res.iworkuCode == 200) {
          this.$imessage({
            content: this.$t("public.tips.success"),
            type: "success"
          });
          this.getTeamInfo();
        }
      });
    },
    /**
     *  成员删除
     */
    onDeleteMember(item, index) {
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
          if (item.targetCompanyCount > 0) {
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
                this.teamInfo.userInfoList.splice(index, 1);
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
     *  切换统计图类型
     */
    onChangeStatisticsType(type) {
      this.statisticsSelectParams.type = type;
    },
    /**
     *  切换时间类型
     */
    onChangeTime(type) {
      this.statisticsSelectParams.timeType = type;
    },
    /**
     *  月份增加
     */
    plusMonth() {
        this.statisticsSelectParams.month ++;
        this.statisticsSelectParams.month > 12 ? this.statisticsSelectParams.month = 12 : null;

    },
    /**
     *  月份相减
     */
    minusMonth() {
        this.statisticsSelectParams.month --;
        this.statisticsSelectParams.month < 1 ? this.statisticsSelectParams.month = 1 : null;
    },
    /**
     *  查看人员详情
     */
    onRoute(item) {
      this.$store.commit('members/$_set_memberInfo', {
        teamId: this.teamInfo.id, 
        userId: item.id, 
        username: item.userNameZh
      });
      this.$router.push({path: `/member/detail/info/${item.id}`})
    }
  }
};
</script>
<style lang="scss" scoped>
.member-team {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  &__list {
    flex: 1;
    margin-right: 0.1rem;
    &-name {
      height: 144px;
      background-color: #d4d4d4;
      border-radius: $--default-border-radius;
    }
    &-name--no {
      text-align: center;
      font-size: 18px;
      color: #7b7b7b;
      line-height: 144px;
      cursor: pointer;
    }
    &-name--data {
      color: $--default-white;
      height: 144px;
      border-radius: $--default-border-radius;
      background: linear-gradient(
        315deg,
        rgba(140, 0, 255, 1) 0%,
        rgba(216, 11, 30, 1) 100%
      );
      .operate {
        padding-top: 10px;
        text-align: right;
        margin-right: 3%;
        cursor: pointer;
      }
      .user-name {
        margin-left: .35rem;
        text-transform: capitalize;
        font-size: 24px;
        line-height: 50px;
        font-weight: 600;
      }
      .user-name:first-letter {
        font-size: 40px;
      }
      .leader {
        margin-left: .35rem;
        font-size: 18px;
        font-weight: 600;
      }
      .location {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: -25px;
        text-align: right;
        margin-right: 3%;
      }
    }

    &-member {
      margin-top: 20px;
      li {
        margin-bottom: -10px;
        height: 88px;
        background-color: #d4d4d4;
        border-radius: $--default-border-radius;
      }
    }
  }
  &__statistics {
    padding: 0.2rem;
    flex: 1;
    height: 384px;
    background-color: #d4d4d4;
    border-radius: $--default-border-radius;
    &-filter {
      display: flex;
      justify-content: space-between;
    }
    .icon-top {
        position: absolute;
    top: -6px;
    right: -16px;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        cursor: pointer;
        border-color: #f9f9f9 #ffffff #191818 #fcfffc;
    }
    .icon-bottom {
        position: absolute;
    top: 8px;
    right: -16px;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        cursor: pointer;
        border-color: #000000 #ffffff #ffffff #fdfffd;
    }
  }
  &__operate {
    li {
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.member-team-dropdown {
  li {
    padding: 0 20px !important;
  }
}
</style>
