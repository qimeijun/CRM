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
        <el-badge is-dot class="head__right__message">
          <i class="el-icon-message-solid"></i>
        </el-badge>
      </li>
      <!-- 头像 -->
      <li class="head__avatar">
        <el-popover placement="bottom" width="200" trigger="hover">
          <!-- 弹窗内容 -->
          <div class="content">
            <h2>我是内容</h2>
          </div>
          <img
            class="head__avatar__img"
            src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"
            alt
            slot="reference"
          />
        </el-popover>
      </li>
    </ul>
  </section>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      visible: false
    };
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
    }
  }
};
</script>
<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .05rem 0.3rem;
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
}
</style>
