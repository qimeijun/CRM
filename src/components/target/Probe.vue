<template>
  <!-- 调研报告 -->
  <section>
    <div style="position: fixed; top: 1rem; right: .2rem;">
      <el-button type="primary" @click="show=true">{{$t("target.probe.upload")}}</el-button>
    </div>
    <div class="target-probe">
      <div class="iworku-card probe-item" v-for="(item,index) in probelist" :key="'probe'+index">
        <div class="item_top">
          <el-avatar size="large" :src="$global.avatarURI+item.addUserProfileImage"></el-avatar>
          <div class="top_content">
            <h4>{{$lang==$global.lang.en?item.addUserNameEn:item.addUserNameZh}}</h4>
            <p>
              <i
                class="el-icon-location"
              >&nbsp;{{$lang==$global.lang.en?item.addUserCountryNameEn:item.addUserCountryNameZh}}</i>
            </p>
          </div>
          <Operate>
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
        title="上传报告"
        :visible.sync="show"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        width="30%"
      >
        <el-scrollbar class="scrollbar">
          <UploadReport :targetid="targetid" type="add" @close="closeShow"></UploadReport>
        </el-scrollbar>
      </el-dialog>
      <!-- 上传报告 end -->
      <!-- 修改报告 start -->
      <el-dialog
        class="el-dialog__scroll"
        title="修改报告"
        :visible.sync="updateShow"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        width="30%"
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
    }
  },
  data() {
    return {
      show: false,
      updateShow: false,
      probelist: [],
      updateFile: {
        file: "",
        id: ""
      }
    };
  },
  created() {
    this.getProbe();
  },
  methods: {
    // 获取调研报告
    getProbe() {
      this.$http
        .post("/target/company/research/withpaginglist", {
          targetCompanyId: this.targetid
        })
        .then(res => {
          console.log(res);
          this.probelist = res.datas;
        });
    },
    // 删除调研报告
    deleteProbe(id) {
      this.$msgbox({
        title: "提示",
        message:
          "<i style='color:#E50054;font-size:48px;margin:25px;' class='el-icon-question'></i><p style='font-size: 16px;font-weight:bold;'>您确定要删除调研报告吗？</p>",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
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
                this.$imessage({
                  content: "已删除调研报告",
                  type: "success" // 错误提示 error
                });
                this.getProbe();
              }
            });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "取消操作"
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
      this.show = false;
      this.getProbe();
    },
    // 关闭修改弹窗
    closeUpdateShow() {
      this.updateShow = false;
      this.getProbe();
    }
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