<template>
    <section ref="iworku-message" v-if="isShow" class="iworku-c-message">
        <div :class="{'message': true, 'message--in': isShow, 'message--out': !isShow}">
            <div class="cont">
                <img class="img" v-if="type == 'success'" src="./../../assets/img/succeed.gif" alt="">
                <img class="img" v-else src="./../../assets/img/fault.gif" alt="">
                <div class="content">
                    {{ content }}
                </div>
            </div>
            <span class="close" @click="addClose">{{ $lang == $global.lang.en ? 'close' : '关闭' }}</span>
        </div>
        <!-- 底部遮罩 start -->
        <div class="mask" @click="addClose"></div>
        <!-- 底部遮罩 end -->
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
    created() {
        // setTimeout(()=>{ this.isShow = false;}, 3*1000)
        setTimeout(()=>{ this.isShow = false;}, 3* 1000 * 200);
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
.iworku-c-message {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 9999;
    .mask {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 9998;
    }
}

.message {
    position: fixed;
    // top: 25%;
    top: 10%;
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
    z-index: 9999;
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

    &--in {
        animation: moveIn .3s ease-in forwards;
    }
    &--out {
        animation: moveOut .3s forwards;
    }
    // 显示的动画
    @keyframes moveIn {
        from { top: 10%; display: none; }
        to { top: 25%; display: flex; }
    }

    // 显示关闭的动画
    @keyframes moveOut {
        from { top: 25%; display: flex };
        to { top: 0; display: none; }
    }
}
</style>
