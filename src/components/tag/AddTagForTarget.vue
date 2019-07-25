<template>
    <!-- 给项目或者目标公司 添加标签 -->
    <section class="add-tag">
        <ul class="add-tag__group">
            <li v-for="(item, index) in groupList" @click="onChangeGrop(item)" :class="activeGroup == item.id ? 'active' : ''" :key="index">{{ item.groupNameZh }}</li>
        </ul>
        <div class="add-tag__list">
            <span v-for="(item, index) in tagList" @click="onSelectTag(item)" :class="selectTagSet.has(item.id) ? 'selected': ''" :key="index" :id="item.id">{{ item.labelNameZh }}</span>
        </div>
        <div class="add-tag__bottom">
            <span @click="onAddTag">{{ $t("tag.btn.add") }}</span>
            <el-button type="primary" :loading="submitBtnLoading" @click="onConfirmTag">{{ $t("tag.btn.confirm") }}</el-button>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        /**
         *  区分是操作项目公司还是目标公司
         *  值为： project、target
         */
        type: {
            type: String,
            default() {
                return "project"
            }
        },
        // 目标公司ID还是项目公司ID
        id: {
            type: String,
            default() {
                return "";
            }
        },
        /**
         *  原有的默认标签
         */
        defaultTag: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            activeGroup: '1',
            groupList: [],
            tagList: [],
            selectTagSet: new Set(),
            submitBtnLoading: false
        }
    },
    methods: {
        getGroup() {
            let uri = '/customer/item/label/group/withoutpaginglist';
            if(this.type == 'target') {
                uri = '/target/label/group/withoutpaginglist';
            }
            this.$http.post(uri, { groupStatus: 1 }).then(res => {
                if (res.iworkuCode == 200) {
                    this.groupList = res.datas;
                    this.activeGroup = res.datas[0].id;
                    // 获取标签
                    this.getTag();
                } 
            });
        },
        getTag() {
            let uri = '/customer/item/label/withoutpaginglist';
            if (this.type == 'target') {
                uri = '/target/label/withoutpaginglist';
            }
            this.$http.post(uri, {
                keyWord: '',
                labelGroupId: this.activeGroup
            }).then(res => {
                if (res.iworkuCode == 200) {
                    this.tagList = res.datas;
                }
            });
        },
        /**
         *  切换分组
         */
        onChangeGrop(item) {
            this.activeGroup = item.id;
            this.getTag();
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
            // 重新赋值，否则检测不到数据变更
            this.selectTagSet = new Set(this.selectTagSet);
        },
        /**
         *  添加标签
         */
        onAddTag() {
            this.$router.push({ path: '/tag' });
        },
        /**
         * 确定所选的标签
         */
        onConfirmTag() {
            let tagList = [...this.selectTagSet];
            let params = [];
            if (this.type == 'project') {
                tagList.map(val => {
                    params.push({
                        labelId: val,
                        itemId: this.id
                    });
                });
                this.submitBtnLoading = true;
                this.$http.post('/customer/item/label/rel/save', { itemLabelRelList: params }).then(res => {
                    this.submitBtnLoading = false;
                    if(res.iworkuCode == 200) {
                        this.$imessage({
                            content: this.$t("public.tips.success"),
                            type: "success"
                        });
                        this.$emit("onConfirmTag", tagList);
                    }
                });
            } else if (this.type == 'target') {
                tagList.map(val => {
                    params.push({
                        labelId: val,
                        targetCompanyId: this.id
                    });
                });
                this.submitBtnLoading = true;
                this.$http.post('/target/label/rel/save', { targetCompanyLabelRelList: params }).then(res => {
                    this.submitBtnLoading = false;
                    if (res.iworkuCode == 200) {
                        this.$imessage({
                            content: this.$t("public.tips.success"),
                            type: "success"
                        });
                        this.$emit("onConfirmTag", tagList);
                    }
                });
            }
            
        }
    },
    watch: {
        type: {
            handler(newVal, oldVal) {
                this.getGroup();
            },
            immediate: true
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
