<template>
  <!-- 选择区域经理 -->
  <section class="select-regional-manager">
    <el-select v-model="selectValue" :placeholder="$t('selectRegionalManager.placeholder')" filterable>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div class="select-regional-manager__btn">
      <el-button @click="onCancel">{{ $t("public.btn.cancel") }}</el-button>
      <el-button type="primary" @click="onConfirmManager">{{ $t("public.btn.submit") }}</el-button>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      selectValue: ""
    };
  },
  methods: {
      /** 
       *  确定选择的区域经理
       */
      onConfirmManager() {
          let res = this.options.find(val => val.value == this.selectValue);
          this.$emit("regionalManager", res);
      },
      /**
       *  取消选择
       */
      onCancel() {
          this.$emit("cancelSelect");
      }
  }
  
};
</script>
<style lang="scss" scoped>
.select-regional-manager {
  &__btn {
    text-align: right;
    margin-right: 20px;
    border-top: 1px solid $--default-light-gray-2;
    padding-top: 20px;
  }
}
</style>
