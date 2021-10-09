import {
	clearLoginInfo,
	createBase64
} from './index';
import axios from "./request";
import store from '../store';
let socketOpen = false;
const socketMsgQueue = [];
let isGetReturn = false;
let extJSON = wx.getExtConfigSync();

//需要替换的域名
// url: 'wss://api.mingyicloud.com:8090/ws',
//正式环境地址
// const url =  'wss://socket.mingyicloud.com/ws';
//测试环境地址
const url = 'wss://socket.mingyicloud.com/ws';
//本地测试地址
// const url= 'ws://192.168.0.137:443/ws';

/**
 *
 * @param sendcode 登录成功时发送的code
 */
export function connect(sendcode) {
	// console.log("connect --- ",sendcode);
	//兼容oem配置 默认取url配置
	let wssUrl = extJSON ? extJSON.wssUrl ? extJSON.wssUrl : url : url;
	wx.connectSocket({
		url: wssUrl,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
			'Authorization': null
		},
		protocol: ['protocol1'],
		method: 'GET',
		data: 'data',
		success: function(res) {
			console.log('WebSocket连接创建', res)
		},
		fail: function(err) {
			// wx.showToast({
			//   title: '网络异常！',
			//   icon: 'none'
			// });
		}
	});
	/**
	 * 监听websocket连接打开
	 */
	wx.onSocketOpen(function() {
		sendRegister();
	});
	/**
	 * 接受消息
	 */
	wx.onSocketMessage(function(res) {
		jsMessage(res, sendcode);
	});
	//error事件
	wx.onSocketError(function(err) {
		//console.log('------------------------')
		//console.log('err -- ', err);
	});

	wx.onSocketClose(function(e) {
		//console.log('socket close -----------------',e)
		wx.getNetworkType({
			success(res) {
				if (res.networkType == 'none') return;

				setTimeout(() => {
					connect(101);
				}, 1 * 1000);
			}
		})
	})
}
/**
 * 接受消息
 * @param res
 */
export function jsMessage(res, sendcode) {

	var messageData = JSON.parse(res.data);
	if (messageData.code === 1090) {
		console.log("jsMessage ---1090 ", res, sendcode);
		return;
	}

	if (!messageData.success) {
		//console.log('操作失败')
	}
	//收到注册回复
	if (messageData.code === 1001) {
		// sendSocketJSON("108");
		sendSocketMessage({
			data: JSON.stringify({
				code: 102,
				token: wx.getStorageSync('token'),
				version: 'v1'
			})
		});
		sendSocketJSON('1011')
		resultRegister(messageData, sendcode)
	}
	//心条回复
	if (messageData.code === 1002) {
		isGetReturn = true;
		resultRegister(messageData, sendcode);
	}
	//获取列表回复
	if (messageData.code === 10080) {
		imList(messageData);
		// console.log('message------------------------',messageData);
		store.dispatch('setMsgList', messageData)
	}

	if (messageData.code === 1009) {
		// console.log("数据---",messageData,typeof messageData)
		imList(messageData);
		// if (messageData.unreadMessageEntity && messageData.unreadMessageEntity.size>0){
		//   uni.setTabBarBadge({
		//     index: 3,
		//     text: messageData.unreadMessageEntity.size.toString()
		//   });
		// }else{
		//   uni.removeTabBarBadge({
		//     index: 3,
		//     fail(){
		//     }
		//   })
		// }
	}
	//群聊数据监听
	if (messageData.code === 101005) {
		console.log('101005', messageData)
		if (messageData.clientNum != 0) {
			store.commit('ADD_LISTGROUP', messageData);
		} else {
			store.commit('GET_MSG_GROUPCONT', messageData);
			store.commit('CHANGE_STATUE');
		}
		// store.commit('GET_MSG_GROUPCONT',messageData);
	}
	if (messageData.code === 1013) {
		store.dispatch('addGroup', messageData);
		store.commit('CHANGE_STATUE');
		// sendSocketJSON('1011')
	}
	if (messageData.code === 10090) {
		// console.log("接受消息 ---11111",messageData);
		messageData.listUnreadMessageEntity.forEach((item) => {
			var cardid = uni.getStorageSync('cardId')
			if (item.cardId == cardid) {
				// store.dispatch('setmsg',item);
				uni.setStorageSync('unreadMsg', item.size)
				uni.setStorageSync('noticeMsg', item.sysSize)
			}
		})
	}


	//获取聊天记录
	if (messageData.code === 1005) {
		// console.log("消息111",messageData)
		if (messageData.clientNum != 0) {
			store.commit('ADD_LIST', messageData);
		} else {
			store.commit('GET_MSG_CONT', messageData);
			store.commit('CHANGE_STATUE');
		}
	}
	if (messageData.code === 1003) {
		store.dispatch('add', messageData);
		store.commit('CHANGE_STATUE');
	}
	//主动接受消息 需要检查消息类型
	if (messageData.code === 201) {
		let sendId = wx.getStorageSync('sendId');
		let sendCardId = wx.getStorageSync('sendCardId');
		//接收消息转为发送方
		// messageData.sendId = sendId;
		// messageData.sendCardId = sendCardId;
		store.dispatch('add', messageData)
		store.dispatch('addGroup', messageData)
		sendSocketJSON("108", 1);
		if (sendId) {
			sendMessage({
				code: 104,
				targetId: sendId,
				targetCardId: sendCardId,
			})
		}
	}
	if (messageData.code === 1011) {
		// console.log('1011')
		// console.log("/*///***/*",messageData)
		// console.log("传参1011",sendcode)

		// store.dispatch('readMsg');
		store.dispatch('setnotification', messageData.data);
	}
	if (messageData.code === 204) {
		store.dispatch('readMsg');
	}

	if (messageData.code === 1401) {
		clearLoginInfo();
		wx.showToast({
			title: '请登录',
			duration: 2000,
			icon: 'none'
		});
		setTimeout(function() {
			var url = '/pages/wxLogin/main';
			// wx.reLaunch({url: url});
			// console.info('未登录跳转的地址：', url);
		}, 1000)
	}
	//消息列表新增数据

}


/**
 * 消息列表
 * @param messageData
 */
export function imList(messageData) {
	//TODO 获取到列表后的操作
	// console.log("列表消息---",messageData)
	return messageData;

}
/**
 * 群聊消息列表
 * @param messageData
 */
// export function groupImList(messageData) {

//   return messageData;

// }


/**
 * 接收到注册命令
 * @param messageData
 */
export function resultRegister(messageData, sendcode) {
	//注册成功发送心跳
	if (messageData.success) {
		heartCheck.reset().start(sendcode);
	} else {
		sendRegister();
	}
}

/**
 * 心跳检查
 */
export function heartbeat(messageData) {
	//TODO 检查10秒内没收到回复就进行 重新连接

}


/**
 * 收到封装JSON
 * @param data
 */
export function sendSocketMessage(data) {
	// console.log('发送消息')
	// console.log(data);
	wx.sendSocketMessage(Object.assign(data, {
		fail() {
			connect(101);
		}
	}));
}


/**
 * 自动组装 发送消息
 * @param code   接收的code
 */
export function sendSocketJSON(code, pageNum) {
	// console.log("sendSocketJSON:",code)
	sendSocketMessage({
		data: JSON.stringify({
			code: code,
			token: wx.getStorageSync('token'),
			version: 'v1',
			pageNum: pageNum ? pageNum : 1,
			pageSize: 99
		})
	})
}

export function sendNoticeRead(companyId, noticeType) {
	sendSocketMessage({
		data: JSON.stringify({
			code: 1012,
			token: wx.getStorageSync('token'),
			version: 'v1',
			targetId: companyId,
			noticeType: noticeType
		})
	})
}
/**
 * 更新已读状态
 * @param data
 */
export function updateStatus(data) {
	sendSocketMessage({
		data: JSON.stringify({
			type: data.type,
			code: data.code,
			targetId: data.targetId,
			targetCardId: data.targetCardId,
			noticeType: data.noticeType,
			token: wx.getStorageSync('token'),
			version: 'v1',
		})
	})
	sendSocketJSON('1011')
}


/**
 * 删除
 * @param data
 */
export function deleteStatus(data) {
	sendSocketMessage({
		data: JSON.stringify({
			message: data.message,
			type: data.type,
			code: data.code,
			targetId: data.targetId,
			targetCardId: data.targetCardId,
			noticeType: data.noticeType,
			token: wx.getStorageSync('token'),
			version: 'v1',
		})
	})
	sendSocketJSON('1011')
}

/**
 * 获取聊天记录
 * @param data
 */
export function getChatRecord(data) {
	sendSocketMessage({
		data: JSON.stringify({
			code: data.code,
			targetId: data.targetId,
			targetCardId: data.targetCardId,
			clientNum: data.clientNum,
			pageSize: data.pageSize,
			intoType: data.type,
			specId: data.specId,
			token: wx.getStorageSync('token'),
			version: 'v1',
			cardId: data.cardId,
			duration: data.duration
		})
	})
}


/**
 * 获取群聊天记录
 * @param data
 */
export function getChatGroup(data) {
	sendSocketMessage({
		data: JSON.stringify({
			code: data.code,
			isFlock:data.isFlock,
			targetId: data.targetId,
			targetCardId: data.targetCardId,
			clientNum: data.clientNum,
			pageSize: data.pageSize,
			intoType: data.type,
			specId: data.specId,
			token: wx.getStorageSync('token'),
			version: 'v1',
			cardId: data.cardId,
			duration: data.duration
		})
	})
}

/**
 * 发送消息
 */
export function sendMessage(data) {
  if (wx.getStorageSync('userId') != data.targetId) {
  	let params = {
      isFlock:data.isFlock == undefined ? '' : data.itemId,
  		itemId: data.itemId == undefined ? '' : data.itemId,
  		sendId: wx.getStorageSync('userId'),
  		sendCardId: wx.getStorageSync('cardId'),
  		sendCompanyId: wx.getStorageSync('COMPANYID'),
  		chattingRecordsMessage: data.message == undefined ? '' : data.message,
  		contentType: data.contentType == undefined ? '' : data.contentType,
  		targetCardId: data.targetCardId,
  		targetId: data.targetId,
  		duration: data.duration == undefined ? '' : data.duration,
  		targetCompanyId: data.targetCompanyId == undefined ? '' : data.targetCompanyId
  	}
  	axios.POST(
  		params,
  		"",
  		"/chattingRecords/add", '', '', 1
  	).then(res=>{
      sendSocketMessage({
      	data: JSON.stringify({
      		itemId: data.itemId,
      		isFlock:data.isFlock,
      		code: data.code,
      		token: wx.getStorageSync('token'),
      		version: 'v1',
      		message: data.message,
      		targetCardId: data.targetCardId,
      		targetId: data.targetId,
      		messageType: data.messageType,
      		contentType: data.contentType,
      		duration: data.duration,
          sysMessageId:res.chattingRecordsId
      	})
      })
    })
  }

	console.log("发送消息内容", data)




}
/**
 * 发送注册
 */
export function sendRegister() {
	socketOpen = true;
	var json = {
		code: 101,
		token: wx.getStorageSync('token'),
		version: 'v1'
	};
	//注册上报
	sendSocketMessage({
		data: JSON.stringify(json)
	});
}

var heartCheck = {
	timeout: 4000,
	timeoutObj: null,
	serverTimeoutObj: null,
	reset: function() {
		clearTimeout(this.timeoutObj);
		clearTimeout(this.serverTimeoutObj);
		return this;
	},
	start: function(sendcode) {

		var self = this;
		this.timeoutObj = setTimeout(function() {
			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			//onmessage拿到返回的心跳就说明连接正常
			sendSocketMessage({
				data: JSON.stringify({
					code: 102,
					token: wx.getStorageSync('token'),
					version: 'v1'
				})
			});
			self.serverTimeoutObj = setTimeout(function() { //如果超过一定时间还没重置，说明后端主动断开了
				wx.closeSocket({
					success() {
						connect(101);
					}
				});
			}, 10 * 10000)
		}, this.timeout)
	}
}

// 连接websocket
export function connectWebsocket() {
	sendSocketMessage({
		data: JSON.stringify({
			code: 102,
			token: wx.getStorageSync('token'),
			version: 'v1'
		})
	});
}


export default {
	connect,
	jsMessage,
	imList,
	resultRegister,
	sendRegister,
	sendSocketMessage,
	sendSocketJSON,
	sendMessage,
	getChatRecord,
	connectWebsocket,
	updateStatus,
	deleteStatus,
	getChatGroup,
}
