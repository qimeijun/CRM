<template>
  <!-- 上传调研报告 -->
  <div class="target-upload-report">
    <!-- 一 -->
    <div class="upload-report_div">
      <h3>1</h3>
      <span class="upload-report-margin">{{$t("target.probe.textTip[0]")}}</span>
      <i class="el-icon-paperclip"></i>
      <a :href="$global.avatarURI+'Research%20Report%20Template.xlsx'" :download="$t('target.probe.templateName')" target="_blank">{{$t('target.probe.templateName')}}</a>
    </div>
    <!-- 二 -->
    <div class="upload-report_div">
      <h3>2</h3>
      <div>
        <el-upload
          class="upload-report-margin upload-report_upload"
          :action="$global.qiniuURL"
          :on-progress="getfileProgress"
          :on-success="handleSuccess"
          :show-file-list="false"
          :before-upload="updatebtnShow"
          :data="uploadData"
        >
          <div v-if="btnShow">
            <el-button size="small" type="primary">{{$t("target.probe.uploadBtn[0]")}}</el-button>
            <span slot="tip" class="el-upload__tip">&nbsp;&nbsp;{{$t("target.probe.textTip[1]")}}</span>
          </div>
          <div v-else>
            <p>
              <span>{{fileName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-button type="text">{{$t("target.probe.uploadBtn[1]")}}</el-button>
            </p>
          </div>
        </el-upload>
        <el-progress v-show="progressShow" :percentage="fileProgress" color="#E50054"></el-progress>
      </div>
    </div>
    <div class="upload-report_button">
      <el-button :disabled="btnDisabled" size="small" type="primary" @click="submitFile()">{{$t("target.probe.ok")}}</el-button>
    </div>
  </div>
</template>
<script>
import { getQiniuToken, rename } from "@/plugins/configuration.js";
export default {
  props: {
    targetid: {
      type: String,
      default() {
        return "";
      }
    },
    type: {
      type: String,
      default() {
        return "add"; //add 新增  update 修改
      }
    },
    updateFile: {
      type: Object,
      default() {
        return {
          file: "",
          id: ""
        };
      }
    }
  },
  data() {
    return {
      btnShow: true,
      btnDisabled: false,
      progressShow: false,
      fileProgress: 0,
      fileName: "",
      researchFile: "",
      uploadData: {}
    };
  },
  created() {
    if (this.type == "update") {
      this.fileName = this.updateFile.file;
      this.researchFile = this.updateFile.file;
      this.btnDisabled = false;
      this.btnShow = false;
      this.progressShow = false;
    }
  },
  methods: {
    // 调研报告上传之前
    async updatebtnShow(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error(this.$t("target.probe.textTip[1]"));
        return Promise.reject(false);
      } else {
         // 获取七牛token
        this.uploadData.token = await getQiniuToken(this);
        this.uploadData.key = rename(file.name);
        this.fileName = this.uploadData.key;
        this.btnShow = false;
        this.progressShow = true;
      }
    },
    // 获取上传进度
    getfileProgress(event, file, fileList) {
      this.fileProgress = parseInt(file.percentage);
    },
    // 上传成功后
    handleSuccess(response) {
      if (this.researchFile) {
        // 删除之前报告的空间
        this.$http
          .post(`/third_party/qiniu/delete/${this.researchFile}`)
          .then(res => {
            // if (res.iworkuCode == 200) {
              this.researchFile = response.key;
            // }
          });
      }
      this.fileProgress = 100;
      this.btnDisabled = false;
      this.researchFile = response.key;
    },
    // 一键导入
    submitFile() {
      if (this.type == "update") {
        // update
        this.$http
          .post("/target/company/research/update", {
            id: this.updateFile.id,
            researchFile: this.researchFile
          })
          .then(res => {
            if (res.iworkuCode == 200) {
              this.$imessage({
                content: this.$t("target.probe.updateContent"),
                type: "success" // 错误提示 error
              });
              this.$emit("close");
            }
          });
      } else {
        // add
        this.$http
          .post("/target/company/research/save", {
            targetCompanyId: this.targetid,
            researchFile: this.researchFile
          })
          .then(res => {
            if (res.iworkuCode == 200) {
              this.$imessage({
                content: this.$t("target.probe.addContent"),
                type: "success" // 错误提示 error
              });
              // 重置数据
              this.btnShow = true;
              this.btnDisabled = false;
              this.progressShow = false;
              this.fileProgress = 0;
              this.fileName = "";
              this.researchFile = "";
              this.uploadData = {};
              this.$emit("close");
            }
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.target-upload-report {
  .upload-report_div {
    margin-left: 0.75rem;
    display: flex;
    align-items: baseline;
  }
  h3 {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: $--default-color;
    color: white;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    margin-right: 0.2rem;
  }
  .el-icon-paperclip {
    font-size: 26px;
    margin-right: 4px;
  }
}
.upload-report-margin {
  margin-right: 20px;
}
.upload-report_button {
  padding-top: 15px;
  border-top: 1px solid $--default-list-gray;
  text-align: right;
}
.upload-report_dialog {
  padding: 0.3rem 0.7rem;
  text-align: center;
  p {
    margin-bottom: 0.2rem;
    font-size: 0.18rem;
    font-weight: bold;
    line-height: 25px;
  }
}
</style>