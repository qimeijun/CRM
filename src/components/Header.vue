<template>
  <section class="head">
    <h1 class="head__title">{{ $t("head.title") }}</h1>
    <ul class="head__right">
      <!-- 刷新 -->
      <li>
        <i class="el-icon-refresh-right" @click="onRefresh"></i>
      </li>
      <!-- 语言 -->
      <li>
        <span class="head__right__lang" @click="onChangeLang">
          <template v-if="$lang == 'en'">ZH</template>
          <template v-else>EN</template>
        </span>
      </li>
      <!-- 站内信 -->
      <li>
        <el-popover placement="bottom" width="250" trigger="hover">
          <div class="head__notice">
            <div class="top">
              <span>{{ $t("notice.box") }}</span>
              <span style="color: #4937EA; cursor: pointer;" @click="onReadAll">{{ $t("notice.read") }}</span>
            </div>
            <ul class="list">
              <li>[系统]sfsdfsdfsdfsdfsdfsd</li>
              <li>[系统]sfsdfsdfsdfsdfsdfsd</li>
              <li>[系统]sfsdfsdfsdfsdfsdfsd</li>
              <li>[系统]sfsdfsdfsdfsdfsdfsd</li>
              <li class="read">[系统]sfsdfsdfsdfsdfsdfsd</li>
            </ul>
            <div class="check-all">
              <span style="cursor: pointer;" @click="$router.push({ path: '/notice' });">{{ $t("notice.checkAll") }}</span>
            </div>
          </div>
          <el-badge slot="reference" is-dot class="head__right__message">
            <i class="el-icon-message-solid"></i>
          </el-badge>
        </el-popover>
      </li>
      
      <!-- 头像 -->
      <li class="head__avatar">
        <el-popover placement="bottom" width="300" trigger="hover">
          <div class="head__person">
            <div class="top">
               <el-avatar :size="50"> 
                 <img :src="`${$global.avatarURI}${userInfo.userProfileImage}`" alt="">
               </el-avatar>
               <div class="right">
                 <div class="">
                   <span style="font-size: 16px; padding-right: .05rem;">{{ userInfo.userNameZh }}</span>
                   <span>{{ userInfo.roleName }}</span>
                 </div>
                 <div>{{ userInfo.userEmail }}</div>
               </div>
            </div>
            <div class="content">
              <ul class="menu">
                <li @click="$router.push({ path: '/' })">{{ $t('workBench.title') }}</li>
                <li class="account" @click="$router.push({ path: '/setting' })">{{ $t("head.account") }}</li>
                <li @click="onLogout">{{ $t("head.logout") }}</li>
              </ul>
              <ul class="today">
                <li style="font-size: 14px; font-weight: 600;">{{ $t("head.today") }}</li>
                <li class="list">拜访 Công ty TNHH拜访 Công ty TNHH</li>
                <li class="list">拜访 Công ty TNHH拜访 Công ty TNHH</li>
                <li class="list">拜访 Công ty TNHH拜访 Công ty TNHH</li>
                <li class="list">拜访 Công ty TNHH拜访 Công ty TNHH</li>
                <li class="list">拜访 Công ty TNHH拜访 Công ty TNHH</li>
              </ul>
            </div>
          </div>
          <img
            class="head__avatar__img"
            :src="`${$global.avatarURI}${userInfo.userProfileImage}`"
            :alt="userInfo.userProfileImage"
            slot="reference"
          />
        </el-popover>
      </li>
    </ul>
  </section>
</template>
<script>
import Vue from "vue"
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      visible: false
    };
  },
  computed: {
    ...mapGetters('ipublic', ['userInfo'])
  },
  methods: {
    /**
     *  切换语言(中文、英语)
     */
    onChangeLang() {
      if (this.$lang == "en") {
        Vue.config.lang = "zh";
      } else {
        Vue.config.lang = "en";
      }
    },
    /**
     * 页面刷新
     */
    onRefresh() {
      window.reload();
    },
    /**
     *  将全部消息设置为已读
     */
    onReadAll() {},
    /**
     *  账号退出
     */
    onLogout() {
      this.$store.commit('ipublic/$_remove_userInfo', {});
      this.$router.push({ path: '/login' });
    }
  }
};
</script>
<style lang="scss" scoped>
$border-color: #EBEAEE;
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.05rem 0.3rem;
  background-color: #ffffff;
  &__title {
    font-size: 0.2rem;
    color: $--default-color;
  }
  &__right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.16rem;
    font-weight: 500;
    color: $--default-black;
    li {
      padding: 0 0.15rem;
    }
    li:not(:last-child)::after {
      content: "|";
      margin-left: 0.25rem;
    }
    .el-icon-refresh-right,
    .el-icon-message-solid {
      font-size: 20px;
      cursor: pointer;
    }
    &__lang {
      cursor: pointer;
    }
    &__message {
      font-size: 0.16rem;
    }
  }
  &__avatar {
    display: flex;
    align-items: center;
    &__img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
    &__name {
      margin-left: 0.1rem;
    }
  }

  &__notice {
    padding: 10px 0;
    .top {
      padding-left: .15rem;
      padding-right: .15rem;
      padding-bottom: .1rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $border-color;
    }
    .list {
      padding-left: .15rem;
      line-height: 40px;
      font-size: 15px;
      border-bottom: 1px solid $border-color;
    }
    .read {
      color: #BBBBBB;
    }
    .check-all {
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: center;
    }
  }

  &__person {
    padding: 10px 0;
    .top {
      margin-left: .15rem;
      margin-right: .15rem;
      padding-bottom: .1rem;
      margin-bottom: .1rem;
      display: flex;
      align-content: flex-start;
      border-bottom: 1px solid $border-color;
      .right {
        margin-left: .1rem;
        color: #1e1e1e;
        font-size: 12px;
      }
    }
    .content {
      padding-left: .15rem;
      padding-right: .15rem;
      margin-bottom: .2rem;
      display: flex;
      align-content: flex-start;
      .menu {
        flex: 1;
        flex-shrink: 0;
        margin-right: .1rem;
        border-right: 1px solid $border-color;
        li {
          padding: .15rem 0;
          cursor: pointer;
        }
        .account {
          border-top: 1px solid $border-color;
          border-bottom: 1px solid $border-color;
        }
      }
      .today {
        flex: 3;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        li {
          padding: .08rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list:before {
          content: "·";
          display: inline-block;
          margin-right: 5px;
          font-size: 10px;
        }
      }
    }
  }

}
</style>
