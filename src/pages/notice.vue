<template>
    <section class="notice">
        <ul class="notice__menu">
            <li v-for="(item, index) in menuList" 
                :key="index" 
                :class="activeMenu == item.value ? 'selected' : ''" 
                @click="onChangeMenu(item)">{{ item.name }}</li>
        </ul>
        <el-scrollbar style="height: calc(100vh - 2.1rem);">
        <div class="notice__items" v-infinite-scroll="scrollLoad">
            <div class="notice__items-list" v-for="(item, index) in count" :key="index">
                <div>
                    <el-avatar  :size="50" src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"></el-avatar>
                </div>
                <div class="notice__items-content">
                    <div style="margin-bottom: 10px; color: #BBBBBB;">
                        <span>{{ $t("notice.menu[1]") }}</span>
                        <time class="time">2019/02/23 12:00:00</time>
                    </div>
                    <div style="color: #1E1E1E;">
                        Gary.P 在项目 DOW CORNING CORPORATION 中作废了目标公司 DOW CORNING CORPORATION！
                        Gary.P 在项目 DOW CORNING CORPORATION 中作废了目标公司 DOW CORNING CORPORATION！
                    </div>
                </div>
            </div>
        </div>
        </el-scrollbar>
    </section>
</template>
<script>
export default {
    data() {
        return {
            activeMenu: '1',
            count: 20
        }
    },
    computed: {
        menuList() {
            return [{
                name: this.$t("notice.menu[0]"),
                value: "1"
            },
            {
                name: this.$t("notice.menu[1]"),
                value: "2"
            },
            {
                name: this.$t("notice.menu[2]"),
                value: "3"
            },
            {
                name: this.$t("notice.menu[3]"),
                value: "4"
            },
            {
                name: this.$t("notice.menu[4]"),
                value: "5"
            },
            {
                name: this.$t("notice.menu[5]"),
                value: "6"
            }];
        }
    },
    methods: {
        /**
         *  切换菜单
         */
        onChangeMenu(item) {
            this.activeMenu = item.value;
        },
        /**
         *  滚动加载
         */
        scrollLoad() {
            this.count += 10;
        }
    }
}
</script>
<style lang="scss" scoped>
.notice {
 width: 80%;
 margin: 40px auto 0;
 &__menu {
     margin-top: 20px;
     margin-bottom: 20px;
     display: flex;
      border-radius: $--default-border-radius;
      background-color: $--default-white;
    li {
      cursor: pointer;
      padding: 20px;
      font-size: 16px;
      text-align: center;
    }
    .selected::after {
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

 &__items {
    padding: .2rem .4rem;
    border-radius: $--default-border-radius;
    background-color: $--default-white;
    &-list {
        display: flex;
        align-items: flex-start;
        border-bottom: 1px solid #EBEAEE;
        padding: 20px 0;
    }
    &-content {
        margin-left: .2rem;
        .time {
            padding-left: .2rem;
            font-size: 12px; 
        }
    }
 }
}
</style>
