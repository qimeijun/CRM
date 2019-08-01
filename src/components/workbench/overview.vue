<template>
  <!-- 项目概览 -->
  <div class="iworku-card workbench-overview">
    <h3>{{$t("workBench.overview.title")}}</h3>
    <el-row>
      <!-- 目标公司数 -->
      <el-col class="overview-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src="@/assets/img/home_img_01.png" alt />
        <p>
          <span>{{targetCompanyNumber}}</span>
          <br />
          <span>{{$t("workBench.overview.targetNum")}}</span>
        </p>
      </el-col>
      <!-- 已拜访 -->
      <el-col class="overview-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src="@/assets/img/home_img_02.png" alt />
        <p>
          <span>{{visitedNumber}}</span>
          <br />
          <span>{{$t("workBench.overview.vlinkNum")}}</span>
        </p>
      </el-col>
      <!-- 意向 -->
      <el-col class="overview-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src="@/assets/img/home_img_03.png" alt />
        <p>
          <span>{{intentionTargetCompanyNumber}}</span>
          <br />
          <span>{{$t("workBench.overview.intentionNum")}}</span>
        </p>
      </el-col>
      <!-- 订单 -->
      <el-col class="overview-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <img src="@/assets/img/home_img_04.png" alt />
        <p>
          <span>{{successNumber}}</span>
          <br />
          <span>{{$t("workBench.overview.orderNum")}}</span>
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    itemid: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      targetCompanyNumber: 0,
      visitedNumber: 0,
      intentionTargetCompanyNumber: 0,
      successNumber: 0
    };
  },
  watch: {
    itemid: function(newVal) {
      if (newVal !== "") {
        this.getItemNumber(newVal);
      }
    }
  },
  methods: {
    getItemNumber(id) {
      this.$http
        .post("/user/workbench/workbench/item/number", { itemId: id })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.targetCompanyNumber = res.datas.targetCompanyNumber;
            this.visitedNumber = res.datas.visitedNumber;
            this.intentionTargetCompanyNumber =
              res.datas.intentionTargetCompanyNumber;
            this.successNumber = res.datas.successNumber;
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.workbench-overview {
  height: 300px;
  .overview-item {
    display: flex;
    align-items: center;
    margin: 25px 0;
  }
  .overview-item img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
  }
  .overview-item p {
    :first-of-type {
      font-size: 30px;
      font-weight: 500;
      color: $--default-color;
      line-height: 36px;
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