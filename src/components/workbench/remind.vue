<template>
  <div class="iworku-card workbench-remind">
    <div class="remind_top">
      <h3>日程提醒</h3>
      <el-button class="top_button" @click="dialogFormVisible = true">添加提醒</el-button>
      <!-- 添加表单 -->
      <el-dialog title="添加日程提醒" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="dateForm" label-position="left" label-width="80px">
          <!-- 提醒内容 start -->
          <el-form-item label-width="0px">
            <el-input v-model="dateForm.title" placeholder="请输入日程内容"></el-input>
          </el-form-item>
          <!-- 提醒内容 end -->
          <!-- 标记颜色 start -->
          <el-form-item label-width="0px">
            <el-radio-group v-model="dateForm.color">
              <el-tooltip
                v-for="item in colorTypes"
                :key="item.value"
                class="item"
                effect="dark"
                :content="item.label"
                placement="top"
              >
                <el-radio-button
                  :label="item.value"
                  :style="'background-color:'+item.value"
                  class="top_form_color"
                >
                  <i v-if="dateForm.color===item.value" class="el-icon-check"></i>
                  <span v-else>&nbsp;</span>
                </el-radio-button>
              </el-tooltip>
            </el-radio-group>
          </el-form-item>
          <!-- 标记颜色 end -->
          <!-- 起止日期 start -->
          <el-form-item label="起止日期">
            <el-date-picker
              v-model="dateForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <!-- 起止日期 end -->
          <!-- 提醒方式 start -->
          <el-form-item label="提醒时间">
            <el-select v-model="dateForm.remind" placeholder="是否提醒">
              <el-option
                v-for="item in remindTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 提醒方式 end -->
          <!-- 邮箱 start -->
          <el-form-item label="邮箱">
            <el-input v-model="dateForm.email" placeholder="提醒内容和时间将发送至本邮箱"></el-input>
          </el-form-item>
          <!-- 邮箱 end -->
          <!-- 目标公司 start -->
          <el-form-item label="目标公司">
            <el-input v-model="dateForm.title" placeholder="请输入日程内容"></el-input>
          </el-form-item>
          <!-- 目标公司 end -->
          <!-- 参与人员 start -->
          <el-form-item label="参与人员">
            <el-input v-model="dateForm.title" placeholder="请输入日程内容"></el-input>
          </el-form-item>
          <!-- 参与人员 end -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
        </div>
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
    .top_form_color {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 0 10px;
      text-align: center;
      i {
        line-height: 30px;
      }
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
<style>
.workbench-remind .el-radio-button__inner {
  background-color: transparent !important;
  border: 0 !important;
  border-radius: 50% !important;
  width: 30px;
  height: 30px;
  padding: 0;
  box-shadow: none !important;
  font-size: 20px;
}
</style>