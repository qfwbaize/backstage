<template>
  <div class="title-box">
    <span class="title">{{title}}</span>
    <span class="dec">{{dec}}</span>
    <p class="smallTitle" v-if="smallTitle">{{smallTitle}}</p>
  </div>
</template>

<script>
  export default {
    name: "noData",
    props:{
      title:{
        type:String,
        default:'',
      },
      dec:{
        type:String,
        default:'',
      },
      smallTitle:{
        type:String,
        default:'',
      }
    }
  }
</script>

<style scoped>
.title-box{
  margin-top: 40upx;
  margin-bottom: 40upx;
}
.title{
  font-size: 40upx;
  color: #383838;
  font-weight:bold;
  line-height: 1.2;
  margin-right: 8upx;
}
.dec{
  font-size: 28upx;
  color: rgba(81,205,203,0.3);
  line-height: 1;
  vertical-align:bottom;
  font-weight: bold;
}
.smallTitle{
  font-size: 24upx;
  color: #A7A7A7;
  margin-top: 19upx;
}
</style>
