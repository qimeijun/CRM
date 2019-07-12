<template>
  <!-- 团队统计 -->
  <section class="team-statistics">
    <!-- 对比图 -->
    <div v-if="sType == 'compare'" class="compare-line-title">
      <span class="monthly-champion">月度冠军</span>
      <span class="vs">VS</span>
      <el-dropdown @command="onChangeMember" class="member-name">
        <span class="el-dropdown-link">
          {{ selectMember.userNameEn }}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu class="member-name-menu" slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in memberList"
            :key="index"
            :command="item"
          >{{ item.userNameEn }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div :style="sType == 'compare' ? 'display: block' : 'display: none'" class="compare-line" id="compareLine"></div>
    <div :style="sType == 'performance' ? 'display: block' : 'display: none'" class="all-performance" id="allPerformance"></div>
  </section>
</template>
<script>
import echarts from "echarts";
export default {
    props: {
        /**
         *  图标类型，业绩图 performance  对比图compare
         */
        sType: {
            type: String,
            default: 'performance'
        },
        /**
         *  时间 年 月
         */
        time: {
            type: Object,
            default() {
                return {
                    year: new Date().getFullYear(),
                    month: new Date().getMonth() + 1
                }
            }
        }
    },
  data() {
    return {
      selectMember: null,
      memberList: [
        {
          id: "1",
          userNameZh: "张三",
          userNameEn: "zhangsan"
        },
        {
          id: "2",
          userNameZh: "张三2",
          userNameEn: "zhangsan2"
        },
        {
          id: "3",
          userNameZh: "张三3",
          userNameEn: "zhangsan3"
        }
      ]
    };
  },
  created() {
    this.selectMember = this.memberList[0];
  },
  mounted() {
    // this.getStatisticsCompareLine();
    // this.getStatisticsAllPerformance();
  },
  methods: {
    // 切换成员
    onChangeMember(item) {
      this.selectMember = item;
    },
    /**
     * 成员对比业绩图
     */
    getStatisticsCompareLine() {
      let title = ["月度冠军", "zhangsan"];
      let option = {
        color: ["#8D43FF", "#4DD0E1"],
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
            position: "right",
            type: "value",
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: title[0],
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
              color: "#505D6F"
            },
            barWidth: "24",
            data: [10, 52, 200, 334, 390, 330, 220]
          },
          {
            name: title[1],
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
              color: "#505D6F"
            },
            barWidth: "24",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };
      echarts.init(document.getElementById('compareLine')).setOption(option);
    },
    /**
     *  所有成员的业绩表
     */
    getStatisticsAllPerformance() {
      let option = {
        tooltip: {
          show: false
        },
        color: ["#A333FF"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"]
        },
        label: {
          show: true,
          position: "right",
          formatter: params => {
            return params.name + ":" + params.data;
          }
        },
        series: [
          {
            name: "2011年",
            type: "bar",
            barWidth: "22",
            data: [18203, 23489, 29034, 104970, 131744, 630230],
            itemStyle: {
              barBorderRadius: [0, 10, 10, 0]
            }
          }
        ]
      };
      echarts.init(document.getElementById('allPerformance')).setOption(option);
    }
  },
  watch: {
      sType: {
          handler(newVal, oldVal) {
            if (newVal == 'performance') {
                setTimeout(() => {
                    this.getStatisticsAllPerformance();
                }, 10);
            } else {
                setTimeout(() => {
                    this.getStatisticsCompareLine();
                }, 10);
                
            }
          },
          immediate: true
      },
      time(newVal, oldVal) {

      }
  }
};
</script>
<style lang="scss" scoped>
.team-statistics {
  height: 100%;
  .compare-line,
  .all-performance {
    height: 350px;
  }
  .compare-line-title {
      margin-top: 10px;
  }
  .monthly-champion::before {
    content: "";
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #8d43ff;
  }
  .vs {
    color: #7b7b7b;
    margin: 0 10px;
  }
  .member-name {
    cursor: pointer;
    color: #1e1e1e;
  }
  .member-name::before {
    content: "";
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #4dd0e1;
  }
}
</style>
<style lang="scss">
.member-name-menu {
  li {
    padding: 0 10px !important;
  }
}
</style>
