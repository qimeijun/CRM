<template>
  <!-- 表格后面的操作部分 -->
  <section class="table-operate">
    <el-popover placement="left" trigger="hover">
      <div class="table-operate__list">
        <slot></slot>
      </div>
      <i class="el-icon-more" slot="reference"></i>
    </el-popover>
  </section>
</template>
<style lang="scss" scoped>
.table-operate {
  .el-icon-more {
    font-size: 20px;
    vertical-align: middle;
    transform: rotate(90deg);
    cursor: pointer;
  }
  &__list {
    line-height: 30px;
  }
}
</style>
