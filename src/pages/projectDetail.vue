<template>
<!-- 项目详情 -->
  <section class="project-details">
    <div class="project-details__top">
      <PageHeader :url="`/projectmanage/${$store.getters['ipublic/regionId']}`"></PageHeader>
      <div class="project-details__top-name">{{$t("projectInfo.title")}}</div>
    </div>
    <div class="project-details__content">
      <div class="project-details__menu">
        <ul>
          <li
            v-for="(item, index) in menuList"
            v-show="allotType!=null||(allotType==null&&item.value!='private')"
            :key="index"
            :class="activeMenu == item.value ? 'project-details__menu-active' : ''"
            @click.capture="onChangeMenu(item)"
          >
            <router-link :to="`/project/detail/${item.route}/${itemid}/${adminId}`">{{$t(item.name) }}</router-link>
          </li>
        </ul>
      </div>
      <el-scrollbar style="height: calc(100vh - 2.5rem);">
        <el-row :gutter="10">
          <el-col :span="activeMenu!=='information'&&activeMenu!=='product'?24:16">
            <router-view></router-view>
          </el-col>
          <el-col v-if="activeMenu==='information'||activeMenu==='product'" :span="8">
            <Tag type="project" :id="itemid" :disableType="itemStatus!=2&&userInfo.userRole!=$global.userRole.member"></Tag>
            <Member v-show="allotType!=null" :id="adminId" :itemStatus="itemStatus-0"></Member>
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
export default {  components: {
    PageHeader,
    Tag,
    Member
  },
  data() {
    return {
      allotType:null,
      activeMenu: "information",
      itemStatus:2,
      menuList: [
        // 资料
        {
          name: "projectInfo.menu[0]",
          value: "information",
          route: "info"
        },
        // 产品
        {
          name: "projectInfo.menu[1]",
          value: "product",
          route: "product"
        },
        // 项目公海
        {
          name: "projectInfo.menu[2]",
          value: "commonality",
          route: "commonality"
        },
        // 私海
        {
          name: "projectInfo.menu[3]",
          value: "private",
          route: "private"
        },
        // 日志
        {
          name: "projectInfo.menu[4]",
          value: "diary",
          route: "diary"
        }
      ],
    };
  },
  created() {
    this.activeMenu = this.$route.name;
    this.getItemStatus(this.itemid);
  },
  computed: {
    itemid(){
      return this.$route.params.itemid;
    },
    adminId() {
      return this.$route.params.adminId;
    },
    ...mapGetters("ipublic", ["userInfo"])
  
  },

  methods: {
    /**
     *  切换菜单
     */
    onChangeMenu(item) {
      this.activeMenu = item.value;
      this.$router.push({ path: `/project/detail/${item.route}/${this.itemid}/${this.adminId}` });
    },
    // 获取项目状态
    getItemStatus(id) {
      this.$http.get(`/customer/item/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.allotType=res.datas.probjectManager;
          this.itemStatus=res.datas.itemStatus;
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.project-details {
  margin: 20px;
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-name {
      font-size: 24px;
      margin-left: 0.2rem;
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

