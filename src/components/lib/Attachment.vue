<template>
    <section class="attachment">
        <div class="logo" :title="name" 
             :style="`background-color: ${suffixFirstLetter && colors.get(suffixFirstLetter) && colors.get(suffixFirstLetter)[0]}`">
            <span class="white"></span>
            <span class="angle" :style="`border-bottom: 12px solid ${suffixFirstLetter && colors.get(suffixFirstLetter) && colors.get(suffixFirstLetter)[1]}`"></span>
            <template v-if="colors.has(suffixFirstLetter)">
                {{ suffixFirstLetter }}
            </template>
            <template v-else>
                <i class="el-icon-paperclip"></i>
            </template>
            <i v-if="isDelete" class="el-icon-error" @click.stop="onDelete"></i>
        </div>
        <p class="name">{{ name }}</p>
    </section>
</template>
<script>
export default {
    props: {
        // 文件名称 字符串类型
        name: {
            type: String,
            default() {
                return "";
            }
        },
        // 是否显示删除按钮
        isDelete: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    data() {
        return {
            suffixFirstLetter: "",
            colors: new Map([["P", ["#F39470", "#D07159"]], ["W",[ "#2B79E7", "#0A4EAF"]], ["X", ["#59CC9A", "#209562"]]])
        }
    },
    methods: {
        // 文件删除
        onDelete() {
            this.$emit("onDelete");
        }
    },
    watch: {
        name: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.suffixFirstLetter = newVal.substr(newVal.lastIndexOf('.') + 1)[0].toLocaleUpperCase();
                }
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
.attachment {
    display: inline-block;
    margin-right: .2rem;
    width: 45px;
    cursor: pointer;
    .logo {
        position: relative;
        margin-bottom: 10px;
        position: relative;
        width: 45px;
        height: 55px;
        font-size: 26px;
        color: white;
        text-align: center;
        line-height: 55px;
        background-color: #59cc6b;
        .el-icon-error {
            position: absolute;
            color: black;
            font-size: 14px;
            top: -5px;
            right: -7px;
            cursor: pointer;
        }
    }
    .white {
        position: absolute;
        right: 0;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 12px solid white;
        border-left: 12px solid transparent;       
    }
    .angle {
        position: absolute;
        right: 0;
        display: inline-block;
        width: 0;
        height: 0;
        border-bottom: 12px solid #1b982e;
        border-right: 12px solid transparent;  
    }
    .name {
        font-size:12px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
}
</style>
