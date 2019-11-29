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
          <!-- 头像 start 
            权限：客户登录不显示
          -->
          <el-form-item
            label=""
            class="add-new-member__avatar-item"
            prop="avatar"
          >
            <el-upload
              class="add-new-member__avatar"
              accept="image/jpeg, image/gif, image/png, image/bmp"
              :action="$global.qiniuURL"
              :show-file-list="false"
              :on-success="onUploadAvatarSuccess"
              :before-upload="onBeforeAvatarUpload"
              :data="uploadData"
              :on-progress="onUploadAvatarProgress"
            >
              <div v-if="memberForm.avatar" style="position: relative;">
                <el-avatar :size="100" :src="`${$global.avatarURI}${memberForm.avatar}`"></el-avatar>
                <el-button class="add-new-member__re-upload" type="primary" size="mini">{{ $t('member.btn.reUpload') }}</el-button>
              </div>
              <span v-else class="add-new-member__avatar-upload-icon">{{ $t("member.form.avatar[0]") }}</span>
              <span v-if="avatarProgress > 0 && avatarProgress <= 100" style="display: block; text-align: right; font-size: 12px;"> 
                {{ avatarProgress }}%
                <span :style="`display: block; background-color: #0b9207; height: 4px; margin-top: -10px; border-radius: 8px; width:${avatarProgress}%`"></span>
              </span>
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
          <!-- 区域 
            超级管理员添加时
            start -->
          <el-form-item v-if="!memberForm.id && userInfo.userRole == $global.userRole.superAdministrator" :label="`${$t('member.form.regional')}`" prop="regional">
            <el-select filterable v-model="memberForm.regional">
              <template v-if="regionList.length > 0">
                <el-option v-for="(item, index) in regionList" :key="index" :label="item.regionName" :value="item.regionId"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <!-- 区域 end -->
          <!-- 国家 start -->
          <el-form-item :label="`${$t('member.form.country')}`" prop="country">
            <el-select
              filterable
              v-model="memberForm.country"
              :placeholder="$t('member.placeholder.country')"
            >
            <template v-if="countryList.length > 0">
              <el-option v-for="(item, index) in countryList" :key="index" :label="item.areaName" :value="item.id"></el-option>
            </template>
            </el-select>
          </el-form-item>
          <!-- 国家 end -->
          <template v-if="!memberForm.id">
            <!-- 角色 start -->
            <el-form-item :label="`${$t('member.form.role')}`" prop="role">
              <el-select
                filterable
                v-model="memberForm.role"
                :placeholder="$t('member.placeholder.role')"
              >
                <el-option v-if="userInfo.userRole == $global.userRole.superAdministrator" :label="$t('public.role.regionalManager')" :value="$global.userRole.regionalManager"></el-option>
                <el-option v-if="[$global.userRole.superAdministrator, $global.userRole.regionalManager].includes(userInfo.userRole)" :label="$t('public.role.projectManager')" :value="$global.userRole.projectManager"></el-option>
                <el-option v-if="[$global.userRole.superAdministrator, $global.userRole.regionalManager, $global.userRole.projectManager].includes(userInfo.userRole)" :label="$t('public.role.member')" :value="$global.userRole.member"></el-option>
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
                <template v-if="teamList.length > 0">
                  <template v-for="(item, index) in teamList">
                    <el-option v-if="item.teamSatus == 1" :key="index" :label="item.teamName" :value="item.id"></el-option>
                  </template>
                </template>
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
import { getCountry, getQiniuToken, rename } from "@/plugins/configuration.js"
import { userInfo } from 'os';
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
    },
    /**
     *  修改用户时，传入的用户信息
     */
    user: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      memberForm: {
        id: "",
        avatar: "",
        username: "",
        usernameEn: "",
        gender: 1,
        telphone: "",
        email: "",
        role: "",
        team: "",
        country: "",
        regional: ""
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
        ],
        regional: [
          {
            required: true,
            message: this.$t("member.rules.regional"),
            trigger: "blur"
          }
        ]
      },
      submitBtnLoading: false,
      countryList: [],
      uploadData: {},
      teamList: [],
      avatarProgress: 0,
      regionList: []
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
    },
    regionId:{
      get: function () {
        return this.$store.getters['ipublic/regionId'];
      },
      set: function (newVal) {
        return newVal;
      }
    }
  },
  async created() {
    // 设置默认值  项目经理只能创建成员
    if (this.$global.userRole.projectManager == this.userInfo.userRole) {
      this.memberForm.role = this.$global.userRole.member;
    } 

    if (!this.memberForm.id) {
      this.memberForm.email = this.account;
      this.memberForm.regional = this.regionId;
      this.getTeam();
    }
    // 获取区域
    this.$http.post('/user/region/withpaginglist').then(res => {
      if (res.iworkuCode == 200 && res.datas) {
        this.regionList = res.datas;
      }
    });
    // 获取所有的国家
    this.countryList = await getCountry(this);
  },
  methods: {
    getTeam() {
      this.$http.post('/user/team/withoutpaginglist', { regionId: this.regionId }).then(res => {
        if (res.iworkuCode == 200) {
          this.teamList = res.datas;
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
            userNameZh: this.memberForm.username,
            userNameEn: this.memberForm.usernameEn,
            userProfileImage: this.memberForm.avatar,
            userPassword: this.password,
            userEmail: this.memberForm.email,
            userAccount: this.account,
            userRole: this.memberForm.role,
            userGender: this.memberForm.gender,
            userPhone: this.memberForm.telphone,
            userCountry: this.memberForm.country
          };
          
          if (!this.memberForm.id) {
            params.regionId = this.memberForm.regional;
            // 新增用户
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
                this.$imessage({
                  content: this.$t("public.tips.success"),
                  type: "success"
                });
                this.$emit("onOperateSuccess");
              }
              this.submitBtnLoading = false;
            });
          } else {
            // 修改用户信息
            params.id = this.memberForm.id;
            this.onResetForm(formName);
            this.submitBtnLoading = true;
            this.$http.post('/user/info/update', params).then(res => {
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
        }
      });
    },
    /**
     *  表单重置
     */
    onResetForm(formName) {
        this.$refs[formName].resetFields();
        this.memberForm.email = null;
        this.memberForm.avatar = null;
        this.avatarProgress = 0;
    },
    /**
     *  图片上传成功之后。。。。
     */
    onUploadAvatarSuccess(response) {
      this.memberForm.avatar = response.key;
      this.avatarProgress = 100;
    },
    /**
     * 图片上传之前，进行格式、大小检测
     */
    async onBeforeAvatarUpload(file) {
      // 获取七牛token, 重命名
      this.uploadData.token = await getQiniuToken(this);
      this.uploadData.key = rename(file.name);
      // 先制造一个假的
      this.avatarProgress = 10;
    },
    /**
     *  图片上传进度条
     */
    onUploadAvatarProgress(event) {
      this.avatarProgress = event.percent;
    }
  },
  watch: {
    user: {
      handler(newVal, oldVal) {
        if (Object.keys(newVal).length > 0) {
          this.memberForm.id = newVal.id;
          this.memberForm.avatar = newVal.userProfileImage;
          this.memberForm.username = newVal.userNameZh;
          this.memberForm.usernameEn = newVal.userNameEn;
          this.memberForm.gender = parseInt(newVal.userGender) || 2;
          this.memberForm.telphone = newVal.userPhone;
          this.memberForm.email = newVal.userEmail || this.account;
          this.memberForm.role = newVal.userRole;
          this.memberForm.team = newVal.orgId;
          this.memberForm.country = newVal.userCountry;
        }
      },
      immediate: true
    },
    regionId: {
      handler(newVal, oldVal) {
        if (newVal && !this.memberForm.id && this.userInfo.userRole == this.$global.userRole.superAdministrator) {
          this.memberForm.regional = newVal;
          this.getTeam();
        } else if (!this.memberForm.id && this.userInfo.userRole != this.$global.userRole.superAdministrator) {
          this.getTeam();
        }
      }
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
