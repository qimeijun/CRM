<template>
<!-- 上传调研报告 -->
  <div class="target-upload-report">
    <!-- 一 -->
    <div class="upload-report_div">
      <h3>1</h3>
      <span class="upload-report-margin">{{$t("target.probe.textTip[0]")}}</span>
      <i class="el-icon-paperclip"></i>
      <a href target="_blank">调研报告模板.xls</a>
    </div>
    <!-- 二 -->
    <div class="upload-report_div">
      <h3>2</h3>
      <div>
        <el-upload
          class="upload-report-margin upload-report_upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-progress="getfileProgress"
          :on-success="handleSuccess"
          :before-upload="updatebtnShow"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :show-file-list="false"
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
        <el-progress v-if="!btnShow" :percentage="fileProgress" color="#E50054"></el-progress>
      </div>
    </div>
    <div class="upload-report_button">
      <el-button
        :disabled="btnDisabled"
        size="small"
        type="primary"
        @click="dialogVisible=true;submitFile()"
      >{{$t("target.probe.uploadBtn[2]")}}</el-button>
    </div>
    <!-- 导入进度弹框 -->
    <el-dialog
      :title="$t('target.probe.dialogTitle')"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      :show-close="false"
      center
    >
      <div class="upload-report_dialog">
        <p>{{$t("target.probe.textTip[2]")}}</p>
        <el-progress :percentage="fileImport" color="#E50054"></el-progress>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnShow: true,
      btnDisabled: false,
      fileProgress: 0,
      fileImport: 0,
      fileName: "123312312312312312",
      dialogVisible: false,
      fileList: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      //   console.log(file, fileList);
    },
    handlePreview(file) {
      //   console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    updatebtnShow(file) {
      //   console.log(123, file);
      this.btnShow = false;
      this.fileName = file.name;
    },
    // 获取上传进度
    getfileProgress(event, file, fileList) {
      this.fileProgress = parseInt(file.percentage);
    },
    // 上传成功后
    handleSuccess() {
      this.fileProgress = 100;
      this.btnDisabled = false;
    },
    // 一键导入
    submitFile() {
      let interval=window.setInterval(() => {
        this.fileImport++;
        if (this.fileImport === 100) {
          window.clearInterval(interval);
        }
      }, 100);
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