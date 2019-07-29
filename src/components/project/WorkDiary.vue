<template>
    <WorkDiary type="project" :id="id"></WorkDiary>
</template>
<script>
export default {
    components: {
        WorkDiary: () => import('@/components/work/WorkDiary.vue')
    },
    data() {
        return {
            id: this.$route.params.itemid
        }
    }
}
</script>
