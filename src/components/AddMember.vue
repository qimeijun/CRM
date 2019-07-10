<template>
  <!-- 添加新成员 -->
  <section class="add-new-member">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
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
              :on-success="onUploadAvatarSuccess"
              :before-upload="onBeforeAvatarUpload"
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
            <el-select filterable v-model="memberForm.country" placeholder>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.city')}`" prop="city">
            <el-select filterable v-model="memberForm.city" placeholder>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$t('member.form.role')}`" prop="role">
            <el-select filterable v-model="memberForm.role" placeholder>
              <el-option label="成员" value="1"></el-option>
              <el-option label="项目经理" value="2"></el-option>
              <el-option label="区域经理" value="3"></el-option>
            </el-select>
          </el-form-item>
          <!--  当选择 “成员” 角色时， 成员属于哪个团队 -->
          <el-form-item v-if="memberForm.role == 1" :label="`${$t('member.form.team')}`" prop="team">
            <el-select filterable v-model="memberForm.team" placeholder>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 当选择 “项目经理”， 这个项目经理属于哪个区域管理 -->
          <el-form-item  v-if="memberForm.role == 2" :label="`${$t('member.form.region')}`" prop="region">
            <div style="display:flex; align-items: flex-start; margin-right: 5px;">
              <template v-for="(item, index) in memberForm.region" >
                <div class="add-new-member__region" :key="index">
                  <el-avatar :size="50" :src="item.avatar"></el-avatar>
                  <span class="add-new-member__region-name">{{ item.name }}</span>
                </div>
              </template>
              <i class="el-icon-circle-plus-outline" @click="selectRegionalManagerDialogVisible=true;"></i>
            </div>
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

    <!-- 选择区域经理 start -->
    <el-dialog
      :title="$t('workDiary.add')"
      :visible.sync="selectRegionalManagerDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      width="30%">
        <SelectRegionalManager @regionalManager="getRegionalManager" @cancelSelect="onCloseSelect"></SelectRegionalManager>
    </el-dialog>
    <!-- 选择区域经理 end -->
  </section>
</template>
<script>
import SelectRegionalManager from "@/components/SelectRegionalManager.vue"
export default {
  components: {
    SelectRegionalManager
  },
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
        role: "",
        team: "",
        region: [
          {
            avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
            name: "张三"
          }
        ]
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
        region: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value.length == 0) {
                callback(new Error(this.$t("member.rules.region")));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      selectRegionalManagerDialogVisible: false
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
    },
    /**
     *  获取选择好的区域经理的数据
     */
    getRegionalManager(data) {
      this.selectRegionalManagerDialogVisible = false;
      // console.log(data);
    },
    /**
     * 关闭选择区域经理窗口
     */
    onCloseSelect() {
      this.selectRegionalManagerDialogVisible = false;
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
    // border-top: 1px solid $--default-light-gray-2;
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
  .el-icon-circle-plus-outline {
    font-size: 50px;
    cursor: pointer;
  }
}
</style>
