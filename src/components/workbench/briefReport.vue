<template>
  <div class="iworku-card iworku-briefreport">
    <div class="briefreport_top">
      <h3>日程简报</h3>
      <el-button type="text">全部日志</el-button>
      <el-button class="top_button">提交日志</el-button>
    </div>
    <!-- 日程列表 -->
    <div class="briefreport_list">
      <div class="briefreport_list_item" v-for="(item,index) in list" :key="index">
        <i :style="'background-color:'+item.color">{{item.type}}</i>
        <div class="item_img">
          <img :src="'https://vodcn.iworku.com/'+item.img" alt />
          <br />
          <span>{{item.name}}</span>
        </div>
        <p class="item_p">
          <span>{{item.title}}</span>
          <br />
          <span>{{item.time.start}}-{{item.time.end}},添加人:{{item.people}}</span>
        </p>
      </div>
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
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.iworku-briefreport {
  .briefreport_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top_button {
      background-color: $--default-color;
      color: white;
    }
  }
  .briefreport_list {
    max-height: 370px;
    margin-right: -10px;
    overflow-y: scroll;
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
        letter-spacing:4px;
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