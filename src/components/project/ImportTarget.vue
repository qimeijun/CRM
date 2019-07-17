<template>
  <div class="project-importTarget">
    <!-- 一 -->
    <div class="importTarget_div">
      <h3>1</h3>
      <span class="importTarget-margin">按导入模板，填写表格</span>
      <i class="el-icon-paperclip"></i>
      <a href target="_blank">导入客户模板.xls</a>
    </div>
    <!-- 二 -->
    <div class="importTarget_div">
      <h3>2</h3>
      <div>
        <el-upload
          class="importTarget-margin importTarget_upload"
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
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">&nbsp;&nbsp;表格大小控制在 5M 以内</span>
          </div>
          <div v-else>
            <p>
              <span>{{fileName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-button type="text">重新上传</el-button>
            </p>
          </div>
        </el-upload>
        <el-progress v-if="!btnShow" :percentage="fileProgress" color="#E50054"></el-progress>
      </div>
    </div>
    <!-- 三 -->
    <div class="importTarget_div">
      <h3>3</h3>
      <el-radio-group v-model="radio">
        <el-radio :label="3">不导入</el-radio>
        <el-radio :label="6">覆盖</el-radio>
      </el-radio-group>
    </div>
    <div class="importTarget_button">
      <el-button
        :disabled="btnDisabled"
        size="small"
        type="primary"
        @click="dialogVisible=true;submitFile()"
      >一键导入</el-button>
    </div>
    <!-- 导入进度弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      :show-close="false"
      center
    >
      <div class="importTarget_dialog">
        <p>目标公司正在导入中，请耐心等待···</p>
        <el-progress :percentage="fileImport" color="#E50054"></el-progress>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: 3,
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
.project-importTarget {
  .importTarget_div {
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
.importTarget-margin {
  margin-right: 20px;
}
.importTarget_button {
  padding-top: 15px;
  border-top: 1px solid $--default-list-gray;
  text-align: right;
}
.importTarget_dialog {
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