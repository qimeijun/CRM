<template>
  <!-- 日程提醒 -->
  <div class="iworku-card workbench-remind">
    <div class="remind_top">
      <h3>{{$t("workBench.remind.title")}}</h3>
      <el-button class="top_button" @click="dialogFormVisible = true">{{$t("workBench.remind.add")}}</el-button>
      <!-- 添加表单 -->
      <el-dialog
        :title="$t('workBench.remind.dialogTitle')"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="30%"
      >
        <AddRemind :itemid="itemid" @onSuccess="onAddSuccess"></AddRemind>
      </el-dialog>
    </div>
    <!-- 日程列表 -->
    <div class="remind_list">
      <el-scrollbar style="height:100%;">
        <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <div class="remind_list_item" v-for="(item,index) in list" :key="index">
            <i :style="'background-color:'+item.scheduleShowColour"></i>
            <div class="item_img">
              <el-avatar size="medium" >
                <img v-if="item.addUserProfileImage" style="object-fit: cover;" :src="`${$global.avatarURI}${item.addUserProfileImage}`">
                <span v-else style="color:white; font-size:18px;line-height:32px;">{{$lang == $global.lang.en ? item.addUserNameEn.slice("")[0] : item.addUserNameZh.slice("")[0]}}</span>
              </el-avatar>
              <br />
              <span>{{$lang == $global.lang.en ? item.addUserNameEn : item.addUserNameZh}}</span>
            </div>
            <p class="item_p">
              <span>{{item.scheduleContent}}</span>
              <br />
              <span>{{$global.localTime({time:item.scheduleBeginDate,hour:false})}} - {{$global.localTime({time:item.scheduleEndDate,hour:false})}}，{{$t("workBench.remind.addPeople")}}：
                <template v-if="item.sheduleParticipate && item.sheduleParticipate.length > 0">
                  <template v-for="(s, i) in item.sheduleParticipate">
                    {{ $lang == $global.lang.en ? s.userNameEn : s.userNameZh }} <i style="color: #959595;" :key="i" v-if="(i + 1) < item.sheduleParticipate.length">、</i>
                  </template>
                </template>
              </span>
            </p>
          </div>
          <p v-if="loading">{{$t("workBench.remind.loading")}}</p>
          <p v-if="noMore">{{$t("workBench.remind.noMore")}}</p>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    AddRemind: () => import("@/components/workbench/AddRemind.vue")
  },
  props: {
    itemid: {
      type: String,
      default() {
        return "";
      }
    },
      timer: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      dateForm: {
        title: "",
        color: "#D50000FF",
        time: [],
        email: "",
        remind: ""
      },
      page: {
        pageSize: 10,
        pageNum: 1,
        totalPage: 1
      },
      loading: false
    };
  },
  created() {
    this.getremindList();
  },
  computed: {
    noMore() {
      return this.list.length >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    getremindList() {
      this.$http
        .post("/user/workbench/schedule/withpaginglist", {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.loading = false;
            this.list=res.datas;
            this.page.pageNum > 1 ? this.list.push(...res.datas) : this.list = res.datas;
            this.page.totalPage = res.pages;
          }
        });
    },
    load() {
      this.page.pageNum++;
      if (this.page.totalPage >= this.page.pageNum) {
        this.loading = true;
        this.getremindList();
      } else {
        this.page.pageNum = 1;
      }
    },
    /**
     *  添加提醒成功
     */
    onAddSuccess() {
      this.dialogFormVisible = false;
      this.page.pageNum = 1;
      this.getremindList();
      this.$emit("getlist");
    }
  },
  watch: {
    itemid: {
      handler(newVal) {
        if (newVal) {
          this.getremindList();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.workbench-remind {
  .remind_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top_button {
      background-color: $--default-color;
      color: white;
    }
  }
  .remind_list {
    height: 370px;
    // overflow-y: scroll;
    .remind_list_item {
      background-color: $--default-list-gray;
      border-radius: 8px;
      height: 62px;
      display: flex;
      align-items: center;
      overflow: hidden;
      margin-bottom: 5px;
      i {
        height: 100%;
        width: 9px;
      }
    }
    .item_img {
      text-align: center;
      margin: 0 12px;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      span {
        font-size: 12px;
        font-weight: 400;
        color: rgba(154, 154, 154, 1);
        line-height: 14px;
      }
    }
    .item_p {
      :first-of-type {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 24px;
      }
      :last-of-type {
        font-size: 12px;
        font-weight: 400;
        color: rgba(149, 149, 149, 1);
        line-height: 17px;
      }
    }
  }
}
</style>
