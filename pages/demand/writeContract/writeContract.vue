<template>
	<view class="content">
    <view class="contractList">
      <view class="contractTitle">合同名称</view>
      <input class="contractTitleInput" type="text" value="" placeholder="请输入合同名称" />
    </view>

    <view class="contractList">
      <view class="contractTitle">合同类型</view>
     <picker class="contractPic" mode="selector" :value='index' :range="contractType" @change="selectType">
        <view style="color:#808080;display: flex;justify-content: space-between;">{{contractType[index]}}
        <image style="width: 24rpx;height: 24rpx;margin-top: 18rpx;margin-right: 20rpx;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" mode=""></image>
        </view>

      </picker>
    </view>

    <view class="contractList">
      <view class="contractTitle">发起主体</view>
      <input class="contractTitleInput" type="text" value="" placeholder="请输入发起主体" />
    </view>

    <view class="contractList">
      <view class="contractTitle">签约文件</view>
      <view class="contractTemplate" >合同模板库</view>
    </view>
    <view class="contractFile">
      <view class="contractFileLeft">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractWord.png" mode=""></image>
        <text style="margin: 0 10rpx;">明医云市场推广合同.docx</text>
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractEye.png" mode=""></image>
      </view>
      <view class="contractFileRight">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractCamera.png" mode=""></image>
        <text style="margin: 0 30rpx;">|</text>
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractLaji.png" mode=""></image>
      </view>
    </view>

    <div class="contractList" >
    	<div class="contractTitle">添加附件<text class="contractTitletext">（仅用于查看，无需签署）</text></div>
    </div>
    <div class="contentEnclosure" style="height: 250rpx;">
    	<div class="choice-article c39" v-if="title != '' " @click="toArticle()">{{title}}</div>
    	<div class="bgfff bdash_a8 w80 h80 add_img mr7 mb7" v-if="title == '' "  @click="toArticle()"></div>
    </div>

    <div class="content-bottom">
    	<div class="contractTitle">签署截止日期</div>
    	<div class="content-bottom-right c38">
    		<datatimea v-model="startTime" placeholder="请选择签署截止日期" @change="startEvent" :start="begin">
    		</datatimea>
    		<image class="w16 h16 mt2 ml7 mr5" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractRili.png"></image>
    	</div>
    </div>

    <div class="confirm-btn" @click="sendContract">发起合同</div>

	</view>
</template>

<script>
  import datatimea from '../../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	export default {
    components: {
    	datatimea
    },
		data() {
			return {
        contractType:['推广合同','劳务合同','通用合同','销售合同','其他'],
        startTime:'',
        contractevery:'',
        index:0,
        type:1,
        title:'',
        selectInfo:''
			}
		},
		onShow() {
      this.selectInfo = this.$store.state.selectRecordsInfo
		},
    watch: {
    	selectInfo(newVal, old) {
    		if (newVal !== '') {
    			this.dynamicId = this.selectInfo[0].dynamicId
    			this.title = this.selectInfo[0].title
    		}
    	}
    },
		methods: {
      //合同类型
      selectType(e){
        this.index = e.detail.value
        this.contractevery = this.contractType[this.index]
      },
      //签署截止日期
      startEvent(data) {
      	this.startTime = data.fmt1 + ' 00:00:00'
      },
      //去选取文章页面
      toArticle() {
      	//代表选择一个
      	var type = this.type
        console.log(type)
      	wx.navigateTo({
      		url: `../../companyPack/selectArticle/main?type=${type}`
      	})
      },
      //发起合同
      sendContract(){

      }
    }
	}
</script>

<style scoped>
.content{
  width: 100vw;
}
.contractList{
  width: 670rpx;
  height: 84rpx;
  line-height: 84px;
  margin-top: 20rpx;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding: 0 40rpx;
}
.contractTitle{
  color: rgba(16, 16, 16, 100);
  font-size:28rpx;
  font-family: PingFangSC-bold;
  font-weight: bold;
}
.contractTitletext{
  color:#808080 !important;
  font-size: 28rpx;
  font-family: PingFangSC-bold ;
  font-weight: normal;
}
.contractTemplate{
  font-size:28rpx;
  font-family: PingFangSC-bold;
  color: rgba(2, 102, 188, 100) ;
}
.contractTitleInput{
  height: 84rpx;
  text-align: right;
}
.contractPic{
  width: 210rpx;
  height: 60rpx;
  line-height: 60rpx;
  color: rgba(16, 16, 16, 100);
  font-size: 28rpx;
  font-family: Microsoft Yahei;
  border: 1px solid rgba(187, 187, 187, 100);
  margin-top: 11rpx;
  border-radius: 8rpx;
  padding-left: 20rpx;
}

.contractFile{
  width: 670rpx;
  height: 136rpx;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding: 0 40rpx;
}
.contractFile image{
  width: 48rpx;
  height: 48rpx;
}
.contractFileLeft{
  display: flex;
  line-height: 48rpx;
  margin-top:44rpx;
}
.contractFile text{
  color: rgba(0, 0, 0, 1);
  font-size: 28rpx;
  font-family: PingFangSC-regular;
}
.contractFileRight{
  display: flex;
  line-height: 48rpx;
  margin-top:44rpx;
}
.contentEnclosure{
  width: 670rpx;
  padding: 0 40rpx;
  background-color: #FFFFFF;
}
.content-bottom {
	height: 84upx;
	display: flex;
	padding: 0upx 40upx 0 40upx;
	justify-content: space-between;
	align-items: center;
	font-size: 28upx;
  background-color: #FFFFFF;
  margin-top: 20rpx;
}
.content-bottom-right {
  width: 390rpx;
  padding-left: 20rpx;
	display: flex;
  border: 1px solid rgba(217, 217, 217, 100);
  height: 60rpx;
  line-height: 60rpx;
  justify-content: space-between;
  border-radius: 8rpx;
  color: #808080;
}
.content-bottom-right image{
  width: 35rpx;
  height: 35rpx;
  margin-top: 12.5rpx;
}
.confirm-btn {
	width: 100%;
	height: 98upx;
	line-height: 98upx;
	text-align: center;
	color: #FFFFFF;
	font-size: 36upx;
  background-color: rgba(26, 208, 156, 100);
  margin-top: 100rpx;
}

</style>
