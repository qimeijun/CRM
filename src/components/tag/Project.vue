<template>
  <!-- 项目标签管理 -->
  <Main type="project"></Main>
</template>
<script>
export default {
  components: {
    Main: () => import("@/components/tag/Main.vue")
  }
};
</script>
