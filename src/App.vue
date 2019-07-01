<template>
  <div id="crm">
    <el-row :gutter="0">
      <el-col :xs="1" :sm="3" :md="3" :lg="3" :xl="3">
        <el-menu class="menu"
          default-active="1-1"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1" route="/">首页</el-menu-item>
              <el-menu-item index="1-2" route="/second">第二页</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="23" :sm="21" :md="21" :lg="21" :xl="21">
        <Header></Header>
        <router-view></router-view>
      </el-col>
    </el-row>
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
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  height: calc(100vh);
}
</style>

<style>
#crm {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
