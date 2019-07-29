<template>
  <div class="iworku-card project-detail-member">
    <div class="member_top">
      <h3>{{$t("projectInfo.member.title")}}</h3>
      <span>共{{memberlist.length}}人</span>
      <el-button type="primary" size="small" @click="addMemberDialogVisible=true">{{$t("projectInfo.member.add")}}</el-button>
    </div>
    <div class="member_list" v-for="(item, index) in memberlist" :key="'member'+index">
      <i :style="'background-color:'+item.color">{{item.roleName}}</i>
      <p class="list_img">
        <el-avatar size="medium" :src="'https://vodcn.iworku.com/'+item.userProfileImage"></el-avatar>
        <br />
        <span>{{item.userNameZh}}</span>
      </p>
      <div class="list_div">
        <p>
          <span>{{item.targetCompanyCount}}</span> {{$t("projectInfo.member.target[1]")}}
          <br />
          <span>{{$t("projectInfo.member.target[0]")}}</span>
        </p>
        <p>
          <span>{{item.day}}</span> {{$t("projectInfo.member.time[1]")}}
          <br />
          <span>{{$t("projectInfo.member.time[0]")}}</span>
        </p>
      </div>
    </div>
    <!-- 添加成员 dialog start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('selectRegionalManager.title')"
      :visible.sync="addMemberDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%"
    >
      <el-scrollbar>
        <ChangeAdministrator></ChangeAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 添加成员 dialog end -->
  </div>
</template>
<script>
import {getProjectUserApi} from "@/plugins/axios.js"
export default {
  components:{
     // 添加新成员
    ChangeAdministrator: () => import("@/components/member/ChangeAdministrator.vue"),
  },
  data() {
    return {
      memberlist: [
        {
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          color: "#E50054",
          type: "区域经理",
          number: "123",
          day: "321"
        },
        {
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          color: "#FF6D00",
          type: "项目经理",
          number: "123",
          day: "321"
        },
        {
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          name: "Pualthin",
          color: "#00C853",
          type: "普通成员",
          number: "123",
          day: "321"
        }
      ],
      addMemberDialogVisible:false,
    };
  },
  computed: {
    itemid() {
      return this.$route.params.itemid;
    }
  },
  created() {
    this.getMemberList()
  },
  methods: {
    getMemberList(){
    this.$http.post('/user/item/user/rel/withoutpaginglist',{itemId:this.itemid}).then(res=>{
      console.log('项目成员',res);
      if(res.iworkuCode==200){
        this.memberlist=res.datas;
      }
    })
    }
  },
};
</script>
<style lang="scss" scoped>
.project-detail-member {
  min-height: 170px;
  .member_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    h3 {
      margin: 0;
    }
    span {
      margin-left: 10px;
      color: rgba(123, 123, 123, 1);
      font-size: 12px;
      flex-grow: 2;
    }
  }
  .member_list {
    display: flex;
    align-items: center;
    height: 75px;
    border-radius: 8px;
    overflow: hidden;
    background-color: $--default-list-gray;
    margin-bottom: 5px;
    i {
      height: 100%;
      writing-mode: tb-rl;
      text-align: center;
      font-style: normal;
      color: white;
      font-size: 12px;
      font-weight: 500;
      padding: 0 7px;
      letter-spacing: 2px;
      min-width: 20px;
    }
    .list_img {
      text-align: center;
      margin: 0 20px;
      font-size: 12px;
    }
    .list_div {
      display: flex;
      justify-content: space-around;
      flex-grow: 2;
      font-size: 12px;
      font-weight: 500;
      color: rgba(123, 123, 123, 1);
      line-height: 17px;
      p :first-of-type {
        font-size: 18px;
        font-weight: 500;
        color: rgba(30, 30, 30, 1);
        line-height: 25px;
      }
    }
  }
}
</style>