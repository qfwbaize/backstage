<template>
  <div class="fix_bg_full tab_modal disflex column-reverse"
       :class="status ? '' : 'hidden' "
       @click="closeModal" style="z-index: 10000;">
    <div class="bgfff fs12 h375 c78 pt15 pb44 disflex flex-column">
      <div class="flex1 overauto">
        <div class="pl16 pr16 pb25">
          <p class="fs14 pb10">员工姓名</p>
          <div class="disflex flex-wrap">
              <span v-for="(tab , index) in tabs" :key="index"
                    class="bgf5f6 bradius3 pl12 pr12 lh30 mr10 mt5"
                    :class="choose_tabs_id == tab.cardId ? 'cfff bgblue' : '' "
                    @click.stop="tab_tap(tab.cardId,index)">{{tab.name}}</span>
          </div>
        </div>
      </div>

      <!-- <p class="btf7 bbf7 lh45 pl16 fs14 ca8" @click.stop="edit_tabs">编辑标签组</p> -->
    </div>

    <!--bottom-->
  </div>

</template>

<script>
  export default {
    name: '',
    props:['status','tabs','choose_tabs_id'],
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
    mounted() {
      console.log('choose_tabs_id',this.choose_tabs_id)
    },
    methods: {
      page_turn(method){
        this.$emit('modal_btn_tap' , method)
      },
      tab_tap(id,index2){
        this.$emit('modal_tab_tap',  id , index2)

        this.$emit('closeModal')
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
