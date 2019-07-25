<template>
  <el-scrollbar style="height: calc(100vh - .75rem);">
    <div class="iworku-projectManage">
      <div>
        <h2>{{$t('project.title')}}</h2>
      </div>
      <div class="projectManage_content">
        <!-- 表格 start -->
        <Table></Table>
        <!-- 表格 end -->
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
export default {
  components: {
    
    Table: () => import("@/components/project/Table.vue")
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.iworku-projectManage {
  padding: 0.2rem;
}

</style>