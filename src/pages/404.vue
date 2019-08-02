<template>
    <section class="lost">
        <div class="top">
            <img class="four" src="./../assets/img/four.svg" />
            <div class="ooops">
                <span class="first-letter">O</span>oops!
            </div>
            <img class="four" src="./../assets/img/four.svg" />
            <div class="shadow-red"></div>
        </div>
        <div style="position: relative;">
            <img class="picture" src="./../assets/img/img_404.png" />
            <div class="shadow-blue"></div>
        </div>
        
        <div class="tips">
            It seems that the page you were looking for has lost its way.
        </div>
        <el-button class="btn" round @click="$router.push({ path: '/' })">{{ $t("page404.btn") }}</el-button>
    </section>
</template>
<style lang="scss" scoped>
.lost {
    padding-top: .2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    text-align: center;
    .top {
        position: relative;
        display: flex;
        justify-content: center;
    }
    .four {
        display:block; 
        width: 8%;
    }
    .ooops {
        display: inline-block;
        color: white;
        font-size: .35rem;
        line-height: 3rem;
        width: 3rem;
        background: url(./../assets/img/404.gif);
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        .first-letter {
            font-size: .7rem;
        }
    }
    .picture {
        width: 41%;
        display: block;
        margin: auto;
    }
    .btn {
        margin: auto;
        background-color: #75DED0;
        color: white;
        border: none;
        width:156px;
        height:40px;
    }
    .tips {
        color: #31376D;
        font-size:16px;
        margin-bottom: .2rem;
    }
    .shadow-red {
        position: absolute;
        right: 50%;
        transform: translateX(120%);
        width:3.27rem;
        height:3.27rem;
        background: rgba(255, 59, 34, 0.06);
        border-radius: 50%;
        box-shadow:0px 2px 100px 0px rgba(255,59,34,0.15);
    }
    .shadow-blue {
        position: absolute;
        right: 50%;
        top: 0;
        transform: translateX(177%);
        width:3.27rem;
        height:3.27rem;
        background: rgba(73, 55, 234, 0.08);
        border-radius: 50%;
        box-shadow:0px 2px 100px 0px rgba(73,55,234,0.2);
    }
}
</style>
