<template>
  <!-- 目标公司标签管理 -->
  <Main type="target"></Main>
</template>
<script>
export default {
  components: {
    Main: () => import("@/components/tag/Main.vue")
  }
};
</script>