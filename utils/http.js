const token = uni.getStorageSync('token')
const md5 = require('./md.js');
import { createBase64 } from './index';
let base64 = createBase64();
let baseUrl = "http://test4.mingyicloud.com"
let time = Date.now()
const http = (option={})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl + option.url,
			data:option.data || {},
			method:option.method || "POST",
			header:option.header || {
				"content-type" : "application/x-www-form-urlencoded",
        "key":base64.encode(md5.md5(time+'mingyitang')),
        "time":time,
        "token":token
			},
			success:resolve,
			fail:reject
		})
	})

}

export default http;
