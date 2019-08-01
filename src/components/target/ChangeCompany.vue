<template>
  <!-- 修改公司资料 -->
  <div>
    <h1>{{$t("target.form.companyTitle")}}</h1>
    <el-form :model="form" :rules="rules" ref="form" label-position="top" label-width="80px">
      <el-form-item :label="$t('target.form.companyName')" prop="targetCompanyName">
        <el-input v-model="form.targetCompanyName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.country')" prop="targetCompanyCountry">
        <el-select v-model="form.targetCompanyCountry">
          <el-option
            v-for="(item,index) in countryList"
            :key="'country'+index"
            :label="$lang==$global.lang.en?item.areaNameEn:item.areaNameZh"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('target.form.site')">
        <el-input v-model="form.targetCompanyAddress"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.url')">
        <el-input v-model="form.targetCompanyWebsite"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.phone')">
        <el-input v-model="form.targetCompanyTel"></el-input>
      </el-form-item>
      <el-form-item class="change-company__btn">
        <el-button type="primary" @click="onSubmitForm('form')">{{$t("target.form.btn")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCountry } from "@/plugins/configuration.js";
export default {
  props: {
    companyForm: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  async created() {
    this.form = { ...this.companyForm };
    this.countryList = await getCountry(this);
  },
  data() {
    return {
      countryList: [],
      form: {},
      rules: {
        targetCompanyName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        targetCompanyCountry: [
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
          let params = {
            id: this.form.id,
            targetCompanyName: this.form.targetCompanyName,
            targetCompanyCountry: this.form.targetCompanyCountry,
            targetCompanyAddress: this.form.targetCompanyAddress,
            targetCompanyWebsite: this.form.targetCompanyWebsite,
            targetCompanyTel: this.form.targetCompanyTel
          };
          this.$http.post("/target/company/update",params).then(res=>{
             if(res.iworkuCode==200){
                 this.$emit("closeShow");
             }
          })
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.change-company__btn {
  text-align: right;
}
</style>