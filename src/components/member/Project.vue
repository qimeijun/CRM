<template>
  <section class="member-project">
    <el-table
      class="member-project__table"
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="date" label="ID" sortable width="180"></el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[0]')"></el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[1]')" sortable></el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[2]')">
        <template slot-scope="scope">
          <el-avatar style="vertical-align: middle;" :size="40" :src="circleUrl"></el-avatar>
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[3]')">
        <template slot-scope="scope">
          <el-tag class="member-project__tag" effect="dark" type="primary" disable-transitions>{{scope.row.name}}</el-tag>
          <el-tag class="member-project__tag" effect="dark" type="primary" disable-transitions>{{scope.row.name}}</el-tag>
          <el-tag class="member-project__tag" effect="dark" type="primary" disable-transitions>{{scope.row.name}}</el-tag>
          <el-tag class="member-project__tag" effect="dark" type="primary" disable-transitions>{{scope.row.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[4]')" sortable></el-table-column>
      <el-table-column prop="address" :label="$t('memberInfo.projectTable[5]')" sortable></el-table-column>
      <el-table-column :label="$t('memberInfo.projectTable[6]')">
          <span class="member-project__delete" @click="onDelete">{{ $t("memberInfo.btn.shiftOutProject") }}</span>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center; margin-top: 20px;"
      :background="true"
      layout="prev, pager, next"
      :total="1000"
    ></el-pagination>

    <!-- 重新分配项目经理 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('selectRegionalManager.title')"
      :visible.sync="handOverAdministratorDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%">
      <el-scrollbar>
        <AddAdministrator @getManager="getManager" @addProjectAdministrator="handOverAdministratorDialogVisible=false;addMemberDialogVisible=true;" operate="add"></AddAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 添加区域经理 dialog end -->
    <!-- 添加新的项目经理 dialog start -->
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
    <!-- 添加新的项目经理 dialog end -->
  </section>
</template>
<script>
export default {
    components: {
        Operate: () => import("@/components/lib/Operate.vue"),
        AddAdministrator: () => import('@/components/member/ChangeAdministrator.vue'),
        // 添加新成员
        AddMember: () => import("@/components/member/AddMember.vue"),
    },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      handOverAdministratorDialogVisible: false,
      addMemberDialogVisible: false,
      userId: this.$route.params.id,
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    };
  },
  created() {
    this.getProject();
  },
  methods: {
    getProject() {
      this.$http.post('/customer/item/withpaginglist', {userId: this.userId, pageSize: this.page.pageSize, pageNum: this.page.pageNum}).then(res => {
        if (res.iworkuCode == 200) {
          this.tableData = res.datas;
          this.page.total = res.total;
        }
      });
    },
      /**
       *  移出项目
       */
      onDelete() {
        this.$confirm(`<i style="font-size: 35px; color: #E50054;" class="el-icon-question"></i><br/>${this.$t("memberInfo.memberShiftOutTip.content[0]")}`, this.$t("memberInfo.memberShiftOutTip.title"), {
            confirmButtonText: this.$t("memberInfo.memberShiftOutTip.btn[1]"),
            cancelButtonText: this.$t("memberInfo.memberShiftOutTip.btn[0]"),
            center: true,
            dangerouslyUseHTMLString: true
        }).then(() => {
            // 取消移除
        }).catch(() => {
            this.onConfirmShiftOutProject();
        });
      },
      /**
       *  确定移除项目
       */
      onConfirmShiftOutProject() {
        // 确定删除 正在跟进当中的
        this.$confirm(`<i style="font-size: 35px; color: #E50054;" class="el-icon-question"></i><br/>${this.$t("memberInfo.memberShiftOutTip.content[1]")}<br/>${this.$t("memberInfo.memberShiftOutTip.content[2]")}`, this.$t("memberInfo.memberShiftOutTip.title"), {
            confirmButtonText: this.$t("memberInfo.memberShiftOutTip.btn[2]"),
            cancelButtonText: this.$t("memberInfo.memberShiftOutTip.btn[3]"),
            center: true,
            dangerouslyUseHTMLString: true
        }).then(() => {
          // 移交任务操作 
          this.onShiftOutProjectAdministrator();
        }).catch(() => {
          // 移入公海操作
        });
      },
      /**
       *  如果当前用户是管理员在跟进
       */
      onShiftOutProjectAdministrator() {
        // 确定删除  项目经理
        this.$alert(`<i style="font-size: 35px; color: #E50054;" class="el-icon-question"></i><br/>${this.$t("memberInfo.memberShiftOutTip.content[1]")}<br/>${this.$t("memberInfo.memberShiftOutTip.content[3]")}`, this.$t("memberInfo.memberShiftOutTip.title"), {
            confirmButtonText: this.$t("memberInfo.memberShiftOutTip.btn[2]"),
            center: true,
            dangerouslyUseHTMLString: true
        }).then(() => {
            // 分配页面 弹窗
            this.handOverAdministratorDialogVisible = true;
        });
      },
      /**
       *  获取分配到的管理员信息
       */
      getManager(data) {
        this.handOverAdministratorDialogVisible = false;
        console.log(data);
      }
  }
};
</script>
<style lang="scss" scoped>
.member-project {
    margin-top: 10px ;
    &__delete {
        cursor: pointer;
        color: $--default-color;
    }

  &__tag {
    border-radius:40px; 
    margin-right: 0.05rem;
    margin-bottom: 0.05rem;
    background-color: #8D43FF;
  }
}
</style>
