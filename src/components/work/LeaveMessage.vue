<template>
  <!-- 留言表单 -->
  <section class="leave-message">
    <el-form
      :model="messageForm"
      :rules="rules"
      ref="messageForm"
      label-position="top"
      label-width="80px"
    >
      <!-- 留言内容 start -->
      <el-form-item label prop="content">
        <el-input type="textarea" :rows="3" v-model="messageForm.content"></el-input>
      </el-form-item>
      <!-- 留言内容 end -->
      <div style="display: flex;">
        <!-- 附件 start -->
        <el-form-item label>
          <div style="display: flex;">
            <Attachment v-for="(item, index) in messageForm.attachment" :key="index" :name="item" :isDelete="true" @onDelete="onDeleteAttachment(index)"></Attachment>
            <el-upload
              style="display: inline-block;"
              :action="$global.qiniuURL"
              :on-success="onAttachmentUploadSuccess"
              :before-upload="onBeforeUpload"
              :data="uploadData"
              multiple
            >
              <div class="content">
                <i style="font-size: 30px;" class="el-icon-plus"></i>
                <div class="el-upload__text">{{ $t("public.btn.upload") }}</div>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <!-- 附件 end -->
        <!-- 按钮 start -->
        <el-form-item class="leave-message__btn">
          <el-button @click="onCancelForm('messageForm')" size="mini">{{ $t("public.btn.cancel") }}</el-button>
          <el-button
            :loading="btnLoading"
            type="primary"
            size="mini"
            @click="onSubmitForm('messageForm')"
          >{{ $t("public.btn.submit") }}</el-button>
        </el-form-item>
        <!-- 按钮 end -->
      </div>
    </el-form>
  </section>
</template>
<script>
import { getQiniuToken, rename } from "@/plugins/configuration.js"
export default {
  props: {
    /**
     *  父级相关的信息
     */
    parent: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Attachment: () => import("@/components/lib/Attachment.vue")
  },
  data() {
    return {
      messageForm: {
        content: "",
        attachment: []
      },
      rules: {
        content: [
          {
            required: true,
            message: this.$t("workDiary.rules.leaveMessage"),
            trigger: "blur"
          }
        ]
      },
      uploadData: {},
      btnLoading: false
    };
  },
  methods: {
    /**
     *  表单提交
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          let params = {
            followNodeType: 6, // 回复
            followParent: this.parent.id,
            followContent: this.messageForm.content,
            followFiles: this.messageForm.attachment.join(";"),
            followTitle: this.parent.followTitle,
            followItemId: this.parent.followItemId
          }
          if (this.parent.followTargetCompany) {
            params.followTargetCompany = this.parent.followTargetCompany;
          }
          this.$http.post('/customer/followup/info/save', params).then(res => {
            this.btnLoading = false;
            if (res.iworkuCode == 200) {
              this.$imessage({
                content: this.$t("public.tips.success"),
                type: "success"
              });
              this.onCancelForm(formName);
              this.$emit("onCloseLeaveMessage");
            }
          });
        }
      });
    },
    /**
     *  取消表单提交
     */
    onCancelForm(formName) {
      this.$refs[formName].resetFields();
      this.messageForm.attachment = [];
    },
    /**
     *  附件上传之前
     */
    async onBeforeUpload(file) {
      // 获取七牛token
      this.uploadData.token = await getQiniuToken(this);
      this.uploadData.key = rename(file.name);
    },
    /**
     *  附件： 上传成功
     */
    onAttachmentUploadSuccess(response) {
      this.messageForm.attachment.push(response.key);
    },
    /**
     *  删除附件
     */
    onDeleteAttachment(index) {
        this.messageForm.attachment.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.leave-message {
  margin-top: 15px;
  &__btn {
    width: 20%;
    margin-left: auto;
    text-align: right;
    margin-right: 20px;
  }
  .el-icon-plus {
    font-size: 30px;
    display: inline-block;
    height: 55px;
    width: 55px;
    line-height: 55px;
    background-color: #ebeaee;
    color: #7b7b7b;
  }
}
</style>
<style lang="scss">
.leave-message {
  .el-textarea__inner {
    background-color: #ebeaee;
  }
}
</style>

