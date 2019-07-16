<template>
    <!-- 分组管理 -->
    <section class="group">
        <el-form
          :model="groupForm"
          ref="groupForm"
          label-position="left"
          label-width="80px"
        >
        <el-form-item v-for="(item, index) in groupList" :key="index" :label="`${item.groupNameEn}`" prop="group">
            <el-input class="group__input" style="width: 90%;"
              v-model="item.groupNameEn"
            ></el-input>
            <span class="group__delete">
                <i class="el-icon-delete disabled" @click.stop="onDelete(index)"></i>
            </span>
          </el-form-item>
          <div>
              <span style="color:#D50000; font-size: 12px;">* {{ $t("tag.deleteTips") }}</span>
          </div>
          <el-form-item class="group__btn">
              <el-button type="primary" @click="onConfirmGroup">{{ $t("tag.btn.deleteOk") }}</el-button>
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
        }
    },
    data() {
        return {
            groupForm: {}
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
        onDelete(index)  {
            this.groupList.splice(index, 1);
        },
        /**
         *  确定删除的分组
         */
        onConfirmGroup() {
            this.$emit('onConfirmGroup', this.groupList);
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
