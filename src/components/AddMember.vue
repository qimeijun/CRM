<template>
  <!-- 添加新成员 -->
  <section class="add-new-member">
    <el-row>
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
        <el-form
          class="iworku-form-line"
          :model="memberForm"
          :rules="rules"
          ref="memberForm"
          label-position="left"
          label-width="80px"
        >
          <el-form-item prop="avatar">
            <el-upload
              class="add-new-member__avatar"
              :action="$global.qiniuURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="memberForm.avatar" :src="memberForm.avatar" class="avatar" />
              <i v-else class="el-icon-plus add-new-member__avatar-upload-icon"></i>
            </el-upload>
            <span class="add-new-member__avatar-label">{{ $t("member.form.avatar") }}</span>
          </el-form-item>

          <el-form-item :label="`${$t('member.form.username')}`" prop="username">
            <el-input v-model="memberForm.username"></el-input>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.usernameEn')}`" prop="usernameEn">
            <el-input v-model="memberForm.usernameEn"></el-input>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.gender')}`" prop="gender">
            <el-radio-group v-model="memberForm.gender">
              <el-radio :label="1">{{ $t("member.gender.female") }}</el-radio>
              <el-radio :label="2">{{ $t("member.gender.male") }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.telphone')}`" prop="telphone">
            <el-input v-model="memberForm.telphone"></el-input>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.email')}`" prop="email">
            <el-input v-model="memberForm.email"></el-input>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.country')}`" prop="country">
            <el-select v-model="memberForm.country" placeholder>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.city')}`" prop="city">
            <el-select v-model="memberForm.city" placeholder>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.permission')}`" prop="permission">
            <el-select v-model="memberForm.permission" placeholder>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.team')}`" prop="team">
            <el-select v-model="memberForm.team" placeholder>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="add-new-member__btn">
            <el-button
              type="primary"
              @click="onSubmitForm('memberForm')"
            >{{ $t("public.btn.submit") }}</el-button>
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
      memberForm: {
        avatar: "",
        username: "",
        usernameEn: "",
        gender: 1,
        telphone: "",
        email: "",
        country: "",
        city: "",
        permission: "",
        team: ""
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
        email: [
          {
            required: true,
            message: this.$t("member.rules.email"),
            trigger: "blur"
          }
        ],
        permission: [
          {
            required: true,
            message: this.$t("member.rules.permission"),
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
    },
    handleAvatarSuccess(res, file) {
      this.memberForm.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
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
    border-top: 1px solid $--default-light-gray-2;
    padding-top: 20px;
  }
  &__avatar {
      position: relative;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background-color: $--default-light-gray-2;
      &-upload-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: $--default-light-gray;
        font-size: 30px;
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
}
</style>
