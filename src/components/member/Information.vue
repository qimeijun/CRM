<template>
  <!-- 查看个人资料 -->
  <section class="member-info">
    <div class="member-info__user">
      <div class="member-info__details">
        <el-avatar :size="100" src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"></el-avatar>
        <div class="member-info__details-left">
          <p class="member-info__details-left-name">Zhangsan</p>
          <p class="el-icon-location">chengdu,China</p>
          <p class="member-info__details-left-gender">男</p>
        </div>
        <el-button
          class="member-info__details-left-btn"
          type="primary"
          @click="modifyMemberDialogVisible=true"
        >{{ $t("memberInfo.btn.modify") }}</el-button>
      </div>
      <div class="member-info__account">
        <div>
          <p class="member-info__account-title">{{ $t("memberInfo.account") }}</p>
          <p class="member-info__account-value">sjdkjfuisjsdfisjfksdf@iworku.com</p>
          <p class="member-info__account-title">{{ $t("memberInfo.password") }}</p>
          <p class="member-info__account-value">***********</p>
        </div>
        <el-button
          class="member-info__details-left-btn"
          type="primary"
          @click="modifyPasswordDialogVisible=true"
        >{{ $t("memberInfo.btn.password") }}</el-button>
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
      :title="$t('selectRegionalManager.title')"
      :visible.sync="modifyMemberDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <UpdateMemberInfo></UpdateMemberInfo>
      </el-scrollbar>
    </el-dialog>
    <!-- 修改成员信息 dialog end -->
    <!-- 修改成员密码 dialog start -->
    <el-dialog
      :title="$t('selectRegionalManager.title')"
      :visible.sync="modifyPasswordDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <UpdatePassword></UpdatePassword>
      </el-scrollbar>
    </el-dialog>
    <!-- 修改成员密码 dialog end -->
  </section>
</template>
<script>
import echarts from "echarts";
export default {
  components: {
    UpdateMemberInfo: () => import("@/components/member/ImproveMemeberInfo.vue"),
    UpdatePassword: () => import("@/components/member/UpdatePassword.vue")
  },
  data() {
    return {
      modifyMemberDialogVisible: false,
      modifyPasswordDialogVisible: false
    };
  },
  mounted() {
    this.getMemberStatisticsPie();
    this.getMemberStatisticsLine();
  },
  methods: {
    /**
     *  统计饼图
     */
    getMemberStatisticsPie() {
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
              name: "成单客户"
            },
            {
              icon: "circle",
              name: "跟进客户"
            },
            {
              icon: "circle",
              name: "私海客户"
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
                value: 335,
                name: "成单客户",
                label: {
                  color: "#fff"
                }
              },
              {
                value: 310,
                name: "跟进客户",
                label: {
                  color: "#fff"
                }
              },
              {
                value: 234,
                name: "私海客户",
                label: {
                  color: "#1E1E1E"
                }
              }
            ]
          }
        ],
        color: ["#E50054", "#8D43FF", "#EBEAEE"]
      };
      echarts.init(this.$refs.memberStatisticsPie).setOption(option);
    },
    /**
     *  柱状统计图
     */
    getMemberStatisticsLine() {
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
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };
      echarts.init(this.$refs.memberStatisticsLine).setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.member-info {
  margin: 20px 0;
  &__user {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }
  &__details {
    margin-right: 0.1rem;
    flex: 1.5;
    display: flex;
    align-items: flex-start;
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
