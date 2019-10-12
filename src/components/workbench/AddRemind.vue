<template>
  <!-- 添加日程提醒 -->
  <div class="workbench-addremind">
    <el-form
      :model="dateForm"
      :rules="rules"
      label-position="left"
      label-width="80px"
      ref="dateForm"
    >
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
            :content="item.name"
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
          range-separator="-"
          :start-placeholder="$t('workBench.addremind.placeholder.startDate')"
          :end-placeholder="$t('workBench.addremind.placeholder.endDate')"
          format="yyyy / MM / dd "
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
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
        <el-select
          v-model="dateForm.targetCompanyId"
          @change="onChangeTarget"
          :placeholder="$t('workBench.addremind.selectTarget')"
        >
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
          <div v-for="(item, index) in dateForm.selectUsers" class="notify-user" :key="index">
            <!-- <el-image
              class="avatar"
              :title="item.userNameZh"
              :src="`${$global.avatarURI}${item.userProfileImage}`"
              :alt="item.userNameZh"
            ></el-image> -->
            <img class="avatar" :title="`${item.userNameZh}-${item.roleName}`" :src="`${$global.avatarURI}${item.userProfileImage}`" :alt="item.userNameZh">
          </div>
          
          <!-- <div v-if="userInfo.userRole != $global.userRole.member" class="notify-user">
            <div
              @click="selectUserVisibleDialog=true;"
              style="height: 50px; width: 50px; border-radius: 50%; border: 1px solid grey;text-align: center; cursor: pointer;"
            >
              <i class="el-icon-plus" style="line-height: 50px; font-size: 30px; "></i>
            </div>
          </div> -->
        </div>
      </el-form-item>
      <!-- 参与人员 end -->
    </el-form>
    <div class="addremind_button">
      <el-button type="primary" :loading="submitBtnLoading" @click="onSubmit('dateForm')">
        <template v-if="dateForm.id">{{$t("workBench.addremind.modify")}}</template>
        <template v-else>{{$t("workBench.addremind.save")}}</template>
      </el-button>
    </div>

    <!-- 添加成员 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('workBench.remind.addPeople')"
      :visible.sync="selectUserVisibleDialog"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :width="$global.dialogWidth"
    >
      <el-scrollbar>
        <AddNotifyUser
          :userId="dateForm.targetOwnerId"
          :oldUser="dateForm.selectUsers"
          @getUser="getSelectUser"
        ></AddNotifyUser>
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
    /**
     *  当前这个项目的编号
     */
    itemid: {
      type: String,
      default() {
        return "";
      }
    },
    /**
     *  如果是修改日程提醒，这就是修改之前的信息
     */
    remindInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    /**
     *  为添加目标公司的工作日志做引入
     */
    targetId: {
      type: String,
      default() {
        return "";
      }
    },
  },
  components: {
    AddNotifyUser: () => import("@/components/workbench/AddNotifyUser.vue")
  },
  data() {
    return {
      remindTypes: [
        {
          value: "1",
          label: this.$t("workBench.addremind.remindTypes[0]")
        },
        {
          value: "2",
          label: this.$t("workBench.addremind.remindTypes[1]")
        },
        {
          value: "3",
          label: this.$t("workBench.addremind.remindTypes[2]")
        }
      ],
      colorTypes: [],
      targetList: [],
      dateForm: {
        id: "",
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
                callback(new Error(this.$t("workBench.addremind.rules.content")));
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
                callback(new Error(this.$t("workBench.addremind.rules.date")));
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
                callback(
                  new Error(this.$t("workBench.addremind.rules.remindType"))
                );
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
                callback(new Error(this.$t("workBench.addremind.rules.email")));
              } else if (
                !/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(
                  value
                )
              ) {
                callback(new Error(this.$t("member.rules.account[1]")));
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
                callback(
                  new Error(this.$t("workBench.addremind.rules.target"))
                );
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
                callback(this.$t("workBench.addremind.rules.users"));
              } else {
                callback();
              }
            }
          }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
    };
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"])
  },
  async created() {
    this.colorTypes = await getRemindColor(this);
    
  },
  methods: {
    // 查询目标公司
    getTargetList() {
      this.targetList = [];
      this.$http
        .post("/target/company/withoutpaginglist", {
          id: this.itemid,
          type: 2
        })
        .then(res => {
          if (res.iworkuCode == 200 && res.datas && res.datas.length > 0) {
            this.targetList = res.datas || [];
            // 从添加工作日志引入时 
            if (this.targetId) {
              this.dateForm.targetCompanyId = this.targetId;
              let targetRes = this.targetList.find(val => val.id == this.targetId);
              targetRes && ((targetRes) => {
                  this.dateForm.targetOwnerId = targetRes.targetCompanyUserInfo.id;
                  targetRes.targetCompanyUserInfo && this.dateForm.selectUsers.push(targetRes.targetCompanyUserInfo);
              })(targetRes);
            } else {
              // 设置默认值
              this.dateForm.targetCompanyId = this.targetList[0].id;
              this.dateForm.targetOwnerId = this.targetList[0].targetCompanyUserInfo.id;
              // 设置默认选中的工作成员
              this.targetList[0].targetCompanyUserInfo && this.dateForm.selectUsers.push(this.targetList[0].targetCompanyUserInfo);
            }
            
          }
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            scheduleBeginDate: this.dateForm.time[0],
            scheduleEndDate: this.dateForm.time[1],
            scheduleContent: this.dateForm.scheduleContent,
            scheduleShowColour: this.dateForm.scheduleShowColour,
            scheduleType: this.dateForm.remind,
            userScheduleParticipateList: [],
            targetCompanyId: this.dateForm.targetCompanyId,
            scheduleNoticeEmail: this.dateForm.scheduleNoticeEmail
          };
          // 提醒日期
          switch (this.dateForm.remind) {
            case this.remindTypes[0].value:
              // 提前一天
              let date_v1 = new Date(this.dateForm.time[0]);
              date_v1 = new Date(date_v1.getTime() - 1 * 24 * 60 * 60 * 1000);
              let month_v1 = date_v1.getMonth() + 1;
              month_v1 < 10 ? (month_v1 = `0${month_v1}`) : null;
              let day_v1 = date_v1.getDate();
              day_v1 < 10 ? (day_v1 = `0${day_v1}`) : null;
              params.sendEmailTime = `${date_v1.getFullYear()}-${month_v1}-${day_v1}`;
              break;
            case this.remindTypes[1].value:
              // 提前两天
              let date_v2 = new Date(this.dateForm.time[0]);
              date_v2 = new Date(date_v2.getTime() - 2 * 24 * 60 * 60 * 1000);
              let month_v2 = date_v2.getMonth() + 1;
              month_v2 < 10 ? (month_v2 = `0${month_v2}`) : null;
              let day_v2 = date_v2.getDate();
              day_v2 < 10 ? (day_v2 = `0${day_v2}`) : null;
              params.sendEmailTime = `${date_v2.getFullYear()}-${month_v2}-${day_v2}`;
              break;
          }
          this.dateForm.selectUsers.map(val => {
            params.userScheduleParticipateList.push({
              userId: val.id
            });
          });
          this.submitBtnLoading = true;
          if (this.dateForm.id) {
            // 修改
            params.id = this.dateForm.id;
            this.$http
              .post("/user/workbench/schedule/update", params)
              .then(res => {
                this.submitBtnLoading = false;
                if (res.iworkuCode == 200) {
                  this.$imessage({
                    content: this.$t("public.tips.success"),
                    type: "success"
                  });
                  this.$emit("onSuccess", params);
                }
              });
          } else {
            // 添加
            this.$http
              .post("/user/workbench/schedule/save", params)
              .then(res => {
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
        this.dateForm.selectUsers = [...data];
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
        if (this.userInfo.userRole != this.$global.userRole.superAdministrator) {
          this.dateForm.selectUsers = [this.userInfo, res.targetCompanyUserInfo];
        } else {
          this.dateForm.selectUsers = [res.targetCompanyUserInfo];
        }
      }
    },
    addAdministrator() {
      if (!this.dateForm.id) {
        this.dateForm.selectUsers = [];
        // 如果不是超级管理员，那就把他自己添加进去
        if (this.userInfo.userRole != this.$global.userRole.superAdministrator) {
          this.dateForm.selectUsers = [this.userInfo];
        }
      }
    },
    resetForm() {
      setTimeout(() => {
        this.$refs['dateForm'].resetFields();
      }, 10);
    }
  },
  watch: {
    itemid: {
      handler(newVal) {
        this.addAdministrator();
        this.resetForm();
        newVal && this.getTargetList();
      },
      immediate: true
    },
    remindInfo: {
      handler(newVal) {
        if (newVal && newVal.id) {
          this.dateForm.id = newVal.id;
          this.dateForm.scheduleContent = newVal.scheduleContent;
          this.dateForm.scheduleShowColour = newVal.scheduleShowColour;
          this.dateForm.time = [
            newVal.scheduleBeginDate,
            newVal.scheduleEndDate
          ];
          this.dateForm.scheduleNoticeEmail = newVal.scheduleNoticeEmail;
          this.dateForm.remind = `${newVal.scheduleType}`;
          this.dateForm.targetCompanyId = newVal.targetCompanyId;
          this.dateForm.targetOwnerId = "";
          this.dateForm.selectUsers = [];
          newVal.sheduleParticipate.map(val => {
            this.dateForm.selectUsers.push({
              userNameZh: val.userNameZh,
              userNameEn: val.userNameEn,
              userProfileImage: val.userProfileImage,
              id: val.userId
            });
          });
          // 获取拥有者
          this.onChangeTarget(this.dateForm.targetCompanyId);
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