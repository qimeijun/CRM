<template>
  <!-- 修改管理员 -->
  <section class="change-administrator">
    <!-- 移交表格 -->
    <div v-if="operate == 'handOver'" class="change-administrator__hand-over">
      <div class="change-administrator__hand-over-administrator">
        <el-avatar :size="50" :src="`${$global.avatarURI}${oldAdminstrator.userProfileImage}`"></el-avatar>
        <div class="right">
          <span>{{ $lang == $global.en ? oldAdminstrator.userNameEn : oldAdminstrator.userNameZh }}</span>
          <span class="el-icon-location">{{ $lang == $global.en ? oldAdminstrator.userCountryEn : oldAdminstrator.userCountryZh }}</span>
        </div>
      </div>
      <div class="change-administrator__hand-over-administrator">
        <el-avatar :size="50" :src="`${$global.avatarURI}${selectAdminstratorInfo.userProfileImage}`"></el-avatar>
        <div class="right">
          <span>{{ $lang == $global.en ? selectAdminstratorInfo.userNameEn : selectAdminstratorInfo.userNameZh }}</span>
          <span v-if="selectAdminstratorInfo.userCountryEn" class="el-icon-location">{{ $lang == $global.en ? selectAdminstratorInfo.userCountryEn : selectAdminstratorInfo.userCountryZh }}</span>
        </div>
      </div>
    </div>
    <!-- 移交表格 -->
    <el-input
      :placeholder="`${$t('changeAdministrator.search')}`"
      suffix-icon="el-icon-search"
      v-model="searchName"
    ></el-input>
    <ul class="change-administrator__list">
      <li v-for="(item, index) in adminstratorList" :key="index" @click="onSelect(item, index)">
        <div :class="['inner', selectAdminstrator == index ? 'selected': '']">
          <div class="change-administrator__list-left">
            <el-avatar :size="50" :src="`${$global.avatarURI}${item.userProfileImage}`"></el-avatar>
            <div class="change-administrator__list-left-user">
              <div class="change-administrator__list-name">{{ $lang == $global.en ? item.userNameEn : item.userNameZh }}</div>
              <div class="el-icon-location">{{ $lang == $global.en ? item.userCountryEn : item.userCountryZh }}</div>
            </div>
          </div>
          <span class="change-administrator__list-time">{{ item.addTimeStr }}</span>
        </div>
        <i v-if="selectAdminstrator == index" class="el-icon-success"></i>
      </li>

    </ul>
    <div class="change-administrator__btn">
      <span v-if="operate == 'add'" style="cursor: pointer;" @click="$emit('addProjectAdministrator')">{{ $t("changeAdministrator.btn.addMember") }}</span>
      <el-button type="primary" @click="onConfirm" style="margin-left: auto;">
        <template v-if="operate == 'add'">
          {{ $t("changeAdministrator.btn.add") }}
        </template>
        <template v-else>
          {{ $t("changeAdministrator.btn.handOver") }}
        </template>
      </el-button>
    </div>
  </section>
</template>
 <script>
export default {
  props: {
    // 什么操作，add 表示添加区域管理员， handOver 表示移交区域管理员
    operate: {
      type: String,
      default() {
        return 'add';
      }
    },
    // 管理员移交时，显示之前的管理员
    oldAdminstrator: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     *  {
     *    id: 查询的id,
     *    type: 类型  => addRegionalManager 添加区域经理
     *  }
     */
    typeId: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      searchName: "",
      adminstratorList: [],
      selectAdminstrator: -1,
      selectAdminstratorInfo: {},
      newAdminstrator: {}
    };
  },
  methods: {
    /**
     *  选择人
     */
    onSelect(item, index) {
      this.selectAdminstrator = index;
      this.selectAdminstratorInfo = item;
    },
    onConfirm() {
      this.$emit("getManager", this.selectAdminstratorInfo);
    },
    getUserData(obj) {
      // 添加区域经理
      if (obj.type == 'addRegionalManager') {
        this.$http.post('/user/info/find/role', { userRole: obj.id }).then(res => {
          if (res.iworkuCode == '200') {
            this.adminstratorList = res.datas;
          }
        });
      }
    }
  },
  watch: {
    typeId: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.getUserData(newVal);
        }
      },
      immediate: true
    }
  }
};
</script>
 <style lang="scss" scoped>
.change-administrator {
  background-color: white;
  &__list {
    li {
      position: relative;
      border-bottom: 1px solid #d6d6d6;
      .inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.1rem 0;
        padding: 0.1rem 0.1rem;
        border-radius: $--default-border-radius;
      }
      .inner:hover {
        background-color: rgba(73,55,234,0.2);
        cursor: pointer;
        transition: background-color .2s cubic-bezier(1,-0.03,1,.28) .1s;
      }
      .selected {
        background-color: rgba(73,55,234,0.2);
      }
      .el-icon-success {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #E50054;
        font-size: 33px;
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
    &-name {
      font-size: 16px;
      font-weight: 400;
      color: $--default-black;
    }
    &-time {
      color: #bbbbbb;
    }
    .el-icon-location {
      color: #909090;
    }
  }
  &__btn {
    text-align: right;
    margin-right: 20px;
    border-top: 1px solid $--default-light-gray-2;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $--default-color;
  }

  &__hand-over {
    display: flex;
    justify-content: space-between;
    &-administrator {
      margin-bottom: 20px;
      width: calc(49% - .2rem);
      padding: .1rem;
      background-color: #EBEAEE;
      border-radius: $--default-border-radius;
      display: flex;
      align-items: center;
      .right {
        margin-left: .2rem;
        line-height: 30px;
        span:first-child {
          display: block;
          font-size:16px;
          color: $--default-black;
        }
        .el-icon-location {
          display: block;
        }
      }
    }
  }
}
</style>
 <style lang="scss">
.change-administrator {
  .el-input__inner {
    background-color: $--default-input-inner;
  }
}
</style>
 