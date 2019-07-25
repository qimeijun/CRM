<template>
  <!-- 项目列表 -->
  <section style="position: relative;">
    <div style="position:absolute; top: -.6rem; right: .2rem; display:flex;">
      <el-input
        class="top_seek"
        :placeholder="$t('project.placeholder.seek')"
        v-model="seek"
        @keyup.enter.native="onClickSeek"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="onClickSeek()"></i>
      </el-input>
      <!-- 标签选择 start -->
      <el-cascader
        class="top_select"
        v-model="tag"
        :show-all-levels="false"
        :props="props"
        @change="onClickTag"
        :placeholder="$t('project.placeholder.tag')"
      ></el-cascader>
      <!-- 标签选择 end -->

      <!-- 添加新项目按钮 start -->
      <AddProject></AddProject>
      <!-- 添加新项目按钮 end -->
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="itemNumber" :label="$t('project.tableHeader[0]')" width="50"></el-table-column>
        <el-table-column prop="itemName" :label="$t('project.tableHeader[1]')" min-width="100"></el-table-column>
        <el-table-column
          :prop="$lang==$global.lang.en?itemStatusEn:itemStatusZh"
          :label="$t('project.tableHeader[2]')"
          width="100"
        ></el-table-column>
        <el-table-column prop="probjectManager" :label="$t('project.tableHeader[3]')" width="140">
          <template slot-scope="scope">
            <p>
              <el-avatar
                class="table_img"
                size="medium"
                :src="'http://testfile.iworku.cn/'+scope.row.probjectManager"
              ></el-avatar>
              <!-- <img  :src="'https://vodcn.iworku.com/'+scope.row.img" alt /> -->
              <span>{{scope.row.probjectManagerNameZh}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="itemLabelList" :label="$t('project.tableHeader[4]')" max-width="200">
          <template slot-scope="scope">
            <el-tag
              class="table_tag"
              v-for="(item,index) in scope.row.itemLabelList"
              :key="index"
              size="medium"
            >{{$lang==$global.lang.en?item.labelNameEn:item.labelNameZh }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="zip" :label="$t('project.tableHeader[5]')" width="120"></el-table-column>
        <el-table-column prop="addTimeStr" :label="$t('project.tableHeader[6]')" width="120">
          <template slot-scope="scope">
            <p>{{scope.row.addTimeStr.split(' ')[0]}}</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('project.tableHeader[7]')" width="60">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li>
                  <!-- 查看详情 -->
                  <router-link
                    :to="`/project/detail?itemid=${scope.row.itemId}`"
                  >{{$t("project.view")}}</router-link>
                </li>
                <!-- 结束项目 -->
                <li
                  v-show="scope.row.itemStatus==2"
                  class="table_delete"
                  @click="onDeleteMember(scope.row.itemId,2)"
                >{{$t("projectInfo.endProject")}}</li>
                <!-- 重启项目 -->
                <li
                  v-show="scope.row.itemStatus==2"
                  class="table_delete"
                  @click="onDeleteMember(scope.row.itemId,3)"
                >重启项目</li>
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
        :page-sizes="[1, 2,10, 40]"
        :page-size.sync="size"
        :current-page.sync="currentPage"
        @size-change="getProject(1)"
        @current-change="getProject(currentPage)"
      ></el-pagination>
    </div>
  </section>
</template>
<script>
import { getItemStatus } from "@/plugins/configuration.js";
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    AddProject: () => import("@/components/project/addProject.vue")
  },
  data() {
    return {
      tag: "",
      seek: "",
      tableData: [],
      total: 0,
      size: 1,
      currentPage: 1,
      itemStatusList: [],
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
                      label:this.$lang==$global.lang.en?o.groupNameEn:o.groupNameZh
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
                      label: this.$lang==$global.lang.en?o.groupNameEn:o.labelNameZh,
                      leaf: true
                    };
                  });
                  resolve(taglist);
                }
              });
          }
        }
      }
    };
  },
  async created() {
    // 获取项目状态字典
    this.itemStatusList = await getItemStatus(this);
    console.log("项目状态", this.itemStatusList);
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
          pageSize: this.size
        })
        .then(res => {
          console.log("项目", res);
          if (res.iworkuCode == 200) {
            this.tableData = res.datas;
            this.total = res.total;
          }
        });
    },
    // 结束、重启项目
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
    // 标签change触发
    onClickTag(value) {
      this.getProject(1);
    },
    // 搜索触发
    onClickSeek() {
      this.getProject(1);
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