<template>
  <!-- 项目公海 -->
  <section class="project-detail-commonality">
    <div style="position:fixed; top: 1rem; right: .2rem; display:flex;">
      <el-input
        class="commonality-seek"
        placeholder="请输入内容"
        v-model="seek"
        @keyup.enter.native="getCommonality(itemid, 1)"
        @click="getCommonality(itemid, 1)"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="getCommonality(itemid, 1)"></i>
      </el-input>
      <el-button type="primary" @click="addShow=true">{{$t("projectInfo.importTarget.add")}}</el-button>
      <el-button type="primary" @click="importShow=true">{{$t("projectInfo.importTarget.import")}}</el-button>
      <!-- 结束项目 -->
      <el-button 
      v-show="itemStatus!=2"
        class="commonality-endbtn"
        @click="onDeleteMember(itemid)"
      >{{$t("projectInfo.endProject")}}</el-button>
      <!-- 重启项目 -->
      <el-button v-show="itemStatus==2" class="commonality-endbtn" @click="onRestartMember(itemid)">重启项目</el-button>
    </div>
    <div class="commonality_top">
      <!-- 分类 start -->
      <el-select
        filterable
        clearable
        class="top_select"
        v-model="targetType"
        placeholder="请选择"
        @change="getCommonality(itemid, 1)"
      >
        <el-option
          v-for="item in targetTypeList"
          :key="item.value"
          :label="$lang==$global.lang.en?item.nameEn:item.nameZh"
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
      <el-button type="primary" @click="allocationShow=true">{{$t("project.allot")}}</el-button>
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
          prop="status"
          :label="$t('projectInfo.commonality.tableHeader[1]')"
          width="200"
        >
          <template slot-scope="scope">
            <el-rate :value="scope.row.grade-0" disabled :colors="['#E50054','#E50054','#E50054']"></el-rate>
            <p>{{$lang==$global.lang.en?scope.row.gradeEn:scope.row.gradeZh}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTimeStr"
          :label="$t('projectInfo.commonality.tableHeader[2]')"
          width="120"
        >
          <template slot-scope="scope">
            <p>{{scope.row.updateTimeStr?scope.row.updateTimeStr.split(' ')[0]:''}}</p>
          </template>
        </el-table-column>
        <el-table-column
          :prop="$lang==$global.lang.en?'statusNameEn':'statusNameZh'"
          :label="$t('projectInfo.commonality.tableHeader[3]')"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="addTimeStr"
          :label="$t('projectInfo.commonality.tableHeader[4]')"
          width="120"
        >
          <template slot-scope="scope">
            <p>{{scope.row.addTimeStr?scope.row.addTimeStr.split(' ')[0]:''}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="division"
          :label="$t('projectInfo.commonality.tableHeader[5]')"
          width="120"
        ></el-table-column>
        <el-table-column :label="$t('projectInfo.commonality.tableHeader[6]')" width="60">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li>
                  <router-link
                    :to="`/target/detail/info/${scope.row.id}`"
                  >{{$t("project.view")}}</router-link>
                </li>
                <li class="table_operation" @click="allocationShow=true; currentTarget=[scope.row]">{{$t("project.allot")}}</li>
                <li
                  class="table_operation"
                  @click="onCancel(scope.row.id)"
                >{{$t("project.invalid")}}</li>
              </ul>
            </Operate>
          </template>
        </el-table-column>
      </el-table>
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
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <ChangeAdministrator operate="add" :params="{id: itemid, type: 'assignMemberForTarget'}" @getManager="onAssignMember"></ChangeAdministrator>
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
      width="30%"
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
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <ImportTarget @close="importShow=false"></ImportTarget>
      </el-scrollbar>
    </el-dialog>
    <!-- 导入目标公司 end-->
  </section>
</template>
<script>
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
                      label:
                        this.$lang == this.$global.lang.en
                          ? o.groupNameEn
                          : o.groupNameZh
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
                      label:
                        this.$lang == this.$global.lang.en
                          ? o.labelNameEn
                          : o.labelNameZh,
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
      itemStatus:1,
      allocationShow: false,
      addShow: false,
      importShow: false,
      currentTarget: []
    };
  },
  computed: {
    itemid() {
      return this.$route.params.itemid;
    }
  },
  async created() {
    // 获取公司类型
    this.targetTypeList = await getTargetType(this);
    this.getCommonality(this.itemid, 1);
    this.getItemStatus(this.itemid);
  },
  methods: {
    onCancel(id) {
      this.$msgbox({
        title: "提示",
        message:
          "<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>您确定要将选中的目标公司作废吗？</p>",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          this.$http
            .post("/target/company/status/update", {
              id: id,
              status: 4 //目标公司状态（ 1.待跟进 2跟进中 3.未跟进 4.作废）
            })
            .then(res => {
              if (res.iworkuCode == 200) {
                this.$message({
                  type: "success",
                  message: "已作废"
                });
                this.getCommonality(this.itemid, 1);
              }
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "已取消操作"
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
          clientType: this.targetType,
          labelId: this.tag[1],
          keyWord: `${this.seek}`
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            console.log("项目公海", res);
            this.tableData = res.datas;
          }
        });
    },
     // 获取项目状态
    getItemStatus(id) {
      this.$http.get(`/customer/item/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          console.log(res.datas);
          this.itemStatus = res.datas.itemStatus;
        }
      });
    },
    // 结束项目
    onDeleteMember(id) {
      this.$msgbox({
        title: "提示",
        message:
          "<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>您确定要结束此项目吗？</p>",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
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
            .then(res => {});
          this.$message({
            type: "success",
            message: "已结束项目"
          });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    // 重启项目
    onRestartMember(id) {
      this.$msgbox({
        title: "提示",
        message:
          "<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>您确定要重启此项目吗？</p>",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
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
            .then(res => {});
          this.$message({
            type: "success",
            message: "已重启项目"
          });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    handleSelectionChange(list){
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
      this.$http.post('/target/company/private/list/update', {
        idList: params,
        type: 1,
        userId: data.id
      }).then(res => {
        if (res.iworkuCode == 200) {
          this.allocationShow = false;
          this.$imessage({
            content: this.$t("public.tips.success"),
            type: "success"
          });
          this.currentTarget = [];
          this.getCommonality(this.itemid, 1);
        }
      })
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