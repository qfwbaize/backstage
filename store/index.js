import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations.js'
import msgList from './msgList'
import msgCont from './msgCont'
import jsMsg from './jsMsg'
import app from './app';

Vue.use(Vuex);
const state = {
  currentCompany: {},
  currentClient: {},
  cardVideo: [],
  //分享的文章 分享的动态的详情
  shareRecordsInfo: null,
  subscriptionNew: [] ,//订阅消息

  /* name: 'HD384483939',// 用户名
   infocount: 1,// 消息数量
   token: '123456'//token*/
   //公司下所有文章
   // allRecordsInfo: null,
   //公司下所有商品
   selectGoodsInfo: '',
   //做了选择后的所有文章
   selectRecordsInfo:'',
   //公司id
   companyId:'',
   //成员id
   staffId:null,
   //选中tab
   selectTab:false,
   usageStatus:{},
	 demandClass:[], //需求广场分类
};

const mutations = {
  SET_CURRENT_COMPANY(state, data) {
    state.currentCompany = Object.assign({}, state.currentCompany, data);
  },
  SET_CURRENT_CLIENT(state, data) {
    state.currentClient = data;
  },
  SET_CARDVIDEO(state, data) {
    state.cardVideo = data;
  },
  setShareRecordsInfo(state, data) {
    state.shareRecordsInfo = data;
  },
  // setAllRecordsInfo(state,data){
  //   state.allRecordsInfo = data
  // },
  //获客文章
  //保存所选文章
  setSelectRecordsInfo(state,data){
    state.selectRecordsInfo = data
  },
  //保存所选商品
  setSelectGoodsInfo(state,data){
    state.selectGoodsInfo = data
  },
  //保存公司id
  setCompanyId(state,data){
    state.companyId = data
  },
  //保存选取成员id
  setSaffId(state,data){
    console.log(data)
    state.staffId = data
    console.log(state.staffId)
  },
  //保存选取成员id
  customerInfo(state,data){
    console.log(data)
    state.customerInfo = data
    console.log(state.customerInfo)
  },
  SET_SUBSCRIPTION_NEW(state,subscriptionNew){
    state.subscriptionNew = subscriptionNew;
  },

  //重置echarts数据
  setSelectTab(state,data){
    state.selectTab = data
  },
  //名片人数、视频、时长使用状态
  setUsageStatus(state,data){
    state.usageStatus = data
  },
	setDemandClass(state,data){
	  state.demandClass = data
	},
};

const actions = {
  setCurrentCompany({ commit }, data) {
    commit("SET_CURRENT_COMPANY", data);
  },
  setCurrentClient({ commit }, data) {
    commit("SET_CURRENT_CLIENT", data);
  },
  setSubscriptionNew({commit }, data) {
    commit('SET_SUBSCRIPTION_NEW', data);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    msgList,
    msgCont,
    jsMsg,
    app
  },
  getters: {
    currentCompany: state => state.currentCompany,
    currentClient: state => state.currentClient,
    msglist: state => state.msgList.msglist,
    msgCont:state=>state.msgCont.msgCont,
    msgGroupCont:state=>state.msgCont.msgGroupCont,
    changePosition:state=>state.msgCont.status,
    article: state => state.app.article,
    subscriptionNew: state => state.subscriptionNew,
  },
  /* plugins: [
       createPersistedState({
           storage: {
               getItem: key => {
                   wx.getStorageSync(key)
               },
               setItem : (key ,value)=>{
                   wx.setStorageSync(key,value)
               },
               removeItem:key=>{
                   wx.clearStorage()
               }
           }
       })
   ]*/
});
