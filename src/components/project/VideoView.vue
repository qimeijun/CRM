<template>
  <section class="iworku-videoview">
    <p class="videoview_video">
      <video v-if="videoList.length>0" :src="`${$global.avatarURI}${videoList[0].nodeFiles}`"></video>
      <i class="el-icon-video-play" @click="onClickmask()"></i>
    </p>
    <div v-show="photosShow" class="videoview_mask">
      <i class="el-icon-close" @click="onClickmask()"></i>
      <div class="mask_content">
        <p>
          <video  v-if="videoList.length>0" ref="productVideo" :src="`${$global.avatarURI}${videoList[0].nodeFiles}`" controls></video>
        </p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    videoList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      photosShow: false,
      _dom: ""
    };
  },
  methods: {
    onClickmask() {
      if (this.photosShow) {
        this._dom.pause();
        this.photosShow = false;
      } else {
        this.photosShow = true;
        this._dom = this.$refs.productVideo;
        this._dom.play();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.videoview_video {
  position: relative;
  video {
    width: 292px;
    height: 164px;
    border-radius: 8px;
    margin-left: 10px;
  }
  .el-icon-video-play {
    font-size: 60px;
    color: white;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    cursor: pointer;
  }
}
.videoview_mask {
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
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
    border-top: 15vh solid transparent;
    border-bottom: 15vh solid transparent;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    video {
      height: 70vh;
    }
  }
}
</style>