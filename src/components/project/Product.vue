<template>
  <section class="iworku-card project-detail-product">
    <div class="product_top">
      <h3>产品</h3>
      <el-button type="primary" @click="show = true;productFrom=product">编辑</el-button>
    </div>
    <div class="product_content">
      <h4>{{product.name}}</h4>
      <div>
        <PhotosView></PhotosView>
      </div>
      <h4>附件(产品目录)</h4>
      <div>
        <Attachment name="asdfs.psd"></Attachment>
        <Attachment name="asdfs.xsd"></Attachment>
        <Attachment name="asdfs.wsd"></Attachment>
      </div>
      <h4>学习资料</h4>
      <div>
        <Attachment name="asdfs.psd"></Attachment>
        <Attachment name="asdfs.xsd"></Attachment>
        <Attachment name="asdfs.wsd"></Attachment>
      </div>
    </div>
    <div class="product_redact">
      <el-dialog title="修改资料" :visible.sync="show" width="600px">
        <h1>产品资料</h1>
        <el-form :model="productFrom" label-position="top">
          <el-form-item label="产品名称">
            <el-input v-model="productFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="产品图片">
            <el-input v-model="productFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="产品视频">
            <el-input v-model="productFrom.site" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="附件（产品目录）">
            <el-input v-model="productFrom.url" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="show = false">完成</el-button>
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