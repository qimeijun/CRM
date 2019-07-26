<template>
    <WorkDiary type="target"></WorkDiary>
</template>
<script>
export default {
    components: {
        WorkDiary: () => import('@/components/work/WorkDiary.vue')
    }
}
</script>