<template>
  <div class="target-info">
    <el-row>
      <el-col>
        <Tag></Tag>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <!-- 目标公司资料 start -->
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>目标公司资料</h3>
            <el-button type="primary" size="mini" @click="show=true;showType='company'">编辑</el-button>
          </div>
          <div class="info_div_content">
            <h5>公司名称</h5>
            <p>{{companyForm.name}}</p>
            <h5>国家</h5>
            <p>{{companyForm.country}}</p>
            <h5>地址</h5>
            <p>{{companyForm.site}}</p>
            <h5>网址</h5>
            <p>{{companyForm.url}}</p>
            <h5>联系电话</h5>
            <p>{{companyForm.phone}}</p>
            <h5>电子邮件</h5>
            <p>{{companyForm.email}}</p>
          </div>
        </div>
        <!-- 目标公司资料 end -->
        <!-- 其他 start -->
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>其他</h3>
            <el-button type="primary" size="mini" @click="show=true;showType='other'">编辑</el-button>
          </div>
          <div class="info_div_content">
            <h5>客户来源</h5>
            <p>{{otherForm.source}}</p>
            <h5>客户类型</h5>
            <p>{{otherForm.type}}</p>
            <h5>预计采购规模</h5>
            <p>{{otherForm.scale}}</p>
            <h5>海关编码</h5>
            <p>{{otherForm.importance}}</p>
            <h5>重要程度</h5>
            <p>{{otherForm.rate}}</p>
            <h5>介绍</h5>
            <p>{{otherForm.introduce}}</p>
            <h5>备注</h5>
            <p>{{otherForm.introduce}}</p>
          </div>
        </div>
        <!-- 其他 end -->
      </el-col>

      <el-col :span="12">
        <!-- 目标公司概览 start -->
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>目标公司概览</h3>
          </div>
          <div class="info_div_content">
            <el-row class="content-item">
              <!-- 目标公司数 -->
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src alt />
                <p>
                  <span>{{overview.targetNum}}</span>
                  <br />
                  <span>{{$t("workBench.overview.targetNum")}}</span>
                </p>
              </el-col>
              <!-- 已拜访 -->
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src alt />
                <p>
                  <span>{{overview.vlinkNum}}</span>
                  <br />
                  <span>{{$t("workBench.overview.vlinkNum")}}</span>
                </p>
              </el-col>
              <!-- 意向 -->
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src alt />
                <p>
                  <span>{{overview.intentionNum}}</span>
                  <br />
                  <span>{{$t("workBench.overview.intentionNum")}}</span>
                </p>
              </el-col>
              <!-- 订单 -->
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src alt />
                <p>
                  <span>{{overview.orderNum}}</span>
                  <br />
                  <span>{{$t("workBench.overview.orderNum")}}</span>
                </p>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 目标公司概览 end -->

        <!-- 关键人信息 start -->
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>关键人信息</h3>
            <el-button type="primary" size="mini" @click="show=true;showType='keymen'">编辑</el-button>
          </div>
          <div class="info_div_content">
            <h5>关键人</h5>
            <p>{{keymenForm.name}}</p>
            <h5>职位</h5>
            <p>{{keymenForm.position}}</p>
            <h5>联系电话</h5>
            <p>{{keymenForm.phone}}</p>
            <h5>邮件</h5>
            <p>{{keymenForm.email}}</p>
            <h5>社交账户</h5>
            <p>{{keymenForm.social}}</p>
          </div>
        </div>
        <!-- 关键人信息 end -->
      </el-col>
    </el-row>

    <!-- 编辑弹窗 start -->
    <el-dialog
      class="el-dialog__scroll"
      title="编辑"
      :visible.sync="show"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <!-- 编辑公司资料表单 -->
        <ChangeCompany v-if="showType==='company'" :companyForm="companyForm"></ChangeCompany>
        <!-- 编辑关键人表单 -->
        <ChangeKeymen v-if="showType==='keymen'" :keymenForm="keymenForm"></ChangeKeymen>
        <!-- 编辑其他表单 -->
        <ChangeOther v-if="showType==='other'" :otherForm="otherForm"></ChangeOther>
      </el-scrollbar>
    </el-dialog>
    <!-- 编辑弹窗 end -->
  </div>
</template>
<script>
import Tag from "./../project/Tag";
import ChangeCompany from "./ChangeCompany.vue";
import ChangeKeymen from "./ChangeKeymen.vue";
import ChangeOther from "./ChangeOther.vue";

export default {
  components: {
    Tag,
    ChangeCompany,
    ChangeKeymen,
    ChangeOther
  },
  data() {
    return {
      overview: {
        targetNum: 123123,
        vlinkNum: 23,
        intentionNum: 4,
        orderNum: 1
      },
      companyForm: {
        name: "Cong ty Nam binh",
        country: "Vietnam",
        site: "037 Okuneva Field",
        url: "www.alexandrea.us",
        phone: "0086-510-83898353",
        email: "schmitt_kirk@hotmail.com"
      },
      keymenForm: {
        name: "Michael Russell",
        position: "Purchasing manager",
        phone: "0086-510-832124678",
        email: "leopold_marvin@hotmail.com",
        social: "Facebook："
      },
      otherForm: {
        source: "Michael Russell",
        type: "采购商",
        scale: "100，000 万美元",
        importance: "58042910",
        rate: "3",
        introduce:
          "I have detailed below the most cost effective forms of internet marketing to advertising your business using your company website. HTPcompany.com provides marketing, Internet advertising, search engine optimization and sales consulting for businesses, ",
        note:
          "I have detailed below the most cost effective forms of internet marketing to advertising your business using your company website. HTPcompany.com provides marketing, Internet advertising, search engine optimization and sales consulting for businesses, "
      },
      show: false,
      showType: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.target-info {
  .info_div_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    h3 {
      margin: 0;
    }
  }
  .info_div_content {
    h5 {
      font-size: 12px;
      font-weight: 400;
      color: rgba(123, 123, 123, 1);
      line-height: 17px;
      margin: 0;
    }
    p {
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 20px;
      max-height: 100px;
      overflow: hidden;
    }
    .content-item p {
      :first-of-type {
        font-size: 30px;
        font-weight: 500;
        color: $--default-color;
        line-height: 42px;
      }
      :last-of-type {
        font-size: 12px;
        font-weight: 450;
        color: rgba(30, 30, 30, 1);
        line-height: 17px;
      }
    }
  }
}
</style>