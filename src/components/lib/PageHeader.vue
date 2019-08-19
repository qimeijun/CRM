<template>
  <section class="page-header">
    <i class="el-icon-back" @click="goBack"></i>
  </section>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default() {
        return "";
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({ path: this.url });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-header {
  width: 50px;
  height: 50px;
  border-radius: $--default-border-radius;
  background-color: #bbbbbb;
  text-align: center;
  .el-icon-back {
    color: $--default-white;
    font-size: 30px;
    line-height: 50px;
    cursor: pointer;
  }
}
</style>
