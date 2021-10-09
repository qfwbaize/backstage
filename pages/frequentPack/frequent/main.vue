<template>
  <div class="frequent pt10">
    <div class="h92 bgfff disflex wrap">
      <div class="w25p disflex jscen align-cen fd" @click="toStatements('share')">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-www/photo/20190529/1559095759819.png" alt="" class="w30 h30" />
        <div class="fs12 textc c78 mt10 title">分享语设置</div>
      </div>
      <div class="w25p disflex jscen align-cen fd" @click="toStatements('welcome')">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-www/photo/20190529/1559095776214.png" alt="" class="w30 h30" />
        <div class="fs12 textc c78 mt10 title">欢迎语设置</div>
      </div>
      <div class="w25p disflex jscen align-cen fd" @click="page_turn('frequentPack/commonPhrases', 'type=1')">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon-user-phrases.png" alt="" class="w30 h30" />
        <div class="fs12 textc c78 mt10 title">用户常用语</div>
      </div>
      <div class="w25p disflex jscen align-cen fd" @click="page_turn('frequentPack/commonPhrases', 'type=2')">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon-crm-phrases.png" alt="" class="w30 h30" />
        <div class="fs12 textc c78 mt10 title">CRM常用语</div>
      </div>
    </div>
      <div class="h92 bgfff disflex wrap">
          <div class="w25p disflex jscen align-cen fd"  @click="page_turn('frequentPack/marketSettinga')" v-if="isMiniProgramOwner && modelSwtich">
            <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmAdd/icon_contacts.png" alt="" class="w30 h30" />
            <div class="fs12 textc c78 mt10 title">人脉集市设置</div>
        </div>
          <div class="w25p disflex jscen align-cen fd"  @click="page_turn('frequentPack/messageSetting')" v-if="isMiniProgramOwner">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/share2.png" alt="" class="w30 h30" />
              <div class="fs12 textc c78 mt10 title">IM咨询设置</div>
          </div>
          <div class="w25p disflex jscen align-cen fd"  @click="page_turn('frequentPack/defaultCardSetting')" v-if="isMiniProgramOwner">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/default_card_setting.png" alt="" class="w30 h30" />
              <div class="fs12 textc c78 mt10 title">默认名片设置</div>
          </div>
          <div class="w25p disflex jscen align-cen fd"  @click="page_turn('frequentPack/loginStatements')">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/login_statements_icon.png" alt="" class="w30 h30" />
              <div class="fs12 textc c78 mt10 title">登录欢迎语</div>
          </div>
		  <div class="w25p disflex jscen align-cen fd" @click="page_turn('frequentPack/vrSetting', 'type=2')">
		    <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon-crm-phrases.png" alt="" class="w30 h30" />
		    <div class="fs12 textc c78 mt10 title">VR上传</div>
		  </div>
      </div> 

  </div>
</template>
<script>
    import WXAJAX from '@/utils/request';
  export default {
    data () {
      return {
        isMiniProgramOwner: false,
        modelSwtich:false
      }
    },
    mounted() {
      wx.setNavigationBarTitle({
        title: "常用功能"
      });
        this.getMiniProgramOwner();
        this.getCompanyModelSwtich()
    },
    methods: {
        //获取默认名片
        getMiniProgramOwner() {
            WXAJAX.POST({ ignore: true }, '', '/businessCard/isMiniProgramOwner').then((data, code) => {
                this.isMiniProgramOwner = data;
            });
        },
      toStatements(str){
        console.log("toStatements")
        wx.navigateTo({
          url: "/pages/frequentPack/statements/main?type=" + str
        });
      },
      page_turn(url, param){
          if(param){
              wx.navigateTo({url: `/pages/${url}/main?${param}`});
          } else {
              wx.navigateTo({url: `/pages/${url}/main`});
          }
      },
      //是否显示需求审核开关
      getCompanyModelSwtich() {
        var v = this
        WXAJAX.POST(
          {
            companyId: WXAJAX.smartMainId
          },
          "",
          "/businessCard/queryCompanyModelSwtich"
        )
          .then(data => {
            if(data){
              for(var i in data){
                if(data[i].modelType == 1){
                  v.modelSwtich = data[i].switchState
                }else{
                  v.modelSwtich = false
                }
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
    }
  }
</script>
<style>
  page{
    background: #F5F5F6;
  }

  .title{
    line-height: 1;
  }
</style>
