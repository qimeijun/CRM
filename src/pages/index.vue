<template>
  <div class="content">
    <h2>{{ $t("content") }}</h2>
    <h3 style="margin-top: .4rem;">{{ content }}</h3>

    <el-button type="primary" @click="m_content">更改Vuex中的内容</el-button>

    <el-row style="margin-top: .4rem;" :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2"></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="20">
        <div style="height: 5rem" id="echarts"></div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="2"></el-col>
    </el-row>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import echarts from "echarts";
export default {
  computed: {
    ...mapGetters("example", ["content"])
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("echarts"));

    // 指定图表的配置项和数据
    let option = {
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      legend: {
        data: ["销量"]
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  methods: {
    ...mapMutations("example", ["m_content"])
  }
};
</script>
<style lang="scss" scoped>
.content {
  h2 {
    margin-top: .3rem;
  }
}
</style>

