<template>
  <section class="iworku-highseas">
    <div class="highseas_top">
      <h2>{{$t("highseas.title")}}</h2>
      <el-input class="top_seek" :placeholder="$t('highseas.placeholder.seek')" v-model="seek">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="onClickSeek()"></i>
      </el-input>
    </div>
    <div class="highseas_filtration">
      <!-- 国家 start -->
      <el-select class="filtration_select" v-model="country" :placeholder="$t('highseas.placeholder.country')">
        <el-option
          v-for="item in countryList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 国家 end -->
      <!-- 分类 start -->
      <el-select class="filtration_select" v-model="type" :placeholder="$t('highseas.placeholder.sort')">
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 分类 end -->
      <!-- 标签 start-->
      <el-cascader
        class="filtration_select"
        v-model="tag"
        :options="taglist"
        :show-all-levels="false"
        :props="{ expandTrigger: 'hover' }"
        :placeholder="$t('highseas.placeholder.tag')"
        @change="onClickTag"
      ></el-cascader>
      <!-- 标签 end-->
    </div>
    <!-- 公海表格 -->
    <div>
      <Table></Table>
    </div>
  </section>
</template>
<script>
export default {
  components: {
    Table: () => import("@/components/highseas/Table.vue")
  },
  data() {
    return {
      seek: "",
      country: "",
      type: "",
      tag: "",
      countryList: [
        {
          value: "选项1",
          label: "国家"
        },
        {
          value: "选项2",
          label: "国家2"
        }
      ],
      typeList: [
        {
          value: "选项1",
          label: "分类"
        },
        {
          value: "选项2",
          label: "分类2"
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
      ]
    };
  },
  methods: {
    onClickSeek() {
      console.log(this.seek);
    },
    onClickTag() {}
  }
};
</script>
<style lang="scss" scoped>
.iworku-highseas {
  padding: 0.2rem;
}
.highseas_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    flex-grow: 2;
  }
  .top_seek {
    width: 3.13rem;
  }
}
.highseas_filtration{
    display: flex;
    align-items: center;
    margin-bottom:10px;
    .filtration_select{
        width:2.58rem;
        margin-right: 10px;
    }
}
</style>