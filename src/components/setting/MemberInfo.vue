<template>
  <section class="setting-member">
    <el-form
      :model="memberForm"
      :rules="rules"
      ref="memberForm"
      label-position="left"
      label-width="80px"
    >
      <el-form-item :label="`${$t('setting.form.companyName')}`" prop="companyName">
        <el-input v-model="memberForm.companyName" placeholder></el-input>
      </el-form-item>
      <el-form-item :label="`${$t('setting.form.companyShortName')}`" prop="companyShortName">
        <el-input v-model="memberForm.companyShortName" placeholder></el-input>
      </el-form-item>
      <el-form-item :label="`${$t('setting.form.telphone')}`" prop="telphone">
        <el-input v-model="memberForm.telphone" placeholder></el-input>
      </el-form-item>
      <el-form-item :label="`${$t('setting.form.email')}`" prop="email">
        <el-input v-model="memberForm.email" placeholder></el-input>
      </el-form-item>
      <el-form-item :label="`${$t('setting.form.country')}`" prop="country">
        <el-input v-model="memberForm.country" placeholder></el-input>
      </el-form-item>
      <el-form-item class="setting-member__btn">
        <el-button type="primary" @click="onSubmitForm('memberForm')">{{ $t("setting.btn.save") }}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      memberForm: {
        companyName: "",
        companyShortName: "",
        telphone: "",
        email: "",
        country: ""
      },
      rules: {
        companyName: [
          {
            required: true,
            message: this.$t("setting.rules.companyName"),
            trigger: "blur"
          }
        ],
        companyShortName: [
          {
            required: true,
            message: this.$t("setting.rules.companyShortName"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /**
     *  提交表单
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.setting-member {
  &__btn {
    text-align: right;
    margin-right: 20px;
    margin-top: 50px;
    padding-top: 20px;
    border-top: 1px solid $--default-light-gray-2;
  }
}
</style>
