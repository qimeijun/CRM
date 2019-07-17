<template>
  <div>
    <el-table :data="tableData" style="width: 100%" :show-header="false">
      <el-table-column fixed prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="name" label="项目名称" min-width="100"></el-table-column>
      <el-table-column prop="province" label="状态" width="100"></el-table-column>
      <el-table-column prop="city" label="管理员" width="120">
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
      <el-table-column prop="address" label="标签" max-width="200">
        <template slot-scope="scope">
          <el-tag
            class="table_tag"
            v-for="(item,index) in scope.row.address"
            :key="index"
            size="medium"
          >{{item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="zip" label="进行天数" width="120"></el-table-column>
      <el-table-column prop="date" label="添加时间" width="120"></el-table-column>
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <Operate>
            <ul>
              <li>
                <router-link to="/project/detail">查看详情</router-link>
              </li>
            </ul>
          </Operate>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue")
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
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 20px;
    background-color: #8d43ff;
    color: white;
  
}
</style>