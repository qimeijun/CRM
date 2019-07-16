<template>
  <!-- 项目概览 -->
  <div class="iworku-card workbench-overview">
    <h3>{{$t("workBench.overview.title")}}</h3>
    <el-row class="overview-item">
      <!-- 目标公司数 -->
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src alt />
        <p>
          <span>{{targetNum}}</span>
          <br />
          <span>{{$t("workBench.overview.targetNum")}}</span>
        </p>
      </el-col>
      <!-- 已拜访 -->
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src alt />
        <p>
          <span>{{vlinkNum}}</span>
          <br />
          <span>{{$t("workBench.overview.vlinkNum")}}</span>
        </p>
      </el-col>
      <!-- 意向 -->
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src alt />
        <p>
          <span>{{intentionNum}}</span>
          <br />
          <span>{{$t("workBench.overview.intentionNum")}}</span>
        </p>
      </el-col>
      <!-- 订单 -->
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src alt />
        <p>
          <span>{{orderNum}}</span>
          <br />
          <span>{{$t("workBench.overview.orderNum")}}</span>
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      targetNum: 123123,
      vlinkNum: 23,
      intentionNum: 4,
      orderNum: 1
    };
  }
};
</script>
<style lang="scss" scoped>
.workbench-overview {
  height: 300px;
  .overview-item img {
    width: 45px;
    height: 45px;
    background: rgba(238, 226, 255, 1);
  }
  .overview-item p {
    :first-of-type {
      font-size: 30px;
      font-weight: 500;
      color: $--default-color;
      line-height: 42px;
    }
    :last-of-type {
      font-size: 12px;
      font-weight: 450;
      color: rgba(30, 30, 30, 1);
      line-height: 17px;
    }
  }
}
</style> 