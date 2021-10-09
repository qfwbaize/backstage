<script>
import http from "./utils/http"
import websocket from './utils/websocket'
import request from './utils/request.js'
import WXAJAX from "@/utils/request";
export default {
  globalData: {
    menuButtonBounding: wx.getMenuButtonBoundingClientRect(), // 胶囊控件，iphone 6中，该值在第一次获取没有问题，但是后面获取就为0了，所以第一次获取后，将次存下来
    navHeight: 0, // 导航的高度(胶囊控件加上状态栏所有的高度)
    // unreadMsg:uni.getStorageSync('unreadMsg'),
    // noticeMsg:uni.getStorageSync('noticeMsg')
  },
  onShow (options) {
    this.getAuthentication()
    //定时发送缓存到后端
    // setInterval(()=>{
    //   this.send()
    // },60000)
    //缓存超过2M发送缓存
    // this.cacheSize()
    //初始化网络配置
    this.checkVersion();
    //是否其他小程序进入
    if (options.scene == 1037) {
      wx.setStorageSync('isOtherAppInto', true);
    }
    if (options.query.goType == 1) {

      let url = '/' + options.path;
      let { companyId, cardId, userId,dynamicId,shareId } = options.query;

      if (url.includes('companyInvite')) url += `?companyId=${companyId}&invite=1`;
      if (url.includes('editEnterprise')) url += `?type=add`;
      if (url.includes('editCard')) url += `?type=add`;
      if (url.includes('clientAdd')) url += `?type=userAdd&goType=1&cardId=${cardId || ''}&userId=${userId || ''}`;

      if (options.query.shareId) url += ('?dynamicId=' + options.query.dynamicId + '&companyId=' + options.query.companyId + "&cardId=" + options.query.cardId + '&shareId=' + options.query.shareId + "&goType=1");
	  if (options.query.precise_dynamicId) url += ('?dynamicId=' + options.query.dynamicId + '&companyId=' + options.query.companyId + "&cardId=" + options.query.cardId + '&precise_dynamicId=' + options.query.precise_dynamicId + "&goType=1&type=2&shareId="+options.query.shareId);
      //设置重定向的启动页
      wx.setStorageSync('redirectPage', url);
    }
    websocket.connectWebsocket();
  },
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    /*清空机构地址缓存*/
    wx.setStorageSync('company_address', '');
    wx.setStorageSync('company_city', '')

    let token = wx.getStorageSync('token');
    if (token) {

    }
  },
  methods: {
    //获取是否认证
    getAuthentication(){
      http({url:'/apis/authentication/read',method:'GET'}).then(res=>{
        if(res){
          // console.log(res,6666666666)
          uni.setStorageSync('Authentication',res.data.code)
        }
      })
    },
    //一分钟发送缓存
    send(){
      console.log('123')
    },
    //缓存超过2M发送缓存
    cacheSize(){
      var that = this
      wx.getStorageInfo({
        success (res) {
          if(res.currentSize == 2048){
            that.send()
          }
        }
      })
    },
    checkVersion () {
      if (wx.canIUse("getUpdateManager")) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            updateManager.onUpdateReady(function () {
              wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function (res) {
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                  }
                }
              });
            });
            updateManager.onUpdateFailed(function () {
              // 新的版本下载失败
              wx.showModal({
                title: "已经有新版本了哟~",
                content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
              });
            });
          }
        });
      } else {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        wx.showModal({
          title: "提示",
          content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
      }
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  },
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200 rpx 0;
  box-sizing: border-box;
}

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

</style>
