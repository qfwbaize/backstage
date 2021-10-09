/**
 4406	67	新订单提醒	3520	FKis_f3zPzImNPmTYVqg6AGylKrn2kDzDXMvim5XqRo	CRM	pages/orderLists/main?goType=1	2020-03-30 09:27:00	2
 4407	67	订单状态变动通知	2206	7LJET4m1G-mnB6K02NrCbT4-EBF-mt-EPcndJ6FjX5M	CRM	pages/orderLists/main?goType=1	2020-03-30 09:27:00	2
 4408	67	反馈回复通知	777	DsBzrHZxKzYFaXoKWoZr7AFDLJratYInMqEknfWkvfE	CRM	pages/webSiteControl/main	2020-03-30 09:27:00	2
 4409	67	未读私信通知	42	ZXNANFcJsFNZXUFCxAu1t2EWgMpFiY1x_yhPG0qhyNU	CRM	pages/msg/main?goType=1	2020-03-30 09:27:00	2
 4410	67	新客户来访提醒	4434	k2hc4byjdRq6y4gEQT0zbrVMYvJ9UUyK90eplRYR9d8	CRM	pages/index/main	2020-03-27 11:39:31	2

 10187    文件阅读结果通知  10187 10gakLraTdEDvwb5zetObpi8Ek6Oo5Xqda_-5IqPYb0
 * 订阅消息授权 消息部分
 */
export function authSubscribeMessage(subs) {
  console.log("订阅消息",subs)

  // setStorageSync
  //订阅授权 信息相关
  wx.requestSubscribeMessage({
    tmplIds:filterMessage(subs),
    success(res) {
      console.log(res)
    },
    fail(error) {
      console.log("authSubscribeMessage_error:" + JSON.stringify(error))
    }
  })
}

/**
 * 消息
 * @param {Object} subs
 */
function filterMessage(subs){
  if(subs){
    const sub = new Array();
    subs.forEach(s =>{

      if(s.code == 777 || s.code == 1076 || s.code == 4433  ){
        if(s.value){
          sub.push(s.value);
        }
      }
    })
    return sub;
  }
  return [];
}

export function authArticleMessage(subs) {
  console.log("订阅消息2",subs)
  wx.requestSubscribeMessage({
    tmplIds:articleFilterMessage(subs),
    success(res) {
      console.log(res)
    },
    fail(error) {
      console.log("authArticleMessage:" + JSON.stringify(error))
    }
  })
}
/**
 * 6838:信息提交成功通知
 * 9969:服务完成通知
 * @param {Object} subs
 */
function articleFilterMessage(subs){
  if(subs){
    const sub = new Array();
    subs.forEach(s =>{

      if( s.code == 6838 || s.code == 9969 ){
        if(s.value){
          sub.push(s.value);
        }
      }
    })
    return sub;
  }
  return [];
}
export function authArticleMessage2(subs) {
  console.log("订阅消息2",subs)
  wx.requestSubscribeMessage({
    tmplIds:articleFilterMessage2(subs),
    success(res) {
      console.log(res)
    },
    fail(error) {
      console.log("authArticleMessage:" + JSON.stringify(error))
    }
  })
}
function articleFilterMessage2(subs){
  if(subs){
    const sub = new Array();
    subs.forEach(s =>{

      if( s.code == 9969 ){
        if(s.value){
          sub.push(s.value);
        }
      }
    })
    return sub;
  }
  return [];
}
/**
 * 订阅消息授权 订单部分
 */
export function authSubscribeOrder(subs) {
  console.log("订阅消息",subs)
  //订单状态变动通知
  // "7LJET4m1G-mnB6K02NrCbT4-EBF-mt-EPcndJ6FjX5M",
  //   "FKis_f3zPzImNPmTYVqg6AGylKrn2kDzDXMvim5XqRo"
  wx.requestSubscribeMessage({
    tmplIds:filterOrder(subs),
    success(res) {
      console.log(res)
    },
    fail(error) {
      console.log("authSubscribeOrder_error:" + JSON.stringify(error))
    }
  })
}

/**
 * 文章阅读消息通知
 */
export function articleReadNotice(subs){
  console.log("订阅消息articleReadNotice",subs)
  wx.requestSubscribeMessage({
    tmplIds:filterOrder(subs),
    success(res) {
      console.log(res)
    },
    fail(error) {
      console.log("articleReadNotice_error:" + JSON.stringify(error))
    }
  })
}

/**
 * 订单
 * @param {Object} subs
 */
function filterOrder(subs){
  console.log("subs",subs);
  if(subs){
    const sub = new Array();
    subs.forEach(s =>{
      if(s.code == 2205 || s.code == 2849 || s.code == 760 || s.code == 10187 ){
        if(s.value){
          sub.push(s.value);
        }
      }
    })
    console.log("sub",sub);
    return sub;
  }
  return [];
}
