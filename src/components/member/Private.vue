<template>
  <!-- 成员私海 -->
  <section class="member-private">
    <!-- 顶部搜索 start -->
    <div class="member-private__search" style="width: 20%; position: fixed; top: 1rem; right: .2rem;" >
      <el-input v-model="keyword" :placeholder="$t('member.placeholder.search')">
        <i slot="suffix" @click="getTarget(); page.pageNum=1;" class="el-input__icon el-icon-search" style="cursor: pointer;"></i>
      </el-input>
    </div>
    <!-- 顶部搜索 end -->
    <!-- 顶部筛选 start -->
    <div class="member-private__top">
      <el-select
        v-model="searchStatus"
        filterable
        placeholder=""
        @change="getTarget(); page.pageNum=1;"
        style="margin-right: .2rem; width: 20%;"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 标签筛选 start -->
      <el-cascader
        v-model="searchTag"
        :props="labelList"
        :show-all-levels="false"
        placeholder=""
        @change="getTarget(); page.pageNum=1;"
        style="margin-right: .2rem; width: 20%;"
      ></el-cascader>
      <!-- 标签筛选 end -->
      <!-- 
        功能：批量移交
        权限：
          1、超级管理员
          2、区域经理
          3、项目经理
       -->
       <template v-if="((userRole == $global.userRole.member || userRole == $global.userRole.projectManager) && [$global.userRole.superAdministrator, $global.userRole.regionalManager, $global.userRole.projectManager].includes(userInfo.userRole))
                      || (userRole == $global.userRole.regionalManager && [$global.userRole.superAdministrator, $global.userRole.regionalManager].includes(userInfo.userRole))">
        <el-button @click="onShiftInPublic('list')">{{ $t("memberInfo.btn.shiftIn") }}</el-button>
       </template>
    </div>
    <!-- 顶部筛选 end -->
    <!-- 表格 start -->
    <el-table
      class="member-private__table"
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
      @selection-change="onHandleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="targetCompanyName" :label="$t('memberInfo.priviteTable.targetCompany')"></el-table-column>
      <el-table-column
        prop="name"
        :label="$t('memberInfo.priviteTable.importance')"
        :filters="filterImportanceList"
        :filter-method="filterImportance"
        filter-placement="bottom-end"
        style="text-align: center;"
      >
        <template slot-scope="scope">
          <el-rate
            v-if="scope.row.grade"
            :value="parseInt(scope.row.grade)"
            disabled
            :colors="['#E50054', '#E50054', '#E50054']"
            score-template="{value}"
          ></el-rate>
          <div style="margin-top: 10px;">
            <template v-if="scope.row.grade">
              {{ $t(`target.importanceStatus[${parseInt(scope.row.grade)}]`) }}
            </template>
            <template v-else>
              {{ $t(`target.importanceStatus[0]`) }}
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updateTimeStr" :label="$t('memberInfo.priviteTable.updateTime')" width="200"></el-table-column>
      <el-table-column
        prop="statusNameZh"
        :label="$t('memberInfo.priviteTable.status')"
        :filters="filterStatusList"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      ></el-table-column>
      <el-table-column prop="addTimeStr" :label="$t('memberInfo.priviteTable.createTime')"></el-table-column>
      <el-table-column prop="division" :label="$t('memberInfo.priviteTable.informationIntegrity')"></el-table-column>
      <el-table-column :label="$t('memberInfo.priviteTable.operate')" width="120">
        <template slot-scope="scope">
          <Operate>
            <ul class="member-private__operate">
              <li>
                <router-link :to="`/target/detail/info/${scope.row.id}/${scope.row.itemId}`">{{ $t("memberInfo.privateOperate")[0] }}</router-link>
              </li>
              <!-- 
                功能：移入公海
                权限：
                  1、超级管理员
                  2、区域经理
                  3、项目经理
               -->
               <li v-if="((userRole == $global.userRole.member || userRole == $global.userRole.projectManager) && [$global.userRole.superAdministrator, $global.userRole.regionalManager, $global.userRole.projectManager].includes(userInfo.userRole))
                      || (userRole == $global.userRole.regionalManager && [$global.userRole.superAdministrator, $global.userRole.regionalManager].includes(userInfo.userRole))" @click="onShiftInPublic('one',scope.row, scope.$index)">{{ $t("memberInfo.privateOperate")[1] }}</li>
               <!-- 
                功能：移交
                权限：
                  1、自己
                  2、超级管理员
                  3、区域经理
                  4、项目经理
               -->
               <template v-if="(id == userInfo.id) || ((userRole == $global.userRole.member || userRole == $global.userRole.projectManager) && [$global.userRole.superAdministrator, $global.userRole.regionalManager, $global.userRole.projectManager].includes(userInfo.userRole))
                      || (userRole == $global.userRole.regionalManager && [$global.userRole.superAdministrator].includes(userInfo.userRole))">
                 <li @click="onHandOver(scope.row)">{{ $t("memberInfo.privateOperate")[2] }}</li>
               </template>
            </ul>
          </Operate>
        </template>
        
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center; margin-top: 20px;"
      :background="true"
      layout="prev, pager, next"
      :total="page.total"
      :current-page="page.pageNum"
      :current-change="getTarget"
    ></el-pagination>
    <!-- 表格 start -->

    <!-- 目标公司移交 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('selectRegionalManager.title')"
      :visible.sync="handOverManagerDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-scrollbar>
        <HandOverAdministrator @getManager="getManager" :oldAdminstrator="currentUserInfo" :params="{id: currentTarget.itemId, type: 'handOverTargetByOther'}" operate="handOver"></HandOverAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 目标公司移交 dialog end -->
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import { getGrade, getTargetStatus } from "@/plugins/configuration.js"
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    // 管理人移交
    HandOverAdministrator: () =>
      import("@/components/member/ChangeAdministrator.vue")
  },
  data() {
    return {
      searchStatus: null,
      searchTag: null,
      keyword: null,
      tableData: [],
      handOverManagerDialogVisible: false,
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      selectTableList: [],
      currentUserInfo: {},
      currentTarget: {},
      filterImportanceList: [],
      filterStatusList: []
    };
  },
  computed: {
    ...mapGetters('ipublic', ['userInfo']),
    id() {
      return this.$route.params.id
    },
    labelList: {
      get: function () {
        return {
          lazy: true
        };
      },
      set: function (newVal) {
        return newVal;
      }
    },
    statusList: {
      get: function () {
        return [];
      },
      set: function (newVal) {
        return newVal;
      }
    },
    userRole() {
      return this.$store.getters["members/memberInfo"].userRole
    }
  },
  created() {
    this.getImportance();
    this.getStatus();
    this.getFilterByLabel();
    this.getTarget();
    this.getUserInfo();
  },
  methods: {
    /**
     *  获取数据
     */
    getTarget() {
      if (!this.id) {
        return false;
      }
      this.$http.post('/target/company/user/withpaginglist', {
        id: this.id,
        labelId: this.searchTag && this.searchTag.length > 1 && this.searchTag[1],
        keyWord: this.keyword,
        targetCompanyStatus:this.searchStatus,
        pageSize: this.page.pageSize,
        pageNum: this.page.pageNum
      }).then(res => {
        if (res.iworkuCode == 200) {
          this.tableData = res.datas;
          this.page.total = res.total;
        }
      });
    },
    /**
     *  获取标签的筛选条件
     */
    getFilterByLabel() {
      this.labelList.lazyLoad = (node, resolve) => {
        const { level } = node;
        let nodes = [];
        if (node.level == 1) {
          // 标签
          this.$http.post('/target/label/withoutpaginglist', {
            labelGroupId: node.value
          }).then(res => {
            if (res.iworkuCode = 200) {
              res.datas.map(val => {
                nodes.push({
                  value: val.id,
                  label: val.labelNameZh,
                  leaf: true
                });
              });
            }
            resolve(nodes);
          });
        } else {    
          // 分组  
          this.$http.post('/target/label/group/withoutpaginglist', {groupStatus: 1}).then(res => {
            if (res.iworkuCode == 200) {
              res.datas.map(val => {
                nodes.push({
                  value:val.id,
                  label:val.groupNameZh
                });
              });
              resolve(nodes);
            } else {
              resolve([])
            }
          });
        }
      }
    },
    getUserInfo() {
      if (!this.id) {
        return false;
      }
      this.$http.get(`/user/info/infobypk/${this.id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.currentUserInfo = res.datas;
        }
      });
    },
    /**
     *  重要程度的筛选
     */
    filterImportance(value, row) {
      return row.grade == value;
    },
    /**
     ** 状态筛选
     **/
    filterStatus(value, row) {
      return row.status === value;
    },
    /**
     *  将目标公司移入公海, 单个
     */
    onShiftInPublic(type, item, index) {
      this.$confirm(
        `<i class="el-icon-question" style="color: #E50054; font-size: 48px;"></i><br/>${this.$t(
          "memberInfo.priviteShiftInTip.content[0]"
        )}`,
        this.$t("memberInfo.priviteShiftInTip.title"),
        {
          confirmButtonText: this.$t("memberInfo.priviteShiftInTip.btn[0]"),
          cancelButtonText: this.$t("memberInfo.priviteShiftInTip.btn[1]"),
          center: true,
          dangerouslyUseHTMLString: true,
          confirmButtonClass: "iworku-confirm-button",
          cancelButtonClass: "iworku-confirm-cancel-button"
        }
      )
        .then(() => {
          let params = [];
          if (type == 'one') {
            params.push(item.id);
          } else if (type == 'list'){
            this.selectTableList.map(val => {
              params.push(val.id);
            });
          }
          this.onConfirmTargetToPublic(params);
        }).catch(() => {});
    },

    onConfirmTargetToPublic(ids) {
      if (ids.length == 0) {
        return false;
      }
      // 确定移入公海
      this.$http.post('/target/company/private/list/update', {
        idList: ids,
        type: 2
      }).then(res => {
        if (res.iworkuCode == 200) {
          this.getTarget();
          this.$message({
            type: "success",
            message: this.$t("public.tips.success")
          });
        }
      });
    },
    onHandleSelectionChange(selection) {
      this.selectTableList = selection;
    },
    /**
     *  将目标公司移交给指定的人
     */
    onHandOver(item) {
      this.handOverManagerDialogVisible = true;
      this.currentTarget = item;
    },
    /**
     *  获取移交后的用户信息
     */
    getManager(data) {
      if (!data || !data.id) {
        return false;
      }
      this.$http.post('/target/company/private/transfer/update', {
        id: this.currentTarget.id,
        userId: data.id
      }).then(res => {
        this.handOverManagerDialogVisible = false;
        if (res.iworkuCode == 200) {
          this.currentTarget = {};
          this.$imessage({
            type: "success",
            content: this.$t("public.tips.success")
          });
          // this.page.pageNum = 1;
          this.getTarget();
        }
      });
    },
    async getImportance() {
      let result = await getGrade(this);
      result.map(val => {
        this.filterImportanceList.push({
          text: this.$lang == this.$global.lang.en ? val.nameEn : val.nameZh,
          value: val.value
        })
      });
    },
    async getStatus() {
      let result = await getTargetStatus(this);
      result.map(val => {
        this.statusList.push({
          label: this.$lang == this.$global.lang.en ? val.nameEn : val.nameZh,
          value: val.value
        });
        this.filterStatusList.push({
          text: this.$lang == this.$global.lang.en ? val.nameEn : val.nameZh,
          value: val.value
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.member-private {
  position: relative;
  &__top {
    margin-top: 10px;
  }
  &__table {
    margin-top: 20px;
  }
}
</style>

<style lang="scss">
.member-private {
  .el-rate__icon {
    font-size: 24px;
  }
  &__operate {
    li {
      cursor: pointer;
    }
  }
}
</style>
