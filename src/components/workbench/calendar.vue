<template>
  <!-- 日程安排日历 -->
  <div class="iworku-card workbench-calendar">
    <div class="calendar_top">
      <h3>{{$t("workBench.calendar.title")}}</h3>
    </div>
    <div class="calendar_content">
      <el-calendar :first-day-of-week="7" v-model="calenderValue">
        <template #dateCell="{date, data}">
          <p @click.self="addRemindVisibleDialog=true;currentRemind={scheduleBeginDate:data.day};" style="height:100%;">
            <span style="line-height:20px;">{{ $lang==$global.lang.en?data.day.split('-').slice(1).join('month'):data.day.split('-').slice(1).join('月')}}{{$lang==$global.lang.en?'day':'日'}}</span>
  
            <span
              v-if="filterList(firstlist,data).length>0"
              :style="'background-color:'+filterList(firstlist,data)[0].scheduleShowColour"
              :class="['time--selected',data.day==filterList(firstlist,data)[0].scheduleBeginDate?'time--start':'',data.day==filterList(firstlist,data)[0].scheduleEndDate?'time--end':'']"
            >
              <!-- 第一行备注弹出框 start -->
              <el-popover
                v-if="data.day==filterList(firstlist,data)[0].scheduleBeginDate"
                placement="bottom"
                width="300"
                trigger="click"
              >
                <p>
                  <i class="el-icon-date calendar_icon"></i>
                  <span>{{filterList(firstlist,data)[0].scheduleBeginDate}}-{{filterList(firstlist,data)[0].scheduleEndDate}}</span>
                </p>
                <p>
                  <i class="el-icon-tickets calendar_icon"></i>
                  <i
                    class="calendar_dot"
                    :style="'background-color:'+filterList(firstlist,data)[0].scheduleShowColour"
                  ></i>
                  <span>{{filterList(firstlist,data)[0].scheduleContent}}</span>
                </p>
                <div style="text-align:right;">
                  <el-button
                    type="text"
                    @click="modifyRemindVisibleDialog=true;currentRemind=filterList(firstlist,data)[0];"
                  >{{$t("workBench.calendar.btn.redact")}}</el-button>
                  <el-button
                    type="text"
                    @click="onDeleteReminder(filterList(firstlist,data)[0])"
                  >{{$t("workBench.calendar.btn.delete")}}</el-button>
                </div>
                <span slot="reference">{{filterList(firstlist,data)[0].scheduleContent}}</span>
              </el-popover>
              <!-- 第一行备注弹出框 end -->
            </span>
            <span v-else class="time--blank"></span>
            <span
              v-for="(item,index) in secondlist"
              :key="'second'+index"
              :style="data.day>=item.scheduleBeginDate&&data.day<=item.scheduleEndDate?'background-color:'+item.scheduleShowColour:''"
              :class="[data.day>=item.scheduleBeginDate&&data.day<=item.scheduleEndDate? 'time--selected ' : '',data.day==item.scheduleBeginDate?'time--start':'',data.day==item.scheduleEndDate?'time--end':'']"
            >
              <!-- 第二行备注弹出框 start -->
              <el-popover
                v-if="data.day==item.scheduleBeginDate"
                placement="bottom"
                width="300"
                trigger="click"
              >
                <p>
                  <i class="el-icon-date calendar_icon"></i>
                  <span>{{item.scheduleBeginDate}}-{{item.scheduleEndDate}}</span>
                </p>
                <p>
                  <i class="el-icon-tickets calendar_icon"></i>
                  <i class="calendar_dot" :style="'background-color:'+item.scheduleShowColour"></i>
                  <span>{{item.scheduleContent}}</span>
                </p>
                <div style="text-align:right;">
                  <el-button
                    type="text"
                    @click="modifyRemindVisibleDialog=true;currentRemind=item;"
                  >{{$t("workBench.calendar.btn.redact")}}</el-button>
                  <el-button
                    type="text"
                    @click="onDeleteReminder(item)"
                  >{{$t("workBench.calendar.btn.delete")}}</el-button>
                </div>
                <span slot="reference">{{item.scheduleContent}}</span>
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
                  <span>{{item.scheduleBeginDate}}-{{item.scheduleEndDate}}</span>
                </p>
                <p>
                  <i class="el-icon-tickets calendar_icon"></i>
                  <i class="calendar_dot" :style="'background-color:'+item.scheduleShowColour"></i>
                  <span>{{item.scheduleContent}}</span>
                </p>
                <div style="text-align:right;">
                  <el-button
                    type="text"
                    @click="modifyRemindVisibleDialog=true;currentRemind=item;"
                  >{{$t("workBench.calendar.btn.redact")}}</el-button>
                  <el-button
                    type="text"
                    @click="onDeleteReminder(item)"
                  >{{$t("workBench.calendar.btn.delete")}}</el-button>
                </div>
                <p slot="reference">
                  <i class="calendar_dot" :style="'background-color:'+item.scheduleShowColour"></i>
                  <el-button type="text">{{item.scheduleContent}}</el-button>
                </p>
              </el-popover>
              <!-- 详情弹出框 end -->
              <el-button type="text" slot="reference">{{$t("workBench.calendar.remaining",{number:getSurplus(data.day).length})}}</el-button>
            </el-popover>
            <!-- 隐藏的提醒按钮 end -->
          </p>
        </template>
      </el-calendar>
    </div>

    <!-- 修改表单 -->
    <el-dialog
      :title="$t('workBench.remind.modify')"
      :visible.sync="modifyRemindVisibleDialog"
      :close-on-click-modal="false"
      width="30%"
    >
      <ModifyRemind :itemid="itemid" :remindInfo="currentRemind" @onSuccess="onModifySuccess"></ModifyRemind>
    </el-dialog>
    <!-- 添加表单 -->
    <el-dialog
        :title="$t('workBench.remind.dialogTitle')"
      :visible.sync="addRemindVisibleDialog"
      :close-on-click-modal="false"
      width="30%"
    >
      <ModifyRemind :itemid="itemid" @onSuccess="onModifySuccess"></ModifyRemind>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    itemid: {
      type: String,
      default() {
        return "";
      }
    }
  },
  components: {
    ModifyRemind: () => import("@/components/workbench/AddRemind.vue")
  },
  data() {
    return {
      datelist: [],
      calenderValue: new Date(),
      secondlist: [],
      firstlist: [],
      list: [],
      modifyRemindVisibleDialog: false,
      addRemindVisibleDialog: false,
      currentRemind: {}
    };
  },
  created() {
    // let listobj = this.filtDateList(this.datelist);
    // this.firstlist = listobj.first;
    // this.secondlist = listobj.second;
    // this.list = listobj.list;
  },
  methods: {
    // 根据日期获取日程提醒 list
    getScheduleByDate() {
      let month = this.calenderValue.getMonth() + 1;
      month < 10 ? (month = `0${month}`) : null;
      this.$http
        .post("/user/workbench/schedule/withoutpaginglist", {
          scheduleDate: `${this.calenderValue.getFullYear()}-${month}`,
          scheduleDatePattern: "yyyy-MM",
          sortname: "schedule_begin_date"
        })
        .then(res => {
          if (res.iworkuCode == 200 && res.datas) {
            let listobj = this.filtDateList(res.datas);
            this.firstlist = listobj.first;
            this.secondlist = listobj.second;
            this.list = listobj.list;
          }
        });
    },
    // 数据筛分
    filtDateList(data) {
      let list = [];
      let first = [];
      let second = [];
      let endA = "";
      let endB = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i].scheduleBeginDate > endA) {
          first.push(data[i]);
          endA = data[i].scheduleEndDate;
        } else if (data[i].scheduleBeginDate > endB) {
          second.push(data[i]);
          endB = data[i].scheduleEndDate;
        } else {
          list.push(data[i]);
        }
      }
      return { first, second, list };
    },
    // 查询剩余个数
    getSurplus(date) {
      let list = this.list.filter(o => {
        if (o.scheduleBeginDate == date) {
          return o;
        }
      });
      return list;
    },
    /**
     *  修改成功
     */
    onModifySuccess(data) {
      this.getScheduleByDate();
      this.modifyRemindVisibleDialog=false;
      this.addRemindVisibleDialog=false;
    },
    // 删除日程
    onDeleteReminder(item) {
      if (item.id) {
        this.$http
          .post("/user/workbench/workbench/delete", { id: item.id })
          .then(res => {
            if (res.iworkuCode == 200) {
              this.$imessage({
                content: this.$t("public.tips.success"),
                type: "success"
              });
              // 重新查询数据
              this.getScheduleByDate();
            }
          });
      }
    },
    filterList(array, data) {
      let list = array.filter(o => {
        return data.day >= o.scheduleBeginDate && data.day <= o.scheduleEndDate;
      });
      return list;
    }
  },
  watch: {
    calenderValue: {
      handler(newVal) {
        this.getScheduleByDate();
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar_content {
  .time--selected {
    background-color: #1989fa;
    // width: 100%;
    width: calc(100% + 24px);
    height: 28px;
    display: block;
    padding: 4px 0;
    color: white;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: -12px;
    box-sizing: border-box;
    margin-bottom: 4px;
  }
  .time--start {
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    width: calc(100% + 12px);
    margin-left: 0px;
    padding-left: 10px;
  }
  .time--end {
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    margin-right: 10px;
    width: calc(100% - 10px);
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
  background-color: #f0f0f0ff;
  margin: 4px;
  border-radius: 8px;
}
.calendar_content .el-calendar-table td {
  border: 0 !important;
}
.calendar_content .prev {
  pointer-events: none;
}
.calendar_content .next{
  pointer-events: none;
}
</style>