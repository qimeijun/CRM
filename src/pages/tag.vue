<template>
    <div>
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
          <AddTag></AddTag>
        </el-scrollbar>
      </el-dialog>
      <!-- 添加成员 dialog end -->
    </div>
</template>
<script>
export default {
    components: {
        AddTag: () => import('@/components/tag/AddTagForTarget.vue')
    },
    data() {
        return {
            addMemberDialogVisible:true
        }
    },
}
</script>