<template>
  <!-- 修改管理员 -->
  <section class="change-administration">
    <el-input
      :placeholder="`${$t('changeAdministration.search')}`"
      suffix-icon="el-icon-search"
      v-model="searchName"
    ></el-input>
    <ul class="change-administration__list">
      <li>
        <div class="inner">
          <div class="change-administration__list-left">
            <img
              class="change-administration__list-avatar"
              src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"
              alt
            />
            <div class="change-administration__list-left-user">
              <div class="change-administration__list-name">Zhangsan</div>
              <div class="el-icon-location">越南</div>
            </div>
          </div>
          <span class="change-administration__list-time">2019/09/06</span>
        </div>
      </li>
      <li>
        <div class="inner">
          <div class="change-administration__list-left">
            <img
              class="change-administration__list-avatar"
              src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"
              alt
            />
            <div class="change-administration__list-left-user">
              <div class="change-administration__list-name">Zhangsan</div>
              <div class="el-icon-location">越南</div>
            </div>
          </div>
          <span class="change-administration__list-time">2019/09/06</span>
        </div>
      </li>
      <li>
        <div class="inner">
          <div class="change-administration__list-left">
            <img
              class="change-administration__list-avatar"
              src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"
              alt
            />
            <div class="change-administration__list-left-user">
              <div class="change-administration__list-name">Zhangsan</div>
              <div class="el-icon-location">越南</div>
            </div>
          </div>
          <span class="change-administration__list-time">2019/09/06</span>
        </div>
      </li>
      <li>
        <div class="inner">
          <div class="change-administration__list-left">
            <img
              class="change-administration__list-avatar"
              src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"
              alt
            />
            <div class="change-administration__list-left-user">
              <div class="change-administration__list-name">Zhangsan</div>
              <div class="el-icon-location">越南</div>
            </div>
          </div>
          <span class="change-administration__list-time">2019/09/06</span>
        </div>
      </li>
    </ul>
    <div class="change-administration__btn">
      <el-button type="primary">{{ $t("changeAdministration.btn.change") }}</el-button>
    </div>
  </section>
</template>
 <script>
export default {
  data() {
    return {
      searchName: ""
    };
  },
  methods: {}
};
</script>
 <style lang="scss" scoped>
.change-administration {
  background-color: white;
  &__list {
    li {
        border-bottom: 1px solid $--default-light-gray-2;
      .inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.1rem 0.1rem;
        padding: .1rem .1rem;
        border-radius: $--default-border-radius;
      }
    }
    &-left {
      display: flex;
      align-items: center;
      line-height: 30px;
    }
    &-left-user {
      margin-left: 0.2rem;
    }
    &-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    &-name {
      font-size: 16px;
      font-weight: 400;
    }
  }
  &__btn {
    text-align: right;
    margin-right: 20px;
    border-top: 1px solid $--default-light-gray-2;
    padding-top: 20px;
  }
}
</style>
 