<template>
  <!-- 项目列表 -->
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="itemNumber" :label="$t('project.tableHeader[0]')" width="50"></el-table-column>
      <el-table-column prop="itemName" :label="$t('project.tableHeader[1]')" min-width="100"></el-table-column>
      <el-table-column prop="itemStatus" :label="$t('project.tableHeader[2]')" width="100"></el-table-column>
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
          >{{item.labelNameZh }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="zip" :label="$t('project.tableHeader[5]')" width="120"></el-table-column>
      <el-table-column prop="addTimeStr" :label="$t('project.tableHeader[6]')" width="120"></el-table-column>
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
              <!-- 结束/重启项目 -->
              <li
                class="table_delete"
                @click="onDeleteMember(scope.row.itemId)"
              >{{$t("projectInfo.endProject")}}</li>
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
</template>
<script>
import { getProjectListApi, updateProjectTypeApi } from "@/plugins/axios.js";
import Operate from "@/components/lib/Operate.vue";
export default {
  components: {
    Operate
  },
  data() {
    return {
      tableData: [],
      total: 0,
      size: 1,
      currentPage:1
    };
  },
  created() {
    this.getProject(1);
  },
  methods: {
    // 获取项目列表
    getProject(page) {
      getProjectListApi({ pageNum: page, pageSize: this.size }).then(res => {
        console.log('项目',res);
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
          updateProjectTypeApi({
            itemId: id,
            itemStatus: 2
          }).then(res => {});
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
    }
  }
};
</script>

<style lang="scss" scoped>
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
  border:0;
}
</style>