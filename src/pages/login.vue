<template>
    <section class="login">
        <div style="display: flex; height: 100%; align-items: center;">
            <div class="login__iworku">
                <div class="content">
                    <img src="./../assets/img/Logo.svg" style="display:block; width: auto;" />
                    <div class="subtitle">Global Local Marking CRM System</div>
                </div>
            </div>
            <div class="login__form">
                <el-form style="width: 50%;" :model="loginForm" :rules="rules" ref="loginForm">
                    <div class="title">{{ $t("login.title") }}</div>
                    <el-form-item label="" prop="email">
                        <el-input v-model="loginForm.email" :placeholder="$t('login.placeholder.email')"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input type="password" show-password v-model="loginForm.password" :placeholder="$t('login.placeholder.password')"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-checkbox v-model="loginForm.isAuto">{{ $t("login.autoLogin") }}</el-checkbox>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button round class="login__btn" @click="onSubmitForm('loginForm')">{{ $t("login.btn") }}</el-button>
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
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                email: "",
                password: "",
                isAuto: false
            },
            rules: {
                email: [{
                    required: true, message: this.$t("login.rules.email"), trigger: 'blur'
                }],
                password: [{
                    required: true, message: this.$t("login.rules.password"), trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        /**
         *  表单提交
         */
        onSubmitForm(formName) {
            this.$router.push({ path: '/' });
            // this.$refs[formName].validate(valid => {
            //     if (valid) {
            //         alert("submit!");
            //     }
            // });
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100vh;
    background-image: url('./../assets/img/login_bg.jpg');
    background-repeat: no-repeat;
    background-attachment:fixed;
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
            font-size:20px; 
            color:white;
            line-height: 50px;
        }
    }
    &__form {
        flex: 1;
        display: flex;
        align-content: center;
        .title {
            color: #8D43FF;
            font-size: .4rem;
            font-weight:500;
            margin-bottom: .5rem;
        }
    }
    &__btn {
        border-radius:31px;
        margin-top: .1rem;
        background-color: #E50054;
        color: white;
        font-size: 20px;
        width:2rem;
        padding: .15rem 0;
        box-shadow:0px 4px 20px 0px rgba(229,0,84,0.3),0px 4px 18px 0px rgba(229,0,84,0.4),0px 4px 4px 0px rgba(229,0,84,0.49);
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
                padding: 0 .1rem;
            }
            li:not(:last-child)::after {
                content: "|";
                color: #7B7B7B;
                display: inline-block;
                margin-left: .2rem;
            }
            a {
                color: #7B7B7B;
                font-size: 14px;
            }
        }
        .ownership {
            color: #7B7B7B;
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
            box-shadow: 0px 0px 20px 0px #8D43FF;
        }
        .el-input__inner {
            height: .5rem;
            font-size: .16rem;
        }
    }
</style>