<template>
  <!-- 项目公海 -->
  <section class="project-detail-commonality">
    <div style="position:fixed; top: 1rem; right: .2rem; display:flex;">
      <el-input
        class="commonality-seek"
        :placeholder="$t('target.placeholder.seek')"
        v-model="seek"
        @keyup.enter.native="getCommonality(itemid, 1)"
        @change="getCommonality(itemid, 1)"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="getCommonality(itemid, 1)"></i>
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
        class="commonality-endbtn"
        @click="onDeleteMember(itemid)"
      >{{$t("projectInfo.endProject")}}</el-button>
      <!-- 重启项目 -->
      <el-button
        v-show="itemStatus==2&&userInfo.userRole!=$global.userRole.member"
        class="commonality-endbtn"
        @click="onRestartMember(itemid)"
      >{{$t("projectInfo.restartProject")}}</el-button>
    </div>
    <div class="commonality_top">
      <!-- 分类 start -->
      <el-select
        filterable
        clearable
        class="top_select"
        v-model="targetType"
        :placeholder="$t('target.placeholder.type')"
        @change="getCommonality(itemid, 1)"
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
        @change="getCommonality(itemid, 1)"
      ></el-cascader>
      <!-- 标签 end -->
      <el-button
        v-show="itemStatus!=2&&userInfo.userRole!=$global.userRole.member"
        type="primary"
        @click="allocationShow=true"
      >{{$t("project.allot")}}</el-button>
    </div>
    <div class="commonality_table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column
          prop="targetCompanyName"
          :label="$t('projectInfo.commonality.tableHeader[0]')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="grade"
          :label="$t('projectInfo.commonality.tableHeader[1]')"
          width="200"
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
          width="140"
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
            <p>{{scope.row.statusName}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="addTimeStr"
          :label="$t('projectInfo.commonality.tableHeader[4]')"
          width="140"
          sortable
        >
          <template slot-scope="scope">
            <p>{{$global.localTime({time:scope.row.addTimeStr,hour:false})}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="division"
          :label="$t('projectInfo.commonality.tableHeader[5]')"
          width="150"
          sortable
        ></el-table-column>
        <el-table-column :label="$t('projectInfo.commonality.tableHeader[6]')" width="80">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li class="table_operation" @click="SetHistoryPath(`/target/detail/info/${scope.row.id}/${scope.row.itemId}`)">
                 {{$t("project.view")}}
                </li>
                <li
                  v-show="itemStatus!=2&&userInfo.userRole!=$global.userRole.member&&allotType!=null&&scope.row.status!=4"
                  class="table_operation"
                  @click="allocationShow=true; currentTarget=[scope.row]"
                >{{$t("project.allot")}}</li>
                <li
                  v-show="itemStatus!=2&&allotType!=null&&scope.row.status!=4"
                  class="table_operation"
                  @click="onTransfer(scope.row.id)"
                >{{$t("project.Private")}}</li>
                <!-- 作废 -->
                <li
                  v-show="itemStatus!=2&&scope.row.status!=4"
                  class="table_operation"
                  @click="onCancel(scope.row.id,4)"
                >{{$t("project.invalid")}}</li>
                <!-- 激活 -->
                <li
                  v-show="itemStatus!=2&&scope.row.status==4"
                  class="table_operation"
                  @click="onCancel(scope.row.id,1)"
                >{{$t("project.activation")}}</li>
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
        @size-change="getCommonality(itemid,1)"
        @current-change="getCommonality(itemid,currentPage)"
      ></el-pagination>
    </div>
    <!-- 分配 start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('project.allot')"
      :visible.sync="allocationShow"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <ChangeAdministrator
          operate="add"
          :params="{id: itemid, type: 'assignMemberForTarget'}"
          @getManager="onAssignMember"
        ></ChangeAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 分配 end -->
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
        <AddTarget @close="addShow=false;getCommonality(itemid, 1);"></AddTarget>
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
        <ImportTarget
          :itemid="itemid"
          @close="importShow=false"
          @getList="getCommonality(itemid, 1)"
        ></ImportTarget>
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
                      label: o.groupNameEn
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
                      label: o.labelNameEn,
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
      seek: "",
      itemStatus: 1,
      allotType: null,
      allocationShow: false,
      addShow: false,
      importShow: false,
      currentTarget: []
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
    // 获取公司类型
    this.targetTypeList =[ {nameEn: "ALL",nameZh: "全部",value: ""},...await getTargetType(this)];
    this.getCommonality(this.itemid, 1);
    this.getItemStatus(this.itemid);
  },
  methods: {
    // 激活作废  type: 4作废  1激活
    onCancel(id, type) {
      let messageText;
      if (type == 4) {
        messageText =this.$t("targetStatus.Private.messageText");
      } else if (type == 1) {
        messageText = this.$t("targetStatus.invalid.messageText");
      }
      this.$msgbox({
        title: this.$t("targetStatus.title"),
        message: `<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>${messageText}</p>`,
        confirmButtonText: this.$t("targetStatus.btn.determine"),
        cancelButtonText: this.$t("targetStatus.btn.cancel"),
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          this.$http
            .post("/target/company/status/update", {
              id: id,
              status: type //目标公司状态（ 1.待跟进 2跟进中 3.未跟进 4.作废）
            })
            .then(res => {
              if (res.iworkuCode == 200) {
                this.$message({
                  type: "success",
                  message: this.$t("targetStatus.success")
                });
                this.getCommonality(this.itemid, 1);
              }
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: this.$t("targetStatus.catch")
          });
        });
    },
    // 获取项目公海列表
    getCommonality(id, page) {
      this.$http
        .post("/target/company/withpaginglist", {
          id: id,
          type: 1,
          pageNum: page,
          pageSize: this.size,
          clientType: this.targetType,
          labelId: this.tag[1],
          keyWord: `${this.seek}`
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.tableData = res.datas;
            this.total = res.total;
            this.currentPage = page;
          }
        });
    },
    // 获取项目状态
    getItemStatus(id) {
      this.$http.get(`/customer/item/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.itemStatus = res.datas.itemStatus;
          this.allotType = res.datas.probjectManager;
        }
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
              this.getCommonality(this.itemid, 1);
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
              this.getCommonality(this.itemid, 1);
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
    handleSelectionChange(list) {
      this.currentTarget = list;
    },
    // 给目标公司分配工作人员
    onAssignMember(data) {
      if (!data || !data.id) {
        return false;
      }
      let params = [];
      this.currentTarget.map(val => {
        params.push(val.id);
      });
      this.$http
        .post("/target/company/private/list/update", {
          idList: params,
          type: 1,
          userId: data.id
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.allocationShow = false;
            this.$imessage({
              content: this.$t("public.tips.success"),
              type: "success"
            });
            this.currentTarget = [];
            this.getCommonality(this.itemid, 1);
          }
        });
    },
    // 移入私海
    onTransfer(targetid) {
      this.$http
        .post("/target/company/private/update", {
          id: targetid,
          type: 1
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.$imessage({
              content: this.$t("public.tips.success"),
              type: "success"
            });
            this.getCommonality(this.itemid, 1);
          }
        });
    },
    SetHistoryPath(path){
      session.set("historyPath",`/project/detail/commonality/${this.itemid}/${this.adminId}`);
      this.$router.push({path});
    }
  }
};
</script>
<style lang="scss" scoped>
.commonality-seek {
  width: 313px;
  margin-right: 0.1rem;
}
.commonality-endbtn {
  color: $--default-color;
}
.el-icon-search {
  cursor: pointer;
}
.commonality_top {
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