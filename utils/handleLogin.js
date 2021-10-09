/**
 * 用户登录授权处理
 */
import WXAJAX from './request'
import store from "@/store/index.js";
import websocket from './websocket'


/**
 * 开始login
 * 小程序向微信请求code，成功后向后端发起登录请求，成功后，查询存储中是否有redirectPage，如果有，则进行跳转
 * @param callback 登录成功回调函数
 */
export function login (callback,msg) {
    wx.showLoading();
    wx.login({
        success (res) {
            if (res.code) {
                // 登录成功，获取用户信息
                getUserInfo(res.code, callback,msg);
                // websocket.connectWebsocket();
                let url = wx.getStorageSync('redirectPage');
                redirectPage(url);
            } else {
                // 否则弹窗显示，showToast需要封装
                showToast()
            }
        },
        fail () {
            showToast()
        }
    })
}

/**
 * 页面跳转
 * @param url 待跳转的url
 */
export function redirectPage(url){
    if(url){
        setTimeout(() => {
            wx.removeStorageSync('redirectPage');
            wx.reLaunch({url: url});
        }, 1000);
    }
}

/**
 * 向微信发起请求:获取用户信息
 * @param code
 * @param callback
 */
export function getUserInfo (code, callback,msg) {
      postLogin({
          code: code,
          rawData : msg.rawData ,
          signature : msg.signature ,
          encrypteData : msg.encryptedData,
          iv : msg.iv ,
          phoneData: '',
          phoneIv : '',
      }, callback)
}

/**
 * 向后端发起请求，进行登录。登录成功后调用回调函数
 * 请求参数中
 * code: 向微信登录获取的code，不能为空
 * rawData : 微信登录返回的数据，包含微信名、头像等等
 * signature : 签名
 * encrypteData : 敏感数据
 * iv :
 * @param params 请求参数
 * @param callback 回调函数
 */
export function postLogin (params, callback) {
  console.log('登录传参：')
  console.log(params)
    WXAJAX.POST(params,'','/home/wxLogin').then((data) => {
        if(data.token){
            wx.hideLoading();
            callback && callback(data);
        } else {
            showToast(err.message);
        }
    }).catch((err) => {
        showToast(err.message);
    });
}
/**
 * 设置登录状态到storage中
 * @param data 登录返回数据
 * @param tourists 是否是游客，true为游客，false为已经登录的正式用户
 */
export function setLoginMessageInStorage(data, tourists) {

  wx.setStorageSync("accountId", data.userModel.accountId);

  wx.setStorageSync("token", data.token);
  wx.setStorageSync("avatarUrl", data.avatarUrl);

  //wx.setStorageSync("isFirstLogin", data.isFirstLogin);
  wx.setStorageSync("isFirstLogin", false);//fxm:不显示“左滑动查看更多”图片，20210223

  //优先取本地名片名称，如果没有则取用户微信名称
  wx.setStorageSync("USERNAME", data.userName);
  wx.setStorageSync("phone", data.phone);
  wx.setStorageSync("userId", data.userId);
  wx.setStorageSync("roleId", data.roleId);
  wx.setStorageSync("hasCard", data.cardId ? data.cardId !== 0 : false);
  // // 不是游客
  // wx.setStorageSync("tourists", tourists);

  //不是游客，表示登录成功
  wx.setStorageSync("isLogin", !tourists);
  store.commit("set_login_status", !tourists);
  store.commit("set_user_info", {
    userName: data.userName,
    phone: data.phone,
    userId: data.userId,
    avatarUrl: data.avatarUrl
  });
  store.commit("setPhone", data.phone);

}
/**
 * 小程序端判断是否登录
 * @param callback 回调函数
 */
export function isLogin (callback) {
    if (wx.getStorageSync('token')) {
        // 如果有全局存储的登录态，暂时认为他是登录状态
        callback && callback()
    }
}

/**
 * 小程序端判断是否登录，如果没有登录，则弹出模态框，提示用户到个人中心中登录
 * @param callback 回调函数
 */
export function isLoginAndShowModal (callback) {
    let token = wx.getStorageSync('token');
    if (token) {
        // 如果有全局存储的登录态，暂时认为他是登录状态
        callback && callback()
    } else {
        // 如果没有登录态，弹窗提示一键登录
        showLoginModal()
    }
}

/**
 * 提示用户到达个人中心进行登录
 */
export function showLoginModal () {
    wx.showModal({
        title: '提示',
        content: '您还未登录，请登录后可获得完整体验。',
        confirmText: '确定',
        success (res) {
            if (res.confirm) {
                wx.navigateTo({
                    url: '/pages/wxLogin/main',
                })
            }
        }
    })
}

/**
 * 弹框显示错误信息，默认是"用户信息获取失败"
 * @param content 错误信息内容
 */
export function showToast (content = '用户信息获取失败') {
    wx.showToast({
        title: content,
        icon: 'none',
        duration: 2000
    })
}

/**
 * 返回给调用者用户是否登录
 */
export function returnIsLogin() {
  let logined = false;
  // 缓存中存在 isLogin，且 isLogin=true，即为登录状态，否则为游客状态
  if (wx.getStorageSync("isLogin") === true) {
    logined = true;
  }
  return logined;
}
export default {
    login,
    getUserInfo,
    postLogin,
    isLogin,
    isLoginAndShowModal,
    setLoginMessageInStorage,
    showLoginModal,
    returnIsLogin,
    showToast
}
