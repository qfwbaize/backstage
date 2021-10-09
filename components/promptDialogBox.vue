<template>
  <div class="fix_top h100p dialog_box" @click="dialogbox_tap">
    <div class="dialog_con bgfff bradius5"  v-if="dialog_doc" @click.stop="">
      <p class="fs18 c38 pt25 pb25 pl15 pr15 ">{{dialog_doc}}</p>


      <div class="disflex fs18 textc lh44 btf5f6 dialog_bottom">
        <span class="w50p ca8 bgfff" @click="btn_tap('cancel')">取消</span>
        <span class="w50p bg_line_blue cfff" @click="btn_tap('save')">确认</span>
      </div>
    </div>
    <div class="dialog_con bgfff bradius5"  v-else @click.stop="">
      <p class="textc fs18 c38 pt25 pb25">所有消息已经设置为全读状态</p>

    </div>

  </div>
</template>

<script>

  export default {
    name: '',
    props:['dialog_doc'],
    components: {},
    data() {
      return{

      }
    },
    mounted() {


    },
    methods: {
      btn_tap(method){
        if(method == 'save'){
          this.$emit('btn_tap');
        }else{
          this.$emit('dialogbox_tap');
        }

      },
      //隐藏弹框
      dialogbox_tap(){
        this.$emit('dialogbox_tap');
      }
    },
    watch: {

    }
  }
</script>

<style>
  .dialog_box {
    background: rgba(0, 0, 0, .5);
    z-index: 100;
  }

  .dialog_con {
    width: 580upx;
    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    margin: auto;
    overflow: hidden;
  }

  .dialog_con input{
    width: 100%;
    line-height: 78upx;
    height: 78upx;
    background: #f5f5f6;
    font-size: 28upx;
    color: #A8A8A8;
    padding-left: 22upx;
    margin-bottom: 20upx;
  }
  .dialog_con input:last-child{
    margin-bottom: 60upx;
  }

  .dialog_bottom{
    border-radius: 0 0 10upx 10upx;
  }
</style>
