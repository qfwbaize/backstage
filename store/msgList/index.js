export default {
  state:{
    msglist:[]
  },
  // namespaced: true,
  mutations:{
    SET_MSG_LIST(state,data){
      state.msglist=data
      console.log('接收的聊天人信息',state.msglist);
    },
  },
   actions:{
     setMsgList({commit}, data) {
       commit('SET_MSG_LIST', data);
     },
  }
}
