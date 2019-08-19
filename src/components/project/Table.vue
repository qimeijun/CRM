<template>
  <!-- 项目列表 -->
  <section style="position: relative;">
    <div style="position:absolute; top: -.6rem; right: .2rem; display:flex;">
      <el-input
        class="top_seek"
        :placeholder="$t('project.placeholder.seek')"
        v-model="seek"
        @keyup.enter.native="getProject(1);"
        @change="getProject(1);"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="getProject(1)"></i>
      </el-input>
      <!-- 标签选择 start -->
      <el-cascader
        filterable
        clearable
        class="top_select"
        v-model="tag"
        :show-all-levels="false"
        :props="props"
        @change="getProject(1);"
        :placeholder="$t('project.placeholder.tag')"
      ></el-cascader>
      <!-- 标签选择 end -->

      <!-- 添加新项目按钮 start -->
      <!-- 
            功能：添加新项目
            限制：成员不可添加 
      -->
      <AddProject
        v-show="userInfo.userRole!=$global.userRole.member&&userInfo.userRole!=$global.userRole.projectManager"
        @getList="getProject(1);"
      ></AddProject>
      <!-- 添加新项目按钮 end -->
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" @cell-click="goPath">
        <el-table-column  fixed prop="itemNumber" :label="$t('project.tableHeader[0]')" width="50"></el-table-column>
        <el-table-column class-name="column--cursor" prop="itemName" :label="$t('project.tableHeader[1]')" min-width="100"></el-table-column>
        <el-table-column
          prop="itemStatusName"
          :label="$t('project.tableHeader[2]')"
          width="100"
        ></el-table-column>
        <el-table-column prop="probjectManager" :label="$t('project.tableHeader[3]')" width="200">
          <template slot-scope="scope">
            <p v-if="scope.row.probjectManager!==null" class="column--cursor">
              <el-avatar
                class="table_img"
                size="medium"
              >
              <img v-if="scope.row.probjectManagerProfileImage" style="object-fit: cover;" :src="`${$global.avatarURI}${scope.row.probjectManagerProfileImage}`" >
              <span v-else>{{scope.row.probjectManagerNameZh.slice("")[0] || scope.row.probjectManagerNameEn.slice("")[0]}}</span>
              </el-avatar>
              <!-- <img  :src="'https://vodcn.iworku.com/'+scope.row.img" alt /> -->
              <span>{{scope.row.probjectManagerNameZh || scope.row.probjectManagerNameEn}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column class-name="column--cursor" prop="itemLabelList" :label="$t('project.tableHeader[4]')" max-width="200" >
          <template slot-scope="scope">
            <el-tag
              class="table_tag"
              v-for="(item,index) in scope.row.itemLabelList.slice(0,10)"
              :key="index"
              size="medium"
            >{{ item.labelNameEn }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="day" :label="$t('project.tableHeader[5]')" width="150" sortable></el-table-column>
        <el-table-column
          prop="addTimeStr"
          :label="$t('project.tableHeader[6]')"
          width="120"
          sortable
        >
          <template slot-scope="scope">
            <p>{{$global.localTime({time:scope.row.addTimeStr,hour:false})}}</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('project.tableHeader[7]')" width="90">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li>
                  <!-- 查看详情 -->
                  <router-link
                    :to="`/project/detail/info/${scope.row.itemId}/${scope.row.probjectManager}`"
                  >{{$t("project.view")}}</router-link>
                </li>
                <!-- 结束项目 -->
                <li
                  v-show="scope.row.itemStatus!=2&&userInfo.userRole!=$global.userRole.member"
                  class="table_delete"
                  @click="onDeleteMember(scope.row.itemId)"
                >{{$t("projectInfo.endProject")}}</li>
                <!-- 重启项目 -->
                <li
                  v-show="scope.row.itemStatus==2&&userInfo.userRole!=$global.userRole.member"
                  class="table_delete"
                  @click="onRestartMember(scope.row.itemId)"
                >{{$t("projectInfo.restartProject")}}</li>
                <li
                  v-show="scope.row.itemStatus!=2&&(userInfo.userRole==$global.userRole.regionalManager||userInfo.userRole==$global.userRole.superAdministrator)"
                  class="table_delete"
                  @click="allocationShow=true; allotProject=scope.row"
                >{{scope.row.probjectManager==null? $t("project.allot"):$t("project.redistribution")}}</li>
              </ul>
            </Operate>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align:center;"
        background
        layout="prev, pager, next,sizes"
        :total="total"
        :page-sizes="[10, 20,30, 40]"
        :page-size.sync="size"
        :current-page.sync="currentPage"
        @size-change="getProject(1)"
        @current-change="getProject(currentPage)"
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
          :params="{type: 'addProjectManager'}"
          @getManager="getManager"
        ></ChangeAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 分配 end -->
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import { getItemStatus } from "@/plugins/configuration.js";
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    AddProject: () => import("@/components/project/addProject.vue"),
    ChangeAdministrator: () =>
      import("@/components/member/ChangeAdministrator.vue")
  },
  data() {
    return {
      tag: "",
      seek: "",
      tableData: [],
      total: 0,
      size: 10,
      currentPage: 1,
      itemStatusList: [],
      allocationShow: false,
      props: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          if (node.level == 0) {
            // 获取项目标签分组
            this.$http
              .post("/customer/item/label/group/withoutpaginglist", {
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
              .post(`/customer/item/label/withoutpaginglist`, {
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
      allotProject: {}
    };
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"])
  },
  async created() {
    // 获取项目状态字典
    this.itemStatusList = await getItemStatus(this);
    this.getProject(1);
  },
  methods: {
    // 获取项目列表
    getProject(page) {
      this.$http
        .post("/customer/item/withpaginglist", {
          keyWord: this.seek,
          itemLabelId: this.tag[1],
          pageNum: page,
          pageSize: this.size,
          sortname:"item_number"
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.tableData = res.datas;
            this.total = res.total;
            this.currentPage=page;
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
              this.getProject(this.currentPage);
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
              this.getProject(this.currentPage);
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
    // 获取分配的管理员
    getManager(data) {
      if (!data.id || !this.allotProject.itemId) {
        return false;
      }
      this.$http
        .post("/user/item/user/rel/project/manager/save", {
          itemId: this.allotProject.itemId,
          userId: data.id
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.allocationShow = false;
            this.allotProject = {};
            this.getProject(this.currentPage);
            this.$imessage({
              content: this.$t("public.tips.success"),
              type: "success"
            });
          }
        });
    },
    goPath(row, column, cell, event){
      if(column.property=="itemName"||column.property=="itemLabelList"){
        this.$router.push({path:`/project/detail/info/${row.itemId}/${row.probjectManager}`});
      }else if(column.property=="probjectManager"&&row.probjectManager!=null){
         this.$router.push({path:`/member/detail/info/${row.probjectManager}`});
        
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.top_select {
  width: 2.38rem;
  margin: 0 10px;
  
}
.top_seek {
  width: 2.38rem;
}
.el-icon-search {
  cursor: pointer;
}
.table_img {
  vertical-align: middle;
  margin-right: 10px;
}
.el-icon-more {
  font-size: 20px;
  vertical-align: middle;
  transform: rotate(90deg);
  cursor: pointer;
}
.table_operation {
  line-height: 30px;
}
.table_delete {
  cursor: pointer;
}
.table_tag {
  margin: 4px;
  display: inline-block;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  border-radius: 20px;
  background-color: #8d43ff;
  color: white;
  border: 0;
}

</style>
<style>
  .column--cursor{
  cursor: pointer;
}
</style>