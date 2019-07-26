<template>
<!-- 资料 -->
  <div class="target-info">
    <div style="position: fixed; top: 1rem; right: .2rem;">
      <el-button type="primary" @click="onCancel()">移入公海</el-button>
      <el-button type="primary" @click="changeAdministratorDialogVisible=true">移交</el-button>
    </div>
    <el-row>
      <el-col>
        <Tag type="target" :id="targetid"></Tag>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <!-- 目标公司资料 start -->
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>{{$t("target.info.companyTitle")}}</h3>
            <el-button
              type="primary"
              size="mini"
              @click="show=true;showType='company'"
            >{{$t("workBench.overview.btn")}}</el-button>
          </div>
          <div class="info_div_content">
            <h5>{{$t("target.info.companyName")}}</h5>
            <p>{{companyForm.targetCompanyName}}</p>
            <h5>{{$t("target.info.country")}}</h5>
            <p>{{companyForm.targetCompanyCountry}}</p>
            <h5>{{$t("target.info.site")}}</h5>
            <p>{{companyForm.targetCompanyAddress}}</p>
            <h5>{{$t("target.info.url")}}</h5>
            <p>{{companyForm.targetCompanyWebsite}}</p>
            <h5>{{$t("target.info.phone")}}</h5>
            <p>{{companyForm.targetCompanyTel}}</p>
          </div>
        </div>
        <!-- 目标公司资料 end -->
        <!-- 其他 start -->
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>{{$t("target.info.otherTitle")}}</h3>
            <el-button
              type="primary"
              size="mini"
              @click="show=true;showType='other'"
            >{{$t("workBench.overview.btn")}}</el-button>
          </div>
          <div class="info_div_content">
            <h5>{{$t("target.info.source")}}</h5>
            <p>{{otherForm.nodeCustomerSource}}</p>
            <h5>{{$t("target.info.clientType")}}</h5>
            <p>{{otherForm.nodeClientType}}</p>
            <h5>{{$t("target.info.purchaseScale")}}</h5>
            <p>{{otherForm.nodePurchaseScale}}</p>
            <h5>{{$t("target.info.hsCode")}}</h5>
            <p>{{otherForm.nodeHacode}}</p>
            <h5>{{$t("target.info.importance")}}</h5>
            <p>{{otherForm.nodeGrade}}</p>
            <h5>{{$t("target.info.introduce")}}</h5>
            <p>{{otherForm.nodeProfile}}</p>
            <h5>{{$t("target.info.remark")}}</h5>
            <p>{{otherForm.nodeRemarks}}</p>
          </div>
        </div>
        <!-- 其他 end -->
      </el-col>

      <el-col :span="12">
        <!-- 目标公司概览 start -->
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>{{$t("target.info.overviewTitle")}}</h3>
          </div>
          <div class="info_div_content">
            <el-row>
              <!-- 目标公司数 -->
              <el-col class="content-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src="@/assets/img/img_log.png" alt />
                <p>
                  <span>{{overview.targetNum}}</span>
                  <br />
                  <span>{{$t("workBench.overview.targetNum")}}</span>
                </p>
              </el-col>
              <!-- 已拜访 -->
              <el-col class="content-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src="@/assets/img/img_month.png" alt />
                <p>
                  <span>{{overview.vlinkNum}}</span>
                  <br />
                  <span>{{$t("workBench.overview.vlinkNum")}}</span>
                </p>
              </el-col>
              <!-- 意向 -->
              <el-col class="content-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src="@/assets/img/img_order.png" alt />
                <p>
                  <span>{{overview.intentionNum}}</span>
                  <br />
                  <span>{{$t("workBench.overview.intentionNum")}}</span>
                </p>
              </el-col>
              <!-- 订单 -->
              <el-col class="content-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src="@/assets/img/img_week.png" alt />
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
            <h3>{{$t("target.info.keymenTitle")}}</h3>
            <el-button
              type="primary"
              size="mini"
              @click="show=true;showType='keymen'"
            >{{$t("workBench.overview.btn")}}</el-button>
          </div>
          <div class="info_div_content">
            <h5>{{$t("target.info.keymenName")}}</h5>
            <p>{{keymenForm.personName}}</p>
            <h5>{{$t("target.info.position")}}</h5>
            <p>{{keymenForm.personPosition}}</p>
            <h5>{{$t("target.info.keymenPhone")}}</h5>
            <p>{{keymenForm.personTel}}</p>
            <h5>{{$t("target.info.email")}}</h5>
            <p>{{keymenForm.personEmail}}</p>
            <h5>{{$t("target.info.social")}}</h5>
            <p>{{keymenForm.personAccount}}</p>
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
     <!-- 移交管理员的dialog start-->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('selectRegionalManager.title')"
      :visible.sync="changeAdministratorDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <ChangeAdministrator  operate="handOver"></ChangeAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 移交管理员的dialog end-->
  </div>
</template>
<script>
export default {
  components: {
    // 标签组件
    Tag: () => import("@/components/project/Tag"),
    // 编辑目标公司表单
    ChangeCompany: () => import("@/components/target/ChangeCompany.vue"),
    // 编辑关键人表单
    ChangeKeymen: () => import("@/components/target/ChangeKeymen.vue"),
    // 编辑其他信息表单
    ChangeOther: () => import("@/components/target/ChangeOther.vue"),
    // 移交组件
    ChangeAdministrator: () =>
      import("@/components/member/ChangeAdministrator.vue")
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
      },
      keymenForm: {
      },
      otherForm: {},
      show: false,
      changeAdministratorDialogVisible:false,
      showType: ""
    };
  },
   computed: {
    targetid(){
      return this.$route.query.targetid
    }
  },
 created() {
    this.getTargetInfo(this.targetid);
  },
  methods: {
    // 移入公海
     onCancel() {
      this.$msgbox({
        title: "提示",
        message:
          "<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>目标公司正在跟进中，您确定要移入公海吗？</p>",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 取消删除
          this.$message({
            type: "success",
            message: "取消移入公海"
          });
        })
        .catch(() => {
          // 确定删除
          this.$message({
            type: "info",
            message: "确定移入公海"
          });
        });
    },
    // 获取目标公司资料
    getTargetInfo(id){
      this.$http.get(`/target/company/infobypk/${id}`).then(res=>{
         console.log(res)
        if(res.iworkuCode==200){
         this.companyForm=res.datas.targetCompany;         
         this.keymenForm=res.datas.targetCompanyKeyPerson;         
         this.otherForm=res.datas.targetCompanyNodeInfo;   
        }
      })
    }
  },
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
    .content-item {
      display: flex;
      align-items: center;
      margin: 25px 0;
    }
    .content-item img {
      width: 45px;
      height: 45px;
      margin-right: 10px;
    }
    .content-item p {
      margin: 0;
      :first-of-type {
        font-size: 30px;
        font-weight: 500;
        color: $--default-color;
        line-height: 36px;
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