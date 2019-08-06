<template>
  <!-- 所在项目 -->
  <section class="highseas-loca">
    <div class="highseas-loca__top">
      <PageHeader url="/highseas"></PageHeader>
      <div class="highseas-loca__top-name">所在项目</div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" :show-header="true">
        <el-table-column fixed prop="id" :label="$t('target.loca.tableHeader[0]')" width="50"></el-table-column>
        <el-table-column prop="itemName" :label="$t('target.loca.tableHeader[1]')" min-width="100"></el-table-column>
        <el-table-column :prop="$lang==$global.lang.en?'statusNameEn':'statusNameZh'" :label="$t('target.loca.tableHeader[2]')" width="200"></el-table-column>
        <el-table-column :prop="$lang==$global.lang.en?'userNameEn':'userNameZh'" :label="$t('target.loca.tableHeader[3]')" width="200">
          <template slot-scope="scope">
            <p>
              <el-avatar
                class="table_img"
                size="medium"
                :src="`${$global.avatarURI}${scope.row.userProfileImage}`"
              ></el-avatar>
              <span>{{$lang==$global.lang.en?scope.row.userNameEn:scope.row.userNameZh}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="itemLabelList" :label="$t('target.loca.tableHeader[4]')" max-width="200">
          <template slot-scope="scope">
            <el-tag
              class="table_tag"
              v-for="(item,index) in scope.row.itemLabelList.slice(0,10)"
              :key="'tag'+index"
              size="medium"
            >{{$lang==$global.lang.en?item.labelNameEn:item.labelNameZh }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="day" :label="$t('target.loca.tableHeader[5]')" width="120"></el-table-column>
        <el-table-column prop="itemAddTimeStr" :label="$t('target.loca.tableHeader[6]')" width="120">
          <template slot-scope="scope">
          <p>
            {{scope.row.itemAddTimeStr.split(" ")[0]}}
          </p>
          </template>
        </el-table-column>
        <el-table-column :label="$t('target.loca.tableHeader[7]')" width="60">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li>
                  <router-link :to="`/target/detail/info/${scope.row.targetCompanyId}/${scope.row.itemId}`">{{$t("target.loca.view")}}</router-link>
                </li>
              </ul>
            </Operate>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script>
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    PageHeader: () => import("@/components/lib/PageHeader.vue")
  },
  data() {
    return {
      tableData: []
    };
  },
  computed: {
      targetName(){
          return this.$route.params.targetName;
      }
  },
  created() {
      this.getLoca()
  },
  methods: {
      getLoca(){
          this.$http.post("/target/company/admin/item/withpaginglist",{
              companyName:this.targetName
          }).then(res=>{
              if(res.iworkuCode==200){
                 this.tableData=res.datas;
                 console.log("所在",res)
              }
          })
      }
  },
};
</script>
<style lang="scss" scoped>
.table_img {
  vertical-align: middle;
  margin-right: 10px;
}
.highseas-loca{
margin:20px;
}
.highseas-loca__top{
   display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}
.highseas-loca__top-name{
     font-size: 24px;
      margin-left: 0.2rem;
      flex-grow: 2;
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
  margin: 4px;
  border-radius: 20px;
  background-color: #8d43ff;
  color: white;
}
</style>