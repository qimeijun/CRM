<template>
  <div class="member__content">
    <div class="member__content-top">
      <span>{{ $t("member.regional") }}</span>
      <el-button type="primary" size="mini" @click="isUpdateManager=!isUpdateManager;">
        <template v-if="isUpdateManager">{{ $t("member.btn.ok") }}</template>
        <template v-else>{{ $t("member.btn.regional") }}</template>
      </el-button>
    </div>
    <!-- 区域经理 start -->
    <div class="member__regional">
      <div
        v-for="(item, index) in regionalData.regionalManager"
        :key="index"
        class="member__regional-content"
      >
        <el-avatar :size="50" :src="`${$global.avatarURI}${item.userProfileImage}`"></el-avatar>
        <div class="member__regional-content-right">
          <span>{{ $lang == $global.en ? item.userNameEn : item.userNameZh }}</span>
          <span>{{ $t("public.role.regionalManager") }}</span>
        </div>
        <i v-if="isUpdateManager" class="el-icon-error" @click="onDeleteManager(item, index)"></i>
      </div>
      <!-- 添加区域经理 start -->
      <template
        v-if="regionalData && regionalData.regionalManager && regionalData.regionalManager.length < 4"
      >
        <div
          v-if="isUpdateManager"
          class="member__regional-content member__regional-content-add"
          @click="onAddManager"
        >{{ $t("member.btn.addRegional") }}</div>
      </template>
      <!-- 添加区域经理 start-->
    </div>
    <!-- 区域经理  end -->

    <!-- 表格 list  start -->
    <div class="member__table" style="width: 100%;">
      <div class="member__table-tr member__table-th">
        <div>{{ $t('memberManagement.table[0]') }}</div>
        <div>{{ $t('memberManagement.table[1]') }}</div>
        <div>{{ $t('memberManagement.table[2]') }}</div>
        <div>{{ $t('memberManagement.table[3]') }}</div>
        <div>{{ $t('memberManagement.table[4]') }}</div>
        <div>{{ $t('memberManagement.table[5]') }}</div>
        <div>{{ $t('memberManagement.table[6]') }}</div>
      </div>
      <template v-if="memberList && memberList.length > 0">
        <template v-for="(item, index) in memberList">
          <TableList :key="index + 1" :item="{...item, ...{team: regionalData.teamName}}"></TableList>
          <!-- 子成员 start -->
          <template v-if="item.children && item.children.length > 0">
            <TableList
              v-for="(cItem, cIndex) in item.children"
              :key="`${cIndex}-${cItem.id}`"
              :children="true"
              :last="cIndex+1 == item.children.length ? true : false"
              :item="{...cItem, ...{team: regionalData.teamName}}"
            ></TableList>
          </template>
          <!-- 子成员 end -->
        </template>
      </template>
    </div>
    <!-- 表格 list  end -->
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    // 表格列表
    TableList: () => import("@/components/member/Table.vue")
  },
  data() {
    return {
      isUpdateManager: false,
      regionalData: {},
      memberList: []
    };
  },
  methods: {
    /**
     *  点击添加区域经理，调用父级的弹窗
     */
    onAddManager() {
      this.$parent.$parent.addManagerDialogVisible = true;
      this.$emit("getRegionId", this.regionalData.id);
    },
    /**
     *  删除经理
     */
    onDeleteManager(params, index) {
      this.$http
        .post("/user/team/user/rel/regional/manager/delete", {
          teamId: this.regionalData.id,
          userId: params.id
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.regionalData.regionalManager.splice(index, 1);
          }
        });
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (!newVal) return false;
        this.regionalData = { ...newVal };
        // 显示 list 数据处理
        newVal.projectManager.children = newVal.userInfoList;
        this.memberList = [newVal.projectManager];
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.member {
  &__content {
    padding: 0.2rem;
    background-color: $--default-white;
    border-radius: $--default-border-radius;
    margin-bottom: 10px;
    &-top {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-size: 16px;
      font-weight: 600;
    }
    .el-table--expend {
      background-color: $--default-white;
    }
  }
  &__table {
    color: #606266;
    &-th {
      line-height: 30px;
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 700;
      align-items: center;
      background-color: $--default-light-gray-2;
      border-radius: $--default-border-radius;
      div {
        flex: 1;
        padding: 0.1rem;
      }
    }
  }
  &__regional {
    display: flex;
    flex-wrap: wrap;
    &-content {
      position: relative;
      padding: 0.15rem 1%;
      margin-bottom: 15px;
      margin-right: 0.8%;
      width: 22%;
      display: flex;
      align-items: center;
      background-color: $--default-light-gray-2;
      border-radius: $--default-border-radius;
    }
    &-content-right {
      margin-left: 0.1rem;
      color: #7b7b7b;
      line-height: 25px;
      span {
        display: block;
      }
      span:first-child {
        font-size: 16px;
        color: $--default-black;
      }
    }
    &-content-add {
      background-color: #f8f8f8;
      border: 1px solid #ebeaee;
      font-size: 16px;
      color: $--default-color;
      height: 48px;
      cursor: pointer;
    }
    .el-icon-error {
      position: absolute;
      font-size: 20px;
      right: -10px;
      top: -10px;
      cursor: pointer;
    }
  }
}
</style>
