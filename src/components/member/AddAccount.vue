<template>
  <!-- 添加新成员之账号创建  邮箱和密码  -->
  <section class="add-account">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form
          :model="accountForm"
          :rules="rules"
          ref="accountForm"
          label-position="top"
          label-width="80px"
        >
          <el-form-item :label="`${$t('member.form.account')}`" prop="account">
            <el-input v-model="accountForm.account" type="email" :placeholder="$t('member.placeholder.account')"></el-input>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.password')}`" prop="password">
            <el-input v-model="accountForm.password" type="password" :placeholder="$t('member.rules.password[1]')"></el-input>
          </el-form-item>
          <el-form-item class="add-account__btn">
            <el-button
              type="primary"
              @click="onSubmitForm('accountForm')"
            >{{ $t("member.btn.fillInformation") }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  data() {
    return {
      accountForm: {
        account: this.$store.getters['members/account'],
        password: this.$store.getters['members/password']
      },
      rules: {
        account: [
          {
            required: true,
            message: this.$t("member.rules.account[0]"),
            trigger: "blur"
          },{
            validator: (rule, value, callback) => {
              if (!/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(value)) {
                callback(new Error(this.$t("member.rules.account[1]")));
              } else {
                callback();
              }
            }
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("member.rules.password[0]"),
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (value.length < 8 || !/^[A-Za-z0-9]+$/gi.test(value)) {
                callback(new Error(this.$t("member.rules.password[1]")));
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
    /**
     * 创建账号
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.commit('members/$_set_account', this.accountForm.account);
          this.$store.commit('members/$_set_password', this.accountForm.password);
          this.$emit("accountCreated");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.add-account {
  &__btn {
    text-align: right;
    margin-right: 20px;
    margin-top: 50px;
    padding-top: 20px;
    border-top: 1px solid $--default-light-gray-2;
  }
}
</style>
