<template>
    <section v-if="isShow" class="message">
        <div class="cont">
            <img class="img" v-if="type == 'success'" src="./../../assets/img/succeed.gif" alt="">
            <img class="img" v-else src="./../../assets/img/fault.gif" alt="">
            <div class="content">
                {{ content }}
            </div>
        </div>
        <span class="close" @click="addClose">{{ $lang == $global.lang.en ? 'close' : '关闭' }}</span>
    </section>
</template>
<script>
export default {
    name: "IMessage",
    props: {
        content: {
            type: String,
            default() {
                return "";
            }
        },
        // 弹窗样式，错误弹窗还是操作成功的弹窗
        type: {
            type: String,
            default() {
                return "success";
            }
        }
    },
    data() {
        return {
            isShow: true
        }
    },
    methods: {
        // 关闭弹窗
        addClose() {
            this.isShow = false;
        }
    },
    watch: {
        content(newVal, oldVal) {}
    }
}
</script>
<style lang="scss" scoped>
.message {
    position: fixed;
    top: 25%;
    left: 50%;
    display: flex;
    align-items: center;
    width:264px;
    height:264px;
    padding: .1rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 40px 0px rgba(229,0,84,0.2);
    border-radius:8px;
    transform: translateX(-50%);
    text-align: center;
    .cont {
        width: 100%;
    }
    .img {
        width:96px;
        height:96px;
    }
    .content {
        font-size: 16px;
        color: #000000;
        line-height: 25px;
    }
    .close {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        color: #8D43FF;
        cursor: pointer;
    }
}
</style>
