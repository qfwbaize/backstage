<template>
  <div class="fix_bg_full tab_modal disflex column-reverse"
       :class="status ? '' : 'hidden' "
       @click="closeModal">

    

    <!--bottom-->
    <BottomButtonTwo :left="bottom.left" :right="bottom.right" @page_turn="page_turn"></BottomButtonTwo>

  </div>

</template>

<script>
  import BottomButtonTwo from '@/components/bottom_button_two' // 订单项
  export default {
    name: '',
    props:['status','tabs','choose_tabs_id'],
    components: {BottomButtonTwo},
    data() {
      return{
        bottom: {
          left: {
            text: '重置', url: 'reset'
          },
          right: {
            text: '确定', url: 'confirm'
          }
        },
      }
    },
    mounted() {},
    methods: {
      closeModal(){
        this.$emit('closeModal');
      }
    }
  }
</script>

<style>
  .flex-wrap{
    flex-wrap: wrap;
  }
  .fix_bg_full{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 100;
    transition: .2s;
  }
  .tab_modal.hidden{
    bottom: -100%;
  }
  .tab_modal .fix_bottom{
    position: absolute;
  }

  .client_modal{
    position: fixed;
    top: 168upx;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 99;
    transition: .3s;
    overflow: hidden;
  }
  .client_modal.h0{
    height: 0;
    border-top: 0;
  }
</style>
