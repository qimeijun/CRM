<template>
  <!-- 添加日程提醒 -->
  <div class="workbench-addremind">
    <el-form :model="dateForm" label-position="left" label-width="80px">
      <!-- 提醒内容 start -->
      <el-form-item label-width="0px">
        <el-input
          v-model="dateForm.title"
          :placeholder="$t('workBench.addremind.placeholder.content')"
        ></el-input>
      </el-form-item>
      <!-- 提醒内容 end -->
      <!-- 标记颜色 start -->
      <el-form-item label-width="0px">
        <el-radio-group v-model="dateForm.color">
          <el-tooltip
            v-for="item in colorTypes"
            :key="item.value"
            effect="dark"
            :content="item.label"
            placement="top"
          >
            <el-radio-button
              :label="item.value"
              :style="'background-color:'+item.value"
              class="addremind_form_color"
            >
              <i v-if="dateForm.color===item.value" class="el-icon-check"></i>
              <span v-else>&nbsp;</span>
            </el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </el-form-item>
      <!-- 标记颜色 end -->
      <!-- 起止日期 start -->
      <el-form-item :label="$t('workBench.addremind.form.date')">
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
      <el-form-item :label="$t('workBench.addremind.form.remindTime')">
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
      <el-form-item :label="$t('workBench.addremind.form.email')">
        <el-input
          v-model="dateForm.email"
          :placeholder="$t('workBench.addremind.placeholder.email')"
        ></el-input>
      </el-form-item>
      <!-- 邮箱 end -->
      <!-- 目标公司 start -->
      <el-form-item :label="$t('workBench.addremind.form.target')">
          <el-select
          v-model="dateForm.target"
          :placeholder="'选择目标公司'"
        >
          <el-option
            v-for="item in remindTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 目标公司 end -->
      <!-- 参与人员 start -->
      <el-form-item :label="$t('workBench.addremind.form.people')">
        <el-input
          v-model="dateForm.title"
          :placeholder="$t('workBench.addremind.placeholder.people')"
        ></el-input>
      </el-form-item>
      <!-- 参与人员 end -->
    </el-form>
    <div class="addremind_button">
      <el-button
        type="primary"
        @click="dialogFormVisible = false"
      >{{$t("workBench.addremind.save")}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      dateForm: {
        title: "",
        color: "#D50000FF",
        time: [],
        email: "",
        remind: "",
        target:""
      }
    };
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
  }
}
.addremind_button {
  text-align: right;
}
</style>
<style>
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
</style>