<template>
  <!-- 产品 -->
  <section class="iworku-card project-detail-product">
    <div style="position:fixed; top: 1rem; right: .2rem;">
      <!-- 结束项目 -->
      <el-button
        v-show="itemStatus!=2&&userInfo.userRole!=$global.userRole.member&&userInfo.userRole!=$global.userRole.customer"
        class="product-endbtn"
        @click="onDeleteMember(itemid,2)"
      >{{$t("projectInfo.endProject")}}</el-button>
      <!-- 重启项目 -->
      <el-button
        v-show="itemStatus==2&&userInfo.userRole!=$global.userRole.member&&userInfo.userRole!=$global.userRole.customer"
        class="product-endbtn"
        @click="onRestartMember(itemid,3)"
      >{{$t("projectInfo.restartProject")}}</el-button>
    </div>
    <div class="product_top">
      <h3>{{$t("projectInfo.menu[1]")}}</h3>
      <el-button
        v-show="userInfo.userRole!=$global.userRole.member"
        type="primary"
        @click="show = true;getProduct(itemid);"
      >{{$t("projectInfo.product.view")}}</el-button>
    </div>
    <div class="product_content">
      <h4>{{product.productName}}</h4>
      <div class="content_img">
        <PhotosView v-show="product.imgList.length>0" :imgList="product.imgList"></PhotosView>
        <VideoView v-show="product.videoList.length>0" :videoList="product.videoList"></VideoView>
      </div>
      <h4>{{$t("projectInfo.product.accessory")}}</h4>
      <div>
        <Attachment
          v-for="(item,index) in product.attachmentList"
          :key="'attachment'+index"
          :name="item.nodeFiles"
        ></Attachment>
      </div>
      <h4>{{$t("projectInfo.product.study")}}</h4>
      <div>
        <Attachment
          v-for="(item,index) in product.studyList"
          :key="'attachment'+index"
          :name="item.nodeFiles"
        ></Attachment>
      </div>
    </div>
    <div class="product_redact">
      <el-dialog :title="$t('project.updateTitle')" :visible.sync="show" :width="$global.dialogWidth">
        <ChangeProduct :product="product" @close="show = false; getProduct(itemid);"></ChangeProduct>
      </el-dialog>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {
    Attachment: () => import("@/components/lib/Attachment.vue"),
    PhotosView: () => import("@/components/project/PhotosView.vue"),
    VideoView: () => import("@/components/project/VideoView.vue"),
    ChangeProduct: () => import("@/components/project/ChangeProduct.vue")
  },
  data() {
    return {
      product: {
        productName: "",
        imgList: [],
        videoList: [],
        attachmentList: [],
        studyList: []
      },
      show: false,
      itemStatus: 1
    };
  },
  computed: {
    itemid() {
      return this.$route.params.itemid;
    },
    ...mapGetters("ipublic", ["userInfo"])
  },
  created() {
    if (this.itemid) {
      this.getProduct(this.itemid);
      this.getItemStatus(this.itemid);
    }
  },
  methods: {
    // 获取项目产品信息
    getProduct(id) {
      this.$http
        .post("/customer/company/product/item/withoutpaginglist", {
          itemId: id
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.product.id = res.datas[0].id;
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
            this.product.attachmentList = res.datas[0].productNodeList.filter(
              o => {
                return o.nodeType == 3;
              }
            );
            // 整理学习资料
            this.product.studyList = res.datas[0].productNodeList.filter(o => {
              return o.nodeType == 4;
            });
          }
        });
    },
    // 获取项目状态
    getItemStatus(id) {
      this.$http.get(`/customer/item/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.itemStatus = res.datas.itemStatus;
        }
      });
    },
    // 结束项目
    onDeleteMember(id) {
      this.$msgbox({
        title: this.$t("projectStatus.title"),
        message: `<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>${this.$t(
          "projectStatus.end.messageText"
        )}</p>`,
        confirmButtonText: this.$t("projectStatus.btn.determine"),
        cancelButtonText: this.$t("projectStatus.btn.cancel"),
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
            .then(res => {
              if (res.iworkuCode == 200) {
                this.getProduct(this.itemid);
                this.getItemStatus(this.itemid);
                this.$message({
                  type: "success",
                  message: this.$t("projectStatus.end.success")
                });
              }
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: this.$t("projectStatus.catch")
          });
        });
    },
    // 重启项目
    onRestartMember(id) {
      this.$msgbox({
        title: this.$t("projectStatus.title"),
        message: `<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>${this.$t(
          "projectStatus.restart.messageText"
        )}</p>`,
        confirmButtonText: this.$t("projectStatus.btn.determine"),
        cancelButtonText: this.$t("projectStatus.btn.cancel"),
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          this.$http
            .post("/customer/item/update/status", {
              itemId: id,
              itemStatus: 1
            })
            .then(res => {
              if (res.iworkuCode == 200) {
                this.getProduct(this.itemid);
                this.getItemStatus(this.itemid);
                this.$message({
                  type: "success",
                  message: this.$t("projectStatus.restart.success")
                });
              }
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: this.$t("projectStatus.catch")
          });
        });
    }
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
  .product-endbtn {
    color: $--default-color;
  }
}
</style>