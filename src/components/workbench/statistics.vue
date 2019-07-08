<template>
  <div class="iworku-card iworku-variables">
    <div class="variables-top">
      <h3>本月工作</h3>
      <p>
        2019/
        <span>05</span>
      </p>
    </div>

    <div style="height:250px;" id="variables"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("variables"));
    // 指定图表的配置项和数据
    let option = {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["1st Week", "2st Week", "3st Week", "4st Week"],
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
          data: [10, 52, 56, 40],
          itemStyle: {
            barBorderRadius: [100, 100, 0, 0]
          },
          emphasis: {
            label: {
              show: true,
              position: "top"
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
};
</script>
<style lang="scss" scoped>
.iworku-variables {
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