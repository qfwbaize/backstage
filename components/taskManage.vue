<template>
  <div class="fix_bg_full tab_modal disflex column-reverse"
       :class="status ? '' : 'hidden' "
       @click="closeModal">
    <div class="bgfff fs12 h375 c78 pt15 pb44 disflex flex-column">
      <div class="flex1 overauto">
        
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: '',
    props:['status','tabs','choose_tabs_id'],
    data() {
      return{
      }
    },
    mounted() {},
    methods: {
      page_turn(method){
        this.$emit('modal_btn_tap' , method)
      },
      tab_tap(index1,id,index2){
        console.log(index1,id,index2)
        this.$emit('modal_tab_tap', index1 , id , index2)
      },
      edit_tabs(){
        this.$emit('closeModal');
        wx.navigateTo({url:'../tabsEdit/main'});
      },
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
