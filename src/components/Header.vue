<template>
    <section class="head">
        <h1 class="head__title">全球本地化营销管理系统</h1>
        <ul class="head__right">
            <li><i class="el-icon-refresh-right"></i></li>
            <li>
                <span class="head__right__lang">EN</span>
            </li>
            <li>
                <el-badge :value="200" :max="99" class="head__right__message">
                    <i class="el-icon-message-solid"></i>
                </el-badge>
            </li>
            <li class="head__avatar">
                <img class="head__avatar__img" src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7" alt="">
                <span class="head__avatar__name">张三</span>
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .3rem;
    background-color: #f3f1f1;
    &__title {
        font-size: 0.28rem;
    }
    &__right {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: .24rem;
        li {
            padding: 0 .15rem;
        }
        li:not(:last-child)::after {
            content: "|";
            margin-left: 0.25rem;
        }
        .el-icon-refresh-right, .el-icon-message-solid {
            cursor: pointer;
        }
        &__lang {
            cursor: pointer;
        }
    }
    &__avatar {
        display: flex;
        align-items: center;
        &__img {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            cursor: pointer;
        }
        &__name {
            margin-left: .1rem;
        }
    }
}
</style>
