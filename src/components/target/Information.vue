<template>
  <!-- 资料 -->
  <div class="target-info">
    <div style="position: fixed; top: 1rem; right: .2rem;">
      <!-- 
        功能：移入公海、移交、分配、
        限制：1.所在项目未分配时或结束项目或被作废  没有这三个功能
              2.项目分配后：
                   <1>目标公司在个人私海时 移交和移入公海功能(人员:项目成员)
                   <2>目标公司在公海时 分配功能（项目成员中的项目经理及所属区域经理）
                     <3>目标公司分配给区域经理时 移交和移入公海 只能本人操作
      -->
      <!-- 移入公海 -->
      <el-button
        v-show="itemStatus!=2&&companyForm.status!=4&&companyForm.ownUser==2&&companyForm.itemProjectManager!=null&&itemRole&&(overview.targetCompanyUserInfo.userRole!=$global.userRole.regionalManager||(overview.targetCompanyUserInfo.userRole==$global.userRole.regionalManager&&overview.targetCompanyUserInfo.id==userInfo.id))"
        type="primary"
        @click="onExplantation(targetid)"
      >{{$t("project.intoSea")}}</el-button>
      <!-- 移交 -->
      <el-button
        v-show="itemStatus!=2&&companyForm.status!=4&&companyForm.ownUser==2&&companyForm.itemProjectManager!=null&&itemRole&&(overview.targetCompanyUserInfo.userRole!=$global.userRole.regionalManager||(overview.targetCompanyUserInfo.userRole==$global.userRole.regionalManager&&overview.targetCompanyUserInfo.id==userInfo.id))"
        type="primary"
        @click="changeAdministratorDialogVisible=true"
      >{{$t("project.transfer")}}</el-button>
      <!-- 分配 -->
      <el-button
        v-show="itemStatus!=2&&companyForm.status!=4&&companyForm.ownUser==1&&companyForm.itemProjectManager!=null&&itemRole&&userInfo.userRole!=$global.userRole.member"
        type="primary"
        @click="allocationShow=true"
      >{{$t("project.allot")}}</el-button>
      <!-- 
      功能：作废/激活
      限制：1.项目未分配时：超管和所有区域经理
           2.项目分配后 项目成员
           3.目标公司分配给区域经理的话 只有本人可作废
      -->
      <!-- 作废 -->
      <el-button
        v-show="itemStatus!=2&&companyForm.status!=2&&companyForm.status!=4&&(itemRole||companyForm.itemProjectManager==null)&&(companyForm.ownUser==1||companyForm.ownUser==2&&(overview.targetCompanyUserInfo.userRole!=$global.userRole.regionalManager||(overview.targetCompanyUserInfo.userRole==$global.userRole.regionalManager&&overview.targetCompanyUserInfo.id==userInfo.id)))"
        class="top_button"
        @click="onCancel(4)"
      >{{$t("project.invalid")}}</el-button>
      <!-- 激活 -->
      <el-button
        v-show="itemStatus!=2&&companyForm.status!=2&&companyForm.status==4&&(itemRole||companyForm.itemProjectManager==null)"
        class="top_button"
        @click="onCancel(1)"
      >{{$t("project.activation")}}</el-button>
      <el-button v-if="itemStatus!=2&&companyForm.status!=4&&itemRole" type="primary" 
        @click="addRemindDialogVisible=true;"
        class="top_button" >{{ $t("workBench.remind.add") }}</el-button>
    </div>
    <!--     
        功能：三个资料的编辑功能 及标签编辑功能
        限制：1.在所属项目未分配时 超管和所有区域经理都可编辑 （只有超管和区域经理可进页面）
              2. 在所属项目分配后 项目成员  
    -->

    <el-row>
      <el-col>
        <Tag
          type="target"
          :id="targetid"
          :disableType="companyForm.status!=4&&(companyForm.itemProjectManager==null||itemRole)"
        ></Tag>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <!-- 目标公司资料 start -->
        <div class="iworku-card">
          <div class="info_div_top">
            <h3>{{$t("target.info.companyTitle")}}</h3>
            <el-button
              v-show="companyForm.status!=4&&companyForm.itemProjectManager==null||itemRole"
              type="primary"
              size="mini"
              @click="show=true;showType='company'"
            >{{$t("workBench.overview.btn")}}</el-button>
          </div>
          <div class="info_div_content">
            <h5>{{$t("target.info.companyName")}}</h5>
            <p>{{companyForm.targetCompanyName}}</p>
            <h5>{{$t("target.info.country")}}</h5>
            <p>{{ companyForm.targetCompanyCountryName }}</p>
            <h5>{{ $t("target.form.area") }}</h5>
            <p>{{ companyForm.area }}</p>
            <h5>{{$t("target.info.site")}}</h5>
            <p>{{companyForm.targetCompanyAddress}}</p>
            <h5>{{$t("target.info.url")}}</h5>
            <p>
              <a style="color: blue; text-decoration: underline;" v-if="companyForm.targetCompanyWebsite && companyForm.targetCompanyWebsite.toLocaleLowerCase().includes('http')" :href="companyForm.targetCompanyWebsite" target="_blank">{{companyForm.targetCompanyWebsite}}</a>
              <a style="color: blue; text-decoration: underline;" v-else-if="companyForm.targetCompanyWebsite && companyForm.targetCompanyWebsite.toLocaleLowerCase().includes('https')" :href="companyForm.targetCompanyWebsite" target="_blank">{{companyForm.targetCompanyWebsite}}</a>
              <a style="color: blue; text-decoration: underline;" v-else :href="`http://${companyForm.targetCompanyWebsite}`" target="_blank">{{ companyForm.targetCompanyWebsite }}</a>
            </p>
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
              v-show="companyForm.status!=4&&companyForm.itemProjectManager==null||itemRole"
              type="primary"
              size="mini"
              @click="show=true;showType='other'"
            >{{$t("workBench.overview.btn")}}</el-button>
          </div>
          <div class="info_div_content">
            <h5>{{$t("target.info.source")}}</h5>
            <p>{{otherForm.nodeCustomerSource}}</p>
            <h5>{{$t("target.info.clientType")}}</h5>
            <p>{{otherForm.nodeClientTypeName || otherForm.nodeClientTypeCustom}}</p>
            <h5>{{$t("target.info.purchaseScale")}}</h5>
            <p>{{otherForm.nodePurchaseScale}}</p>
            <h5>{{$t("target.info.hsCode")}}</h5>
            <p>{{otherForm.nodeHacode}}</p>
            <h5>{{$t("target.info.importance")}}</h5>
            <el-rate
              :value="otherForm.nodeGrade-0"
              disabled
              :colors="['#E50054','#E50054','#E50054']"
            ></el-rate>
            <p>{{ otherForm.nodeGradeName }}</p>
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
              <!-- 日志总数量 -->
              <el-col class="content-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src="@/assets/img/img_log.png" alt />
                <p>
                  <span>{{overview.count}}</span>
                  <br />
                  <span>{{$t("target.info.logTotal")}}</span>
                </p>
              </el-col>
              <!-- 月报数量 -->
              <el-col class="content-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src="@/assets/img/img_month.png" alt />
                <p>
                  <span>{{overview.monthlyReportCount}}</span>
                  <br />
                  <span>{{$t("target.info.MonthlyTotal")}}</span>
                </p>
              </el-col>
              <!-- 周报数量 -->
              <el-col class="content-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src="@/assets/img/img_week.png" alt />
                <p>
                  <span>{{overview.weeklyCount}}</span>
                  <br />
                  <span>{{$t("target.info.weeksTotal")}}</span>
                </p>
              </el-col>
              <!-- 订单数量 -->
              <el-col class="content-item" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <img src="@/assets/img/img_order.png" alt />
                <p>
                  <span>{{overview.orderLog}}</span>
                  <br />
                  <span>{{$t("target.info.orderTotal")}}</span>
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
              v-show="companyForm.status!=4&&companyForm.itemProjectManager==null||itemRole"
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
      :title="$t('target.info.editorTitle')"
      :visible.sync="show"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <!-- 编辑公司资料表单 -->
        <ChangeCompany
          v-if="showType==='company'"
          :companyForm="companyForm"
          @closeShow="oncloseShow"
        ></ChangeCompany>
        <!-- 编辑关键人表单 -->
        <ChangeKeymen v-if="showType==='keymen'" :keymenForm="keymenForm" @closeShow="oncloseShow"></ChangeKeymen>
        <!-- 编辑其他表单 -->
        <ChangeOther v-if="showType==='other'" :otherForm="otherForm" @closeShow="oncloseShow"></ChangeOther>
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
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <ChangeAdministrator
          @getManager="getManager"
          :oldAdminstrator="overview.targetCompanyUserInfo"
          :params="{type: 'handOverMemberForProject', id: companyForm.itemId}"
          operate="handOver"
        ></ChangeAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 移交管理员的dialog end-->
    <!-- 分配 start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('project.allot')"
      :visible.sync="allocationShow"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      :width="$global.dialogWidth"
    >
      <el-scrollbar class="scrollbar">
        <ChangeAdministrator
          operate="add"
          :params="{id:companyForm.itemId, type: 'assignMemberForTarget'}"
          @getManager="onAssignMember"
        ></ChangeAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 分配 end -->

    <!-- 添加提醒 start -->
      <el-dialog
        :title="$t('workBench.remind.dialogTitle')"
        :visible.sync="addRemindDialogVisible"
        :close-on-click-modal="false"
        :width="$global.dialogWidth"
      >
        <AddRemind :itemid="companyForm.itemId" :targetId="targetid" @onSuccess="onAddSuccess"></AddRemind>
      </el-dialog>
        <!-- 添加提醒 end -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
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
      import("@/components/member/ChangeAdministrator.vue"),
    AddRemind: () => import("@/components/workbench/AddRemind.vue")
  },
  data() {
    return {
      overview: {},
      companyForm: {},
      keymenForm: {},
      otherForm: {},
      roleMeberList: [],
      show: false,
      changeAdministratorDialogVisible: false,
      allocationShow: false,
      itemRole: false, //用户是否为项目成员或超管
      showType: "",
      itemStatus:2,
      addRemindDialogVisible: false
    };
  },
  computed: {
    targetid() {
      return this.$route.params.targetid;
    },
    ...mapGetters("ipublic", ["userInfo"])
  },
  created() {
    this.getTargetInfo(this.targetid);
  },
  methods: {
    // 移入公海
    onExplantation(id) {
      this.$msgbox({
        title: this.$t("projectStatus.title"),
        message:
          `<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>${this.$t('targetStatus.intoSea')}</p>`,
        confirmButtonText:  this.$t("projectStatus.btn.determine"),
        cancelButtonText:  this.$t("projectStatus.btn.cancel"),
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 移入公海
          this.$http
            .post("/target/company/private/list/update", {
              idList: [id],
              type: 2
            })
            .then(res => {
              if (res.iworkuCode == 200) {
                this.getTargetInfo(id);
                this.$imessage({
                  content: this.$t("public.tips.success"),
                  type: "success"
                });
              }
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: this.$t("targetStatus.catch"),
          });
        });
    },
    // 激活作废  type: 4作废  1激活
    onCancel(type) {
      let messageText;
     if (type == 4) {
        messageText =this.$t("targetStatus.Private.messageText");
      } else if (type == 1) {
        messageText = this.$t("targetStatus.invalid.messageText");
      }
      this.$msgbox({
        title: this.$t("targetStatus.title"),
        message: `<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>${messageText}</p>`,
        confirmButtonText: this.$t("targetStatus.btn.determine"),
        cancelButtonText: this.$t("targetStatus.btn.cancel"),
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          if (type == 4 && this.companyForm.ownUser == 2) {
            // 移入公海
            this.$http
              .post("/target/company/private/list/update", {
                idList: [this.targetid],
                type: 2
              })
              .then(res => {
                if (res.iworkuCode == 200) {
                  this.$http
                    .post("/target/company/status/update", {
                      id: this.targetid,
                      status: type //目标公司状态（ 1.待跟进 2跟进中 3.未跟进 4.作废）
                    })
                    .then(res => {
                      if (res.iworkuCode == 200) {
                        this.$message({
                          type: "success",
                          message: this.$t("targetStatus.success")
                        });
                        this.getTargetInfo(this.targetid);
                      }
                    });
                }
              });
          } else {
            this.$http
              .post("/target/company/status/update", {
                id: this.targetid,
                status: type //目标公司状态（ 1.待跟进 2跟进中 3.未跟进 4.作废）
              })
              .then(res => {
                if (res.iworkuCode == 200) {
                  this.$message({
                    type: "success",
                    message: this.$t("targetStatus.success")
                  });
                  this.getTargetInfo(this.targetid);
                }
              });
          }
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: this.$t("targetStatus.catch")
          });
        });
    },
    // 获取目标公司资料
    getTargetInfo(id) {
      this.$http.get(`/target/company/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.companyForm = res.datas.targetCompany;
          this.keymenForm = res.datas.targetCompanyKeyPerson;
          this.otherForm = res.datas.targetCompanyNodeInfo;
          this.overview = res.additionalParameters;
          this.getMemberList(this.companyForm.itemId);
          this.getItemStatus(this.companyForm.itemId);
        }
      });
    },
    // 关闭弹窗
    oncloseShow() {
      this.show = false;
      this.getTargetInfo(this.targetid);
    },
    // 移交
    getManager(data) {
      if (!data || !data.id) {
        return false;
      }
      this.$http
        .post("/target/company/private/transfer/update", {
          id: this.targetid,
          userId: data.id
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.changeAdministratorDialogVisible = false;
            this.getTargetInfo(this.targetid);
            this.$imessage({
              content: this.$t("public.tips.success"),
              type: "success"
            });
          }
        });
    },
    // 给目标公司分配工作人员
    onAssignMember(data) {
      if (!data || !data.id) {
        return false;
      }
      let params = [this.targetid];
      this.$http
        .post("/target/company/private/list/update", {
          idList: params,
          type: 1,
          userId: data.id
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.allocationShow = false;
            this.$imessage({
              content: this.$t("public.tips.success"),
              type: "success"
            });
            this.getTargetInfo(this.targetid);
          }
        });
    },
    // 判断用户是否为项目成员
    filterMeberList(id) {
      let role = this.roleMeberList.filter(o => {
        if (id == o.id) {
          return o;
        }
      });
      if (role.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    // 获取所在项目成员
    getMemberList(itemid) {
      this.$http
        .post("/user/item/user/rel/withoutpaginglist", { itemId: itemid })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.roleMeberList = res.datas;
            // 项目成员或超管
            this.itemRole =
              this.filterMeberList(this.userInfo.id) ||
              this.userInfo.userRole ==
                this.$global.userRole.superAdministrator;
          }
        });
    },
     // 获取项目状态
    getItemStatus(id) {
      this.$http.get(`/customer/item/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.itemStatus = res.datas.itemStatus;
        }
      });
    },
    // 添加提醒成功
    onAddSuccess() {
        this.addRemindDialogVisible = false;
    }
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