<template>
  <section class="project-detail-private">
    <div class="private_top">
      <!-- 分类 start -->
      <el-select class="top_select" v-model="value" placeholder="请选择">
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
        @change="onClickTag"
      ></el-cascader>
      <!-- 标签 end -->
      <el-button type="primary">移入公海</el-button>
      <el-button class="top_button" @click="onCancel()">移交</el-button>
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
        <el-table-column prop="name" label="目标公司" show-overflow-tooltip></el-table-column>
        <el-table-column prop="rate" label="重要程度" width="150">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rate" disabled :colors="['#E50054','#E50054','#E50054']"></el-rate>
            <p>重点跟进客户</p>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="状态" width="120"></el-table-column>
        <el-table-column prop="date" label="创建时间" width="120"></el-table-column>
        <el-table-column prop="name" label="资料完整度" width="120"></el-table-column>
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li>
                  <router-link to="/target/detail">查看详情</router-link>
                </li>
                <li class="table_operation" @click="onDeleteMember(scope.row.id)">移入公海</li>
                <li class="table_operation" @click="onDeleteMember(scope.row.id)">移交</li>
              </ul>
            </Operate>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script>
import Operate from "@/components/lib/Operate.vue";
export default {
  components: {
    Operate
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
          rate: "4"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: "4"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: "4"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: "4"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: "4"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: "4"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: "4"
        }
      ],
      multipleSelection: [],
      tag: "",
      value: ""
    };
  },
  methods: {
    onCancel() {
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
.table_operation{
  cursor: pointer;
}
</style>