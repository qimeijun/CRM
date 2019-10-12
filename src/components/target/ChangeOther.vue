<template>
  <!-- 修改其他信息 -->
  <div>
    <h1>{{$t("target.form.otherTitle")}}</h1>
    <el-form :model="form" :rules="rules" ref="form" label-position="top" label-width="80px">
      <el-form-item :label="$t('target.form.source')" prop="source">
        <el-input v-model="form.nodeCustomerSource"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.clientType')" prop="type">
        <template v-if="form.nodeClientTypeCustom || isAllowCustomType">
          <el-input v-model="form.nodeClientTypeCustom" style="display: inline-block;width: 60%"  :placeholder="$t('target.placeholder.customType')"></el-input>
          <span @click="isAllowCustomType=false; form.nodeClientTypeCustom=''" style="padding-left: 20px; font-size: 12px; color: #4937ea; cursor: pointer;">{{ $t('target.placeholder.customTip2') }}</span>
        </template>
        <template v-else>
          <el-select v-model="form.nodeClientType" style="display: inline-block; width: 60%;">
            <el-option
              v-for="(item,index) in targetTypeList"
              :key="'position'+index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <span @click="isAllowCustomType=true; form.nodeClientType=''" style="padding-left: 20px; font-size: 12px; color: #4937ea; cursor: pointer;">{{ $t('target.placeholder.customTip') }}</span>
        </template>
      </el-form-item>
      <el-form-item :label="$t('target.form.purchaseScale')" prop="scale">
        <el-input v-model="form.nodePurchaseScale"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.hsCode')" prop="importance">
        <el-input v-model="form.nodeHacode"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.importance')" prop="rate">
        <!-- <el-input v-model="form.nodeGrade"></el-input> -->
        <el-rate
          v-model="form.nodeGrade"
          :colors="gradeColors"
          show-text
          :texts="gradeTexts"
          :max="4"
        ></el-rate>
      </el-form-item>
      <el-form-item :label="$t('target.form.introduce')" prop="introduce">
        <el-input type="textarea" :rows="4" v-model="form.nodeProfile"></el-input>
      </el-form-item>
      <el-form-item :label="$t('target.form.remark')" prop="note">
        <el-input type="textarea" :rows="4" v-model="form.nodeRemarks"></el-input>
      </el-form-item>
      <el-form-item class="change-other__btn">
        <el-button type="primary" @click="onSubmitForm('form')">{{$t("target.form.btn")}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getTargetType, getGrade } from "@/plugins/configuration.js";
export default {
  props: {
    otherForm: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  async created() {
    this.form = { ...this.otherForm };
    this.form.nodeGrade = this.form.nodeGrade - 0;
    this.targetTypeList = await getTargetType(this);
    let gradeList = await getGrade(this);
    this.gradeTexts = gradeList.map(o => {
      return o.name;
    });
    this.gradeTexts.splice(0, 1);
  },
  data() {
    return {
      targetTypeList: [],
      gradeColors: ["#E50054", "#E50054", "#E50054"],
      gradeTexts: [],
      form: {},
      rules: {},
      isAllowCustomType: false
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
            targetCompanyId: this.form.targetCompanyId,
            nodeCustomerSource: this.form.nodeCustomerSource,
            nodeClientType: this.isAllowCustomType ? "" : this.form.nodeClientType,
            nodePurchaseScale: this.form.nodePurchaseScale,
            nodeHacode: this.form.nodeHacode,
            nodeGrade: this.form.nodeGrade,
            nodeProfile: this.form.nodeProfile,
            nodeRemarks: this.form.nodeRemarks,
            nodeClientTypeCustom: this.isAllowCustomType ? this.form.nodeClientTypeCustom : ""
          };
          this.$http.post("/target/company/node/update", params).then(res => {
            if (res.iworkuCode == 200) {
              this.$emit("closeShow");
            }
          });
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