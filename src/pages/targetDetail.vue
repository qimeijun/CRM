<template>
  <section class="target-details">
    <div class="target-details__top">
      <PageHeader url="/project/detail/private"></PageHeader>
      <div class="target-details__top-name">{{$t("target.title")}}</div>
    </div>
    <div class="target-details__content">
      <div class="target-details__menu">
        <ul>
          <li
            v-for="(item, index) in menuList"
            :key="index"
            :class="activeMenu == item.value ? 'target-details__menu-active' : ''"
            @click.capture="onChangeMenu(item)"
          >
            <router-link :to="`/target/detail/${item.route}`">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
      <el-scrollbar style="height: calc(100vh - 2.5rem);">
        <el-row :gutter="10">
          <el-col :span="activeMenu!=='information'&&activeMenu!=='product'?24:16">
            <router-view></router-view>
          </el-col>
          <el-col v-if="activeMenu==='information'||activeMenu==='product'" :span="8">
            <!-- <Tag></Tag>
            <Member></Member>-->
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </section>
</template>
<script>
import PageHeader from "@/components/lib/PageHeader.vue";
export default {
  data() {
    return {
      activeMenu: "target_information",
      menuList: [
        {
          name: this.$t("target.menu[0]"),
          value: "target_information",
          route: "info"
        },
        {
          name: this.$t("target.menu[1]"),
          value: "target_probe",
          route: "probe"
        },
        {
          name: this.$t("target.menu[2]"),
          value: "target_diary",
          route: "diary"
        },
        {
          name: this.$t("target.menu[3]"),
          value: "target_loca",
          route: "loca"
        }
      ]
    };
  },
  created() {
    this.activeMenu = this.$route.name;
  },
  components: {
    PageHeader
  },
  methods: {
    /**
     *  切换菜单
     */
    onChangeMenu(item) {
      this.activeMenu = item.value;
      this.$router.push({ path: `/target/detail/${item.route}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.target-details {
  margin: 20px;
  &__top {
    display: flex;
    align-items: center;
    &-name {
      font-size: 24px;
      margin-left: 0.2rem;
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

