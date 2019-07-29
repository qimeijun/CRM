<template>
  <section class="member-project">
    <el-table
      class="member-project__table"
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="itemNumber" label="ID" sortable width="180"></el-table-column>
      <el-table-column prop="itemName" :label="$t('memberInfo.projectTable[0]')"></el-table-column>
      <el-table-column :label="$t('memberInfo.projectTable[1]')" sortable>
        <template slot-scope="scope">
          {{ $t(`project.status[${parseInt(scope.row.itemStatus) - 1}]`) }}
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[2]')">
        <template slot-scope="scope">
          <el-avatar style="vertical-align: middle;" :size="40" :src="`${$global.probjectManagerProfileImage}`"></el-avatar>
          {{ scope.row.probjectManagerNameZh || scope.row.probjectManagerNameEn }}
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[3]')">
        <template slot-scope="scope">
          <template v-if="scope.row && scope.row.itemLabelList">
              <el-tag
                class="member-project__tag" effect="dark" type="primary" disable-transitions
                v-for="(item,index) in scope.row.itemLabelList.slice(0,10)"
                :key="index"
              >{{ item.labelNameEn }}</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="day" :label="$t('memberInfo.projectTable[4]')" sortable></el-table-column>
      <el-table-column prop="addTimeStr" :label="$t('memberInfo.projectTable[5]')" sortable></el-table-column>
      <el-table-column :label="$t('memberInfo.projectTable[6]')">
        <template slot-scope="scope">
          <span class="member-project__delete" @click="onDelete(scope.row, scope.$index)">{{ $t("memberInfo.btn.shiftOutProject") }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center; margin-top: 20px;"
      :background="true"
      layout="prev, pager, next"
      :total="page.total"
      :current-page="page.pageNum"
      :current-change="getProject"
    ></el-pagination>

    <!-- 重新分配项目经理 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('changeAdministrator.title')"
      :visible.sync="handOverAdministratorDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%">
      <el-scrollbar>
        <AddAdministrator @getManager="getManager" :oldAdminstrator="currentProjectManger" :params="{type: 'changeProjectManger'}" @addProjectAdministrator="handOverAdministratorDialogVisible=false;addMemberDialogVisible=true;" operate="handOver"></AddAdministrator>
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
      tableData: [],
      handOverAdministratorDialogVisible: false,
      addMemberDialogVisible: false,
      userId: this.$route.params.id,
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      currentProjectManger: {}
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
       *  将成员移出项目
       */
      onDelete(item, index) {
        if (item.probjectManager == this.userId) {
          // 将管理员移除这个项目
          this.currentProjectManger = {
            itemId: item.itemId,
            userNameEn: item.probjectManagerNameEn,
            userNameZh: item.probjectManagerNameZh,
            userCountryEn: item.probjectManagerCountryEn,
            userCountryZh: item.probjectManagerCountryZh,
            userProfileImage: item.probjectManagerProfileImage
          }
          this.onShiftOutProjectAdministrator(item);
          return false;
        }
        // 将普通成员移除
        this.$confirm(`<i style="font-size: 35px; color: #E50054;" class="el-icon-question"></i><br/>${this.$t("memberInfo.memberShiftOutTip.content[0]")}`, this.$t("memberInfo.memberShiftOutTip.title"), {
            confirmButtonText: this.$t("memberInfo.memberShiftOutTip.btn[0]"),
            cancelButtonText: this.$t("memberInfo.memberShiftOutTip.btn[1]"),
            center: true,
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
            confirmButtonClass: "iworku-confirm-button",
            cancelButtonClass: "iworku-confirm-cancel-button",
        }).then(() => {
            // 确定移除
            this.$http.post('/user/info/check/data', {
              userId: this.userId,
              itemId: item.itemId
            }).then(res => {
              // 成员在当前项目中没有正在跟进的目标公司时才能直接删除
              if (res.iworkuCode == 200 && res.datas > 0) {
                this.onConfirmShiftOutProject(item);
              } else if (res.iworkuCode == 200 && res.datas <= 0) {
                // 移除成员
                this.$http.post('/user/item/user/rel/remove', {
                  userId: this.userId,
                  itemId: item.itemId
                }).then(res => {
                  if (res.iworkuCode == 200) {
                    this.tableData.splice(index, 1);
                    this.$imessage({
                      type: "success",
                      content: this.$t("public.tips.success")
                    });
                  }
                });
              }
            });
        }).catch(action => {});
      },
      /**
       *  成员有跟进项目，确定删除
       */
      onConfirmShiftOutProject(item) {
        // 确定删除 正在跟进当中的
        this.$confirm(`<i style="font-size: 35px; color: #E50054;" class="el-icon-question"></i><br/>${this.$t("memberInfo.memberShiftOutTip.content[1]")}<br/>${this.$t("memberInfo.memberShiftOutTip.content[2]")}`, this.$t("memberInfo.memberShiftOutTip.title"), {
            confirmButtonText: this.$t("memberInfo.memberShiftOutTip.btn[2]"),
            cancelButtonText: this.$t("memberInfo.memberShiftOutTip.btn[3]"),
            center: true,
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
            confirmButtonClass: "iworku-confirm-button",
            cancelButtonClass: "iworku-confirm-cancel-button",
        }).then(() => {
          // 移交任务操作 
          // this.onShiftOutProjectAdministrator(item);
        }).catch(action => {
          // 移入公海操作
          if (action == 'cancel') {
            
          }
        });
      },
      /**
       *  如果当前用户是管理员在跟进
       */
      onShiftOutProjectAdministrator(item) {
        // 确定删除  项目经理
        this.$alert(`<i style="font-size: 35px; color: #E50054;" class="el-icon-question"></i><br/>${this.$t("memberInfo.memberShiftOutTip.content[1]")}<br/>${this.$t("memberInfo.memberShiftOutTip.content[3]")}`, this.$t("memberInfo.memberShiftOutTip.title"), {
            confirmButtonText: this.$t("memberInfo.memberShiftOutTip.btn[2]"),
            center: true,
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true
        }).then(() => {
            // 分配页面 弹窗
            this.handOverAdministratorDialogVisible = true;
        });
      },
      /**
       *  获取分配到的管理员信息
       */
      getManager(data) {
        if (!data || !data.id) {
          return false;
        }
        this.$http.post('/user/item/user/rel/project/manager/save', {
          itemId: this.currentProjectManger.itemId,
          userId: data.id
        }).then(res => {
          this.$imessage({
            type: "success",
            content: this.$t("public.tips.success")
          });
          this.handOverAdministratorDialogVisible = false;
          this.currentProjectManger = {};
          this.getProject();
        });
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
