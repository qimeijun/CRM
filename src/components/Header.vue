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
        <el-dropdown style="cursor: pointer;" trigger="click" @command="onChangeLang">
          <span class="el-dropdown-link" style="font-size:18px;">
            {{ $lang }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="header_title-lang">
            <el-dropdown-item :command="$global.lang.en" :disabled="$global.lang.en == $lang">en</el-dropdown-item>
            <el-dropdown-item :command="$global.lang.zh" :disabled="$global.lang.zh == $lang">zh</el-dropdown-item>
            <el-dropdown-item :command="$global.lang.vi" :disabled="$global.lang.vi == $lang">vi</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <!-- 站内信 -->
      <li>
        <el-popover placement="bottom" width="250" trigger="hover">
          <div class="head__notice">
            <div class="top">
              <span>{{ $t("notice.box") }}</span>
              <span
                v-if="unRead"
                style="color: #4937EA; cursor: pointer;"
                @click="onReadAll"
              >{{ $t("notice.read") }}</span>
            </div>
            <ul class="list" v-if="noticeList && noticeList.length > 0">
              <li
                v-for="(item, index) in noticeList"
                :class="[item.messageStatus == 2 ? 'read': '']"
                :key="index"
              >[{{ item.title }}]{{ item.content }}</li>
            </ul>
            <ul v-else>
              <li
                style="height: 100px; line-height: 100px; text-align: center;"
              >{{ $t("public.tips.noData") }}</li>
            </ul>
            <div class="check-all">
              <span
                style="cursor: pointer;"
                @click="$router.push({ path: '/notice' });"
              >{{ $t("notice.checkAll") }}</span>
            </div>
          </div>
          <el-badge
            slot="reference"
            :is-dot="unRead"
            class="head__right__message"
          >
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
                <img v-if="userInfo.userProfileImage!=null" style="object-fit: cover;" :src="`${$global.avatarURI}${userInfo.userProfileImage}`" alt />
                <span v-else style="font-size:24px; font-weight: bold;">{{userInfo.userNameZh?userInfo.userNameZh.slice("")[0]:''}}</span>
              </el-avatar>
              <div class="right">
                <div class>
                  <span style="font-size: 16px; padding-right: .05rem;">{{ userInfo.userNameZh }}</span>
                  <span v-show="userInfo.userRole!=$global.userRole.customer">{{ userInfo.roleName }}</span>
                </div>
                <div>{{ userInfo.userEmail }}</div>
              </div>
            </div>
            <div class="content">
              <ul class="menu">
                <li @click="$router.push({ path: '/' })">{{ $t('workBench.title') }}</li>
                <li
                  class="account"
                  @click="$router.push({ path: '/setting' })"
                >{{ $t("head.account") }}</li>
                <li @click="onLogout">{{ $t("head.logout") }}</li>
              </ul>
              <ul class="today">
                <li style="font-size: 14px; font-weight: 600;">{{ $t("head.today") }}</li>
                <template v-if="todayTaskList && todayTaskList.length > 0">
                  <li
                    class="list"
                    v-for="(item, index) in todayTaskList"
                    :key="index"
                  >{{ item.scheduleContent }}</li>
                </template>
                <li v-else class="list">{{ $t("public.tips.noData") }}</li>
              </ul>
            </div>
          </div>
          <el-avatar v-if="userInfo.userRole !== $global.userRole.customer" :size="50" class="head__avatar__img" slot="reference">
            <img
              v-if="userInfo.userProfileImage!=null"
              style="object-fit: cover;"
              :src="`${$global.avatarURI}${userInfo.userProfileImage}`"
              :alt="userInfo.userProfileImage"
            />
            <span v-else style="font-size:24px; font-weight: bold;">{{userInfo.userNameZh?userInfo.userNameZh.slice("")[0]:''}}</span>
          </el-avatar>
          <span v-else style="cursor: pointer;" slot="reference">{{ userInfo.userNameZh }}</span>
        </el-popover>
      </li>
    </ul>
  </section>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import WebsocketHeartbeatJs from "websocket-heartbeat-js";
export default {
  data() {
    return {
      visible: false,
      noticeList: [],
      websocket: {},
      todayTaskList: [],
      // 默认没有未读消息
      unRead: false
    };
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"])
  },
  created() {
    this.getNewNotice();
    this.connectSocket();
    this.getTodayTask();
  },
  methods: {
    /**
     *  切换语言(中文、英语)
     */
    onChangeLang(command) {
      this.$lang = command;
      // this.$i18n.locale = command;
      window.localStorage.setItem("lang", command);
      this.onRefresh();
    },
    /**
     * 页面刷新
     */
    onRefresh() {
      window.location.reload();
    },
    /**
     *  将全部消息设置为已读
     */
    onReadAll() {
      this.$http.post("/user/message/status/update").then(res => {
        if (res.iworkuCode == 200) {
          // 将消息状态修改为已读
          this.noticeList.map(val => (val.messageStatus = 2));
          this.unRead = false;
          this.$imessage({
            type: "success",
            content: this.$t("public.tips.success")
          });
        }
      });
    },
    /**
     *  获取最新的5条站内信
     */
    getNewNotice() {
      this.$http
        .post("/user/message/withpaginglist", {
          pageSize: 5,
          pageNum: 1
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.noticeList = res.datas;
          }
        });
        // 获取是否有未读消息
        this.$http.post("/user/message/status/withpaginglist", { messageStatus: 1 }).then(res => {
          if (res.iworkuCode == 200 && res.datas) {
            res.datas.length > 0 ? this.unRead = true : this.unRead = false;
          }
        });
    },
    /**
     *  账号退出
     */
    onLogout() {
      document.cookie = `password=;path=/; expires=Thu, 01-Jan-70 00:00:01 GMT`;
      document.cookie = `username=;path=/; expires=Thu, 01-Jan-70 00:00:01 GMT`;
      this.websocket.onreconnect = function () {}
      this.$store.commit("ipublic/$_remove_userInfo");
      this.$store.commit("ipublic/$_clear_regionList");
      this.$router.push({ path: '/login' });
    },
    /**
     *  连接 websocket
     */
    connectSocket() {
      let _this = this;
      this.websocket = new WebsocketHeartbeatJs({
        url: `${process.env.VUE_APP_WEBSOCKET}${this.userInfo.id}`
      });
      this.websocket.onopen = function() {
        _this.websocket.send("hello server");
      };
      this.websocket.onmessage = function(e) {
        let res = JSON.parse(e.data);
        if (res.status == 3) {
          _this.getNewNotice();
        }
      };
    },
    /**
     *  获取今日工作
     */
    getTodayTask() {
      let time = new Date();
      let month = time.getMonth() + 1;
      month < 10 ? (month = `0${month}`) : null;
      let date = time.getDate();
      date < 10 ? (date = `0${date}`) : null;

      this.$http
        .post("/user/workbench/schedule/withpaginglist", {
          scheduleDate: this.$global.interTime(),
          scheduleDatePattern: "yyyy-MM-dd",
          userId: this.userInfo.id,
          pageSize: 5,
          pageNum: 1
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.todayTaskList = res.datas;
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
$border-color: #ebeaee;
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
      padding-left: 0.15rem;
      padding-right: 0.15rem;
      padding-bottom: 0.1rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $border-color;
    }
    .list {
      padding-left: 0.15rem;
      line-height: 40px;
      font-size: 15px;
      border-bottom: 1px solid $border-color;
      li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .read {
      color: #bbbbbb;
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
      margin-left: 0.15rem;
      margin-right: 0.15rem;
      padding-bottom: 0.1rem;
      margin-bottom: 0.1rem;
      display: flex;
      align-content: flex-start;
      border-bottom: 1px solid $border-color;
      .right {
        margin-left: 0.1rem;
        color: #1e1e1e;
        font-size: 12px;
      }
    }
    .content {
      padding-left: 0.15rem;
      padding-right: 0.15rem;
      margin-bottom: 0.2rem;
      display: flex;
      align-content: flex-start;
      .menu {
        flex: 1;
        flex-shrink: 0;
        margin-right: 0.1rem;
        border-right: 1px solid $border-color;
        li {
          padding: 0.15rem 0;
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
        text-overflow: ellipsis;
        white-space: nowrap;
        li {
          padding: 0.08rem 0;
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
<style lang="scss">
  .header_title-lang {
    padding: 10px 0 !important;
    li {
      padding: 0 20px !important;
    }
  }
</style>