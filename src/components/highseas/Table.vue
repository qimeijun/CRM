<template>
  <div>
   <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="name" :label="$t('highseas.table.target')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rate" :label="$t('highseas.table.importance')" width="170">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rate" disabled :colors="['#E50054','#E50054','#E50054']"></el-rate>
            <p>重点跟进客户</p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('highseas.table.updatedate')" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('highseas.table.projectNum')" width="120"></el-table-column>
        <el-table-column prop="date" :label="$t('highseas.table.whenCreated')" width="120"></el-table-column>
        <el-table-column prop="order" :label="$t('highseas.table.orderNum')" width="120"></el-table-column>
        <el-table-column :label="$t('highseas.table.operate')" width="80">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li>
                  <router-link to="/target/detail">{{$t("highseas.table.details")}}</router-link>
                </li>
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
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4,
          order:1
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4,
          order:1
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4,
          order:1
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4,
          order:1
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4,
          order:1
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4,
          order:1
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 4,
          order:1
        }
      ],
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