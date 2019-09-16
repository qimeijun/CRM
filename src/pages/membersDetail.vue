<template>
  <section class="member-details">
    <div class="member-details__top">
        <PageHeader :url="`/member/${$store.getters['ipublic/regionId']}`"></PageHeader>
        <div class="member-details__top-name">{{ memberInfo && memberInfo.username }}</div>
    </div>
    <div class="member-details__menu">
      <ul>
        
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :style="(memberInfo.userRole == $global.userRole.regionalManager && item.value == 'member-team') ? `display: none` : ''"
          :class="activeMenu == item.value ? 'member-details__menu-active' : ''"
          @click="onChangeMenu(item)"
        >
        <el-badge v-if="item.value == 'member-diary' && unReadDiary > 0" :value="unReadDiary" class="member-details__badge">
          <span>{{ item.name }}</span>
        </el-badge>
        <span v-else>
          <span>{{ item.name }}</span>
        </span>
        </li>
      </ul>
    </div>
    <el-scrollbar style="height: calc(100vh - 2.37rem);">
      <router-view></router-view>
    </el-scrollbar>
  </section>
</template>
<script>
import PageHeader from "@/components/lib/PageHeader.vue"
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeMenu: "member-info"
    };
  },
  components: {
    PageHeader
  },
  computed: {
    ...mapGetters("members", ["memberInfo", "unReadDiary"]),
    userInfo() {
      return this.$store.getters['ipublic/userInfo']
    },
    menuList() {
      return [
        {
          name: this.$t("memberInfo.menu[0]"),
          value: "member-info",
          route: "info"
        },
        {
          name: this.$t("memberInfo.menu[1]"),
          value: "member-team",
          route: "team"
        },
        {
          name: this.$t("memberInfo.menu[2]"),
          value: "member-project",
          route: "project"
        },
        {
          name: this.$t("memberInfo.menu[3]"),
          value: "member-private",
          route: "private"
        },
        {
          name: this.$t("memberInfo.menu[4]"),
          value: "member-diary",
          route: "diary"
        }
      ]
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
      if (this.activeMenu == 'member-team') {
        this.$router.push({ path: `/member/detail/${item.route}/${this.memberInfo.teamId}`});
      } else {
        this.$router.push({ path: `/member/detail/${item.route}/${this.memberInfo.userId}`});
      }
    }
  },
  watch: {
    '$route'(to, from){
      this.activeMenu = to.name;
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
    // justify-content: space-between;
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

<style lang="scss">
.member-details__badge {
  .is-fixed {
    top: 5px !important;
    right: -2px !important;
  }
}
</style>