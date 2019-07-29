<template>
  <!-- 产品 -->
  <section class="iworku-card project-detail-product">
     <div style="position:fixed; top: 1rem; right: .2rem;">
          <!-- 结束项目 -->
      <el-button
        class="product-endbtn"
        @click="onDeleteMember(itemid,2)"
      >{{$t("projectInfo.endProject")}}</el-button>
      <!-- 重启项目 -->
      <el-button class="product-endbtn" @click="onRestartMember(itemid,3)">重启项目</el-button>
    </div>
    <div class="product_top">
      <h3>{{$t("projectInfo.menu[1]")}}</h3>
      <el-button
        type="primary"
        @click="show = true;productFrom=product"
      >{{$t("projectInfo.product.view")}}</el-button>
    </div>
    <div class="product_content">
      <h4>{{product.productName}}</h4>
      <div class="content_img">
        <PhotosView :imgList="product.imgList"></PhotosView>
        <VideoView :videoList="product.videoList"></VideoView>
      </div>
      <h4>{{$t("projectInfo.product.accessory")}}</h4>
      <div>
        <Attachment v-for="(item,index) in product.attachmentList" :key="'attachment'+index" :name="item.nodeFiles"></Attachment>
      </div>
      <h4>{{$t("projectInfo.product.study")}}</h4>
      <div>
         <Attachment v-for="(item,index) in product.studyList" :key="'attachment'+index" :name="item.nodeFiles"></Attachment>
      </div>
    </div>
    <div class="product_redact">
      <el-dialog title="修改资料" :visible.sync="show" width="600px">
        <h1>{{$t("project.from.thirdlyTitle")}}</h1>
        <el-form :model="productFrom" label-position="top">
          <el-form-item :label="$t('project.from.productName')">
            <el-input v-model="productFrom.productName" autocomplete="off"></el-input>
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
    PhotosView: () => import("@/components/project/PhotosView.vue"),
    VideoView: () => import("@/components/project/VideoView.vue")
  },
  data() {
    return {
      product: {
        productName: "Wuxi Hariken Electric Tools Co., Ltd.",
        imgList: [],
        videoList: [],
        attachmentList: [],
        studyList: []
      },
      productFrom: {
        productName: "",
        img: [],
        video: [],
        attachment: [],
        study: []
      },
      show: false
    };
  },
  computed: {
    itemid() {
      return this.$route.params.itemid;
    }
  },
  created() {
    if (this.itemid) {
      this.getProduct(this.itemid);
    }
  },
  methods: {
    // 获取项目产品信息
    getProduct(id) {
      this.$http.post('/customer/company/product/item/withoutpaginglist',{ itemId: id }).then(res => {
        console.log("产品", res);
        if (res.iworkuCode == 200) {
          this.product.productName = res.datas[0].productName;
          // 整理图片
          this.product.imgList = res.datas[0].productNodeList.filter(o => {
            return o.nodeType == 1;
          });
          // 整理视频
          this.product.videoList = res.datas[0].productNodeList.filter(o => {
            return o.nodeType == 2;
          });
          // 整理附件
          this.product.attachmentList = res.datas[0].productNodeList.filter(o => {
            return o.nodeType == 3;
          });
          // 整理学习资料
          this.product.studyList = res.datas[0].productNodeList.filter(o => {
            return o.nodeType == 4;
          });
        }
      });
    },
        // 结束项目
    onDeleteMember(id) {
      this.$msgbox({
        title: "提示",
        message:
          "<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>您确定要结束此项目吗？</p>",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          this.$http
            .post("/customer/item/update/status", {
              itemId: id,
              itemStatus: 2
            })
            .then(res => {});
          this.$message({
            type: "success",
            message: "已结束项目"
          });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    // 重启项目
    onRestartMember(id) {
      this.$msgbox({
        title: "提示",
        message:
          "<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>您确定要重启此项目吗？</p>",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          this.$http
            .post("/customer/item/update/status", {
              itemId: id,
              itemStatus: 3
            })
            .then(res => {});
          this.$message({
            type: "success",
            message: "已重启项目"
          });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
  }
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
  .product_content {
    .content_img {
      display: flex;
    }
  }
  .product-endbtn{
    color: $--default-color;
  }
}
</style>