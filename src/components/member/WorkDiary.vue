<template>
    <WorkDiary type="member" :id="id"></WorkDiary>
</template>
<script>
export default {
    data() {
        return {
            id: this.$route.query.id
        }
    },
    components: {
        WorkDiary: () => import('@/components/work/WorkDiary.vue')
    }
}
</script>
