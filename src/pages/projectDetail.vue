<template>
<!-- 项目详情 -->
  <section class="project-details">
    <div class="project-details__top">
      <PageHeader url="/projectmanage"></PageHeader>
      <div class="project-details__top-name">{{$t("projectInfo.title")}}</div>
      <template v-if="activeMenu!=='diary'">
        <template v-if="activeMenu!=='product'">
          <el-input class="project-details__top-seek" placeholder="请输入内容" v-model="seek">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="onClickSeek()"></i>
          </el-input>
          <el-button type="primary" @click="addShow=true">{{$t("projectInfo.importTarget.add")}}</el-button>
          <el-button
            type="primary"
            @click="importShow=true"
          >{{$t("projectInfo.importTarget.import")}}</el-button>
        </template>

        <el-button class="project-details__top-endbtn">{{$t("projectInfo.endProject")}}</el-button>
      </template>
    </div>
    <div class="project-details__content">
      <div class="project-details__menu">
        <ul>
          <li
            v-for="(item, index) in menuList"
            :key="index"
            :class="activeMenu == item.value ? 'project-details__menu-active' : ''"
            @click.capture="onChangeMenu(item)"
          >
            <router-link :to="`/project/detail/${item.route}?itemid=${itemid}`">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
      <el-scrollbar style="height: calc(100vh - 2.5rem);">
        <el-row :gutter="10">
          <el-col :span="activeMenu!=='information'&&activeMenu!=='product'?24:16">
            <router-view></router-view>
          </el-col>
          <el-col v-if="activeMenu==='information'||activeMenu==='product'" :span="8">
            <Tag></Tag>
            <Member></Member>
          </el-col>
        </el-row>
      </el-scrollbar>
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
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <AddTarget @close="addShow=false"></AddTarget>
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
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <ImportTarget @close="importShow=false"></ImportTarget>
      </el-scrollbar>
    </el-dialog>
    <!-- 导入目标公司 end-->
  </section>
</template>
<script>
import PageHeader from "@/components/lib/PageHeader.vue";
import Tag from "@/components/project/Tag.vue";
import Member from "@/components/project/Member.vue";
import AddTarget from "@/components/project/AddTarget.vue";
import ImportTarget from "@/components/project/ImportTarget.vue";
export default {
  data() {
    return {
      activeMenu: "information",
      menuList: [
        // 资料
        {
          name: this.$t("projectInfo.menu[0]"),
          value: "information",
          route: "info"
        },
        // 产品
        {
          name: this.$t("projectInfo.menu[1]"),
          value: "product",
          route: "product"
        },
        // 项目公海
        {
          name: this.$t("projectInfo.menu[2]"),
          value: "commonality",
          route: "commonality"
        },
        // 私海
        {
          name: this.$t("projectInfo.menu[3]"),
          value: "private",
          route: "private"
        },
        // 日志
        {
          name: this.$t("projectInfo.menu[4]"),
          value: "diary",
          route: "diary"
        }
      ],
      seek: "",
      addShow: false,
      importShow: false
    };
  },
  created() {
    this.activeMenu = this.$route.name;
  },
  computed: {
    itemid(){
      return this.$route.query.itemid
    }
  },
  components: {
    PageHeader,
    Tag,
    Member,
    AddTarget,
    ImportTarget
  },
  methods: {
    /**
     *  切换菜单
     */
    onChangeMenu(item) {
      this.activeMenu = item.value;
      this.$router.push({ path: `/project/detail/${item.route}?itemid=${this.itemid}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.project-details {
  margin: 20px;
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-name {
      font-size: 24px;
      margin-left: 0.2rem;
      flex-grow: 2;
    }
    &-seek {
      width: 313px;
      margin-right: 0.1rem;
    }
    &-endbtn {
      color: $--default-color;
    }
  }
  &__content {
    // width: 1062px;
    // margin: 0 auto;
  }
  &__menu {
    margin-top: 20px;
    margin-bottom: 10px;
    ul {
      display: flex;
      border-radius: $--default-border-radius;
      background-color: $--default-white;
    }
    li {
      padding: 20px;
      font-size: 16px;
      text-align: center;
    }
    &-active::after {
      content: "";
      display: block;
      margin-top: 5px;
      height: 4px;
      width: 100%;
      border-radius: $--default-border-radius;
      background-color: $--default-color;
      transition: 1s 1s height ease;
    }
  }
}
</style>

