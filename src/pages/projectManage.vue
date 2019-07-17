<template>
  <div class="iworku-projectManage">
    <div class="projectManage_top">
      <h2>{{$t('project.title')}}</h2>
      <el-input class="top_seek" :placeholder="$t('project.placeholder.seek')" v-model="seek">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="onClickSeek()"></i>
      </el-input>
      <!-- 标签选择 start -->
      <el-cascader class="top_select"  v-model="tag" :options="taglist" :show-all-levels="false" :props="{ expandTrigger: 'hover' }" @change="onClickTag" :placeholder="$t('project.placeholder.tag')"></el-cascader>
      <!-- <el-select  v-model="tag" placeholder="请选择">
        <el-option
          v-for="item in taglist"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <!-- 标签选择 end -->

      <!-- 添加新项目按钮 start -->
      <AddProject></AddProject>
      <!-- 添加新项目按钮 end -->
    </div>
    <div class="projectManage_content">
      <!-- 表格 start -->
      <Table></Table>
      <!-- 表格 end -->
    </div>
  </div>
</template>
<script>
import AddProject from "@/components/project/addProject.vue";
import Table from "@/components/project/Table.vue";
export default {
  components: {
    AddProject,
    Table
  },
  data() {
    return {
      taglist: [
        {
          value: "zuyi",
          label: "组1",
          children: [
            {
              value: "biaoxian1",
              label: "标签1"
            },
            {
              value: "biaoxian2",
              label: "标签2"
            },
            {
              value: "biaoxian3",
              label: "标签3"
            },
          ]
        },
        {
          value: "zuer",
          label: "组2",
          children: [
            {
              value: "biaoxian1",
              label: "标签"
            },
            {
              value: "biaoxian2",
              label: "标签2"
            },
            {
              value: "biaoxian3",
              label: "标签3"
            },
          ]
        },
        {
          value: "zusan",
          label: "组3",
          children: [
            {
              value: "biaoxian1",
              label: "标签1"
            },
            {
              value: "biaoxian2",
              label: "标签2"
            },
            {
              value: "biaoxian3",
              label: "标签3"
            },
          ]
        },
      ],
      tag: "",
      seek: ""
    };
  },
  methods: {
    onClickSeek(){
      console.log("seek",this.seek);
    },
     onClickTag(){
      console.log("tag",this.tag);
    }
  },
};
</script>
<style lang="scss" scoped>
.iworku-projectManage {
  padding: 0.2rem;
}
.projectManage_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    flex-grow: 2;
  }
  .top_select {
    width: 2.38rem;
    margin: 0 10px;
  }
  .top_seek {
    width: 2.38rem;
  }
}
.projectManage_content {
  // width: 1062px;
  // margin: 0 auto;
}
.el-icon-search{
  cursor: pointer;
}
</style>