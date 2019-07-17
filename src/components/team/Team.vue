<template>
  <section class="member-team">
    <!-- 顶部按钮 start -->
    <div style="position: fixed; top: 1rem; right: .2rem;">
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
            v-if="teamInfo.teamColor && teamInfo.teamColor.includes(';')"
            :style="`background:linear-gradient(315deg,${teamInfo.teamColor.split(';')[0]} 0%,${teamInfo.teamColor.split(';')[1]} 100%);`"
          >
            <div class="operate">
              <el-dropdown @command="onHandleCommand" style="color: white;">
                <span class="el-dropdown-link">
                  {{ $t("memberInfo.operate") }}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu class="iworku-popper" slot="dropdown">
                  <el-dropdown-item command="modify">{{ $t("memberInfo.teamOperate[0]") }}</el-dropdown-item>
                  <el-dropdown-item command="handOver">{{ $t("memberInfo.teamOperate[1]") }}</el-dropdown-item>
                  <el-dropdown-item command="frozen">{{ $t("memberInfo.teamOperate[2]") }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="user-name">{{ teamInfo.teamName }}</div>
            <div class="leader">Leader: {{ teamInfo.teamAdminUser }}</div>
            <div class="location">
              <el-avatar :size="50" :src="teamInfo.logo" style="margin-right:10px;"></el-avatar>
              {{ teamInfo.teamCountry }}
            </div>
          </div>
        </template>
      </div>
      <div class="member-team__list-member">
        <ul>
          <template v-if="teamInfo && teamInfo.member && teamInfo.member.length > 0">
            <li
              v-for="(item, index) in teamInfo.member"
              :key="index"
              style="background-color: white;"
            >
              <div
                style="margin: 20px; padding-top: 13px; display: flex; justify-content: space-between; align-items: center;"
              >
                <div style="display: flex;">
                  <el-avatar :size="50" :src="item.userProfileImage"></el-avatar>
                  <div
                    style="margin-right: auto;margin-left: .2rem; font-size: 14px;line-height: 35px;"
                  >
                    <span
                      style="display: block; color: #030303; "
                    >{{ $lang == $global.en ? item.userNameEn : item.userNameZh }}</span>
                    <span
                      class="el-icon-location"
                      style="display: block;color:#909090"
                    >{{ item.userCountry }}</span>
                  </div>
                </div>
                <span>{{ item.useRoleZh }}</span>
                <div style="line-height: 30px;">
                  <span style="display: block;color:#7B7B7B;">{{ $t("memberInfo.joinTime") }}</span>
                  <span>{{ item.addTimeStr }}</span>
                </div>
                <Operate>
                  <ul class="member-team__operate">
                    <li>
                      <router-link to="/member/detail/">{{ $t("memberInfo.teamMemberOperate[0]") }}</router-link>
                    </li>
                    <li
                      @click="handOverAdministratorDialogVisible=true;"
                    >{{ $t("memberInfo.teamMemberOperate[1]") }}</li>
                    <li>{{ $t("memberInfo.teamMemberOperate[2]") }}</li>
                  </ul>
                </Operate>
              </div>
            </li>
          </template>
          <template v-else>
            <li></li>
            <li></li>
            <li></li>
          </template>
        </ul>
      </div>
    </div>
    <div class="member-team__statistics" style="background-color: white;">
      <div class="member-team__statistics-filter">
        <el-dropdown @command="onChangeStatisticsType">
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
        <div style="display: flex; align-items: center;">
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
        :sType="statisticsSelectParams.type"
        :time="{year: statisticsSelectParams.year, month: statisticsSelectParams.month}"
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
      width="30%"
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
      width="30%"
    >
      <el-scrollbar>
        <HandOverAdministrator
          :oldAdminstrator="{name: teamInfo.member[0].userNameZh, location: teamInfo.member[0].teamCountry, avatar: teamInfo.member[0].userProfileImage}"
          @getManager="getManager"
          operate="handOver"
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
        width="30%"
      >
        <el-scrollbar>
          <AddMember></AddMember>
        </el-scrollbar>
      </el-dialog>
    <!-- 添加新成员 dialog end -->
  </section>
</template>
<script>
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    UpdateTeam: () => import("@/components/team/UpdateTeam.vue"),
    HandOverAdministrator: () =>
      import("@/components/member/ChangeAdministrator.vue"),
    Statistics: () => import("@/components/team/Statistics.vue"),
    // 添加新成员
    AddMember: () => import("@/components/member/AddMember.vue")
  },
  data() {
    return {
      updateTeamDialogVisible: false,
      handOverAdministratorDialogVisible: false,
      addMemberDialogVisible: false,
      teamInfo: {
        id: "sdjfskdjf",
        teamName: "Zhangsan Team",
        teamAdminUser: "admin",
        teamCountry: "越南",
        teamColor: "#CC208E;#6713D2",
        logo: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
        member: [
          {
            userNameZh: "lisi",
            userCountry: "越南",
            useRoleZh: "项目经理",
            useRoleEn: "项目经理",
            userProfileImage:
              "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
            addTimeStr: "2017/01/12"
          },
          {
            userNameZh: "lisi",
            userCountry: "越南",
            useRoleZh: "普通成员",
            useRoleEn: "普通成员",
            userProfileImage:
              "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
            addTimeStr: "2017/01/12"
          },
          {
            userNameZh: "lisi",
            userCountry: "越南",
            useRoleZh: "普通成员",
            useRoleEn: "普通成员",
            userProfileImage:
              "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
            addTimeStr: "2017/01/12"
          },
          {
            userNameZh: "lisi",
            userCountry: "越南",
            useRoleZh: "普通成员",
            useRoleEn: "普通成员",
            userProfileImage:
              "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
            addTimeStr: "2017/01/12"
          }
        ]
      },
      statisticsSelectParams: {
        type: "performance",
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        timeType: "year"
      }
    };
  },
  methods: {
    /**
     *  添加团队
     */
    addTeam() {},
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
    onFrozenTeam() {},
    /**
     *  接受子组件的信息，更新信息
     */
    updateTeamInfo() {
      this.updateTeamDialogVisible = false;
    },
    /**
     *  获取更改的管理员信息
     */
    getManager(data) {
      this.handOverAdministratorDialogVisible = false;
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
    }
  }
};
</script>
<style lang="scss" scoped>
.member-team {
  margin: 20px 0;
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
        margin-left: 10%;
        text-transform: capitalize;
        font-size: 24px;
        line-height: 50px;
      }
      .user-name:first-letter {
        font-size: 40px;
      }
      .leader {
        margin-left: 10%;
        font-size: 18px;
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
