<template>
    <!-- 给项目或者目标公司 添加标签 -->
    <section class="add-tag">
        <!-- 分组 -->
        <ul class="add-tag__group">
            <li v-for="(item, index) in groupList" @click="onChangeGrop(item)" :class="activeGroup == item.id ? 'active' : ''" :key="index">{{ item.groupNameZh }}</li>
        </ul>
        <!-- 标签 -->
        <div class="add-tag__list">
            <span v-for="(item, index) in tagList" @click="onSelectTag(item)" 
                 :class="[selectTagMap.has(item.id) ? 'selected': '56']" :key="index" :id="item.id">{{ item.labelNameZh }}</span>
        </div>
        <!-- btn -->
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
         *  值为： project 或者 target
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
         *  {
         *      id: "0f28f200-a2ee-11e9-b080-946e68be8353" 必传参数
                labelNameEn: "标签显示中文名称"
                labelNameZh: "标签显示中文名称" 必传参数
         *  }
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
            activeGroup: null,
            groupList: [],
            tagList: [],
            selectTagMap: new Map(),
            submitBtnLoading: false,
            deleteTagMap: new Map()
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
            if (Object.keys(item).length == 0) {
                return false;
            }
            /**
             * 如果已经选择的，点击一下就删除
             * 如果原来没有选择，点击一下就添加
             */
            if (this.selectTagMap.has(item.id)) {
                // 如果存在标签，那么就删除
                this.deleteTagMap.set(item.id, item);
                this.selectTagMap.delete(item.id);
            } else {
                this.deleteTagMap.delete(item.id, item);
                this.selectTagMap.set(item.id, item);
            }
            // 重新赋值，否则检测不到数据变更
            this.selectTagMap = new Map(this.selectTagMap);
            this.deleteTagMap = new Map(this.deleteTagMap);
        },
        /**
         *  添加标签
         */
        onAddTag() {
            if (this.type == 'target') {
                this.$router.push({ path: `/tag/target` });
            } else {
                this.$router.push({ path: `/tag` });
            }
        },
        /**
         * 确定所选的标签
         */
        onConfirmTag() { 
            if (!this.id) {
                return false;
            }
            // 添加列表中是否存在之前已经存在的标签
            let alreadExist = this.defaultTag.filter(val => this.selectTagMap.has(val.id));
            if (alreadExist) {
                alreadExist.map(val => {
                    this.selectTagMap.delete(val.id);
                });
            }
            let addTagList = [...this.selectTagMap.values()];
            let deleteTagList = [...this.deleteTagMap.values()];
            let params = [];
            if (this.type == 'project') {
                addTagList.map(val => {
                    params.push({
                        labelId: val.id,
                        itemId: this.id,
                        type: 1
                    });
                });
                
                deleteTagList.map(val => {
                    params.push({
                        labelId: val.id,
                        itemId: this.id,
                        type: 2
                    })
                })
                this.submitBtnLoading = true;
                this.$http.post('/customer/item/label/item/label/rel/update', { itemLabelRelList: params }).then(res => {
                    this.submitBtnLoading = false;
                    if(res.iworkuCode == 200) {
                        this.$imessage({
                            content: this.$t("public.tips.success"),
                            type: "success"
                        });
                        this.$emit("onConfirmTag", [...this.selectTagMap.values(), ...alreadExist]);
                    }
                });
            } else if (this.type == 'target') {
                addTagList.map(val => {
                    params.push({
                        labelId: val.id,
                        targetCompanyId: this.id,
                        type: 1
                    });
                });
                deleteTagList.map(val => {
                    params.push({
                        labelId: val.id,
                        targetCompanyId: this.id,
                        type: 2
                    })
                })
                this.submitBtnLoading = true;
                this.$http.post('/target/label/rel/update', { targetCompanyLabelRelList: params }).then(res => {
                    this.submitBtnLoading = false;
                    if (res.iworkuCode == 200) {
                        this.$imessage({
                            content: this.$t("public.tips.success"),
                            type: "success"
                        });
                        this.$emit("onConfirmTag", [...this.selectTagMap.values(), ...alreadExist]);
                    }
                });
            }
        }
    },
    watch: {
        type: {
            handler(newVal) {
                this.getGroup();
            },
            immediate: true
        },
        defaultTag: {
            handler(newVal) {
                if (newVal && newVal.length > 0) {
                    newVal.map(val => {
                        if (val.labelId) val.id = val.labelId;
                        (val && val.id) ? this.selectTagMap.set(val.labelId, Object.assign({}, val)) : null;
                    });
                    this.selectTagMap = new Map(this.selectTagMap);
                }
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
