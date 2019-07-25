<template>
    <WorkDiary type="member"></WorkDiary>
</template>
<script>
export default {
    components: {
        WorkDiary: () => import('@/components/work/WorkDiary.vue')
    }
}
</script>
