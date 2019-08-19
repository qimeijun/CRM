<template>
  <!-- 项目私海 -->
  <section class="project-detail-private">
    <div style="position:fixed; top: 1rem; right: .2rem; display:flex;">
      <el-input
        class="private-seek"
        :placeholder="$t('target.placeholder.seek')"
        v-model="seek"
        @keyup.enter.native="getPrivate(itemid, 1)"
        @change="getPrivate(itemid, 1)"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="getPrivate(itemid, 1)"></i>
      </el-input>
      <el-button
        v-show="itemStatus!=2"
        type="primary"
        @click="addShow=true"
      >{{$t("projectInfo.importTarget.add")}}</el-button>
      <el-button
        v-show="itemStatus!=2"
        type="primary"
        @click="importShow=true"
      >{{$t("projectInfo.importTarget.import")}}</el-button>
      <!-- 结束项目 -->
      <el-button
        v-show="itemStatus!=2&&userInfo.userRole!=$global.userRole.member"
        class="private-endbtn"
        @click="onDeleteMember(itemid)"
      >{{$t("projectInfo.endProject")}}</el-button>
      <!-- 重启项目 -->
      <el-button
        v-show="itemStatus==2&&userInfo.userRole!=$global.userRole.member"
        class="private-endbtn"
        @click="onRestartMember(itemid)"
      >{{$t("projectInfo.restartProject")}}</el-button>
    </div>
    <div class="private_top">
      <!-- 选择成员 start -->
      <el-select
        v-show="userInfo.userRole!=$global.userRole.member"
        filterable
        clearable
        class="top_select"
        v-model="member"
        @change="getPrivate(itemid, 1)"
      >
        <el-option
          v-for="item in memberList"
          :key="item.id"
          :label="item.userNameZh || item.userNameEn"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 选择成员 end -->
      <!-- 分类 start -->
      <el-select
        clearable
        class="top_select"
        v-model="targetType"
        :placeholder="$t('target.placeholder.type')"
        @change="getPrivate(itemid, 1)"
      >
        <el-option
          v-for="item in targetTypeList"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 分类 end -->
      <!-- 标签 start -->
      <el-cascader
        filterable
        clearable
        class="top_select"
        v-model="tag"
        :show-all-levels="false"
        :props="props"
        @change="getPrivate(itemid, 1)"
      ></el-cascader>
      <!-- 标签 end -->
    </div>
    <div class="private_table">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column
          prop="targetCompanyName"
          :label="$t('projectInfo.commonality.tableHeader[0]')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="grade"
          :label="$t('projectInfo.commonality.tableHeader[1]')"
          width="150"
          sortable
        >
          <template slot-scope="scope">
            <el-rate :value="scope.row.grade-0" disabled :colors="['#E50054','#E50054','#E50054']"></el-rate>
            <p>{{ scope.row.gradeName }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTimeStr"
          :label="$t('projectInfo.commonality.tableHeader[2]')"
          width="120"
          sortable
        >
          <template slot-scope="scope">
            <p>{{$global.localTime({time:scope.row.updateTimeStr,hour:false})}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          :label="$t('projectInfo.commonality.tableHeader[3]')"
          width="150"
          sortable
        >
          <template slot-scope="scope">
            <p>{{ scope.row.statusName }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="addTimeStr"
          :label="$t('projectInfo.commonality.tableHeader[4]')"
          width="120"
          sortable
        >
          <template slot-scope="scope">
            <p>{{$global.localTime({time:scope.row.addTimeStr,hour:false})}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="division"
          :label="$t('projectInfo.commonality.tableHeader[5]')"
          width="140"
          sortable
        ></el-table-column>
        <el-table-column :label="$t('projectInfo.commonality.tableHeader[6]')" width="60">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li @click="SetHistoryPath()">
                  <router-link
                    :to="`/target/detail/info/${scope.row.id}/${scope.row.itemId}`"
                  >{{$t("project.view")}}</router-link>
                </li>
                <!-- 移入公海 -->
                <li
                  v-show="itemStatus!=2&&(scope.row.targetCompanyUserInfo.userRole!=$global.userRole.regionalManager||(scope.row.targetCompanyUserInfo.userRole==$global.userRole.regionalManager&&scope.row.targetCompanyUserInfo.id==userInfo.id))"
                  class="table_operation"
                  @click="onCancel(scope.row, scope.$index)"
                >{{$t("project.intoSea")}}</li>
                <!-- 移交 -->
                <li
                  v-show="itemStatus!=2&&(scope.row.targetCompanyUserInfo.userRole!=$global.userRole.regionalManager||(scope.row.targetCompanyUserInfo.userRole==$global.userRole.regionalManager&&scope.row.targetCompanyUserInfo.id==userInfo.id))"
                  class="table_operation"
                  @click="onHandOver(scope.row)"
                >{{$t("project.transfer")}}</li>
              </ul>
            </Operate>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align:center;margin:10px 0;"
        background
        layout="prev, pager, next,sizes"
        :total="total"
        :page-sizes="[10, 20,30, 40]"
        :page-size.sync="size"
        :current-page.sync="currentPage"
        @size-change="getPrivate(itemid,1)"
        @current-change="getPrivate(itemid,currentPage)"
      ></el-pagination>
    </div>
    <!-- 移交管理员的dialog start-->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('selectRegionalManager.title')"
      :visible.sync="changeAdministratorDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <ChangeAdministrator
          @getManager="getManager"
          :oldAdminstrator="currentTarget.targetCompanyUserInfo"
          :params="{type: 'handOverMemberForProject', id: currentTarget.itemId}"
          operate="handOver"
        ></ChangeAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 移交管理员的dialog end-->
    <!-- 新增目标公司 start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('projectInfo.importTarget.add')"
      :visible.sync="addShow"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <AddTarget @close="addShow=false"></AddTarget>
      </el-scrollbar>
    </el-dialog>
    <!-- 新增目标公司 end -->
    <!-- 导入目标公司 start-->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('projectInfo.importTarget.import')"
      :visible.sync="importShow"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <ImportTarget :itemid="itemid" @close="importShow=false" @getList="getPrivate(itemid, 1)"></ImportTarget>
      </el-scrollbar>
    </el-dialog>
    <!-- 导入目标公司 end-->
  </section>
</template>
<script>
import session from '@/plugins/session.js'
import { mapGetters } from "vuex";
import { getTargetType } from "@/plugins/configuration.js";
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    ChangeAdministrator: () =>
      import("@/components/member/ChangeAdministrator.vue"),
    AddTarget: () => import("@/components/project/AddTarget.vue"),
    ImportTarget: () => import("@/components/project/ImportTarget.vue")
  },
  data() {
    return {
      total: 0,
      size: 10,
      currentPage: 1,
      targetTypeList: [],
      memberList: [],
      props: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          if (node.level == 0) {
            // 获取项目标签分组
            this.$http
              .post("/target/label/group/withoutpaginglist", {
                groupStatus: 1
              })
              .then(res => {
                if (res.iworkuCode == 200) {
                  let taglist = res.datas.map(o => {
                    return {
                      value: o.id,
                      label: o.groupNameZh
                    };
                  });
                  resolve(taglist);
                }
              });
          } else {
            // 获取项目各组标签
            this.$http
              .post(`/target/label/withoutpaginglist`, {
                labelGroupId: node.value
              })
              .then(res => {
                if (res.iworkuCode == 200) {
                  let taglist = res.datas.map(o => {
                    return {
                      value: o.id,
                      label: o.labelNameZh,
                      leaf: true
                    };
                  });
                  resolve(taglist);
                }
              });
          }
        }
      },
      tableData: [],
      multipleSelection: [],
      tag: "",
      targetType: "",
      member: "",
      seek: null,
      itemStatus: 2,
      changeAdministratorDialogVisible: false,
      addShow: false,
      importShow: false,
      currentTarget: {}
    };
  },
  computed: {
    itemid() {
      return this.$route.params.itemid;
    },
    adminId(){
      return this.$route.params.adminId;
    },
    ...mapGetters("ipublic", ["userInfo"])
  },
  async created() {
    this.member = this.userInfo.userRole==this.$global.userRole.superAdministrator?"":this.userInfo.id;
    this.targetTypeList =[ {nameEn: "ALL",nameZh: "全部",value: ""},...await getTargetType(this)];
    this.getPrivate(this.itemid, 1);
    this.getItemStatus(this.itemid);
    this.getMemberList(this.itemid);
  },
  methods: {
    // 移入公海
    onCancel(item, index) {
      this.$msgbox({
        title: this.$t("projectStatus.title"),
        message:
          `<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>${this.$t('targetStatus.intoSea')}</p>`,
        confirmButtonText:  this.$t("projectStatus.btn.determine"),
        cancelButtonText:  this.$t("projectStatus.btn.cancel"),
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 移入公海
          this.$http
            .post("/target/company/private/list/update", {
              idList: [item.id],
              type: 2
            })
            .then(res => {
              if (res.iworkuCode == 200) {
                this.tableData.splice(index, 1);
                this.$imessage({
                  content: this.$t("public.tips.success"),
                  type: "success"
                });
              }
            });
        })
        .catch(() => {
          // 取消移入公海
          this.$message({
            type: "info",
            message: this.$t("targetStatus.catch"),
          });
        });
    },
    // 结束项目
    onDeleteMember(id) {
      this.$msgbox({
        title: this.$t("projectStatus.title"),
        message:
          `<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>${this.$t('projectStatus.end.messageText')}</p>`,
        confirmButtonText: this.$t("projectStatus.btn.determine"),
        cancelButtonText: this.$t("projectStatus.btn.cancel"),
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          this.$http
            .post("/customer/item/update/status", {
              itemId: id,
              itemStatus: 2
            })
            .then(res => {
              this.getPrivate(this.itemid, 1);
              this.getItemStatus(this.itemid);
              this.$message({
                type: "success",
                message: this.$t("projectStatus.end.success"),
              });
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: this.$t("projectStatus.catch"),
          });
        });
    },
    // 重启项目
    onRestartMember(id) {
      this.$msgbox({
        title:this.$t("projectStatus.title"),
        message:
          `<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>${this.$t('projectStatus.restart.messageText')}</p>`,
        confirmButtonText:  this.$t("projectStatus.btn.determine"),
        cancelButtonText:  this.$t("projectStatus.btn.cancel"),
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          this.$http
            .post("/customer/item/update/status", {
              itemId: id,
              itemStatus: 1
            })
            .then(res => {
              this.getPrivate(this.itemid, 1);
              this.getItemStatus(this.itemid);
              this.$message({
                type: "success",
                message: this.$t("projectStatus.restart.success"),
              });
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: this.$t("projectStatus.catch"),
          });
        });
    },
    // 获取私海列表
    getPrivate(id, page) {
      let params = {
        id: id,
        type: 2,
        pageNum: page,
        pageSize: this.size,
        clientType: this.tag[1],
        labelId: this.targetType,
        keyWord: this.seek,
        memberId: this.member
      };
      this.$http.post("/target/company/withpaginglist", params).then(res => {
        if (res.iworkuCode == 200) {
          this.tableData = res.datas;
          this.total = res.total;
        }
      });
    },
    handleSelectionChange(list) {},
    // 获取项目状态
    getItemStatus(id) {
      this.$http.get(`/customer/item/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.itemStatus = res.datas.itemStatus;
        }
      });
    },
    onHandOver(params) {
      this.changeAdministratorDialogVisible = true;
      this.currentTarget = params;
    },
    getManager(data) {
      if (!data || !data.id) {
        return false;
      }
      this.$http
        .post("/target/company/private/transfer/update", {
          id: this.currentTarget.id,
          userId: data.id
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.changeAdministratorDialogVisible = false;
            this.getPrivate(this.itemid, 1);
            this.$imessage({
              content: this.$t("public.tips.success"),
              type: "success"
            });
          }
        });
    },
    // 根据项目ID查询项目成员
    getMemberList(id) {
      this.$http
        .post("/user/item/user/rel/withoutpaginglist", {
          itemId: id
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            if(this.userInfo.userRole==this.$global.userRole.regionalManager){
              this.memberList =res.datas.filter(o=>{
                return o.userRole!=this.$global.userRole.regionalManager
              })
            }else{
              this.memberList =[{id:"",userNameEn:"ALL",userNameZh:"所有人"},...res.datas] ;
            }
          }
        });
    },
  SetHistoryPath(){
      session.set("historyPath",`/project/detail/commonality/${this.itemid}/${this.adminId}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.private-seek {
  width: 313px;
  margin-right: 0.1rem;
}
.private-endbtn {
  color: $--default-color;
}
.private_top {
  display: flex;
  align-items: center;
  margin-bottom: 13px;
  .top_select {
    width: 258px;
    margin-right: 10px;
  }
  .top_button {
    color: $--default-color;
  }
}
.table_operation {
  cursor: pointer;
}
</style>