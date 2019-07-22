<template>
  <!-- 修改公司资料 -->
  <div>
    <h1>{{$t("target.form.companyTitle")}}</h1>
    <el-form :model="form" :rules="rules" ref="form" label-position="top" label-width="80px">
      <el-form-item :label="$t('target.form.companyName')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.country')" prop="country">
        <el-select v-model="form.country">
          <el-option v-for="(item,index) in countryList" :key="'country'+index" :label="item.nameZh"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('target.form.site')" prop="name">
        <el-input v-model="form.site"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.url')" prop="name">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.phone')" prop="name">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item class="change-company__btn">
            <el-button
              type="primary"
              @click="onSubmitForm('form')"
            >{{$t("target.form.btn")}}</el-button>
          </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    companyForm: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    this.form = { ...this.companyForm };
  },
  computed:{
    countryList() {
      return [
          {
              nameZh:'中国',              
              nameEn:'中国en',    
          },
          {
              nameZh:'中国2',              
              nameEn:'中国en2',    
          },
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
        country: [
          {
            required: true,
            message: "请选择国家",
            trigger: "blur"
          }
        ],
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
  },
};
</script>
<style lang="scss" scoped>
    .change-company__btn{
       text-align:right;
    }
</style>