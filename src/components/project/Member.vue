<template>
  <div class="iworku-card project-detail-member">
    <div class="member_top">
      <h3>{{$t("projectInfo.member.title")}}</h3>
      <span>{{$t("projectInfo.member.population",{number:memberlist.length})}}</span>
      <el-button v-show="itemStatus!=2&&userInfo.userRole!=$global.userRole.member&&userInfo.userRole!=$global.userRole.customer" type="primary" size="small" @click="addMemberDialogVisible=true">{{$t("projectInfo.member.add")}}</el-button>
    </div>
    <div class="member_list" v-for="(item, index) in memberlist" :key="'member'+index">
      <i :style="`background-color:${item.roleColor}`">
        <template >{{$lang==$global.lang.en?item.roleNameEn:item.roleName}}</template>
        </i>
      <p class="list_img">
        <el-avatar size="medium" >
          <img v-if="item.userProfileImage" :src="$global.avatarURI+item.userProfileImage">
          <span v-else>{{$lang==$global.en?item.userNameEn.slice("")[0]:item.userNameZh.slice("")[0]}}</span>
        </el-avatar>
        <br />
        <span>{{$lang==$global.en?item.userNameEn:item.userNameZh}}</span>
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
      :title="this.$t('projectInfo.member.dialogTitle')"
      :visible.sync="addMemberDialogVisible"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%"
    >
      <el-scrollbar>
        <ChangeAdministrator :params="{id: id, type: 'addMemberForProject'}" @getManager="addMemberForProject"></ChangeAdministrator>
      </el-scrollbar>
    </el-dialog>
    <!-- 添加成员 dialog end -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {getProjectUserApi} from "@/plugins/axios.js"
export default {
  props: {
    // 项目管理员ID
    id: {
      type: String,
      default() {
        return "";
      }
    },
    itemStatus:{
      type:Number,
      default(){
        return 2
      }
    }
  },
  components:{
     // 添加新成员
    ChangeAdministrator: () => import("@/components/member/ChangeAdministrator.vue"),
  },
  data() {
    return {
      memberColors:["#E50054","#FF6D00","#00C853"],
      memberlist: [],
      addMemberDialogVisible:false,
    };
  },
  computed: {
    itemid() {
      return this.$route.params.itemid;
    },
     ...mapGetters("ipublic", ["userInfo"])
  },
  created() {
    this.getMemberList()
  },
  methods: {
    getMemberList(){
      this.$http.post('/user/item/user/rel/withoutpaginglist',{itemId:this.itemid}).then(res=>{
        if(res.iworkuCode==200){
          this.memberlist=res.datas.map(o=>{
            let roleColor;
            switch(o.userRole){
              case this.$global.userRole.regionalManager:{
                roleColor=this.memberColors[0];
                break;
              };
              case this.$global.userRole.projectManager:{
                roleColor=this.memberColors[1];
                break;
              };
              case this.$global.userRole.member:{
                roleColor=this.memberColors[2];
                break;
              };
            }
            return {
              roleColor,
              ...o
            }
          });
        }
      })
    },
    /**
     *  给项目添加成员
     */
    addMemberForProject(data) {
      if (!data || !data.id) {
        return false;
      }
      this.$http.post('/user/item/user/rel/save', {
        itemId: this.itemid,
        userList: [data.id]
      }).then(res => {
        if (res.iworkuCode == 200) {
          this.getMemberList();
          this.addMemberDialogVisible = false;
          this.$imessage({
            content: this.$t("public.tips.success"),
            type: "success"
          });
        }
      })
    }
  },
  watch: {
    id: {
      handler(newVal) {},
      immediate: true
    }
  }
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
      margin: 0 10px;
      font-size: 12px;
      width:100px;
    }
    .list_div {
      display: flex;
      justify-content: space-around;
      flex-grow: 2;
      font-size: 14px;
      font-weight:500;
      color: rgba(123, 123, 123, 1);
      line-height: 17px;
      p :first-of-type {
        font-size: 18px;
        font-weight: 500;
        color: rgba(30, 30, 30, 1);
        line-height: 25px;
      }
      p :last-of-type {
        font-size: 12px;
      }
    }
  }
}
</style>