<template>
  <section class="project-details">
    <div class="project-details__top">
      <PageHeader></PageHeader>
      <div class="project-details__top-name">项目详情</div>
       <el-input class="project-details__top-seek" placeholder="请输入内容" v-model="seek">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="onClickSeek()"></i>
      </el-input>
      <el-button class="project-details__top-endbtn">结束项目</el-button>
    </div>
    <div class="project-details__content">
      <div class="project-details__menu">
        <ul>
          <li
            v-for="(item, index) in menuList"
            :key="index"
            :class="activeMenu == item.value ? 'project-details__menu-active' : ''"
            @click.capture="onChangeMenu(item)"

          >
            <router-link :to="`/project/detail/${item.route}`">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
      <el-row :gutter="10">
        <el-col :span="activeMenu!=='information'&&activeMenu!=='product'?24:16">
          <router-view></router-view>
        </el-col>
        <el-col v-if="activeMenu==='information'||activeMenu==='product'"  :span="8">
            <Tag></Tag>
            <Member></Member>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
import PageHeader from "@/components/lib/PageHeader.vue";
import Tag from "@/components/project/Tag.vue";
import Member from "@/components/project/Member.vue";
export default {
  data() {
    return {
      // activeMenu: "information",
      menuList: [
        {
          name: "资料",
          value: "information",
          route: "info"
        },
        {
          name: "产品",
          value: "product",
          route: "product"
        },
        {
          name: "公海客户",
          value: "commonality",
          route: "commonality"
        },
        {
          name: "成员私海",
          value: "private",
          route: "private"
        },
        {
          name: "工作日志",
          value: "diary",
          route: "diary"
        }
      ],
      seek:""
    };
  },
   computed: {
    activeMenu() {
      return this.$route.name;
    }
  },
  components: {
    PageHeader,Tag,Member
  },
  methods: {
    /**
     *  切换菜单
     */
    onChangeMenu(item) {
      console.log(123);
      this.activeMenu = item.value;
      this.$router.push({path:`/project/detail/${item.route}`});
    }
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
    &-seek{
      width:313px;
    }
    &-endbtn{
      color:$--default-color;
    }
  }
  &__content {
    width: 1062px;
    margin: 0 auto;
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

