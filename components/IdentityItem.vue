<template>
  <div class="identity-box" :style="outStyle">
    <img :src="imgUrl" class="img">
    <p class="desc">{{desc}}</p>
    <div class="choose-btn disinblock" @click="choose">{{btnText}}</div>
  </div>
</template>

<script>
  export default {
    name: "IdentityItem",
    props: {
      imgUrl: {
        type: String,
        default: '',
      },
      desc: {
        type: String,
        default: '',
      },
      btnText: {
        type: String,
        default: '',
      },
      outStyle:{
        type: String,
        default: '',
      }
    },
    data(){
      return {

      }
    },
    methods:{
      choose(){
        this.$emit('choose');
      },
    },
  }
</script>

<style scoped>
  .identity-box{
    text-align: center;
    padding: 86upx 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .img{
    width: 250rpx;
    height: 250rpx;
  }

  .desc{
    font-size:36upx;
    font-weight:bold;
    color: #E8E8E8;
    margin: 40upx 0;
  }

  .choose-btn{
    width: 432upx;
    height: 88upx;
    background:linear-gradient(90deg,rgba(118,218,217,1),rgba(81,205,204,1));
    border-radius: 10upx;
    color: white;
    line-height: 88upx;
    font-size: 36upx;
  }
</style>
