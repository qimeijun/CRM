<template>
  <section class="login">
    <div style="display: flex; height: 100%; align-items: center;">
      <div class="login__iworku">
        <div class="content">
          <img src="./../assets/img/Logo.svg" style="display:block; width: auto;" />
          <div class="subtitle">Global Local Marketing CRM System</div>
        </div>
      </div>
      <div class="login__form">
        <el-form style="width: 50%;" :model="loginForm" :rules="rules" ref="loginForm">
          <div class="title">{{ $t("login.title") }}</div>
          <el-form-item label prop="email">
            <el-input
              v-model="loginForm.email"
              :placeholder="$t('login.placeholder.email')"
              @keyup.enter.native="onSubmitForm('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item label prop="password">
            <el-input
              type="password"
              show-password
              v-model="loginForm.password"
              :placeholder="$t('login.placeholder.password')"
              @keyup.enter.native="onSubmitForm('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item label>
            <el-checkbox v-model="loginForm.isSave">{{ $t("login.autoLogin") }}</el-checkbox>
          </el-form-item>
          <el-form-item label>
            <el-button
              :loading="submitBtnLoading"
              round
              class="login__btn"
              @click="onSubmitForm('loginForm')"
              @keyup.enter.native="onSubmitForm('loginForm')"
            >{{ $t("login.btn") }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login__foot">
      <ul>
        <li>
          <a href="https://www.iworku.com" target="_blank">IWORKU.COM</a>
        </li>
        <li>
          <a href="https://www.iworku.cn/" target="_blank">IWORKU PRO</a>
        </li>
        <li>
          <a href="https://vn.iworku.com/" target="_blank">IWORKU VN</a>
        </li>
        <li>
          <a href="https://vn.iworku.com/contact" target="_blank">{{ $t("login.link[0]") }}</a>
        </li>
        <li>
          <a href="https://vn.iworku.com/company" target="_blank">{{ $t("login.link[1]") }}</a>
        </li>
      </ul>
      <div class="ownership">{{ $t("login.ownership") }}</div>
      <div class="ownership">蜀ICP备16011338号</div>
    </div>
  </section>
</template>
<script>
import CryptoJS from "crypto-js"
import automaticLogin from "@/plugins/automaticLogin.js"
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
        isSave: false
      },
      rules: {
        email: [
          {
            required: true,
            message: this.$t("login.rules.email"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("login.rules.password"),
            trigger: "blur"
          }
        ]
      },
      submitBtnLoading: false
    };
  },
  async created() {
    await automaticLogin(this);
  },
  methods: {
    /**
     *  表单提交
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 是保存用户信息
          if (this.loginForm.isSave) {
            let password = "";
            this.loginForm.password
              ? (password = CryptoJS.AES.encrypt(
                  this.loginForm.password,
                  this.$global.encryptionKey
                ).toString())
              : null;
            let date = new Date();
            date.setDate(date.getDate() + this.$global.userSaveTime);
            document.cookie = `password=${password};path=/; expires=${date.toGMTString()}`;
            document.cookie = `username=${
              this.loginForm.email
            };path=/; expires=${date.toGMTString()}`;
          }
          this.submitBtnLoading = true;
          this.$http
            .post("/websocket/login", {
              account: this.loginForm.email,
              password: this.loginForm.password
            })
            .then(res => {
              this.submitBtnLoading = false;
              if (res.iworkuCode == 200) {
                this.$store.commit("ipublic/$_set_userInfo", res.datas);
                if (res.datas.regionId) {
                  this.$store.commit("ipublic/$_set_regionId", res.datas.regionId);
                  console.log(res.datas.regionId);
                }
                if (
                  res.datas.userRole == this.$global.userRole.customer
                ) {
                  this.$router.push({ path: "/customer" });
                } else {
                   
                  this.$router.push({ path: "/" });
                }
              }
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url("./../assets/img/login_bg.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 50%;
  background-size: cover;
  &__iworku {
    align-self: flex-start;
    flex: 1;
    .content {
      margin-top: 10%;
      margin-left: 10%;
    }
    .subtitle {
      font-size: 20px;
      color: white;
      line-height: 50px;
    }
  }
  &__form {
    flex: 1;
    display: flex;
    align-content: center;
    .title {
      color: #8d43ff;
      font-size: 0.4rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
  }
  &__btn {
    border-radius: 31px;
    margin-top: 0.1rem;
    background-color: #e50054;
    color: white;
    font-size: 20px;
    width: 2rem;
    padding: 0.15rem 0;
    box-shadow: 0px 4px 20px 0px rgba(229, 0, 84, 0.3),
      0px 4px 18px 0px rgba(229, 0, 84, 0.4),
      0px 4px 4px 0px rgba(229, 0, 84, 0.49);
    border: none;
  }

  &__foot {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    ul {
      display: flex;
      justify-content: center;
      li {
        padding: 0 0.1rem;
      }
      li:not(:last-child)::after {
        content: "|";
        color: #7b7b7b;
        display: inline-block;
        margin-left: 0.2rem;
      }
      a {
        color: #7b7b7b;
        font-size: 14px;
      }
    }
    .ownership {
      color: #7b7b7b;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
<style lang="scss">
.login__form {
  .el-input {
    border-radius: 8px;
    box-shadow: 0px 0px 20px 0px #8d43ff;
  }
  .el-input__inner {
    height: 0.5rem;
    font-size: 0.16rem;
  }
}
</style>