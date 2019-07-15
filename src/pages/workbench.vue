<template>
  <div class="iworku-workbench">
    <div class="workbench_top">
      <h2>{{$t("workBench.title")}}</h2>
      <!-- 项目下拉菜单 start -->
      <div class="top_div">
        <el-select class="workbench_top_select" v-model="value" placeholder="请选择">
          <template slot="suffix">
            <i class="el-icon-caret-bottom"></i>
          </template>

          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 项目下拉菜单 end -->

      <!-- 添加新项目按钮 start -->
      <AddProject></AddProject>
      <!-- 添加新项目按钮 end -->
    </div>
    <div style="height: calc(100vh - 1.8rem);">
      <el-scrollbar style="height:100%;">
        <div class="workbench_content">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <!-- 项目概览 -->
              <Overview></Overview>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <!-- 本月工作 -->
              <Statistics></Statistics>
            </el-col>
            <!-- </el-row>
            <el-row>-->
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <!-- 日程提醒 -->
              <Remind></Remind>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <!-- 日程简报 -->
              <BriefReport></BriefReport>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <!-- 日程安排 -->
              <Calendar></Calendar>
            </el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import BriefReport from "@/components/workbench/briefReport.vue";
import Calendar from "@/components/workbench/calendar.vue";
import Overview from "@/components/workbench/overview.vue";
import Remind from "@/components/workbench/remind.vue";
import Statistics from "@/components/workbench/statistics.vue";
import AddProject from "@/components/workbench/addProject.vue";
export default {
  components: {
    BriefReport,
    Calendar,
    Overview,
    Remind,
    Statistics,
    AddProject
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "项目1"
        },
        {
          value: "选项2",
          label: "项目2"
        },
        {
          value: "选项3",
          label: "项目3"
        },
        {
          value: "选项4",
          label: "项目4"
        },
        {
          value: "选项5",
          label: "项目5"
        }
      ],
      value: "选项1"
    };
  }
};
</script>
<style lang="scss" scoped>
.iworku-workbench {
  padding: 0.2rem;
  .workbench_content {
    // width: 1062px;
    // margin: 0 auto;
  }
  .el-col {
    margin-bottom: 10px;
  }
  .workbench_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top_div {
      margin-left: 20px;
      flex-grow: 2;
    }
  }
  .workbench_top_select {
    width: 3.9rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    overflow: hidden;
    border: 0;
  }
}
</style>
<style>
.iworku-workbench .el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
.iworku-workbench .workbench_top_select .el-input__inner {
  background-color: #31376dff;
  color: white;
  border: 0;
}
</style>