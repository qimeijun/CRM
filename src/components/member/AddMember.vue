<template>
  <section class="add-member" ref="add-member">
    <ul class="iworku-dialog-menu">
      <li
        v-for="(item, index) in addMemberMenuList"
        :key="index"
        :class="[item.value == selectDialogMenu? 'iworku-dialog-menu--selected' : '', !item.isClick ? 'not-click-able' : '']"
        @click="onChangeDialogMenu(item)"
      >{{ item.name }}</li>
    </ul>
    <AddAccount
      v-if="selectDialogMenu == addMemberMenuList[0].value"
      @accountCreated="selectDialogMenu=addMemberMenuList[1].value"
    ></AddAccount>
    <ImproveMemeberInfo v-else :user="params" @onOperateSuccess="onOperateSuccess"></ImproveMemeberInfo>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    // 添加成员时，需要默认的一些参数, 可选
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    // 创建成员账号
    AddAccount: () => import("@/components/member/AddAccount.vue"),
    // 完善成员信息
    ImproveMemeberInfo: () =>
      import("@/components/member/ImproveMemeberInfo.vue")
  },
  data() {
    return {
      selectDialogMenu: "account"
    };
  },
  computed: {
    ...mapGetters('members', [
      'account',
      'password'
    ]),
    addMemberMenuList() {
      return [
        {
          name: this.$t("member.dialogMenu.account"),
          value: "account",
          isClick: true
        },
        {
          name: this.$t("member.dialogMenu.information"),
          value: "information",
          isClick: (this.account && this.password) ? true : false
        }
      ]
    },
  },
  methods: {
    /**
     *  切换添加成员表单中的按钮
     */
    onChangeDialogMenu(item) {
      item.isClick ? this.selectDialogMenu = item.value : null;
    },
    /**
     * 获取子组件的成功信息
     */
    onOperateSuccess() {
      this.selectDialogMenu = this.addMemberMenuList[0].value;
      this.$emit("onOperateSuccess");
    }
  },
  watch: {
    account(newVal) {},
    password(newVal) {}
  },
};
</script>
<style lang="scss" scoped>
.add-member {
  .not-click-able {
    cursor: not-allowed;
  }
}
</style>
