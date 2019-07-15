<template>
  <!-- 修改关键人信息 -->
  <div>
    <h1>关键人</h1>
    <el-form :model="form" :rules="rules" ref="form" label-position="top" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="country">
        <el-select v-model="form.position">
          <el-option v-for="(item,index) in positionList" :key="'position'+index" :label="item.nameZh"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="社交账户" prop="social">
        <el-input v-model="form.social"></el-input>
      </el-form-item>
      <el-form-item class="change-keymen__btn">
            <el-button
              type="primary"
              @click="onSubmitForm('form')" 
            >{{"完成"}}</el-button>
          </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    keymenForm: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    this.form = { ...this.keymenForm };
  },
  computed:{
    positionList() {
      return [
          {
              nameZh:'职位11',              
              nameEn:'职位en',    
          },
          {
              nameZh:'职位22',              
              nameEn:'职位en2',    
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
        position: [
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
    .change-keymen__btn{
       text-align:right;
    }
</style>