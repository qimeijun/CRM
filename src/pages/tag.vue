<template>
  <section class="tag">
    <div class="tag__title">
      <h1 style="font-size: .2rem;">{{ $t("tag.title") }}</h1>
    </div>
    <div class="tag__menu">
      <ul>
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :class="activeMenu == item.value ? 'tag__menu-active' : ''"
          @click="onChangeMenu(item)"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <el-scrollbar style="height: calc(100vh - 2.1rem);">
      <router-view></router-view>
    </el-scrollbar>
    
  </section>
</template>
<script>
export default {
  data() {
    return {
      activeMenu: "tag-project"
    };
  },
  computed: {
    menuList() {
      return [
        {
          name: this.$t("tag.project"),
          value: "tag-project",
          route: "project"
        },
        {
          name: this.$t("tag.target"),
          value: "tag-target",
          route: "target"
        }
      ];
    }
  },
  created() {
      this.activeMenu = this.$route.name;
  },
  methods: {
    /**
     *  切换菜单
     */
    onChangeMenu(item) {
      this.activeMenu = item.value;
      this.$router.push({ path: `/tag/${item.route}/${this.$route.params.id}` });
    }
  },
  watch: {
      '$route'(to, from) {
          this.activeMenu = to.name;
      },
      "$route.params.id": {
        handler(newVal, oldVal) {
          newVal && this.$store.commit("ipublic/$_set_regionId", newVal);
        },
        immediate: true
      }
  }
};
</script>
<style lang="scss" scoped>
.tag {
  margin: 0.2rem;
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