<template>
  <!-- 添加提醒人员 -->
  <section class="add-notify-user">
    <ul class="add-notify-user__list">
      <li v-for="(item, index) in adminstratorList" :key="index" @click="onSelect(item, index)">
        <div :class="['inner', selectAdminstrator.has(item.userId) ? 'selected': '']">
          <div class="add-notify-user__list-left">
            <el-avatar :size="50" :src="`${$global.avatarURI}${item.userProfileImage}`"></el-avatar>
            <div class="add-notify-user__list-left-user">
              <div
                class="add-notify-user__list-name"
              >{{ item.userNameZh||item.userNameEn }}</div>
              <div>{{ item.roleName }}</div>
            </div>
          </div>
          <span class="add-notify-user__list-time">{{ item.addTimeStr }}</span>
        </div>
        <i v-if="selectAdminstrator.has(item.userId)" class="el-icon-success"></i>
      </li>
    </ul>
    <div class="add-notify-user__btn">
      <!-- <span v-if="operate == 'add'" style="cursor: pointer;" @click="$emit('addProjectAdministrator')">{{ $t("changeAdministrator.btn.addMember") }}</span> -->
      <el-button
        :disabled="selectAdminstrator.size == 0"
        type="primary"
        @click="onConfirm"
        style="margin-left: auto;"
      >{{ $t("changeAdministrator.btn.add") }}</el-button>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    /**
     *  所选的目标公司 跟进人ID
     */
    userId: {
      type: String,
      default() {
        return "";
      }
    },
    /**
     *  原来有的人员
     */
    oldUser: {
        type: Array,
        default() {
            return []
        }
    }
  },
  data() {
    return {
      adminstratorList: [],
      selectAdminstrator: new Map()
    };
  },
  computed: {
      ...mapGetters('ipublic', ['userInfo'])
  },
  methods: {
    onSelect(item, index) {
      if (this.selectAdminstrator.has(item.userId)) {
        this.selectAdminstrator.delete(item.userId);
      } else {
        // 设置每个角色最多能选择多少个人
        switch (this.userInfo.userRole) {
            case this.$global.userRole.superAdministrator:
                // 超级管理员 3个  区域经理、项目经理
                this.userMemberLimit(3, item);
                break;
            case this.$global.userRole.regionalManager:
                // 区域经理  3个 自己、项目经理 + 成员
                this.userMemberLimit(3, item);
                break;
            case this.$global.userRole.projectManager:
                // 项目经理  2个 自己 + 成员
                this.userMemberLimit(2, item);
                break;
        }
      }
      this.selectAdminstrator = new Map(this.selectAdminstrator);
    },
    /**
     *  选择的人数限制
     */
    userMemberLimit(limitNum, item) {
        this.selectAdminstrator.size < limitNum ? this.selectAdminstrator.set(item.userId, item) : (function (_this) {
            let lastKey = [..._this.selectAdminstrator.keys()][_this.selectAdminstrator.size - 1];
            _this.selectAdminstrator.delete(lastKey);
            _this.selectAdminstrator.set(item.userId, item)
        }(this));
    },
    onConfirm() {
      let temp = [];
      for (let value of this.selectAdminstrator.values()) {
        value.id = value.userId;
        temp.push(value);
      }
      this.$emit("getUser", temp);
    },
    getUserData() {
      if (!this.userId) {
        return false;
      }
      this.$http.post("/user/info/find/user", { id: this.userId }).then(res => {
        if (res.iworkuCode == "200") {
          this.adminstratorList = res.datas;
        }
      });
    }
  },
  watch: {
    userId: {
      handler(newVal) {
        this.getUserData();
      },
      immediate: true
    },
    oldUser: {
        handler(newVal) {
            if (newVal) {
                newVal.map(val => {
                    val.userId = val.id;
                    this.selectAdminstrator.set(val.userId, val);
                });
                this.selectAdminstrator = new Map(this.selectAdminstrator);
            }
        },
        immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.add-notify-user {
  background-color: white;
  &__list {
    margin-bottom: 60px;
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
        background-color: rgba(73, 55, 234, 0.2);
        cursor: pointer;
        transition: background-color 0.2s cubic-bezier(1, -0.03, 1, 0.28) 0.1s;
      }
      .selected {
        background-color: rgba(73, 55, 234, 0.2);
      }
      .el-icon-success {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #e50054;
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
    position: absolute;
    bottom: 0;
    width: 93%;
    padding: 10px 0;
    text-align: right;
    margin-right: 20px;
    border-top: 1px solid $--default-light-gray-2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $--default-color;
    background-color: white;
  }
}
</style>
