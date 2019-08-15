<template>
  <div class="project-importTarget">
    <!-- 一 -->
    <div class="importTarget_div">
      <h3>1</h3>
      <span class="importTarget-margin">{{$t("projectInfo.importTarget.textTip[0]")}}</span>
      <i class="el-icon-paperclip"></i>
      <a
        :href="$global.avatarURI+'Customer%20information.xlsx'"
        :download="$t('projectInfo.importTarget.templateName')"
      >{{$t('projectInfo.importTarget.templateName')}}</a>
    </div>
    <!-- 二 -->
    <div class="importTarget_div">
      <h3>2</h3>
      <div>
        <el-upload
          ref="upload"
          class="importTarget-margin importTarget_upload"
          action=" "
          :on-change="onChangeFile"
          :show-file-list="false"
          :auto-upload="false"
        >
          <div v-if="fileList.length==0">
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
              <el-button slot="trigger" type="text">{{$t("projectInfo.importTarget.uploadBtn[1]")}}</el-button>
            </p>
          </div>
        </el-upload>
      </div>
    </div>
    <!-- 三 -->
    <div class="importTarget_div">
      <h3>3</h3>
      <el-radio-group v-model="updateData.isCover">
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
        <p>{{importState==1?$t("projectInfo.importTarget.textTip[3]"):importState==2?$t("projectInfo.importTarget.textTip[4]"):$t("projectInfo.importTarget.textTip[2]")}}</p>
        <el-progress :percentage="fileImport" color="#E50054"></el-progress>
        <a
          class="repeatFile_a"
          :href="repeatFileURL"
          :download="repeatFileName"
          @click="dialogVisible=false;"
        >{{repeatFileName}}</a>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
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
      updateData: {
        isCover: 1,
        itemId: this.itemid
      },
      repeatFileURL: "",
      repeatFileName: "",
      btnDisabled: true,
      fileImport: 0,
      importState: 0,
      fileName: "",
      dialogVisible: false,
      fileList: []
    };
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"])
  },
  methods: {
    // 选择文件
    onChangeFile(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error(this.$t("projectInfo.importTarget.textTip[1]"));
      } else {
        this.fileName = file.name;
        this.btnDisabled = false;
        this.fileList = [file];
      }
    },
    // 自定义上传
    onUpload() {
      let params = new FormData();
      params.append("file", this.fileList[0].raw);
      params.append("isCover", this.updateData.isCover);
      params.append("itemId", this.itemid);
      this.repeatFileURL = "";
      this.repeatFileName = "";
      this.getfileImport();
      this.$http
        .post("/target/company/resolve", params, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.btnDisabled = true;
          if (res.byteLength!=1 && this.updateData.isCover == 2) {
            let blob = new Blob([res], {
              type: "application/vnd.ms-excel;charset=UTF-8"
            });
            let fileName = "Target Company List.xls";
            this.repeatFileURL = window.URL.createObjectURL(blob);
            this.repeatFileName = fileName;
            this.fileImport = 90;
            this.importState = 2;
          } else {
            this.fileImport = 100;
            this.importState = 1;
            this.$emit("close");
            this.$imessage({
              content: this.$t("projectInfo.importTarget.textTip[3]"),
              type: "success"
            });
            this.dialogVisible = false;
          }
          this.btnDisabled = false;
          this.fileList = [];
          this.fileName = "";
          this.$emit("close");
          this.$emit("getList");
        });
    },
    // 假上传进度
    getfileImport() {
      this.fileImport = 0;
      let interval = window.setInterval(() => {
        if (this.fileImport >= 90) {
          // this.fileImport=0;
          window.clearInterval(interval);
        } else {
          this.fileImport++;
        }
      }, 100);
    },
    // 一键导入
    submitFile() {
      // this.$refs.upload.submit();
      this.onUpload();
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
  .repeatFile_a {
    line-height: 40px;
    color: #4937ea;
  }
}
</style>
