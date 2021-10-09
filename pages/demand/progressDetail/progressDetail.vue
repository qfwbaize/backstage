<template>
	<view style="min-height: 100vh;background-color:#FFFFFF;overflow: hidden;padding-bottom:84rpx;">
		<view class="contract" v-if="type == 4">
      <!-- <view class="contractText">上传于2021/9/12  12:00</view> -->
		  <view class="contract_top">
		    <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210804/0f5a3d1efab5603e830cf5b1f330abe2.jpg" mode=""></image>
		    <view>哈哈哈哈哈</view>
		  </view>
		  <view class="contract_speed">
		    <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210804/0f5a3d1efab5603e830cf5b1f330abe2.jpg" mode=""></image>
		    <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210804/0f5a3d1efab5603e830cf5b1f330abe2.jpg" mode=""></image>
		    <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210804/0f5a3d1efab5603e830cf5b1f330abe2.jpg" mode=""></image>
		  </view>
		</view>

    <view class="finishTitle">任务完成进度</view>

    <view class="contract" style="padding-top: 20rpx;" v-if="selfMoney != ''">
      <view class="contractText">{{selfMoney.create_time}}</view>
      <view class="contractText">任务已完成验收 奖励金额{{selfMoney.money}}</view>
      <view class="contract_speed">
        <view class="" v-for="(s,k) in selfMoney.imgUrl" :key="k">
          <image :src=s mode=""></image>
        </view>

      </view>
      <view class="line"></view>
    </view>

   <view class="contract" style="padding-top: 20rpx;" v-for="(item,index) in situationList" :key="index">
      <view class="contractText">上传于{{item.create_time}}</view>
      <view class="contract_speed">
        <view v-for="(s,k) in item.imgUrl" :key="k">
          <image :src="s" mode=""></image>
        </view>
      </view>
      <view style="width:560rpx;margin-bottom: 20rpx;color:rgba(143, 143, 143, 100);">
        {{item.explain}}
      </view>
      <view class="line"></view>
    </view>

    <view class="noData" v-if="situationList.length == 0">
      <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode=""></image>
    </view>

    <view class="task_button" v-if="type == 4">
      <view class="establish_new">驳回任务合同签约</view>
      <view class="establish_new" style="color: #FFFFFF;background-color:#00BBAE;">签约并开始任务</view>
    </view>


      <view class="task_button" v-if="statusId != 4 && situationList.length > 0 ">
        <view class="establish_new" @click="backCheck">驳回验收</view>
        <view class="establish_new" @click="goCheck" style="color: #FFFFFF;background-color:#00BBAE;">通过验收</view>
      </view>



	</view>
</template>

<script>
  import http from "../../../utils/http"
	export default {
		data() {
			return {
        situationList:[],
        id:'',
        card_id:'',
        task_id:'',
        type:'',
        selfMoney:[],
        statusId:''
			}
		},
    onLoad(option){
      this.id = option.id
      this.card_id = option.cardId
      this.task_id = option.taskId
      this.type = option.type
      this.statusId = option.status
      this.getMissionSituation(option.cardId)
      this.getSelfMoney(option.taskId,option.cardId)
    },
		methods: {
      //获取个人的打款凭证信息
      getSelfMoney(task_id,card_id){
        var data = {
          task_id:task_id,
          card_id:card_id
        }
        http({url:'/apis/companytask/read_company_reward',method:'GET',data:data}).then(res=>{
          if(res.data.code = 200){
            this.selfMoney = res.data.data
            this.selfMoney.imgUrl = []
            this.selfMoney.imgUrl = this.selfMoney.contract.split(',')
          }
        })
      },
      //通过验收
      goCheck(){
        var data = {
          id:this.id,
          status:3
        }
        http({url:'/apis/companytask/task_people_edit',method:'PUT',data:data}).then(res=>{
          if(res.data.code = 200){
            var that = this
              uni.showModal({
                  title: '提示',
                  content: '是否跳转到上传奖励页面',
                  success: function (res) {
                      if (res.confirm) {
                          uni.navigateTo({
                            url:'../upLoadImg/upLoadImg?card_id='+that.card_id+'&task_id='+that.task_id
                          })
                      } else if (res.cancel) {
                          var data = {
                            id:that.id,
                            status:4
                          }
                          http({url:'/apis/companytask/task_people_edit',method:'PUT',data:data}).then(res=>{
                            if(res.data.code = 200){
                              uni.showToast({
                                title:'验收成功',
                                icon:'none'
                              })
                              that.getMissionSituation(this.card_id)
                              that.getSelfMoney(this.task_id,this.card_id)
                              // console.log(999999999999)
                            }
                          })
                      }
                  }
              });

          }
        })
      },
      //驳回验收
      backCheck(){
        var data = {
          id:this.id,
          status:1
        }
        http({url:'/apis/companytask/task_people_edit',method:'PUT',data:data}).then(res=>{
          if(res.data.code = 200){
            uni.showToast({
              title:'驳回验收通过',
              icon:'none'
            })
          }
        })
      },
      //获取任务完成进度
      getMissionSituation(id){
        var data = {
          card_id:id,
          task_id:this.task_id
        }
        http({url:'/apis/companytask/task_people_evidence',method:'GET',data:data}).then(res=>{
          if(res.data.code = 200){
            this.situationList = res.data.data
            this.situationList.forEach(item=>{
              item.imgUrl = []
              item.imgUrl = item.evidence.split(',')
            })
            // console.log(this.situationList.length,333333333)
          }
        })
      },

		}
	}
</script>

<style>
  .contract{
    width: 600rpx;
    margin-left: 75rpx;
  }
  .contract_top{
    display: flex;
    height: 62rpx;
    line-height: 62rpx;
    margin: 30rpx 0;
    font-size: 28rpx;

  }
  .contract_top image{
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }
  .contract_top_text{
    width: 300rpx;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .contract_status{
    width: 96rpx;
    height: 42rpx;
    line-height: 42rpx;
    border-radius: 12rpx;
    background-color: rgba(196, 241, 238, 100);
    color: rgba(0, 187, 174, 100);
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    margin-top: 10rpx;
    margin-left: 20rpx;
    margin-right: 72rpx;
  }
  .contract_speed{
    display: flex;
    flex-wrap:wrap;
    position: relative;
  }
  .contract_speed image{
    width:140rpx;
    height: 140rpx;
    margin-right:10rpx;
    margin-bottom:20rpx;
  }

  .contractText{
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    font-family: PingFangSC-regular;
    margin-bottom: 20rpx;
  }
  .finishTitle{
    width: 675rpx;
    height: 40rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    font-family: PingFangSC-semiBold;
    font-weight: bold;
    background-color: rgba(240, 241, 240, 100);
    padding: 20rpx 0;
    padding-left: 75rpx;
  }
  .line{
    width:750rpx;
    height: 12rpx;
    background-color: rgba(240, 241, 240, 100);
    margin-left: -75rpx;
  }
  .task_button {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    height: 84rpx;
    display: flex;
    justify-content: space-between;
    z-index: 9999;
  }
  .establish_new{
    flex: 1;
    height: 84rpx;
    line-height:84rpx;
    text-align: center;
    background-color:#FFFFFF;
    color: rgba(0, 187, 174, 100);
    font-size: 28rpx;
    border: 2rpx solid rgba(0, 187, 174, 100);
  }
  .noData image{
    width: 250rpx;
    height: 250rpx;
    margin-left: 250rpx;
    margin-top: 250rpx;
  }
</style>
