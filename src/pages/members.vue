<template>
  <!-- 成员管理 -->
  <section class="member">
    <!-- 头部检索 start -->
    <div class="member__top">
      <h1>{{ $t("memberManagement.title") }}</h1>
      <div class="member__top-search">
        <el-input type="text" v-model="searchMember" :placeholder="$t('memberManagement.searchInput')" suffix-icon="el-icon-search"></el-input>
        <el-button class="member__top-search-btn" type="primary" icon="el-icon-plus" @click="addMemberDialogVisible=true">{{ $t("memberManagement.btn.addMember") }}</el-button>
      </div>
    </div>
    <!-- 头部检索 end -->

    <!-- 表格 list  start -->
    <el-table
      class="el-table--expend"
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      :indent="0"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="date" :label="$t('memberManagement.table[0]')"></el-table-column>
      <el-table-column prop="name" :label="$t('memberManagement.table[1]')"></el-table-column>
      <el-table-column prop="address" :label="$t('memberManagement.table[2]')"></el-table-column>
      <el-table-column prop="address" :label="$t('memberManagement.table[3]')"></el-table-column>
      <el-table-column prop="address" :label="$t('memberManagement.table[4]')"></el-table-column>
      <el-table-column prop="address" :label="$t('memberManagement.table[5]')"></el-table-column>
      <el-table-column :label="$t('memberManagement.table[5]')" width="180px">
        <Operate>
          <ul>
            <li>
              <router-link to="detail">{{ $t("memberManagement.operate[0]") }}</router-link>
            </li>
            <li>
              <router-link to="/second">{{ $t("memberManagement.operate[1]") }}</router-link>
            </li>
            <li class="member__delete" @click="onDeleteMember">{{ $t("memberManagement.operate[2]") }}</li>
          </ul>
        </Operate>
      </el-table-column>
    </el-table>
    <!-- 表格 list  end -->

    <!-- 添加成员 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('selectRegionalManager.title')"
      :visible.sync="addMemberDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%">
      <el-scrollbar class="scrollbar">
        <AddMember></AddMember>
      </el-scrollbar>
    </el-dialog>
    <!-- 添加成员 dialog end -->
  </section>
</template>
<script>
import Operate from "@/components/lib/Operate.vue";
import AddMember from '@/components/AddMember.vue';
export default {
  components: {
    Operate,
    AddMember
  },
  data() {
    return {
      addMemberDialogVisible: false,
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
        }
      ]
    };
  },
  methods: {
    /**
     *  删除成员
     */
    onDeleteMember() {
      this.$confirm(this.$t("memberManagement.deleteTip.content[0]"), this.$t("memberManagement.deleteTip.title"), {
        confirmButtonText: this.$t("memberManagement.deleteTip.btn[1]"),
        cancelButtonText: this.$t("memberManagement.deleteTip.btn[0]"),
        type: "warning",
        center: true
      }).then(() => {
        // 取消删除
        this.$message({
          type: "success",
          message: "取消删除"
        });
      }).catch(() => {
        // 确定删除
        this.$message({
          type: "info",
          message: "确定删除"
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.member {
  margin: 20px;
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-search {
      display: flex;
    }
    &-search-btn {
      margin-left: .2rem;
    }
  }

  &__delete {
    cursor: pointer;
  }
}
</style>
