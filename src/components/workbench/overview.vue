<template>
  <div class="iworku-card workbench-overview">
    <h3>项目概览</h3>
    <el-row class="overview-item">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src alt />
        <p>
          <span>1237</span>
          <br />
          <span>目标公司数</span>
        </p>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src alt />
        <p>
          <span>867</span>
          <br />
          <span>已拜访目标公司数</span>
        </p>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src alt />
        <p>
          <span>78</span>
          <br />
          <span>意向目标公司数</span>
        </p>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src alt />
        <p>
          <span>0</span>
          <br />
          <span>取得订单数量</span>
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.workbench-overview {
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