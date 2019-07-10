<template>
  <!-- 修改管理员 -->
  <section class="change-administration">
    <el-input
      :placeholder="`${$t('changeAdministration.search')}`"
      suffix-icon="el-icon-search"
      v-model="searchName"
    ></el-input>
    <ul class="change-administration__list">
      <li v-for="(item, index) in managerList" :key="index" @click="onSelect(item, index)">
        <div :class="['inner', selectManager == index ? 'selected': '']">
          <div class="change-administration__list-left">
            <el-avatar :size="50" :src="item.avatar"></el-avatar>
            <div class="change-administration__list-left-user">
              <div class="change-administration__list-name">{{ item.name }}</div>
              <div class="el-icon-location">{{ item.location }}</div>
            </div>
          </div>
          <span class="change-administration__list-time">{{ item.time }}</span>
        </div>
        <i v-if="selectManager == index" class="el-icon-success"></i>
      </li>

    </ul>
    <div class="change-administration__btn">
      <el-button type="primary" @click="onConfirm">{{ $t("changeAdministration.btn.change") }}</el-button>
    </div>
  </section>
</template>
 <script>
export default {
  data() {
    return {
      searchName: "",
      managerList: [
        {
          avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
          name: "Zhangsan",
          location: "越南",
          time: "2019/09/06"
        },
        {
          avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
          name: "Zhangsan",
          location: "越南",
          time: "2019/09/06"
        },
        {
          avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
          name: "Zhangsan",
          location: "越南",
          time: "2019/09/06"
        },
        {
          avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
          name: "Zhangsan",
          location: "越南",
          time: "2019/09/06"
        },
        {
          avatar: "https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7",
          name: "Zhangsan",
          location: "越南",
          time: "2019/09/06"
        }
      ],
      selectManager: -1,
      selectManagerInfo: {}
    };
  },
  methods: {
    /**
     *  选择人
     */
    onSelect(item, index) {
      this.selectManager = index;
      this.selectManagerInfo = item;
    },
    onConfirm() {
      this.$emit("getManager", this.selectManagerInfo);
    }
  }
};
</script>
 <style lang="scss" scoped>
.change-administration {
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
  }
}
</style>
 <style lang="scss">
.change-administration {
  .el-input__inner {
    background-color: $--default-input-inner;
  }
}
</style>
 