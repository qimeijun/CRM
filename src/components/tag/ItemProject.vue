<template>
    <section class="tag-item-project">
        <div v-if="data.id" class="tag-item-project__content">
            <div class="title">{{ data.companyName }}</div>
            <div class="user">
                <el-avatar :size="50" :src="`${$global.avatarURI}${data.probjectManagerProfileImage}`"></el-avatar>
                <div style="margin-left: .1rem;">
                    <p style="font-size:16px;">{{ data.probjectManagerNameZh || data.probjectManagerNameEn }}</p>
                    <i class="el-icon-location">{{ '越南' }}</i>
                </div>
            </div>
            <!-- <div class="tag">
                <span>标签一</span>
                <span>标签一</span>
                <span>标签一</span>
                <span>标签一</span>
                <span>标签一</span>
            </div> -->
        </div>
    </section>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.tag-item-project {
    margin-bottom: .1rem;
    margin-right: .1rem;
    width: 19%;
    height:125px;
    border-radius: $--default-border-radius;
    background-color: $--default-white;
    &__content {
        margin: .15rem;
    }
    .title {
        margin-bottom: .1rem;
        font-size: 14px;
        color: #1E1E1E;
        line-height: 25px;
        overflow: hidden; 
        text-overflow:ellipsis; 
        white-space: nowrap;
    }
    .user {
        display: flex;
        margin-bottom: .1rem;
        align-items: center;
        .el-icon-location {
            margin-top: 5px;
            color: #909090;
        }
    }
    .tag {
        span {
            display: inline-block;
            padding: 5px 10px;
            border-radius:11px;
            background-color: #8D43FF;
            color: #FFFFFF;
            margin-bottom: .08rem;
            margin-right: .08rem;
        }
    }
}
</style>
