<template>
  <!-- 添加工作日志 -->
  <section class="add-work-diary">
    <el-form
      class="iworku-form-line"
      :model="diaryForm"
      :rules="rules"
      ref="diaryForm"
      label-position="left"
      label-width="80px"
    >
      <el-row :gutter="10">
        <el-col :xs="20" :sm="20" :md="10" :lg="10" :xl="10">
          <el-form-item :label="`${$t('workDiary.form.projectName')}`" prop="projectName">
            <el-select v-model="diaryForm.projectName" placeholder>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="20" :sm="20" :md="10" :lg="10" :xl="10">
          <el-form-item :label="`${$t('workDiary.form.type')}`" prop="type">
            <el-select v-model="diaryForm.type" placeholder>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 标题 start -->
      <el-row>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-form-item :label="`${$t('workDiary.form.title')}`" prop="title">
            <el-input v-model="diaryForm.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 标题 end -->
      <!-- 目标公司 start -->
      <el-row>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-form-item :label="`${$t('workDiary.form.targetCompany')}`" prop="targetCompany">
            <el-select v-model="diaryForm.targetCompany" placeholder>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 目标公司 end -->
      <el-row>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-form-item :label="`${$t('workDiary.form.description')}`" prop="description">
            <el-input type="textarea" :rows="5" v-model="diaryForm.description" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-form-item :label="`${$t('workDiary.form.chatLog')}`" prop="chatLog">
              <el-upload
                :action="$global.qiniuURL"
                list-type="picture-card"
                :on-preview="onChatLogUploadPreview"
                :on-remove="onChtLogUploadRemove">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="chatLogDialogVisible">
                    <img width="100%" :src="diaryForm.chatLog" alt="">
                </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
          <el-form-item :label="`${$t('workDiary.form.attachment')}`" prop="attachment">
              <el-upload
                :action="$global.qiniuURL"
                :on-preview="onAttachmentUploadPreview"
                :on-remove="onAttachmentUploadRemove"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item class="add-work-diary__btn">
        <el-button type="primary" @click="onSubmitForm('diaryForm')">{{ $t("public.btn.submit") }}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      diaryForm: {
          projectName: "",
          type: "",
          targetCompany: "",
          title: "",
          description: "",
          chatLog: "",
          attachment: ""
      },
      rules: {
        projectName: [
          { required: true, message: this.$t("workDiary.rules.projectName"), trigger: "blur" }
        ],
        type: [
          { required: true, message: this.$t("workDiary.rules.type"), trigger: "blur" }
        ],
        title: [
          { required: true, message: this.$t("workDiary.rules.title"), trigger: "blur" }
        ]
      },
      chatLogDialogVisible: false
    };
  },
  methods: {
    /**
     * 提交表单
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } 
      });
    },
    /**
     * 表单重置
     */
    onResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     *  聊天记录： 删除上传
     */
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    /**
     *  聊天记录 开始上传文件
     */
    onChtLogUploadRemove(file) {
        this.diaryForm.chatLog = file.url;
        this.chatLogDialogVisible = true;
    },
    /**
     *  附件： 上传
     */
    onAttachmentUploadPreview(file) {
        this.diaryForm.attachment = file.url;
    },
    /**
     * 附件: 删除
     */
    onAttachmentUploadRemove(file, fileList) {}
  }
};
</script>
<style lang="scss" scoped>
.add-work-diary {
  margin-top: 20px;
  background-color: $--default-white;
  &__btn {
    text-align: right;
    margin-right: 20px;
    border-top: 1px solid $--default-light-gray-2;
    padding-top: 20px;
  }
}
</style>
