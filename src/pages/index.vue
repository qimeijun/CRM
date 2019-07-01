<template>
  <div class="content">
    <h2>{{ $t("content") }}</h2>
    <h3 style="margin-top: 40px;">{{ content }}</h3>

    <el-button type="primary" @click="m_content">更改Vuex中的内容</el-button>

    <el-row style="margin-top: 40px;" :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2"></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="20">
        <div style="height: 500px" id="echarts"></div>
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
    

// 横向柱状图

let optionB = {
    title: {
        text: '世界人口总量',
        subtext: '数据来自网络'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['2011年', '2012年']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
    },
    series: [
        {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
    ]
};
myChart.setOption(option,optionB);

  },
  methods: {
    ...mapMutations("example", ["m_content"])
  }
};
</script>
<style lang="scss" scoped>
.content {
  h2 {
    margin-top: 30px;
  }
}
</style>
