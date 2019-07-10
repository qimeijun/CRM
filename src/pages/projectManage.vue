<template>
  <div class="iworku-projectManage">
    <div>
      <h2>项目管理</h2>
      <!-- 添加新项目按钮 start -->
      <AddProject></AddProject>
      <!-- 添加新项目按钮 end -->
    </div>
  </div>
</template>
<script>
import AddProject from "@/components/workbench/addProject.vue";
export default {
  components: {
    AddProject
  },
  data() {
    return {};
  }
};
</script>