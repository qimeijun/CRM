<template>
  <section class="project-detail-info">
    <!-- 资料展示 start -->
    <div class="info_top">
      <div class="info_top_div" style="align-items:center">
        <h3>{{$t("projectInfo.menu[0]")}}</h3>
        <div>
          <el-button type="text" @click="passwordshow=true">{{$t("password.modify")}}</el-button>
          <el-button type="primary" size="small" @click="show = true;infoFrom=info">{{$t("project.btn.edit")}}</el-button>
        </div>
      </div>
      <div class="info_top_div">
        <p>
          <span>{{$t("project.from.companyName")}}</span>
          <br />
          <span>{{info.name}}</span>
        </p>
        <p>
          <span>{{$t("project.from.tmt")}}</span>
          <br />
          <span>{{info.tmt}}</span>
        </p>
        <p>
          <span>{{$t("project.from.site")}}</span>
          <br />
          <span>{{info.site}}</span>
        </p>
        <p>
          <span>{{$t("project.from.url")}}</span>
          <br />
          <span>{{info.url}}</span>
        </p>
        <p>
          <span>{{$t("project.from.email")}}</span>
          <br />
          <span>{{info.email}}</span>
        </p>
      </div>
    </div>
    <div class="info_intro">
      <h4>{{$t("project.from.intro")}}</h4>
      <p>{{info.intro}}</p>
    </div>
    <div class="info_strength">
      <h4>{{$t("project.from.strength")}}</h4>
      <p>{{info.strength}}</p>
    </div>
    <!-- 资料展示 end -->

    <div class="info_redact">
      <!-- 编辑资料弹窗 start -->
      <el-dialog class="el-dialog__scroll" title="修改资料" :visible.sync="show" width="600px">
        <el-scrollbar class="scrollbar">
        <h1>{{$t("project.from.secondTitle")}}</h1>
        <el-form :model="infoFrom" label-position="top">
          <el-form-item :label="$t('project.from.projectTitle')">
            <el-input v-model="infoFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('project.from.companyName')">
            <el-input v-model="infoFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('project.from.tmt')">
            <el-select v-model="infoFrom.tmt" placeholder="请选择行业">
              <el-option label="行业1" value="shanghai"></el-option>
              <el-option label="行业2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('project.from.site')">
            <el-input v-model="infoFrom.site" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="$t('project.from.url')">
            <el-input v-model="infoFrom.url" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 电子邮箱 -->
          <el-form-item :label="$t('project.from.email')">
            <el-input
              v-model="infoFrom.email"
              autocomplete="off"
              :placeholder="$t('project.placeholder.email')"
            ></el-input>
          </el-form-item>
          <!-- 公司简介 -->
          <el-form-item :label="$t('project.from.intro')">
            <el-input
              v-model="infoFrom.intro"
              autocomplete="off"
              :placeholder="$t('project.placeholder.intro')"
              type="textarea"
              :rows="4"
            ></el-input>
          </el-form-item>
          <!-- 优势 -->
          <el-form-item :label="$t('project.from.strength')">
            <el-input
              v-model="infoFrom.strength"
              autocomplete="off"
              :placeholder="$t('project.placeholder.strength')"
              type="textarea"
              :rows="4"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="show = false">{{$t("project.btn.ok")}}</el-button>
        </div>
        </el-scrollbar>
      </el-dialog>
      <!-- 编辑资料弹窗 end -->
      <el-dialog :title="$t('password.modify')" :visible.sync="passwordshow" width="600px">
        <UpdatePassword></UpdatePassword>
      </el-dialog>
    </div>
  </section>
</template>
<script>
export default {
  components: {
    UpdatePassword: () => import("@/components/member/UpdatePassword.vue")
  },
  data() {
    return {
      info: {
        name: "Wuxi Hariken Electric Tools Co., Ltd.",
        tmt: "电子设备及配件",
        site:
          "Qibei Road,Industrial Zone,Yuqi Town,Huishan District,Wuxi,Jiangsu Province P.R China",
        url: "www.harikentools.com",
        email: "jordan@harikentools.com",
        intro:
          "Wuxi Hariken Electric Tools Co., Ltd. Was founded in 2002. Our company combines the design, development, production and process of hand-held light rotary hammer. Our company sells all products to oversea market and cooperates with the famed international bands to develop the exclusive products, therefore we enjoy a high level of popularity worldwide. Our company owns a complete quality management system, a professional development team full of experience on design and professional employees control the quality of products. Also we hold a perfect function test center, and the test facility such as the hardness metallographic phase.",
        strength:
          "Wuxi Hariken Electric Tools Co., Ltd. Was founded in 2002. Our company combines the design, development, production and process of hand-held light rotary hammer. Our company sells all products to oversea market and cooperates with the famed international bands to develop the exclusive products, therefore we enjoy a high level of popularity worldwide. Our company owns a complete quality management system, a professional development team full of experience on design and professional employees control the quality of products. Also we hold a perfect function test center, and the test facility such as the hardness metallographic phase."
      },
      show: false,
      passwordshow: false,
      infoFrom: {
        name: "",
        tmt: "",
        site: "",
        url: "",
        email: "",
        intro: "",
        email: "",
        intro: "",
        strength: ""
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
  .info_strength {
    background-color: white;
    padding: 1px 22px 20px;
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
  .info_strength {
    margin-top: 5px;
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