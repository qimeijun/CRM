<template>
    <!-- 查看个人资料 -->
    <section class="member-info">
        <div style="flex: 2; margin-right: .1rem;">
            <div class="member-info__details">
                <el-avatar :size="100" src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"></el-avatar>
                <div class="member-info__details-left">
                    <p class="member-info__details-left-name">Zhangsan</p>
                    <p class="el-icon-location">chengdu,China</p>
                    <p class="member-info__details-left-gender">男</p>
                </div>
                <el-button class="member-info__details-left-btn" type="primary" @click="modifyMemberDialogVisible=true">{{ $t("memberInfo.btn.modify") }}</el-button>
            </div>
            <div class="member-info__account">
                <div>
                    <p class="member-info__account-title">{{ $t("memberInfo.account") }}</p>
                    <p class="member-info__account-value">sjdkjfuisjsdfisjfksdf@iworku.com</p>
                    <p class="member-info__account-title">{{ $t("memberInfo.password") }}</p>
                    <p class="member-info__account-value">***********</p>
                </div>
                <el-button class="member-info__details-left-btn" type="primary" @click="modifyPasswordDialogVisible=true">{{ $t("memberInfo.btn.password") }}</el-button>
            </div>
        </div>
        <div class="member-info__pie">饼图</div>
        <div class="member-info__line">线形图</div>

        <!-- 修改成员信息 dialog start -->
        <el-dialog
        class="el-dialog__scroll"
        :title="$t('selectRegionalManager.title')"
        :visible.sync="modifyMemberDialogVisible"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        width="30%">
        <el-scrollbar class="scrollbar">
            <AddMember></AddMember>
        </el-scrollbar>
        </el-dialog>
        <!-- 修改成员信息 dialog end -->
        <!-- 修改成员密码 dialog start -->
        <el-dialog
        :title="$t('selectRegionalManager.title')"
        :visible.sync="modifyPasswordDialogVisible"
        top="5vh"
        :append-to-body="true"
        :modal="false"
        :lock-scroll="true"
        width="30%">
        <el-scrollbar class="scrollbar">
            <UpdatePassword></UpdatePassword>
        </el-scrollbar>
        </el-dialog>
        <!-- 修改成员密码 dialog end -->
    </section>
</template>
<script>
import AddMember from '@/components/AddMember.vue';
import UpdatePassword from '@/components/UpdatePassword.vue';
export default {
    components: {
        AddMember,
        UpdatePassword
    },
    data() {
        return {
            modifyMemberDialogVisible: false,
            modifyPasswordDialogVisible: false
        }
    }
}
</script>
<style lang="scss" scoped>
.member-info {
    margin: 20px 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    &__details {
        display: flex;
        align-items: flex-start;
        padding: .3rem .2rem;
        background-color: $--default-white;
        border-radius: $--default-border-radius;
        &-left {
            line-height: 30px;
            margin-left: .2rem;
        }
        &-left-name {
            font-size:16px;
        }
        .el-icon-location {
            font-size: 12px;
        }
        &-left-btn {
            margin-left: auto;
        }
    }
    &__account {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 20px;
        padding: .3rem .2rem;
        background-color: $--default-white;
        border-radius: $--default-border-radius;
        line-height: 35px;
        &-title {
            color: $--default-light-gray;
        }
    }
    &__pie {
        margin-right: .1rem;
        padding: .3rem .2rem;
        flex: 1;
        background-color: $--default-white;
        border-radius: $--default-border-radius;
    }
    &__line {
        flex: 1;
        padding: .3rem .2rem;
        width: 28%;
        background-color: $--default-white;
        border-radius: $--default-border-radius;
    }
}
</style>
