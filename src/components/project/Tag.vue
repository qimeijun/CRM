<template>
  <div class="iworku-card project-detail-tag">
    <div class="tag_top">
      <h3>标签</h3>
      <el-button v-if="!closable" type="text" @click="closable=true">删除标签</el-button>
      <el-button v-else type="primary" @click="submitTag">完成</el-button>
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
      >{{ item }}</el-tag>
      <el-button size="medium" class="tag_p_button" circle icon="el-icon-circle-plus" type="text"></el-button>
    </p>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      taglist: ["标签1", "标签2", "标签3", "标签4", "标签5"],
      closable: false,
      tagColor: "#EBEAEE"
    };
  },
  methods: {
    closeTag(index){
      this.taglist.splice(index, 1);
    },
    submitTag(){
      console.log(this.taglist);
    }
  },
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
      line-height: 20px;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 20px;
      background-color: #8d43ff;
      color: white;
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