<template>
  <!-- 添加日程提醒 -->
  <div class="workbench-addremind">
    <el-form :model="dateForm" :rules="rules" label-position="left" label-width="80px" ref="dateForm">
      <!-- 提醒内容 start -->
      <el-form-item label-width="0px" prop="scheduleContent">
        <el-input
          v-model="dateForm.scheduleContent"
          :placeholder="$t('workBench.addremind.placeholder.content')"
        ></el-input>
      </el-form-item>
      <!-- 提醒内容 end -->
      <!-- 标记颜色 start -->
      <el-form-item label-width="0px">
        <el-radio-group v-model="dateForm.scheduleShowColour" @change="onChangeColor">
          <el-tooltip
            v-for="item in colorTypes"
            :key="item.id"
            effect="dark"
            :content="$lang==$global.lang.en?item.nameEn:item.nameZh"
            placement="top"
          >
            <el-radio-button
              :label="item.value"
              :value="item.value"
              :style="'background-color:'+ item.value"
              class="addremind_form_color"
            >
              <i v-if="dateForm.scheduleShowColour == item.value" class="el-icon-check"></i>
              <span v-else>&nbsp;</span>
            </el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </el-form-item>
      <!-- 标记颜色 end -->
      <!-- 起止日期 start -->
      <el-form-item :label="$t('workBench.addremind.form.date')" prop="time">
        <el-date-picker
          v-model="dateForm.time"
          type="daterange"
          range-separator="至"
          :start-placeholder="$t('workBench.addremind.placeholder.startDate')"
          :end-placeholder="$t('workBench.addremind.placeholder.endDate')"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <!-- 起止日期 end -->
      <!-- 提醒方式 start -->
      <el-form-item :label="$t('workBench.addremind.form.remindTime')" prop="remind">
        <el-select
          v-model="dateForm.remind"
          :placeholder="$t('workBench.addremind.placeholder.remindTime')"
        >
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
      <el-form-item :label="$t('workBench.addremind.form.email')" prop="scheduleNoticeEmail">
        <el-input
          v-model="dateForm.scheduleNoticeEmail"
          :placeholder="$t('workBench.addremind.placeholder.email')"
        ></el-input>
      </el-form-item>
      <!-- 邮箱 end -->
      <!-- 目标公司 start -->
      <el-form-item :label="$t('workBench.addremind.form.target')" prop="targetCompanyId">
        <el-select v-model="dateForm.targetCompanyId" @change="onChangeTarget" :placeholder="'选择目标公司'">
          <template v-if="targetList && targetList.length > 0">
            <el-option
              v-for="item in targetList"
              :key="item.id"
              :label="item.targetCompanyName"
              :value="item.id"
            ></el-option>
          </template>
        </el-select>
      </el-form-item>
      <!-- 目标公司 end -->
      <!-- 参与人员 start -->
      <el-form-item :label="$t('workBench.addremind.form.people')" prop="selectUsers">
        <div style="display: flex;justify-content: flex-start;">
        <div v-for="(item, index) in dateForm.selectUsers" class="notify-user " :key="index">
          <el-image
          class="avatar"
          :title="item.userNameZh"
          :src="`${$global.avatarURI}${item.userProfileImage}`"
          :alt="item.userNameZh"
          ></el-image>
        </div>
        <div v-if="userInfo.userRole != $global.userRole.member" class="notify-user">
          <div @click="selectUserVisibleDialog=true;" style="height: 50px; width: 50px; border-radius: 50%; border: 1px solid grey;text-align: center; cursor: pointer;">
            <i class="el-icon-plus" style="line-height: 50px; font-size: 30px; "></i>
          </div>
        </div>
        </div>
      </el-form-item>
      <!-- 参与人员 end -->
    </el-form>
    <div class="addremind_button">
      <el-button
        type="primary"
        :loading="submitBtnLoading"
        @click="onSubmit('dateForm')"
      >{{$t("workBench.addremind.save")}}</el-button>
    </div>

    <!-- 添加成员 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      title="添加提醒人"
      :visible.sync="selectUserVisibleDialog"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%"
    >
      <el-scrollbar>
        <AddNotifyUser :userId="dateForm.targetOwnerId" @getUser="getSelectUser"></AddNotifyUser>
      </el-scrollbar>
    </el-dialog>
    <!-- 添加成员 dialog end -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getRemindColor } from "@/plugins/configuration.js";
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
    AddNotifyUser: () => import("@/components/workbench/AddNotifyUser.vue"),
  },
  data() {
    return {
      remindTypes: [
        {
          value: "1",
          label: "提醒"
        },
        {
          value: "2",
          label: "不提醒"
        }
      ],
      colorTypes: [],
      targetList: [],
      dateForm: {
        scheduleContent: "",
        scheduleShowColour: "#D50000",
        time: [],
        scheduleNoticeEmail: "",
        remind: "1",
        targetCompanyId: "",
        targetOwnerId: "",
        selectUsers: []
      },
      selectUserVisibleDialog: false,
      submitBtnLoading: false,
      rules: {
        scheduleContent: [
          {
            validator: (rule, value, callback) => { 
              if (!value) {
                callback(new Error("请输入提醒内容"))
              } else {
                callback();
              }
            }
          }
        ],
        time: [
          {
            validator: (rule, value, callback) => { 
              if (value.length < 2) {
                callback(new Error("请选择起始日期"));
              } else {
                callback();
              }
            }
          }
        ],
        remind: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请选择提醒类型"));
              } else {
                callback();
              }
            }
          }
        ],
        scheduleNoticeEmail: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入邮箱"));
              } else {
                callback();
              }
            }
          }
        ],
        targetCompanyId: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请选择目标公司"));
              } else {
                callback();
              }
            }
          }
        ],
        selectUsers: [
          {
            validator: (rule, value, callback) => {
              if (!value || value.length == 0) {
                callback("请选择参与人员");
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"]),
  },
  async created() {
    this.colorTypes = await getRemindColor(this);
    // 如果不是超级管理员，那就把他自己添加进去
    if (this.userInfo.userRole != this.$global.userRole.superAdministrator) {
      this.dateForm.selectUsers = [this.userInfo];
    }
  },
  methods: {
    // 查询目标公司
    getTargetList() {
      this.$http
        .post("/target/company/withoutpaginglist", {
          id: this.itemid,
          type: 2
        })
        .then(res => {
          if (res.iworkuCode == 200 && res.datas && res.datas.length > 0) {
            this.targetList = res.datas || [];
            // 设置默认值
            this.dateForm.targetCompanyId = this.targetList[0].id;
            this.dateForm.targetOwnerId = this.targetList[0].targetCompanyUserInfo.id;
          }
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params={
            scheduleBeginDate:this.dateForm.time[0],
            scheduleEndDate:this.dateForm.time[1],
            scheduleContent:this.dateForm.scheduleContent,
            scheduleShowColour:this.dateForm.scheduleShowColour,
            scheduleType: this.dateForm.remind,
            userScheduleParticipateList:[]
          }
          this.dateForm.selectUsers.map(val => {
            params.userScheduleParticipateList.push({
              userId: val.id
            });
          });
          this.submitBtnLoading = true;
          this.$http.post('/user/workbench/schedule/save', params).then(res => {
            this.submitBtnLoading = false;
            if (res.iworkuCode == 200) {
              this.$imessage({
                content: this.$t("public.tips.success"),
                type: "success"
              });
              this.$emit("onSuccess");
            }
          });
        }
      });
    },
    /**
     *  颜色切换
     */
    onChangeColor(item) {
      this.dateForm.scheduleShowColour = item;
    },
    /**
     *  获取选择的人员
     */
    getSelectUser(data) {
      // 如果不是超级管理员，那就把他自己添加进去
      if (this.userInfo.userRole != this.$global.userRole.superAdministrator) {
        this.dateForm.selectUsers = [this.userInfo, ...data];
      } else {
        this.dateForm.selectUsers = [...data]
      }
      this.selectUserVisibleDialog = false;
    },
    /**
     *  切换目标公司
     */
    onChangeTarget(item) {
      let res = this.targetList.find(val => val.id == item);
      if (res) {
        this.dateForm.targetOwnerId = res.targetCompanyUserInfo.id;
      }
    }
  },
  watch: {
    itemid: {
      handler(newVal) {
        if (newVal) {
          this.getTargetList();
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.addremind_form_color {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 10px;
  text-align: center;
  i {
    line-height: 30px;
    color: white;
  }
  
}

.addremind_button {
  text-align: right;
}
.notify-user {
    display: inline-block;
    margin-right: 10px;
  }

</style>
<style lang="scss">
.workbench-addremind .el-radio-button__inner {
  background-color: transparent !important;
  border: 0 !important;
  border-radius: 50% !important;
  width: 30px;
  height: 30px;
  padding: 0;
  box-shadow: none !important;
  font-size: 20px;
}

.workbench-addremind {
 .avatar {
    width: 50px; 
    height: 50px; 
    border-radius: 50%;
  }
}
</style>