<template>
    <section class="member-team">
        <div class="member-team__list">
            <div class="member-team__list-name">gzhangsan</div>
        </div>
        <div class="member-team__statistics"></div>
    </section>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.member-team {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    &__list {
        flex: 1;
        margin-right: .1rem;
        
        &-name {
            text-transform:capitalize;
        }
        &-name:first-letter {
            font-size: 30px;
            color: red;
        }
    }
    &__statistics {
        flex: 1;
    }
}
</style>
