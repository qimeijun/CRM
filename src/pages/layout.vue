<template>
  <section class="layout">
    <!-- 菜单 -->
    <el-menu
      v-if="userInfo.userRole!=$global.userRole.customer"
      class="iworku-menu"
      :style="isCollapse?'':'padding-left: 0.23rem;'"
      active-background-color="#ffffff"
      text-color="#FFFFFF"
      :collapse="isCollapse"
      :router="true"
      :default-active="path"
    >
      <div class="menu-logo" @click="$router.push({ path: '/' })">
        <img src="@/assets/logo.png" fit="contain" />
      </div>
      <el-menu-item index="/" route="/">
        <i class="iconfont">&#xe627;</i>
        <span slot="title">{{ $t("layout.workBench") }}</span>
      </el-menu-item>
      <el-menu-item index="/projectmanage" route="/projectmanage">
        <i class="iconfont">&#xe604;</i>
        <span slot="title">{{ $t("layout.project") }}</span>
      </el-menu-item>
      <!-- 
        功能：公海管理
        权限：
          1、超级管理员和区域经理可见
      -->
      <el-menu-item
        v-if="[$global.userRole.superAdministrator, $global.userRole.regionalManager].includes(userInfo.userRole)"
        index="/highseas"
        route="/highseas"
      >
        <i class="iconfont">&#xe600;</i>
        <span slot="title">{{ $t("layout.public") }}</span>
      </el-menu-item>
      <!-- 
        功能：成员管理
        权限：
          1、只有客户不可见
      -->
      <el-menu-item
        index="/member"
        route="/member"
      >
        <i class="iconfont">&#xe63f;</i>
        <span slot="title">{{ $t("layout.member") }}</span>
      </el-menu-item>
      <!-- 
        功能：标签管理
        权限：
          1、只有客户不可见
      -->
      <el-menu-item index="/tag" route="/tag">
        <i class="iconfont">&#xe61e;</i>
        <span slot="title">{{ $t("layout.tag") }}</span>
      </el-menu-item>
      <el-button
        type="text"
        class="menu-button"
        :icon="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
        @click="isCollapse=!isCollapse"
      ></el-button>
    </el-menu>
    <!-- 客户页面菜单 -->
    <el-menu
      v-else
      class="iworku-menu"
      :style="isCollapse?'':'padding-left: 0.23rem;'"
      active-background-color="#ffffff"
      text-color="#FFFFFF"
      :collapse="isCollapse"
      :router="true"
      :default-active="pathName"
    >
      <div class="menu-logo" @click="$router.push({ path: `/customer/info/${itemid}/${adminId}` })">
        <img src="@/assets/logo.png" fit="contain" />
      </div>
      <el-menu-item index="customer_information" :route="`/customer/info/${itemid}/${adminId}`">
        <i class="iconfont">&#xe627;</i>
        <span slot="title">{{ $t("layout.comapnyInfo") }}</span>
      </el-menu-item>
      <el-menu-item index="customer_product" :route="`/customer/product/${itemid}/${adminId}`">
        <i class="iconfont">&#xe641;</i>
        <span slot="title">{{ $t("layout.companyProduct") }}</span>
      </el-menu-item>
      <el-menu-item index="customer_target" :route="`/customer/target/${itemid}/${adminId}`">
        <i class="iconfont">&#xe620;</i>
        <span slot="title">{{ $t("layout.target") }}</span>
      </el-menu-item>
      <el-menu-item index="customer_diary" :route="`/customer/diary/${itemid}/${adminId}`">
        <i class="iconfont">&#xe610;</i>
        <span slot="title">{{ $t("layout.workDiary") }}</span>
      </el-menu-item>
      <el-button
        type="text"
        class="menu-button"
        :icon="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
        @click="isCollapse=!isCollapse"
      ></el-button>
    </el-menu>
    <div style="width:calc(100%);">
      <Header></Header>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import Header from "@/components/Header.vue";
import automaticLogin from "@/plugins/automaticLogin.js";
import { mapGetters } from "vuex";
export default {
  name: "crm",
  components: {
    Header
  },
  data() {
    return {
      isCollapse: true,
      itemid: "",
      adminId: ""
    };
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"]),
    path() {
      return this.$route.path;
    },
    pathName(){
      return this.$route.name;
    }
  },
  async created() {
    await automaticLogin(this);
    if (this.userInfo.userRole == this.$global.userRole.customer) {
      this.getProject();
    }
  },
  methods: {
    getProject() {
      this.$http.post("/customer/item/withpaginglist").then(res => {
        if (res.iworkuCode == 200) {
          this.itemid = res.datas[0].itemId;
          this.adminId = res.datas[0].probjectManager;
          this.$router.push({ path: `/customer/info/${this.itemid}/${this.adminId}` });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  width: 100%;
}
.iworku-menu:not(.el-menu--collapse) {
  width: 2rem;
  min-height: 4rem;
}
.iworku-menu {
  height: calc(100vh);
  background: linear-gradient(0deg, #48296c 20%, #3c447f 80%);
  .menu-logo {
    text-align: center;
    padding: 0.23rem 0;
    height: 0.25rem;
    margin-left: 0.06rem;
    margin-right: 0.06rem;
    cursor: pointer;
    img {
      max-height: 0.25rem;
      max-width: 100%;
    }
  }
  i {
    color: white;
    font-size: 0.2rem;
  }
  .menu-button {
    font-size: 0.2rem;
    width: 0.4rem;
    height: 0.4rem;
    color: white;
    position: absolute;
    border-radius: 0.2rem;
    line-height: 0.2rem;
    padding: 0;
    right: -0.2rem;
    top: 50%;
    background: linear-gradient(0deg, #48296c -1200%, #3c447f 1200%);
    z-index: 10000;
  }
}
</style>

<style>
#crm {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ebeaee;
  display: flex;
}
.iworku-menu .el-menu-item {
  font-size: 0.14rem;
  padding-right: 0.4rem;
  border-top-left-radius: 0.08rem;
  border-bottom-left-radius: 0.08rem;
}
.iworku-menu .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.iworku-menu .el-menu-item.is-active {
  background-color: white;
  color: #4937ea;
}
.iworku-menu .el-menu-item.is-active i {
  color: #4937ea;
}
</style>
