<template>
	<view class="content">
    <!-- 轮播图 -->
    <view class="rotation">
      <swiper :indicator-dots="false" :autoplay="true" :circular='true' :interval="3000" :duration="1000">
        <swiper-item>
          <view class="swiper-item">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/faxianbanner1.png" mode=""></image>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/faxianbanner2.png" mode="">

          </view>
        </swiper-item>
      </swiper>
    </view>
		<!-- 搜索框 -->
		<view class="search">
			<view class="searchicon">
				<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/greensearch.png" mode="">
				</image>
			</view>
      <input confirm-type="search" v-model="searchVal" type="text" placeholder-style=" color: #1EC4B9;" placeholder="搜索任务关键词"	 />
		</view>
		<!-- 导航栏 -->
		<view class="nav">
			<view class="navleft">
				<view :class="activeIndex == 0 ? 'active' : 'selectActive' " @click="activeIndex = 0">推荐</view>
				<view :class="activeIndex == 1 ? 'active' : 'selectActive' " @click="activeIndex = 1">附近</view>
			</view>
      <view class="navright">
        <view class="navBtn">
          <view>北京</view>
          <view class="triangle"></view>
        </view>
        <view class="navBtn">
          <view>筛选</view>
          <view class="triangle"></view>
        </view>
        <view class="navBtn">
          <view>关键词</view>
          <view class="triangle"></view>
        </view>
      </view>
		</view>

    <!-- 主体列表 -->
    <view class="main">
      <view class="minList">
        <view class="minList_top">
          <view class="minList_title">公司logo设计</view>
          <view class="minList_reward">100元</view>
        </view>
        <view class="minList_center">
          <view class="minList_center_left">
            <view style="color: #f5f5f5;margin-right: 15rpx;">
              <Circle></Circle>
            </view>
            <view>
              <view class="minList_center_right_people">2021-6-5</view>
              <view class="minList_center_right_people" style="margin-top: 32rpx;">2021-6-5</view>
            </view>
          </view>
          <view class="minList_center_right">
            <view class="minList_center_right_people">指定人：[张三] [设计师］</view>
            <view class="minList_center_right_people" style="margin-top: 32rpx;">所属机构：柏森营销顾问</view>
          </view>
        </view>
        <view class="minList_bottom">进行中</view>
      </view>
    </view>
    <!-- 悬浮发任务按钮 -->
    <view class="send">
      <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/customerflag.png" mode=""></image>
    </view>
	</view>
</template>

<script>
  import circle from "@/components/circle";
	export default {
    components:{
      circle
    },
		data() {
			return {
        activeIndex:0,
			}
		},
		onShow() {

		},
		onPullDownRefresh() {

		},
		onReachBottom() {

		},
    computed:{

    },
		methods: {
      //切换分类
      changeActive(index){
        this.activeIndex = index
      }
		}
	}
</script>

<style scoped>
	.content {
		width: 750rpx;
    min-height: 100vh;
		position: relative;
	}
  .rotation{
    width:670rpx;
    height: 350rpx;
    margin-left: 40rpx;
    margin-top: 20rpx;
    border-radius:12rpx;
  }
  .rotation swiper{
    width:670rpx;
    height: 350rpx;
    border-radius:12rpx;
  }
  .swiper-item{
    width:670rpx;
    height: 350rpx;
  }
  .swiper-item image{
    width:100%;
    height:100%;
    border-radius:12rpx;
  }

	.search {
		width: 670rpx;
		height: 72rpx;
		border-radius: 30rpx;
		background-color: rgba(244, 255, 255, 100);
		color: rgba(30, 196, 185, 100);
		font-size: 28rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
		font-family: Microsoft Yahei;
		margin-top: 14rpx;
		margin-bottom: 40rpx;
		display: flex;
		margin-left: 40rpx;
	}

	.searchicon {
		width: 48rpx;
		height: 48rpx;
		margin-top: 11rpx;
		margin-left: 46rpx;
	}

	.searchicon image {
		width: 100%;
		height: 100%;
	}

	.search input {
		width: 500rpx;
		height: 72rpx;
	}

	.nav {
		width: 670rpx;
		height: 52rpx;
		display: flex;
		justify-content: space-between;
		line-height: 52rpx;
		margin-left: 40rpx;
	}

	.navleft {
		display: flex;
	}

	.active {
		height: 52rpx;
		line-height: 52rpx;
    font-weight: bold;
		border-bottom: 3px solid #00BBAE;
		color: rgba(0, 187, 174, 100);
		font-size: 32rpx;
		font-family: Arial;
		margin-right: 16rpx;
	}

	.selectActive {
		height: 52rpx;
		line-height: 52rpx;
    color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		font-family: Arial;
		margin-right: 16rpx;
	}
  .navright{
    display: flex;
    justify-content: space-between;
  }
  .navBtn{
    height: 50rpx;
    line-height: 50rpx;
    border-radius: 12rpx;
    background-color:rgba(196, 241, 238, 100);
    color:#00BBAE;
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    display: flex;
    padding: 0 15rpx;
    margin-right:12rpx;
  }
  .triangle{
    width: 0;
    height: 0;
    border-left:10rpx solid transparent;
    border-right:10rpx solid transparent;
    border-top: 15rpx solid #00BBAE;
    margin-left: 6rpx;
    margin-top: 19rpx;
  }

  .main {
    width: 670rpx;
    padding: 40rpx;
    background-color: #f5f5f5;
  }

  .minList {
    width: 630rpx;
    height: 332rpx;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    margin-bottom: 40rpx;
    padding: 20rpx;
  }

  .minList_top {
    display: flex;
    justify-content: space-between;
  }

  .minList_title {
    color: rgba(16, 16, 16, 100);
    font-size: 32rpx;
    font-weight: bold;
  }

  .minList_reward {
    color: rgba(0, 187, 174, 100);
    font-size: 28rpx;
  }

  .minList_center {
    display: flex;
    justify-content: space-between;
    margin-top: 50rpx;
    margin-bottom: 50rpx;
  }

  .minList_center_left {
    width: 182rpx;
    height: 110rpx;
    display: flex;
  }

  .greencircle {
    width: 15rpx;
    height: 15rpx;
    border-radius: 50%;
    border: 1px solid #00BBAE;
    margin-top: 8rpx;
  }

  .orangecircle {
    width: 15rpx;
    height: 15rpx;
    border-radius: 50%;
    border: 1px solid orange;
  }

  .minList_center_right_people {
    color: rgba(143, 143, 143, 100);
    font-size: 26rpx;
    text-align: left;
    font-family: PingFangSC-regular;
  }

  .minList_bottom {
    width: 100%;
    height: 40rpx;
    line-height: 40rpx;
    color: rgba(25, 27, 30, 100);
    font-size: 28rpx;
    text-align: center;
    font-family: PingFangSC-regular;
  }
  .send{
    width:130rpx;
    height:130rpx;
    background-color:#82ded7;
    text-align: center;
    border-radius: 50%;
    position: fixed;
    right:48rpx;
    bottom:200rpx;
  }
  .send image{
    width:80rpx;
    height:80rpx;
    margin-top: 25rpx;
  }


</style>
