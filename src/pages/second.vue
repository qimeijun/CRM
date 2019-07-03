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
  created() {
    //    this.dateList.start=this.getLocalTime({time:"2019-07-23"});
    //    this.dateList.end=this.getLocalTime({time:"2019-07-26"});
  },
  methods: {
    getDate(date) {
      console.log(date);
    },
    getLocalTime: function(obj) {
      /** GLOBAL.getLocalTime({ time: '2018-10-10 10:10:10' })
       *
       * @param {*} time 当前服务器时间
       * @param {*} hyphen 连接符号 默认"-"
       * @param {*} noHour  是否返回小时分秒等时间
       * @param {*} isHour 只显示小时分
       * @param {*} isMonth 只显示月份和日期
       * @param {*} noYear 格式为 05-12 12:00:00
       * @param {*} timestamp 直接返回时间戳
       */
      // 获取浏览器UTC，转换成毫秒
      if (!obj || !obj.time) {
        return "";
      }
      let offset = -(new Date().getTimezoneOffset() * 60 * 1000);
      let serverTime = new Date(obj.time.replace(/-/g, "/")).getTime();
      // 转换成世界时间的时间戳
      let getUtcTime = new Date(serverTime + offset);
      let month =
        getUtcTime.getMonth() + 1 > 9
          ? getUtcTime.getMonth() + 1
          : `0${getUtcTime.getMonth() + 1}`;
      let date =
        getUtcTime.getDate() > 9
          ? getUtcTime.getDate()
          : `0${getUtcTime.getDate()}`;
      let hours =
        getUtcTime.getHours() > 9
          ? getUtcTime.getHours()
          : `0${getUtcTime.getHours()}`;
      let minutes =
        getUtcTime.getMinutes() > 9
          ? getUtcTime.getMinutes()
          : `0${getUtcTime.getMinutes()}`;
      let seconds =
        getUtcTime.getSeconds() > 9
          ? getUtcTime.getSeconds()
          : `0${getUtcTime.getSeconds()}`;
      let result = ``;
      if (!obj.hyphen) {
        obj.hyphen = "-";
      }
      if (obj.noHour) {
        result = `${getUtcTime.getFullYear()}${obj.hyphen}${month}${
          obj.hyphen
        }${date}`;
      } else if (obj.isHour) {
        result = `${hours}:${minutes}`;
      } else if (obj.isMonth) {
        result = `${month}${obj.hyphen}${date}`;
      } else if (obj.timestamp === true) {
        result = serverTime;
      } else if (obj.noYear) {
        result = `${month}${obj.hyphen}${date} ${hours}:${minutes}:${seconds}`;
      } else {
        result = `${getUtcTime.getFullYear()}${obj.hyphen}${month}${
          obj.hyphen
        }${date} ${hours}:${minutes}:${seconds}`;
      }
      return result;
    },
    duibi(a, b) {
    //   console.log(a,b);
      var arr = a.split("-");
      var starttime = new Date(arr[0], arr[1], arr[2]);
      var starttimes = starttime.getTime();

      var arrs = b.split("-");
      var lktime = new Date(arrs[0], arrs[1], arrs[2]);
      var lktimes = lktime.getTime();

      if (starttimes < lktimes) {
        // alert('开始时间大于离开时间，请检查');
        return false;
      } else return true;
    }
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
