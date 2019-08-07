<template>
  <!-- 添加工作日志 -->
  <section class="add-work-diary">
    <div class="add-work-diary__title">{{ $t("workDiary.title") }}</div>
    <el-form
      :model="diaryForm"
      :rules="rules"
      ref="diaryForm"
      label-position="left"
      label-width="100px"
    >
      <!-- 项目 start -->
      <el-form-item :label="`${$t('workDiary.form.projectName')}`" prop="projectName">
        <el-select v-model="diaryForm.projectName" filterable placeholder @change="onChangeProject">
          <template v-if="projectList && projectList.length > 0">
            <el-option v-for="(item, index) in projectList" :key="index" :label="item.itemName" :value="item.itemId"></el-option>
          </template>
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
          <template v-if="targetList && targetList.length > 0">
            <el-option v-for="(item, index) in targetList" :key="index" :label="item.targetCompanyName" :value="item.id"></el-option>
          </template>
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
        <!-- 订单类型 正常或者不正常 start -->
        <el-form-item :label="`${$t('workDiary.form.orderType')}`" prop="orderType">
          <el-select v-model="diaryForm.orderType" filterable placeholder>
            <el-option :label="$t('workDiary.orderType[0]')" value="1"></el-option>
            <el-option :label="$t('workDiary.orderType[1]')" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- 订单类型 end -->
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
          list-type="picture-card"
          :on-preview="onChatLogUploadPreview"
          :on-success="onChatLogUploadSuccess"
          :on-remove="onChtLogUploadRemove"
          :before-upload="onBeforeUpload"
          :data="uploadData"
          :file-list="diaryForm.chatLogList" 
          class="iworku-upload-card"
        >
          <div class="content">
            <i style="font-size: 30px; color: white;" class="el-icon-picture-outline"></i>
            <span class="text">{{ $t("workDiary.uploadChatLog") }}</span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="chatLogDialogVisible" title="　" :modal="false">
           <img width="100%" :src="diaryForm.chatLogPreview" alt />
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
          list-type="picture-card"
          :on-preview="onAttachmentUploadPreview"
          :on-success="onAttachmentUploadSuccess"
          :on-remove="onAttachmentUploadRemove"
          :before-upload="onBeforeUpload"
          :data="uploadData"
          :file-list="diaryForm.attachmentList"
          multiple
          class="iworku-upload-card"
        >
          <div class="content">
            <i style="font-size: 30px; color: white;" class="el-icon-paperclip"></i>
            <span class="text">{{ $t("public.btn.upload") }}</span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="attachmentDialogVisible" title="　" :modal="false">
           <img width="100%" :src="diaryForm.attachmentPreview" alt />
        </el-dialog>
      </el-form-item>
      <!-- 上传附件 end -->
      <el-form-item class="add-work-diary__btn">
        <el-button type="primary" :loading="submitBtnLoading" @click="onSubmitForm('diaryForm')">{{ $t("public.btn.submit") }}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import { getQiniuToken, rename } from "@/plugins/configuration.js"
import { mapGetters } from 'vuex'
export default {
  props: {
    // 项目ID、目标公司ID、成员ID
    id: {
        type: String,
        default() {
            return "";
        }
    },
    /**
     * project 项目公司
     * target  目标公司
     * member  成员
     */
    type: {
        type: String,
        default() {
            return 'project';
        }
    },
    /**
     *  当时目标公司添加日志时，需要额外传入项目公司id
     */
    itemid: {
        type: String,
        default() {
            return "";
        }
    },
    /**
     *  编辑工作日志时，原来的工作日志内容
     */
    diaryInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      diaryForm: {
        id: "",
        projectName: "",
        type: "",
        targetCompany: null,
        title: "",
        description: "",
        chatLog: [],
        chatLogPreview: "", // 上传的钩子
        attachment: [],
        attachmentPreview: "", //上传的钩子
        // 订单信息
        orderNo: "",
        orderName: "",
        orderType: '1',
        orderNum: 0,
        orderPrice: 0,
        orderDescription: "",
        chatLogList: [],
        attachmentList: []
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
      chatLogDialogVisible: false,
      attachmentDialogVisible: false,
      projectList: [],
      targetList: [],
      uploadData: {},
      submitBtnLoading: false
    };
  },
  created() {
    this.getProject();
  },
  computed: {
    ...mapGetters('ipublic', ['userInfo'])
  },
  methods: {
    /**
     *  获取全部项目
     */
    getProject() {
        this.$http.post('/customer/item/withoutpaginglist').then(res => {
            if (res.iworkuCode == 200) {
                this.projectList = res.datas;
            }
        });
    },
    /**
     *  根据项目获取目标公司
     *  id: 项目ID
     */
    getTarget(id) {
      if (!id) {
        return false;
      }
      // 根据项目ID查询当前登录人的私海
      this.$http.post('/target/company/withoutpaginglist', {
        id: id,
        type: 2
      }).then(res => {
        if (res.iworkuCode == 200) {
          this.targetList = res.datas;
        }
      });
    },
    onChangeProject(item) {
      this.diaryForm.targetCompany = null;
      this.getTarget(item);
    },
    /**
     * 提交表单
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            followTitle: this.diaryForm.title,
            followContent: this.diaryForm.description,
            followItemId: this.diaryForm.projectName,
            followNodeType: this.diaryForm.type,
            followFiles: this.diaryForm.attachment.join(";"),
            followLog: this.diaryForm.chatLog.join(";")
          };
          if (this.diaryForm.targetCompany) {
            params.followTargetCompany = this.diaryForm.targetCompany
          }
          // 订单
          if (this.diaryForm.type == 4) {
            params.orderCode  = this.diaryForm.orderNo;
            params.orderNumber  = this.diaryForm.orderNum;
            params.orderAmount = this.diaryForm.orderPrice;
            params.productName = this.diaryForm.orderName;
            params.orderType = this.diaryForm.orderType;
            params.followContent = this.diaryForm.orderDescription;
          }
          
          if (this.diaryForm.id) {
            params.id = this.diaryForm.id;
            // 修改工作日志
            this.submitBtnLoading = true;
            this.$http.post('/customer/followup/info/update', params).then(res => {
              this.submitBtnLoading = false;
              if (res.iworkuCode == 200) {
                this.$imessage({
                  content: this.$t("public.tips.success"),
                  type: "success"
                });
                this.onResetForm(formName);
                this.$emit("onOperateSuccess");
              }
            });
          } else {
            // 添加工作日志
              this.submitBtnLoading = true;
              this.$http.post('/customer/followup/info/save', params).then(res => {
                this.submitBtnLoading = false;
                if (res.iworkuCode == 200) {
                  this.$imessage({
                    content: this.$t("public.tips.success"),
                    type: "success"
                  });
                  this.onResetForm(formName);
                  this.$emit("onOperateSuccess");
                }
              });
            } 
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
     *  附件上传之前
     */
    async onBeforeUpload(file) {
      // 获取七牛token
      this.uploadData.token = await getQiniuToken(this);
      this.uploadData.key = rename(file.name);
    },
    /**
     *  聊天记录：预上传
     */
    onChatLogUploadPreview(file) {
      this.diaryForm.chatLogPreview = file.url;
      this.chatLogDialogVisible = true;
    },
    /**
     *  聊天记录：上传成功
     */
    onChatLogUploadSuccess(response){
      this.diaryForm.chatLog.push(response.key);
    },
    /**
     *  聊天记录 删除
     */
    onChtLogUploadRemove(file) {
      let index = this.diaryForm.chatLog.findIndex(val => file.response.key);
      this.diaryForm.chatLog.splice(index, 1);
    },
    /**
     *  附件：预上传
     */
    onAttachmentUploadPreview(file) {
      this.diaryForm.attachmentPreview = file.url;
      this.attachmentDialogVisible = true;
    },
    /**
     *  附件： 上传成功
     */
    onAttachmentUploadSuccess(response) {
      this.diaryForm.attachment.push(response.key);
    },
    /**
     * 附件: 删除
     */
    onAttachmentUploadRemove(file) {
      let index = this.diaryForm.attachment.findIndex(val => file.response.key);
      this.diaryForm.attachment.splice(index, 1);
    },
    getModifyDiary(params) {
        this.diaryForm.id = params.id;
        this.diaryForm.projectName = params.followItemId;
        this.diaryForm.type = params.followNodeType;
        this.diaryForm.targetCompany = params.followTargetCompany;
        this.diaryForm.title = params.followTitle ;
        this.diaryForm.description = params.followContent;
        this.diaryForm.chatLog = (params.followLog && params.followLog.split(';')) || [] ;
        this.diaryForm.chatLogPreview = params.followLog; // 上传的钩子
        this.diaryForm.attachment = (params.followFiles && params.followFiles.split(';')) || [];
        this.diaryForm.attachmentPreview = params.followFiles; //上传的钩子
        // 订单信息
        this.diaryForm.orderNo = params.orderCode;
        this.diaryForm.orderName = params.productName;
        this.diaryForm.orderNum = params.orderNumber;
        this.diaryForm.orderPrice = params.orderAmount;
        this.diaryForm.orderType = params.orderType;
        this.diaryForm.orderDescription = params.followContent;

        if (params.followLog) {
          this.diaryForm.chatLogList = [];
          params.followLog.split(";").map(val => {
            this.diaryForm.chatLogList.push({
              name: val,
              url: `${this.$global.avatarURI}${val}`
            });
          });
        } 
        if (params.followFiles) {
          this.diaryForm.attachmentList = [];
          params.followFiles.split(";").map(val => {
            this.diaryForm.attachmentList.push({
              name: val,
              url: `${this.$global.avatarURI}${val}`
            });
          });
        }
    }
  },
  watch: {
    type: {
      handler(newVal) {
        if (newVal == 'project') {
          this.diaryForm.projectName = this.id;
          this.getTarget(this.id);
        } 
      },
      immediate: true
    },
    diaryInfo: {
      handler(newVal) {
        if (newVal && newVal.id) {
          this.getModifyDiary(newVal);
        }
      },
      immediate: true
    },
    itemid: {
      handler(newVal) {
        if (newVal && this.type == 'target') {
          this.diaryForm.projectName = newVal;
          this.diaryForm.targetCompany = this.id;
          this.getTarget(newVal);
        }
      },
      immediate: true
    }
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
