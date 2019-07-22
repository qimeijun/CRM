<template>
  <!-- 修改其他信息 -->
  <div>
    <h1>{{$t("target.form.otherTitle")}}</h1>
    <el-form :model="form" :rules="rules" ref="form" label-position="top" label-width="80px">
      <el-form-item :label="$t('target.form.source')" prop="source">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.clientType')" prop="type">
        <el-select v-model="form.type">
          <el-option
            v-for="(item,index) in countryList"
            :key="'position'+index"
            :label="item.nameZh"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('target.form.purchaseScale')" prop="scale">
        <el-input v-model="form.scale"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.hsCode')" prop="importance">
        <el-input v-model="form.importance"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.importance')" prop="rate">
        <el-input v-model="form.rate"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.introduce')" prop="introduce">
        <el-input type="textarea" :rows="4" v-model="form.introduce"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.remark')" prop="note">
        <el-input type="textarea" :rows="4" v-model="form.note"></el-input>
      </el-form-item>
      <el-form-item class="change-other__btn">
        <el-button type="primary" @click="onSubmitForm('form')">{{$t("target.form.btn")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    otherForm: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    this.form = { ...this.otherForm };
  },
  computed: {
    countryList() {
      return [
        {
          nameZh: "职位11",
          nameEn: "职位en"
        },
        {
          nameZh: "职位22",
          nameEn: "职位en2"
        }
      ];
    }
  },
  data() {
    return {
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        position: [
          {
            required: true,
            message: "请选择国家",
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
    }
  }
};
</script>
<style lang="scss" scoped>
.change-other__btn {
  text-align: right;
}
</style>