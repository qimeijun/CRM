<template>
  <div class="iworku-card workbench-briefreport">
    <div class="briefreport_top">
      <h3>日程简报</h3>
      <div>
        <el-button type="text">全部日志</el-button>
      </div>
      <el-button class="top_button" @click="dialogFormVisible = true">提交日志</el-button>
      <el-dialog title="添加日志" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="dateForm" label-position="left" label-width="80px">
          <!-- 项目名称 start -->
          <el-form-item label="项目名称">
            <el-input v-model="dateForm.title" placeholder="请输入日程内容"></el-input>
          </el-form-item>
          <!-- 项目名称 end -->
          <!-- 类型 start -->
          <el-form-item label="类型">
            <el-select v-model="dateForm.remind" placeholder>
              <el-option
                v-for="item in remindTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 类型 end -->
          <!-- 目标公司 start -->
          <el-form-item label="目标公司">
            <el-select v-model="dateForm.remind" placeholder="选择目标公司">
              <el-option
                v-for="item in remindTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 目标公司 end -->
          <!-- 日志标题 start -->
          <el-form-item label="日志标题">
            <el-input v-model="dateForm.title" placeholder="日志标题"></el-input>
          </el-form-item>
          <!-- 日志标题 end -->
          <!-- 工作描述 start -->
          <el-form-item label="工作描述">
            <el-input type="textarea" v-model="dateForm.title" placeholder="请输入日志内容"></el-input>
          </el-form-item>
          <!-- 工作描述 end -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 日程列表 -->
    <div class="briefreport_list">
      <el-scrollbar
        style="height:100%;"
      >
        <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <div class="briefreport_list_item" v-for="(item,index) in list" :key="index">
            <i :style="'background-color:'+item.color">{{item.type}}</i>
            <div class="item_img">
              <el-avatar size="medium" :src="'https://vodcn.iworku.com/'+item.img"></el-avatar>
              <!-- <img :src="'https://vodcn.iworku.com/'+item.img" alt /> -->
              <br />
              <span>{{item.name}}</span>
            </div>
            <p class="item_p">
              <span>{{item.title}}</span>
              <br />
              <span>{{item.time.start}}-{{item.time.end}},添加人:{{item.people}}</span>
            </p>
          </div>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          color: "#31376DFF",
          type: "日报",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#E50054FF",
          type: "订单",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#8D43FFFF",
          type: "月报",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#4937EAFF",
          type: "周报",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#31376DFF",
          type: "日报",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#31376DFF",
          type: "日报",
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          title: "拜访 Công ty TNHH Ngư",
          time: { start: "2019/04/30", end: "2019/05/04" },
          people: "Gary.P"
        },
        {
          color: "#31376DFF",
          type: "日报",
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
          label: "目标公司1"
        },
        {
          value: "选项2",
          label: "目标公司2"
        },
        {
          value: "选项3",
          label: "目标公司3"
        }
      ],
      colorTypes: [
        {
          value: "#D50000FF",
          label: "红",
          color: "#D50000FF"
        },
        {
          value: "#FF6D00FF",
          label: "橙",
          color: "#FF6D00FF"
        },
        {
          value: "#FFEA00FF",
          label: "黄",
          color: "#FFEA00FF"
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
          color: "#31376DFF",
          type: "日报",
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
      height: 62px;
      display: flex;
      align-items: center;
      overflow: hidden;
      margin-bottom: 5px;
      i {
        height: 100%;
        writing-mode: tb-rl;
        text-align: center;
        font-style: normal;
        color: white;
        font-size: 16px;
        font-weight: 500;
        padding: 0 7px;
        letter-spacing: 4px;
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