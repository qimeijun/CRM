<template>
  <!-- 修改其他信息 -->
  <div>
    <h1>其他</h1>
    <el-form :model="form" :rules="rules" ref="form" label-position="top" label-width="80px">
      <el-form-item label="客户来源" prop="source">
        <el-input v-model="form.source" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="客户类型" prop="type">
        <el-select v-model="form.type">
          <el-option
            v-for="(item,index) in countryList"
            :key="'position'+index"
            :label="item.nameZh"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预计采购" prop="scale">
        <el-input v-model="form.scale"></el-input>
      </el-form-item>
      <el-form-item label="海关编码" prop="importance">
        <el-input v-model="form.importance"></el-input>
      </el-form-item>
      <el-form-item label="重要程度" prop="rate">
        <el-input v-model="form.rate"></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="introduce">
        <el-input type="textarea" :rows="4" v-model="form.introduce"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input type="textarea" :rows="4" v-model="form.note"></el-input>
      </el-form-item>
      <el-form-item class="change-other__btn">
        <el-button type="primary" @click="onSubmitForm('form')">{{"完成"}}</el-button>
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