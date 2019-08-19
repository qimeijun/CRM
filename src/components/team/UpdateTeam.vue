<template>
  <!-- 修改或者添加团队信息 -->
  <section class="update-team">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div
          class="update-team__top"
          :style="`background:linear-gradient(315deg,${teamForm.teamColor.colorStart} 0%,${teamForm.teamColor.colorEnd} 100%);`"
        >
          <div class="team">{{ team.teamName || teamForm.teamName || 'Team' }}</div>
          <div
            style="display: flex; justify-content: space-between;align-items: center; margin-top: 5px;"
          >
            <div>Leader: {{ (team.projectManager && team.projectManager.userNameZh) || userInfo.userNameZh }}</div>
            <div style="display: flex; align-items: center; margin-right: .2rem;">
              <el-avatar :size="20" :src="team.logo"></el-avatar>
              <span style="margin-left: .1rem;">{{ team.teamCountry || selectCountry.areaName }}</span>
            </div>
          </div>
        </div>
        <el-form
          :model="teamForm"
          :rules="rules"
          ref="teamForm"
          label-position="left"
          label-width="80px"
        >
          <el-form-item :label="`${$t('team.form.name')}`" prop="teamName">
            <el-input v-model="teamForm.teamName"></el-input>
          </el-form-item>
          <el-form-item :label="`${$t('team.form.country')}`" prop="teamCountry">
            <el-select
              filterable
              v-model="teamForm.teamCountry"
              placeholder=""
              @change="onChangeCountry"
            >
            <template v-if="countryList.length > 0">
              <el-option v-for="(item, index) in countryList" :key="index" :label="item.areaName" :value="item.id"></el-option>
            </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$t('team.form.color')}`" prop="color">
            <div>
              <span
                v-for="(item, index) in colorsList"
                :key="index"
                class="update-team__color"
                @click="onChangeColor(item)"
                :style="`background:linear-gradient(315deg,${item.colorStart} 0%,${item.colorEnd} 100%);`"
              ></span>
            </div>
          </el-form-item>
          <el-form-item class="update-team__btn">
            <el-button type="primary" :loading="submitBtnLoading" @click="onSubmitForm('teamForm')">
              <template v-if="team.id">
                {{ $t("team.btn.confirm") }}
              </template>
              <template v-else>
                {{ $t("team.btn.add") }}
              </template>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { getCountry } from "@/plugins/configuration.js"
import { mapGetters } from 'vuex'
export default {
  props: {
    // 当编辑团队的时候传入以前的团队信息
    team: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      teamForm: {
        teamName: "",
        teamCountry: "",
        teamColor: {}
      },
      rules: {
        teamName: [
          {
            required: true,
            message: this.$t("team.rules.name"),
            trigger: "blur"
          }
        ],
        teamCountry: [
          {
            required: true,
            message: this.$t("team.rules.country"),
            trigger: "blur"
          }
        ]
      },
      colorsList: [
        {
          colorStart: "#CC208E",
          colorEnd: "#6713D2"
        },
        {
          colorStart: "#F93C23",
          colorEnd: "#E14FAD"
        },
        {
          colorStart: "#B224EF",
          colorEnd: "#484CE1"
        },
        {
          colorStart: "#FFD53C",
          colorEnd: "#E1633E"
        },
        {
          colorStart: "#8C00FF",
          colorEnd: "#D80B1E"
        }
      ],
      countryList: [],
      submitBtnLoading: false,
      selectCountry: {}
    };
  },
  computed: {
    ...mapGetters('ipublic', ['userInfo']),
  },
  async created() {
    if (this.team && this.team.teamColor && this.team.teamColor.includes(';')) {
      this.teamForm.teamColor = {colorStart: this.team.teamColor.split(';')[0], colorEnd: this.team.teamColor.split(';')[1]}
    }  else {
      this.teamForm.teamColor = this.colorsList[0];
    }
    this.teamForm.teamCountry = this.team.teamCountry;
    this.countryList = await getCountry(this);
  },
  methods: {
    /**
     *  提交表单
     */
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitBtnLoading = true;
          let params = {
            teamName: this.teamForm.teamName,
            teamCountry: this.teamForm.teamCountry,
            teamColor: `${this.teamForm.teamColor.colorStart};${this.teamForm.teamColor.colorEnd}`
          }
          if (this.team.id) {
            // 修改团队信息
            params.id = this.team.id;
            params.teamSatus = 1;
            this.$http.post('/user/team/update', params).then(res => {
              if (res.iworkuCode == 200) {
                this.$imessage({
                  content: this.$t("public.tips.success"),
                  type: "success"
                });
                this.$emit("updateTeam");
              }
              this.submitBtnLoading = false;
            });
          } else {
            // 添加团队信息
            this.$http.post('/user/team/save', params).then(res => {
              if (res.iworkuCode == 200) {
                this.$imessage({
                  content: this.$t("public.tips.success"),
                  type: "success"
                });
                this.$emit("updateTeam");
              }
              this.submitBtnLoading = false;
            });
          }
        }
      });
    },
    /**
     *  切换颜色
     */
    onChangeColor(item) {
        this.teamForm.teamColor = item;
    },
    /**
     *  国家切换
     */
    onChangeCountry(item) {
      this.selectCountry = this.countryList.find(val => item == val.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.update-team {
  &__color {
    margin-right: 0.1rem;
    display: inline-block;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    cursor: pointer;
  }

  &__top {
    margin-bottom: 20px;
    padding-top: 10px;
    padding-left: 0.3rem;
    color: $--default-white;
    height: 96px;
    border-radius: $--default-border-radius;
    .team {
      text-transform: capitalize;
      font-size: 23px;
    }
    .team:first-letter {
      font-size: 40px;
    }
  }
  &__btn {
    text-align: right;
    margin-right: 20px;
    margin-top: 50px;
    padding-top: 20px;
    border-top: 1px solid $--default-light-gray-2;
  }
}
</style>
