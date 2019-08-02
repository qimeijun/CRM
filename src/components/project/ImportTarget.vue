<template>
  <div class="project-importTarget">
    <!-- 一 -->
    <div class="importTarget_div">
      <h3>1</h3>
      <span class="importTarget-margin">{{$t("projectInfo.importTarget.textTip[0]")}}</span>
      <i class="el-icon-paperclip"></i>
      <a href target="_blank">客户模板.xls</a>
      <!-- <input type="file" ref="file" > -->
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
          :on-exceed="handleExceed"
          :show-file-list="false"
          :file-list="fileList"
        >
          <div v-if="btnShow||fileList.length>0">
            <el-button
              slot="trigger"
              size="small"
              type="primary"
            >{{$t("projectInfo.importTarget.uploadBtn[0]")}}</el-button>
            <span
              slot="tip"
              class="el-upload__tip"
            >&nbsp;&nbsp;{{$t("projectInfo.importTarget.textTip[1]")}}</span>
          </div>
          <div v-else>
            <p>
              <span>{{fileName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-button type="text">{{$t("projectInfo.importTarget.uploadBtn[1]")}}</el-button>
            </p>
          </div>
        </el-upload>
        <el-progress v-if="!btnShow" :percentage="fileProgress" color="#E50054"></el-progress>
      </div>
    </div>
    <!-- 三 -->
    <div class="importTarget_div">
      <h3>3</h3>
      <el-radio-group v-model="isCover">
        <el-radio :label="2">{{$t("projectInfo.importTarget.noimport")}}</el-radio>
        <el-radio :label="1">{{$t("projectInfo.importTarget.coverage")}}</el-radio>
      </el-radio-group>
    </div>
    <div class="importTarget_button">
      <el-button
        :disabled="btnDisabled"
        size="small"
        type="primary"
        @click="dialogVisible=true;submitFile()"
      >{{$t("projectInfo.importTarget.uploadBtn[2]")}}</el-button>
    </div>
    <!-- 导入进度弹框 -->
    <el-dialog
      :title="$t('projectInfo.importTarget.dialogTitle')"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      :show-close="false"
      center
    >
      <div class="importTarget_dialog">
        <p>{{$t("projectInfo.importTarget.textTip[2]")}}</p>
        <el-progress :percentage="fileImport" color="#E50054"></el-progress>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    itemid: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      isCover: 2,
      btnShow: true,
      btnDisabled: false,
      fileProgress: 0,
      fileImport: 0,
      fileName: "123312312312312312",
      dialogVisible: false,
      fileList: [],
      value: "",
      file: {}
    };
  },
  methods: {
    handlePreview(file) {
      console.log("handlePreview", file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    updatebtnShow(file) {
      console.log(123, file);
      this.btnShow = false;
      this.fileName = file.name;
      this.file ={ ...file};
      return false;
    },
    // 获取上传进度
    getfileProgress(event, file, fileList) {
      console.log("fileprogerss");
      this.fileProgress = parseInt(file.percentage);
    },
    // 上传成功后
    handleSuccess() {
      this.fileProgress = 100;
      this.btnDisabled = false;
    },
    // 一键导入
    submitFile(file) {
      // let interval=window.setInterval(() => {
      //   this.fileImport++;
      //   if (this.fileImport === 100) {
      //     window.clearInterval(interval);
      //   }
      // }, 100);

      // console.log(234,this.$refs.file.files);
console.log(this.file);
  let parameters = new FormData();
  parameters.append('isCover', this.isCover);
  parameters.append('itemId', this.itemid);
  parameters.append('file', this.file);
      this.$http.post(
        "/target/company/resolve",
       parameters
        //  isCover:this.isCover,
        //  itemId:this.itemid,
        //  file:this.file
       ,
        {
          headers: {
            // "Cache-Control": "no-cache",
            "Content-Type":"multipart/form-data"
          }
        }
      ).then(res=>{
        
      });
    },
    getFile() {
      // console.log(123,this.value);
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