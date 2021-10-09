<template>
      <div class="bgblue textc posticky statusbar_title" 
          :style="'height:' + navHeight+'px;padding-top:'+statusBarHeight+'px'">
        <div class='statusbar_back' @click="toBack"></div>
        <div class="cfff fs18">{{title}}</div>
        <p></p>
      </div>

</template>

<script>
export default {
    name: "statusbartitle",
    props:{
        navHeight:{
          type:Number,
          default:0
        },
        statusBarHeight:{
          type:Number,
          default:0
        },
        title:{
          type:String,
          default:''
        }
      },
    data(){
        return{

        }
    },
    
    methods:{
        toBack(){
        this.$emit('toBack')
      }
    }
}
</script>

<style>
.statusbar_title{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 60upx;
}
.statusbar_back{
  height: 25upx;
  width: 25upx;
  border-width: 0 0 3px 3px;
  border-color: #fff;
  border-style: solid;
  transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
}
</style>









