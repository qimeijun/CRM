<template>
  <div
    :class="['member-table-list-tr', (!children && item.children && item.children.length > 0) ? 'member-table-list-tr--parent' : '', children ? 'member-table-list-tr--children':'', last ? 'member-table-list-tr--children-last' : '']"
  >
    <div class="member-table-list-user">
        <el-avatar :size="50" src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"></el-avatar>
        <div class="member-table-list-user-right">
            <span class="user-name">Jane</span>
            <span class="el-icon-location">越南</span>
        </div>
    </div>
    <div>{{ item.date }}</div>
    <div>{{ item.name }}</div>
    <div>{{ item.address }}</div>
    <div>{{ item.address }}</div>
    <div>{{ item.address }}</div>
    <div>
      <Operate>
        <ul>
          <li>
            <router-link to="/member/detail">{{ $t("memberManagement.operate[0]") }}</router-link>
          </li>
          <li>
            <router-link to="/second">{{ $t("memberManagement.operate[1]") }}</router-link>
          </li>
          <li
            class="member-table-list__delete"
            @click="onDeleteMember"
          >{{ $t("memberManagement.operate[2]") }}</li>
        </ul>
      </Operate>
    </div>
  </div>
</template>
<script>
import Operate from "@/components/lib/Operate.vue";
export default {
  components: {
    Operate
  },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    children: {
      type: Boolean,
      default() {
        return false;
      }
    },
    last: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    /**
     *  删除成员
     */
    onDeleteMember() {
      this.$confirm(
        this.$t("memberManagement.deleteTip.content[0]"),
        this.$t("memberManagement.deleteTip.title"),
        {
          confirmButtonText: this.$t("memberManagement.deleteTip.btn[1]"),
          cancelButtonText: this.$t("memberManagement.deleteTip.btn[0]"),
          type: "warning",
          center: true
        }
      )
        .then(() => {
          // 取消删除
          this.$message({
            type: "success",
            message: "取消删除"
          });
        })
        .catch(() => {
          // 确定删除
          this.$message({
            type: "info",
            message: "确定删除"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.member-table-list {
  &-tr {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $--default-light-gray-2;
    border-radius: $--default-border-radius;
    div {
      flex: 1;
      line-height: 30px;
      display: inline-block;
      padding: 0.1rem;
    }
  }
  
  &-tr--parent {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
  }
  &-tr--children {
    margin: 0px;
    border-radius: 0px !important;
    border-top: 1px solid #CFCFCF;
  }
  &-tr--children-last {
    border-bottom-left-radius: $--default-border-radius !important;
    border-bottom-right-radius: $--default-border-radius !important;
  }
  &__delete {
    cursor: pointer;
  }
  &-user {
      display: flex !important;
     align-items: center !important;
    &-right {
        span {
            display: block;
        }
        .user-name {
            font-size:14px;
        }
        .el-icon-location {
            color: #909090;
            font-size: 14px;
        }
    }
  }
}
</style>
