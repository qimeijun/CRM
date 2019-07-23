<template>
  <div class="iworku-card project-detail-tag">
    <div class="tag_top">
      <h3>{{$t("projectInfo.tag.title")}}</h3>
      <el-button
        v-if="!closable"
        type="text"
        @click="closable=true"
      >{{$t("projectInfo.tag.detele")}}</el-button>
      <el-button v-else type="primary" @click="closable=false">{{$t("projectInfo.tag.ok")}}</el-button>
    </div>
    <p class="tag_p">
      <!-- <span v-for="(item, index) in taglist" :key="'tag'+index">{{item}}</span> -->
      <el-tag
        :style="closable?'color:#8D43FF':''"
        v-for="(item, index) in taglist"
        :key="'tag'+index"
        :closable="closable"
        :color="closable?tagColor:''"
        @close="closeTag(index)"
      >{{ item.labelNameZh}}</el-tag>
      <el-button
        size="medium"
        class="tag_p_button"
        circle
        icon="el-icon-circle-plus"
        type="text"
        @click="show=true"
      ></el-button>
    </p>
    <!-- 添加标签弹窗 start -->
    <el-dialog
      class="el-dialog__scroll"
      :title="$t('projectInfo.tag.dialogTitle')"
      :visible.sync="show"
      top="5vh"
      :append-to-body="true"
      :modal="false"
      :lock-scroll="true"
      width="30%"
    >
      <el-scrollbar class="scrollbar">
        <AddTagForTarget></AddTagForTarget>
      </el-scrollbar>
    </el-dialog>
    <!-- 添加标签弹窗 end -->
  </div>
</template>
<script>
import { getProjectTagApi } from "@/plugins/axios.js";
export default {
  components: {
    AddTagForTarget: () => import("@/components/tag/AddTagForTarget.vue")
  },
  data() {
    return {
      taglist: [],
      closable: false,
      tagColor: "#EBEAEE",
      show: false
    };
  },
  computed: {
    itemid() {
      return this.$route.query.itemid;
    }
  },
  created() {
    this.getTagList();
  },
  methods: {
    closeTag(index) {
      this.taglist.splice(index, 1);
    },
    submitTag() {
      console.log(this.taglist);
    },
    // 获取项目标签
    getTagList() {
      getProjectTagApi({ itemId:this.itemid}).then(res => {
        console.log("项目标签", res);
        if(res.iworkuCode==200){
          this.taglist=res.datas
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.project-detail-tag {
  min-height: 170px;
  margin-bottom: 10px;
  .tag_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      margin: 0;
    }
  }
  .tag_p {
    span {
      display: inline-block;
      padding: 5px 10px;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 20px;
      background-color: #8d43ff;
      color: white;
      border: 0;
    }
  }
  .tag_p_button {
    color: $--default-pink;
    font-weight: bold;
    font-size: 40px;
    padding: 0;
    vertical-align: middle;
  }
}
</style>