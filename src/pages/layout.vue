<template>
  <section class="layout">
    <!-- 菜单 -->
      <el-menu
      class="iworku-menu"
      :style="isCollapse?'':'padding-left: 0.23rem;'"
      active-background-color="#ffffff"
      text-color="#FFFFFF"
      :collapse="isCollapse"
      :router="true"
      :default-active="path"
    >
      <div class="menu-logo">
        <img src="@/assets/logo.png" fit="contain" />
      </div>
      <el-menu-item index="/" route="/">
        <!-- <i class="el-icon-s-home"></i> -->
        <i class="iconfont">&#xe627;</i>
        <span slot="title">工作台</span>
      </el-menu-item>
      <el-menu-item index="/projectmanage" route="/projectmanage">
        <i class="iconfont">&#xe604;</i>
        <span slot="title">项目管理</span>
      </el-menu-item>
      <el-menu-item index="/highseas" route="/highseas">
        <i class="iconfont">&#xe600;</i>
        <span slot="title">公海管理</span>
      </el-menu-item>
      <el-menu-item index="/member" route="/member">
        <i class="iconfont">&#xe63f;</i>
        <span slot="title">成员管理</span>
      </el-menu-item>
      <el-menu-item index="/tag" route="/tag">
        <i class="iconfont">&#xe61e;</i>
        <span slot="title">标签管理</span>
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
  computed: {
    path() {
      return this.$route.path;
    }
  },
  created() {
    let userinfo = {"id": "e4b083fd-ff24-41f2-979b-e54246b29318",
    "orgId": "f58c163b-a1f3-11e9-b080-946e68be8353",
    "orgName": "IWORKU",
    "orgLogo": "FufyNI07_QLDRxAj1IAVbf2rrKp5",
    "orgDescription": null,
    "userNameZh": "qimeijunqq.com",
    "userNameEn": "qimejunsf",
    "userProfileImage": "th_1563937812189.jpg",
    "userGender": "1",
    "userPhone": "13708238404",
    "userPassword": "25f9e794323b453885f5181f1b624d0b",
    "userCountry": "country44",
    "userCountryEn": "China",
    "userCountryZh": "中国",
    "userCity": null,
    "userCityEn": null,
    "userCityZh": null,
    "userEmail": "qimeijun@qq.com",
    "userAccount": "qimeijun@qq.com",
    "userRole": "c24fa6ba-a1f6-11e9-b080-946e68be8353",
    "roleName": "区域经理",
    "userStatus": "1",
    "targetCompanyCount": "0",
    "addTimeStr": "2019-07-24 03:10:45",
    "loginTime": null,
    "jwtKey": "Authorization",
    "jwtValue": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJtYXAiOnsiaWQiOiJlNGIwODNmZC1mZjI0LTQxZjItOTc5Yi1lNTQyNDZiMjkzMTgiLCJ1c2VyUm9sZSI6ImMyNGZhNmJhLWExZjYtMTFlOS1iMDgwLTk0NmU2OGJlODM1MyJ9LCJzdWIiOiJlNGIwODNmZC1mZjI0LTQxZjItOTc5Yi1lNTQyNDZiMjkzMTgiLCJleHAiOjE1NjQxOTcwODF9.QhSx0V4i-b4GOdBJOn2OaDJOqfKpBYQFDALbmug5WRyuC-MoTZBphOIBKdFaU91ZoBlBeB9JHhXYhq44ogvo2Q"}
    this.$session.set("user", userinfo);
  
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
  color: #4937EA;
}
.iworku-menu .el-menu-item.is-active i{
  color: #4937EA;
}
</style>
