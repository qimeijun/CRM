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
        <img v-if="selectAdminstratorInfo.userProfileImage" style="width: 50px; height: 50px; border-radius: 50%;" :src="`${$global.avatarURI}${selectAdminstratorInfo.userProfileImage}`" alt="" srcset="">
        <el-avatar v-else :size="50" :src="`${$global.avatarURI}${selectAdminstratorInfo.userProfileImage}`"></el-avatar>
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
        <div :class="['inner', selectAdminstrator == index ? 'selected': '']" :style="item.id == oldAdminstrator.id ? `display: none;` : ''">
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
      <!-- <span v-if="operate == 'add'" style="cursor: pointer;" @click="$emit('addProjectAdministrator')">{{ $t("changeAdministrator.btn.addMember") }}</span> -->
      <el-button :disabled="selectAdminstratorInfo.id ? false : true" type="primary" @click="onConfirm" style="margin-left: auto;">
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
     *    id: 查询的id, 可选参数
     *    type: 类型  => addRegionalManager 添加区域经理 
     *                   handoverProjectManger 移交项目经理 成员管理列表页面
     *                   handOverTeamManger 移交团队经理 成员管理-团队管理页面
     *    data: 需要传入的其他数据 可选参数
     *  }
     */
    params: {
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
      this.selectAdminstrator = -1;
      this.selectAdminstratorInfo = {};
    },
    getUserData(obj) {
      if (obj.type == 'addRegionalManager') {
        // 添加区域经理
        this.$http.post('/user/info/find/role', { userRole: obj.id }).then(res => {
          if (res.iworkuCode == '200') {
            this.adminstratorList = res.datas;
          }
        });
      } else if (obj.type == 'handoverProjectManger'){
        // 移交团队管理员，只能移交给同一个团队的成员
        this.$http.get(`/user/team/infobypk/${obj.id}`).then(res => {
          if (res.iworkuCode == 200 && res.datas) {
            this.adminstratorList = res.datas.userInfoList;
          }
        });
      } else if (obj.type == 'handOverTeamManger') {
        // 团队管理员的移交
        if (obj.data.length <= 1) {
          return false;
        }
        let temp = [...obj.data];
        // 删除第一个, 列表中第一个是管理员
        temp.shift();
        this.adminstratorList = temp;
      } else if (obj.type == 'addProjectManager') {
        // 将一个新的项目分配给项目经理
        this.$http.post('/user/info/find/role', { userRole: this.$global.userRole.projectManager }).then(res => {
          if (res.iworkuCode == '200') {
            this.adminstratorList = res.datas;
          }
        });
      } else if (obj.type == 'assignMemberForTarget'){
        // 给目标公司分配成员
        this.$http.post('/user/item/user/rel/withoutpaginglist', {itemId: obj.id}).then(res => {
          if (res.iworkuCode == 200) {
            this.adminstratorList = res.datas;
          }
        })
      } else if (obj.type == 'addMemberForProject') {
        // 给项目添加成员
        this.$http.post('/user/item/user/rel/project/manager/withoutpaginglist', { userId: this.params.id }).then(res => {
          if (res.iworkuCode == 200) {
            this.adminstratorList = res.datas; 
          }
        });
      } else if (obj.type == 'handOverTargetByOther') {
        // 把目标公司的工作人员移交给项目中的其他工作人员
        this.$http.post('/user/item/user/rel/withoutpaginglist', {itemId: obj.id}).then(res => {
          if (res.iworkuCode == 200) {
            this.adminstratorList = res.datas;
          }
        })
      } else if (obj.type == 'changeProjectManger') {
        // 将一个项目从一个管理员手中移交到另一个管理员
        this.$http.post('/user/info/find/role', { userRole: this.$global.userRole.projectManager }).then(res => {
          if (res.iworkuCode == '200') {
            this.adminstratorList = res.datas;
          }
        });
      } else if (obj.type == 'handOverMemberForProject') {
        // 把这个项目移交给项目中的其他成员
        this.$http.post('/user/item/user/rel/withoutpaginglist', {itemId: obj.id}).then(res => {
          if (res.iworkuCode == 200) {
            this.adminstratorList = res.datas;
          }
        })
      }
    }
  },
  watch: {
    params: {
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
 