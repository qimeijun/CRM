<template>
  <section class="project-detail-info">
    <div style="position:fixed; top: 1rem; right: .2rem;">
      <!-- 结束项目 -->
      <el-button
        v-show="info.itemStatus!=2&&userInfo.userRole!=$global.userRole.member&&userInfo.userRole!=$global.userRole.customer"
        class="info-endbtn"
        @click="onDeleteMember(itemid)"
      >{{$t("projectInfo.endProject")}}</el-button>
      <!-- 重启项目 -->
      <el-button
        v-show="info.itemStatus==2&&userInfo.userRole!=$global.userRole.member&&userInfo.userRole!=$global.userRole.customer"
        class="info-endbtn"
        @click="onRestartMember(itemid)"
      >{{$t("projectInfo.restartProject")}}</el-button>
    </div>
    <!-- 资料展示 start -->
    <div class="info_top">
      <div class="info_top_div" style="align-items:center">
        <h3>{{$t("projectInfo.menu[0]")}}</h3>
        <div>
          <!-- 修改密码 -->
          <el-button
            v-show="userInfo.userRole!=$global.userRole.member&&userInfo.userRole!=$global.userRole.customer"
            type="text"
            @click="passwordshow=true"
          >{{$t("password.clientModify")}}</el-button>
          <!-- 编辑 -->
          <el-button
            v-show="userInfo.userRole!=$global.userRole.member"
            type="primary"
            size="small"
            @click="show = true;infoFrom={...info}"
          >{{$t("project.btn.edit")}}</el-button>
        </div>
      </div>
      <div class="info_top_div">
        <p>
          <span>{{$t("project.from.companyName")}}</span>
          <br />
          <span>{{info.companyName}}</span>
        </p>
        <p>
          <span>{{$t("project.from.tmt")}}</span>
          <br />
          <span>{{ info.companyIndustryName }}</span>
        </p>
        <p>
          <span>{{$t("project.from.site")}}</span>
          <br />
          <span>{{info.companyAddress}}</span>
        </p>
        <p>
          <span>{{$t("project.from.url")}}</span>
          <br />
          <!-- <span></span> -->
          <template>
            <a style="color: blue; text-decoration: underline;" v-if="info.companyWebsite && info.companyWebsite.toLocaleLowerCase().includes('http')" :href="`${info.companyWebsite}`" target="_blank" rel="noopener noreferrer">{{info.companyWebsite}}</a>
            <a style="color: blue; text-decoration: underline;" v-else-if="info.companyWebsite && info.companyWebsite.toLocaleLowerCase().includes('https')" :href="`${info.companyWebsite}`" target="_blank" rel="noopener noreferrer">{{info.companyWebsite}}</a>
            <a style="color: blue; text-decoration: underline;" v-else :href="`http://${info.companyWebsite}`" target="_blank" rel="noopener noreferrer">{{info.companyWebsite}}</a>
          </template>
        </p>
        <p>
          <span>{{$t("project.from.email")}}</span>
          <br />
          <span>{{info.companyEmail}}</span>
        </p>
        <p>
          <span>{{$t('project.from.tel')}}</span>
          <br />
          <span>{{info.companyTel}}</span>
        </p>
      </div>
    </div>
    <div class="info_intro">
      <h4>{{$t("project.from.intro")}}</h4>
      <p>{{info.companyProfile}}</p>
    </div>
    <div class="info_strength">
      <h4>{{$t("project.from.strength")}}</h4>
      <p>{{info.companyStrength}}</p>
    </div>
    <!-- 资料展示 end -->
    <div class="info_redact">
      <!-- 编辑资料弹窗 start -->
      <el-dialog class="el-dialog__scroll" :title="$t('project.updateTitle')" :visible.sync="show" :width="$global.dialogWidth" 
        :close-on-click-modal="false">
        <el-scrollbar class="scrollbar">
          <h1>{{$t("project.from.secondTitle")}}</h1>
          <el-form :model="infoFrom" ref="infoFrom" :rules="infoRules" label-position="top">
            <el-form-item :label="$t('project.from.projectTitle')" prop="itemName">
              <el-input v-model="infoFrom.itemName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('project.from.companyName')" prop="companyName">
              <el-input v-model="infoFrom.companyName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('project.from.tmt')" prop="companyIndustry">
              <el-select v-model="infoFrom.companyIndustry" :placeholder="$t('project.placeholder.tmt')">
                <el-option
                  v-for="(item,index) in industryList"
                  :key="'industry'+index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('project.from.site')" prop="companyAddress">
              <el-input v-model="infoFrom.companyAddress" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('project.from.url')" prop="companyWebsite">
              <el-input v-model="infoFrom.companyWebsite" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 电子邮箱 -->
            <el-form-item :label="$t('project.from.email')" prop="companyEmail">
              <el-input
                v-model="infoFrom.companyEmail"
                autocomplete="off"
                :placeholder="$t('project.placeholder.email')"
              ></el-input>
            </el-form-item>
            <!-- 公司电话 -->
            <el-form-item :label="$t('project.from.tel')" prop="companyTel">
              <el-input v-model="infoFrom.companyTel" autocomplete="off" :placeholder="$t('project.placeholder.tel')"></el-input>
            </el-form-item>
            <!-- 公司简介 -->
            <el-form-item :label="$t('project.from.intro')" prop="companyProfile">
              <el-input
                v-model="infoFrom.companyProfile"
                autocomplete="off"
                :placeholder="$t('project.placeholder.intro')"
                type="textarea"
                :rows="4"
              ></el-input>
            </el-form-item>
            <!-- 优势 -->
            <el-form-item :label="$t('project.from.strength')">
              <el-input
                v-model="infoFrom.companyStrength"
                autocomplete="off"
                :placeholder="$t('project.placeholder.strength')"
                type="textarea"
                :rows="4"
              ></el-input>
            </el-form-item>
            <el-form-item class="update_info_btn">
              <el-button
                type="primary"
                @click="updateInfo('infoFrom')"
              >{{$t("project.btn.ok")}}</el-button>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </el-dialog>
      <!-- 编辑资料弹窗 end -->
      <el-dialog :title="$t('password.modify')" :visible.sync="passwordshow" :width="$global.dialogWidth" :close-on-click-modal="false">
        <UpdatePassword :user="adminUser" referenceSource="setting"></UpdatePassword>
      </el-dialog>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import { getIndustry } from "@/plugins/configuration.js";
export default {
  components: {
    UpdatePassword: () => import("@/components/member/UpdatePassword.vue")
  },
  data() {
    return {
      info: {},
      show: false,
      passwordshow: false,
      industryList: [],
      adminUser: {},
      infoFrom: {
        id: "",
        itemName: "",
        companyName: "",
        companyIndustry: "",
        companyAddress: "",
        companyWebsite: "",
        companyEmail: "",
        companyTel: "",
        companyProfile: "",
        companyStrength: ""
      },
      infoRules: {
        itemName: [
          {
            required: true,
            message: this.$t("project.rules.projectTitle"),
            trigger: "blur"
          }
        ],
        companyName: [
          {
            required: true,
            message: this.$t("project.rules.companyName"),
            trigger: "blur"
          }
        ],
        companyIndustry: [
          {
            required: true,
            message: this.$t("project.rules.tmt"),
            trigger: "blur"
          }
        ],
        companyAddress: [
          {
            required: true,
            message: this.$t("project.rules.site"),
            trigger: "blur"
          }
        ],
        // companyWebsite: [
        //   {
        //     required: true,
        //     message: this.$t("project.rules.url"),
        //     trigger: "blur"
        //   }
        // ],
        companyEmail: [
          {
            required: true,
            message: this.$t("project.rules.email"),
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              if (!/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(value)) {
                callback(new Error(this.$t("member.rules.account[1]")));
              } else {
                callback();
              }
            }
          }
        ],
        companyTel: [
          {
            required: true,
            message: this.$t("project.rules.tel"),
            trigger: "blur"
          }
        ],
        companyProfile: [
          {
            required: true,
            message: this.$t("project.rules.intro"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    itemid() {
      return this.$route.params.itemid;
    },
    ...mapGetters("ipublic", ["userInfo"])
  },
  async created() {
    // 获取项目ID
    if (this.itemid) {
      this.getInfo(this.itemid);
    }
    // 获取行业
    this.industryList = await getIndustry(this);
  },
  methods: {
    // 获取项目公司资料
    getInfo(id) {
      this.$http.get(`/customer/item/infobypk/${id}`).then(res => {
        if (res.iworkuCode == 200) {
          this.info = {
            itemStatus: res.datas.itemStatus,
            id: res.datas.id,
            itemName: res.datas.itemName,
            companyName: res.datas.companyName,
            companyIndustry: res.datas.companyIndustry,
            companyAddress: res.datas.companyAddress,
            companyWebsite: res.datas.companyWebsite,
            companyEmail: res.datas.companyEmail,
            companyTel: res.datas.companyTel,
            companyProfile: res.datas.companyProfile,
            companyStrength: res.datas.companyStrength,
            companyIndustryEn: res.datas.companyIndustryEn,
            companyIndustryZh: res.datas.companyIndustryZh,
            companyIndustryName: res.datas.companyIndustryName
          };
          // 客户账号
          this.adminUser = {
            id: res.additionalParameters.id,
            userAccount: res.additionalParameters.userAccount,
            userEmail: res.additionalParameters.userAccount
          };
        }
      });
    },
    // 编辑公司资料提交
    updateInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this[formName];
          this.$http.post("/customer/company/update", params).then(res => {
            if (res.iworkuCode == 200) {
              this.show = false;
              // 重新获取资料
              this.getInfo(this.itemid);
            }
          });
        }
      });
    },
    // 结束项目
    onDeleteMember(id) {
      this.$msgbox({
        title: this.$t("projectStatus.title"),
         message:
          `<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>${this.$t('projectStatus.end.messageText')}</p>`,
        confirmButtonText: this.$t("projectStatus.btn.determine"),
        cancelButtonText: this.$t("projectStatus.btn.cancel"),
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          this.$http
            .post("/customer/item/update/status", {
              itemId: id,
              itemStatus: 2
            })
            .then(res => {
              this.getInfo(this.itemid);
              this.$message({
                type: "success",
                 message: this.$t("projectStatus.end.success"),
              });
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: this.$t("projectStatus.catch"),
          });
        });
    },
    // 重启项目
    onRestartMember(id) {
      this.$msgbox({
         title:this.$t("projectStatus.title"),
        message:
          `<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>${this.$t('projectStatus.restart.messageText')}</p>`,
        confirmButtonText:  this.$t("projectStatus.btn.determine"),
        cancelButtonText:  this.$t("projectStatus.btn.cancel"),
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true
      })
        .then(() => {
          // 确定
          this.$http
            .post("/customer/item/update/status", {
              itemId: id,
              itemStatus: 1
            })
            .then(res => {
              this.getInfo(this.itemid);
              this.$message({
                type: "success",
                message: this.$t("projectStatus.restart.success"),
              });
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: this.$t("projectStatus.catch"),
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.info-endbtn {
  color: $--default-color;
}
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
      word-break: break-all;
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
  .update_info_btn {
    text-align: right;
  }
}
</style>