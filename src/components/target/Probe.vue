<template>
<!-- 调研报告 -->
  <div class="target-probe">
    <div class="iworku-card probe-item" v-for="(item,index) in probelist" :key="'probe'+index">
      <div style="position: fixed; top: 1rem; right: .2rem;">
        <el-button type="primary" @click="show=true">{{$t("target.probe.upload")}}</el-button>
      </div>
      <div class="item_top">
        <el-avatar size="large" :src="'https://vodcn.iworku.com/'+item.img"></el-avatar>
        <div class="top_content">
          <h4>{{item.name}}</h4>
          <p>
            <i class="el-icon-location">&nbsp;{{item.country}}</i>
          </p>
        </div>
        <Operate>
          <ul>
            <li>{{$t("target.probe.update")}}</li>
            <li>{{$t("target.probe.delete")}}</li>
          </ul>
        </Operate>
      </div>
      <h3>{{$t("target.probe.title")}}</h3>
      <div>
        <Attachment name="asdfs.psd"></Attachment>
        <Attachment name="asdfs.xsd"></Attachment>
        <Attachment name="asdfs.wsd"></Attachment>
      </div>
    </div>
       <!-- 上传报告 start -->
    <el-dialog
      class="el-dialog__scroll"
      title="上传报告"
      :visible.sync="show"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <UploadReport></UploadReport>
      </el-scrollbar>
    </el-dialog>
    <!-- 上传报告 end -->
  </div>
</template>
<script>
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    // 文件样式
    Attachment: () => import("@/components/lib/Attachment.vue"),
    // 上传调研报告
    UploadReport: () => import("@/components/target/UploadReport.vue")
  },
  data() {
    return {
      show:false,
      probelist: [
        {
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Richard Norton",
          country: "越南"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.probe-item {
  width: 4.74rem;
  h3 {
    font-size: 16px;
    line-height: 22px;
  }
  .item_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .top_content {
      flex-grow: 2;
      margin-left: 10px;
    }
    h4 {
      font-size: 16px;
      margin-top: 0;
      margin-bottom: 10px;
    }
  }
  .el-icon-location {
    font-size: 14px;
  }
}
</style>