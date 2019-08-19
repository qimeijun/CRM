<template>
    <section class="tag-item-target">
        <div v-if="data.id" class="tag-item-target__content">
            <div class="title">{{ data.targetCompanyName }}</div>
            <!-- <div class="user">
                <el-avatar :size="50" src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7"></el-avatar>
                <div style="margin-left: .1rem;">
                    <p style="font-size:16px;">zhangsan</p>
                    <i class="el-icon-location">越南</i>
                </div>
            </div> -->
            <div class="rate">
                <el-rate
                    :value="parseInt(data.grade)"
                    :colors="['#E50054', '#E50054', '#E50054']"
                    disabled>
                </el-rate>
                <span style="display: inline-block; margin-top: 10px;">{{ data.statusName }}</span>
            </div>
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
    },
    data() {
        return {
            value: 4
        }
    }
}
</script>
<style lang="scss" scoped>
.tag-item-target {
    margin-bottom: .1rem;
    margin-right: .1rem;
    width: 19%;
    height:140px;
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
}
</style>
<style lang="scss">
.tag-item-target {
    .rate {
        .el-icon-star-on {
            font-size: 25px;
        }
        .el-rate__icon {
            margin-right: 2px;
        }
    }
}
</style>


