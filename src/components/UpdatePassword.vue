<template>
  <section class="update-password">
    <el-form
      :model="passwordForm"
      :rules="rules"
      ref="passwordForm"
      label-position="top"
      label-width="80px"
    >
    <!-- 新密码 -->
      <el-form-item :label="`${$t('password.form.new')}`" prop="new">
        <el-input v-model="passwordForm.new" type="password"></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item :label="`${$t('password.form.confirm')}`" prop="confirm">
        <el-input v-model="passwordForm.confirm" type="password"></el-input>
      </el-form-item>
      <el-form-item class="update-password__btn">
        <el-button
          type="primary"
          @click="onSubmitForm('passwordForm')"
        >{{ $t("password.btn.cancel") }}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      passwordForm: {
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
      }
    };
  },
  methods: {
    // 提交表单
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
