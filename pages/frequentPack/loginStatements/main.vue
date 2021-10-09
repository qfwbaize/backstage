<template>
    <div class="statements pb60 ">
        <div class="bgfff pl15 pr15 pt9 pb5">
            <div class="c38 fs16 fbold lh32">登录欢迎语</div>
            <textarea maxlength="200" v-model="statements" auto-height class="fs14 lh24 minh70 w100p">

            </textarea>
            <div class="disflex jsbet lh38">
                <div class="cblue fs14" @click="restoreDefault">还原默认</div>
                <div class="ce8 fs14">{{statements.length}}/200</div>
            </div>
        </div>
        <BottomButtonSmall :text="'保存'" :url="'save'" @btn_tap="btn_tap"></BottomButtonSmall>
    </div>
</template>
<script>
import BottomButtonSmall from '@/components/bottom_button_small'
import WXAJAX from '@/utils/request';
export default {
    components: { BottomButtonSmall },
    data(){
        return{
            type: '',
            title: '',
            statements:'您好，欢迎访问我的名片。\n请问有什么可以帮到您的吗？',
            company: '',
            user: '',
            templateList: []
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            let cardWelcomeSpeech = wx.getStorageSync('cardWelcomeSpeech')
            wx.setNavigationBarTitle({
                title: "设置"
            });
            this.company = cardWelcomeSpeech.company;
            this.user = cardWelcomeSpeech.user;
            this.statements = cardWelcomeSpeech.hint 
        },
        restoreDefault(){
            this.statements = '您好，欢迎访问我的名片。\n请问有什么可以帮到您的吗？'
        },
        btn_tap(){
            wx.showLoading();
            let params = { hint: this.statements} 
            WXAJAX.POST(params, '', '/businessCard/updateCardLoginSpeech').then((data) => {
              if(data){
                wx.showToast({
                  title: '修改成功',
                  duration: 2000,
                });
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  })
                })
                wx.hideLoading();
              }
            })
            .catch(err => {
              wx.hideLoading();
              wx.showToast({
                title: err.message,
                duration: 2000,
                icon: "none"
              });
            });
          }
    }
}
</script>
<style>
page{
    background: #F5F5F6;
}
</style>
