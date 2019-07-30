<template>
<!-- 项目私海 -->
  <section class="project-detail-private">
     <div style="position:fixed; top: 1rem; right: .2rem; display:flex;">
      <el-input class="private-seek" placeholder="请输入内容" v-model="seek" @keyup.enter.native="getPrivate(itemid, 1)">
        <i
          slot="suffix"
          class="el-input__icon el-icon-search"
          @click="getPrivate(itemid, 1)"
        ></i>
      </el-input>
      <el-button type="primary" @click="addShow=true">{{$t("projectInfo.importTarget.add")}}</el-button>
      <el-button type="primary" @click="importShow=true">{{$t("projectInfo.importTarget.import")}}</el-button>
      <!-- 结束项目 -->
      <el-button
      v-show="itemStatus!=2"
        class="private-endbtn"
        @click="onDeleteMember(itemid)"
      >{{$t("projectInfo.endProject")}}</el-button>
      <!-- 重启项目 -->
      <el-button v-show="itemStatus==2" class="private-endbtn" @click="onRestartMember(itemid)">重启项目</el-button>
    </div>
    <div class="private_top">
      <!-- 分类 start -->
      <el-select class="top_select" v-model="targetType" placeholder="请选择" @change="getPrivate(itemid, 1)">
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
        class="top_select"
        v-model="tag"
        :show-all-levels="false"
        :props="props"
        @change="getPrivate(itemid, 1)"
      ></el-cascader>
      <!-- 标签 end -->
      <el-button class="top_button" @click="onCancel()">{{$t("project.intoSea")}}</el-button>
      <el-button type="primary" @click="changeAdministratorDialogVisible=true">{{$t("project.transfer")}}</el-button>
    </div>
    <div class="private_table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column prop="name" :label="$t('projectInfo.commonality.tableHeader[0]')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rate" :label="$t('projectInfo.commonality.tableHeader[1]')" width="150">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rate" disabled :colors="['#E50054','#E50054','#E50054']"></el-rate>
            <p>重点跟进客户</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('projectInfo.commonality.tableHeader[2]')" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('projectInfo.commonality.tableHeader[3]')" width="120"></el-table-column>
        <el-table-column prop="date" :label="$t('projectInfo.commonality.tableHeader[4]')" width="120"></el-table-column>
        <el-table-column prop="name" :label="$t('projectInfo.commonality.tableHeader[5]')" width="120"></el-table-column>
        <el-table-column :label="$t('projectInfo.commonality.tableHeader[6]')" width="60">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li>
                  <router-link :to="`/target/detail?targetid=${scope.row.id}`">{{$t("project.view")}}</router-link>
                </li>
                <li class="table_operation" @click="onCancel()">{{$t("project.intoSea")}}</li>
                <li class="table_operation" @click="changeAdministratorDialogVisible=true">{{$t("project.transfer")}}</li>
              </ul>
            </Operate>
          </template>
        </el-table-column>
      </el-table>
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
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <ChangeAdministrator  operate="handOver"></ChangeAdministrator>
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
      seek: "",
      itemStatus:1,
      changeAdministratorDialogVisible:false,
      addShow: false,
      importShow: false
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
    this.getPrivate(this.itemid, 1);
    this.getItemStatus(this.itemid);
  },
  methods: {
    // 移入公海
    onCancel() {
      this.$msgbox({
        title: "提示",
        message:
          "<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>目标公司正在跟进中，您确定要移入公海吗？</p>",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 取消删除
          this.$message({
            type: "success",
            message: "取消移入公海"
          });
        })
        .catch(() => {
          // 确定删除
          this.$message({
            type: "info",
            message: "确定移入公海"
          });
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
    // 获取私海列表
        getPrivate(id, page) {
      this.$http
        .post("/target/company/withpaginglist", {
          id: id,
          type: 2,
          pageNum: page,
          clientType: this.tag[1],
          labelId: this.targetType,
          keyWord: this.seek
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            console.log("项目私海", res);
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
      handleSelectionChange(){
        
      }
  }
};
</script>
<style lang="scss" scoped>
.private-seek {
  width: 313px;
  margin-right: 0.1rem;
}
.private-endbtn{
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