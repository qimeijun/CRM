<template>
  <!-- 顾客页面 -->
  <section class="customer">
    <div class="customer__top">
      <div class="customer__top-name">
        <span v-show="activeMenu=='customer_information'">公司资料</span>
        <span  v-show="activeMenu=='customer_product'">产品信息</span>
        <span  v-show="activeMenu=='customer_target'">目标公司</span>
        <span  v-show="activeMenu=='customer_diary'">工作日志</span>
      </div>
    </div>
    <div class="customer__content">
      <div class="customer__menu"></div>
      <el-scrollbar style="height: calc(100vh - 1.8rem);">
        <el-row :gutter="10">
          <el-col
            :span="activeMenu!=='customer_information'&&activeMenu!=='customer_product'?24:16"
          >
            <router-view></router-view>
          </el-col>
          <el-col
            v-if="activeMenu==='customer_information'||activeMenu==='customer_product'"
            :span="8"
          >
            <Tag
              type="project"
              :id="itemid"
              :disableType="userInfo.userRole!=$global.userRole.member&&userInfo.userRole!=$global.userRole.customer"
            ></Tag>
            <Member v-show="allotType!=null" :id="adminId"></Member>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import PageHeader from "@/components/lib/PageHeader.vue";
import Tag from "@/components/project/Tag.vue";
import Member from "@/components/project/Member.vue";
export default {
  components: {
    PageHeader,
    Tag,
    Member
  },
  data() {
    return {
      allotType: null,
    };
  },
  created() {
    this.getItemStatus(this.itemid);
  },
  computed: {
    itemid() {
      return this.$route.params.itemid;
    },
    adminId() {
      return this.$route.params.adminId;
    },
    activeMenu(){
        return this.$route.name;
    },
    ...mapGetters("ipublic", ["userInfo"])
  },

  methods: {
    /**
     *  切换菜单
     */
    onChangeMenu(item) {
      this.activeMenu = item.value;
      this.$router.push({
        path: `/project/detail/${item.route}/${this.itemid}/${this.adminId}`
      });
    },
    // 获取项目状态
    getItemStatus(id) {
      this.$http.get(`/customer/item/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.allotType = res.datas.probjectManager;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.customer {
  margin: 20px;
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-name {
      font-size: 24px;
      flex-grow: 2;
    }
  }
  &__content {
    // width: 1062px;
    // margin: 0 auto;
  }
  &__menu {
    margin-top: 20px;
    margin-bottom: 10px;
    ul {
      display: flex;
      border-radius: $--default-border-radius;
      background-color: $--default-white;
    }
    li {
      padding: 20px;
      font-size: 16px;
      text-align: center;
    }
    &-active::after {
      content: "";
      display: block;
      margin-top: 5px;
      height: 4px;
      width: 100%;
      border-radius: $--default-border-radius;
      background-color: $--default-color;
      transition: 1s 1s height ease;
    }
  }
}
</style>

