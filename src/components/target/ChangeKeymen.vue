<template>
  <!-- 修改关键人信息 -->
  <div>
    <h1>{{$t("target.form.keymenTitle")}}</h1>
    <el-form :model="form" :rules="rules" ref="form" label-position="top" label-width="80px">
      <el-form-item :label="$t('target.form.keymenName')">
        <el-input v-model="form.personName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.position')">
        <el-input v-model="form.personPosition"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.keymenPhone')">
        <el-input v-model="form.personTel"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.email')">
        <el-input v-model="form.personEmail"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.social')">
        <el-input v-model="form.personAccount"></el-input>
      </el-form-item>
      <el-form-item class="change-keymen__btn">
        <el-button type="primary" @click="onSubmitForm('form')">{{$t("target.form.btn")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    keymenForm: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    this.form = { ...this.keymenForm };
  },
  data() {
    return {
      form: {},
      rules: {}
    };
  },
  methods: {
    /**
     *  提交表单
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            id: this.form.id,
            targetCompanyId:this.form.targetCompanyId,
            personName: this.form.personName,
            personPosition: this.form.personPosition,
            personTel: this.form.personTel,
            personEmail: this.form.personEmail,
            personAccount: this.form.personAccount
          };
          this.$http.post("/target/company/key/person/update", params).then(res => {
            if (res.iworkuCode == 200) {
              this.$emit("closeShow");
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.change-keymen__btn {
  text-align: right;
}
</style>