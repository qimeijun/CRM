<template>
  <section class="add-region">
    <el-form
      :model="addRegionForm"
      :rules="rules"
      ref="addRegionForm"
      label-position="top"
      label-width="80px"
    >
      <el-form-item :label="$t('addRegion.form.name')" prop="name">
        <el-input v-model="addRegionForm.name" :placeholder="$t('addRegion.form.name')"></el-input>
      </el-form-item>
      <el-form-item style="width: 50%" :label="$t('addRegion.form.country')" prop="country">
        <el-select v-model="addRegionForm.country" filterable @change="onChangeCountry" :placeholder="$t('addRegion.form.country')">
            <template v-if="countryList && countryList.length > 0">
                <el-option
                    v-for="item in countryList"
                    :key="item.id"
                    :label="item.areaName"
                    :value="item.id">
                </el-option>
            </template>
        </el-select>
      </el-form-item>
      <el-form-item style="width: 50%" :label="$t('addRegion.form.city')" prop="city">
        <el-select v-model="addRegionForm.city" filterable :placeholder="$t('addRegion.form.city')">
            <template v-if="cityList && cityList.length > 0">
                <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.areaName"
                    :value="item.id">
                </el-option>
            </template>
        </el-select>
      </el-form-item>

      <el-form-item class="add-region__btn">
        <el-button
          type="primary"
          :loading="submitBtnLoading"
          @click="onSubmitForm('addRegionForm')"
        >
        <template v-if="addRegionForm.id">{{ $t("addRegion.btn.modify") }}</template>
        <template v-else>{{ $t("addRegion.btn.add") }}</template>
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import { getCountry, getCityById } from "@/plugins/configuration.js"
export default {
  props: {
      regionInfo: {
          type: Object,
          default() {
              return {}
          }
      }
  },
  data() {
    return {
      addRegionForm: {
        id: "",
        name: "",
        country: "",
        city: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t("addRegion.rules.name")
          }
        ],
        country: [
          {
            required: true,
            message: this.$t("addRegion.rules.country")
          }
        ],
        city: [
          {
            required: true,
            message: this.$t("addRegion.rules.city")
          }
        ]
      },
      countryList: [],
      cityList: [],
      submitBtnLoading: false
    };
  },
  async created() {
      this.countryList = await getCountry(this);
  },
  methods: {
    // 表单提交
    onSubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.submitBtnLoading = true;
                if (this.addRegionForm.id) {
                    // 修改
                    this.$http.post('/user/region/update', {
                        id: this.addRegionForm.id,
                        regionName: this.addRegionForm.name,
                        regionCity: this.addRegionForm.city,
                        regionCountry: this.addRegionForm.country
                    }).then(res => {
                        if (res.iworkuCode == 200) {
                            this.$imessage({
                                content: this.$t("public.tips.success"),
                                type: "success"
                            });
                            this.$emit("onOperateSuccess", this.addRegionForm);
                        }
                        this.submitBtnLoading = false;
                    });
                } else {
                    // 添加
                    this.$http.post('/user/region/save', {
                        regionName: this.addRegionForm.name,
                        regionCity: this.addRegionForm.city,
                        regionCountry: this.addRegionForm.country
                    }).then(res => {
                        if (res.iworkuCode == 200) {
                            this.$imessage({
                                content: this.$t("public.tips.success"),
                                type: "success"
                            });
                            this.$store.commit('ipublic/$_set_regionList', [{
                              id: res.datas,
                              regionName: this.addRegionForm.name
                            }])
                            this.$emit("onOperateSuccess");
                        }
                        this.submitBtnLoading = false;
                    })
                }
            }
        });
    },
    async onChangeCountry(id) {
        this.cityList = await getCityById(this, id);
    } 
  },
  watch: {
      regionInfo: {
        handler(newVal, oldVal) {
            if (newVal && Object.keys(newVal).length > 0) {
                this.addRegionForm = {...this.addRegionForm, ...newVal};
                this.onChangeCountry(this.addRegionForm.country);
            }
        },
        immediate: true
      }
  }
};
</script>
<style lang="scss" scoped>
.add-region {
    padding: .2rem;
    &__btn {
        margin-top: 40px;
        padding-top: 25px;
        text-align: right;
        border-top: 1px solid $--default-light-gray-2;
    }
}
</style>