<template>
	<view class="app">
		<diy-img-ad :value="imgList" @redirectTo="redirectTo"></diy-img-ad>
		<!-- <view class="w100p bgfff">
      <view class="disflex jsbet " style="padding: 40rpx;"></view>
    </view> -->
		<view class="w100p bgfff">
			<view class="disflex " style="padding: 30rpx;flex-wrap: wrap;">
				<view class="" style="display: flex;justify-content: space-between;width: 100%;margin-bottom: 60rpx;">
					<view class="w64" @click="toservice()">
						<view class="slider">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-new@3x.png"
								mode="">
							</image>
						</view>
						<view class="mt8"
							style="color:#101010;font-size: 28rpx;text-align: center; margin-bottom: 6rpx;font-family: PingFangSC-regular;">
							资讯
						</view>
						<!-- <view style="color: #BCBCBC;font-size: 20rpx;text-align: center;">
           		做任务找兼职
           	</view> -->
					</view>
					<view class="w64" @click="redirectTo(imgList[2].src,imgList[2].id)">
						<view class="slider">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-product@3x.png"
								mode="">
							</image>
						</view>
						<view class="mt8"
							style="color:#101010;font-size: 28rpx;text-align: center; margin-bottom: 6rpx;">
							产品
						</view>
						<!-- 	<view style="color: #BCBCBC;font-size: 20rpx;text-align: center;">
           		发现产品商机
           	</view> -->
					</view>
					<view class="w64" @click="redirectTo(imgList[3].src,imgList[3].id)">
						<view class="slider">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-block@3x.png"
								mode="">
							</image>
						</view>
						<view class="mt8"
							style="color:#101010;font-size: 28rpx;text-align: center; margin-bottom: 6rpx;">
							供求
						</view>
						<!-- 	<view style="color: #BCBCBC;font-size: 20rpx;text-align: center;">
           		对接行业需求
           	</view> -->
					</view>
					<view class="w64" @click="toTaskHall">
						<view class="slider">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-paper-plane@3x.png"
								mode="">
							</image>
						</view>
						<view class="mt8"
							style="color:#101010;font-size: 28rpx;text-align: center; margin-bottom: 6rpx;">
							采聘
						</view>
						<!-- <view style="color: #BCBCBC;font-size: 20rpx;text-align: center;">
           		做任务找兼职
           	</view> -->
					</view>
				</view>
				<!-- 下面的 -->
				<view class="" style="display: flex;justify-content: space-between;width: 100%;">
					<view class="w64" @click="redirectTo('../companyPack/find/main',2)">
						<view class="slider">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-people@3x.png"
								mode="">
							</image>
						</view>
						<view class="mt8"
							style="color:#101010;font-size: 28rpx;text-align: center;margin-bottom: 6rpx;">
							人脉
						</view>
						<!-- <view style="color: #BCBCBC;font-size: 20rpx;text-align: center;">
           		交朋友拓业务
           	</view> -->
					</view>
					<!-- <view class="shugun"></view> -->
					<!-- <view class="shugun"></view> -->
					<!-- <view class="shugun"></view> -->


					<view class="w64" @click="tovacancy()">
						<view class="slider">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-forum@3x.png"
								mode="">
							</image>
						</view>
						<view class="mt8"
							style="color:#101010;font-size: 28rpx;text-align: center; margin-bottom: 6rpx;">
							招聘
						</view>
						<!-- <view style="color: #BCBCBC;font-size: 20rpx;text-align: center;">
           		做任务找兼职
           	</view> -->
					</view>
					<view class="w64" @click="tobusiness()">
						<view class="slider">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-shield@3x.png"
								mode="">
							</image>
						</view>
						<view class="mt8"
							style="color:#101010;font-size: 28rpx;text-align: center; margin-bottom: 6rpx;">
							企业
						</view>
						<!-- <view style="color: #BCBCBC;font-size: 20rpx;text-align: center;">
           		做任务找兼职
           	</view> -->
					</view>
					<view class="w64" @click="topurchase()">
						<view class="slider">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-gift@3x.png"
								mode="">
							</image>
						</view>
						<view class="mt8"
							style="color:#101010;font-size: 28rpx;text-align: center; margin-bottom: 6rpx;">
							采礼
						</view>
						<!-- <view style="color: #BCBCBC;font-size: 20rpx;text-align: center;">
           		做任务找兼职
           	</view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="ferret" @click="toferret()">
			<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/greensearch.png" mode="">
			</image>
			<view class="keyword">搜索关键词</view>
		</view> -->
		<view class="w100p bgfff">
			<view class="disflex jsbet content">
				<text class="fbold" style="font-size: 32rpx;">为您推荐</text>
				<view class="disflex " @click="gocommmend()">
					<image class="refreshimg" :src="huanyipi" mode=""></image>
					<view style="color:rgba(1, 196, 161, 1);font-size: 24rpx;margin-top: 4rpx;">换一批</view>
				</view>
			</view>
			<!-- <view class="" style="width: 90%;height: 4rpx;background-color: #F1F1F1;margin-left: 40rpx;"></view> -->
		</view>
		<view class="recommend" style="">
			<view class="supply" v-for="(item,index) in fabric" :key="index"
				:class="listid == index ? 'supply' : 'nosupply'" @click="getCompanyAllInfo(item.id,1)">
				{{item.name}}
			</view>
		</view>
		<!-- 企业 -->
		<view class="w99p bgf5f6 " style="" v-show="listid == 0">
			<view class="disflex callinglist bgfff" @click="toWebsite(item)" v-for="(item,index) in companylists"
				:key='index'>
				<view class="left">
					<image :src="item.companyLogo" mode=""></image>
				</view>
				<view class="right">
					<text class="fs14">{{item.companyName}}</text>
					<p class="ccyc mt8" style="width: 400rpx;color: #767676;font-size: 24rpx;">
						{{item.companyNotice || item.industryLabel || ''}}
					</p>
				</view>
				<!-- <view>
          <view style="" class="gbbbn">
            <view style="line-height: 60rpx;color:#1AD09C;margin-top: 12rpx;">+关注</view>
          </view> -->
				<!-- <view style="" class="gzbtn" v-if="item.isAttention == true" @click="followbtn(item,0)">
        		<view style="line-height: 60rpx;color:#1AD09C;">已关注</view>
        	</view> -->
				<!-- </view> -->
			</view>
			<!-- <view class="" style="width: 90%;height: 4rpx;background-color: #F1F1F1;margin-left: 40rpx;"></view> -->
		</view>
		<!-- 产品 -->
		<view class="fabriclist" style="" v-show="listid == 1">
			<view class="product_list" v-for="(item,index) in productlist" :key='index' @click="toProdDetail(item)">
				<image :src="item.goodPhoto" style="width: 320rpx;height: 400rpx;" mode=""></image>
				<view class="">
					<view class=""
						style="font-size: 28rpx;width: 300rpx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top: 20rpx;">
						产品名字 : {{item.goodsName}}</view>
					<view class="" style="font-size: 24rpx;color:#767676;margin-top: 10rpx;margin-bottom: 10rpx;">参考价 :
						{{item.price}}
					</view>
				</view>
			</view>
			<!-- <view class="" style="width: 90%;height: 4rpx;background-color: #F1F1F1;margin-left: 40rpx;"></view> -->
		</view>
		<!-- 供求 -->
		<view class="supply_list" v-show="listid == 2">
			<view class="vacancy" v-for="(item,index) in supplylist" :key='index'
				@click="demand_detall(item.squareId,item.companyId)">
				<view class=""
					style="margin-left: 30rpx;display: flex;flex-direction:column;justify-content: space-between;">
					<view class="">
						<view class="" style="font-size: 28rpx;margin-top: 10rpx;margin-bottom: 8rpx;">
							{{item.description}}
						</view>
						<view class="remarks" style="">{{item.note}}</view>
					</view>
					<view class="" style="display: flex;">
						<view class="" style="display: flex;">
							<image style="width: 60rpx;height: 60rpx;border-radius: 50%;margin-bottom: 10rpx;"
								:src="item.logo" mode=""></image>
							<view class="" style="font-size: 28rpx;margin-top: 10rpx;">{{item.name}}</view>
						</view>
						<view class="" style="display: flex;">
							<image style="width: 34rpx;height: 34rpx;margin-top: 12rpx;"
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/location.png"
								mode=""></image>
							<view class="addreseee" style="">{{item.addres || '暂无'}}</view>
						</view>
					</view>

				</view>
				<image
					style="width: 130rpx;height: 130rpx;margin-top: 30rpx;margin-right: 30rpx;margin-bottom: 30rpx;border-radius:12rpx;"
					:src="item.image[0]" mode=""></image>
			</view>
		</view>
		<!-- 招聘 -->
		<view class="public" style="" v-show="listid == 3">
			<view class="vacancy" v-for="(item,index) in recruitlist" :key="index"
				@click="toparticulars('inviteDetail','?recruitId='+item.recruitId)">
				<view class="" style="margin-top: 20rpx;margin-bottom: 20rpx;margin-left: 20rpx;">
					<view class="" style="font-size: 28rpx;font-weight:bold;">{{item.position}}</view>
					<view class="" style="font-size: 24rpx;color:#767676;margin-top: 20rpx;">
						{{item.recruitAddress}} | {{experienceArray[item.experience-1].title}} |
						{{educatArray[item.education-1].title}}
					</view>
					<view class="" style="display: flex;margin-top: 20rpx;">
						<image style="width: 60rpx;height: 60rpx;border-radius: 50%;" :src="item.companyLogo" mode="">
						</image>
						<view class="" style="font-size: 24rpx;margin-top: 14rpx;margin-left: 20rpx;">
							{{item.companyName}}
						</view>
					</view>
				</view>
				<view class=""
					style="font-size: 26rpx;color:#00D7D0;margin-top:90rpx;margin-right: 20rpx;font-weight:bold">
					{{item.minSalary}}-{{item.maxSalary}}
				</view>
			</view>
		</view>
		<!-- 	<view class="w100p bgfff ">
			<view class="disflex jscen poster">
				<image :src="banner2" mode=""></image>
			</view>
		</view> -->
		<view class="w100p bgfff">
			<view class="disflex jsbet content">
				<text class="fbold" style="font-size: 32rpx;">精选文章</text>
				<view class="disflex " @click.stop="huandynamic">
					<image class="refreshimg" :src="huanyipi" mode=""></image>
					<text style="color:rgba(1, 196, 161, 1);font-size: 24rpx;margin-top: 4rpx;">换一批</text>
				</view>
			</view>
			<!-- <view class="line" /> -->
		</view>
		<view class="screen">
			<scroll-view scroll-x="true" style=" padding: 0 40rpx; width:670rpx ; white-space: nowrap;height: 88rpx;">
				<view class="jxscreenList" style="width: 100%;">
					<view v-for="(item,index) in wzlabel" :key="index"
						:class="jxtabType == index ? 'jxactive' : 'jxindustry'" @click.stop="jxtap(index)">
						{{item.labelTitle}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="w99p bgf5f6" style="margin-left: 40rpx;margin-right: 40rpx;margin-top: 20rpx;">
			<view @click="toDetail(item)" class=" "
				style="background-color:#fff;z-index:99;box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.28);width:100%;border-radius:12rpx;margin-bottom:26rpx;"
				v-for="(item , index ) in tinterest" :key="index">
				<view class="disflex">
					<view class="w250" style="margin: 20rpx;">
						<view class="disflex">
							<text class="fs14 c38 over_2"
								style="max-width: 380rpx;height: 76rpx;">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
							<view class="w22">
								<!-- 是否有推销奖励 -->
								<image class="w20 h20" v-if="item.settingInfo.pushEffectFlag == 1"
									:src="tuixiaozhuanfa"></image>
								<!-- 是否有悬赏奖励 -->
								<image class="w20 h20" v-if="item.settingInfo.offerRewardFlag == 1"
									:src="pay_selectIcon"></image>
								<!-- 是否有分享奖励 -->
								<image class="w20 h20" v-if="item.settingInfo.shareRewardFlag == 1"
									:src="pay_selectIcon"></image>
								<!-- 是否有阅读奖励 -->
								<image class="w20 h20" v-if="item.settingInfo.readRewardFlag == 1" :src="yuedujiangli">
								</image>
								<!-- <image class="w20 h20" :src="tuixiaozhuanfa"></image>
								<image class="w20 h20" :src="yuedujiangli"></image> -->
							</view>
						</view>
						<p class="fs12 ca7 mt15">
							<text> {{item.settingInfo.msg}} </text>
						</p>
						<!-- <p class="fs12 ca7 mt15">
							<text v-if="item.settingInfo.pushEffectFlag == 1 ">本文为推销奖励文章</text>
							<text v-if="item.settingInfo.offerRewardFlag == 1">本文为悬赏奖励文章</text>
							<text v-if="item.settingInfo.shareRewardFlag == 1">本文为分享奖励文章</text>
							<text v-if="item.settingInfo.readRewardFlag == 1">本文为阅读奖励文章</text>

						</p> -->
						<!-- <p class="fs12 ca7 mt15" v-if="item.settingInfo.pushEffectFlag == 0 && item.settingInfo.offerRewardFlag == 0 && item.settingInfo.shareRewardFlag == 0 && item.settingInfo.readRewardFlag == 0">本文为普通转发文章</p> -->
					</view>
					<img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" class="w65 h65 bradius4 mr8"
						style="margin: 20rpx;">
				</view>
				<!-- 				<view class="operation">
					<div class="disflex jscen align-cen"
						@click.stop.stop="zan1(index,item.isThumbs, item.dynamicId,item,'彩泥喜欢')"
						:class="item.type != 2 ? 'w33p': 'w50p'">
						<img class="w20 h20 mr8" :src="item.isThumbs == 1 ?  like_selectIcon :  likeIcon">
						<p :class="item.isThumbs == 1 ?  'cblue' :  'c78'" class="fs12">{{item.likeNum}}</p>
					</div>
					<div class="disflex jscen align-cen" @click.stop="addCommentA(index, comment_item)"
						:class="item.type != 2 ? 'w33p': 'w50p'">
						<img class="w20 h20 mr8" :src="commentIcon">
						<p class="fs12 c78">{{item.commentNum}}</p>
					</div>
					<button v-if="item.type != 2" class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
						:data-dynamicId="item.dynamicId"
						@click.stop="toShare(item.dynamicId,item.companyId,item.title,item.photos,item)"
						hover-class="other-button-hover">
						<img class="w20 h20 mr8" :src="shareIcon"> -->
				<!-- <span>{{item.shareNum}}</span> -->
				<!-- </button>
				</view> -->
			</view>

		</view>
		<view class="w100p bgfff">
			<view class="disflex jsbet content">
				<text class="fbold" style="font-size: 32rpx;">发现广场</text>
				<!-- <view class="disflex " @click="huandynamic">
    		<image class="refreshimg" :src="huanyipi" mode=""></image>
    		<text style="color:rgba(1, 196, 161, 1);">换一批</text>
    	</view> -->
			</view>
		</view>
		<view class="screen" :class='{ fixedNavbar: isfixTab }'>
			<view class="screenList">
				<!-- <view :class="tabType == 1 ? 'active' : 'industry'" @click="tab_type_tap(1)">
					全部
				</view> -->
				<view :class="tabType == 2 ? 'active' : 'industry'" @click="tab_type_tap(2)">
					推荐
				</view>
				<view :class="tabType == 3 ? 'active' : 'industry'" @click="tab_type_tap(3)">
					关注
				</view>
				<!-- 	<view :class="tabType == 4 ? 'active' : 'industry'" @click="tab_type_tap(4)">
					动态
				</view> -->
			</view>
			<view class="release">
				<view class="activee" @click="toRelease">
					<text class="textbg">+</text><text style="margin-left: 50rpx;">发布</text>
				</view>
			</view>
		</view>

		<view v-if="tabType == 2" class="rmdcontent  bgf5f6"
			style="margin-left: 40rpx;margin-right: 40rpx;margin-top: 20rpx;">
			<view class="contentlist bgfff"
				v-if="item.type == 1|| item.type == 4 || item.type == 6|| item.type == 2|| item.type == 3"
				v-for="(item,index) in video_lists" :key="index">
				<view class="contentTile" style="position: relative;">
					<view class="contentTileleft">
						<image :src="item.logo" mode="">
						</image>
					</view>
					<view class="contentTileright">
						<text style="font-size: 28rpx;margin-top: 10rpx;">{{item.name}}
							<!-- <text class="fs12 ca8" style="display: inline;margin-left: 10rpx;">{{item.createTimeStr}}</text> -->
						</text>
						<text class="yc" style="width: 400rpx;">{{item.companyName}}</text>
					</view>
					<view v-if="item.createUserId != cardId">
						<view style="" class="gzbtn" v-if="item.isAttention == false" @click="followbtn(item,1)">
							<view style="line-height: 60rpx;color:#1AD09C ;font-size: 28rpx;">+关注</view>
						</view>
						<view style="" class="gzbtn" v-if="item.isAttention == true" @click="followbtn(item,0)">
							<view style="line-height: 60rpx;color:#1AD09C ;font-size: 28rpx;">已关注</view>
						</view>
					</view>

				</view>
				<view class="contentinfo">
					<view class="">
						<view class="contentinfoTitle" v-if="item.type == 2" @click="addComment(item)">
							{{item.title}}
						</view>
						<view class="contentinfoTitle" v-if="item.type == 4">
							{{item.title}}
						</view>
						<view class="contentinfoTitle" v-if="item.type == 6" @click="toviedoinfo(item,index)">
							{{item.title}}
						</view>
						<view class="contentinfoTitle" v-if="item.type != 2 && item.type != 4 && item.type != 6">
							{{item.title}}
						</view>
					</view>
					<view class="video" @click="toviedoinfo(item,index)" v-if="item.type == 6">
						<video poster="" :src="item.url" :id="'myVideo' + index" :data-index="index"
							:controls="true" :autoplay="false" @play="playVideo" :enable-play-gesture="true"
							:show-center-play-btn='true' :show-fullscreen-btn="true" :show-play-btn="true"></video>
					</view>
					<view v-if="item.type == 4" @click="toformat(item)"
						class="pt10 pb10 pl10  disflex jsbet align-cen wenzhang"
						style="box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.28);margin-top: 20rpx;margin-bottom: 20rpx;background-color: #fff; ">
						<view class="w250">
							<view class="disflex">
								<text class="fs14 c38 over_2" style="max-width: 380rpx;">{{item.title}}</text>
							</view>
							<p class="fs12 ca7 mt15">{{item.companyName}}</p>
						</view>
						<img :lazy-load="true" mode="aspectFill" :src="item.dynamicUrl" alt=""
							class="w65 h65 bradius4 mr8">
					</view>
					<view class="pt10 pb10 pl10 pr15 disflex jsbet align-cen wenzhang"
						v-if="item.type == 1 || item.type == 3" @click="toDetail(item)"
						style="margin-top: 20rpx;margin-bottom: 20rpx;background-color: #fff;">
						<view class="w250">
							<view class="disflex">
								<text class="fs14 c38 over_2"
									style="max-width: 380rpx;">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
								<view class="w22">
									<!-- 是否有推销奖励 -->
									<image class="w20 h20" v-if="item.settingInfo.pushEffectFlag == 1"
										:src="tuixiaozhuanfa"></image>
									<!-- 是否有悬赏奖励 -->
									<image class="w20 h20" v-if="item.settingInfo.offerRewardFlag == 1"
										:src="pay_selectIcon"></image>
									<!-- 是否有分享奖励 -->
									<image class="w20 h20" v-if="item.settingInfo.shareRewardFlag == 1"
										:src="pay_selectIcon"></image>
									<!-- 是否有阅读奖励 -->
									<image class="w20 h20" v-if="item.settingInfo.readRewardFlag == 1"
										:src="yuedujiangli"></image>
									<!-- <image class="w20 h20" :src="tuixiaozhuanfa"></image>
									<image class="w20 h20" :src="yuedujiangli"></image> -->
								</view>
							</view>
							<p class="fs12 ca7 mt15">
								<text>{{item.settingInfo.msg}}</text>
								<!--                <text v-if="item.settingInfo.pushEffectFlag == 1">本文为推销奖励文章</text>
                <text v-if="item.settingInfo.offerRewardFlag == 1">本文为悬赏奖励文章</text>
                <text v-if="item.settingInfo.shareRewardFlag == 1">本文为分享奖励文章</text>
                <text v-if="item.settingInfo.readRewardFlag == 1">本文为阅读奖励文章</text> -->
							</p>
							<!-- <p class="fs12 ca7 mt15" v-if="item.settingInfo.pushEffectFlag == 1">本文为推销奖励文章</p>
							<p class="fs12 ca7 mt15" v-if="item.settingInfo.offerRewardFlag == 1">本文为悬赏奖励文章</p>
							<p class="fs12 ca7 mt15" v-if="item.settingInfo.shareRewardFlag == 1">本文为分享奖励文章</p>
							<p class="fs12 ca7 mt15" v-if="item.settingInfo.readRewardFlag == 1">本文为阅读奖励文章</p> -->
							<!-- <p class="fs12 ca7 mt15" v-if="item.settingInfo.pushEffectFlag == 0 && item.settingInfo.offerRewardFlag == 0 && item.settingInfo.shareRewardFlag == 0
							 &&item.settingInfo.readRewardFlag == 0">本文为普通转发文章</p> -->
						</view>
						<img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" alt=""
							class="w65 h65 bradius4 mr8">
					</view>
					<view v-if="item.type == 2">
						<view class="chart1" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length <=1">
							<image :src="v" v-for="(v,b) in item.photos" :key="b" :data-src="v"
								@tap.stop="previewImage($event,item.photos)">
							</image>
						</view>
						<view class="chart" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length >= 2 && item.photos.length <=4">
							<view class="chart">
								<view class="image">
									<image :src="v" v-for="(v,b) in item.photos" :key="b" mode="" :data-src="v"
										@tap.stop="previewImage($event,item.photos)">
									</image>
								</view>
							</view>
						</view>
						<view class="chart4" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length >= 4">
							<view class="chart4">
								<view class="image">
									<image :src="v" v-for="(v,b) in item.photos" :key="b" mode="" :data-src="v"
										@tap.stop="previewImage($event,item.photos)">
									</image>
								</view>
							</view>
						</view>
						<view class="video" @click="addComment(item,index)" v-if="item.url">
							<video poster="" :src="item.url" :id="'myVideo' + index" :data-index="index"
								:controls="true" :autoplay="false" @play="playVideo" :enable-play-gesture="true"
								:show-center-play-btn='true' :show-fullscreen-btn="true" :show-play-btn="true"></video>
						</view>
					</view>
					<view class="operation" v-if="item.type != 4">
						<div class="disflex jscen align-cen"
							@click.stop="zan1(index,item.isThumbs, item.dynamicId,item)"
							:class="item.type != 2 ? 'w33p': 'w50p'">
							<img class="w20 h20 mr8" :src="item.isThumbs == 1 ?  like_selectIcon :  likeIcon">
							<p :class="item.isThumbs == 1 ?  'cblue' :  'c78'" class="fs12">
								{{item.likeNum}}
							</p>
						</div>
						<div class="disflex jscen align-cen" @click.stop="addCommentA(index, comment_item)"
							:class="item.type != 2 ? 'w33p': 'w50p'">
							<img class="w20 h20 mr8" :src="commentIcon">
							<p class="fs12 c78">{{item.commentNum}}</p>
						</div>
						<!--  -->
						<button v-if="item.type != 2" class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
							:data-dynamicId="item.dynamicId"
							@click="toShare(item.dynamicId,item.companyId,item.title,item.photos,item)"
							hover-class="other-button-hover">
							<img class="w20 h20 mr8" :src="shareIcon">
							<span>{{item.shareNum}}</span>
						</button>
					</view>
				</view>
			</view>
			<div v-if="videoflg" class="textc lh42 fs12 ca8 bgf5f6">- 到底了，看看其他的吧 -</div>
		</view>
		<view v-if="tabType == 3" class="rmdcontent  bgf5f6"
			style="margin-left: 40rpx;margin-right: 40rpx;margin-top: 20rpx;">
			<view class="contentlist bgfff" v-for="(item,index) in followList" :key="index">
				<view class="contentTile" style="position: relative;">
					<view class="contentTileleft">
						<image :src="item.logo" mode="">
						</image>
					</view>
					<view class="contentTileright">
						<text style="font-size: 28rpx;margin-top: 10rpx;">{{item.name}}
							<!-- <text class="fs12 ca8"style="display: inline;margin-left: 10rpx;">{{item.createTimeStr}}</text> -->
						</text>
						<text class="yc" style="width: 400rpx;">{{item.companyName}}</text>
					</view>
					<view style="" class="gzbtn" v-if="item.isAttention == false" @click="followbtn(item,1)">
						<view style="line-height: 60rpx;color:#1AD09C; font-size: 28rpx;">+关注</view>
					</view>
					<view style="" class="gzbtn" v-if="item.isAttention" @click="followbtn(item,0)">
						<view style="line-height: 60rpx;color:#1AD09C; font-size: 28rpx;">已关注</view>
					</view>
				</view>
				<view class="contentinfo">
					<view class="contentinfoTitle">
						{{item.title}}
					</view>
					<view class="video" v-if="item.type == 6">
						<video poster="" :src="item.url" :id="'myVideo' + index" :data-index="index"
							:controls="true" :autoplay="false" @play="playVideo" :enable-play-gesture="true"
							:show-center-play-btn='true' :show-fullscreen-btn="true" :show-play-btn="true"></video>
					</view>

					<view class="pt10 pb10 pl10 pr15 disflex jsbet align-cen wenzhang"
						v-if="item.type == 1 || item.type == 3" @click="toDetail(item)"
						style="margin-top: 20rpx;margin-bottom: 20rpx;background-color: #fff;">
						<view class="w250">
							<view class="disflex">
								<text class="fs14 c38 over_2"
									style="max-width: 380rpx;">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
								<view class="w22">
									<!-- 是否有推销奖励 -->
									<image class="w20 h20" v-if="item.settingInfo.pushEffectFlag == 1"
										:src="tuixiaozhuanfa"></image>
									<!-- 是否有悬赏奖励 -->
									<image class="w20 h20" v-if="item.settingInfo.offerRewardFlag == 1"
										:src="pay_selectIcon"></image>
									<!-- 是否有分享奖励 -->
									<image class="w20 h20" v-if="item.settingInfo.shareRewardFlag == 1"
										:src="pay_selectIcon"></image>
									<!-- 是否有阅读奖励 -->
									<image class="w20 h20" v-if="item.settingInfo.readRewardFlag == 1"
										:src="yuedujiangli"></image>
									<!-- <image class="w20 h20" :src="tuixiaozhuanfa"></image>
								<image class="w20 h20" :src="yuedujiangli"></image> -->
								</view>
							</view>
							<p class="fs12 ca7 mt15">
								<text>{{item.settingInfo.msg}}</text>
								<!--   <text v-if="item.settingInfo.pushEffectFlag == 1">本文为推销奖励文章</text>
                <text v-if="item.settingInfo.offerRewardFlag == 1">本文为悬赏奖励文章</text>
                <text v-if="item.settingInfo.shareRewardFlag == 1">本文为分享奖励文章</text>
                <text v-if="item.settingInfo.readRewardFlag == 1">本文为阅读奖励文章</text> -->
							</p>
							<!-- <p class="fs12 ca7 mt15" v-if="item.settingInfo.offerRewardFlag == 1">本文为悬赏奖励文章</p>
							<p class="fs12 ca7 mt15" v-if="item.settingInfo.shareRewardFlag == 1">本文为分享奖励文章</p>
							<p class="fs12 ca7 mt15" v-if="item.settingInfo.readRewardFlag == 1">本文为阅读奖励文章</p> -->
							<!-- <p class="fs12 ca7 mt15" v-if="item.settingInfo.pushEffectFlag == 0 && item.settingInfo.offerRewardFlag == 0 && item.settingInfo.shareRewardFlag == 0
							 &&item.settingInfo.readRewardFlag == 0">本文为普通转发文章</p> -->
						</view>
						<img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" alt=""
							class="w65 h65 bradius4 mr8">
					</view>
					<view v-if="item.type == 2">
						<view class="chart1" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length <=1">
							<image :src="v" v-for="(v,b) in item.photos" :key="b" :data-src="v"
								@tap.stop="previewImage($event,item.photos)">
							</image>
						</view>
						<view class="chart" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length >= 2">
							<view class="chart">
								<view class="image">
									<image :data-src="v" :src="v" v-for="(v,b) in item.photos" :key="b" mode=""
										@tap.stop="previewImage($event,item.photos)">
									</image>
								</view>
							</view>
						</view>
					</view>
					<view class="operation" v-if="item.type != 4">
						<div class="disflex jscen align-cen"
							@click.stop="zan1(index,item.isThumbs, item.dynamicId,item)"
							:class="item.type != 2 ? 'w33p': 'w50p'">
							<img class="w20 h20 mr8" :src="item.isThumbs == 1 ?  like_selectIcon :  likeIcon">
							<p :class="item.isThumbs == 1 ?  'cblue' :  'c78'" class="fs12">{{item.likeNum}}</p>
						</div>
						<div class="disflex jscen align-cen" @click.stop="addCommentA(index, comment_item)"
							:class="item.type != 2 ? 'w33p': 'w50p'">
							<img class="w20 h20 mr8" :src="commentIcon">
							<p class="fs12 c78">{{item.commentNum}}</p>
						</div>
						<!--  -->
						<button v-if="item.type != 2" class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
							:data-dynamicId="item.dynamicId"
							@click="toShare(item.dynamicId,item.companyId,item.title,item.photos,item)"
							hover-class="other-button-hover">
							<img class="w20 h20 mr8" :src="shareIcon">
							<span>{{item.shareNum}}</span>
						</button>
					</view>
				</view>
			</view>
			<div v-if="videoflg" class="textc lh42 fs12 ca8 bgf5f6">- 到底了，看看其他的吧 -</div>
		</view>
		<div class="fix_bottomCD disflex borderbox align-cen pl15 h49 bgfff edit_input trans2" v-if="input_show==true">
			<!--:class="input_show ? '' : 'hide' "-->
			<div class="bgfff  disflex w100p jsbet pr11 borderbox align-cen" style="margin-bottom: 270rpx;">
				<input fixed="true"
					class=" borderbox h40 lh40 pr11 bgf5f6 bradius5 flex1 mr11 comment_input c38 fs18 pl15"
					:focus="comment_focus" :placeholder="
		        replayComment.commentId
		          ? '回复 ' + replayComment.userName + '：'
		          : '评论'
		      " cursor-spacing="4" @confirm="inputConfirm" :style="{ height: text_height + 'px' }" v-model="comments" />
				<!--        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/smile.png" alt="" class="w25 h25" @click="smile_tap">-->
				<span class="bgblue cfff w50 textc lh30 fs16 bradius5 disblock ml10"
					@click.stop="inputConfirm">发送</span>
			</div>

		</div>
		<div v-if="chooseTypeShow">
			<SelectorOne :title="'选择发布内容'" :status="chooseTypeShow" :allClass="uploadVideoTypes"
				:choose_id="uploadVideoType" @closeModal="chooseTypeShow=false" @choose_tap="choose">
			</SelectorOne>
		</div>
		<SHARE v-if="share==true" :dynamicId="dynamicId" :videoId="videoId" :companyId="companyId" saveType='1' type='1'
			@closeShare="closeShare"></SHARE>
		<Tabbar :unreadMsg='unreadMsg' tabIndex=0></Tabbar>
		<view class="" style="width: 100%;height: 210rpx;"></view>
	</view>

</template>

<script>
	import websocket from '@/utils/websocket'
	import SHARE from '@/components/share' //
	import util from '@/utils/index'
	import WXAJAX from "../../utils/request";
	import diyImgAd from '@/components/diy-img-ad.vue';
	import {
		authSubscribeMessage
	} from '@/utils/auth.js';
	import HandleLogin from "@/utils/handleLogin";
	import SelectorOne from '@/components/selectorOne';
	import Tabbar from "@/components/Tabbar";
	import {
		mapActions,
		mapGetters
	} from "vuex";
	export default {
		name: '',
		components: {
			diyImgAd,
			SHARE,
			SelectorOne,
			Tabbar
		},
		data() {
			return {
				unreadMsg: uni.getStorageSync('unreadMsg'),
				uploadVideoType: 0,
				uploadVideoTypes: [{
						name: '发布视频',
						id: 1
					},
					{
						name: '发布文章',
						id: 2
					},
					{
						name: '发布动态',
						id: 3
					},
				],
				fabric: [{
						id: 0,
						name: '企业'
					},
					{
						id: 1,
						name: '产品'
					},
					{
						id: 2,
						name: '供求'
					},
					{
						id: 3,
						name: '招聘'
					},
				],
				/*学历*/
				educatArray: [{
						title: '全部',
						id: 1
					}, {
						title: '初中及以下',
						id: 2
					}, {
						title: '中专/中技',
						id: 3
					},
					{
						title: '高中',
						id: 4
					}, {
						title: '大专',
						id: 5
					}, {
						title: '本科',
						id: 6
					},
					{
						title: '硕士',
						id: 7
					}, {
						title: '博士',
						id: 8
					}
				],
				/*经验*/
				experienceArray: [{
						title: '应届生',
						id: 1
					}, {
						title: '1年以内',
						id: 2
					},
					{
						title: '1-3年',
						id: 3
					}, {
						title: '3-5年',
						id: 4
					}, {
						title: '5-10年',
						id: 5
					},
					{
						title: '10年以上',
						id: 6
					}, {
						title: '全部',
						id: 7
					},
				],
				commentIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_comment.png',
				videourl: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/video/20210319/32396be6e523cfee76e0684389072055.mp4',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like.png',
				like_selectIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like_select.png',
				shareIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_share.png',
				pay_selectIcon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon/pay.png',
				yuedujiangli: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/yuedujiangli.png',
				tuixiaozhuanfa: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/tuixiaozhuanfa.png',
				imgList: [{
						// url: WXAJAX.imgBackUrl + 'banner/caituibanner1.png',
						url: "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/faxianbanner1.png",
						id: 1,
						src: '../companyPack/find/poster/poster'
						// src: '../companyPack/find/main'
					}, {
						// url: WXAJAX.imgBackUrl + 'banner/caituibanner2.png',
						url: "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/faxianbanner2.png",
						id: 2,
						src: '/pages/companyPack/find/businessCardinfo/main?cardId=' + 1927 + '&comcompanyId=' + 1502,
					},
					// tobusiness(item) {

					// 	util.redirectTo('/pages/companyPack/find/businessCardinfo/main', {
					// 		cardId: item.cardId,
					// 		companyId: item.companyId
					// 	});
					// },
					{
						// url: WXAJAX.imgBackUrl + 'banner/caituibanner3.png',
						id: 3,
						src: '../companyPack/find/main'
					}, {
						// url: WXAJAX.imgBackUrl + 'banner/caituibanner4.png',
						id: 4,
						src: '../companyPack/find/main'
					},
				],
				banner2: WXAJAX.imgBackUrl + 'yimai_photos/crm/find_banner2.png',
				huanyipi: WXAJAX.imgBackUrl + 'yimai_photos/crm/md-loop.png',
				tinterest: '', //文章
				tabType: 2, //切换导航
				page: 1, //精选文章分页
				tinterest_lastPage: '', //文章的最大page数
				video_lists: '', //视频列表
				companypages: 1, //公司列表分页
				company_lastPage: '', //公司列表最大的page数
				companylists: '', //猜你喜欢（公司列表）
				videoContextList: [],
				videoflg: false, //判断视频是否还有下一页
				videopages: 1, //视频当前页数
				input_show: false, //评论弹窗
				replayComment: {}, // 回复信息对象
				add_comments_index: 0,
				comment_focus: false,
				comments: '',
				articlepages: 1, //文章当前页数
				article_lists: '', //文章列表
				articleflag: false, //判断文章是否还有下一页
				dontai_lists: '', //动态列表
				dynamicpages: 1, //动态当前页数
				dynamicflg: false, //判断动态是否还有下一页
				isfixTab: false,
				cardId: wx.getStorageSync('cardId'),

				share: false,
				dynamicId: 0,
				companyId: 0,
				photos: '',
				title: '',
				jxtabType: 0, //精选文章的
				wzlabel: '',
				labeltitel: '',
				chooseTypeShow: false,
				followpage: 1, //关注列表当前页数
				followList: '', //关注列表
				isLogin: wx.getStorageSync("isLogin") || false,
				videoId: '', //视频id
				isCompanyAuth: 1,
				listid: 0,
				referencepages: 1,
				reference_lastPage: '',
				productlist: '', //产品列表
				supplylist: '', //供求列表
				recruitlist: '', //招聘列表
			}
		},
		onLoad() {

		},
		onShow() {
			websocket.sendSocketJSON('1090');
			if (this.isLogin == true) {
				this.followmap()
			}
			this.videolist()
			// this.article()
			// this.dynamic()
			this.getCompanyAllInfo(0)
			this.wenzhanglabe()
			// this.gocommmend()
		},
		async onShareAppMessage(e) {
			let shareId = '';
			var that = this
			let path = '';
			if (this.dynamicId) {
				wx.showLoading();
				var sharedata = await WXAJAX.POST({ //添加分享记录
					dynamicId: this.dynamicId,
					shareSource: 1,
				}, '', '/share/record/add', '', '', 1, "1")

				path = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + this.dynamicId + '&companyId=' + wx
					.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' +
					'&shareId=' + sharedata.shareId;
				if (this.videoId) {
					path = '/pages/companyPack/videodetails/videodetails?dynamicId=' + this.dynamicId + '&companyId=' +
						wx.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' +
						'&shareId=' + sharedata.shareId + '&videoId=' + this.videoId;
				}
				console.log("path", path);
				wx.hideLoading();

			}
			return {
				imageUrl: this.photos,
				title: this.title,
				path,
				success(e) {
					wx.showShareMenu({
						withShareTicket: true
					})
				},
				fail(e) {
					console.log('失败-- ', e);
				}
			}

			this.dynamicId = '';
			this.companyId = '';
			this.title = '';
			this.photos = '';
		},
		methods: {
			toShare(did, companyId, title, photos, item) {
				// this.getAuthentication()
				console.log("this.isCompanyAuth", this.isCompanyAuth);
				if (this.isCompanyAuth != 1) {
					return
				}
				this.videoId = item.videoId || item.shortVideoId
				this.dynamicId = did;
				this.companyId = companyId;
				this.title = title;
				this.photos = photos[0];

				this.share = true;
			},
			//获取认证信息
			// getAuthentication() {
			// 	var data = {
			// 		ignore: true
			// 	}
			// 	WXAJAX.POST(data, '', '/company/getCompany', '', '').then(res => {
			// 		this.isCompanyAuth = res.isCompanyAuth
			// 		if (res.isCompanyAuth != 1) {

			// 			uni.showModal({
			// 				title: '认证功能',
			// 				content: '浏览此页面需要先认证',
			// 				cancelText: '返回首页',
			// 				confirmText: '前往认证',
			// 				success: function(res) {
			// 					if (res.confirm) {
			// 						let url =
			// 							'H5/webView?H5title=申请认证&url=https://wx.mingyicloud.com/app/myy/certmgmt.nsf/personcertFXMopenformFxMcompanyIdFxm' +
			// 							wx.getStorageSync('COMPANYID') + 'FxMidFxm3';
			// 						wx.navigateTo({
			// 							url: "/pages/" + url
			// 						});
			// 					} else if (res.cancel) {
			// 						uni.navigateTo({
			// 							url: '/pages/find/index'
			// 						});
			// 					}
			// 				}
			// 			});
			// 		}
			// 	})
			// },
			//跳转到任务大厅页面
			toTaskHall() {
				uni.navigateTo({
					url: '../demand/taskHall/taskHall'
				})
			},
			//关注列表
			followmap() {
				let v = this
				WXAJAX.POST({
						pageNum: this.followpage,
						pageSize: 20,
						attention: 1,
						type: -1,
					},
					"",
					"/dynamic/listDynamic", "", "", 1, "1"
				).then(data => {
					if (data.list) {
						data.list.forEach(function(i, k) {
							i.photos = i.photos ? i.photos.split(",") : [];
							// i.createTime = util.getdate(i.createTime, "dateTime");
							// i.createTime = v.getDateConversion(i.createTime)
							// i.createTime = util.getFormatTime(i.createTime, true)
							i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
							if (i.settingInfo.pushEffectFlag == 0 && i.settingInfo.offerRewardFlag == 0 &&
								i.settingInfo
								.shareRewardFlag == 0 && i.settingInfo.readRewardFlag == 0) {
								i.settingInfo.msg = '本文为普通文章'
							}
							if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.offerRewardFlag == 0 &&
								i.settingInfo
								.shareRewardFlag == 0 && i.settingInfo.readRewardFlag == 0
							) {
								i.settingInfo.msg = '本文为推销奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag == 0 &&
								i.settingInfo
								.shareRewardFlag == 0 && i.settingInfo.readRewardFlag == 0) {
								i.settingInfo.msg = '本文为悬赏奖励文章'
							}
							if (i.settingInfo.shareRewardFlag == 1 && i.settingInfo.pushEffectFlag == 0 &&
								i.settingInfo
								.offerRewardFlag == 0 && i.settingInfo.readRewardFlag == 0) {
								i.settingInfo.msg = '本文为分享奖励文章'
							}
							if (i.settingInfo.readRewardFlag == 1 && i.settingInfo.pushEffectFlag == 0 && i
								.settingInfo
								.offerRewardFlag == 0 && i.settingInfo.shareRewardFlag == 0) {
								i.settingInfo.msg = '本文为阅读奖励文章'
							}
							if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.offerRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.shareRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.shareRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.shareRewardFlag == 1 && i.settingInfo.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.shareRewardFlag == 1 &&
								i.settingInfo
								.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.shareRewardFlag == 1 &&
								i.settingInfo
								.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag == 1 &&
								i.settingInfo
								.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag == 1 &&
								i.settingInfo
								.shareRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag == 1 &&
								i.settingInfo
								.shareRewardFlag == 1 && i.settingInfo.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
						});
						if (v.followpage == 1) {
							v.followList = data.list
						} else {
							v.followList = [...v.followList, ...data.list];
						}
					}

				}).catch(err => {
					this.videoflg = true
				});;
			},
			//关注
			followbtn(item, isDel) {
				let isLogin = wx.getStorageSync("isLogin");
				if (isLogin == false) {
					wx.showToast({
						title: "请先登录",
						icon: "none",
						duration: 1000,
					});
					return
				}
				wx.showLoading({
					mask: true
				});
				WXAJAX.POST({
						isDel: isDel,
						cardId: item.createUserId,
						// attentionId: null,
					},
					"",
					"/newAttention/add", "", "", 1, "1"
				).then(data => {
					console.log(data);
					wx.hideLoading();
					if (item.isAttention == false) {
						this.followmap()
						console.log(data)
						for (var i in this.video_lists) {
							if (this.video_lists[i].userId == item.userId) {
								this.video_lists[i].isAttention = true;
							}
						}
						wx.showToast({
							title: "关注成功",
							duration: 1000,
							mask: true
						});
					} else {
						this.followList = []
						this.followmap()
						for (var i in this.video_lists) {
							if (this.video_lists[i].userId == item.userId) {
								this.video_lists[i].isAttention = false;
							}
						}
						wx.showToast({
							title: "取消关注",
							icon: "none",
							duration: 1000,
							mask: true
						});
					}
				});
			},
			choose(id, name) {
				if (id == 1) {
					let type = 'add'
					wx.navigateTo({
						url: '/pages/buyVideo/editVideo/main?type=' + type
					});
				}
				if (id == 2) {
					uni.navigateTo({
						url: '/pages/article/editArticle/main'
					})
				}
				if (id == 3) {
					uni.navigateTo({
						url: '/pages/companyPack/dynamicIssue/main?type=dynamic'
					})
				}
				this.chooseTypeShow = false;
			},
			wenzhanglabe() {
				let data = {
					labelType: 3,
				}
				WXAJAX.POST(data, '', '/sys/label/queryList', '', '', 1, "1").then(data => {
					if (data) {
						this.wzlabel = data
						this.labeltitel = data[0].labelTitle
						this.getinterest()
						console.log('文章标签', this.wzlabel)
					}
				})
			},

			closeShare() {
				this.share = false;
				this.dynamicId = '';
				this.companyId = '';
				this.title = '';
				this.photos = '';
			},
			toRelease() {
				this.chooseTypeShow = true
				// if (this.tabType == 2) {
				// 	let type = 'add'
				// 	wx.navigateTo({
				// 		url: '/pages/buyVideo/editVideo/main?type=' + type
				// 	});
				// }

				// if (this.tabType == 3) {
				// 	uni.navigateTo({
				// 		url: '/pages/article/editArticle/main'
				// 	})
				// }
				// if (this.tabType == 4) {
				// 	uni.navigateTo({
				// 		url: '/pages/companyPack/dynamicIssue/main?type=dynamic'
				// 	})
				// }
			},
			//视频详情跳转
			toviedoinfo(info, index) {
				console.log(info)
				var videoContext = wx.createVideoContext("myVideo" + index, this);
				videoContext.pause();
				let id = info.shortVideoId
				let dynamicId = info.dynamicId
				let companyId = info.companyId
				let cardId = info.cardId
				wx.navigateTo({
					url: `../companyPack/videodetails/videodetails?videoId=${id}&companyId=${companyId}&cardId=${cardId}`
				});
			},
			//轮播图跳转
			redirectTo(link, id) {
				console.log(link, id)
				util.redirectTo(link, {
					tabType: id
				});
			},
			getinterest(label) {
				let v = this
				WXAJAX.POST({
						pageNum: this.page,
						pageSize: 3,
						// isPublic:1,
						// isShow: 1,
						// isDrafts: 0,
						// verify: 1,
						type: 1, //-1全部
						labelContent: this.labeltitel,
					},
					"",
					"/dynamic/listDynamic", "", "", 1, "1"
				).then((data, code) => {
					// console.log('精选文章文章文章', data)
					if (data.list) {
						data.list.forEach(function(i, k) {
							i.photos = i.photos ? i.photos.split(",") : [];
							i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
							if (i.settingInfo.pushEffectFlag == 0 && i.settingInfo.offerRewardFlag == 0 &&
								i.settingInfo
								.shareRewardFlag == 0 && i.settingInfo.readRewardFlag == 0) {
								i.settingInfo.msg = '本文为普通文章'
							}
							if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.offerRewardFlag == 0 &&
								i.settingInfo
								.shareRewardFlag == 0 && i.settingInfo.readRewardFlag == 0
							) {
								i.settingInfo.msg = '本文为推销奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag == 0 &&
								i.settingInfo
								.shareRewardFlag == 0 && i.settingInfo.readRewardFlag == 0) {
								i.settingInfo.msg = '本文为悬赏奖励文章'
							}
							if (i.settingInfo.shareRewardFlag == 1 && i.settingInfo.pushEffectFlag == 0 &&
								i.settingInfo
								.offerRewardFlag == 0 && i.settingInfo.readRewardFlag == 0) {
								i.settingInfo.msg = '本文为分享奖励文章'
							}
							if (i.settingInfo.readRewardFlag == 1 && i.settingInfo.pushEffectFlag == 0 && i
								.settingInfo
								.offerRewardFlag == 0 && i.settingInfo.shareRewardFlag == 0) {
								i.settingInfo.msg = '本文为阅读奖励文章'
							}
							if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.offerRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.shareRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.shareRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.shareRewardFlag == 1 && i.settingInfo.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.shareRewardFlag == 1 &&
								i.settingInfo
								.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.shareRewardFlag == 1 &&
								i.settingInfo
								.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag == 1 &&
								i.settingInfo
								.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag == 1 &&
								i.settingInfo
								.shareRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
							if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag == 1 &&
								i.settingInfo
								.shareRewardFlag == 1 && i.settingInfo.readRewardFlag == 1) {
								i.settingInfo.msg = '本文为多种奖励文章'
							}
						});
						// <text v-if="item.settingInfo.pushEffectFlag == 1 ">本文为推销奖励文章</text>
						// <text v-if="item.settingInfo.offerRewardFlag == 1">本文为悬赏奖励文章</text>
						// <text v-if="item.settingInfo.shareRewardFlag == 1">本文为分享奖励文章</text>
						// <text v-if="item.settingInfo.readRewardFlag == 1">本文为阅读奖励文章</text>

						v.tinterest = data.list;
						v.tinterest_lastPage = data.lastPage
					}
				}).catch(err => {});
			},
			tab_type_tap(type) {

				this.tabType = type
				if (type == 2) {
					this.videolist()
				}
				if (type == 3) {
					this.followpage = 1
					this.followmap()
				}
			},
			jxtap(type) {
				this.labeltitel = this.wzlabel[type].labelTitle
				this.jxtabType = type
				this.page = 1,
					this.getinterest()
			},
			huandynamic() {
				if (this.page < this.tinterest_lastPage) {
					this.page += 1
				} else {
					this.page = 1
				}
				this.getinterest()
			},
			//视频
			videolist() {
				if (this.isLogin == true) {
					let v = this
					WXAJAX.POST({
							pageNum: v.videopages,
							pageSize: 15,
							// isPublic:1,
							isShow: 1,
							isDrafts: 0,
							isDel: 0,
							isDiscover: 1,
							// isPublic:1,
							// verify: 1,
							// type: 6,
						},
						"",
						"/dynamic/listDynamic", "", "", 1, "1"
					).then((data, code) => {
						if (data.list) {
							data.list.forEach(function(i, k) {
								if (i.type == 4) {
									i.format = i.title.split('.')[1]
									if (i.format == "docx") {
										i.dynamicUrl =
											"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/word.png"
									} else if (i.format == "pdf") {
										i.dynamicUrl =
											"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-file.png"
									} else if (i.format == "xlsx") {
										i.dynamicUrl =
											"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/excel.png"
									} else if (i.format == "txt") {
										i.dynamicUrl =
											"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-124-document-file-zip@3x.png"
									} else if (i.format == "zip") {
										i.dynamicUrl =
											"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-124-document-file-zip@3x.png"
									}
								} else {
									i.photos = i.photos ? i.photos.split(",") : [];
								}
								// i.createTime = util.getdate(i.createTime, "dateTime");
								// i.createTime = v.getDateConversion(i.createTime)
								// i.createTime = util.getFormatTime(i.createTime, true)
								i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
								if (i.settingInfo.pushEffectFlag == 0 && i.settingInfo.offerRewardFlag ==
									0 && i.settingInfo
									.shareRewardFlag == 0 && i.settingInfo.readRewardFlag == 0) {
									i.settingInfo.msg = '本文为普通文章'
								}
								if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.offerRewardFlag ==
									0 && i.settingInfo
									.shareRewardFlag == 0 && i.settingInfo.readRewardFlag == 0
								) {
									i.settingInfo.msg = '本文为推销奖励文章'
								}
								if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag ==
									0 && i.settingInfo
									.shareRewardFlag == 0 && i.settingInfo.readRewardFlag == 0) {
									i.settingInfo.msg = '本文为悬赏奖励文章'
								}
								if (i.settingInfo.shareRewardFlag == 1 && i.settingInfo.pushEffectFlag ==
									0 && i.settingInfo
									.offerRewardFlag == 0 && i.settingInfo.readRewardFlag == 0) {
									i.settingInfo.msg = '本文为分享奖励文章'
								}
								if (i.settingInfo.readRewardFlag == 1 && i.settingInfo.pushEffectFlag ==
									0 && i.settingInfo
									.offerRewardFlag == 0 && i.settingInfo.shareRewardFlag == 0) {
									i.settingInfo.msg = '本文为阅读奖励文章'
								}
								if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.offerRewardFlag ==
									1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}
								if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.shareRewardFlag ==
									1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}
								if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.readRewardFlag ==
									1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}
								if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.shareRewardFlag ==
									1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}
								if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.readRewardFlag ==
									1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}
								if (i.settingInfo.shareRewardFlag == 1 && i.settingInfo.readRewardFlag ==
									1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}
								if (i.settingInfo.pushEffectFlag == 1 && i.settingInfo.shareRewardFlag ==
									1 && i.settingInfo
									.readRewardFlag == 1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}
								if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.shareRewardFlag ==
									1 && i.settingInfo
									.readRewardFlag == 1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}
								if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag ==
									1 && i.settingInfo
									.readRewardFlag == 1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}
								if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag ==
									1 && i.settingInfo
									.shareRewardFlag == 1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}
								if (i.settingInfo.offerRewardFlag == 1 && i.settingInfo.pushEffectFlag ==
									1 && i.settingInfo
									.shareRewardFlag == 1 && i.settingInfo.readRewardFlag == 1) {
									i.settingInfo.msg = '本文为多种奖励文章'
								}


							});
							if (v.videopages == 1) {
								v.video_lists = data.list
							} else {
								v.video_lists = [...v.video_lists, ...data.list];
							}

							console.log('啦啦啦啦啦啦啦啊啦啦啦啦啦啦', v.video_lists)
							this.init()
						} else {}
					}).catch(err => {
						this.videoflg = true
					});
				} else {
					let v = this
					WXAJAX.POST({
							pageNum: v.videopages,
							pageSize: 15,
							// isPublic:1,
							isShow: 1,
							isDrafts: 0,
							isDel: 0,
							isDiscover: 1,
							// isPublic:1,
							// verify: 1,
							// type: 6,
						},
						"",
						"/dynamic/noLoginlistDynamic", "", "", 1, "1"
					).then((data, code) => {
						if (data.list) {
							data.list.forEach(function(i, k) {
								i.photos = i.photos ? i.photos.split(",") : [];
								// i.createTime = util.getdate(i.createTime, "dateTime");
								// i.createTime = v.getDateConversion(i.createTime)
								// i.createTime = util.getFormatTime(i.createTime, true)
								i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
							});

							console.log(v.videopages)
							if (v.videopages == 1) {
								v.video_lists = data.list
							} else {
								v.video_lists = [...v.video_lists, ...data.list];
							}

							console.log('video_lists啦啦啦啦啦啦啦啦啊啦啦啦啦啦啦', v.video_lists)
							this.init()
						} else {}
					}).catch(err => {
						this.videoflg = true
					});
				}
			},
			init() {
				for (var i = 0; i < this.video_lists.length; i++) {
					const video = uni.createVideoContext("myVideo" + i, this);
					this.videoContextList.push(video);
				}
			},
			//视频暂停
			playVideo(e) {
				var that = this;
				var id = e.currentTarget.id;
				for (var i = 0; i < that.video_lists.length; i++) {
					if (id === 'myVideo' + i) {
						//console.log('播放视频不做处理');
					} else {
						//console.log('暂停其他正在播放的视频');
						var videoContext = wx.createVideoContext("myVideo" + i, that);
						videoContext.pause();
					}
				}
				// 	this.videoContextList[index].pause();
			},
			//文章
			article() {
				let v = this
				//文章
				WXAJAX.POST({
						pageNum: v.articlepages,
						pageSize: 5,
						// isPublic:1,
						isShow: 1,
						isDrafts: 0,
						// verify: 1,
						type: 1, //-1全部
					},
					"",
					"/dynamic/listDynamic", "", "", 1, "1"
				).then((data, code) => {
					if (data.list) {
						data.list.forEach(function(i, k) {
							i.photos = i.photos ? i.photos.split(",") : [];
							// i.createTime = util.getdate(i.createTime, "dateTime");
							// i.createTime = v.getDateConversion(i.createTime)
							// i.createTime = util.getFormatTime(i.createTime, true)
							i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
						});
						console.log('文章动态数据', data)
						v.article_lists = [...v.article_lists, ...data.list];
					} else {}
				}).catch(err => {
					this.articleflag = true
				});
			},
			//动态
			dynamic() {
				let v = this
				//动态
				WXAJAX.POST({
						pageNum: v.dynamicpages,
						pageSize: 5,
						// isPublic:1,
						isShow: 1,
						isDrafts: 0,
						// verify: 1,
						type: 2,
						// cardId: this.currentCompany.cardId || v.CARDID || 0
					},
					"",
					"/dynamic/listDynamic", "", "", 1, "1"
				).then((data, code) => {
					if (data.list) {
						data.list.forEach(function(i, k) {
							i.photos = i.photos ? i.photos.split(",") : [];
							// i.createTime = util.getdate(i.createTime, "dateTime");
							// i.createTime = v.getDateConversion(i.createTime)
							// i.createTime = util.getFormatTime(i.createTime, true)
							// i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
						});

						v.dontai_lists = [...v.dontai_lists, ...data.list];
						console.log('dontai_lists', v.dontai_lists)
					}
				}).catch(err => {
					this.dynamicflg = true
				});
			},
			gocommmend() {
				if (this.referencepages < this.reference_lastPage) {
					this.referencepages += 1
				} else {
					this.referencepages = 1
				}
				this.getCompanyAllInfo(this.listid)

			},
			//为您推荐
			getCompanyAllInfo(con, conle) {
				this.listid = con
				if (conle != undefined) {
					this.referencepages = conle
				}
				if (this.listid == 0) {
					let v = this
					WXAJAX.POST({
						// companyName: '',
						pageNum: v.referencepages,
						pageSize: 3,
					}, '', '/personal/querPageCompanyAllInfo', "", "", 2).then((data) => {
						if (data.list) {
							v.companylists = data.list
							v.reference_lastPage = data.lastPage
							// v.companylists = [...v.companylists, ...data.list];
						}
					}).catch((err) => {

					})
					// v.listid = 0
				}
				if (this.listid == 1) {
					let v = this
					WXAJAX.POST({
						// companyName: '',
						pageNum: v.referencepages,
						pageSize: 2,
					}, '', '/goods/getGoodsList/demand', "", "", 2).then((data) => {
						if (data) {
							v.productlist = data;
							v.reference_lastPage = data.lastPage
							data.forEach(function(i, k) {
								i.price = i.price / 100;
							});
							// v.companylists = [...v.companylists, ...data];
						}
					}).catch((err) => {

					})
					// v.listid = 1
				}
				if (this.listid == 2) {
					let v = this
					WXAJAX.POST({
						// companyName: '',
						pageNum: v.referencepages,
						pageSize: 3,
					}, '', '/demandSquare/queryPageUserDemand', "", "", 2).then((data) => {
						if (data) {
							v.supplylist = data.pageInfo.list;
							v.reference_lastPage = data.pageInfo.lastPage
							v.supplylist.forEach(function(i, k) {
								i.image = JSON.parse(i.images);
							});
							// console.log( v.supplylist,'ftydydtudyrudyiydi')
							// v.supplylist = [...v.supplylist, ...data.pageInfo.list];
						}
					}).catch((err) => {

					})
					// v.listid = 2
				}
				if (this.listid == 3) {
					let v = this
					WXAJAX.POST({
						// companyName: '',
						pageNum: v.referencepages,
						pageSize: 3,
					}, '', '/recruit/queryPage', "", "", 1).then((data) => {
						if (data) {
							v.recruitlist = data.list;
							v.reference_lastPage = data.lastPage
							data.list.forEach(function(i, k) {
								i.maxSalary = (i.maxSalary / 1000 / 100) + 'k';
								i.minSalary = (i.minSalary / 1000 / 100) + 'k';
							});
							// v.recruitlist = [...v.recruitlist, ...data];
						}
					}).catch((err) => {

					})
				}
			},
			toWebsite(item) {
				// let url = '../companyPack/find/WebSite/main?companyId=' + item.companyId;
				// wx.navigateTo({
				// 	url: url
				// })
				let companyId = item.companyId
				let cardId = item.cardId
				util.toMiniProgram(`/pages/index/main?companyId=${companyId}&cardId=${cardId}&goType=1`);
			},

			//点赞
			zan1(index, isThumbs, dynamicId, item, text) {
				console.log('点赞', index, isThumbs, dynamicId, item, text)
				let v = this;
				if (this.tabType == 2) {
					var dynamic_lists = v.video_lists[index]
				}
				if (this.tabType == 3) {
					var dynamic_lists = v.article_lists[index]
				}
				if (this.tabType == 4) {
					var dynamic_lists = v.dontai_lists[index]
				}
				if (text == '彩泥喜欢') {
					var dynamic_lists = v.tinterest[index]
				}

				authSubscribeMessage(this.subscriptionNew);
				let isLogin = HandleLogin.returnIsLogin();
				if (!isLogin) {
					uni.showToast({
						title: "请先登录,才可以点赞喔",
						icon: "none"
					});
					return;
				}
				wx.showLoading();
				WXAJAX.POST({
							dynamicId: dynamicId,
							cardId: wx.getStorageSync("cardId")
						},
						"",
						"/personal/doDynamicThumbs", "", "", 2, "1"
					)
					.then(data => {
						wx.hideLoading();
						if (data) {
							//点赞
							// dynamic_lists.doThumbsName.push(data);
							// item[index].doThumbsName.push(data); //添加人名
							v.$set(dynamic_lists, "isThumbs", 1);
							v.$set(
								dynamic_lists,
								"doThumbsNum",
								dynamic_lists.likeNum += 1
							);
						} else {
							// dynamic_lists.doThumbsName.pop();
							v.$set(dynamic_lists, "isThumbs", 0);
							v.$set(
								dynamic_lists,
								"doThumbsNum",
								dynamic_lists.likeNum -= 1
							);
						}
						let status = !dynamic_lists.operate_show;
						v.$set(dynamic_lists, "operate_show", status);

					})
					.catch(err => {
						console.log(err);
						wx.hideLoading();
					});
			},
			//评论
			addCommentA(index, replayComment = {}) {
				let v = this;
				if (this.tabType == 2) {
					var dynamic_lists = v.video_lists[index]
				}
				if (this.tabType == 3) {
					var dynamic_lists = v.article_lists[index]
				}
				if (this.tabType == 4) {
					var dynamic_lists = v.dontai_lists[index]
				}
				let isLogin = HandleLogin.returnIsLogin();
				if (!isLogin) {
					uni.showToast({
						title: "请先登录,才可以评论喔",
						icon: "none"
					});
					return;
				}
				if (
					(replayComment.userName && !replayComment.commentId) ||
					(replayComment.commentId &&
						replayComment.userId == wx.getStorageSync("userId"))
				) {
					return;
				}

				v.input_show = true;
				v.replayComment = replayComment;
				// this.comment_focus = true ;
				v.add_comments_index = index;
				setTimeout(function() {
					v.$set(dynamic_lists, "operate_show", false);
					v.comment_focus = true;
				}, 200);
			},
			toformat(item) { //查看文件详情
				console.log(item)
				// ?dynamicId=' + dynamicId + '&companyId=' + companyId +
				// '&cardId=' + cardId;
				let url = '/pages/companyPack/library/details?dynamicId=' + item.dynamicId
				wx.navigateTo({
					url: url
				})
			},
			toDetail(item) { //查看文章详情
				const companyId = item.companyId;
				const cardId = item.createUserId
				const dynamicId = item.dynamicId
				let url = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + dynamicId + '&companyId=' + companyId +
					'&cardId=' + cardId;
				wx.navigateTo({
					url: url
				})
			},
			//跳转动态详情
			addComment(item, index) {
				var videoContext = wx.createVideoContext("myVideo" + index, this);
				videoContext.pause();
				let url = '/pages/companyPack/commentDetail/main?dynamicId=' + item.dynamicId + '&companyId=' + item
					.companyId +
					'&cardId=' + item.userId;
				wx.navigateTo({
					url: url
				})
			},
			// 商品详情跳转
			toProdDetail(item) {
				wx.navigateTo({
					url: "/pages/companyPack/prodDetail/index?goodId=" + item.goodsId + '&companyId=' + item
						.companyId +
						'&type=' + 'demand'
				});
			},
			// 供求详情页面跳转
			demand_detall(squareId, companyId) {
				wx.navigateTo({
					url: `/pages/companyPack/find/detall/main?companyId=${companyId}&squareId=${squareId}`
				})
			},
			// 招聘详情页面的跳转
			toparticulars(url, query) {
				query = query || '';
				wx.navigateTo({
					url: '/pages/companyPack/' + url + '/main' + query
				});
			},
			//输入完成
			inputConfirm() {
				let v = this;
				if (this.tabType == 2) {
					var dynamic_lists = v.video_lists
				}
				if (this.tabType == 3) {
					var dynamic_lists = v.article_lists
				}
				if (this.tabType == 4) {
					var dynamic_lists = v.dontai_lists
				}
				this.comment_focus = false;
				authSubscribeMessage(this.subscriptionNew);
				WXAJAX.POST({
						dynamicId: dynamic_lists[v.add_comments_index].dynamicId,
						parentId: this.replayComment.commentId || 0,
						cardId: this.currentCompany.cardId || v.CARDID || 0,
						text: this.comments
					},
					"",
					"/personal/doComment", "", "", 2, "1"
				).then(res => {
					let comments = dynamic_lists[v.add_comments_index];
					comments.commentModelList = comments.commentModelList ?
						comments.commentModelList : [];
					if (
						comments.commentModelList.length < 10 ||
						comments.commentNum > comments.commentModelList.length
					) {
						dynamic_lists[v.add_comments_index].commentModelList.push({
							text: this.comments,
							replyName: this.replayComment.userName || "",
							userName: wx.getStorageSync("USERNAME")
						});
						dynamic_lists[v.add_comments_index].commentNum += 1
					}
					this.input_show = false;
					this.comments = "";
				});

			},
			// 咨询页面
			toservice() {
				wx.navigateTo({
					url: "/pages/companyPack/consulting/consulting"
				});
			},
			// 招聘页面
			tovacancy() {
				wx.navigateTo({
					url: "/pages/companyPack/recruit/recruit"
				});
			},
			// 企业页面
			tobusiness() {
				wx.navigateTo({
					url: "/pages/companyPack/enterprise/enterprise"
				});
			},
			// 彩丽
			topurchase() {
				uni.showToast({
					title: '正在开发中',
					duration: 2000,
					icon: 'none'
				});
			},
			// 去搜索页面
			toferret() {
				wx.navigateTo({
					url: "/pages/companyPack/ferret/ferret"
				});
			},
			previewImage(e, urls) { //点击图片全屏预览
				var current = e.target.dataset.src
				console.log(e, urls)
				wx.previewImage({
					// urls: [urls + '.primary.png'],
					current: current,
					urls: urls
				})
			},

		},
		onPullDownRefresh() {
			if (this.tabType == 2) {
				this.videopages = 1
				this.video_lists = []
				this.videolist()
			}
			if (this.tabType == 3) {
				// this.articlepages = 1
				// this.article_lists = []
				// this.article()
				this.followpage = 1
				this.followList = []
				this.followmap()
			}
			if (this.tabType == 4) {
				this.dynamicpages += 1
				this.dontai_lists = []
				this.dynamic()
			}
		},
		onReachBottom() {
			if (this.tabType == 2) {
				this.videopages += 1
				this.videolist()
			}
			if (this.tabType == 3) {
				// this.articlepages += 1
				// this.article()
				this.followpage += 1
				this.followmap()
			}
			if (this.tabType == 4) {
				this.dynamicpages += 1
				this.dynamic()
			}

		},
		onPageScroll(e) {
			e.scrollTop > 1200 ? this.isfixTab = true : this.isfixTab = false;
			if (this.input_show == true) {
				this.input_show = false
			}
		},
		computed: {
			...mapGetters(["currentCompany", "subscriptionNew"]),
		},
	}
</script>

<style>
	.slider {
		width: 60rpx;
		height: 60rpx;
		margin: 0 auto;
		border-radius: 40rpx;
		/* background-color: rgb(222, 222, 228); */
		display: flex;
		justify-content: center;
	}

	.slider image {
		width: 60rpx;
		height: 60rpx;
		/* margin-left: 22.5rpx; */
		margin-top: 5rpx;
	}

	.app {
		width: 100vw;
		background: #FFFFFF;
		overflow: hidden;
	}

	.content {
		padding: 40rpx 40rpx 8rpx 40rpx;
	}

	.refreshimg {
		margin-top: 2rpx;
		width: 38rpx;
		height: 38rpx;
	}

	.line {
		width: 94%;
		height: 2rpx;
		margin: 0 auto;
		border-bottom: 2rpx #F1F1F1 solid;
	}

	.callinglist {
		width: 95%;
		padding-left: 40rpx;
		padding-top: 44rpx;
	}

	.callinglist .left image {
		width: 108rpx;
		height: 108rpx;
		border-radius: 24rpx;
	}

	.callinglist .right {
		padding: 0 10rpx 10rpx 10rpx;
		margin-left: 10rpx;
	}

	.wenzhang {
		width: 96%;
		/* margin:  auto; */
		box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(175, 175, 175, 100);
		border-radius: 12rpx;
	}

	.poster {
		padding: 20rpx;
	}

	.poster image {
		width: 100%;
		height: 410rpx;

	}

	.screen {
		width: calc(100% -1rpx);
		border: 0px transparent solid;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
	}

	.screenList {
		width: 60%;
		margin: 20rpx 20rpx 20rpx 40rpx;
		display: flex;
	}

	.jxscreenList {
		width: 60%;
		margin: 20rpx 20rpx 20rpx 0rpx;
		display: flex;
	}

	.industry {
		background-color: #EAEAEA;
		padding: 10rpx 20rpx 10rpx 20rpx;
		border-radius: 15rpx;
		color: #807E7E;
		margin-right: 20rpx;
		font-size: 24rpx;
	}


	.active {
		color: #FFF;
		background-color: #51cdcb;
		transition: all .2s;
		padding: 8rpx 18rpx 8rpx 18rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
		font-size: 24rpx;
	}

	.jxindustry {
		background-color: #EAEAEA;
		padding: 8rpx 18rpx 8rpx 18rpx;
		border-radius: 15rpx;
		color: #807E7E;
		margin-right: 20rpx;
		font-size: 24rpx;
	}


	.jxactive {
		color: #FFF;
		background-color: #51cdcb;
		transition: all .2s;
		padding: 8rpx 18rpx 8rpx 18rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
		font-size: 24rpx;
	}

	.rmdcontent {
		width: calc(100% -1rpx);
	}

	.yc {
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 24rpx;
		color: #8F8F8F;
	}

	.contentlist {
		/* margin-top: 10rpx; */
		padding: 20rpx 0rpx 20rpx 0rpx;
	}

	.contentTile {
		display: flex;
	}

	.contentTileleft {
		/*    min-width: 100rpx;
    max-width: 100rpx; */
		width: 108rpx;
		height: 108rpx;
	}

	.contentTileleft image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.contentTileright {
		margin-left: 14rpx;
		/* margin-top: 30rpx; */
	}

	.contentTileright text {
		padding-bottom: 20rpx;
		display: block;
	}

	.contentinfo {
		width: 100%;
		height: 100%;

	}

	.contentinfoTitle {
		margin-top: 20rpx;

	}

	.video {
		width: 100%;
		height: 352rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.video video {
		width: 100%;
		height: 100%;
	}

	/* 一张图的样式 */
	.chart1 {
		width: 100%;
	}

	.chart .image {
		display: flex;
		flex-flow: wrap;
	}

	.chart1 image {
		width: 100%;
		margin: 6rpx auto;
		height: 576rpx;
	}

	/* 四张图的样式 */
	.chart {
		width: 100%;
	}

	.chart .image {
		display: flex;
		flex-flow: wrap;
	}

	.chart .image image {
		box-sizing: border-box;
		min-width: calc(50% - 12rpx);
		max-width: calc(50% - 12rpx);
		height: 288rpx;
		margin: 6rpx;
	}

	.chart4 {
		width: 100%;
	}

	.chart4 .image {
		display: flex;
		flex-flow: wrap;
	}

	.chart4 .image image {
		box-sizing: border-box;
		min-width: calc(33% - 12rpx);
		max-width: calc(33% - 12rpx);
		height: 188rpx;
		margin: 6rpx;
	}

	.operation {
		padding-bottom: 20rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.operation text {
		font-size: 48rpx;
		padding-bottom: 20rpx;
	}

	.textbg {
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
		background-color: #C2F4F1;
		font-weight: bold;
		text-align: center;
		margin-left: 10rpx;
		line-height: 30rpx;
	}

	.release {
		margin-top: 20rpx;
		margin-right: 30rpx;
		width: 110rpx;
		font-size: 24rpx;
	}

	.activee {
		color: #FFF;
		background-color: #51cdcb;
		transition: all .2s;
		padding: 10rpx 0rpx 10rpx 0rpx;
		border-radius: 15rpx;
	}

	.fixedNavbar {
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
	}

	.ccyc {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.gzbtn {
		min-width: 120rpx;
		text-align: center;
		height: 60rpx;
		position: absolute;
		right: 30rpx;
		top: 40rpx;
		border-radius: 54rpx;
		background-color: #CAF4E8;
	}

	.gbbbn {
		min-width: 120rpx;
		text-align: center;
		height: 60rpx;
		border-radius: 18rpx;
		background-color: #C2F4F1;
	}

	.shugun {
		width: 6rpx;
		height: 30rpx;
		background-color: #F1F1F1;
		line-height: 110rpx;
		margin-top: 65rpx;
	}

	.recommend {
		background-color: #FFFFFF;
		display: flex;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}

	.supply {
		width: 82rpx;
		height: 48rpx;
		background-color: #03D3C5;
		margin-right: 22rpx;
		text-align: center;
		line-height: 48rpx;
		margin-top: 20rpx;
		border-radius: 12rpx;
		color: #FFFFFF;
		font-size: 24rpx;
	}

	.nosupply {
		width: 82rpx;
		height: 48rpx;
		background-color: #EFEFEF;
		margin-right: 22rpx;
		text-align: center;
		line-height: 48rpx;
		margin-top: 20rpx;
		border-radius: 12rpx;
		color: #8B8B8B;
		font-size: 24rpx;
	}

	.product_list {
		display: flex;
		flex-direction: column;
		/* border: 4rpx solid #000000;
     */
		box-shadow: 0rpx 0rpx 10rpx #8D8D8D;
		/* margin-right:14rpx; */
	}

	.fabriclist {
		background-color: #FFFFFF;
		display: flex;
		padding-right: 40rpx;
		padding-left: 40rpx;
		padding-top: 40rpx;
		justify-content: space-between;
	}

	.vacancy {
		display: flex;
		/* flex-direction: column; */
		box-shadow: 0rpx 0rpx 10rpx #8D8D8D;
		justify-content: space-between;
		margin-bottom: 40rpx;
		border-radius: 12rpx;
	}

	.public {
		/* width: 100%; */
		display: flex;
		flex-direction: column;
		padding-right: 40rpx;
		padding-left: 40rpx;
		padding-top: 40rpx;
	}

	.supply_list {
		display: flex;
		flex-direction: column;
		padding-right: 40rpx;
		padding-left: 40rpx;
		padding-top: 40rpx;
	}

	.remarks {
		font-size: 24rpx;
		color: #767676;
		width: 400rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.addreseee {
		font-size: 24rpx;
		color: #767676;
		width: 200rpx;
		margin-top: 14rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ferret {
		width: 674rpx;
		height: 70rpx;
		border-radius: 36rpx;
		border: 2rpx solid #000000;
		margin-left: 40rpx;
		margin-right: 40rpx;
		display: flex;
		align-items: center;
		margin-top: 30rpx;
		margin-bottom: 40rpx;
	}

	.ferret image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 20rpx;
	}

	.keyword {
		font-size: 28rpx;
		margin-left: 194rpx;
	}
</style>
