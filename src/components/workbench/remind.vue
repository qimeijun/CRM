<template>
  <div class="iworku-card iworku-remind">
    <div class="remind_top">
      <h3>日程提醒</h3>
      <el-button class="top_button">添加提醒</el-button>
    </div>
    <!-- 日程列表 -->
    <div class="remind_list">
      <div class="remind_list_item" v-for="(item,index) in list" :key="index">
        <i :style="'background-color:'+item.color"></i>
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
        },
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.iworku-remind {
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
    max-height:370px;
    margin-right: -10px;
    overflow-y: scroll;
    .remind_list_item {
      background-color: $--default-list-gray;
      border-radius: 8px;
      height: 62px;
      display: flex;
      align-items: center;
      overflow: hidden;
      margin-bottom:5px;
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