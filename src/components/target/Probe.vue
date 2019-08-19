<template>
  <!-- 调研报告 -->
  <section>
    <div style="position: fixed; top: 1rem; right: .2rem;">
      <!-- 
      功能：上传调研报告、修改、删除
      限制：只有在目标公司被移入私海后有功能（人员：项目成员）
      -->
      <el-button
        v-show="itemStatus!=2&&companyForm.status!=4&&companyForm.ownUser==2&&itemRole&&(additionalParameters.targetCompanyUserInfo.userRole!=$global.userRole.regionalManager||(additionalParameters.targetCompanyUserInfo.userRole==$global.userRole.regionalManager&&additionalParameters.targetCompanyUserInfo.id==userInfo.id))"
        type="primary"
        @click="show=true"
      >{{$t("target.probe.upload")}}</el-button>
    </div>
    <div class="target-probe">
      <div class="iworku-card probe-item" v-for="(item,index) in probelist" :key="'probe'+index">
        <div class="item_top">
          <el-avatar size="large" :src="$global.avatarURI+item.addUserProfileImage"></el-avatar>
          <div class="top_content">
            <h4>{{ item.addUserNameZh || item.addUserNameEn }}</h4>
            <p>
              <i
                class="el-icon-location"
              >&nbsp;{{ item.addUserCountryName}}</i>
            </p>
          </div>
          <Operate v-show="companyForm.status!=4&&companyForm.ownUser==2&&itemRole&&(additionalParameters.targetCompanyUserInfo.userRole!=$global.userRole.regionalManager||(additionalParameters.targetCompanyUserInfo.userRole==$global.userRole.regionalManager&&additionalParameters.targetCompanyUserInfo.id==userInfo.id))">
            <ul>
              <li
                class="probe_btn"
                @click="updateProbe(item.id,item.researchFile)"
              >{{$t("target.probe.update")}}</li>
              <li class="probe_btn" @click="deleteProbe(item.id)">{{$t("target.probe.delete")}}</li>
            </ul>
          </Operate>
        </div>
        <h3>{{$t("target.probe.title")}}</h3>
        <div>
          <Attachment :name="item.researchFile"></Attachment>
        </div>
      </div>
      <!-- 上传报告 start -->
      <el-dialog
        class="el-dialog__scroll"
        :title="$t('target.probe.upload')"
        :visible.sync="show"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        :width="$global.dialogWidth"
      >
        <el-scrollbar class="scrollbar">
          <UploadReport :targetid="targetid" type="add" @close="closeShow"></UploadReport>
        </el-scrollbar>
      </el-dialog>
      <!-- 上传报告 end -->
      <!-- 修改报告 start -->
      <el-dialog
        class="el-dialog__scroll"
        :title="$t('target.probe.update')"
        :visible.sync="updateShow"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        :width="$global.dialogWidth"
      >
        <el-scrollbar class="scrollbar">
          <UploadReport
            :targetid="targetid"
            type="update"
            :updateFile="updateFile"
            @close="closeUpdateShow"
          ></UploadReport>
        </el-scrollbar>
      </el-dialog>
      <!-- 修改报告 end -->
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {
    Operate: () => import("@/components/lib/Operate.vue"),
    // 文件样式
    Attachment: () => import("@/components/lib/Attachment.vue"),
    // 上传调研报告
    UploadReport: () => import("@/components/target/UploadReport.vue")
  },
  computed: {
    targetid() {
      return this.$route.params.targetid;
    },
    ...mapGetters("ipublic", ["userInfo"])
  },
  data() {
    return {
      show: false,
      updateShow: false,
      probelist: [],
      updateFile: {
        file: "",
        id: ""
      },
      companyForm: {},
      additionalParameters: {},
      itemRole: false, //用户是否为项目成员或超管
      roleMeberList: [],
      itemStatus:2
    };
  },
  created() {
    this.getProbe();
    this.getTargetInfo(this.targetid);
  },
  methods: {
    // 获取调研报告
    getProbe() {
      this.$http
        .post("/target/company/research/withpaginglist", {
          targetCompanyId: this.targetid
        })
        .then(res => {
          this.probelist = res.datas;
        });
    },
    // 删除调研报告
    deleteProbe(id) {
      this.$msgbox({
        title: this.$t("projectStatus.title"),
        message:
          "<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>您确定要删除调研报告吗？</p>",
        confirmButtonText: this.$t("projectStatus.btn.determine"),
        cancelButtonText: this.$t("projectStatus.btn.cancel"),
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          let params = {
            id: id,
            researchStatus: 2
          };
          this.$http
            .post("/target/company/research/update", params)
            .then(res => {
              if (res.iworkuCode == 200) {
                this.getProbe();
                this.$imessage({
                  content: this.$t("public.tips.success"),
                  type: "success" // 错误提示 error
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
    // 修改报告
    updateProbe(id, file) {
      this.updateShow = true;
      this.updateFile = {
        file: file,
        id: id
      };
    },
    // 关闭新增弹窗
    closeShow() {
      this.getProbe();
      this.show = false;
    },
    // 关闭修改弹窗
    closeUpdateShow() {
      this.getProbe();
      this.updateShow = false;
    },
    // 获取目标公司资料
    getTargetInfo(id) {
      this.$http.get(`/target/company/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.companyForm = res.datas.targetCompany;
          this.additionalParameters = res.additionalParameters;
          this.getMemberList(this.companyForm.itemId);
          this.getItemStatus(this.companyForm.itemId);
        }
      });
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
       // 获取项目状态
    getItemStatus(id) {
      this.$http.get(`/customer/item/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.itemStatus = res.datas.itemStatus;
        }
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.target-probe {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.probe-item {
  width: 4.74rem;
  margin-right: 10px;
  h3 {
    font-size: 16px;
    line-height: 22px;
  }
  .item_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .top_content {
      flex-grow: 2;
      margin-left: 10px;
    }
    h4 {
      font-size: 16px;
      margin-top: 0;
      margin-bottom: 10px;
    }
  }
  .el-icon-location {
    font-size: 14px;
  }
}
.probe_btn {
  cursor: pointer;
}
</style>