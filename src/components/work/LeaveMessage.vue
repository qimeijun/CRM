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
            <Attachment name="123.pdf" :isDelete="true" @onDelete="onDeleteAttachment"></Attachment>
            <el-upload
              style="display: inline-block;"
              :action="$global.qiniuURL"
              :on-preview="onAttachmentUploadPreview"
              :on-remove="onAttachmentUploadRemove"
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
export default {
  components: {
    Attachment: () => import("@/components/lib/Attachment.vue")
  },
  data() {
    return {
      messageForm: {
        content: "",
        attachment: ""
      },
      rules: {
        content: [
          {
            required: true,
            message: this.$t("workDiary.rules.leaveMessage"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /**
     *  表单提交
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        }
      });
    },
    /**
     *  取消表单提交
     */
    onCancelForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("onCloseLeaveMessage");
    },
    /**
     *  附件： 上传
     */
    onAttachmentUploadPreview(file) {
      this.messageForm.attachment = file.url;
    },
    /**
     * 附件: 删除
     */
    onAttachmentUploadRemove(file, fileList) {},
    /**
     *  删除附件
     */
    onDeleteAttachment() {
        console.log("删除");
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

