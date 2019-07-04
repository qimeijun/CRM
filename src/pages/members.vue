<template>
    <!-- 成员管理 -->
    <section class="member">
        <!-- iworku-table -->
        <div class="">
            <el-table
                class="el-table--expend"
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                default-expand-all
                :indent="0"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
                <el-table-column
                label="操作"
                width="180px">
                <Operate>
                    <ul>
                        <li><router-link to="/">查看详情</router-link></li>
                        <li><router-link to="/second">移入公海</router-link></li>
                        <li>移交</li>
                    </ul>
                </Operate>
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>
<script>
import Operate from "@/components/lib/Operate.vue"
export default {
    components: {
        Operate
    },
    data() {
      return {
        tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 6,
              date: '2016-05-01',
              name: '王小虎 扩展',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 5,
              date: '2016-05-01',
              name: '王小虎  扩展',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎 扩展',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎  扩展',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }]
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>
.member {
    margin: 50px;
}
</style>
