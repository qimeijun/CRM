<template>
  <section class="add-member">
    <ul class="iworku-dialog-menu">
      <li
        v-for="(item, index) in addMemberMenuList"
        :key="index"
        :class="item.value == selectDialogMenu? 'iworku-dialog-menu--selected' : ''"
        @click="onChangeDialogMenu(item)"
      >{{ item.name }}</li>
    </ul>
    <AddAccount
      v-if="selectDialogMenu == addMemberMenuList[0].value"
      @accountCreated="selectDialogMenu=addMemberMenuList[1].value"
    ></AddAccount>
    <ImproveMemeberInfo v-else></ImproveMemeberInfo>
  </section>
</template>
<script>
export default {
  components: {
    // 创建成员账号
    AddAccount: () => import("@/components/member/AddAccount.vue"),
    // 完善成员信息
    ImproveMemeberInfo: () =>
      import("@/components/member/ImproveMemeberInfo.vue")
  },
  data() {
    return {
      addMemberMenuList: [
        {
          name: this.$t("member.dialogMenu.account"),
          value: "account"
        },
        {
          name: this.$t("member.dialogMenu.information"),
          value: "information"
        }
      ],
      selectDialogMenu: "account"
    };
  },
  methods: {
    /**
     *  切换添加成员表单中的按钮
     */
    onChangeDialogMenu(item) {
      this.selectDialogMenu = item.value;
    }
  }
};
</script>
<style lang="scss" scoped>
.add-member {
}
</style>
