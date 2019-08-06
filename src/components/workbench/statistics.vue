<template>
  <!-- 工作台统计图 -->
  <div class="iworku-card workbench-variables">
    <div class="variables-top">
      <h3>{{$t("workBench.variables.title")}}</h3>
      <p>
        {{year}}/
        <span>{{month}}</span>
      </p>
    </div>
    <div style="height:250px;" id="variables"></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import echarts from "echarts";
export default {
  data() {
    return {
      year: "",
      month: "",
      weekList: [],
      numberList: []
    };
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"])
  },
  async created() {
    let date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    let datas = await this.$http
      .post("/user/team/user/rel/task/month/number", {
        userId: this.userInfo.id
      })
      .then(res => {
        if (res.iworkuCode == 200) {
          console.log("工作台统计", res);
          return res.datas;
        } else {
          return [];
        }
      });
    this.weekList = datas.map(o => {
      return this.$lang == this.$global.lang.en
        ? `${o.week}st Week`
        : `第${o.week}周`;
    });
    this.numberList = datas.map(o => {
      return o.count;
    });
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("variables"));
    // 指定图表的配置项和数据
    let option = {
      color: ["#3398DB"],
      grid: {
        left: "0%",
        right: "0%",
        bottom: "3%",
        top: "8%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: this.weekList,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          position: "right"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "30%",
          data: this.numberList,
          itemStyle: {
            barBorderRadius: [100, 100, 0, 0]
          },
          label: {
            show: true,
            position: "top",
            backgroundColor: "#ffffff",
            shadowColor: "#0000003f",
            shadowBlur: 3,
            shadowOffsetY: 1,
            padding: [3, 4]
          }
        }
      ]
    };
    myChart.setOption(option, true);
  },
  methods: {
    getStatistics() {}
  }
};
</script>
<style lang="scss" scoped>
.workbench-variables {
  height: 300px;
  .variables-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 14px;
      font-weight: 400;
      color: rgba(122, 122, 122, 1);
      line-height: 20px;
    }
    p span {
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 28px;
    }
  }
}
</style>