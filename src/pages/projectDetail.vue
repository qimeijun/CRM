<template>
<!-- 项目详情 -->
  <section class="project-details">
    <div class="project-details__top">
      <PageHeader url="/projectmanage"></PageHeader>
      <div class="project-details__top-name">{{$t("projectInfo.title")}}</div>
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
            <router-link :to="`/project/detail/${item.route}?itemid=${itemid}&adminId=${adminId}`">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
      <el-scrollbar style="height: calc(100vh - 2.5rem);">
        <el-row :gutter="10">
          <el-col :span="activeMenu!=='information'&&activeMenu!=='product'?24:16">
            <router-view></router-view>
          </el-col>
          <el-col v-if="activeMenu==='information'||activeMenu==='product'" :span="8">
            <Tag type="project" :id="itemid"></Tag>
            <Member :id="adminId"></Member>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  
  </section>
</template>
<script>
import PageHeader from "@/components/lib/PageHeader.vue";
import Tag from "@/components/project/Tag.vue";
import Member from "@/components/project/Member.vue";
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
    };
  },
  created() {
    this.activeMenu = this.$route.name;
    console.log(this.activeMenu)
  },
  computed: {
    itemid(){
      return this.$route.query.itemid
    },
    adminId() {
      return this.$route.query.adminId;
    }
  },
  components: {
    PageHeader,
    Tag,
    Member
  },
  methods: {
    /**
     *  切换菜单
     */
    onChangeMenu(item) {
      this.activeMenu = item.value;
      this.$router.push({ path: `/project/detail/${item.route}?itemid=${this.itemid}&adminId=${this.adminId}` });
    },
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

