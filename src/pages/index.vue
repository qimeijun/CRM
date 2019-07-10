<template>
  <div class="content">
    <h2>{{ $t("content") }}</h2>
    <h3 style="margin-top: .4rem;">{{ content }}</h3>

    <el-button type="primary" @click="$_set_content">更改Vuex中的内容</el-button>
    
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex"
import echarts from "echarts"
export default {
  computed: {
    ...mapGetters("example", ["content"])
  },
  data() {
    return {
      dialogVisible: true
    }
  },
  methods: {
    ...mapMutations("example", ["$_set_content"])
  }
};
</script>
<style lang="scss" scoped>
.content {
  h2 {
    margin-top: .3rem;
  }
}
</style>

