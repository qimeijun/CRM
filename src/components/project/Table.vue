<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" :label="$t('project.tableHeader[0]')" width="50"></el-table-column>
      <el-table-column prop="name" :label="$t('project.tableHeader[1]')" min-width="100"></el-table-column>
      <el-table-column prop="province" :label="$t('project.tableHeader[2]')" width="100"></el-table-column>
      <el-table-column prop="city" :label="$t('project.tableHeader[3]')" width="120">
        <template slot-scope="scope">
          <p>
            <el-avatar
              class="table_img"
              size="medium"
              :src="'https://vodcn.iworku.com/'+scope.row.img"
            ></el-avatar>
            <!-- <img  :src="'https://vodcn.iworku.com/'+scope.row.img" alt /> -->
            <span>{{scope.row.city}}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="address" :label="$t('project.tableHeader[4]')" max-width="200">
        <template slot-scope="scope">
          <el-tag
            class="table_tag"
            v-for="(item,index) in scope.row.address"
            :key="index"
            size="medium"
          >{{item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="zip" :label="$t('project.tableHeader[5]')" width="120"></el-table-column>
      <el-table-column prop="date" :label="$t('project.tableHeader[6]')" width="120"></el-table-column>
      <el-table-column :label="$t('project.tableHeader[7]')" width="60">
        <template slot-scope="scope">
          <Operate>
            <ul>
              <li>
                <router-link to="/project/detail">{{$t("project.view")}}</router-link>
              </li>
              <li class="table_delete" @click="onDeleteMember(scope.row.id)">{{$t("projectInfo.endProject")}}</li>
            </ul>
          </Operate>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align:center;"
      background
      layout="prev, pager, next,sizes"
      :total="1000"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
    ></el-pagination>
  </div>
</template>
<script>
import Operate from "@/components/lib/Operate.vue";
export default {
  components: {
    Operate
  },
  data() {
    return {
      tableData: [
        {
          id: "1",
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: ["标签1", "标签2", "标签3", "标签4"],
          zip: 200333,
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5"
        },
        {
          id: "2",
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: ["标签1", "标签2", "标签3", "标签4"],
          zip: 200333,
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5"
        },
        {
          id: "3",
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: ["标签1", "标签2", "标签3", "标签4"],
          zip: 200333,
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5"
        },
        {
          id: "4",
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: ["标签1", "标签2", "标签3", "标签4"],
          zip: 200333,
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5"
        }
      ]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    onDeleteMember() {
      this.$msgbox({
        title: "提示",
        message:
          "<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>您确定要结束此项目吗？</p>",
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        showCancelButton:true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 取消删除
          this.$message({
            type: "success",
            message: "取消删除"
          });
        })
        .catch(() => {
          // 确定删除
          this.$message({
            type: "info",
            message: "确定删除"
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
}
</style>