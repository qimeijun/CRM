<template>
  <div class="member__content">
    <div class="member__content-top">
      <span>
        <!-- {{ $t("member.regional") }} -->
        {{ regionalData.regionName }}
        <span v-if="userInfo.userRole == $global.userRole.superAdministrator" style="color: #4937EA; font-size:14px;">
          <span style="cursor: pointer;" @click="modifyRegionDialogVisible=true;">{{ $t("addRegion.btn.modify2") }}</span>/
          <span style="cursor: pointer;" @click="onDeleteRegion">{{ $t("addRegion.btn.delete") }}</span>
        </span>
      </span>
      <!-- 管理区域管理员按钮
           限制：
            1、只有超级管理员才能管理 -->
      <el-button v-if="userInfo.userRole == $global.userRole.superAdministrator" type="primary" size="mini" @click="isUpdateManager=!isUpdateManager;">
        <template v-if="isUpdateManager">{{ $t("member.btn.ok") }}</template>
        <template v-else>{{ $t("member.btn.regional") }}</template>
      </el-button>
    </div>
    <!-- 区域经理 start -->
    <div class="member__regional">
      <div
        v-for="(item, index) in regionalData.regionalManagerList"
        :key="index"
        class="member__regional-content"
        @click="onDetail(item)"
      >
        <el-avatar :size="50" :src="`${$global.avatarURI}${item.userProfileImage}`"></el-avatar>
        <div class="member__regional-content-right">
          <span>{{ item.userNameZh }}</span>
          <span>{{ $t("public.role.regionalManager") }}</span>
        </div>
        <i v-if="isUpdateManager" class="el-icon-error" @click="onDeleteManager(item, index)"></i>
      </div>
      <!-- 
          功能：添加区域经理 start 
          限制：1、最多只能添加4个区域经理
                2、只有管理员才能添加
      -->
      <template v-if="userInfo.userRole == $global.userRole.superAdministrator">
        <div 
          v-if="regionalData && regionalData.regionalManagerList && regionalData.regionalManagerList.length < 4"
          class="member__regional-content member__regional-content-add"
          @click="onAddManager"
        >{{ $t("member.btn.addRegional") }}</div>
      </template>
      <!-- 添加区域经理 end-->
    </div>
    <!-- 区域经理 end -->

    <!-- 表格 list  start -->
    <div class="member__table" style="width: 100%;">
      <div class="member__table-tr member__table-th">
        <div>{{ $t('memberManagement.table[0]') }}</div>
        <div>{{ $t('memberManagement.table[1]') }}</div>
        <div>{{ $t('memberManagement.table[2]') }}</div>
        <div>{{ $t('memberManagement.table[3]') }}</div>
        <div>{{ $t('memberManagement.table[4]') }}</div>
        <div style="flex: .8">{{ $t('memberManagement.table[5]') }}</div>
        <div style="flex: .3">{{ $t('memberManagement.table[6]') }}</div>
      </div>
      <!-- 团队 list -->
      <template v-if="teamList && teamList.length > 0">
        <template v-for="(item, index) in teamList">
          <!-- 一定是先有项目经理才有团队，最后才能在团队里添加成员 -->
          <template v-if="item">
            <!-- 管理员 start -->
            <TableList  v-if="item.projectManager" :key="index + 1" :item="{...item.projectManager, ...{team: item.teamName, teamId: item.id, userList: item.userInfoList}}"></TableList>
            <!-- 管理员 end -->
            <!-- 成员 list start-->
            <template v-if="item.userInfoList && item.userInfoList.length > 0">
              <TableList
                v-for="(cItem, cIndex) in item.userInfoList"
                :key="`${cIndex}-${cItem.id}`"
                :children="true"
                :last="cIndex+1 == item.userInfoList.length ? true : false"
                :item="{...cItem, ...{team: item.teamName, teamId: item.id}}"
              ></TableList>
            </template>
            <!-- 成员 list end -->
          </template>
          <template v-else>
            <div :key="`${index}-nodata`" style="margin-top: 10px;height:290px; background:#F0F0F0; border-radius:8px;"></div>
          </template>
        </template>
      </template>
      <!-- 区域没有团队时 -->
      <template v-else>
        <div style="margin-top: 10px;height:290px; background:#F0F0F0; border-radius:8px;"></div>
      </template>
    </div>
    <!-- 表格 list  end -->


    <!-- 添加区域 dialog start -->
      <el-dialog
        class="el-dialog__scroll"
        :title="$t('addRegion.modify')"
        :visible.sync="modifyRegionDialogVisible"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        :close-on-click-modal="false"
        :width="$global.dialogWidth"
      >
      <ModifyRegion :regionInfo="{id: regionalData.regionId,name: regionalData.regionName, country: regionalData.regionCountry, city: regionalData.regionCity}" 
          @onOperateSuccess="onModifySuccess"></ModifyRegion>
      </el-dialog>
      <!-- 添加区域 dialog end -->
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  props: {
    data: {
      type: Object || Array,
      default() {
        return {};
      }
    }
  },
  components: {
    // 表格列表
    TableList: () => import("@/components/member/Table.vue"),
    ModifyRegion: () => import("@/components/member/AddRegion.vue")
  },
  data() {
    return {
      isUpdateManager: false,
      regionalData: {},
      teamList: [],
      modifyRegionDialogVisible: false
    };
  },
  computed: {
    ...mapGetters("ipublic", ["userInfo"])
  },
  methods: {
    /**
     *  点击添加区域经理，调用父级的弹窗
     */
    onAddManager() {
      this.$parent.$parent.addManagerDialogVisible = true;
      this.$emit("getRegionId", this.regionalData.regionId);
    },
    /**
     *  删除经理
     */
    onDeleteManager(params, index) {
      this.$http
        .post("/user/region/user/rel/regional/manager/delete", {
          regionId: this.regionalData.regionId,
          userId: params.id
        })
        .then(res => {
          if (res.iworkuCode == 200) {
            this.regionalData.regionalManagerList.splice(index, 1);
          }
        });
    },
    /**
     *  查看区域经理的详情
     */
    onDetail(item) {
      // 存储用户信息
      this.$store.commit('members/$_set_memberInfo', {
        teamId: item.teamId, 
        userId: item.id, 
        username: item.userNameZh,
        userRole: item.userRole
      });
      this.$router.push({ path: `/member/detail/info/${item.id}` });
    },
    /**
     * 修改区域信息成功
     */
    onModifySuccess(data) {
      this.regionalData.regionName = data.name;
      this.modifyRegionDialogVisible = false;
    },
    /**
     *  删除区域
     */
    onDeleteRegion() {
       this.$confirm(
        `<i class="el-icon-question" style="color: #E50054; font-size: 48px;"></i><br/>${this.$t("memberInfo.deleteTip")}`,
        this.$t("memberInfo.priviteShiftInTip.title"),
        {
          confirmButtonText: this.$t("memberInfo.priviteShiftInTip.btn[0]"),
          cancelButtonText: this.$t("memberInfo.priviteShiftInTip.btn[1]"),
          center: true,
          dangerouslyUseHTMLString: true,
          confirmButtonClass: "iworku-confirm-button region-delete-confirm",
          cancelButtonClass: "iworku-confirm-cancel-button region-delete-cancel"
        }
      ).then(() => {
        this.$http.post('/user/region/remove', {id: this.regionalData.regionId}).then(res => {
          if (res.iworkuCode == 200) {
            this.$imessage({
                content: this.$t("public.tips.success"),
                type: "success"
            });
            this.$store.commit('ipublic/$_remove_region', this.regionalData.regionId);
            this.$router.push({ path: '/' });
          }
        });
      });
      
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (!newVal) return false;
        this.regionalData = { ...newVal };
        // 这个区域下的团队
        this.teamList = newVal.teamResponseVOList || [];
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.member {
  &__content {
    padding: 0.2rem;
    background-color: $--default-white;
    border-radius: $--default-border-radius;
    margin-bottom: 10px;
    &-top {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-size: 16px;
      font-weight: 600;
    }
    .el-table--expend {
      background-color: $--default-white;
    }
  }
  &__table {
    color: #606266;
    &-th {
      line-height: 30px;
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 700;
      align-items: center;
      background-color: $--default-light-gray-2;
      border-radius: $--default-border-radius;
      div {
        flex: 1;
        padding: 0.1rem;
      }
    }
  }
  &__regional {
    display: flex;
    flex-wrap: wrap;
    &-content {
      position: relative;
      padding: 0.15rem 1%;
      margin-bottom: 15px;
      margin-right: 0.8%;
      width: 22%;
      display: flex;
      align-items: center;
      background-color: $--default-light-gray-2;
      border-radius: $--default-border-radius;
      cursor: pointer;
    }
    &-content-right {
      margin-left: 0.1rem;
      color: #7b7b7b;
      line-height: 25px;
      span {
        display: block;
      }
      span:first-child {
        font-size: 16px;
        color: $--default-black;
      }
    }
    &-content-add {
      background-color: #f8f8f8;
      border: 1px solid #ebeaee;
      font-size: 16px;
      color: $--default-color;
      height: 48px;
      cursor: pointer;
    }
    .el-icon-error {
      position: absolute;
      font-size: 20px;
      right: -10px;
      top: -10px;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.region-delete-confirm {
  float: left;
  margin-left: 35% !important;
}
.region-delete-cancel {
  float: right;
  margin-right: 35% !important;
}
</style>