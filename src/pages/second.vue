<template>
  <div class="content">
    <h2>{{ $t("second") }}</h2>
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template #dateCell="{date, data}">
        <p @click="getDate(data)">
          <span style="line-height:20px;">{{ data.day.split('-').slice(1).join('-') }}</span>

          <span v-for="(item,index) in dateList" :key="index"
            :class="[data.day>=item.start&&data.day<=item.end? 'time--selected ' : '',data.day==item.start?'time--start':'',data.day==item.end?'time--end':'']"
          >{{data.day==item.start?'1231231231233333333333333333222222222222222222222222222':''}}</span>
        <span v-if="dateList.length-2">还有{{dateList.length-2}}条</span>
        </p>
      </template>
    </el-calendar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dateList: [{
        start: "2019-07-23",
        end: "2019-07-24"
      },
       {
        start: "2019-07-24",
        end: "2019-07-25"
      },
    //   {
    //     start: "2019-07-24",
    //     end: "2019-07-25"
    //   }
      ]
    };
  },
  methods: {
    getDate(date) {
      console.log(date);
    },
  }
};
</script>

<style lang="scss" scoped>
.content {
  h2 {
    margin-top: 0.3rem;
    color: $--default-color;
  }
  .time--selected {
    background-color: #1989fa;
    // width: 100%;
    width:calc(100% + 17px);
    height: 28px;
    display: block;
    padding:4px 0;
    color:white;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left:-8px;
    box-sizing: border-box;
    margin-bottom:4px;

  }
  .time--start {
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    width:calc(100% + 9px);
    margin-left:0px;
    padding-left: 10px;
  }
  .time--end {
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    margin-right:8px;
     width:calc(100% + 8px);
  }
 
}
</style>
<style>
     .content .el-calendar-table .el-calendar-day{
      height: 150px;
  }
</style>
