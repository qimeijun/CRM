<template>
  <div class="iworku-workbench">
    <div class="workbench_top">
      <h2>{{$t("workBench.title")}}</h2>
      <!-- 项目下拉菜单 start -->
      <div class="top_div">
        <el-select
          class="workbench_top_select"
          v-model="itemIndex"
          :placeholder="$t('workBench.btn.selectItem')"
          filterable
        >
          <template slot="suffix">
            <i class="el-icon-caret-bottom"></i>
          </template>
          <el-option
            v-for="(item,index) in itemList"
            :key="index"
            :label="item.itemName"
            :value="index"
          ></el-option>
        </el-select>
      </div>
      <!-- 项目下拉菜单 end -->

      <!-- 添加新项目按钮 start -->
      <!-- 
            功能：添加新项目
            限制：成员不可添加 
      -->
      <AddProject
        v-show="userInfo.userRole!=$global.userRole.member&&userInfo.userRole!=$global.userRole.superAdministrator&&userInfo.userRole!=$global.userRole.projectManager"
      ></AddProject>
      <!-- 添加新项目按钮 end -->
    </div>
    <div v-if="itemList.length>0" style="height: calc(100vh - 1.8rem);">
      <el-scrollbar style="height:100%;">
        <div class="workbench_content">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <!-- 项目概览 -->
              <Overview :itemid="itemList[itemIndex].itemId"></Overview>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <!-- 本月工作 -->
              <Statistics :itemid="itemList[itemIndex].itemId"></Statistics>
            </el-col>
            <!-- </el-row>
            <el-row>-->
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <!-- 日程提醒 -->
              <Remind :itemid="itemList[itemIndex].itemId" :timer="timer" @getlist="handleLoad"></Remind>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <!-- 日程简报 -->
              <BriefReport
                :itemid="itemList[itemIndex].itemId"
                :itemStatus="itemList[itemIndex].itemStatus"
                :adminId="itemList[itemIndex].probjectManager"
              ></BriefReport>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <!-- 日程安排 -->
              <Calendar :itemid="itemList[itemIndex].itemId" :timer="timer" @getlist="handleLoad"></Calendar>
            </el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>
    <p
      style="text-align:center;margin-top:calc((100vh - 1.8rem)/3); 0;font-size:24px;"
      v-show="!itemList.length>0"
    >{{$t("workBench.noInvolved")}}</p>
  </div>
</template>
<script>
import session from "@/plugins/session.js";
import { mapGetters } from "vuex";
export default {
  components: {
    BriefReport: () => import("@/components/workbench/briefReport.vue"),
    Calendar: () => import("@/components/workbench/calendar.vue"),
    Overview: () => import("@/components/workbench/overview.vue"),
    Remind: () => import("@/components/workbench/remind.vue"),
    Statistics: () => import("@/components/workbench/statistics.vue"),
    AddProject: () => import("@/components/project/addProject.vue")
  },
  data() {
    return {
      itemList: [],
      itemIndex: 0,
      timer: ""
    };
  },
  watch: {
    itemIndex: function(newVal) {
      if (newVal != 0) {
        session.set("workItemId", this.itemList[newVal].itemId);
      }
    }
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"])
  },
  async created() {
    await this.getItemList();
  },
  methods: {
    // 获取项目列表
    getItemList() {
      this.$http.post("/customer/item/withoutpaginglist").then(res => {
        if (res.iworkuCode == 200) {
          this.itemList = res.datas;
          let workItemid = session.get("workItemId");
          // 获取工作台正在浏览的项目
          if (workItemid) {
            for (var i = 0; i < this.itemList.length; i++) {
              if (this.itemList[i].itemId == workItemid) {
                this.itemIndex = i;
              }
            }
          }
        }
      });
    },
    handleLoad() {
      this.timer = new Date().getTime();
    }
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
.iworku-workbench .workbench_top_select .el-input__inner {
  background-color: #31376dff;
  color: white;
  border: 0;
}
</style>