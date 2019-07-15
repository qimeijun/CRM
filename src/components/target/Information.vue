<template>
  <div class="target-info">
    <el-row>
      <el-col>
        <Tag></Tag>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-bottom:10px;">
      <!-- 目标公司资料 start -->
      <el-col span="12">
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>目标公司资料</h3>
            <el-button type="primary" size="mini">编辑</el-button>
          </div>
          <div class="info_div_content">
            <h5>公司名称</h5>
            <p>Cong ty Nam binh</p>
            <h5>国家</h5>
            <p>Vietnam</p>
            <h5>地址</h5>
            <p>037 Okuneva Field</p>
            <h5>网址</h5>
            <p>www.alexandrea.us</p>
            <h5>联系电话</h5>
            <p>0086-510-83898353</p>
            <h5>电子邮件</h5>
            <p>schmitt_kirk@hotmail.com</p>
          </div>
        </div>
      </el-col>
      <!-- 目标公司资料 end -->
      <!-- 关键人信息 start -->
      <el-col span="12">
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>关键人信息</h3>
            <el-button type="primary" size="mini">编辑</el-button>
          </div>
          <div class="info_div_content">
            <h5>关键人</h5>
            <p>Cong ty Nam binh</p>
            <h5>职位</h5>
            <p>Vietnam</p>
            <h5>联系电话</h5>
            <p>037 Okuneva Field</p>
            <h5>邮件</h5>
            <p>www.alexandrea.us</p>
            <h5>社交账户</h5>
            <p>schmitt_kirk@hotmail.com</p>
          </div>
        </div>
      </el-col>
      <!-- 关键人信息 end -->
    </el-row>
    <el-row :gutter="10">
      <!-- 其他 start -->
      <el-col span="12">
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>其他</h3>
            <el-button type="primary" size="mini">编辑</el-button>
          </div>
          <div class="info_div_content">
            <h5>客户来源</h5>
            <p>Cong ty Nam binh</p>
            <h5>客户类型</h5>
            <p>Vietnam</p>
            <h5>预计采购规模</h5>
            <p>037 Okuneva Field</p>
            <h5>海关编码</h5>
            <p>www.alexandrea.us</p>
            <h5>重要程度</h5>
            <p>0086-510-83898353</p>
          </div>
        </div>
      </el-col>
      <!-- 其他 end -->
      <!-- 介绍 start -->
      <el-col span="12">
        <div class="iworku-card">
          <div class="info_div_top">
            <h3></h3>
            <el-button type="primary" size="mini">编辑</el-button>
          </div>
          <div class="info_div_content">
            <h5>介绍</h5>
            <p>
              I have detailed below the most cost effective forms of internet marketing to advertising your business using your company website. HTPcompany.com provides marketing, Internet advertising, search engine optimization and sales consulting for businesses, web site promotion and lead generation.
              Brought to you In this day and age, a lot of things have changed from how they used to be, which can be new and exciting for most. Effective internet marketing requires a mix of the right advertising army and approaches to get your web site thoroughly entrenched on the internet! Providing army for web site design, hosting, online shopping, databases, flash, streaming video, web site maintenance, search engine optimization, community internet advertising, and more. Consider the Internet the Cnext step to every ad Web sites serve as a ordinary consumer destination for all outgoing advertising communications. deem the Internet the “next step” to every ad Web sites serve as a ordinary consumer destination for all outgoing advertising communications. A sphere name is the Internet address you will use when advertising your web site. Paypopup.com is a four year old online advertising complex which consists thousands of specialized websites in providing unique intention internet traffic. You will be surfing Auto Hits for authentic free internet advertising and visitors to your website all automatically lacking clicking. We have just reached the tip of the iceberg, as the remainder of this article will help to further your understanding of this complex subject. The mass of websites on the Internet do not have the monetary resources to launch a million dollar advertising campaign. You only have to pay for your internet advertising when you hear potential buyers to your website. Companies are running to recover on their internet advertising expenses and constantly inform their website to keep up with the competition. The next time someone asks you about this topic, you can give a little smile and provide them an informative answer.
            </p>
            <h5>备注</h5>
            <p>
              I have detailed below the most cost effective forms of internet marketing to advertising your business using your company website. HTPcompany.com provides marketing, Internet advertising, search engine optimization and sales consulting for businesses, web site promotion and lead generation.
              Brought to you In this day and age, a lot of things have changed from how they used to be, which can be new and exciting for most. Effective internet marketing requires a mix of the right advertising army and approaches to get your web site thoroughly entrenched on the internet! Providing army for web site design, hosting, online shopping, databases, flash, streaming video, web site maintenance, search engine optimization, community internet advertising, and more. Consider the Internet the Cnext step to every ad Web sites serve as a ordinary consumer destination for all outgoing advertising communications. deem the Internet the “next step” to every ad Web sites serve as a ordinary consumer destination for all outgoing advertising communications. A sphere name is the Internet address you will use when advertising your web site. Paypopup.com is a four year old online advertising complex which consists thousands of specialized websites in providing unique intention internet traffic. You will be surfing Auto Hits for authentic free internet advertising and visitors to your website all automatically lacking clicking. We have just reached the tip of the iceberg, as the remainder of this article will help to further your understanding of this complex subject. The mass of websites on the Internet do not have the monetary resources to launch a million dollar advertising campaign. You only have to pay for your internet advertising when you hear potential buyers to your website. Companies are running to recover on their internet advertising expenses and constantly inform their website to keep up with the competition. The next time someone asks you about this topic, you can give a little smile and provide them an informative answer.
            </p>
          </div>
        </div>
      </el-col>
      <!-- 介绍 end -->
    </el-row>
  </div>
</template>
<script>
import Tag from "./../project/Tag";
export default {
  components: {
    Tag
  },
  data() {
    return {
      companyForm: {
        name: "",
        country: "",
        site: "",
        url: "",
        phone: "",
        email: ""
      },
      keymenForm: {
          name:"",
          position:"",
          phone:"",
          email:"",
          social:""
      },
    otherForm:{
        source:"",
        type:"",
        scale:"",
        importance:""
    },
    notes:{
        introduce:"",
        note:""
    }
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
  }
}
</style>