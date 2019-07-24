<template>
    <!-- 分组管理 -->
    <section class="group">
        <el-form
          :model="groupForm"
          ref="groupForm"
          label-position="left"
          label-width="30px"
        >
            <el-form-item v-for="(item, index) in groupList" :key="index" :label="`${index + 1}`" prop="group">
                <el-input class="group__input" style="width: 90%;"
                v-model="item.groupNameEn"
                ></el-input>
                <span class="group__delete">
                    <i :class="`el-icon-delete ${item.isDelete ? '' : 'disabled'}`" @click.stop="onDelete(item,index)"></i>
                </span>
            </el-form-item>
            <el-form-item v-if="(type == 'project' && groupList.length < 4) || (type == 'target' && groupList.length < 10)" style="text-align: center;">
                <el-button style="width: 50%;" type="primary" @click="onAddGroup"><i class="el-icon-plus"></i></el-button>
            </el-form-item>
            <div>
                <span style="color:#D50000; font-size: 12px;">* {{ $t("tag.deleteTips") }}</span>
            </div>
            <el-form-item class="group__btn">
                <el-button type="primary" :loading="submitBtnLoading" @click="onConfirmGroup">{{ $t("tag.btn.ok") }}</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
export default {
    props: {
        /**
         *  数据传入，分组信息
         */
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        /**
         *  区分是目标公司添加还是项目公司添加
         */
        type: {
            type: String,
            default() {
                return "project";
            }
        }
    },
    data() {
        return {
            groupForm: {},
            deleteGroupList: [],
            submitBtnLoading: false
        }
    },
    computed: {
        groupList: {
            get: function () {
                return this.data;
            },
            set: function (newVal) {
                return newVal;
            }
        }
    },
    methods: {
        /**
         *  删除分组
         */
        onDelete(item, index)  {
            if (item.isDelete) {
                this.groupList[index].groupStatus = 2;
               let res = this.groupList.splice(index, 1);
               res.length > 0 ? this.deleteGroupList.push(...res) : null;
            }
        },
        /**
         *  确定删除的分组
         */
        onConfirmGroup() {
            let params = [];
            // 正常的标签
            this.groupList.map(val => {
                params.push({
                    id: val.id,
                    groupNameEn: val.groupNameEn,
                    groupNameZh: val.groupNameEn,
                    groupStatus: 1
                });
            });
            // 删除的标签
            this.deleteGroupList.map(val => {
                params.push({
                    id: val.id,
                    groupNameEn: val.groupNameEn,
                    groupNameZh: val.groupNameEn,
                    groupStatus: 2
                });
            });
            if (this.type == 'project') {
                this.submitBtnLoading = true;
                this.$http.post('/customer/item/label/group/list/update', {labelGroupList: params}).then(res => {
                    this.submitBtnLoading = false;
                    if (res.iworkuCode == 200) {
                        this.$imessage({
                            content: this.$t("public.tips.success"),
                            type: "success"
                        });
                        this.$emit('onConfirmGroup', this.groupList);
                    }
                });
            } else if (this.type == 'target') {
                this.submitBtnLoading = true;
                this.$http.post('/target/label/group/list/update', { labelGroupList: params }).then(res => {
                    this.submitBtnLoading = false;
                    if (res.iworkuCode == 200) {
                        this.$imessage({
                            content: this.$t("public.tips.success"),
                            type: "success"
                        });
                        this.$emit('onConfirmGroup', this.groupList);
                    }
                })
            }
        },
        /**
         *  新增添加输入框
         */
        onAddGroup() {
            if (this.type == 'project' && this.groupList.length < 4) {
                this.groupList.push({
                    'groupNameEn': "",
                    isDelete: true
                });
            } else if (this.type == 'target' && this.groupList.length < 10) {
                this.groupList.push({
                    groupNameEn: "",
                    isDelete: true
                });
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.group {
    &__input {
        width: 80%;
        margin-right: .1rem;
    }
    &__delete {
        cursor: pointer;
    }
    &__btn {
        margin-top: 20px;
        border-top: 1px solid $--default-light-gray-2;
        padding-top: 20px;
        text-align: right;
    } 
    .disabled {
        color: #BBBBBB;
        cursor: not-allowed;
    }
}
</style>
