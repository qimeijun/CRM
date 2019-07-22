<template>
    <!-- 给项目或者目标公司 添加标签 -->
    <section class="add-tag">
        <ul class="add-tag__group">
            <li v-for="(item, index) in groupList" @click="onChangeGrop(item)" :class="activeGroup == item.id ? 'active' : ''" :key="index">{{ item.value }}</li>
        </ul>
        <div class="add-tag__list">
            <span v-for="(item, index) in tagList" @click="onSelectTag(item)" :class="selectTagSet.has(item.id) ? 'selected': ''" :key="index" :id="item.id">{{ item.value }}</span>
        </div>
        <div class="add-tag__bottom">
            <span @click="onAddTag">{{ $t("tag.btn.add") }}</span>
            <el-button type="primary" @click="onConfirmTag">{{ $t("tag.btn.confirm") }}</el-button>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            activeGroup: '1',
            groupList: [
                {
                    value: "默认",
                    id: "1"
                },
                {
                    value: "分组2",
                    id: "2"
                },
                {
                    value: "分组3",
                    id: "2"
                },
                {
                    value: "分组4",
                    id: "4"
                }
            ],
            tagList: [
                {
                    value: "关键人信息不完整",
                    id: "1"
                },
                {
                    value: "关键人",
                    id: "2"
                },
                {
                    value: "腾道推荐企业",
                    id: "3"
                },
                {
                    value: "腾道推荐企业",
                    id: "4"
                },
                {
                    value: "腾道推荐企业",
                    id: "5"
                },
                {
                    value: "腾道推荐企业",
                    id: "6"
                },
                {
                    value: "sdfsdfd",
                    id: "7"
                },
                {
                    value: "sjdfksjdf",
                    id: "8"
                },
                {
                    value: "有意向",
                    id: "9"
                },
                {
                    value: "关键人信息不完整",
                    id: "10"
                }
            ],
            selectTagSet: new Set(),
        }
    },
    methods: {
        /**
         *  切换分组
         */
        onChangeGrop(item) {
            this.activeGroup = item.id;
        },
        /**
         *  选择标签
         */
        onSelectTag(item) {
            /**
             * 如果已经选择的，点击一下就删除
             * 如果原来没有选择，点击一下就添加
             */
            this.selectTagSet.has(item.id) ? this.selectTagSet.delete(item.id) : this.selectTagSet.add(item.id);
            // 重新复制，否则检测不到数据变更
            this.selectTagSet = new Set(this.selectTagSet);
        },
        /**
         *  添加标签
         */
        onAddTag() {
            // this.$emit('onAddTag');
            this.$router.push({ path: '/tag' });
        },
        /**
         * 确定所选的标签
         */
        onConfirmTag() {
            this.$emit("onConfirmTag", [...this.selectTagSet]);
        }
    }
}
</script>
<style lang="scss" scoped>
.add-tag {
    position: relative;
    &__group {
        display: flex;
        border-bottom: 1px solid #BBBBBB;
        li {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
        li:hover, .active {
            color: $--default-color;
        }
    }
    &__list {
        min-height: 40vh;
        margin-top: 10px;
        margin-bottom: 60px;
        span {
            padding: 5px 15px;
            margin-right: .1rem;
            margin-bottom: .1rem;
            display: inline-block;
            background-color: #BBBBBB;
            color: $--default-white;
            border-radius: 15px;
            cursor: pointer;
        }
        .selected {
            background-color: #8D43FF;
        }
    }
    &__bottom {
        padding-top: 15px;
        width: 100%;
        position: absolute;
        bottom: -60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #EBEAEE;
        span {
            color: #4937EA;
            cursor: pointer;
        }
    } 
}
</style>
