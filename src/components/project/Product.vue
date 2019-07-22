<template>
  <section class="iworku-card project-detail-product">
    <div class="product_top">
      <h3>{{$t("projectInfo.menu[1]")}}</h3>
      <el-button type="primary" @click="show = true;productFrom=product">{{$t("projectInfo.product.view")}}</el-button>
    </div>
    <div class="product_content">
      <h4>{{product.name}}</h4>
      <div>
        <PhotosView></PhotosView>
      </div>
      <h4>{{$t("projectInfo.product.accessory")}}</h4>
      <div>
        <Attachment name="asdfs.psd"></Attachment>
        <Attachment name="asdfs.xsd"></Attachment>
        <Attachment name="asdfs.wsd"></Attachment>
      </div>
      <h4>{{$t("projectInfo.product.study")}}</h4>
      <div>
        <Attachment name="asdfs.psd"></Attachment>
        <Attachment name="asdfs.xsd"></Attachment>
        <Attachment name="asdfs.wsd"></Attachment>
      </div>
    </div>
    <div class="product_redact">
      <el-dialog title="修改资料" :visible.sync="show" width="600px">
        <h1>{{$t("project.from.thirdlyTitle")}}</h1>
        <el-form :model="productFrom" label-position="top">
          <el-form-item :label="$t('project.from.productName')">
            <el-input v-model="productFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('project.from.productImg')">
            <el-input v-model="productFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('project.from.productVideo')">
            <el-input v-model="productFrom.site" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('project.from.accessory')">
            <el-input v-model="productFrom.url" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="show = false">{{$t("project.btn.ok")}}</el-button>
        </div>
      </el-dialog>
    </div>
      
    
  </section>
</template>
<script>
export default {
  components: {
    Attachment: () => import("@/components/lib/Attachment.vue"),
    PhotosView:()=>import("@/components/project/PhotosView.vue")
  },
  data() {
    return {
      product: {
        name: "Wuxi Hariken Electric Tools Co., Ltd.",
        img: [],
        video: [],
        attachment: [],
        study: []
      },
      productFrom: {
        name: "",
        img: [],
        video: [],
        attachment: [],
        study: []
      },
      show: false,
    };
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.project-detail-product {
  .product_top {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      margin: 0;
    }
  }
}
</style>