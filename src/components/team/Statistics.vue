<template>
  <!-- 团队统计 -->
  <section class="team-statistics">
    <!-- 对比图 -->
    <div v-if="params.type == 'compare'" class="compare-line-title">
      <span class="monthly-champion">月度冠军</span>
      <span class="vs">VS</span>
      <el-dropdown @command="onChangeMember" class="member-name">
        <span class="el-dropdown-link">
          {{ selectMember.userNameEn }}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu class="member-name-menu" slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in team"
            :key="index"
            :command="item"
          >{{ item.userNameEn }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div :style="params.type == 'compare' ? 'display: block' : 'display: none'" class="compare-line" id="compareLine"></div>
    <div :style="params.type == 'performance' ? 'display: block' : 'display: none'" class="all-performance" id="allPerformance"></div>
  </section>
</template>
<script>
import echarts from "echarts";
export default {
    props: {
        /**
         *  时间 年 月，图标类型
         */
        params: {
            type: Object,
            default() {
                return {}
            }
        },
        /**
         *  团队ID
         */
        id: {
          type: String,
          default() {
            return "";
          }
        },
        /**
         *  团队成员
         */
        team: {
          type: Array,
          default() {
            return [];
          }
        }
    },
  data() {
    return {
      selectMember: null,
      weeks: ['1st Week', '2st Week', '3st Week', '4st Week', '5st Week']
    };
  },
  computed: {
    champion() {
      return this.$t("team.statistics[0]")
    }
  },
  methods: {
    // 切换成员
    onChangeMember(item) {
      this.selectMember = item;
    },
    /**
     * 成员对比业绩图
     */
    async getStatisticsCompareLine() {
      if (!this.id || this.id == 'null') {
        return false
      }
      let title = [this.champion, this.selectMember.userNameZh];
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
            data: [],
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
        tooltip: {
          show: true,
        },
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
            data: []
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
            data: []
          }
        ]
      };
      let params = {
        teamId: this.id,
        pattern: 'yyyy',
        text: `${this.params.year}`,
        userId: this.selectMember.id
      };
      if (this.params.timeType == 'month') {
        params.pattern = 'yyyy-MM';
        let month = this.params.month;
        month < 10 ? month = `0${month}` : null;
        params.text = `${this.params.year}-${month}`
      }
      let res = await this.$http.post('/user/team/user/rel/vs/number', params);
      if (res.iworkuCode == 200 && this.params.timeType == 'year' && res.additionalParameters && res.additionalParameters.champion && res.datas) {
        res.additionalParameters.champion.map(val => {
          option.xAxis[0].data.push(val.month);
          option.series[0].data.push(val.count);
        });
        let nameList = res.additionalParameters.champion.find(val => val.userId);
        if (nameList) {
          option.series[0].name = nameList.userNameZh;
        }
        res.datas.map(val => {
          option.series[1].data.push(val.count);
        });
      } else if (res.iworkuCode == 200 && this.params.timeType == 'month' && res.additionalParameters && res.additionalParameters.champion && res.datas) {
        res.additionalParameters.champion.map((val, index) => {
          option.xAxis[0].data.push(this.weeks[index]);
          option.series[0].data.push(val.count);
        });
        let nameList = res.additionalParameters.champion.find(val => val.userId);
        if (nameList) {
          option.series[0].name = nameList.userNameZh;
        }
        res.datas.map(val => {
          option.series[1].data.push(val.count);
        });
      }
      echarts.init(document.getElementById('compareLine')).setOption(option);
    },
    /**
     *  所有成员的业绩表
     */
    async getStatisticsAllPerformance() {
      if (!this.id || this.id == 'null') {
        return false
      }
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
          data: []
        },
        label: {
          show: true,
          position: "right",
          formatter: params => {
            return params.data;
          }
        },
        series: [
          {
            name: `${this.params.year}`,
            type: "bar",
            barWidth: "22",
            data: [],
            itemStyle: {
              barBorderRadius: [0, 10, 10, 0]
            }
          }
        ]
      };
      let params = {
        teamId: this.id,
        pattern: 'yyyy',
        text: `${this.params.year}` 
      };
      if (this.params.timeType == 'month') {
        params.pattern = 'yyyy-MM';
        let month = this.params.month;
        month < 10 ? month = `0${month}` : null;
        params.text = `${this.params.year}-${month}`
      }
      let res = await this.$http.post('/user/team/user/rel/number', params);
      if (res.iworkuCode == 200) {
        let tempData = res.datas || [];
        let tempSet = new Set();
        tempData.map(val => {
          option.yAxis.data.push(val.userNameZh);
          option.series[0].data.push(val.count);
          tempSet.add(val.id);
        });
        // 查找出没有数据的用户，并将 count 设置为0
        let resFilter = this.team.filter(val => !tempSet.has(val.id));
        if (resFilter) {
          resFilter.map(val => {
            option.yAxis.data.push(val.userNameZh);
            option.series[0].data.push(0);
          });
        }
      }
      echarts.init(document.getElementById('allPerformance')).setOption(option);
    }
  },
  watch: {
      params:{
        handler(newVal) {
          if (newVal.type == 'performance') {
              setTimeout(() => {
                  this.getStatisticsAllPerformance();
              }, 10);
          } else {
              setTimeout(() => {
                  this.getStatisticsCompareLine();
              }, 10);
          }
        },
        immediate: true,
        deep: true
      },
      team: {
        handler(newVal) {
          if (!newVal || newVal.length == 0) {
            return false;
          }
          this.selectMember = newVal[0];
        },
        immediate: true
      },
      selectMember(newVal) {
        if (newVal && this.params.type == 'compare') {
          this.getStatisticsCompareLine();
        }
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
