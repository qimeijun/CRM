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
        class="project-details__top-endbtn"
        @click="onDeleteMember(itemid,2)"
      >{{$t("projectInfo.endProject")}}</el-button>
      <!-- 重启项目 -->
      <el-button class="project-details__top-endbtn" @click="onRestartMember(itemid,3)">重启项目</el-button>
    </div>
    <div class="private_top">
      <!-- 分类 start -->
      <el-select class="top_select" v-model="targetType" placeholder="请选择" @change="getPrivate(itemid, 1)">
        <el-option
          v-for="item in classifys"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 分类 end -->
      <!-- 标签 start -->
      <el-cascader
        class="top_select"
        v-model="tag"
        :options="taglist"
        :show-all-levels="false"
        :props="{ expandTrigger: 'hover' }"
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
                  <router-link to="/target/detail">{{$t("project.view")}}</router-link>
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
      classifys: [
        {
          value: "选项1",
          label: "分类1"
        },
        {
          value: "选项2",
          label: "分类2"
        },
        {
          value: "选项3",
          label: "分类3"
        },
        {
          value: "选项4",
          label: "分类4"
        },
        {
          value: "选项5",
          label: "分类5"
        }
      ],
      taglist: [
        {
          value: "zuyi",
          label: "组1",
          children: [
            {
              value: "biaoxian1",
              label: "标签1"
            },
            {
              value: "biaoxian2",
              label: "标签2"
            },
            {
              value: "biaoxian3",
              label: "标签3"
            }
          ]
        },
        {
          value: "zuer",
          label: "组2",
          children: [
            {
              value: "biaoxian1",
              label: "标签"
            },
            {
              value: "biaoxian2",
              label: "标签2"
            },
            {
              value: "biaoxian3",
              label: "标签3"
            }
          ]
        },
        {
          value: "zusan",
          label: "组3",
          children: [
            {
              value: "biaoxian1",
              label: "标签1"
            },
            {
              value: "biaoxian2",
              label: "标签2"
            },
            {
              value: "biaoxian3",
              label: "标签3"
            }
          ]
        }
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4
        }
      ],
      multipleSelection: [],
      tag: "",
      targetType: "",
      seek: "",
      changeAdministratorDialogVisible:false,
      addShow: false,
      importShow: false
    };
  },
   computed: {
    itemid() {
      return this.$route.query.itemid;
    }
  },
  async created() {
    // 获取公司类型
    this.targetTypeList = await getTargetType(this);
    this.getPrivate(this.itemid, 1);
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
              itemStatus: 3
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