<template>
  <section class="project-detail-info">
    <!-- 资料展示 start -->
    <div class="info_top">
      <div class="info_top_div" style="align-items:center">
        <h3>资料</h3>
        <div>
          <el-button type="text">修改密码</el-button>
          <el-button type="primary" size="small" @click="show = true;infoFrom=info">编辑</el-button>
        </div>
      </div>

      <div class="info_top_div">
        <p>
          <span>公司名称</span>
          <br />
          <span>{{info.name}}</span>
        </p>
        <p>
          <span>行业</span>
          <br />
          <span>{{info.tmt}}</span>
        </p>
        <p>
          <span>地址</span>
          <br />
          <span>{{info.site}}</span>
        </p>
        <p>
          <span>网址</span>
          <br />
          <span>{{info.url}}</span>
        </p>
        <p>
          <span>电子邮箱</span>
          <br />
          <span>{{info.email}}</span>
        </p>
        <p>
          <span>联系方式</span>
          <br />
          <span>{{info.contact}}</span>
        </p>
      </div>
    </div>
    <div class="info_intro">
      <h4>公司简介</h4>
      <p>{{info.intro}}</p>
    </div>
    <div class="info_advantage">
      <h4>优势</h4>
      <p>{{info.advantage}}</p>
    </div>
    <!-- 资料展示 end -->

    <!-- 编辑资料弹窗 start -->
    <div class="info_redact">
      <el-dialog title="修改资料" :visible.sync="show" width="600px">
        <h1>项目资料</h1>
        <el-form :model="infoFrom" label-position="top">
          <el-form-item label="项目名称">
            <el-input v-model="infoFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="infoFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="行业">
            <el-select v-model="infoFrom.tmt" placeholder="请选择行业">
              <el-option label="行业1" value="shanghai"></el-option>
              <el-option label="行业2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="infoFrom.site" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="网址">
            <el-input v-model="infoFrom.url" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="show = false">完成</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 编辑资料弹窗 end -->
  </section>
</template>
<script>
export default {
  data() {
    return {
      info: {
        name: "Wuxi Hariken Electric Tools Co., Ltd.",
        tmt: "电子设备及配件",
        site:
          "Qibei Road,Industrial Zone,Yuqi Town,Huishan District,Wuxi,Jiangsu Province P.R China",
        url: "www.harikentools.com",
        email: "jordan@harikentools.com",
        contact: "0086-510-83898353",
        intro:
          "Wuxi Hariken Electric Tools Co., Ltd. Was founded in 2002. Our company combines the design, development, production and process of hand-held light rotary hammer. Our company sells all products to oversea market and cooperates with the famed international bands to develop the exclusive products, therefore we enjoy a high level of popularity worldwide. Our company owns a complete quality management system, a professional development team full of experience on design and professional employees control the quality of products. Also we hold a perfect function test center, and the test facility such as the hardness metallographic phase.",
        advantage:
          "Wuxi Hariken Electric Tools Co., Ltd. Was founded in 2002. Our company combines the design, development, production and process of hand-held light rotary hammer. Our company sells all products to oversea market and cooperates with the famed international bands to develop the exclusive products, therefore we enjoy a high level of popularity worldwide. Our company owns a complete quality management system, a professional development team full of experience on design and professional employees control the quality of products. Also we hold a perfect function test center, and the test facility such as the hardness metallographic phase."
      },
      show: false,
      infoFrom: {
        name: "",
        tmt: "",
        site: "",
        url: "",
        email: "",
        contact: "",
        intro: "",
        advantage: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.project-detail-info {
  border-radius: 8px;
  overflow: hidden;
  .info_top,
  .info_intro,
  .info_advantage {
    background-color: white;
    padding: 1px 22px 20px;
    margin-bottom: 5px;
  }
  .info_top_div {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    p {
      width: 48%;
      margin-bottom: 20px;
      :first-of-type {
        font-size: 12px;
        color: rgba(123, 123, 123, 1);
        line-height: 17px;
      }
      :last-of-type {
        font-size: 14px;
        color: rgba(30, 30, 30, 1);
        line-height: 20px;
      }
    }
  }
  .info_intro,
  .info_advantage {
    h4 {
      font-size: 12px;
      font-weight: normal;
      color: rgba(123, 123, 123, 1);
    }
    p {
      font-size: 12px;
      line-height: 17px;
    }
  }
}
</style>