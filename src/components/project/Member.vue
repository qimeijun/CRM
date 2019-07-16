<template>
  <div class="iworku-card project-detail-member">
    <div class="member_top">
      <h3>工作成员</h3>
      <span>共{{memberlist.length}}人</span>
    </div>
    <div class="member_list" v-for="(item, index) in memberlist" :key="'member'+index">
      <i :style="'background-color:'+item.color">{{item.type}}</i>
      <p class="list_img">
        <el-avatar size="medium" :src="'https://vodcn.iworku.com/'+item.img"></el-avatar>
        <br />
        <span>{{item.name}}</span>
      </p>
      <div class="list_div">
        <p>
          <span>{{item.number}}</span> 家
          <br />
          <span>目标公司</span>
        </p>
        <p>
          <span>{{item.day}}</span> 天
          <br />
          <span>进行时间</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      memberlist: [
        {
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          color: "#E50054",
          type: "区域经理",
          number: "123",
          day: "321"
        },
        {
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          color: "#FF6D00",
          type: "项目经理",
          number: "123",
          day: "321"
        },
        {
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          color: "#00C853",
          type: "普通成员",
          number: "123",
          day: "321"
        },
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.project-detail-member {
  min-height: 170px;
  .member_top {
    display: flex;
    align-items: center;
    margin-bottom:15px;
    h3 {
      margin: 0;
    }
    span{
      margin-left: 10px;
      color: rgba(123, 123, 123, 1);
      font-size: 12px;
    }
  }
  .member_list {
    display: flex;
    align-items: center;
    height: 75px;
    border-radius: 8px;
    overflow: hidden;
    background-color: $--default-list-gray;
    margin-bottom:5px;
    i {
      height: 100%;
      writing-mode: tb-rl;
      text-align: center;
      font-style: normal;
      color: white;
      font-size: 12px;
      font-weight: 500;
      padding: 0 7px;
      letter-spacing: 2px;
    }
    .list_img {
      text-align: center;
      margin: 0 20px;
      font-size: 12px;
    }
    .list_div {
      display: flex;
      justify-content: space-around;
      flex-grow: 2;
      font-size: 12px;
      font-weight: 500;
      color: rgba(123, 123, 123, 1);
      line-height: 17px;
      p :first-of-type {
        font-size: 18px;
        font-weight: 500;
        color: rgba(30, 30, 30, 1);
        line-height: 25px;
      }
    }
  }
}
</style>