<template>
  <!-- 添加工作日志 -->
  <section class="add-work-diary">
    <div class="add-work-diary__title">{{ $t("workDiary.title") }}</div>
    <el-form
      :model="diaryForm"
      :rules="rules"
      ref="diaryForm"
      label-position="left"
      label-width="80px"
    >
      <!-- 项目 start -->
      <el-form-item :label="`${$t('workDiary.form.projectName')}`" prop="projectName">
        <el-select v-model="diaryForm.projectName" filterable placeholder>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- 项目 end -->

      <!-- 日志类型 start -->
      <el-form-item :label="`${$t('workDiary.form.type')}`" prop="type">
        <el-select v-model="diaryForm.type" filterable placeholder>
          <el-option :label="$t('workDiary.diarType.daily')" value="1"></el-option>
          <el-option :label="$t('workDiary.diarType.monthly')" value="3"></el-option>
          <el-option :label="$t('workDiary.diarType.weekly')" value="2"></el-option>
          <el-option :label="$t('workDiary.diarType.order')" value="4"></el-option>
        </el-select>
      </el-form-item>
      <!-- 日志类型 end -->

      <!-- 目标公司 start -->
      <el-form-item :label="`${$t('workDiary.form.targetCompany')}`" prop="targetCompany">
        <el-select v-model="diaryForm.targetCompany" filterable placeholder>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- 目标公司 end -->

      <!-- 标题 start -->
      <el-form-item :label="`${$t('workDiary.form.title')}`" prop="title">
        <el-input v-model="diaryForm.title"></el-input>
      </el-form-item>
      <!-- 标题 end -->

      <template v-if="diaryForm.type != 4">
        <!-- 日志描述 start -->
        <el-form-item
          class="add-work-diary__description"
          :label="`${$t('workDiary.form.description')}`"
          prop="description"
        >
          <el-input class="textarea" type="textarea" :rows="5" v-model="diaryForm.description"></el-input>
        </el-form-item>
        <!-- 日志描述 end -->
      </template>
      <template v-else>
        <!-- 订单编号 start -->
        <el-form-item :label="`${$t('workDiary.form.orderNo')}`" prop="orderNo">
          <el-input v-model="diaryForm.orderNo"></el-input>
        </el-form-item>
        <!-- 订单编号 end -->
        <!-- 订单名称 start -->
        <el-form-item :label="`${$t('workDiary.form.orderName')}`" prop="orderName">
          <el-input v-model="diaryForm.orderName"></el-input>
        </el-form-item>
        <!-- 订单名称 end -->
        <!-- 订单数量 start-->
        <el-form-item style="width: 50%;" :label="`${$t('workDiary.form.orderNum')}`" prop="orderNum">
          <el-input v-model="diaryForm.orderNum">
            <template slot="append">件</template>
          </el-input>
        </el-form-item>
        <!-- 订单数量 end -->
        <!-- 订单金额 start -->
        <el-form-item style="width: 50%;" :label="`${$t('workDiary.form.orderPrice')}`" prop="orderPrice">
          <el-input v-model="diaryForm.orderPrice">
            <template slot="append">{{ $t("public.dollar") }}</template>
          </el-input>
        </el-form-item>
        <!-- 订单金额 end  -->
        <!-- 订单描述 start -->
        <el-form-item
          class="add-work-diary__description"
          :label="`${$t('workDiary.form.orderDescription')}`"
          prop="orderDescription"
        >
          <el-input class="textarea" type="textarea" :rows="5" v-model="diaryForm.orderDescription"></el-input>
        </el-form-item>
        <!-- 订单描述 end -->
      </template>

      <!-- 上传聊天记录 start -->
      <el-form-item
        class="add-work-diary__upload"
        :label="`${$t('workDiary.form.chatLog')}`"
        prop="chatLog"
      >
        <el-upload
          :action="$global.qiniuURL"
          :on-preview="onChatLogUploadPreview"
          :on-remove="onChtLogUploadRemove"
          class="iworku-upload"
        >
          <div class="content">
            <i style="font-size: 30px;" class="el-icon-picture-outline"></i>
            <div class="el-upload__text">{{ $t("workDiary.uploadChatLog") }}</div>
          </div>
        </el-upload>
        <el-dialog :visible.sync="chatLogDialogVisible">
          <img width="100%" :src="diaryForm.chatLog" alt />
        </el-dialog>
      </el-form-item>
      <!-- 上传聊天记录 end -->
      <!-- 上传附件 start -->
      <el-form-item
        class="add-work-diary__upload"
        :label="`${$t('workDiary.form.attachment')}`"
        prop="attachment"
      >
        <el-upload
          :action="$global.qiniuURL"
          :on-preview="onAttachmentUploadPreview"
          :on-remove="onAttachmentUploadRemove"
          multiple
          class="iworku-upload"
        >
          <div class="content">
            <i style="font-size: 30px;" class="el-icon-paperclip"></i>
            <div class="el-upload__text">{{ $t("public.btn.upload") }}</div>
          </div>
        </el-upload>
      </el-form-item>
      <!-- 上传附件 end -->
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
        attachment: "",
        // 订单信息
        orderNo: "",
        orderName: "",
        orderNum: 0,
        orderPrice: 0,
        orderDescription: ""
      },
      rules: {
        projectName: [
          {
            required: true,
            message: this.$t("workDiary.rules.projectName"),
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: this.$t("workDiary.rules.type"),
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: this.$t("workDiary.rules.title"),
            trigger: "blur"
          }
        ],
        orderDescription: [
          {
            required: true,
            message: this.$t("workDiary.rules.orderDescription"),
            trigger: "blur"
          }
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
     *  聊天记录：上传
     */
    onChatLogUploadPreview(){},
    /**
     *  聊天记录 删除
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
  background-color: $--default-white;
  &__title {
    font-size: 20px;
    line-height: 40px;
    margin-top: -20px;
  }
  &__btn {
    text-align: right;
    margin-right: 20px;
    border-top: 1px solid $--default-light-gray-2;
    padding-top: 20px;
  }
}
</style>
<style lang="scss">
.add-work-diary {
  &__description {
    .el-form-item__label {
      width: 100% !important;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
    .el-textarea {
      display: block;
    }
  }
  &__upload {
    .el-form-item__label {
      width: 100% !important;
    }
    .el-form-item__content {
      margin-left: 0 !important;
      margin-top: 40px;
    }
  }
}
</style>
