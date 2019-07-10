<template>
  <div class="iworku-card workbench-calendar">
    <div class="calendar_top">
      <h3>日程安排</h3>
    </div>

    <div class="calendar_content">
      <el-calendar :first-day-of-week="7">
        <template #dateCell="{date, data}">
          <p @click="getDate(data)">
            <span style="line-height:20px;">{{ data.day.split('-').slice(1).join('-') }}</span>
            <span
              v-for="(item,index) in firstlist"
              :key="'first'+index"
              :style="data.day>=item.start&&data.day<=item.end?'background-color:'+item.color:''"
              :class="[data.day>=item.start&&data.day<=item.end? 'time--selected ' :firstlist[index+1]&&data.day<firstlist[index+1].start?'time--blank':'',data.day==item.start?'time--start':'',data.day==item.end?'time--end':'']"
            >
              <!-- 第一行备注弹出框 start -->
              <el-popover
                v-if="data.day==item.start"
                placement="bottom"
                width="300"
                trigger="click"
              >
                <p>
                  <i class="el-icon-date calendar_icon"></i>
                  <span>{{item.start}}-{{item.end}}</span>
                </p>
                <p>
                  <i class="el-icon-tickets calendar_icon"></i>
                  <i class="calendar_dot" :style="'background-color:'+item.color"></i>
                  <span>{{item.title}}</span>
                </p>
                <div style="text-align:right;">
                  <el-button type="text">编辑</el-button>
                  <el-button type="text">删除</el-button>
                </div>
                <span slot="reference">{{item.title}}</span>
              </el-popover>
              <!-- 第一行备注弹出框 end -->
            </span>
            <span
              v-for="(item,index) in secondlist"
              :key="'second'+index"
              :style="data.day>=item.start&&data.day<=item.end?'background-color:'+item.color:''"
              :class="[data.day>=item.start&&data.day<=item.end? 'time--selected ' : '',data.day==item.start?'time--start':'',data.day==item.end?'time--end':'']"
            >
              <!-- 第二行备注弹出框 start -->
              <el-popover
                v-if="data.day==item.start"
                placement="bottom"
                width="300"
                trigger="click"
              >
                <p>
                  <i class="el-icon-date calendar_icon"></i>
                  <span>{{item.start}}-{{item.end}}</span>
                </p>
                <p>
                  <i class="el-icon-tickets calendar_icon"></i>
                  <i class="calendar_dot" :style="'background-color:'+item.color"></i>
                  <span>{{item.title}}</span>
                </p>
                <div style="text-align:right;">
                  <el-button type="text">编辑</el-button>
                  <el-button type="text">删除</el-button>
                </div>
                <span slot="reference">{{item.title}}</span>
              </el-popover>
              <!-- 第二行备注弹出框 end -->
            </span>
            <!-- 隐藏的提醒按钮弹出框 start -->
            <el-popover
              v-if="getSurplus(data.day).length"
              placement="right"
              width="200"
              trigger="click"
            >
              <!-- 详情弹出框 start -->
              <el-popover
                v-for="(item,index) in getSurplus(data.day)"
                :key="'surplus'+index"
                placement="bottom"
                width="300"
                trigger="click"
              >
                <p>
                  <i class="el-icon-date calendar_icon"></i>
                  <span>{{item.start}}-{{item.end}}</span>
                </p>
                <p>
                  <i class="el-icon-tickets calendar_icon"></i>
                  <i class="calendar_dot" :style="'background-color:'+item.color"></i>
                  <span>{{item.title}}</span>
                </p>
                <div style="text-align:right;">
                  <el-button type="text">编辑</el-button>
                  <el-button type="text">删除</el-button>
                </div>
                <p slot="reference">
                  <i class="calendar_dot" :style="'background-color:'+item.color"></i>
                  <el-button type="text">{{item.title}}</el-button>
                </p>
              </el-popover>
              <!-- 详情弹出框 end -->
              <el-button type="text" slot="reference">还有{{getSurplus(data.day).length}}项...</el-button>
            </el-popover>
            <!-- 隐藏的提醒按钮 end -->
          </p>
        </template>
      </el-calendar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datelist: [
        {
          color: "#E50054FF",
          start: "2019-07-23",
          end: "2019-07-24",
          title: "拜访1"
        },
        {
          color: "#E50054FF",
          start: "2019-07-24",
          end: "2019-07-25",
          title: "拜访2"
        },
        {
          color: "#4937EAFF",
          start: "2019-07-26",
          end: "2019-07-28",
          title: "拜访3"
        },
        {
          color: "#4937EAFF",
          start: "2019-07-26",
          end: "2019-07-27",
          title: "拜访4"
        },
        {
          color: "#E50054FF",
          start: "2019-07-25",
          end: "2019-07-26",
          title: "拜访5"
        }
      ],
      secondlist: [],
      firstlist: [],
      list: []
    };
  },
  created() {
    let listobj = this.filtDateList(this.datelist);
    this.firstlist = listobj.first;
    this.secondlist = listobj.second;
    this.list = listobj.list;
  },
  methods: {
    //   打开隐藏备注
    getDate(date) {},
    // 数据筛分
    filtDateList(data) {
      let list = [];
      let first = [];
      let second = [];
      let endA = "";
      let endB = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i].start > endA) {
          first.push(data[i]);
          endA = data[i].end;
        } else if (data[i].start > endB) {
          second.push(data[i]);
          endB = data[i].end;
        } else {
          list.push(data[i]);
        }
      }
      return { first, second, list };
    },
    // 查询剩余个数
    getSurplus(date) {
      let list = this.list.filter(o => {
        if (o.start == date) {
          return o;
        }
      });
      return list;
    }
  }
};
</script>

<style lang="scss" scoped>
// .workbench-calendar{
//     height: 400px;
// }
.calendar_content {
  .time--selected {
    background-color: #1989fa;
    // width: 100%;
    width: calc(100% + 17px);
    height: 28px;
    display: block;
    padding: 4px 0;
    color: white;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: -8px;
    box-sizing: border-box;
    margin-bottom: 4px;
  }
  .time--start {
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    width: calc(100% + 9px);
    margin-left: 0px;
    padding-left: 10px;
  }
  .time--end {
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    margin-right: 8px;
    width: calc(100% + 8px);
  }
  .time--blank {
    height: 28px;
    display: block;
    margin-bottom: 4px;
  }
}
.calendar_dot {
  margin-right: 10px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.calendar_icon {
  margin-right: 10px;
  font-size: 16px;
}
</style>
<style>
.calendar_content .el-calendar-table .el-calendar-day {
  height: 140px;
}
</style>