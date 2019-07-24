<template>
  <el-scrollbar style="height: calc(100vh - .75rem);">
    <!-- 成员管理 -->
    <section class="member">
      <!-- 头部检索 start -->
      <div class="member__top">
        <h1 style="font-size: 20px;">{{ $t("memberManagement.title") }}</h1>
        <div class="member__top-search">
          <el-input
            type="text"
            v-model="searchMember"
            :placeholder="$t('memberManagement.searchInput')"
          >
          <i slot="suffix" style="cursor: pointer;" @click="getTeamData" class="el-input__icon el-icon-search"></i></el-input>
          <el-button
            class="member__top-search-btn"
            type="primary"
            icon="el-icon-plus"
            @click="addMemberDialogVisible=true"
          >{{ $t("memberManagement.btn.addMember") }}</el-button>
        </div>
      </div>
      <!-- 头部检索 end -->
      <template v-if="dataList.length > 0">
      <Region v-for="(item, index) in dataList" :key="index" :data="item" @getRegionId="getRegionId"></Region>
      </template>
      <template v-else>
        暂无数据
      </template>
      <el-pagination
        v-if="pagination.total > pagination.pageSize * pagination.pageNum"
        style="text-align: center; margin-top: 20px;"
        :background="true"
        layout="prev, pager, next"
        :total="pagination.total"
      ></el-pagination>

      <!-- 添加成员 dialog start -->
      <el-dialog
        class="el-dialog__scroll"
        :title="$t('selectRegionalManager.title')"
        :visible.sync="addMemberDialogVisible"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        :close-on-click-modal="false"
        width="30%"
      >
        <el-scrollbar>
          <AddMember :params="isAddProjectManager ? {userRole: $global.userRole.projectManager} : {}" @onOperateSuccess="addMemberDialogVisible=false; isAddProjectManager=false; getTeamData();"></AddMember>
        </el-scrollbar>
      </el-dialog>
      <!-- 添加成员 dialog end -->

      <!-- 添加区域经理 dialog start -->
      <el-dialog
        class="el-dialog__scroll"
        :title="$t('selectRegionalManager.title')"
        :visible.sync="addManagerDialogVisible"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        :close-on-click-modal="false"
        width="30%"
      >
        <el-scrollbar>
          <AddAdministrator
            @getManager="getManager"
            @addProjectAdministrator="addManagerDialogVisible=false;addMemberDialogVisible=true;isAddProjectManager=true;"
            operate="add"
            :params="{id: $global.userRole.regionalManager, type: 'addRegionalManager'}"
          ></AddAdministrator>
        </el-scrollbar>
      </el-dialog>
      <!-- 添加区域经理 dialog end -->
    </section>

    <!-- <i-message></i-message> -->
  </el-scrollbar>
</template>
<script>
export default {
  components: {
    // 添加新成员
    AddMember: () => import("@/components/member/AddMember.vue"),
    // 添加区域经理
    AddAdministrator: () =>
      import("@/components/member/ChangeAdministrator.vue"),
    Region: () => import("@/components/member/Region.vue")
  },
  data() {
    return {
      addMemberDialogVisible: false,
      addManagerDialogVisible: false,
      searchMember: "",
      dataList: [],
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      // 当前操作的区域
      currentRegionId: null,
      isAddProjectManager: false
    };
  },
  created() {
    this.getTeamData();
  },
  methods: {
    /**
     *  超级管理员查看人员，根据Team分类
     */
    getTeamData() {
      this.$http.post("/user/team/withpaginglist", {
        keyWord: this.searchMember,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }).then(res => {
        if (res.iworkuCode == 200) {
          this.dataList = res.datas;
          this.pagination.total = res.total;
        }
      });
    },
    /**
     *  获取选择的经理信息
     */
    getManager(data) {
      this.addManagerDialogVisible = false;
      let currentRegion = this.dataList.find(val => val.id == this.currentRegionId);
      if (data) {
        this.$http.post('/user/team/user/rel/regional/manager', { teamId: this.currentRegionId, userId: data.id }).then(res => {
          if (res.iworkuCode == 200) {
            currentRegion ? currentRegion.regionalManager.push(data) : null;
          } 
        });
      }
    },
    /**
     *  获取当前操作的区域id
     */
    getRegionId(id) {
      this.currentRegionId = id;
    }
  }
};
</script>
<style lang="scss" scoped>
.member {
  margin: .2rem;
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-search {
      display: flex;
    }
    &-search-btn {
      margin-left: 0.2rem;
    }
  }
}
</style>
