<template>
    <WorkDiary type="target" :id="$route.params.targetid" :itemid="$route.params.itemid"></WorkDiary>
</template>
<script>
export default {
    components: {
        WorkDiary: () => import('@/components/work/WorkDiary.vue')
    }
}
</script>