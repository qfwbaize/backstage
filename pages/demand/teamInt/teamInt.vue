<template>
	<view class="content">
		<view class="teamlist">
      <!-- 团队展示 -->
		  <view class="team" v-for="(item,index) in teamList" :key="index" @click="toEditteam(index)">
        <view class="teamimg" v-if="teamList.length > 0">
          <image :src=item.memberPhoto mode=""></image>
        </view>
        <view class="teamimgs" v-else>
         <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/picupload.png" mode=""></image>
         <view class="">点击编辑成员信息</view>
        </view>
        <view class="teamname">姓名：{{item.memberName}}</view>
        <view class="teamname">职位：{{item.memberPosition}}</view>
        <view class="teamname">毕业院校：{{item.memberVitae}}</view>
        <view class="del" @click.stop="del(index)">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/binbox.png" mode=""></image>
        </view>
      </view>
      <!-- 添加团队 -->
      <view class="add" @click="toAddteam">
        <view class="addtext">+</view>
      </view>
		</view>
	</view>
</template>

<script>
  import WXAJAX from "@/utils/request";
	export default {
		data() {
			return {
        teamList:[],
        teamMemberId:'',
        pageNum: 1,
        open:false,
        pageSize:10
			}
		},

    onShow(){
      this.getTeam()
    },
    onPullDownRefresh(){
      this.pageNum = 1
      this.getTeam()
    },
    onReachBottom(){
      if(this.open == false){
        this.pageNum += 1
        this.getTeam()
      }
    },
		methods: {
      //修改团队成员
      toEditteam(index){
        this.teamMemberId = this.teamList[index].teamMemberId
        uni.navigateTo({
          url:'../editTeam/editTeam?type=0&teamMemberId='+this.teamMemberId
        })
      },
      //添加团队成员
      toAddteam(){
        uni.navigateTo({
          url:"../editTeam/editTeam"
        })
      },
      //删除团队成员
      del(index){
        this.teamMemberId = this.teamList[index].teamMemberId
        WXAJAX.POST({teamMemberId:this.teamMemberId},'','/teamMember/del','','',1).then(res=>{
          if(res){
            uni.showToast({
              title:'删除成功',
            })
            this.getTeam()
          }
        })
      },
      //获取团队成员列表
      getTeam(){
        let params = {}
        params.companyId = uni.getStorageSync('COMPANYID')
        params.pageNum = this.pageNum
        WXAJAX.POST(params,'','/teamMember/queryPage','','',1).then(res=>{
          if(this.pageNum == 1){
            this.teamList = res.list
          }else{
            this.teamList = [...this.teamList,...res.list]
          }
          //防止多次触发，小于10条时，不触发
          if(this.teamList.length < this.pageSize){
            this.open = true
          }else{
            this.open = false
          }
        })

      },
		}
	}
</script>

<style scoped>
.content{
  width: 100vw;
  height: 100vh;
  background-color: #FFFFFF;
}
.teamlist{
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #FFFFFF;
}
.team{
  width: 322rpx;
  height: 450rpx;
  line-height: 40rpx;
  border-radius: 12rpx;
  text-align: left;
  border: 2rpx solid rgba(232, 232, 232, 100);
  position: relative;
  margin-bottom: 34rpx;
}
.teamimg{
  width: 322rpx;
  height: 306rpx;
}
.teamimg image{
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}
.teamimgs{
  width: 322rpx;
  height: 306rpx;
  border-radius: 12rpx 12rpx 0px 0px;
  background-color: #e8e8e8;
  color: rgba(175, 173, 173, 96);
  font-size: 28rpx;
  text-align: center;
  font-family: PingFangSC-regular;
}
.teamimgs image{
  margin-top: 100rpx;
  width: 48rpx;
  height: 48rpx;
}
.teamname{
  width: 100%;
  height: 38rpx;
  color: rgba(160, 157, 157, 96);
  font-size: 28rpx;
  font-family: PingFangSC-regular;
  margin-top: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.del{
  width: 48rpx;
  height: 48rpx;
  position: absolute;
  right: 0;
  top: 0;
}
.del image{
  width: 100%;
  height: 100%;
}
.add{
  width: 322rpx;
  height: 450rpx;
  line-height: 40rpx;
  border-radius: 12rpx;
  border: 2rpx solid rgba(232, 232, 232, 100);
}
.addtext{
  width: 48rpx;
  height: 48rpx;
  text-align: center;
  line-height: 48rpx;
  font-size: 60rpx;
  font-weight: 100;
  color: rgba(175, 173, 173, 96);
  margin-top: 200rpx;
  margin-left: 138rpx;
}
</style>
