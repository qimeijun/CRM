<template>
  <section class="member-project">
    <el-table
      class="member-project__table"
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="date" label="ID" sortable width="180"></el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[0]')"></el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[1]')" sortable></el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[2]')"></el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[3]')"></el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.projectTable[4]')" sortable></el-table-column>
      <el-table-column prop="address" :label="$t('memberInfo.projectTable[5]')" sortable></el-table-column>
      <el-table-column :label="$t('memberInfo.projectTable[6]')">
          <span class="member-project__delete" @click="onDelete">{{ $t("memberInfo.btn.shiftOutProject") }}</span>
      </el-table-column>
    </el-table>
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
      /**
       *  移出项目
       */
      onDelete() {
        this.$confirm(`<i style="font-size: 35px;" class="el-icon-question"></i><br/>${this.$t("memberInfo.memberShiftOutTip.content[0]")}`, this.$t("memberInfo.memberShiftOutTip.title"), {
            confirmButtonText: this.$t("memberInfo.memberShiftOutTip.btn[1]"),
            cancelButtonText: this.$t("memberInfo.memberShiftOutTip.btn[0]"),
            center: true,
            dangerouslyUseHTMLString: true
        }).then(() => {
            // 取消移出
            this.$message({
              type: "success",
              message: "取消删除"
            });
        }).catch(() => {
            // 确定删除 正在跟进当中的
            this.$alert(`<i style="font-size: 35px;" class="el-icon-question"></i><br/>${this.$t("memberInfo.memberShiftOutTip.content[1]")}<br/>${this.$t("memberInfo.memberShiftOutTip.content[2]")}`, this.$t("memberInfo.memberShiftOutTip.title"), {
                confirmButtonText: this.$t("memberInfo.memberShiftOutTip.btn[2]"),
                center: true,
                dangerouslyUseHTMLString: true
            }).then(() => {});

            // 确定删除  项目经理
            // this.$alert(`<i style="font-size: 35px;" class="el-icon-question"></i><br/>${this.$t("memberInfo.memberShiftOutTip.content[1]")}<br/>${this.$t("memberInfo.memberShiftOutTip.content[3]")}`, this.$t("memberInfo.memberShiftOutTip.title"), {
            //     confirmButtonText: this.$t("memberInfo.memberShiftOutTip.btn[2]"),
            //     center: true,
            //     dangerouslyUseHTMLString: true
            // }).then(() => {
            //     console.log("====================");
            // });
        });
      }
  }
};
</script>
<style lang="scss" scoped>
.member-project {
    margin-top: 10px ;
    &__delete {
        cursor: pointer;
    }
}
</style>
