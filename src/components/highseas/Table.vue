<template>
  <section>
    <div style="position:fixed; top: 1rem; right: .2rem;">
      <el-input
        class="top_seek"
        :placeholder="$t('highseas.placeholder.seek')"
        v-model="seek"
        @keyup.enter.native="getHighseas(1)"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="getHighseas(1)"></i>
      </el-input>
    </div>
    <div class="highseas_filtration">
      <!-- 国家 start -->
      <el-select
        class="filtration_select"
        filterable
        clearable
        v-model="country"
        :placeholder="$t('highseas.placeholder.country')"
        @change="getHighseas(1)"
      >
        <el-option
          v-for="item in countryList"
          :key="item.id"
          :label="item.areaName"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 国家 end -->
      <!-- 分类 start -->
      <el-select
        filterable
        clearable
        class="filtration_select"
        v-model="targetType"
        :placeholder="$t('highseas.placeholder.sort')"
        @change="getHighseas(1)"
      >
        <el-option
          v-for="item in targetTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 分类 end -->
      <!-- 标签选择 start -->
      <el-cascader
        filterable
        clearable
        class="filtration_select"
        v-model="tag"
        :show-all-levels="false"
        :props="props"
        ref="selectTag"
        :placeholder="$t('highseas.placeholder.tag')"
        @change="getHighseas(1)"
      ></el-cascader>
      <!-- 标签选择 end -->
    </div>
    <div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
        :row-style="{'cursor': 'pointer'}"
        @row-click="onClick"
      >
        <el-table-column
          prop="targetCompanyName"
          :label="$t('highseas.table.target')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="count" :label="$t('highseas.table.projectNum')" width="150" sortable></el-table-column>
        <el-table-column prop="orderCount" :label="$t('highseas.table.orderNum')" width="150" sortable></el-table-column>
        <el-table-column :label="$t('highseas.table.operate')" width="80">
          <template slot-scope="scope">
            <Operate>
              <ul>
                <li>
                  <router-link
                    :to="`/highseas/loca/${scope.row.targetCompanyName}`"
                  >{{$t("highseas.table.details")}}</router-link>
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
        :total="total"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="size"
        :current-page.sync="page"
        @size-change="getHighseas(1)"
        @current-change="getHighseas(page)"
      ></el-pagination>
    </div>
  </section>
</template>
<script>
import { getTargetType, getCountry } from "@/plugins/configuration.js";
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue")
  },
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      size: 10,
      seek: "",
      country: "",
      targetType: "",
      tag: "",
      countryList: [],
      targetTypeList: [
      ]
    };
  },
  computed: {
    props: {
      get: function () {
        return {
          lazy: true
        }
      },
      set: function (newVal) {
        return newVal;
      }
    },
    keyword() {
      return this.$store.getters['ipublic/highSeasWord'] || "";
    }
  },
  async created() {
    this.targetTypeList = await getTargetType(this);
    this.countryList = await getCountry(this);
  },
  mounted() {
  },
  methods: {
    // 获取公海列表
    getHighseas(page) {
      let params = {
        pageNum: page,
        pageSize: this.size,
        keyWord: this.seek,
        regionId: this.$route.params.id
      };
      if (this.seek || this.tag || this.targetType || this.country) {
        this.$store.commit("ipublic/$_set_publicSearch", {
          seek: this.seek,
          tag: this.tag,
          type: this.targetType,
          country: this.country
        });
      }
      if (this.tag) {
        params.labelId = this.tag[1];
      }
      if (this.targetType) {
        params.clientType = this.targetType;
      }
      if (this.country) {
        params.country = this.country;
      }
      this.$http
        .post("/target/company/admin/withpaginglist", params)
        .then(res => {
          if (res.iworkuCode == 200) {
            this.tableData = res.datas;
            this.total = res.total;
            this.page = page;
          }
        });
    },
    getLableList() {
      this.props.lazyLoad = (node, resolve) => {
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
                      label: o.groupNameEn
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
                      label:o.labelNameEn,
                      leaf: true
                    }
                  });
                  resolve(taglist);
                }
              });
          }
        }
    },
    onClick(row) {
      this.$router.push({ path: `/highseas/loca/${row.targetCompanyName}` })
    }
  },
  watch: {
    "$route.params.id": {
      handler(newVal, oldVal) {
          let search = this.$store.getters['ipublic/publicSearch'];
          this.seek = search && search.seek;
          this.targetType = search && search.type;
          this.country = search && search.country;
          this.tag = search && search.tag;
          this.getHighseas(1);
          if (this && this.$refs && Object.keys(this.$refs).length > 0) {
            let dom = this.$refs['selectTag'].$refs['panel'];
            // 清空原来的数据
            dom.store = [];
            dom.checkedValue = null;
            dom.checkedNodePaths = [];
            dom.menus = [];
            dom.activePath = [];
            // 初始化store
            dom.initStore();
          }
          this.getLableList();
      },
      immediate: true
    },
  },
};
</script>

<style lang="scss" scoped>
.top_seek {
  width: 3.13rem;
  .el-icon-search{
    cursor: pointer;
  }
}
.highseas_filtration {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .filtration_select {
    width: 2.58rem;
    margin-right: 10px;
  }
}
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