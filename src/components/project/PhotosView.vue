<template>
  <section class="iworku-photosview">
    <p class="photosview_img" @click="photosShow=true">
      <img :src="'https://vodcn.iworku.com/'+'FufyNI07_QLDRxAj1IAVbf2rrKp5'" alt />
      <span>1/2 &nbsp;</span>
    </p>
    <div v-if="photosShow" class="photosview_mask">
      <i class="el-icon-close" @click="photosShow=false"></i>
      <div class="mask_content">
        <i class="el-icon-back" @click="imgIndex>0?imgIndex--:''"></i>
        <p>
          <img :src="'https://vodcn.iworku.com/'+imgList[imgIndex].img" alt />
        </p>
        <i class="el-icon-right" @click="imgIndex<imgList.length-1?imgIndex++:''"></i>
      </div>
      <p class="mask_text">{{imgList[imgIndex].text+'&nbsp;&nbsp;('+(imgIndex+1)+'/'+imgList.length+')'}}</p>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      photosShow: false,
      imgIndex: 0,
      imgList: [
        {
          img: "FufyNI07_QLDRxAj1IAVbf2rrKp5",
          text: "11111111"
        },
        {
          img: "default-user-img.png",
          text: "2222222222"
        },
        {
          img: "1859渐变_dancer.jpg",
          text: "33333"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.photosview_img {
  position: relative;
  width: 164px;
  height: 164px;
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
  span {
    height: 30px;
    width: 100%;
    display: block;
    background-color: hsla(0, 0%, 0%, 0.3);
    color: white;
    line-height: 30px;
    text-align: right;
    position: absolute;
    bottom: 0;
  }
}
.photosview_mask {
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(94, 94, 94, 0.6);
  z-index: 10000;
  .el-icon-close {
    color: white;
    font-size: 40px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .mask_content {
    height: 70vh;
    border-top: 15vh solid rgba(0, 0, 0, 0.5);
    border-bottom: 15vh solid rgba(0, 0, 0, 0.5);
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    p {
      height: 100%;
      img {
        height: 100%;
        object-fit: cover;
      }
    }
    .el-icon-back,
    .el-icon-right {
      background-color: black;
      font-size: 50px;
      color: white;
      padding: 10px;
      border-radius: 35px;
      cursor: pointer;
    }
  }
  .mask_text {
    position: absolute;
    bottom: 6vh;
    left: 50%;
    transform: translateX(-50%);
    width: 634px;
    background: rgba(30, 30, 30, 1);
    border-radius: 40px;
    color: white;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    padding:10px 0;
  }
}
</style>