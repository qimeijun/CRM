<template>
  <!-- 日志简报 -->
  <div class="iworku-card workbench-briefreport">
    <div class="briefreport_top">
      <h3>{{$t("workBench.briefreport.title")}}</h3>
      <div>
        <el-button
          type="text"
          @click="goPath(`/project/detail/diary/${itemid}/${adminId}`)"
        >{{$t("workBench.briefreport.btn.all")}}</el-button>
      </div>
      <el-button
        v-show="itemStatus!=2"
        class="top_button"
        @click="addWorkDiaryDialogVisible = true"
      >{{$t("workBench.briefreport.btn.submit")}}</el-button>
      <!--  -->
      <el-dialog
        :visible.sync="addWorkDiaryDialogVisible"
        class="el-dialog__scroll"
        :title="$t('workDiary.add')"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        :width="$global.dialogWidth"
        @close="cleanComponents"
      >
        <el-scrollbar class="scrollbar">
          <AddWorkDiary 
            ref="add-work-diary"
            type="project"
            :id="itemid"
            @onOperateSuccess="addWorkDiaryDialogVisible=false;getBriefReport(itemid,1);"
          ></AddWorkDiary>
        </el-scrollbar>
      </el-dialog>
    </div>
    <!-- 日程列表 start-->
    <div class="briefreport_list">
      <el-scrollbar style="height:100%;">
        <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <div class="briefreport_list_item" v-for="(item,index) in list" :key="index" @click="goPath(`/project/detail/diary/${itemid}/${adminId}`)">
            <i :style="`background-color: ${diaryTypeColors[parseInt(item.followNodeType) - 1]}`">
              <template v-if="item.followNodeType == '1'">{{ $t('workDiary.diarType.daily') }}</template>
              <template v-else-if="item.followNodeType == '2'">{{ $t('workDiary.diarType.weekly') }}</template>
              <template
                v-else-if="item.followNodeType == '3'"
              >{{ $t('workDiary.diarType.monthly') }}</template>
              <template v-else-if="item.followNodeType == '4'">{{ $t('workDiary.diarType.order') }}</template>
            </i>
            <div class="item_img">
              <el-avatar size="medium">
                <img
                  v-if="item.followAddUserProfileImage"
                  style="object-fit: cover;"
                  :src="`${$global.avatarURI}${item.followAddUserProfileImage}`"
                />
                <span
                  v-else
                  style="color:white; font-size:18px;line-height:32px;"
                >{{$lang==$global.lang.en?item.followAddUserNameEn.slice("")[0]:item.followAddUserNameZh.slice("")[0]}}</span>
              </el-avatar>
              <br />
              <span>{{$lang==$global.lang.en?item.followAddUserNameEn:item.followAddUserNameZh}}</span>
            </div>
            <p class="item_p">
              <span>{{item.followTitle}}</span>
              <br />
              <span>{{$global.localTime({time:item.followAddTimeStr,hour:true})}}</span>
            </p>
          </div>
          <p v-if="loading">{{$t("workBench.briefreport.loading")}}</p>
          <p v-if="noMore">{{$t("workBench.briefreport.noMore")}}</p>
        </div>
      </el-scrollbar>
    </div>
    <!-- 日程列表 end-->
  </div>
</template>
<script>
import AddWorkDiary from "@/components/work/AddWorkDiary.vue";
export default {
  components: {
    AddWorkDiary
  },
  props: {
    itemid: {
      type: String,
      default() {
        return "";
      }
    },
    adminId: {
      type: String,
      default() {
        return "";
      }
    },
    itemStatus: {
      type: String,
      default() {
        return "2";
      }
    }
  },
  data() {
    return {
      diaryTypeColors: ["#31376D", "#4937EA", "#8D43FF", "#E50054"],
      list: [],
      addWorkDiaryDialogVisible: false,
      page: 1,
      loading: false,
      noMore: false
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    }
  },
  watch: {
    itemid: function(newVal) {
      if (newVal) {
        this.list = [];
        this.getBriefReport(newVal, 1);
      }
    }
  },
  methods: {
    getBriefReport(id, page) {
      this.$http
        .post("/customer/followup/info/withpaginglist", {
          followItemId: id,
          pageNum: page,
          pageSize: 6
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            page > 1 ? this.list.push(...res.datas) : (this.list = res.datas);
            this.list.filter(o => {
              return o.followNodeType < 5;
            });
            this.loading = false;
            this.page = page + 1;
            if (res.datas.length < 6) {
              this.noMore = true;
            }
          }
        });
    },
    load() {
      this.loading = true;
      if (this.itemid) {
        this.getBriefReport(this.itemid, this.page);
      } else {
        this.loading = false;
      }
    },
    goPath(path) {
      this.$router.push({ path });
    },
    // 添加日志成功回调
    onOperateSuccess() {
      this.addWorkDiaryDialogVisible = false;
      this.getBriefReport(this.itemid, 1);
    },
    /**
     * 清空子组件的表单
     */
    cleanComponents() {
      this.$refs['add-work-diary'].onResetForm();
      this.addWorkDiaryDialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.workbench-briefreport {
  .briefreport_top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .top_button {
      background-color: $--default-color;
      color: white;
    }
    div {
      flex-grow: 2;
      margin-left: 10px;
    }
  }
  .briefreport_list {
    height: 370px;
    .briefreport_list_item {
      background-color: $--default-list-gray;
      border-radius: 8px;
      height: 70px;
      display: flex;
      align-items: center;
      overflow: hidden;
      margin-bottom: 5px;
      cursor:pointer;
      i {
        height: 100%;
        writing-mode: tb-rl;
        text-align: center;
        font-style: normal;
        color: white;
        font-size: 16px;
        font-weight: 500;
        padding: 0 7px;
      }
    }
    .item_img {
      text-align: center;
      margin: 0 12px;
      width: 100px;
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