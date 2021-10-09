export default {
  state:{
    msgCont:{},
	msgGroupCont:{},
    status: 1,
    notificationList: null,//通知消息
    // msg:null
  },
  mutations:{
	GET_MSG_GROUPCONT(state,data){
		state.msgGroupCont=data;
		console.log("state",state.msgGroupCont);
	},
	ADDGROUP(state,data) {
	  if (!state.msgGroupCont.data) state.msgGroupCont.data = [];
	  state.msgGroupCont.data.push(data)
	},
	ADD_LISTGROUP(state, data){
	  if (!state.msgGroupCont.data) state.msgGroupCont.data = [];
	  state.msgGroupCont.data.unshift(...(data.data || []));
	},
    GET_MSG_CONT(state,data){
      state.msgCont=data;
      console.log("state",state.msgCont);
    },
    ADD(state, data) {
      if (!state.msgCont.data) state.msgCont.data = [];
      state.msgCont.data.push(data)
    },
    ADD_LIST(state, data){
      if (!state.msgCont.data) state.msgCont.data = [];
      state.msgCont.data.unshift(...(data.data || []));
    },
	
    CHANGE_STATUE(state){
      state.status++;
    },
    READ_MSG(state){
      if (!state.msgCont.data) return;
      let userId = wx.getStorageSync('userId');
      state.msgCont.data.map(val=>{

        if (val.sendId == userId) {
          val.type = 1;
        }
      });

    },
    SET_NOTIFICATION(state,data){
      // console.log(data,333333)
      state.notificationList = data
    },
    // SET_MSG(state,data){
    //   state.msg = data
    //   console.log(state.msg,444444)
    // }
  },
  actions:{
	getMsgGroupCont({commit},data){
		commit('GET_MSG_GROUPCONT',data)
	},
	addGroup({commit}, data){
	  commit('ADDGROUP', data);
	  // commit('CHANGE_STATUE')
	},
	addListGroup({commit}, data){
	  commit('ADD_LISTGROUP', data);
	},
    getMsgCont({commit},data){
      commit('GET_MSG_CONT',data)
    },
    add({commit}, data){
      commit('ADD', data);
      commit('CHANGE_STATUE')
    },
    addList({commit}, data){
      commit('ADD_LIST', data);
    },
    change({commit},data){
      commit('CHANGE_STATUE')
    },
    readMsg({commit}){
      commit('READ_MSG');
    },
    setnotification({commit},data){
      commit('SET_NOTIFICATION',data);
    },
    // setmsg({commit},data){
    //   commit('SET_MSG',data);
    // }
  }
}
