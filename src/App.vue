<template>
  <div id="crm">
    <!-- 菜单 -->
    <el-menu
      class="menu"
      :style="isCollapse?'':'padding-left: 0.23rem;'"
      active-background-color="#ffffff"
      text-color="#FFFFFF"
      :collapse="isCollapse"
      collapse-transition="true"
      :router="true"
    >
      <div
        class="logo"
      >
        <img src="@/assets/logo.png" fit="contain" />
      </div>
      <el-menu-item index="1" route="/workbench">
        <i class="el-icon-s-home"></i>
        <span slot="title">工作台</span>
      </el-menu-item>
      <el-menu-item index="2" route="/projectmanage">
        <i class="el-icon-share"></i>
        <span slot="title">项目管理</span>
      </el-menu-item>
      <el-menu-item index="3" route="/membermanage">
        <i class="el-icon-s-custom"></i>
        <span slot="title">成员管理</span>
      </el-menu-item>
      <el-menu-item index="4" route="/tagmanage">
        <i class="el-icon-s-flag"></i>
        <span slot="title">标签管理</span>
      </el-menu-item>
      <el-button
        type="text"
        class="button"
        :icon="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"
        @click="isCollapse=!isCollapse"
      ></el-button>
    </el-menu>
   
    <div style="width:100%;">
      <Header></Header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "crm",
  components: {
    Header
  },
  data() {
    return {
      isCollapse: true
    };
  },
  mounted() {
    console.log(this.$session);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
  .menu:not(.el-menu--collapse) {
    width: 2rem;
    min-height: 4rem;
  }
.menu {
  height: calc(100vh);
  background: linear-gradient(0deg, #48296c 20%, #3c447f 80%);
  .logo {
    text-align: center;
    padding: 0.23rem 0;
    height: .25rem;
    margin-left:.06rem;
    margin-right:.06rem;
    img {
      max-height: 0.25rem;
      max-width: 100%;
    }
  }
  i {
    color: white;
    font-size: 0.2rem;
  }
  .button {
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
.menu .el-menu-item {
  font-size: 0.14rem;
  padding-right: .4rem;
  border-top-left-radius: 0.08rem;
  border-bottom-left-radius: 0.08rem;
}
.menu .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.menu .el-menu-item.is-active {
  background-color: white;
  color: #4937ea;
}
</style>
