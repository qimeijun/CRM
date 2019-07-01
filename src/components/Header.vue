<template>
    <section class="head">
        <h1 class="head__title">全球本地化营销管理系统</h1>
        <ul class="head__right">
            <li>EN</li>
            <li>Settings</li>
            <li>Notice</li>
            <li>
                <img class="head__avatar" src="https://vodcn.iworku.com/Fv2iSp_yw1RrjYkvKMGZ251BAvT7" alt="">
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
    height: 1.09rem;
    background-color: #f3f1f1;
    &__title {
        font-size: 0.28rem;
    }
    &__right {
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
            padding: 0 .2rem;
        }
        li:not(:last-child)::after {
            content: "|";
            margin-left: 0.4rem;
        }
    }
    &__avatar {
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
}
</style>
