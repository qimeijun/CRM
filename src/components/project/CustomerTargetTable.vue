<template>
  <section class="customer-table">
    <div style="position:fixed; top: 1rem; right: .2rem; display:flex;">
      <!-- 分类 start -->
      <el-select
        filterable
        clearable
        class="table-seek"
        v-model="targetType"
        :placeholder="$t('target.placeholder.type')"
        @change="getTargetList(1)"
      >
        <el-option
          v-for="item in targetTypeList"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 分类 end -->
      <!-- 标签 start -->
      <el-cascader
        filterable
        clearable
        class="table-seek"
        v-model="tag"
        :show-all-levels="false"
        :props="props"
        @change="getTargetList(1)"
      ></el-cascader>
      <!-- 标签 end -->
      <el-input
        class="table-seek"
        :placeholder="$t('target.placeholder.seek')"
        v-model="seek"
        @keyup.enter.native="getTargetList( 1)"
        @click="getTargetList(1)"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="getTargetList(1)"></i>
      </el-input>
       <el-button
        type="primary"
        @click="addShow=true"
      >{{$t("projectInfo.importTarget.add")}}</el-button>
      <el-button
        type="primary"
        @click="importShow=true"
      >{{$t("projectInfo.importTarget.import")}}</el-button>
    </div>
    <div id="customer-table">
      <el-table ref="multipleTable" @cell-click="onClickName" :cell-class-name="onTableClass" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column
          prop="targetCompanyName"
          :label="$t('projectInfo.commonality.tableHeader[0]')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="grade"
          :label="$t('projectInfo.commonality.tableHeader[2]')" 
          width="200"
           sortable
        >
          <template slot-scope="scope">
            <el-rate :value="scope.row.grade-0" disabled :colors="['#E50054','#E50054','#E50054']"></el-rate>
            <p>{{ scope.row.gradeName }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTimeStr"
          :label="$t('projectInfo.commonality.tableHeader[3]')"
          width="120"
          sortable
        >
          <template slot-scope="scope">
            <p>{{scope.row.updateTimeStr?scope.row.updateTimeStr.split(' ')[0]:''}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          :label="$t('projectInfo.commonality.tableHeader[4]')"
          width="150"
          sortable
        >
        <template slot-scope="scope">
         <p>{{ scope.row.statusName }}</p>
        </template></el-table-column>
        <el-table-column
          prop="addTimeStr"
          :label="$t('projectInfo.commonality.tableHeader[5]')"
          width="120"
          sortable
        >
          <template slot-scope="scope">
            <p>{{scope.row.addTimeStr?scope.row.addTimeStr.split(' ')[0]:''}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="division"
          :label="$t('projectInfo.commonality.tableHeader[6]')"
          width="140"
          sortable
        ></el-table-column>
        <el-table-column :label="$t('projectInfo.commonality.tableHeader[7]')" width="60">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li>
                  <router-link
                    :to="`/target/detail/info/${scope.row.id}/${scope.row.itemId}`"
                  >{{$t("project.view")}}</router-link>
                </li>
              </ul>
            </Operate>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align:center;margin:10px 0;"
        background
        layout="prev, pager, next,sizes"
        :total="total"
        :page-sizes="[10, 20,30, 40]"
        :page-size.sync="size"
        :current-page.sync="currentPage"
        @size-change="getTargetList(1)"
        @current-change="getTargetList(currentPage)"
      ></el-pagination>
    </div>

    <!-- 新增目标公司 start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('projectInfo.importTarget.add')"
      :visible.sync="addShow"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <AddTarget @close="addShow=false;getTargetList(1);"></AddTarget>
      </el-scrollbar>
    </el-dialog>
    <!-- 新增目标公司 end -->
    <!-- 导入目标公司 start-->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('projectInfo.importTarget.import')"
      :visible.sync="importShow"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <ImportTarget
          :itemid="itemid"
          @close="importShow=false"
          @getList="getTargetList(1)"
        ></ImportTarget>
      </el-scrollbar>
    </el-dialog>
    <!-- 导入目标公司 end-->
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import { getTargetType } from "@/plugins/configuration.js";
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    AddTarget: () => import("@/components/project/AddTarget.vue"),
    ImportTarget: () => import("@/components/project/ImportTarget.vue")
  },
  data() {
    return {
      size: 10,
      currentPage: 1,
      total: 0,
      seek: "",
      tag: "",
      targetType: "",
      targetTypeList: [],
      tableData: [],
      props: {
        lazy: true,
        lazyLoad: (node, resolve) => {
          if (node.level == 0) {
            // 获取项目标签分组
            this.$http
              .post("/target/label/group/withoutpaginglist", {
                groupStatus: 1,
                regionId: this.$store.getters['ipublic/regionId']
              })
              .then(res => {
                if (res.iworkuCode == 200) {
                  let taglist = res.datas.map(o => {
                    return {
                      value: o.id,
                      label:o.groupNameEn
                    };
                  });
                  resolve(taglist);
                }
              });
          } else {
            // 获取项目各组标签
            this.$http
              .post(`/target/label/withoutpaginglist`, {
                labelGroupId: node.value,
                regionId: this.$store.getters['ipublic/regionId']
              })
              .then(res => {
                if (res.iworkuCode == 200) {
                  let taglist = res.datas.map(o => {
                    return {
                      value: o.id,
                      label: o.labelNameEn,
                      leaf: true
                    };
                  });
                  resolve(taglist);
                }
              });
          }
        }
      },
      addShow: false,
      importShow: false
    };
  },
  computed: {
    itemid() {
      return this.$route.params.itemid;
    },
    ...mapGetters("ipublic", ["userInfo"])
  },
  async created() {
    // 获取公司类型
    this.targetTypeList = await getTargetType(this);
    this.getTargetList(1);
  },
  methods: {
    getTargetList(page) {
      this.$http
        .post("/target/company/all/withpaginglist", {
          id: this.itemid,
          keyWord: this.seek,
          labelId: this.tag[1],
          clientType: this.targetType,
          pageNum: page,
          pageSize: this.size
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.tableData = res.datas;
            this.total = res.total;
            this.currentPage = page;
          }
        });
    },
    // 点击名称进行跳转
    onClickName(row, column, cell, event) {
      if (column.property == 'targetCompanyName') {
        this.$router.push({ path: `/target/detail/info/${row.id}/${row.itemId}` });
      }
    },
    // 给公司名称添加样式，表示可以点击
    onTableClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        return "table-name"
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.customer-table {
  .table-seek {
    width: 313px;
    margin-right: 0.1rem;
  }
}
</style>
<style lang="scss">
  .table-name {
    cursor: pointer;
    // color: blue;
  }
</style>