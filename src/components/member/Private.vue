<template>
  <!-- 成员私海 -->
  <section class="member-private">
    <!-- 顶部搜索 start -->
    <div class="member-private__search" style="width: 20%; position: fixed; top: 1rem; right: .2rem;" >
      <el-input :placeholder="$t('member.placeholder.search')">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <!-- 顶部搜索 end -->
    <!-- 顶部筛选 start -->
    <div class="member-private__top">
      <el-select
        v-model="searchClassify"
        filterable
        placeholder="全部分类"
        style="margin-right: .2rem; width: 20%;"
      >
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-cascader
        :options="options"
        :show-all-levels="false"
        style="margin-right: .2rem; width: 20%;"
      ></el-cascader>
      <el-button @click="onShiftInPublic">{{ $t("memberInfo.btn.shiftIn") }}</el-button>
      <el-button type="primary" @click="onHandOver">{{ $t("memberInfo.btn.handOver") }}</el-button>
    </div>
    <!-- 顶部筛选 end -->
    <!-- 表格 start -->
    <el-table
      class="member-private__table"
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.priviteTable[0]')"></el-table-column>
      <el-table-column
        prop="name"
        :label="$t('memberInfo.priviteTable[1]')"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterImportance"
        filter-placement="bottom-end"
        style="text-align: center;"
      >
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.rate"
            disabled
            :colors="['#E50054', '#E50054', '#E50054']"
            score-template="{value}"
          ></el-rate>
          <div style="margin-top: 10px;">重点客户跟进</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.priviteTable[2]')"></el-table-column>
      <el-table-column
        prop="name"
        :label="$t('memberInfo.priviteTable[3]')"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      ></el-table-column>
      <el-table-column prop="name" :label="$t('memberInfo.priviteTable[4]')"></el-table-column>
      <el-table-column prop="address" :label="$t('memberInfo.priviteTable[5]')"></el-table-column>
      <el-table-column :label="$t('memberInfo.priviteTable[6]')">
        <Operate>
          <ul class="member-private__operate">
            <li>
              <router-link to>{{ $t("memberInfo.privateOperate")[0] }}</router-link>
            </li>
            <li @click="onShiftInPublic">{{ $t("memberInfo.privateOperate")[1] }}</li>
            <li @click="onHandOver">{{ $t("memberInfo.privateOperate")[2] }}</li>
          </ul>
        </Operate>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center; margin-top: 20px;"
      :background="true"
      layout="prev, pager, next"
      :total="1000"
    ></el-pagination>
    <!-- 表格 start -->

    <!-- 目标公司移交 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('selectRegionalManager.title')"
      :visible.sync="handOverManagerDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%"
    >
      <el-scrollbar>
        <HandOverAdministrator @getManager="getManager" :oldAdminstrator="{}" operate="handOver"></HandOverAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 目标公司移交 dialog end -->
  </section>
</template>
<script>
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    // 管理人移交
    HandOverAdministrator: () =>
      import("@/components/member/ChangeAdministrator.vue")
  },
  data() {
    return {
      searchClassify: "",
      searchTag: "",
      options2: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则"
            },
            {
              value: "daohang",
              label: "导航"
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic"
            },
            {
              value: "form",
              label: "Form"
            },
            {
              value: "data",
              label: "Data"
            },
            {
              value: "notice",
              label: "Notice"
            },
            {
              value: "navigation",
              label: "Navigation"
            },
            {
              value: "others",
              label: "Others"
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          rate: 5
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          rate: 4
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          rate: 3
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          rate: 2
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          rate: 1
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          rate: 0
        }
      ],
      handOverManagerDialogVisible: false
    };
  },
  methods: {
    /**
     *  重要程度的筛选
     */
    filterImportance(value, row) {
      return row.tag === value;
    },
    /**
     ** 状态筛选
     **/
    filterStatus(value, row) {
      return row.tag === value;
    },
    /**
     *  将目标公司移入公海
     */
    onShiftInPublic() {
      this.$confirm(
        `<i class="el-icon-question" style="color: #E50054; font-size: 48px;"></i><br/>${this.$t(
          "memberInfo.priviteShiftInTip.content[0]"
        )}`,
        this.$t("memberInfo.priviteShiftInTip.title"),
        {
          confirmButtonText: this.$t("memberInfo.priviteShiftInTip.btn[1]"),
          cancelButtonText: this.$t("memberInfo.priviteShiftInTip.btn[0]"),
          center: true,
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          // 取消移入
          this.$message({
            type: "success",
            message: "取消移入"
          });
        })
        .catch(() => {
          // 确定移入
        });
    },
    /**
     *  将目标公司移交给指定的人
     */
    onHandOver() {
      this.handOverManagerDialogVisible = true;
    },
    /**
     *  获取移交后的用户信息
     */
    getManager(data) {
      this.handOverManagerDialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.member-private {
  position: relative;
  &__top {
    margin-top: 10px;
  }
  &__table {
    margin-top: 20px;
  }
}
</style>

<style lang="scss">
.member-private {
  .el-rate__icon {
    font-size: 24px;
  }
  &__operate {
    li {
      cursor: pointer;
    }
  }
}
</style>
