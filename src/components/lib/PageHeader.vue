<template>
    <section class="page-header">
        <i class="el-icon-back" @click="goBack"></i>
    </section>
</template>
<script>
export default {
    methods: {
        goBack() {
            this.router.back();
        }
    }
}
</script>

<style lang="scss" scoped>
.page-header {
    width:50px;
    height:50px;
    border-radius: $--default-border-radius;
    background-color: $--default-color;
    text-align: center;
    .el-icon-back {
        color: $--default-white;
        font-size: 30px;
        line-height: 50px;
        cursor: pointer;
    }
}
</style>
