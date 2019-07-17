<template>
  <el-scrollbar style="height: calc(100vh - .75rem);">
    <!-- 成员管理 -->
    <section class="member">
      <!-- 头部检索 start -->
      <div class="member__top">
        <h1>{{ $t("memberManagement.title") }}</h1>
        <div class="member__top-search">
          <el-input
            type="text"
            v-model="searchMember"
            :placeholder="$t('memberManagement.searchInput')"
            suffix-icon="el-icon-search"
          ></el-input>
          <el-button
            class="member__top-search-btn"
            type="primary"
            icon="el-icon-plus"
            @click="addMemberDialogVisible=true"
          >{{ $t("memberManagement.btn.addMember") }}</el-button>
        </div>
      </div>
      <!-- 头部检索 end -->
      <div class="member__content">
        <div class="member__content-top">
          <span>{{ $t("member.regional") }}</span>
          <el-button type="primary" size="mini" @click="isUpdateManager=!isUpdateManager;">
            <template v-if="isUpdateManager">{{ $t("member.btn.ok") }}</template>
            <template v-else>{{ $t("member.btn.regional") }}</template>
          </el-button>
        </div>
        <!-- 区域经理 start -->
        <div class="member__regional">
          <div v-for="(item, index) in managerList" :key="index" class="member__regional-content">
            <el-avatar :size="50" :src="item.avatar"></el-avatar>
            <div class="member__regional-content-right">
              <span>{{ item.name }}</span>
              <span>{{ item.role }}</span>
            </div>
            <i v-if="isUpdateManager" class="el-icon-error" @click="onDeleteManager(index)"></i>
          </div>
          <!-- 添加区域经理 start-->
          <div
            v-if="isUpdateManager"
            class="member__regional-content member__regional-content-add"
            @click="addManagerDialogVisible=true;"
          >{{ $t("member.btn.addRegional") }}</div>
          <!-- 添加区域经理 start-->
        </div>
        <!-- 区域经理  end -->

        <!-- 表格 list  start -->
        <div class="member__table" style="width: 100%;">
          <div class="member__table-tr member__table-th">
            <div>{{ $t('memberManagement.table[0]') }}</div>
            <div>{{ $t('memberManagement.table[1]') }}</div>
            <div>{{ $t('memberManagement.table[2]') }}</div>
            <div>{{ $t('memberManagement.table[3]') }}</div>
            <div>{{ $t('memberManagement.table[4]') }}</div>
            <div>{{ $t('memberManagement.table[5]') }}</div>
            <div>{{ $t('memberManagement.table[6]') }}</div>
          </div>
          <template v-if="tableData && tableData.length > 0">
            <template v-for="(item, index) in tableData">
              <TableList :key="index + 1" :item="item"></TableList>
              <!-- 子成员 start -->
              <template v-if="item.children && item.children.length > 0">
                <TableList
                  v-for="(cItem, cIndex) in item.children"
                  :key="`${cIndex}-${cItem.id}`"
                  :children="true"
                  :last="cIndex+1 == item.children.length ? true : false"
                  :item="cItem"
                ></TableList>
              </template>
              <!-- 子成员 end -->
            </template>
          </template>
        </div>
        <!-- 表格 list  end -->
      </div>

      <!-- 添加成员 dialog start -->
      <el-dialog
        class="el-dialog__scroll"
        :title="$t('selectRegionalManager.title')"
        :visible.sync="addMemberDialogVisible"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        width="30%"
      >
        <el-scrollbar>
          <AddMember></AddMember>
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
        width="30%"
      >
        <el-scrollbar>
          <AddAdministrator
            @getManager="getManager"
            @addProjectAdministrator="addManagerDialogVisible=false;addMemberDialogVisible=true;"
            operate="add"
          ></AddAdministrator>
        </el-scrollbar>
      </el-dialog>
      <!-- 添加区域经理 dialog end -->
    </section>
  </el-scrollbar>
</template>
<script>
export default {
  components: {
    // 添加新成员
    AddMember: () => import("@/components/member/AddMember.vue"),
    // 表格列表
    TableList: () => import("@/components/member/Table.vue"),
    // 添加区域经理
    AddAdministrator: () =>
      import("@/components/member/ChangeAdministrator.vue"),
  },
  data() {
    return {
      addMemberDialogVisible: false,
      addManagerDialogVisible: false,
      searchMember: "",
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 6,
              date: "2016-05-01",
              name: "王小虎 扩展",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 5,
              date: "2016-05-01",
              name: "王小虎  扩展",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎 扩展",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎  扩展",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 6,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          children: [
            {
              id: 56,
              date: "2016-05-01",
              name: "王小虎 扩展",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 78,
              date: "2016-05-01",
              name: "王小虎  扩展",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 784,
              date: "2016-05-01",
              name: "王小虎  扩展",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        }
      ],
      isUpdateManager: false,
      managerList: [
        {
          avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
          name: "JSKFIDKDUSD",
          role: "区域经理"
        },
        {
          avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
          name: "JSKFIDKDUSD",
          role: "区域经理"
        },
        {
          avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
          name: "JSKFIDKDUSD",
          role: "区域经理"
        },
        {
          avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
          name: "JSKFIDKDUSD",
          role: "区域经理"
        },
        {
          avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
          name: "JSKFIDKDUSD",
          role: "区域经理"
        }
      ]
    };
  },
  methods: {
    /**
     *  删除经理
     */
    onDeleteManager(index) {
      this.managerList.splice(index, 1);
    },
    /**
     *  获取选择的经理信息
     */
    getManager(data) {
      this.addManagerDialogVisible = false;
      data.role = "区域经理";
      this.managerList.push(data);
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

  &__content {
    padding: 0.2rem;
    background-color: $--default-white;
    border-radius: $--default-border-radius;
    &-top {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-size: 16px;
      font-weight: 600;
    }
    .el-table--expend {
      background-color: $--default-white;
    }
  }

  &__table {
    color: #606266;
    &-th {
      line-height: 30px;
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 700;
      align-items: center;
      background-color: $--default-light-gray-2;
      border-radius: $--default-border-radius;
      div {
        flex: 1;
        padding: 0.1rem;
      }
    }
  }

  &__regional {
    display: flex;
    flex-wrap: wrap;
    &-content {
      position: relative;
      padding: 0.15rem 1%;
      margin-bottom: 15px;
      margin-right: 0.8%;
      width: 22%;
      display: flex;
      align-items: center;
      background-color: $--default-light-gray-2;
      border-radius: $--default-border-radius;
    }
    &-content-right {
      margin-left: 0.1rem;
      color: #7b7b7b;
      line-height: 25px;
      span {
        display: block;
      }
      span:first-child {
        font-size: 16px;
        color: $--default-black;
      }
    }
    &-content-add {
      background-color: #f8f8f8;
      border: 1px solid #ebeaee;
      font-size: 16px;
      color: $--default-color;
      height: 48px;
      cursor: pointer;
    }
    .el-icon-error {
      position: absolute;
      font-size: 20px;
      right: -10px;
      top: -10px;
      cursor: pointer;
    }
  }
}
</style>
