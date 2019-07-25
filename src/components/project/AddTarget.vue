<template>
  <!-- 修改公司资料 -->
  <section>
    <ul class="addTarget_ul">
      <li :class="activeName===1?'addTarget_ul_li--current':''">{{$t("target.form.companyTitle")}}</li>
      <li :class="activeName===2?'addTarget_ul_li--current':''">{{$t("target.form.keymenTitle")}}</li>
      <li :class="activeName===3?'addTarget_ul_li--current':''">{{$t("target.form.otherTitle")}}</li>
    </ul>
    <div>
      <!-- 第一步公司信息 start -->
      <el-form
        :model="companyForm"
        :rules="companyRules"
        v-if="activeName===1"
        ref="companyForm"
        label-position="top"
        label-width="80px"
      >
        <el-form-item :label="$t('target.form.companyName')" prop="name">
          <el-input v-model="companyForm.name" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item style="width:250px;" :label="$t('target.form.country')" prop="country">
          <el-select filterable v-model="companyForm.country">
            <el-option
              v-for="(item,index) in countryList"
              :key="'country'+index"
              :label="$lang==$global.lang.en?item.areaNameEn:item.areaNameZh"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('target.form.site')">
          <el-input v-model="companyForm.site"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.url')">
          <el-input v-model="companyForm.url"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.phone')">
          <el-input v-model="companyForm.phone"></el-input>
        </el-form-item>
        <el-form-item class="addTarget__btn">
          <el-button type="primary" @click="onSubmitForm('companyForm',2)">{{$t("target.next")}}</el-button>
        </el-form-item>
      </el-form>
      <!-- 第一步公司信息 end -->
      <!-- 第二步关键人 start -->
      <el-form
        :model="keymenForm"
        :rules="rules"
        v-if="activeName===2"
        ref="keymenForm"
        label-position="top"
        label-width="80px"
      >
        <el-form-item :label="$t('target.form.keymenName')">
          <el-input v-model="keymenForm.name" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.position')">
          <el-input v-model="keymenForm.position"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.keymenPhone')">
          <el-input v-model="keymenForm.phone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.email')">
          <el-input v-model="keymenForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.social')">
          <el-input v-model="keymenForm.social"></el-input>
        </el-form-item>
        <el-form-item class="addTarget__btn">
          <el-button type="primary" @click="onSubmitForm('keymenForm',3)">{{$t("target.next")}}</el-button>
        </el-form-item>
      </el-form>
      <!-- 第二步关键人 end -->
      <!-- 第三步其他 start -->
      <el-form
        :model="otherForm"
        :rules="rules"
        v-if="activeName===3"
        ref="otherForm"
        label-position="top"
        label-width="80px"
      >
        <el-form-item :label="$t('target.form.source')">
          <el-input v-model="otherForm.source" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.clientType')">
          <el-select v-model="otherForm.type">
            <el-option
              v-for="(item,index) in targetTypeList"
              :key="'position'+index"
              :label="$lang==$global.lang.en?item.nameEn:item.nameZh"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('target.form.purchaseScale')">
          <el-input v-model="otherForm.scale"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.hsCode')">
          <el-input v-model="otherForm.importance"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.importance')">
          <el-input v-model="otherForm.rate"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.introduce')">
          <el-input type="textarea" :rows="4" v-model="otherForm.introduce"></el-input>
        </el-form-item>
        <el-form-item :label="$t('target.form.remark')">
          <el-input type="textarea" :rows="4" v-model="otherForm.note"></el-input>
        </el-form-item>
        <el-form-item class="addTarget__btn">
          <el-button type="primary" @click="onSubmitForm('otherForm',4)">{{$t("target.finish")}}</el-button>
        </el-form-item>
      </el-form>
      <!-- 第三步其他 end -->
    </div>
  </section>
</template>
<script>
import { getCountry, getTargetType } from "@/plugins/configuration.js";
export default {
  data() {
    return {
      countryList: [],
      targetTypeList: [],
      activeName: 1,
      companyForm: {
        name: "",
        country: "",
        site: "",
        url: "",
        phone: "",
        email: ""
      },
      keymenForm: {
        name: "",
        position: "",
        phone: "",
        email: "",
        social: ""
      },
      otherForm: {
        source: "",
        type: "",
        scale: "",
        importance: "",
        rate: "",
        introduce: "",
        note: ""
      },
      companyRules: {
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
        ]
      }
    };
  },
  computed: {
    itemid() {
      return this.$route.query.itemid;
    }
  },
  async created() {
    // 国家
    this.countryList = await getCountry(this);
    // 公司类型
    this.targetTypeList = await getTargetType(this);
  },
  methods: {
    /**
     *  提交表单
     */
    onSubmitForm(formName, number) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          if (number === 4) {
            this.$emit("close");
            let params = {
              targetCompanyName: this.companyForm.name,
              targetCompanyCountry: this.companyForm.name,
              itemId: this.itemid,
              targetCompanyAddress: this.companyForm.site,
              targetCompanyWebsite: this.companyForm.url,
              targetCompanyTel: this.companyForm.phone,
              personName: this.keymenForm.name,
              personPosition: this.keymenForm.position,
              personTel: this.keymenForm.phone,
              personEmail: this.keymenForm.email,
              personAccount: this.keymenForm.social,
              nodeCustomerSource: this.otherForm.source,
              nodeClientType: this.otherForm.type,
              nodePurchaseScale: this.otherForm.scale,
              nodeHacode: this.otherForm.hsCode,
              nodeGrade: this.otherForm.rate,
              nodeProfile: this.otherForm.introduce,
              nodeRemarks: this.otherForm.note
            };
            this.$http.post("/target/company/save", params).then(res=>{
              if(res.iworkuCode==200){
              }
            });
          } else {
            this.activeName = number;
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.addTarget__btn {
  text-align: right;
}
.addTarget_ul {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  li {
    margin: 0 20px;
    font-size: 18px;
    font-weight: 500;
    line-height: 28px;
    position: relative;
    color: #bbbbbbff;
  }
  li::after {
    content: "";
    display: block;
    width: 120%;
    height: 5px;
    border-radius: 2.5px;
    background-color: transparent;
    transform: translate(-50%, 0);
    position: absolute;
    bottom: -4px;
    left: 50%;
  }
  .addTarget_ul_li--current {
    color: $--default-color;
  }
  .addTarget_ul_li--current::after {
    background-color: $--default-color;
  }
  .addTarget_ul_li--current::before {
    content: "";
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: $--default-color;
    transform: translate(-50%, 100%);
    position: absolute;
    bottom: -4px;
    left: 50%;
  }
}
</style>