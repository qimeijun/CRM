<template>
  <div class="workbench-addProject">
    <el-button class="addProject_button" @click="show = true">{{$t("project.add")}}</el-button>
    <el-dialog
      :title="$t('project.add')"
      :visible.sync="show"
      width="610px"
      :close-on-click-modal="false"
    >
      <ul class="addProject_ul">
        <li :class="activeName===1?'addProject_ul_li--current':''">{{$t("project.from.firstTitle")}}</li>
        <li
          :class="activeName===2?'addProject_ul_li--current':''"
        >{{$t("project.from.secondTitle")}}</li>
        <li
          :class="activeName===3?'addProject_ul_li--current':''"
        >{{$t("project.from.thirdlyTitle")}}</li>
      </ul>
      <!-- 第一步添加账号 start -->
      <el-form
        v-show="activeName===1||activeName===4"
        :model="firstForm"
        label-width="80px"
        label-position="top"
        ref="firstForm"
        :rules="firstRules"
      >
        <!-- 账号 -->
        <el-form-item :label="$t('project.from.account')" prop="account">
          <el-input v-model="firstForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item :label="$t('project.from.password')" prop="accountPassword">
          <el-input v-model="firstForm.accountPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 第一步添加账号 end -->
      <!-- 第二步项目资料 start -->
      <el-form
        class="addProject_form"
        v-show="activeName===2||activeName===4"
        :model="secondForm"
        label-width="80px"
        label-position="top"
        ref="secondForm"
        :rules="secondRules"
      >
        <el-scrollbar class="scrollbar" style="height:100%;">
          <!-- 项目名 -->
          <el-form-item :label="$t('project.from.projectTitle')" prop="projectTitle">
            <el-input
              v-model="secondForm.projectTitle"
              autocomplete="off"
              :placeholder="$t('project.placeholder.projectTitle')"
            ></el-input>
          </el-form-item>
          <!-- 公司名 -->
          <el-form-item :label="$t('project.from.companyName')" prop="companyName">
            <el-input
              v-model="secondForm.companyName"
              autocomplete="off"
              :placeholder="$t('project.placeholder.companyName')"
            ></el-input>
          </el-form-item>
          <!-- 行业 -->
          <el-form-item :label="$t('project.from.tmt')" prop="tmt">
            <el-select v-model="secondForm.tmt" :placeholder="$t('project.placeholder.tmt')">
              <el-option
                v-for="item in industryList"
                :key="item.value"
                :label="$lang==$global.lang.en?item.nameEn:item.nameZh"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 地址 -->
          <el-form-item :label="$t('project.from.site')" prop="site">
            <el-input
              v-model="secondForm.site"
              autocomplete="off"
              :placeholder="$t('project.placeholder.site')"
            ></el-input>
          </el-form-item>
          <!-- 网址 -->
          <el-form-item :label="$t('project.from.url')" prop="url">
            <el-input
              v-model="secondForm.url"
              autocomplete="off"
              :placeholder="$t('project.placeholder.url')"
            ></el-input>
          </el-form-item>
          <!-- 电子邮箱 -->
          <el-form-item :label="$t('project.from.email')" prop="email">
            <el-input
              v-model="secondForm.email"
              autocomplete="off"
              :placeholder="$t('project.placeholder.email')"
            ></el-input>
          </el-form-item>
          <!-- 公司电话 -->
          <el-form-item :label="'公司电话'" prop="tel">
            <el-input v-model="secondForm.tel" autocomplete="off" :placeholder="'公司电话'"></el-input>
          </el-form-item>
          <!-- 公司简介 -->
          <el-form-item :label="$t('project.from.intro')" prop="intro">
            <el-input
              v-model="secondForm.intro"
              autocomplete="off"
              :placeholder="$t('project.placeholder.intro')"
              type="textarea"
              :rows="4"
            ></el-input>
          </el-form-item>
          <!-- 优势 -->
          <el-form-item :label="$t('project.from.strength')" prop="strength">
            <el-input
              v-model="secondForm.strength"
              autocomplete="off"
              :placeholder="$t('project.placeholder.strength')"
              type="textarea"
              :rows="4"
            ></el-input>
          </el-form-item>
        </el-scrollbar>
      </el-form>
      <!-- 第二步项目资料 end -->
      <!-- 第三步产品资料 start -->
      <el-form
        class="addProject_form"
        v-show="activeName===3||activeName===4"
        :model="thirdlyForm"
        label-width="80px"
        label-position="top"
        ref="thirdlyForm"
        :rules="thirdlyRules"
      >
        <el-scrollbar class="scrollbar" style="height:100%;">
          <!-- 产品名称 -->
          <el-form-item :label="$t('project.from.productName')" prop="productName">
            <el-input
              v-model="thirdlyForm.productName"
              autocomplete="off"
              :placeholder="$t('project.placeholder.productName')"
            ></el-input>
          </el-form-item>
          <!-- 产品图片 start -->
          <el-form-item :label="$t('project.from.productImg')">
            <el-row v-for="(item,index) in thirdlyForm.imageList" :key="'img'+index">
              <el-col style="position:relative;" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <img width="80px" :src="`${$global.avatarURI}${item.nodeFiles}`" alt />
                <el-button
                  type="primary"
                  size="mini"
                  class="deleteimg_btn"
                  @click="onDeleteImg(index)"
                >删除</el-button>
              </el-col>
              <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" style="text-align:right;">
                <el-input v-model="item.nodeDescription"></el-input>
                <el-button
                  v-show="index===thirdlyForm.imageList.length-1"
                  type="text"
                  @click="imgShow=true"
                >继续上传</el-button>
              </el-col>
            </el-row>
            <el-row v-show="imgShow">
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
                  <el-button class="addProject_upload_btn">
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
          <!-- 产品图片 end -->
          <!-- 产品视频 start -->
          <el-form-item :label="$t('project.from.productVideo')">
            <el-row>
              <el-col class="video-content" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <video
                  v-show="thirdlyForm.videoList[0].nodeFiles"
                  :src="`${$global.avatarURI}${thirdlyForm.videoList[0].nodeFiles}`"
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
                  <el-button
                    v-if="!thirdlyForm.videoList[0].nodeFiles"
                    class="addProject_upload_btn"
                  >
                    <i class="el-icon-video-camera-solid"></i>
                    <p>{{$t("project.btn.uploadVideo")}}</p>
                  </el-button>
                  <el-button v-else class="reupload_btn" type="primary" size="mini">重新上传</el-button>
                </el-upload>
              </el-col>
              <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                <el-input
                  v-model="thirdlyForm.videoList[0].nodeDescription"
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
                  v-for="(item,index) in thirdlyForm.attachmentList"
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
                  <el-button class="addProject_upload_btn">
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
                  v-for="(item,index) in thirdlyForm.learnList"
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
                  <el-button class="addProject_upload_btn">
                    <i class="el-icon-paperclip"></i>
                    <p>{{$t("project.btn.uploadAccessory")}}</p>
                  </el-button>
                </el-upload>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 学习资料 end -->
        </el-scrollbar>
      </el-form>
      <!-- 第三步产品资料 end -->
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="activeName===1"
          type="primary"
          @click="onSubmitForm('firstForm',2)"
        >{{$t("project.btn.perfect")}}</el-button>
        <el-button
          v-else-if="activeName===2"
          type="primary"
          @click="onSubmitForm('secondForm',3)"
        >{{$t("project.btn.continue")}}</el-button>
        <el-button
          v-else-if="activeName===3"
          type="primary"
          @click="onSubmitForm('thirdlyForm',4)"
        >{{$t("project.btn.ok")}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getIndustry, getQiniuToken, rename } from "@/plugins/configuration.js";
export default {
  components: {
    Attachment: () => import("@/components/lib/Attachment.vue")
  },
  data() {
    return {
      activeName: 1,
      show: false,
      dialogVisible: false,
      imgShow: true,
      industryList: [],
      uploadData: {},
      imgDescription: "",
      videoPercentage: 0,
      imgProgress: 0,
      firstForm: {
        account: "",
        accountPassword: ""
      },
      secondForm: {
        projectTitle: "",
        companyName: "",
        tmt: "",
        site: "",
        url: "",
        email: "",
        tel: "",
        intro: "",
        strength: ""
      },
      thirdlyForm: {
        productName: "",
        imageList: [],
        videoList: [
          {
            nodeDescription: "",
            nodeFiles: "",
            nodeType: 2
          }
        ],
        attachmentList: [],
        learnList: []
      },
      firstRules: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (!/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(value)) {
                callback(new Error(this.$t("member.rules.account[1]")));
              } else {
                callback();
              }
            }
          }
        ],
        accountPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      secondRules: {
        projectTitle: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
          }
        ],
        companyName: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          }
        ],
        tmt: [
          {
            required: true,
            message: "请输入行业",
            trigger: "blur"
          }
        ],
        site: [
          {
            required: true,
            message: "请输入地址",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: true,
            message: "请输入网址",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入电话",
            trigger: "blur"
          }
        ],
        intro: [
          {
            required: true,
            message: "请输入简介",
            trigger: "blur"
          }
        ]
      },
      thirdlyRules: {
        productName: [
          {
            required: true,
            message: "请输入产品名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  async created() {
    // 获取行业
    this.industryList = await getIndustry(this);
  },
  methods: {
    /**
     * 保存每一步信息
     */
    onSubmitForm(formName, number) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.activeName = number;
          if (this.activeName == 4) {
            
            let params = {
              account: this.firstForm.account,
              accountPassword: this.firstForm.accountPassword,
              itemName: this.secondForm.projectTitle,
              companyName: this.secondForm.companyName,
              companyIndustry: this.secondForm.tmt,
              companyAddress: this.secondForm.site,
              companyWebsite: this.secondForm.url,
              companyEmail: this.secondForm.email,
              companyTel: this.secondForm.tel,
              companyProfile: this.secondForm.intro,
              companyStrength: this.secondForm.strength,
              productName: this.thirdlyForm.productName,
              productNodeList: [
                ...this.thirdlyForm.imageList,
                ...this.thirdlyForm.videoList,
                ...this.thirdlyForm.attachmentList,
                ...this.thirdlyForm.learnList
              ]
            };
            // 去掉空元素
            params.productNodeList=params.productNodeList.filter(o=>{if(o.nodeFiles){return o}})
            this.activeName = 1;
            this.$http.post("/customer/company/save", params).then(res => {
              if (res.iworkuCode == 200) {
                this.$refs["thirdlyForm"].resetFields();
                this.$refs.secondForm.resetFields();
                this.$refs.firstForm.resetFields();
                this.show = false;
                this.$emit("getList");
              }
            });
          }
        }
      });
    },
    /**
     *  图片上传成功
     */
    onUploadAvatarSuccessImg(response) {
      this.thirdlyForm.imageList.push({
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
      this.thirdlyForm.attachmentList.push({
        nodeFiles: response.key,
        nodeDescription: "",
        nodeType: 3
      });
    },
    /**
     *  学习资料上传成功
     */
    onUploadAvatarSuccessLearn(response) {
      this.thirdlyForm.learnList.push({
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
      if (this.thirdlyForm.videoList[0].nodeFiles) {
        this.$http
          .post(
            `/third_party/qiniu/delete/${this.thirdlyForm.videoList[0].nodeFiles}`
          )
          .then(res => {
            if (res.iworkuCode == 200) {
              this.thirdlyForm.videoList[0].nodeFiles = response.key;
            }
          });
      }
      this.videoPercentage = 100;
      this.thirdlyForm.videoList[0].nodeFiles = response.key;
    },
    // 图片上传之前
    async onBeforeAvatarUploadImg(file) {
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("上传图片大小不能超过 3MB!");
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
        this.$message.error("上传视频大小不能超过 20MB!");
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
        this.$message.error("上传附件大小不能超过 5MB!");
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
      return percentage === 100 ? "视频上传成功" : `${percentage}%`;
    },
    // 删除附件
    onDeleteAccessory(index) {
      this.$http
        .post(
          `/third_party/qiniu/delete/${this.thirdlyForm.attachmentList[index].nodeFiles}`
        )
        .then(res => {
          if (res.iworkuCode == 200) {
            this.thirdlyForm.attachmentList.splice(index, 1);
          }
        });
    },
    onDeleteLearn(index) {
      this.$http
        .post(
          `/third_party/qiniu/delete/${this.thirdlyForm.learnList[index].nodeFiles}`
        )
        .then(res => {
          if (res.iworkuCode == 200) {
            this.thirdlyForm.learnList.splice(index, 1);
          }
        });
    },
    // 删除图片
    onDeleteImg(index) {
      this.$http
        .post(
          `/third_party/qiniu/delete/${this.thirdlyForm.imageList[index].nodeFiles}`
        )
        .then(res => {
          if (res.iworkuCode == 200) {
            this.thirdlyForm.imageList.splice(index, 1);
            if (this.thirdlyForm.imageList.length == 0) {
              this.imgShow = true;
            }
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.addProject_button {
  background-color: $--default-color;
  color: white;
}
.addProject_ul {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  li {
    margin: 0 20px;
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
    position: relative;
    color: #bbbbbbff;
  }
  li::after {
    content: "";
    display: block;
    width: 120%;
    height: 5px;
    border-radius: 2.5px;
    background-color: transparent;
    transform: translate(-50%, 0);
    position: absolute;
    bottom: -4px;
    left: 50%;
  }
  .addProject_ul_li--current {
    color: $--default-color;
  }
  .addProject_ul_li--current::after {
    background-color: $--default-color;
  }
  .addProject_ul_li--current::before {
    content: "";
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: $--default-color;
    transform: translate(-50%, 100%);
    position: absolute;
    bottom: -4px;
    left: 50%;
  }
}
.addProject_form {
  height: 450px;
  // overflow-y: scroll;
}
// 上传按钮样式
.addProject_upload_btn {
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
.addProject-thirdly_upload {
  i {
    font-size: 30px;
    color: white;
    margin-top: 10px;
  }
  p {
    line-height: 20px;
    margin: 0;
    font-size: 12px;
    color: white;
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
<style>
.addProject-thirdly_upload .el-upload--picture-card {
  width: 80px;
  height: 80px;
  background: rgba(73, 55, 234, 1);
  border-radius: 8px;
  border: 0;
  line-height: 30px;
}
.addProject_form .el-progress-bar {
  padding-right: 120px;
  margin-right: -120px;
}
</style>