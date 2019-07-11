<template>
  <section class="project-details">
    <div class="project-details__top">
      <PageHeader></PageHeader>
      <div class="project-details__top-name">zhangsan</div>
    </div>
    <div class="project-details__content">
      <div class="project-details__menu">
        <ul>
          <li
            v-for="(item, index) in menuList"
            :key="index"
            :class="activeMenu == item.value ? 'project-details__menu-active' : ''"
            @click="onChangeMenu(item)"
          >
            <router-link :to="`/project/detail/${item.route}`">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
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
          name: "资料",
          value: "information",
          route: "info"
        },
        {
          name: "产品",
          value: "product",
          route: "product"
        },
        {
          name: "公海客户",
          value: "commonality",
          route: "commonality"
        },
        {
          name: "成员私海",
          value: "private",
          route: "private"
        },
        {
          name: "工作日志",
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
    &-name {
      font-size: 24px;
      margin-left: 0.2rem;
    }
  }
  &__content{
    width: 1062px;
    margin: 0 auto;
  }
  &__menu {
    margin-top: 20px;
    margin-bottom:10px;
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

