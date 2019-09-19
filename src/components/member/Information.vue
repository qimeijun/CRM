<template>
  <!-- 查看个人资料 -->
  <section class="member-info">
    <div class="member-info__user">
      <div class="member-info__details">
        <el-avatar :size="100" :src="`${$global.avatarURI}${userInformation.userProfileImage}`"></el-avatar>
        <div class="member-info__details-left">
          <p class="member-info__details-left-name">{{ userInformation.userNameZh }}</p>
          <p class="el-icon-location">{{ userInformation.userCountryName }}</p>
          <p class="member-info__details-left-gender">{{ userInformation.userGender == '2' ?  $t("member.gender.male") : $t("member.gender.female") }}</p>
        </div>
        <!-- 
          功能：基本信息编辑
          权限
            1、当前登录人的级别比正在查看信息的这个人高就可以修改
            2、当前登录人就是查看信息的这个人
         -->
        <template v-if="userInfo.id == userInformation.id || (userInformation.userRole == $global.userRole.regionalManager && userInfo.userRole == $global.userRole.superAdministrator) 
                        || (userInformation.userRole == $global.userRole.projectManager && [$global.userRole.regionalManager, $global.userRole.superAdministrator].includes(userInfo.userRole))
                        || (userInformation.userRole == $global.userRole.member && [$global.userRole.projectManager, $global.userRole.regionalManager, $global.userRole.superAdministrator].includes(userInfo.userRole))">
          <el-button
            class="member-info__details-left-btn"
            type="primary"
            @click="modifyMemberDialogVisible=true"
          >{{ $t("memberInfo.btn.modify") }}</el-button>
        </template>
        
      </div>
      <div class="member-info__account">
        <div>
          <p class="member-info__account-title">{{ $t("memberInfo.account") }}</p>
          <p class="member-info__account-value">{{ userInformation.userEmail }}</p>
          <p class="member-info__account-title">{{ $t("memberInfo.password") }}</p>
          <p class="member-info__account-value">***********</p>
        </div>
        <!-- 
          功能：修改密码
          权限
            1、当前登录人的级别比正在查看信息的这个任高就可以修改
            2、当前登录人就是查看信息的这个任
         -->
        <template v-if="userInfo.id == userInformation.id || (userInformation.userRole == $global.userRole.regionalManager && userInfo.userRole == $global.userRole.superAdministrator) 
                        || (userInformation.userRole == $global.userRole.projectManager && [$global.userRole.regionalManager, $global.userRole.superAdministrator].includes(userInfo.userRole))
                        || (userInformation.userRole == $global.userRole.member && [$global.userRole.projectManager, $global.userRole.regionalManager, $global.userRole.superAdministrator].includes(userInfo.userRole))">
        <el-button
          class="member-info__details-left-btn"
          type="primary"
          @click="modifyPasswordDialogVisible=true"
        >{{ $t("memberInfo.btn.password") }}</el-button>
        </template>
      </div>
    </div>
    <div class="member-info__statistics">
      <div class="member-info__pie">
        <div style="font-size:16px; color:#1E1E1E;">{{ $t("memberInfo.statistics[0]") }}</div>
        <div ref="memberStatisticsPie" style="height: 300px;"></div>
      </div>
      <div class="member-info__line">
        <div style="display: flex;">
            <div style="font-size:16px; color:#1E1E1E;">{{ $t("memberInfo.statistics[1]") }}</div>
            <div style="font-size:14px; margin-left: auto;">
                {{ new Date().getFullYear() }} /
                <span style="font-size:20px; color: #4937EA">{{ new Date().getMonth() + 1 }}</span>
            </div>
        </div>
        <div ref="memberStatisticsLine" style="height: 300px;"></div>
      </div>
    </div>

    <!-- 修改成员信息 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('memberInfo.modifyInfo')"
      :visible.sync="modifyMemberDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :close-on-click-modal="false"
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <UpdateMemberInfo :user="userInformation" @onOperateSuccess="modifyMemberDialogVisible=false;getUserInfo();"></UpdateMemberInfo>
      </el-scrollbar>
    </el-dialog>
    <!-- 修改成员信息 dialog end -->
    <!-- 修改成员密码 dialog start -->
    <el-dialog
      :title="$t('password.modify')"
      :visible.sync="modifyPasswordDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :close-on-click-modal="false"
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <UpdatePassword :user="userInformation" @onOperateSuccess="modifyPasswordDialogVisible=false;"></UpdatePassword>
      </el-scrollbar>
    </el-dialog>
    <!-- 修改成员密码 dialog end -->
  </section>
</template>
<script>
import echarts from "echarts"
import { mapGetters } from "vuex"
export default {
  components: {
    UpdateMemberInfo: () => import("@/components/member/ImproveMemeberInfo.vue"),
    UpdatePassword: () => import("@/components/member/UpdatePassword.vue")
  },
  data() {
    return {
      modifyMemberDialogVisible: false,
      modifyPasswordDialogVisible: false,
      id: this.$route.params.id,
      userInformation: {},
      weeks: ['1st Week', '2nd Week', '3rd Week', '4th Week', '5th Week']
    };
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"])
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    this.getMemberStatisticsPie();
    this.getMemberStatisticsLine();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.$http.get(`/user/info/infobypk/${this.id}`).then(res => {
        if (res.iworkuCode == 200 && res.datas) {
          this.userInformation = res.datas;
          // 从其他页面进来就没有团队ID，所以查询之后重新保存一份， 例如：项目管理页面点击项目经理头像
          this.$store.commit('members/$_set_memberInfo', {
            teamId: res.datas.teamId, 
            userId: res.datas.id, 
            username: res.datas.userNameZh,
            userRole: res.datas.userRole,
            status: res.datas.userStatus
          });
        }
      });
    },
    /**
     *  统计饼图
     */
    async getMemberStatisticsPie() {
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "center",
          y: "center",
          data: [
            {
              icon: "circle",
              name: this.$t("memberInfo.statistics[0]")
            },
            {
              icon: "circle",
              name: this.$t("memberInfo.statistics[1]")
            },
            {
              icon: "circle",
              name: this.$t("memberInfo.statistics1[2]")
            }
          ]
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["45%", "80%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: "inner",
                formatter: "{c}",
                fontSize: 18,
                align: "center"
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              {
                value: 0,
                name: this.$t("memberInfo.statistics[0]"),
                label: {
                  color: "#fff"
                }
              },
              {
                value: 0,
                name: this.$t("memberInfo.statistics[1]"),
                label: {
                  color: "#fff"
                }
              },
              {
                value: 0,
                name: this.$t("memberInfo.statistics1[2]"),
                label: {
                  color: "#1E1E1E"
                }
              }
            ]
          }
        ],
        color: ["#E50054", "#8D43FF", "#EBEAEE"]
      };

      let res = await this.$http.get(`/user/team/user/rel/task/number/${this.id}`);
      if (res.iworkuCode == 200 && res.datas) {
        option.series[0].data[0].value = res.datas.successNumber || 0;
        option.series[0].data[1].value = res.datas.processingNumber || 0;
        option.series[0].data[2].value = res.datas.privateNumber || 0;
      }
      echarts.init(this.$refs.memberStatisticsPie).setOption(option);
    },
    /**
     *  柱状统计图
     */
    async getMemberStatisticsLine() {
      let option = {
        color: ["#4DD0E1"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
              position: 'right',
            type: "value",
            axisLine: {
                show: false
            }
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "60%",
            itemStyle: {
                barBorderRadius: [12, 12, 0, 0]
            },
            label: {
                show: true,
                position: "top",
                backgroundColor: "#ffffff",
                shadowColor: "#0000003f",
                color: '#505D6F'
            },
            barWidth: '24',
            data: []
          }
        ]
      };
      let date = new Date();
      let month = date.getMonth() + 1;
      month < 10 ? month = `0${month}` : null
      let res = await this.$http.post('/user/team/user/rel/task/month/number', {
        userId: this.id,
        text: `${date.getFullYear()}-${month}`
      });
      if (res.iworkuCode == 200) {
        res.datas.map((val, index) => {
          option.xAxis[0].data.push(this.weeks[index]);
          option.series[0].data.push(val.count);
        });
      }
      echarts.init(this.$refs.memberStatisticsLine).setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.member-info {
  margin: 10px 0;
  &__user {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }
  &__details {
    margin-right: 0.1rem;
    flex: 1.5;
    display: flex;
    align-items: center;
    padding: 0.3rem 0.2rem;
    background-color: $--default-white;
    border-radius: $--default-border-radius;
    &-left {
      line-height: 30px;
      margin-left: 0.2rem;
    }
    &-left-name {
      font-size: 16px;
    }
    .el-icon-location {
      font-size: 12px;
    }
    &-left-btn {
      margin-left: auto;
      align-self: flex-start;
    }
  }
  &__account {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0.3rem 0.2rem;
    background-color: $--default-white;
    border-radius: $--default-border-radius;
    line-height: 35px;
    &-title {
      color: $--default-light-gray;
    }
    &-value {
      margin-top: -15px; 
    }
  }
  &__statistics {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 400px;
  }
  &__pie {
    margin-right: 0.1rem;
    padding: 0.3rem 0.2rem;
    flex: 1;
    background-color: $--default-white;
    border-radius: $--default-border-radius;
  }
  &__line {
    flex: 1;
    padding: 0.3rem 0.2rem;
    width: 28%;
    background-color: $--default-white;
    border-radius: $--default-border-radius;
  }
}
</style>
