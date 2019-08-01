<template>
  <section class="iworku-highseas">
    <div class="highseas_top">
      <h2>{{$t("highseas.title")}}</h2>
    </div>
    <!-- 公海表格 -->
    <div>
      <Table></Table>
    </div>
  </section>
</template>
<script>
export default {
  components: {
    Table: () => import("@/components/highseas/Table.vue")
  },
  data() {
    return {};
  },
  methods: {
    onClickSeek() {
      console.log(this.seek);
    },
    onClickTag() {}
  }
};
</script>
<style lang="scss" scoped>
.iworku-highseas {
  padding: 0.2rem;
}
.highseas_top {
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  h2 {
    flex-grow: 2;
  }
 
}

</style>