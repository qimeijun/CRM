<template>
  <section class="member-details">
    <div class="member-details__top">
      <PageHeader></PageHeader>
      <div class="member-details__top-name">zhangsan</div>
    </div>
    <div class="member-details__menu">
      <ul>
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :class="activeMenu == item.value ? 'member-details__menu-active' : ''"
          @click="onChangeMenu(item)"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </section>
</template>
<script>
import PageHeader from "@/components/lib/PageHeader.vue";
export default {
  data() {
    return {
      activeMenu: "information",
      menuList: [
        {
          name: this.$t("memberInfo.menu[0]"),
          value: "information",
          route: "info"
        },
        {
          name: this.$t("memberInfo.menu[1]"),
          value: "team",
          route: "team"
        },
        {
          name: this.$t("memberInfo.menu[2]"),
          value: "project",
          route: "project"
        },
        {
          name: this.$t("memberInfo.menu[3]"),
          value: "private",
          route: "private"
        },
        {
          name: this.$t("memberInfo.menu[4]"),
          value: "diary",
          route: "diary"
        }
      ]
    };
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
      this.$router.push({ path: `/member/detail/${item.route}`});
    }
  }
};
</script>
<style lang="scss" scoped>
.member-details {
  margin: 20px;
  &__top {
    display: flex;
    align-items: center;
    &-name {
      font-size: 24px;
      margin-left: 0.2rem;
    }
  }
  &__menu {
    margin-top: 20px;
    ul {
      display: flex;
      border-radius: $--default-border-radius;
      background-color: $--default-white;
    }
    li {
      cursor: pointer;
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

