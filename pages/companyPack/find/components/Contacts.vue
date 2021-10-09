<template>
	<div class="overhidden borderbox posab w100p ">
		<!-- 搜索 -->
		<view class="fix_topp">
			<view class="navsearch borderbox">
				<div class="bgfff pl15 pb10 pr15 disflex">
					<div class="bgF4Ff bradius15 flex1 textc lh34 disflex align-cen pl25 search trans2 pr25 mt10"
						>
						<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/search.png"
							style="flex: 0 0 32upx" alt="" class="w16 h16" />
						<input type="text" v-model="searchkey" placeholder="搜索人脉" placeholder-style="color:#1EC4B9"
							class="ca4 fs14 lh42 h42 textl pl10 trans2 w100p" @input="search_rm" :focus="isfocus" @blur="isfocus=false"
							>
					</div>
				</div>
				<view class="navright" @click="toContacts">
					<view class="add">
						<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/renmaifabu.png"
							mode=""></image>
					</view>
					<view class="text">发布人脉</view>
				</view>
			</view>

			<view class="screen disflex jsbet">
				<scroll-view scroll-x="true" style=" white-space: nowrap;width: 80%;height: 100rpx;">
					<view class="screenList">
						<view :class="mptabType == -1 ? 'active' : 'industry'" @click="tab_type_tap(-1)">
							全部
						</view>
						<view v-for="(item,index) in busCardlabelList" :key="index"
							:class="item.flg ? 'active' : 'industry'" @click="tab_type_tap(index,item)">
							{{item.labelContent}}
						</view>
						<!-- <view :class="tabType == 3 ? 'active' : 'industry'" @click="tab_type_tap(3)">
								 		新能源
								 	</view>
								 	<view :class="tabType == 4 ? 'active' : 'industry'" @click="tab_type_tap(4)">
								 		新能源
								  	</view> -->
						<!-- <view class="screenbtn">
								 		<text class="iconfont icon-selectall"></text>筛选
								 	</view> -->

					</view>

				</scroll-view>
				<view class="active screenList" @click="toscreen">
					筛选
				</view>
			</view>
		</view>
		<view class="" style="height: 230rpx;" />

		<div class="index bgf5f6 h100p" v-if="popularity.length > 0">
			<div v-for="(item,index) in popularity" :key="index" @click="tobusiness(item)">
				<div v-if="item.style == 0">
					<Card_1 :card_msg="item"></Card_1>
					<view>
						<div class="card_menu fs12 ca8 bgfff borderbox pl10 mt-18">
							<div class="clearfix pt5 pb5 disflex operation-box">
								<div class="shadow_gray h65 ml10 business_card" @click="createCode(index)">
									<img :src="cardCodeImg" alt="" class="w65 h65">
								</div>
								<scroll-view scroll-x scroll-with-animation>
									<div class="disflex scroll-list">
										<!-- <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="toRoute('showBill', '?cardId='+item.cardId)">
											<p class="pb7">
												名片海报
											</p>
											<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wx_timeline.png"
												alt=" " class="w20 h20" />

										</div> -->
										<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10"
											@click="addToAddressBook(index)">
											<p class="pb7">同步到</p>
											<p>通讯录</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="makePhone(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/tel_2.png"
													alt="" class="w16 h16" />
												<span class="pl9">拨打电话</span>
											</p>
											<p class="c78 fbold pt7">{{item.phone || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10" @click="addWx(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/im_msg.png"
													alt="" class="w16 h16" />
												<span class="pl9">添加微信</span>
											</p>
											<p class="c78 fbold pt7">{{item.personalWx || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="goToMap(item.address)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190425164542.png"
													alt="" class="w16 h16" />
												<span class="pl9">公司地址</span>
											</p>
											<p class="c78 fbold pt7">{{item.address || '未填写'}}</p>
										</div>
									</div>
								</scroll-view>
							</div>
							<div class="more-info mr10">
								<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190514143457.png"
									alt="" class="left-img ">
							</div>
						</div>
						<div class="seen_peo disflex pl15 pr26 fs10 pb20 ca8 jsbet bgfff">
							<div class="disflex">
								<!-- 浏览量三个头像小泉 -->
								<image style="width:110rpx;padding-top:33rpx;" @click="goSeeMe" mode="widthFix"
									src="/static/quanqiu.svg">
								</image>
								<div class="ml21 newNub" style="margin-left:10rpx !important;margin-top:10rpx;">
									<p class="newl-added" v-if="dayBrowseNum">今日+{{dayBrowseNum}}</p>
									<p class="lh20 fs14 fbold c38"
										style="padding-top: 50rpx;position: relative;left:-6rpx;">
										{{item.browseNum ? item.browseNum : 0}}
									</p>
									<p class="fs12 ca8" style="padding-top:10rpx;position: relative;left:-6rpx;">浏览量</p>
								</div>
							</div>
							<div class="disflex fs18 lh44 textc jsbet bgfff user-btn-group">
								<div class="disflex forward align-cen mb12 jsbet" style="padding: 0rpx;">
									<div>
										<button style="padding:0 4rpx;" @click="shareisshow"
											hover-class="other-button-hover" open-type="share"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="weixinIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">转发名片</p>
										</button>
									</div>
									<div v-if="isLogin  && item.isBind == flase">
										<button style="padding:0 4rpx;" @click.stop="chooseClass(index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="saveIcon2" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">保存名片</p>
										</button>
									</div>
									<div v-else-if="isLogin && item.isBind == true">
										<button style="padding:0 20rpx;" hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column" >
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="lockIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1">已被独占</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="doThumbs(item,index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="popularity[index].isThumbs ? isLikeIcon: likeIcon"
													class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">靠谱<span
													class="cblue">{{popularity[index].thumbsNum || thumbsNum}}</span>
											</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="talk_tag(item.cardId)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="talkImg" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">聊一聊</p>
										</button>
									</div>
								</div>
							</div>

						</div>
					</view>

				</div>

				<div v-if="item.style == 1">
					<Card_2 :card_msg="item" @uploadpic="uploadpic"></Card_2>
					<view>
						<div class="card_menu fs12 ca8 bgfff borderbox pl10 mt-18">
							<div class="clearfix pt5 pb5 disflex operation-box">
								<div class="shadow_gray h65 ml10 business_card" @click="createCode(index)">
									<img :src="cardCodeImg" alt="" class="w65 h65">
								</div>
								<scroll-view scroll-x scroll-with-animation>
									<div class="disflex scroll-list">
										<!-- <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="toRoute('showBill', '?cardId='+item.cardId)">
											<p class="pb7">
												名片海报
											</p>
											<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wx_timeline.png"
												alt=" " class="w20 h20" />

										</div> -->
										<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10"
											@click="addToAddressBook(index)">
											<p class="pb7">同步到</p>
											<p>通讯录</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="makePhone(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/tel_2.png"
													alt="" class="w16 h16" />
												<span class="pl9">拨打电话</span>
											</p>
											<p class="c78 fbold pt7">{{item.phone || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10" @click="addWx(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/im_msg.png"
													alt="" class="w16 h16" />
												<span class="pl9">添加微信</span>
											</p>
											<p class="c78 fbold pt7">{{item.personalWx || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="goToMap(item.address)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190425164542.png"
													alt="" class="w16 h16" />
												<span class="pl9">公司地址</span>
											</p>
											<p class="c78 fbold pt7">{{item.address || '未填写'}}</p>
										</div>
									</div>
								</scroll-view>
							</div>
							<div class="more-info mr10">
								<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190514143457.png"
									alt="" class="left-img ">
							</div>
						</div>
						<div class="seen_peo disflex pl15 pr26 fs10 pb20 ca8 jsbet bgfff">
							<div class="disflex">
								<!-- 浏览量三个头像小泉 -->
								<image style="width:110rpx;padding-top:33rpx;" @click="goSeeMe" mode="widthFix"
									src="/static/quanqiu.svg">
								</image>
								<div class="ml21 newNub" style="margin-left:10rpx !important;margin-top:10rpx;">
									<p class="newl-added" v-if="dayBrowseNum">今日+{{dayBrowseNum}}</p>
									<p class="lh20 fs14 fbold c38"
										style="padding-top: 50rpx;position: relative;left:-6rpx;">
										{{item.browseNum ? item.browseNum : 0}}
									</p>
									<p class="fs12 ca8" style="padding-top:10rpx;position: relative;left:-6rpx;">浏览量</p>
								</div>
							</div>
							<div class="disflex fs18 lh44 textc jsbet bgfff user-btn-group">
								<div class="disflex forward align-cen mb12 jsbet" style="padding: 0rpx;">
									<div>
										<button style="padding:0 4rpx;" @click="shareisshow"
											hover-class="other-button-hover" open-type="share"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="weixinIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">转发名片</p>
										</button>
									</div>
									<div v-if="isLogin  && !item.isBind">
										<button style="padding:0 4rpx;" @click.stop="chooseClass(index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="saveIcon2" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">保存名片</p>
										</button>
									</div>
									<div v-else-if="isLogin && item.isBind == true">
										<button style="padding:0 20rpx;" hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column" >
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="lockIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1">已被独占</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="doThumbs(item,index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="popularity[index].isThumbs ? isLikeIcon: likeIcon"
													class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">靠谱<span
													class="cblue">{{popularity[index].thumbsNum || thumbsNum}}</span>
											</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="talk_tag(item.cardId)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="talkImg" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">聊一聊</p>
										</button>
									</div>
								</div>
							</div>

						</div>
					</view>
				</div>

				<div v-if="item.style == 2">
					<Card_3 :card_msg="item"></Card_3>
					<view>
						<div class="card_menu fs12 ca8 bgfff borderbox pl10 mt-18">
							<div class="clearfix pt5 pb5 disflex operation-box">
								<div class="shadow_gray h65 ml10 business_card" @click="createCode(index)">
									<img :src="cardCodeImg" alt="" class="w65 h65">
								</div>
								<scroll-view scroll-x scroll-with-animation>
									<div class="disflex scroll-list">
										<!-- <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="toRoute('showBill', '?cardId='+item.cardId)">
											<p class="pb7">
												名片海报
											</p>
											<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wx_timeline.png"
												alt=" " class="w20 h20" />

										</div> -->
										<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10"
											@click="addToAddressBook(index)">
											<p class="pb7">同步到</p>
											<p>通讯录</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="makePhone(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/tel_2.png"
													alt="" class="w16 h16" />
												<span class="pl9">拨打电话</span>
											</p>
											<p class="c78 fbold pt7">{{item.phone || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10" @click="addWx(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/im_msg.png"
													alt="" class="w16 h16" />
												<span class="pl9">添加微信</span>
											</p>
											<p class="c78 fbold pt7">{{item.personalWx || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="goToMap(item.address)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190425164542.png"
													alt="" class="w16 h16" />
												<span class="pl9">公司地址</span>
											</p>
											<p class="c78 fbold pt7">{{item.address || '未填写'}}</p>
										</div>
									</div>
								</scroll-view>
							</div>
							<div class="more-info mr10">
								<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190514143457.png"
									alt="" class="left-img ">
							</div>
						</div>
						<div class="seen_peo disflex pl15 pr26 fs10 pb20 ca8 jsbet bgfff">
							<div class="disflex">
								<!-- 浏览量三个头像小泉 -->
								<image style="width:110rpx;padding-top:33rpx;" @click="goSeeMe" mode="widthFix"
									src="/static/quanqiu.svg">
								</image>
								<div class="ml21 newNub" style="margin-left:10rpx !important;margin-top:10rpx;">
									<p class="newl-added" v-if="dayBrowseNum">今日+{{dayBrowseNum}}</p>
									<p class="lh20 fs14 fbold c38"
										style="padding-top: 50rpx;position: relative;left:-6rpx;">
										{{item.browseNum ? item.browseNum : 0}}
									</p>
									<p class="fs12 ca8" style="padding-top:10rpx;position: relative;left:-6rpx;">浏览量</p>
								</div>
							</div>
							<div class="disflex fs18 lh44 textc jsbet bgfff user-btn-group">
								<div class="disflex forward align-cen mb12 jsbet" style="padding: 0rpx;">
									<div>
										<button style="padding:0 4rpx;" @click="shareisshow"
											hover-class="other-button-hover" open-type="share"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="weixinIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">转发名片</p>
										</button>
									</div>
									<div v-if="isLogin  && !item.isBind">
										<button style="padding:0 4rpx;" @click.stop="chooseClass(index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="saveIcon2" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">保存名片</p>
										</button>
									</div>
									<div v-else-if="isLogin && item.isBind == true">
										<button style="padding:0 20rpx;" hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column" >
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="lockIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1">已被独占</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="doThumbs(item,index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="popularity[index].isThumbs ? isLikeIcon: likeIcon"
													class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">靠谱<span
													class="cblue">{{popularity[index].thumbsNum || thumbsNum}}</span>
											</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="talk_tag(item.cardId)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="talkImg" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">聊一聊</p>
										</button>
									</div>
								</div>
							</div>

						</div>
					</view>
				</div>

				<div v-if="item.style == 3">
					<Card_4 :card_msg="item"></Card_4>
					<view>
						<div class="card_menu fs12 ca8 bgfff borderbox pl10 mt-18">
							<div class="clearfix pt5 pb5 disflex operation-box">
								<div class="shadow_gray h65 ml10 business_card" @click="createCode(index)">
									<img :src="cardCodeImg" alt="" class="w65 h65">
								</div>
								<scroll-view scroll-x scroll-with-animation>
									<div class="disflex scroll-list">
										<!-- <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="toRoute('showBill', '?cardId='+item.cardId)">
											<p class="pb7">
												名片海报
											</p>
											<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wx_timeline.png"
												alt=" " class="w20 h20" />

										</div> -->
										<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10"
											@click="addToAddressBook(index)">
											<p class="pb7">同步到</p>
											<p>通讯录</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="makePhone(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/tel_2.png"
													alt="" class="w16 h16" />
												<span class="pl9">拨打电话</span>
											</p>
											<p class="c78 fbold pt7">{{item.phone || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10" @click="addWx(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/im_msg.png"
													alt="" class="w16 h16" />
												<span class="pl9">添加微信</span>
											</p>
											<p class="c78 fbold pt7">{{item.personalWx || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="goToMap(item.address)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190425164542.png"
													alt="" class="w16 h16" />
												<span class="pl9">公司地址</span>
											</p>
											<p class="c78 fbold pt7">{{item.address || '未填写'}}</p>
										</div>
									</div>
								</scroll-view>
							</div>
							<div class="more-info mr10">
								<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190514143457.png"
									alt="" class="left-img ">
							</div>
						</div>
						<div class="seen_peo disflex pl15 pr26 fs10 pb20 ca8 jsbet bgfff">
							<div class="disflex">
								<!-- 浏览量三个头像小泉 -->
								<image style="width:110rpx;padding-top:33rpx;" @click="goSeeMe" mode="widthFix"
									src="/static/quanqiu.svg">
								</image>
								<div class="ml21 newNub" style="margin-left:10rpx !important;margin-top:10rpx;">
									<p class="newl-added" v-if="dayBrowseNum">今日+{{dayBrowseNum}}</p>
									<p class="lh20 fs14 fbold c38"
										style="padding-top: 50rpx;position: relative;left:-6rpx;">
										{{item.browseNum ? item.browseNum : 0}}
									</p>
									<p class="fs12 ca8" style="padding-top:10rpx;position: relative;left:-6rpx;">浏览量</p>
								</div>
							</div>
							<div class="disflex fs18 lh44 textc jsbet bgfff user-btn-group">
								<div class="disflex forward align-cen mb12 jsbet" style="padding: 0rpx;">
									<div>
										<button style="padding:0 4rpx;" @click="shareisshow"
											hover-class="other-button-hover" open-type="share"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="weixinIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">转发名片</p>
										</button>
									</div>
									<div v-if="isLogin  && !item.isBind">
										<button style="padding:0 4rpx;" @click.stop="chooseClass(index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="saveIcon2" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">保存名片</p>
										</button>
									</div>
									<div v-else-if="isLogin && item.isBind == true">
										<button style="padding:0 20rpx;" hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column" >
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="lockIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1">已被独占</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="doThumbs(item,index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="popularity[index].isThumbs ? isLikeIcon: likeIcon"
													class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">靠谱<span
													class="cblue">{{popularity[index].thumbsNum || thumbsNum}}</span>
											</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="talk_tag(item.cardId)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="talkImg" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">聊一聊</p>
										</button>
									</div>
								</div>
							</div>

						</div>
					</view>
				</div>

				<!--2.0-->
				<div v-if="item.style == 4">
					<Card_5 :card_msg="item"></Card_5>
					<view>
						<div class="card_menu fs12 ca8 bgfff borderbox pl10 mt-18">
							<div class="clearfix pt5 pb5 disflex operation-box">
								<div class="shadow_gray h65 ml10 business_card" @click="createCode(index)">
									<img :src="cardCodeImg" alt="" class="w65 h65">
								</div>
								<scroll-view scroll-x scroll-with-animation>
									<div class="disflex scroll-list">
										<!-- <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="toRoute('showBill', '?cardId='+item.cardId)">
											<p class="pb7">
												名片海报
											</p>
											<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wx_timeline.png"
												alt=" " class="w20 h20" />

										</div> -->
										<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10"
											@click="addToAddressBook(index)">
											<p class="pb7">同步到</p>
											<p>通讯录</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="makePhone(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/tel_2.png"
													alt="" class="w16 h16" />
												<span class="pl9">拨打电话</span>
											</p>
											<p class="c78 fbold pt7">{{item.phone || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10" @click="addWx(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/im_msg.png"
													alt="" class="w16 h16" />
												<span class="pl9">添加微信</span>
											</p>
											<p class="c78 fbold pt7">{{item.personalWx || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="goToMap(item.address)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190425164542.png"
													alt="" class="w16 h16" />
												<span class="pl9">公司地址</span>
											</p>
											<p class="c78 fbold pt7">{{item.address || '未填写'}}</p>
										</div>
									</div>
								</scroll-view>
							</div>
							<div class="more-info mr10">
								<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190514143457.png"
									alt="" class="left-img ">
							</div>
						</div>
						<div class="seen_peo disflex pl15 pr26 fs10 pb20 ca8 jsbet bgfff">
							<div class="disflex">
								<!-- 浏览量三个头像小泉 -->
								<image style="width:110rpx;padding-top:33rpx;" @click="goSeeMe" mode="widthFix"
									src="/static/quanqiu.svg">
								</image>
								<div class="ml21 newNub" style="margin-left:10rpx !important;margin-top:10rpx;">
									<p class="newl-added" v-if="dayBrowseNum">今日+{{dayBrowseNum}}</p>
									<p class="lh20 fs14 fbold c38"
										style="padding-top: 50rpx;position: relative;left:-6rpx;">
										{{item.browseNum ? item.browseNum : 0}}
									</p>
									<p class="fs12 ca8" style="padding-top:10rpx;position: relative;left:-6rpx;">浏览量</p>
								</div>
							</div>
							<div class="disflex fs18 lh44 textc jsbet bgfff user-btn-group">
								<div class="disflex forward align-cen mb12 jsbet" style="padding: 0rpx;">
									<div>
										<button style="padding:0 4rpx;" @click="shareisshow"
											hover-class="other-button-hover" open-type="share"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="weixinIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">转发名片</p>
										</button>
									</div>
									<div v-if="isLogin  && !item.isBind">
										<button style="padding:0 4rpx;" @click.stop="chooseClass(index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="saveIcon2" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">保存名片</p>
										</button>
									</div>
									<div v-else-if="isLogin && item.isBind == true">
										<button style="padding:0 20rpx;" hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column" >
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="lockIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1">已被独占</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="doThumbs(item,index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="popularity[index].isThumbs ? isLikeIcon: likeIcon"
													class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">靠谱<span
													class="cblue">{{popularity[index].thumbsNum || thumbsNum}}</span>
											</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="talk_tag(item.cardId)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="talkImg" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">聊一聊</p>
										</button>
									</div>
								</div>
							</div>

						</div>
					</view>
				</div>
				<div v-if="item.style == 5">
					<Card_6 v-if="item.style == 5" :card_msg="item"></Card_6>
					<view>
						<div class="card_menu fs12 ca8 bgfff borderbox pl10 mt-18">
							<div class="clearfix pt5 pb5 disflex operation-box">
								<div class="shadow_gray h65 ml10 business_card" @click="createCode(index)">
									<img :src="cardCodeImg" alt="" class="w65 h65">
								</div>
								<scroll-view scroll-x scroll-with-animation>
									<div class="disflex scroll-list">
										<!-- <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="toRoute('showBill', '?cardId='+item.cardId)">
											<p class="pb7">
												名片海报
											</p>
											<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wx_timeline.png"
												alt=" " class="w20 h20" />

										</div> -->
										<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10"
											@click="addToAddressBook(index)">
											<p class="pb7">同步到</p>
											<p>通讯录</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="makePhone(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/tel_2.png"
													alt="" class="w16 h16" />
												<span class="pl9">拨打电话</span>
											</p>
											<p class="c78 fbold pt7">{{item.phone || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10" @click="addWx(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/im_msg.png"
													alt="" class="w16 h16" />
												<span class="pl9">添加微信</span>
											</p>
											<p class="c78 fbold pt7">{{item.personalWx || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="goToMap(item.address)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190425164542.png"
													alt="" class="w16 h16" />
												<span class="pl9">公司地址</span>
											</p>
											<p class="c78 fbold pt7">{{item.address || '未填写'}}</p>
										</div>
									</div>
								</scroll-view>
							</div>
							<div class="more-info mr10">
								<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190514143457.png"
									alt="" class="left-img ">
							</div>
						</div>
						<div class="seen_peo disflex pl15 pr26 fs10 pb20 ca8 jsbet bgfff">
							<div class="disflex">
								<!-- 浏览量三个头像小泉 -->
								<image style="width:110rpx;padding-top:33rpx;" @click="goSeeMe" mode="widthFix"
									src="/static/quanqiu.svg">
								</image>
								<div class="ml21 newNub" style="margin-left:10rpx !important;margin-top:10rpx;">
									<p class="newl-added" v-if="dayBrowseNum">今日+{{dayBrowseNum}}</p>
									<p class="lh20 fs14 fbold c38"
										style="padding-top: 50rpx;position: relative;left:-6rpx;">
										{{item.browseNum ? item.browseNum : 0}}
									</p>
									<p class="fs12 ca8" style="padding-top:10rpx;position: relative;left:-6rpx;">浏览量</p>
								</div>
							</div>
							<div class="disflex fs18 lh44 textc jsbet bgfff user-btn-group">
								<div class="disflex forward align-cen mb12 jsbet" style="padding: 0rpx;">
									<div>
										<button style="padding:0 4rpx;" @click="shareisshow"
											hover-class="other-button-hover" open-type="share"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="weixinIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">转发名片</p>
										</button>
									</div>
									<div v-if="isLogin  && !item.isBind">
										<button style="padding:0 4rpx;" @click.stop="chooseClass(index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="saveIcon2" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">保存名片</p>
										</button>
									</div>
									<div v-else-if="isLogin && item.isBind == true">
										<button style="padding:0 20rpx;" hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column" >
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="lockIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1">已被独占</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="doThumbs(item,index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="popularity[index].isThumbs ? isLikeIcon: likeIcon"
													class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">靠谱<span
													class="cblue">{{popularity[index].thumbsNum || thumbsNum}}</span>
											</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="talk_tag(item.cardId)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="talkImg" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">聊一聊</p>
										</button>
									</div>
								</div>
							</div>

						</div>
					</view>
				</div>
				<div v-if="item.style == 6">
					<Card_7 v-if="item.style == 6" :card_msg="item"></Card_7>
					<view>
						<div class="card_menu fs12 ca8 bgfff borderbox pl10 mt-18">
							<div class="clearfix pt5 pb5 disflex operation-box">
								<div class="shadow_gray h65 ml10 business_card" @click="createCode(index)">
									<img :src="cardCodeImg" alt="" class="w65 h65">
								</div>
								<scroll-view scroll-x scroll-with-animation>
									<div class="disflex scroll-list">
										<!-- <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="toRoute('showBill', '?cardId='+item.cardId)">
											<p class="pb7">
												名片海报
											</p>
											<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wx_timeline.png"
												alt=" " class="w20 h20" />

										</div> -->
										<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10"
											@click="addToAddressBook(index)">
											<p class="pb7">同步到</p>
											<p>通讯录</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="makePhone(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/tel_2.png"
													alt="" class="w16 h16" />
												<span class="pl9">拨打电话</span>
											</p>
											<p class="c78 fbold pt7">{{item.phone || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10" @click="addWx(index)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/im_msg.png"
													alt="" class="w16 h16" />
												<span class="pl9">添加微信</span>
											</p>
											<p class="c78 fbold pt7">{{item.personalWx || '未填写'}}</p>
										</div>
										<div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
											@click="goToMap(item.address)">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190425164542.png"
													alt="" class="w16 h16" />
												<span class="pl9">公司地址</span>
											</p>
											<p class="c78 fbold pt7">{{item.address || '未填写'}}</p>
										</div>
									</div>
								</scroll-view>
							</div>
							<div class="more-info mr10">
								<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190514143457.png"
									alt="" class="left-img ">
							</div>
						</div>
						<div class="seen_peo disflex pl15 pr26 fs10 pb20 ca8 jsbet bgfff">
							<div class="disflex">
								<!-- 浏览量三个头像小泉 -->
								<image style="width:110rpx;padding-top:33rpx;" @click="goSeeMe" mode="widthFix"
									src="/static/quanqiu.svg">
								</image>
								<div class="ml21 newNub" style="margin-left:10rpx !important;margin-top:10rpx;">
									<p class="newl-added" v-if="dayBrowseNum">今日+{{dayBrowseNum}}</p>
									<p class="lh20 fs14 fbold c38"
										style="padding-top: 50rpx;position: relative;left:-6rpx;">
										{{item.browseNum ? item.browseNum : 0}}
									</p>
									<p class="fs12 ca8" style="padding-top:10rpx;position: relative;left:-6rpx;">浏览量</p>
								</div>
							</div>
							<div class="disflex fs18 lh44 textc jsbet bgfff user-btn-group">
								<div class="disflex forward align-cen mb12 jsbet" style="padding: 0rpx;">
									<div>
										<button style="padding:0 4rpx;" @click="shareisshow"
											hover-class="other-button-hover" open-type="share"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="weixinIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">转发名片</p>
										</button>
									</div>
									<div v-if="isLogin  && !item.isBind">
										<button style="padding:0 4rpx;" @click.stop="chooseClass(index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="saveIcon2" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">保存名片</p>
										</button>
									</div>
									<div v-else-if="isLogin && item.isBind == true">
										<button style="padding:0 20rpx;" hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column" >
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="lockIcon" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1">已被独占</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="doThumbs(item,index)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="popularity[index].isThumbs ? isLikeIcon: likeIcon"
													class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">靠谱<span
													class="cblue">{{popularity[index].thumbsNum || thumbsNum}}</span>
											</p>
										</button>
									</div>
									<div>
										<button style="padding:0 4rpx;" @click="talk_tag(item.cardId)"
											hover-class="other-button-hover"
											class="disflex bgfff align-cen flex-column">
											<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
												<img :src="talkImg" class="w25 h25">
											</div>
											<p class="fs14 fbold lh1" style="height: 36rxp;">聊一聊</p>
										</button>
									</div>
								</div>
							</div>

						</div>
					</view>
				</div>

			</div>
		</div>
		<view v-if="popularity.length == 0" >
			  <NoData>暂无人脉信息</NoData>
		</view>
		<div v-if="chooseClassShow">
			<SelectorOne :title="'名片保存为：'" :status="chooseClassShow" :allClass="prodClass" :choose_id="choose_class_id" @choose_tap="choose_tap" @closeModal="closeModel"></SelectorOne>
		</div>
	</div>
</template>

<script>
	import WXAJAX from '@/utils/request'
	import util from '@/utils/index'
	import Card_1 from './contacts/card_1' //
	import Card_2 from './contacts/card_2' //
	import Card_3 from './contacts/card_3' //
	import Card_4 from './contacts/card_4' //
	import Card_5 from "./contacts/card_5"; //
	import Card_6 from "./contacts/card_6"; //
	import Card_7 from "./contacts/card_7"; //
	import HandleLogin from "@/utils/handleLogin";
	import SelectorOne from '@/components/selectorOne';
	import NoData from '@/components/noData'
	import {
		getshare
	} from "@/utils/utils"
	import {
		authSubscribeMessage
	} from "@/utils/auth.js";
	import {
		mapGetters,
	} from "vuex";
	export default {
		components: {
			NoData,
			Card_1,
			Card_2,
			Card_3,
			Card_4,
			Card_5,
			Card_6,
			Card_7,
			SelectorOne
		},
		name: "RichEditor",
		props: {
			// 显示的toolbar按钮
			popularity: {
				type: Array,
				default () {
					return []
				},
			},
			busCardlabelList: {
				type: Array,
				default () {
					return []
				},
			},
			mptabType: {
				type: Number,
				default: -1
			},

		},
		data() {
			return {
				cardCodeImg: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/img_card_code.png',
				saveIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/icon_save.png',
				weixinIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_weixin.png',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_like.png',
				isLikeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_select_like.png',
				editIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_ edit.png',
				firstLoginIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/img_viewmore.png',
				saveIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/icon_save.png',
				saveIcon2: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_ web_invite_selected.png',
				//聊一聊
				talkImg: WXAJAX.imgBackUrl + "/one-product/video-icon/icon_talk%402x.png",
				lockIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_lock.png',
				pages: 1,
				thumbsNum: 0,
				searchkey: '',
				isBind:false,
				card_msg: {
					style: 0,
					cardId: '',
				},
				prodClass: [{
						name: '存到客户列表',
						id: '1'
					},
					{
						name: '存到通讯录',
						id: '2'
					},
					// {name:'存到通讯录和客户列表' , id:'3'},
				],
				biaoqianindex: '', //最后选中的标签下标
				isThumbs: 0, //是否点赞
				isShowAuthorize: false,
				isShowLoginGuide: true, //是否显示登录引导页,
				share: false,
				shareval: '', //转发文案
				staretitle: '', //转发文案
				chooseClassShow: false,
				isLogin: HandleLogin.returnIsLogin(),
				currentCompany: '',
				type: 0, //0我的名片，1别人名片
        card_index:'',

			}
		},
		computed: {
			// ...mapGetters(["currentCompany", "subscriptionNew"])
		},
		mounted() {
			this.isThumbsflag = this.popularity
		},
		methods: {
      chooseClass(index){
        this.card_index = index;
        this.chooseClassShow = !this.chooseClassShow
      },
			//筛选
			toscreen() {
				// uni.navigateTo({
				// 	url: '/pages/companyPack/find/screen/screen'
				// })
				wx.setStorageSync('busCardlabelList' , this.busCardlabelList ) ;
				util.redirectTo('/pages/companyPack/find/screen/screen')
			},
			//跳转到详情
			tobusiness(item) {
				util.redirectTo('/pages/companyPack/find/businessCardinfo/main', {
					cardId: item.cardId,
					companyId: item.companyId
				});
				// uni.switchTab({url:'../../pages/companyPack/find/businessCardinfo/main?cardId='+item.cardId+'&companyId+'+item.companyId});
			},
			//跳转到发布页面
			toContacts() {
				uni.navigateTo({
					url: '/pages/companyPack/editCard/main'
				})
			},
			tab_type_tap(type, item) {
				// this.tabType = type
				if (item == undefined) {
					item = {
						labelContent: ''
					}
				}
				let labelContent = item.labelContent

				this.$emit('busCardlabelTitle', type, item, labelContent)
			},
			//搜索
			search_confirm() {
				if (!this.searchkey.trim()) {
					wx.showToast({
						title: '请输入搜索名字！',
						icon: 'none'
					});
					return
				}
			},
			// 输入监听
			search_rm(){
					// this.goodname = e.detail.value // 已使用v-model,无需再次赋值
					// 节流,避免输入过快多次请求
					this.searchTimer && clearTimeout(this.searchTimer);
					this.searchTimer = setTimeout(() => {
						this.doSearch(this.searchkey);
					}, 300);
			},
			// 搜索
			doSearch() {
				this.$emit('doSearch',this.searchkey)
			},
			addToAddressBook(index) {
				//添加到通讯录
				authSubscribeMessage(this.subscriptionNew);
				wx.addPhoneContact({
					firstName: this.popularity[index].name,
					mobilePhoneNumber: this.popularity[index].phone,
					organization: this.popularity[index].companyName,
					success: function(res) {
						////console.log("success", res);
					},
					fail: function(err) {
						////console.log(err);
					}
				});
			},
			makePhone(index) {
				//拨打电话
				authSubscribeMessage(this.subscriptionNew);
				// this.addCallsPhoneRecord(this.popularity[index].cardId); // 好像没用，是underfind
				util.MakePhone(this.popularity[index].phone || '')
			},
			addWx(index) {
				//添加微信
				authSubscribeMessage(this.subscriptionNew);
				let v = this;
				if (v.popularity[index].personalWx) {
					wx.setClipboardData({
						data: v.popularity[index].personalWx,
						success: function(res) {
							wx.getClipboardData({
								success: function(res) {
									v.isShowCourse = true;
									wx.showToast({
										title: "复制成功"
									});
								}
							});
						}
					});
				} else {
					wx.showToast({
						title: "还没有添加微信呢！",
						duration: 2000,
						icon: "none"
					});
				}
			},
			//导航地图
			goToMap(address) {
				let than = this;
				let author = ''
				wx.showLoading({
					title: "定位中...",
					mask: true
				});
				if (address == "" || !address) {
					wx.showToast({
						title: "请先添加公司地址",
						icon: "none"
					});
					return false;
				}
				WXAJAX.POST({
							address: address
						},
						"",
						"/businessCard/getGps"
					).then(data => {
						wx.hideLoading();
						let gps = JSON.parse(data).result.location
						console.log(gps)
						let latitude = gps.lat
						let longitude = gps.lng
						wx.openLocation({
							latitude,
							longitude,
							name: address,
							scale: 18,
							success(data) {
								wx.hideLoading();
							},
							fail: function(res) {
								//进入授权页面重新开启定位授权
								wx.hideLoading();
								wx.getSetting({
									success(e) {
										author = e.authSetting['scope.userLocation']
										if (author == false) {
											than.isShowAuthorize = true;
											return false
										}
									}
								})
							},
						});
					})
					.catch(err => {
						wx.hideLoading();
						uni.showToast({
							title: err,
							icon: 'none'
						})
					})
			},
			loginGuide() {
				this.isShowLoginGuide = true;
			},
			shareisshow() { //分享弹窗显示隐藏
				console.log(112)
				let that = this
				that.share = !that.share
				console.log(that.share)
			},
			//二维码
			createCode(index) {
				if (!HandleLogin.returnIsLogin()) {
					this.loginGuide();
					return;
				}
				WXAJAX.POST({
							cardId: this.popularity[index].cardId
						},
						"",
						"/businessCard/getWxTwoCode"
					)
					.then(data => {
						wx.navigateTo({
							url: "/pages/my/cardCode2/main?code=" + data
						});
					})
					.catch(err => {
						wx.hideLoading();
					});
			},
			choose_tap(url, name, index) {
				console.log("url",url, name, index)
				// if (!wx.getStorageSync('SELFCARDID')) {
				// 	wx.showToast({
				// 		title: '请先创建自己的名片',
				// 		icon: 'none',
				// 		duration: 2000 //持续的时间
				// 	})
				// 	setTimeout(function() {
				// 		wx.navigateTo({
				// 			url: "/pages/createCard/chooseIdentity/main?goType=1"
				// 		});
				// 	}, 1000);
				// 	return;
				// }
				authSubscribeMessage(this.subscriptionNew);
				// this.choose_class_id = id;
				this.chooseClassShow = false;

				console.log(`/pages/companyPack/clientAdd/main?type=userAdd&goType=1&cardId=${this
			.currentCompany.cardId || ""}&userId=${this.currentCompany.userId ||
			""}&ipaCustomer=` + url);
				if (!HandleLogin.returnIsLogin()) {
					this.loginGuide();
					return;
				}
        let card_index=this.card_index;
				// zlz
				if (url == 1) {
					//存为客户
				// 	util.toMiniProgram(
				// 		`/pages/clientAdd/main?type=userAdd&goType=1&cardId=${this
			 // .popularity[index].cardId || ""}&userId=${this.popularity[index].userId ||
			 // ""}`
				// 	);
					wx.navigateTo({
					  url:
					    "../clientAdd/main?type=userAdd&goType=1&cardId=" +
					    this.popularity[card_index].cardId +
					    "&userId=" +
					    this.popularity[card_index].userId +
					    "&ipaCustomer=" +
					    url
					});
				} else {
					wx.navigateTo({
						url: "/pages/companyPack/mailAdd/main?cardId=" +
							this.popularity[card_index].cardId +
							"&userId=" +
							this.popularity[card_index].userId +
							"&cId=" +
							this.popularity[card_index].companyId
					});
				}
			},
			closeModel() {
				this.$set(this, 'chooseClassShow', false);
			},
			doThumbs(item, index) {
				//点赞
				this.$emit('doThumbs', index)
			},
			//聊一聊
			talk_tag(cardId) {
				if (cardId == 0 || "") {
					wx.showToast({
						title: "该用户暂无聊天权限",
						icon: "none"
					});
					return false;
				}
				this.getCurrentCompany(cardId);
			},
			async getCurrentCompany(id) {
				WXAJAX.POST({
						cardId: id
					},
					"",
					"/businessCard/cardDetails", "", "", 2
				).then(data => {
					if (data) {
						this.currentCompany = data;
						wx.navigateTo({
							url: "/pages/IM/main?userId=" +
								this.currentCompany.userId +
								"&logo=" +
								this.currentCompany.logo +
								"&type=2&cardId=" +
								this.currentCompany.cardId +
								"&name=" +
								this.currentCompany.name +
								"&wxCode=" +
								(this.currentCompany.personalWx || "") +
								"&phone=" +
								this.currentCompany.phone
						});
					}
				});
			},

		},

	}
</script>

<style>

</style>
<style scoped>
	.searchText {
		cursor: auto;
		display: inline-block;
		height: 68upx;
		max-width: 100%;
		padding-left: 20upx;
		text-align: left;
		line-height: 68upx;
		font-size: 28upx;
		color: #A8A8A8;

	}

	.rmdcontent {
		width: 100%;
		margin-top: 30rpx;
		padding-top: 20rpx;
	}

	.screen {
		width: 100%;
		border: 1px transparent solid;
		background-color: #fff;
	}

	.screenList {
		margin: 20rpx;
		/* justify-content: space-between; */
		display: flex;
	}

	.industry {
		background-color: #EAEAEA;
		padding: 15rpx 18rpx 15rpx 18rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
		color: #807E7E;
	}

	.active {
		color: #FFF;
		background-color: #51cdcb;
		transition: all .2s;
		padding: 15rpx 18rpx 15rpx 18rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
	}

	.screenbtn {
		padding: 15rpx 18rpx 15rpx 18rpx;
		box-shadow: rgb(254, 216, 186) 0rpx 4rpx;
		color: rgb(255, 172, 105);
		background-color: rgb(255, 250, 244);
		border-radius: 22rpx;
		font-weight: normal;
		font-style: normal;
	}


	.toast-box {
		width: 100%;
		height: 100%;
		opacity: 1;
		position: fixed;
		top: 0px;
		left: 0px;
	}


	.toastbg {
		opacity: 0.2;
		background-color: black;
		position: absolute;
		width: 100%;
		min-height: 100vh;
	}

	.showToast {
		position: absolute;
		opacity: 1;
		width: 70%;
		margin-left: 15%;
		margin-top: 40%;
	}

	.toast-title {
		padding-left: 5%;
		background-color: #787878;
		color: white;
		padding-top: 2vh;
		padding-bottom: 2vh;
		border-top-right-radius: 16rpx;
		border-top-left-radius: 16rpx;
	}

	.toast-main {
		padding-top: 2vh;
		padding-bottom: 2vh;
		background-color: white;
		text-align: center;
	}

	.toast-input {
		margin-left: 5%;
		margin-right: 5%;
		border: 1px solid #ddd;
		padding-left: 2vh;
		padding-right: 2vh;
		padding-top: 1vh;
		padding-bottom: 1vh;
	}

	.toast-button {
		display: flex;
	}

	.button1 {
		width: 50%;
	}

	.button2 {
		width: 50%;
	}

	.button1 button {
		width: 100%;
		background-color: white;
		color: red;
		border-radius: 0px;
		border-bottom-left-radius: 16rpx;
	}

	.button2 button {
		width: 100%;
		background-color: white;
		color: black;
		border-radius: 0px;
		border-bottom-right-radius: 16rpx;
	}

	.degree-of-perfection .line-outer {
		position: relative;
		height: 8upx;
		width: 100%;
		background: rgb(245, 245, 245);
		border-radius: 198upx;
		overflow: hidden;
		margin-top: 40upx;
	}

	.degree-of-perfection .line-outer .line {
		height: 8upx;
		width: 0%;
		background: #51CDCB;
	}

	.more-info {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 30rpx;
		margin: auto 0;
		height: 40upx;
		width: 30upx;
		background: white;
		box-shadow: 0px 0px 20upx 0px rgba(56, 56, 56, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.more-info .left-img {
		width: 10upx;
		height: 20upx;
	}

	.operation-box {
		margin-left: 130rpx;
		margin-right: 40upx;
		padding-left: 10upx;
	}

	.business_card {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		border-radius: 0 50% 50% 0;
		display: flex;
		align-items: center;
		padding-top: 0;
		width: 140upx;
		box-sizing: border-box;
	}

	.business_card p {
		writing-mode: tb-rl;
	}

	.card_menu {
		position: relative;
	}

	.scroll-list {
		padding: 20upx 40upx 20upx 20upx;
	}

	.scroll-list>div {
		white-space: nowrap;
		box-sizing: border-box;
	}

	.self_introduce {
		height: 214upx;
		transition: .1s;
		overflow: hidden;
	}

	.self_introduce.higher {
		height: auto;
	}

	.output-audio {
		width: 167px;
		height: 40px;
		position: relative;
		margin-right: 22upx;
		padding-left: 40upx;
	}

	.audio::before {
		content: '';
		display: block;
		width: 20upx;
		height: 20upx;
		background: #F5F5F6;
		position: absolute;
		border: 1upx solid #E8E8E8;
		border-radius: 8upx;
		transform: rotate(45deg);
		border-right-width: 0;
		border-top-width: 0;
		top: 0px;
		bottom: 0;
		left: -12upx;
		margin: auto;
	}

	.output-audio .audio {
		padding: 24upx 0 24upx 34upx;
		background: #F5F5F6;
		border: 1upx solid #E8E8E8;
		position: relative;
		height: 34upx;
		border-radius: 10upx;
	}

	.output-audio .audio .ico {
		width: 24upx;
		height: 34upx;
		float: left;
	}

	scroll-view {
		background: #fff;
	}

	.marketing {
		width: 690upx;
		height: 210upx;
		padding: 10upx 0 0upx 0;
		box-sizing: border-box;
		width: 100%;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
	}

	.marketing image {
		width: 100%;
		height: 100%;
	}

	.browsing-history {
		width: 36upx;
	}

	.forward {
		padding: 0 185upx 0 185upx;
	}

	.navsearch {
		display: flex;
		justify-content: space-between;
		width: 100%;
		background-color: #FFFFFF;
	}

	.navsearch .navright {
		display: flex;
		width: 166rpx;
		height: 72rpx;
		border-radius: 26rpx;
		background-color: #03D3C5;
		text-align: center;
		box-shadow: 0px 2rpx 6rpx 0rpx #03D3C5;
		border: 2rpx solid #03D3C5;
		margin-right: 42rpx;
		margin-top: 22rpx;
		text-align: center;
		line-height: 72rpx;
	}

	.navsearch .navright .add {
		width: 32rpx;
		height: 32rpx;
		overflow: hidden;
		margin-top: 20rpx;
		margin-left: 14rpx;
	}

	.navsearch .navright .add image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.navsearch .navright .text {
		color: #fff;
		font-size: 24rpx;
		text-align: left;
		margin-left: 10rpx;
		font-family: PingFangSC-regular;
	}
</style>
