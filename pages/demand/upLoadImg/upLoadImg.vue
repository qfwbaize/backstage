<template>
	<view>
    <div class="target" style="background-color: #FFFFFF;padding: 20rpx 0;">
    	<div class="title c38 pl20" style="font-weight: bold;">奖励金额</div>
      <view class="inp">
        <input type="number" value="" v-model="money" @blur="toRewardAmount"/>
      </view>
    </div>
		<div class="target" style="background-color: #FFFFFF;margin-top: 20rpx;">
			<div class="title c38 pl20" style="font-weight: bold;">上传打款凭证</div>
			<div class="disflex wrap pt20 pb20 w290 pl20">
				<div class="bgfff w80 h80 mr7 mb7 posre" v-for="(v,k) in self_photos" :key="k">
					<img mode="aspectFill" :src="v" alt="" class="w100p h100p">
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
						class="w20 h20 posab right2 top2" @click="delImg(k)">
				</div>
				<div v-if="self_photos.length < 9" class="bgfff bdash_a8 w80 h80 add_img bradius5 mr7"
					@click="uploadpic('self', 9)"></div>
			</div>
		</div>

    <view class="btn" @click="toUpload">上传</view>

	</view>
</template>

<script>
  import http from "../../../utils/http"
  import WXAJAX from '../../../utils/request.js';
  import util from "@/utils/index";
	export default {
		data() {
			return {
        self_photos: [],
        card_id:'',
        task_id:'',
        money:'',
        type:'',
        company_task_id:''

			}
		},
    onLoad(option) {
      // console.log(option,88888888)
      this.company_task_id = option.company_task_id
      this.type = option.type
      this.card_id = option.card_id
      this.task_id = option.task_id
    },
		methods: {
      //上传打款凭证
      toUpload(card_id,task_id){
        if(type == 2){
          var data = {
            task_id:this.task_id,
            company_id:this.company_task_id,
            money:this.money,
            contract:this.self_photos,
            type:2
          }
        }else{
          var data = {
            task_id:this.task_id,
            card_id:this.card_id,
            money:this.money,
            contract:this.self_photos,
            type:1
          }
        }

        http({url:'/apis/companytask/reward',method:'POST',data:data}).then(res=>{
          if(res.data.code = 200){
            uni.navigateBack({
              delta:1
            })
          }
        })
      },
      //检测数字格式
      toRewardAmount(e) {
        var reg = /^\+?[1-9]\d{0,3}(\.\d*)?$/
        if (!reg.test(e.detail.value)) {
          wx.showToast({
            title: '请输入正确的数字',
            icon: 'none',
            duration: 2000
          })
          return false
        }
        this.money = e.detail.value
      },
      //删除图片
      delImg(index) {
      	wx.showLoading();
      	this.self_photos.splice(index, 1);
      	wx.hideLoading();
      },
      //上传图片
      async uploadpic(str, count) {
      	this.showPageStatus = "0";
      	let path = await util.chooseImage("file", count);
      	if (!(path instanceof Array)) return;
      	this.uploadImgFun(path, 0, str);
      },
      async uploadImgFun(arr, index = 0, str) {

      	await this.uploadImg(arr[index], str);
      	if (index < arr.length - 1) {
      		this.uploadImgFun(arr, index + 1, str);
      	}
      },
      uploadImg(path, str) {
      	if (str == "self" && this.self_photos.length >= 9) {
      		wx.showToast({
      			title: "最多选择9张！",
      			duration: 1500,
      			icon: "none"
      		});
      		return;
      	}
      	wx.showLoading({
      		mask: true
      	});
      	return WXAJAX.UploadImage(path)
      		.then(data => {

      			wx.hideLoading();
      			data = JSON.parse(data);
      			if (data.code == "200") {
      				if (str == "self") {
      					this.self_photos.push(`${WXAJAX.imgBackUrl}${data.data}`);
      					this.$emit('img_tap', this.self_photos, this.number)
      				}
      			} else {
      				wx.showToast({
      					title: "网络异常",
      					duration: 2000,
      					icon: "none"
      				});
      			}
      		})
      		.catch(err => {
      			wx.hideLoading();
      		});
      },
		}
	}
</script>

<style>
.inp{
  width: 400rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 12rpx;
  background-color: rgba(244, 244, 244, 100);
  text-align: center;
  margin-left: 40rpx;
  margin-top:30rpx;
}
input{
  width: 400rpx;
  height: 80rpx;
}
.btn{
  position: fixed;
  bottom: 0;
  width: 750rpx;
  height: 84rpx;
  line-height:84rpx;
  text-align: center;
  background-color:#00bbae;
  color:#FFFFFF;
  font-size: 28rpx;
}
</style>
