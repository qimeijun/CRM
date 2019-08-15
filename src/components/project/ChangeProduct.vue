<template>
  <div>
    <h1>{{$t("project.from.thirdlyTitle")}}</h1>
    <el-form :model="productFrom" label-position="top" ref="productFrom">
      <el-form-item :label="$t('project.from.productName')">
        <el-input v-model="productFrom.productName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('project.from.productImg')">
        <el-row v-for="(item,index) in productFrom.imgList" :key="'img'+index">
          <el-col style="position:relative;" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <img width="80px" style="height:80px;" :src="`${$global.avatarURI}${item.nodeFiles}`" alt />
            <el-button
              type="primary"
              size="mini"
              class="deleteimg_btn"
              @click="onDeleteImg(index)"
            >{{$t("project.btn.detele")}}</el-button>
          </el-col>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" style="text-align:right;">
            <el-input v-model="item.nodeDescription"></el-input>
            <el-button
              v-show="index===productFrom.imgList.length-1"
              type="text"
              @click="imgShow=true"
            >{{$t("project.btn.continueUpload")}}</el-button>
          </el-col>
        </el-row>
        <el-row v-show="imgShow||productFrom.imgList.length==0">
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <!-- 上传图片 start -->
            <el-upload
              :action="$global.qiniuURL"
              :show-file-list="false"
              accept="image/jpeg, image/gif, image/png, image/bmp"
              :on-progress="getImgProgress"
              :on-success="onUploadAvatarSuccessImg"
              :before-upload="onBeforeAvatarUploadImg"
              :data="uploadData"
            >
              <el-button class="changeProduct_upload_btn">
                <i class="el-icon-upload"></i>
                <p>{{$t("project.btn.uploadImg")}}</p>
              </el-button>
            </el-upload>
            <!-- 上传图片 end -->
          </el-col>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <el-input
              v-model="imgDescription"
              autocomplete="off"
              :placeholder="$t('project.placeholder.describe')"
              style="margin-bottom:14px;"
            ></el-input>
            <el-progress v-show="imgProgress" :percentage="imgProgress" color="#E50054"></el-progress>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 产品视频 start -->
      <el-form-item :label="$t('project.from.productVideo')">
        <el-row>
          <el-col class="video-content" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <video
              v-if="productFrom.videoList[0].nodeFiles!=''"
              :src="`${$global.avatarURI}${productFrom.videoList[0].nodeFiles}`"
            ></video>
            <el-upload
              :action="$global.qiniuURL"
              :show-file-list="false"
              accept="video/ogg, video/mp4, video/webm"
              :on-success="onUploadAvatarSuccessVideo"
              :before-upload="onBeforeAvatarUploadVideo"
              :on-progress="getVideoProgress"
              :data="uploadData"
              class="video_upload"
            >
              <el-button v-if="productFrom.videoList[0].nodeFiles==''" class="changeProduct_upload_btn">
                <i class="el-icon-video-camera-solid"></i>
                <p>{{$t("project.btn.uploadVideo")}}</p>
              </el-button>
              <el-button v-else class="reupload_btn" type="primary" size="mini">{{$t("project.btn.UploadAgain")}}</el-button>
            </el-upload>
          </el-col>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <el-input
              v-model="productFrom.videoList[0].nodeDescription"
              autocomplete="off"
              :placeholder="$t('project.placeholder.describe')"
              style="margin-bottom:14px;"
            ></el-input>
            <el-progress
              v-show="videoPercentage"
              :percentage="videoPercentage"
              :format="videoformat"
              color="#E50054"
            ></el-progress>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 产品视频 end -->
      <!-- 附件（产品目录） start -->
      <el-form-item :label="$t('project.from.accessory')">
        <el-row>
          <el-col style="display:flex;flex-wrap:wrap;">
            <Attachment
              v-for="(item,index) in productFrom.attachmentList"
              :key="'accessory'+index"
              :name="item.nodeFiles"
              :isDelete="true"
              @onDelete="onDeleteAccessory(index)"
            ></Attachment>
            <el-upload
              :action="$global.qiniuURL"
              :show-file-list="false"
              :on-success="onUploadAvatarSuccessAccessory"
              :before-upload="onBeforeAvatarUploadAccessory"
              :data="uploadData"
            >
              <el-button class="changeProduct_upload_btn">
                <i class="el-icon-paperclip"></i>
                <p>{{$t("project.btn.uploadAccessory")}}</p>
              </el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 附件（产品目录） end -->
      <!-- 学习资料 start -->
      <el-form-item :label="$t('project.from.study')">
        <el-row>
          <el-col style="display:flex;flex-wrap:wrap;">
            <Attachment
              v-for="(item,index) in productFrom.studyList"
              :key="'accessory'+index"
              :name="item.nodeFiles"
              :isDelete="true"
              @onDelete="onDeleteLearn(index)"
            ></Attachment>
            <el-upload
              :action="$global.qiniuURL"
              :show-file-list="false"
              :on-success="onUploadAvatarSuccessLearn"
              :before-upload="onBeforeAvatarUploadAccessory"
              :data="uploadData"
            >
              <el-button class="changeProduct_upload_btn">
                <i class="el-icon-paperclip"></i>
                <p>{{$t("project.btn.uploadAccessory")}}</p>
              </el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 学习资料 end -->
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:right;">
      <el-button type="primary" @click="onsubmitForm('productFrom')">{{$t("project.btn.ok")}}</el-button>
    </div>
  </div>
</template>
<script>
import { getIndustry, getQiniuToken, rename } from "@/plugins/configuration.js";
export default {
  components: {
    Attachment: () => import("@/components/lib/Attachment.vue")
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    this.productFrom = { ...this.product };
    if (this.productFrom.videoList.length == 0) {
      this.productFrom.videoList = [
        {
          nodeDescription: "",
          nodeFiles: "",
          nodeType: 2
        }
      ];
    }
  },
  data() {
    return {
      imgShow: false,
      uploadData: {},
      imgDescription: "",
      videoPercentage: 0,
      imgProgress: 0,
      productFrom: {
        id: "",
        productName: "",
        imgList: [],
        videoList: [
          {
            nodeDescription: "",
            nodeFiles: "",
            nodeType: 2
          }
        ],
        attachmentList: [],
        studyList: []
      },
      deleteList: []
    };
  },
  methods: {
    onsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            id: this.productFrom.id,
            productName: this.productFrom.productName,
            productNodeList: [
              ...this.productFrom.imgList,
              ...this.productFrom.videoList,
              ...this.productFrom.attachmentList,
              ...this.productFrom.studyList
            ]
          };
          this.$http
            .post("/customer/company/product/update", params)
            .then(res => {
              //   删除
              this.deleteList.map(o => {
                this.$http.post(`/third_party/qiniu/delete/${o}`).then(res => {
                  if (res.iworkuCode == 200) {
                    this.$emit("close");
                  }
                });
              });
            });
          
        }
      });
    },
    /**
     *  图片上传成功
     */
    onUploadAvatarSuccessImg(response) {
      this.productFrom.imgList.push({
        nodeFiles: response.key,
        nodeDescription: this.imgDescription,
        nodeType: 1
      });
      this.imgDescription = "";
      this.imgProgress = 100;
      setTimeout(() => {
        this.imgProgress = 0;
        this.imgShow = false;
      }, 400);
    },
    /**
     *  附件上传成功
     */
    onUploadAvatarSuccessAccessory(response) {
      this.productFrom.attachmentList.push({
        nodeFiles: response.key,
        nodeDescription: "",
        nodeType: 3
      });
    },
    /**
     *  学习资料上传成功
     */
    onUploadAvatarSuccessLearn(response) {
      this.productFrom.studyList.push({
        nodeFiles: response.key,
        nodeDescription: "",
        nodeType: 4
      });
    },
    /**
     *  视频上传成功
     */
    onUploadAvatarSuccessVideo(response) {
      // 删除之前视频的空间
      if (this.productFrom.videoList[0].nodeFiles) {
        // 将删除的视频存在删除列表提交后一并处理
        this.deleteList.push(this.productFrom.videoList[0].nodeFiles);
      }
      this.videoPercentage = 100;
      this.productFrom.videoList[0].nodeFiles = response.key;
    },
    // 图片上传之前
    async onBeforeAvatarUploadImg(file) {
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error(this.$t("project.rules.img"));
      }
      // 获取七牛token
      this.uploadData.token = await getQiniuToken(this);
      this.uploadData.key = rename(file.name);
      return isLt3M;
    },
    // 视频上传之前
    async onBeforeAvatarUploadVideo(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error(this.$t("project.rules.video"));
      }
      // 获取七牛token
      this.uploadData.token = await getQiniuToken(this);
      this.uploadData.key = rename(file.name);
      return isLt20M;
    },
    // 附件/学习资料上传之前
    async onBeforeAvatarUploadAccessory(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error(this.$t("project.rules.accessory"));
      }
      // 获取七牛token
      this.uploadData.token = await getQiniuToken(this);
      this.uploadData.key = rename(file.name);
      return isLt5M;
    },
    // 获取视频上传进度
    getVideoProgress(event, file, fileList) {
      this.videoPercentage = parseInt(file.percentage);
    },
    // 获取图片上传进度
    getImgProgress(event, file, fileList) {
      this.imgProgress = parseInt(file.percentage);
    },
    videoformat(percentage) {
      return percentage === 100 ? this.$t("project.rules.uploadSuccess") : `${percentage}%`;
    },
    // 删除附件
    onDeleteAccessory(index) {
      this.deleteList.push(this.productFrom.attachmentList[index].nodeFiles);
      this.productFrom.attachmentList.splice(index, 1);
    },
    onDeleteLearn(index) {
      this.deleteList.push(this.productFrom.studyList[index].nodeFiles);
      this.productFrom.studyList.splice(index, 1);
    },
    // 删除图片
    onDeleteImg(index) {
      this.deleteList.push(this.productFrom.imgList[index].nodeFiles);
      this.productFrom.imgList.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
// 上传按钮样式
.changeProduct_upload_btn {
  width: 80px;
  height: 80px;
  background: rgba(73, 55, 234, 1);
  border-radius: 8px;
  border: 0;
  line-height: 26px;
  padding: 0;
  color: white;
  i {
    font-size: 30px;
  }
  p {
    margin: 0;
    font-size: 12px;
  }
}
.video-content {
  position: relative;
  height: 80px;
  video {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }
}
.video_upload {
  position: absolute;
  top: 40px;
  left: 40px;
  transform: translate(-50%, -50%);
}
.reupload_btn {
  padding: 5px 8px;
}
.deleteimg_btn {
  position: absolute;
  top: 40px;
  left: 40px;
  transform: translate(-50%, -50%);
}
</style>