<template>
  <div class="target-probe">
    <div class="iworku-card probe-item" v-for="(item,index) in probelist" :key="'probe'+index">
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
            <li>修改报告</li>
            <li>删除</li>
          </ul>
        </Operate>
      </div>
      <h3>调研报告</h3>
      <div>
        <Attachment name="asdfs.psd"></Attachment>
        <Attachment name="asdfs.xsd"></Attachment>
        <Attachment name="asdfs.wsd"></Attachment>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    Attachment: () => import("@/components/lib/Attachment.vue")
  },
  data() {
    return {
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
    margin-bottom:30px;
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