<template>
  <section class="update-password">
    <el-form
      :model="passwordForm"
      :rules="rules"
      ref="passwordForm"
      label-position="top"
      label-width="80px"
    >
      <!-- 设置页面引用时，显示账号 start -->
      <div v-if="referenceSource=='setting'">
        <div>
          <span style="color:#D50000;">*</span>
          {{ $t('setting.form.account[0]') }}
          <span style="margin-left: .1rem; color: #7B7B7B; font-size: 12px;">({{ $t('setting.form.account[1]') }})</span>
        </div>
        <div style="line-height: 40px; font-size: 18px;">{{ passwordForm.account }}</div>
      </div>
      <!-- 设置页面引用时，显示账号 start -->
      <!-- 新密码 start-->
      <el-form-item :label="`${$t('password.form.new')}`" prop="new">
        <el-input v-model="passwordForm.new" type="password" :placeholder="$t('password.placeholder.new')"></el-input>
      </el-form-item>
      <!-- 新密码 end-->
      <!-- 确认密码 start-->
      <el-form-item :label="`${$t('password.form.confirm')}`" prop="confirm">
        <el-input v-model="passwordForm.confirm" type="password" :placeholder="$t('password.placeholder.confirm')"></el-input>
      </el-form-item>
      <!-- 确认密码 end-->
      <el-form-item class="update-password__btn">
        <el-button
          type="primary"
          :loading="submitBtnLoading"
          @click="onSubmitForm('passwordForm')"
        >
        <template v-if="passwordForm.id">
          {{ $t("public.btn.save") }}
        </template>
        <template v-else>
          {{ $t("password.btn.cancel") }}
        </template>
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  props: {
    /**
     *  是否在设置页面中引用， type="setting"
     */
    referenceSource: {
      type: String,
      default() {
        return "";
      }
    },
    user: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      passwordForm: {
        id: "",
        account: "",
        new: "",
        confirm: ""
      },
      rules: {
        new: [
          {
            required: true,
            message: this.$t("password.rules.new[0]"),
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value.length < 8) {
                callback(new Error(this.$t("password.rules.new[1]")));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        confirm: [
          {
            required: true,
            message: this.$t("password.rules.confirm[0]"),
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.passwordForm.new) {
                callback(new Error(this.$t("password.rules.confirm[1]")));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      submitBtnLoading: false
    };
  },
  methods: {
    // 提交表单
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitBtnLoading = true;
          this.$http.post('/user/info/update/password', {
            id: this.passwordForm.id,
            userPassword: this.passwordForm.new
          }).then(res => {
            if (res.iworkuCode == 200) {
              this.$imessage({
                content: this.$t("public.tips.success"),
                type: "success"
              });
              this.onResetForm(formName);
              this.$emit("onOperateSuccess");
            }
            this.submitBtnLoading = false;
          });
        }
      });
    },
    /**
     * 表单重置
     */
    onResetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    user: {
      handler(newVal, old) {
        if (newVal) {
          this.passwordForm.id = newVal.id;
          this.passwordForm.account = newVal.userEmail;
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.update-password {
  &__btn {
    text-align: right;
    margin-right: 20px;
    padding-top: 20px;
  }
}
</style>
