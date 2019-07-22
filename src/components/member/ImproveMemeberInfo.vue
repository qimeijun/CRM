<template>
  <!-- 添加新成员之完善资料 -->
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
          <!-- 头像 start -->
          <el-form-item
            label=""
            class="add-new-member__avatar-item"
            prop="avatar"
          >
            <el-upload
              class="add-new-member__avatar"
              :action="$global.qiniuURL"
              :show-file-list="false"
              :on-success="onUploadAvatarSuccess"
              :before-upload="onBeforeAvatarUpload"
            >
              <div v-if="memberForm.avatar" style="position: relative;">
                <el-avatar :size="100" :src="memberForm.avatar"></el-avatar>
                <el-button class="add-new-member__re-upload" type="primary" size="mini">{{ $t('member.btn.reUpload') }}</el-button>
              </div>
              <span v-else class="add-new-member__avatar-upload-icon">{{ $t("member.form.avatar[0]") }}</span>
            </el-upload>
            <span class="add-new-member__avatar-label">
              <template v-if="memberForm.avatar">
                {{ $t("member.form.avatar[1]") }}
              </template>
              <template v-else>
                {{ $t("member.form.avatar[0]") }}
              </template>
            </span>
          </el-form-item>
          <!-- 头像 end -->
          <!-- 用户名称 start-->
          <el-form-item :label="`${$t('member.form.username')}`" prop="username">
            <el-input
              v-model="memberForm.username"
              :placeholder="$t('member.placeholder.username')"
            ></el-input>
          </el-form-item>
          <!-- 用户名称 end -->
          <!-- 英文名称 start -->
          <el-form-item :label="`${$t('member.form.usernameEn')}`" prop="usernameEn">
            <el-input
              v-model="memberForm.usernameEn"
              :placeholder="$t('member.placeholder.usernameEn')"
            ></el-input>
          </el-form-item>
          <!-- 英文名称 end -->
          <!-- 性别 start -->
          <el-form-item :label="`${$t('member.form.gender')}`" prop="gender" style="width: 50%;">
            <el-select
              filterable
              v-model="memberForm.gender"
              :placeholder="$t('member.placeholder.gender')"
            >
              <el-option :label="$t('member.gender.female')" :value="1"></el-option>
              <el-option :label="$t('member.gender.male')" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- 性别 end -->
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
          <!-- 国家 start -->
          <el-form-item :label="`${$t('member.form.country')}`" prop="country">
            <el-select
              filterable
              v-model="memberForm.country"
              :placeholder="$t('member.placeholder.country')"
            >
              <el-option :label="$t('member.gender.female')" value="country44"></el-option>
              <el-option :label="$t('member.gender.male')" value="country44"></el-option>
            </el-select>
          </el-form-item>
          <!-- 国家 end -->
          <template v-if="referenceSource != 'setting'">
            <!-- 角色 start -->
            <el-form-item :label="`${$t('member.form.role')}`" prop="role">
              <el-select
                filterable
                v-model="memberForm.role"
                :placeholder="$t('member.placeholder.role')"
              >
                <el-option :label="$t('public.role.regionalManager')" :value="$global.userRole.regionalManager"></el-option>
                <el-option :label="$t('public.role.projectManager')" :value="$global.userRole.projectManager"></el-option>
                <el-option :label="$t('public.role.member')" :value="$global.userRole.member"></el-option>
              </el-select>
            </el-form-item>
            <!-- 角色 end -->
            <!--  当选择 “成员” 角色时， 成员属于哪个团队 -->
            <el-form-item
              v-if="memberForm.role == $global.userRole.member"
              :label="`${$t('member.form.team')}`"
              prop="team"
            >
              <el-select filterable v-model="memberForm.team" placeholder>
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <!-- 按钮 -->
          <el-form-item class="add-new-member__btn">
            <el-button
              type="primary"
              :loading="submitBtnLoading"
              @click="onSubmitForm('memberForm')"
            >
            <template v-if="memberForm.id">
              {{ $t("public.btn.save") }}
            </template>
            <template v-else>
              {{ $t("member.btn.confirmAdd") }}
            </template>
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
        id: "sdfjskdjfksd",
        avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
        username: "",
        usernameEn: "",
        gender: 1,
        telphone: "",
        email: "",
        role: "",
        team: "",
        country: ""
      },
      rules: {
        avatar: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error(this.$t("member.rules.avatar")));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: this.$t("member.rules.username"),
            trigger: "blur"
          }
        ],
        gender: [
          {
            required: true,
            message: this.$t("member.rules.gender"),
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
        country: [
          {
            required: true,
            message: this.$t("member.rules.country"),
            trigger: "blur"
          }
        ],
        role: [
          {
            required: true,
            message: this.$t("member.rules.role"),
            trigger: "blur"
          }
        ],
        team: [
          {
            required: true,
            message: this.$t("member.rules.team"),
            trigger: "blur"
          }
        ]
      },
      submitBtnLoading: false
    };
  },
  computed: {
    ...mapGetters('members', [
      'account',
      'password'
    ]),
  },
  created() {
    this.memberForm.email = this.account;
  },
  methods: {
    /**
     *  提交表单
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            userNameZh: this.memberForm.username,
            userNameEn: this.memberForm.usernameEn,
            userProfileImage: this.memberForm.avatar,
            userPassword: this.password,
            userEmail: this.memberForm.email,
            userAccount: this.account,
            userRole: this.memberForm.role,
            userGender: this.memberForm.gender,
            userPhone: this.memberForm.telphone,
            userCountry: this.memberForm.country,
          };
          // 如果是成员，需要选择team
          if (this.memberForm.role == this.$global.userRole.member) {
            params.teamId = this.memberForm.team;
          }
          this.submitBtnLoading = true;
          this.$http.post("/user/info/save", params).then(res => {
            if (res.iworkuCode == 200) {
              this.$store.commit('members/$_set_account', "");
              this.$store.commit('members/$_set_password', "");
              this.onResetForm(formName);
            } else {

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
    },
    /**
     *  图片上传成功之后。。。。
     */
    onUploadAvatarSuccess(res, file) {
      this.memberForm.avatar = URL.createObjectURL(file.raw);
    },
    /**
     * 图片上传之前，进行格式、大小检测
     */
    onBeforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
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
  &__avatar {
    margin: auto;
    position: relative;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: $--default-light-gray-2;
    &-upload-icon {
      display: inline-block;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $--default-light-gray;
      font-size: 14px;
      color: $--default-color;
    }
    &-label::before {
      content: "*";
      display: inline-block;
      color: red;
    }
    &-label {
      font-size: 14px;
      font-weight: 400;
      color: #989898;
    }
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
<style lang="scss">
.add-new-member__avatar-item {
  text-align: center;
  .el-form-item__content {
    margin-left: 0 !important;
  }
  .el-form-item__error {
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
