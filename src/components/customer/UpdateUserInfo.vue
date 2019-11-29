<template>
  <!-- 修改客户资料 -->
  <section class="add-new-member">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form
          :model="memberForm"
          :rules="rules"
          ref="memberForm"
          :label-position="referenceSource == 'setting' ? 'left' : 'top'"
          label-width="80px"
        >
          <!-- 公司名称 start-->
          <el-form-item :label="`${$t('member.form.companyName')}`" prop="companyName">
            <el-input
              v-model="memberForm.companyName"
              :placeholder="$t('member.placeholder.companyName')"
            ></el-input>
          </el-form-item>
          <!-- 公司名称 end -->
          <!-- 电话 start -->
          <el-form-item :label="`${$t('member.form.telphone')}`" prop="telphone">
            <el-input
              v-model="memberForm.telphone"
              :placeholder="$t('member.placeholder.telphone')"
            ></el-input>
          </el-form-item>
          <!-- 电话 end -->
          <!-- 电子邮件 start -->
          <el-form-item :label="`${$t('member.form.email')}`" prop="email">
            <el-input v-model="memberForm.email" :placeholder="$t('member.placeholder.email')"></el-input>
          </el-form-item>
          <!-- 电子邮件 end -->
          <!-- 地址 start -->
          <el-form-item  :label="`${$t('member.form.address')}`" prop="address">
             <el-input v-model="memberForm.address" :placeholder="$t('member.placeholder.address')"></el-input>
          </el-form-item>
          <!-- 地址 end -->
          <!-- 网址 start -->
          <el-form-item :label="`${$t('member.form.companyWebSite')}`">
           <el-input v-model="memberForm.webSite" :placeholder="$t('member.placeholder.companyWebSite')"></el-input>
          </el-form-item>
          <!-- 网址 end -->
          <!-- 按钮 -->
          <el-form-item class="add-new-member__btn">
            <el-button
              type="primary"
              :loading="submitBtnLoading"
              @click="onSubmitForm('memberForm')"
            >
              {{ $t("public.btn.save") }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    /**
     *  如果值为 setting 那么就表示在设置页面中引入，不显示角色
     */
    referenceSource: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      memberForm: {
        id: "",
        companyName: "",
        telphone: "",
        email: "",
        webSite: "",
        address: ""
      },
      rules: {
        companyName: [
          {
            required: true,
            message: this.$t("member.rules.companyName"),
            trigger: "blur"
          }
        ],
        telphone: [
          {
            required: true,
            message: this.$t("member.rules.telphone"),
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: this.$t("member.rules.email"),
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: this.$t("member.rules.address"),
            trigger: "blur"
          }
        ]
      },
      submitBtnLoading: false,
    };
  },
  computed: {
    account() {
      return this.$store.getters['members/account']
    },
    password() {
      return this.$store.getters['members/password']
    },
    userInfo() {
      return this.$store.getters['ipublic/userInfo'] 
    }
  },
  created() {
    this.getCustomerInfo();
  },
  methods: {
    // 获取客户相关信息
    getCustomerInfo() {
      // 获取这个客户账号下的项目, 然后根据项目ID获取项目信息
      this.$http.post("/customer/item/withpaginglist").then(res => {
        if (res.iworkuCode == 200) {
          this.memberForm.id = res.datas[0].itemId;
          this.$http.get(`/customer/item/infobypk/${this.memberForm.id}`).then(re => {
            if (re.iworkuCode == 200 && re.datas) {
              this.memberForm.email = re.datas.companyEmail;
              this.memberForm.companyName = re.datas.companyName;
              this.memberForm.telphone = re.datas.companyTel;
              this.memberForm.webSite = re.datas.companyWebsite;
              this.memberForm.address = re.datas.companyAddress;
            }
          });
        }
      });
    },
    /**
     *  提交表单
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            id: this.memberForm.id,
            companyName : this.memberForm.companyName,
            companyAddress : this.memberForm.address,
            companyEmail : this.memberForm.email,
            companyTel : this.memberForm.telphone,
            companyWebSite: this.memberForm.webSite
          };
          this.submitBtnLoading = true;
          this.$http.post('/customer/company/update', params).then(res => {
            if (res.iworkuCode == 200) {
              this.userInfo.id == this.memberForm.id && this.$store.commit('ipublic/$_set_userInfo', {...this.userInfo, ...params});
              this.$imessage({
                content: this.$t("public.tips.success"),
                type: "success"
              });
              this.memberForm.id = "";
              this.$emit("onOperateSuccess");
            }
            this.submitBtnLoading = false;
          });
        }
      });
    },
    /**
     *  表单重置
     */
    onResetForm(formName) {
        this.$refs[formName].resetFields();
        this.memberForm.email = null;
    },
  }
};
</script>
<style lang="scss" scoped>
.add-new-member {
  background-color: $--default-white;
  &__btn {
    text-align: right;
    margin-right: 20px;
    margin-top: 50px;
    padding-top: 20px;
    border-top: 1px solid $--default-light-gray-2;
  }
  &__region {
    display: flex;
    flex-direction: column;
    width: 50px;
    text-align: center;
    &-name {
      margin-top: -10px;
      font-size: 12px;
    }
  }
  &__re-upload {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .el-icon-circle-plus-outline {
    font-size: 50px;
    cursor: pointer;
  }
}
</style>
