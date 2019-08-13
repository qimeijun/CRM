<template>
    <section class="notice">
        <ul class="notice__menu">
            <li v-for="(item, index) in menuList" 
                :key="index" 
                :class="activeMenu == item.value ? 'selected' : ''" 
                @click="onChangeMenu(item)">{{ item.name }}</li>
        </ul>
        <el-scrollbar style="height: calc(100vh - 2.1rem);">
        <div v-if="noticeList && noticeList.length > 0" class="notice__items" v-infinite-scroll="scrollLoad">
            <div class="notice__items-list" v-for="(item, index) in noticeList" :key="index">
                <div>
                    <el-avatar  :size="50" :src="`${$global.avatarURI}${item.addUserProfileImage}`"></el-avatar>
                </div>
                <div class="notice__items-content">
                    <div style="margin-bottom: 10px; color: #BBBBBB;">
                        <!-- <span v-if="activeMenu > 0">{{ menuList[parseInt(activeMenu)].name }}</span> -->
                        <span>{{ item.title }}</span>
                        <time class="time"> {{ $global.localTime({ time: item.addTimeStr }) }}</time>
                    </div>
                    <div style="color: #1E1E1E;">
                        {{ item.content }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else style="height: 300px; border-radius: 8px; background-color: white; text-align: center; line-height: 300px;">
            {{ $t("public.tips.noData") }}
        </div>
        </el-scrollbar>
    </section>
</template>
<script>
export default {
    data() {
        return {
            activeMenu: '0',
            count: 20,
            page: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                totalPage: 0
            },
            noticeList: []
        }
    },
    computed: {
        menuList() {
            return [{
                name: this.$t("notice.menu[0]"),
                value: "0"
            },
            {
                name: this.$t("notice.menu[1]"),
                value: "1"
            },
            {
                name: this.$t("notice.menu[2]"),
                value: "2"
            },
            {
                name: this.$t("notice.menu[3]"),
                value: "3"
            },
            {
                name: this.$t("notice.menu[4]"),
                value: "4"
            },
            {
                name: this.$t("notice.menu[5]"),
                value: "5"
            }];
        }
    },
    created() {
        this.getNotices();
    },
    methods: {
        getNotices() {
            this.$http.post('/user/message/withpaginglist', {
                messageType: this.activeMenu > 0 ? this.activeMenu : null,
                pageNum: this.page.pageNum,
                pageSize: this.page.pageSize
            }).then(res => {
                if (res.iworkuCode == 200) {
                    this.page.pageNum > 1 ? this.noticeList.push(res.datas) : this.noticeList = res.datas;
                    this.page.total = res.total; 
                    this.page.totalPage = res.pages;
                }
            });
        },
        /**
         *  切换菜单
         */
        onChangeMenu(item) {
            this.activeMenu = item.value;
            this.page.pageNum = 1;
            this.getNotices();
        },
        /**
         *  滚动加载
         */
        scrollLoad() {
            this.page.pageNum += 1;
            if (this.page.pageNum <= this.page.totalPage) {
                this.getNotices();
            }
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
