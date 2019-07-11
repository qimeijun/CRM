<template>
  <section class="project-detail-product">
    <div class="product_top">
      <h3>产品</h3>
      <el-button type="primary">编辑</el-button>
    </div>
    <div class="product_content">
      <h4>{{product.name}}</h4>
      <h4>附件(产品目录)</h4>
      <h4>学习资料</h4>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      product: {
        name: "Wuxi Hariken Electric Tools Co., Ltd.",
        img: [],
        video: [],
        attachment: [],
        study: []
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.project-detail-product {
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  padding: 1px 22px 20px;
  .product_top {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>