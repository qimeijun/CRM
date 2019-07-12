<template>
  <!-- 修改或者添加团队信息 -->
  <section class="update-team">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div
          class="update-team__top"
          :style="`background:linear-gradient(315deg,${teamForm.teamColor.colorStart} 0%,${teamForm.teamColor.colorEnd} 100%);`"
        >
          <div class="team">{{ team.teamName || 'Team' }}</div>
          <div
            style="display: flex; justify-content: space-between;align-items: center; margin-top: 5px;"
          >
            <div>Leader: {{ team.teamAdminUser }}</div>
            <div style="display: flex; align-items: center; margin-right: .2rem;">
              <el-avatar :size="20" :src="team.logo"></el-avatar>
              <span style="margin-left: .1rem;">{{ team.teamCountry }}</span>
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
          <el-form-item :label="`${$t('team.form.name')}`" prop="name">
            <el-input v-model="teamForm.teamName"></el-input>
          </el-form-item>
          <el-form-item :label="`${$t('team.form.country')}`" prop="country">
            <el-input v-model="teamForm.teamCountry"></el-input>
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
            <el-button type="primary" @click="onSubmitForm('teamForm')">{{ $t("team.btn.confirm") }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  props: {
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
        name: [
          {
            required: true,
            message: this.$t("team.rules.name"),
            trigger: "blur"
          }
        ],
        country: [
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
      ]
    };
  },
  created() {
    this.teamForm.teamColor = this.colorsList[0];
  },
  methods: {
    /**
     *  提交表单
     */
    onSubmitForm(formName) {
      this.$emit("updateTeam");
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        }
      });
    },
    /**
     *  切换颜色
     */
    onChangeColor(item) {
        console.log(item);
        this.teamForm.teamColor = item;
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
