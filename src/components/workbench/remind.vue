<template>
<!-- 日程提醒 -->
  <div class="iworku-card workbench-remind">
    <div class="remind_top">
      <h3>{{$t("workBench.remind.title")}}</h3>
      <el-button class="top_button" @click="dialogFormVisible = true">{{$t("workBench.remind.add")}}</el-button>
      <!-- 添加表单 -->
      <el-dialog :title="$t('workBench.remind.dialogTitle')" :visible.sync="dialogFormVisible" width="30%">
        <AddRemind></AddRemind>
      </el-dialog>
    </div>
    <!-- 日程列表 -->
    <div class="remind_list">
      <el-scrollbar style="height:100%;">
        <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <div class="remind_list_item" v-for="(item,index) in list" :key="index">
            <i :style="'background-color:'+item.color"></i>
            <div class="item_img">
              <el-avatar size="medium" :src="'https://vodcn.iworku.com/'+item.img"></el-avatar>
              <!-- <img :src="'https://vodcn.iworku.com/'+item.img" alt /> -->
              <br />
              <span>{{item.name}}</span>
            </div>
            <p class="item_p">
              <span>{{item.title}}</span>
              <br />
              <span>{{item.time.start}}-{{item.time.end}}，{{$t("workBench.remind.addPeople")}}：{{item.people}}</span>
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
  components:{
    AddRemind:()=>import("@/components/workbench/AddRemind.vue")
  },
  data() {
    return {
      list: [
        {
          color: "#00C853FF",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#FFEA00FF",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#FF6D00FF",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#D50000FF",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#00C853FF",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#00C853FF",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#00C853FF",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        }
      ],
      remindTypes: [
        {
          value: "选项1",
          label: "不提醒"
        },
        {
          value: "选项2",
          label: "提前一天"
        },
        {
          value: "选项3",
          label: "提前两天"
        }
      ],
      colorTypes: [
        {
          value: "#D50000FF",
          label: "重要且紧急",
          color: "#D50000FF"
        },
        {
          value: "#FF6D00FF",
          label: "重要不紧急",
          color: "#FF6D00FF"
        },
        {
          value: "#FFEA00FF",
          label: "不紧急",
          color: "#FFEA00FF"
        },
        {
          value: "#00C853FF",
          label: "不重要",
          color: "#00C853FF"
        }
      ],
      dialogFormVisible: false,
      dateForm: {
        title: "",
        color: "#D50000FF",
        time: [],
        email: "",
        remind: ""
      },
      count: 1,
      loading: false
    };
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
    getdate(event) {
      console.log(event);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.list.push({
          color: "#00C853FF",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: this.count++,
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        });
        this.loading = false;
      }, 2000);
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
