<template>
	<div class="index" :style="{height: mainHeight+'px'}" >
		<div v-if="input_show" @click="conceal()"
			:style="{height: mainHeight+'px'}" style="width: 100%;position:absolute;top:0;left:0;z-index: 99;">
		</div>
		<!--  <view v-if="isshowyindao" style="position:fixed;background:rgba(0,0,0,.7) !important;top:0rpx;right:0;bottom:0;left:0;z-index:999;">
       <image mode="widthFix" :src="require('../../static/yindao.png')"  style="position:absolute;left:190rpx;top:110rpx;width:160rpx;"></image>
         <view style="position:absolute;left:190rpx;bottom:700rpx;padding:0 10rpx;line-height:80rpx;color:#fff;border-radius:20rpx;">这里是个人中心</view>
        <image :src="require('../../static/yindao1.png')" style="width: 290rpx;" mode="widthFix"></image>
        <view class="" @click="isshowyindao = !isshowyindao" style="font-size:40rpx;text-align:center;padding:10rpx 20rpx;border:2rpx solid #fff;position:absolute;left:50%;transform: translate(-50%,0);top:900rpx;color:#fff;text-align: center;border-radius:6px;">
          我知道了
        </view>
     </view> -->
		<scroll-view  class="dynamic-content" :scroll-y="true"
			:enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper'>
			<div @touchstart="touchStart" @touchend="touchEnd">
				<Card_1 @touchstart="touchStart" @touchend="touchEnd" v-if="card_type == 0" :card_msg="card_msg"
					:isPrev="true"></Card_1>
				<div class="bgfff">
					<Card_2 v-if="card_type == 1" :card_msg="card_msg" @uploadpic="uploadpic" :isPrev="true"></Card_2>
					<!--1.0-->
					<Card_3 v-if="card_type == 2" :isPrev="true" :card_msg="card_msg"></Card_3>
					<Card_4 v-if="card_type == 3" :card_msg="card_msg"></Card_4>
					<!--2.0-->
					<Card_5 v-if="card_type == 4" :card_msg="card_msg"></Card_5>
					<Card_6 v-if="card_type == 5" :card_msg="card_msg"></Card_6>
					<Card_7 v-if="card_type == 6" :card_msg="card_msg"></Card_7>
				</div>
			</div>
			<!-- <div class="pt15 card-case" @click.native="toCardCase">
                    <div class="disflex h30 bra_left_15 bg_line_blue cfff fs12 pl15 pr10 lh30 align-cen">
                        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/cardlist.png" alt class="w24 h24" />
                        <span class="pl7">名片夹</span>
                    </div>
                </div> -->
			<view>
				<!-- //社会兼职 -->
				<!-- <view  style="width:690rpx;margin:0 auto;box-sizing: border-box;border-radius:6rpx;background: #fff;margin-top: 10rpx;">
          <view>其它职务</view>
          <view >
              <view v-if="Array.isArray(mecardtitle)" v-for="(item,index) in mecardtitle" :key="item.id"  style="display:flex;justify-content:space-between;align-items: center;padding-left:16rpx;padding-right:46rpx;">
                  <view style="">{{item.name}}</view>
                  <view>{{item.post}}</view>
              </view>
          </view>
        </view> -->
				<div class="card_menu posre fs12 ca8 bgfff borderbox pl10 pr10">
					<div class="clearfix disflex operation-box">
						<FormId>
							<div class="shadow_grayA h65 mr10 business_card" @click="createCode">
								<!-- <p class="pb3">名片码</p>
                <div class="w20">
                  <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/ercode.png"
                       alt=" "
                       class="w20 h20" />
                </div> -->
								<img :src="cardCodeImg" alt="" class="w65 h65">
							</div>
						</FormId>
						<FormId>
							<scroll-view scroll-x scroll-with-animation class="scroll-list padd h99a"
								:scroll-left="scrollLeft">
								<div class="disflex align-cen h99a">
									<div class="shadow_grayA textc pt15 pl15 pr15 h55 mr10" v-if="type == 0"
										@click="toShowBill">
										<p class="pb7">名片海报</p>
										<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wx_timeline.png"
											alt=" " class="w20 h20" />
									</div>
									<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10">
										<GetPhoneNumber @next="addToAddressBook">
											<p class="pb7">同步到</p>
											<p>通讯录</p>
										</GetPhoneNumber>
										<!-- <LoginIntercept @loginSuccess="loginInterceptSuccess" class="login-intercept" /> -->
									</div>
									<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10">
										<GetPhoneNumber @next="makePhone">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/tel.png"
													alt class="w16 h16" />
												<span class="pl9">拨打电话</span>
											</p>
											<p class="c78 fbold pt7">{{card_msg.tel || '未添加'}}</p>
										</GetPhoneNumber>
										<!-- <LoginIntercept @loginSuccess="loginInterceptSuccess" class="login-intercept" /> -->
									</div>
									<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10">
										<GetPhoneNumber @next="addWx">
											<p class="disflex align-cen">
												<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/msg.png"
													alt class="w16 h16" />
												<span class="pl9">添加微信</span>
											</p>
											<p class="c78 fbold pt7">{{card_msg.wx || '未添加'}}</p>
										</GetPhoneNumber>
										<!-- <LoginIntercept @loginSuccess="loginInterceptSuccess" class="login-intercept" /> -->

									</div>
									<div class="posre shadow_grayA textc bradius5 pt15 pl15 pr15 h55 mr10"
										@click.stop="goToMap(card_msg.address)">

										<p class="disflex align-cen">
											<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190425164542.png"
												alt class="w16 h16" />
											<span class="pl9">公司地址</span>
										</p>
										<p class="c78 fbold pt7">{{card_msg.address || '未添加'}}</p>

										<!-- <LoginIntercept @loginSuccess="loginInterceptSuccess" class="login-intercept" /> -->
									</div>
								</div>
							</scroll-view>
						</FormId>
						<img class="w150 h29 first-login-img" :src="firstLoginIcon" v-if="isFirstLogin">
					</div>
					<!-- <div class="more-info"
               @click="scrollviewRight">
            <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190514143457.png"
                 alt
                 class="left-img" />
          </div> -->
				</div>
			</view>
			<div class="seen_peo disflex pl15 pr26 fs10 pb20 ca8 jsbet bgfff">
				<span class="seen_peo_dot" v-if="todayNumber"></span>
				<div class="disflex" style="margin-top: 44rpx;">
					<!-- 浏览量三个头像小泉 -->
					<!-- <image style="width:110rpx;padding-top:33rpx;" @click="goSeeMe" mode="widthFix"
						src="/static/quanqiu.svg">
					</image> -->
					<div class="disflex" @click="goSeeMe">

						<div v-if="card_msg.browsePhoto.length>0" class="browsing-history" :style="{zIndex:100 - k}"
							v-for="(v,k) in card_msg.browsePhoto" :key="k">
							<img :src="v" alt mode="aspectFill" class="w30 h30 b6fff bradius50p shadow_grayA" />
						</div>
						<div v-if="card_msg.browsePhoto.length==0">
							<image style="width:110rpx;" mode="widthFix" src="/static/quanqiu.svg">
							</image>
						</div>

					</div>
					<div class="ml21"
						style="margin-left:10rpx !important;margin-top:-14rpx;position: absolute;left: 140rpx;">
						<p style="color: #51CDCB;">今日+{{dayBrowseNum}}</p>
						<p class="lh20 fs14 fbold c38">
							{{card_msg.browseNum ? card_msg.browseNum : 0}}
						</p>
						<p class="fs12 ca8">浏览量</p>
					</div>
				</div>
				<div class="disflex fs18 lh44 textc jsbet bgfff user-btn-group">
					<div class="disflex forward align-cen mb12 jsbet" style="padding: 0rpx;">
						<div>
							<button style="padding:0 4rpx;" @click="shareisshow" hover-class="other-button-hover"
								class="disflex bgfff align-cen flex-column">
								<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
									<img :src="weixinIcon" class="w25 h25">
								</div>
								<p class="fs14 fbold lh1">转发名片</p>
							</button>
						</div>
						<div v-if="type == 0 && isLogin && card_msg" @click="updateMyCard">
							<button style="padding:0 20rpx;" hover-class="other-button-hover"
								class="disflex bgfff align-cen flex-column">
								<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
									<img :src="editIcon2" class="w25 h25">
								</div>
								<p class="fs14 fbold lh1">编辑名片</p>
							</button>
						</div>
						<div v-else-if="type != 0 && isLogin  && !isBind">
							<button style="padding:0 20rpx;" hover-class="other-button-hover"
								class="disflex bgfff align-cen flex-column" @click="chooseClassShow = !chooseClassShow">
								<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
									<img :src="saveIcon2" class="w25 h25">
								</div>
								<p class="fs14 fbold lh1">保存名片</p>
							</button>
						</div>

						<div v-else-if="type != 0 && !isLogin  && !isBind">
							<button style="padding:0 20rpx;" hover-class="other-button-hover"
								class="disflex bgfff align-cen flex-column" @click="GetUserInfo">
								<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
									<img :src="saveIcon2" class="w25 h25">
								</div>
								<p class="fs14 fbold lh1">保存名片</p>
							</button>
						</div>

						<div v-else-if="isLogin && isBind">
							<button style="padding:0 20rpx;" hover-class="other-button-hover"
								class="disflex bgfff align-cen flex-column" @click="GetUserInfo">
								<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
									<img :src="lockIcon" class="w25 h25">
								</div>
								<p class="fs14 fbold lh1">已被独占</p>
							</button>
						</div>
						<div v-else>
							<button style="padding:0 20rpx;" hover-class="other-button-hover"
								class="disflex bgfff align-cen flex-column" @click="createCard">
								<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
									<img :src="lockIcon" class="w25 h25">
								</div>
								<p class="fs14 fbold lh1">创建名片</p>
							</button>
						</div>
						<div @click="doThumbs">
							<button style="padding: 14rpx 12rpx;" hover-class="other-button-hover"
								class="disflex bgfff align-cen flex-column" @click="createCard">
								<div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA">
									<img :src="isThumbs ? isLikeIcon: likeIcon" class="w25 h25">
								</div>
								<p class="fs14 fbold lh1">靠谱<span class="cblue">{{card_msg.thumbsNum || 0}}</span></p>
							</button>
						</div>
						<!-- <div class="disflex align-cen flex-column" @click="doThumbs">
              <div class="disflex w44 h44  mb12 align-cen jscen bradius50p shadow_grayA">
                <img :src="isThumbs ? isLikeIcon: likeIcon" class="w25 h25">
              </div>
              <p class="fs14 fbold lh1">靠谱<span class="cblue">{{card_msg.thumbsNum || 0}}</span></p>
            </div> -->
					</div>
				</div>

			</div>
			<div v-if="chooseClassShow">
				<SelectorOne :title="'名片保存为：'" :status="chooseClassShow" :allClass="prodClass"
					:choose_id="choose_class_id" @choose_tap="choose_tap" @closeModal="closeModel"></SelectorOne>
			</div>

			<!-- <view>其它职务</view> -->
			<div class="c38 fs16 pl15 pr15" v-if="Array.isArray(mecardtitle)&&mecardtitle.length>0">
				<subhead :title="userDefinedTitle" dec="OTHERS"></subhead>
				<div class="shadow_gray pl15 pr15 bradius5">
					<div class="self_introduce lh22 fs16" v-if="Array.isArray(mecardtitle)&&mecardtitle.length>0">
						<div class="introduce pb15 pt15">
							<view v-for="(item,index) in mecardtitle" :key="item.id"
								style="display:flex;justify-content:space-between;align-items: center;padding-left:16rpx;padding-right:46rpx;">
								<view style="">{{item.name}}</view>
								<view>{{item.post}}</view>
							</view>
						</div>
					</div>
				</div>
			</div>

			<!--introduce begin-->
			<div class="c38 fs16 pl15 pr15" v-if="audioArr.src || introduce">
				<subhead title="个人简介" dec="RESUME"></subhead>
				<div class="shadow_gray pl15 pr15 bradius5">
					<div class="pt15 disflex pb20" v-if="audioArr.src">
						<img :src="card_msg.picchecked" mode="aspectFill" alt class="w40 h40 bradius5 mr15" />
						<div class="disinblock">
							<div class="output-audio">
								<!-- 默认状态 -->
								<div class="audio" v-if="audioArr.bl==false" @click="audioPlay" :data-id="audioArr.id"
									:data-bl="audioArr.bl">

									<img class="ico"
										src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/card/yuyin-ico.png" />
								</div>
								<!-- 当前正在播放状态 -->
								<div class="audio" v-if="audioArr.bl==true" @click="audioStop" :data-id="audioArr.id"
									:data-bl="audioArr.bl">
									<img class="ico"
										src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/card/yuyin-gif.gif" />
								</div>
							</div>
						</div>
						<span class="fs12 ca8 disflex column-reverse">{{audioArr.time + '"' || 0 + '"'}}</span>
					</div>
					<div class="fs16 self_introduce lh22" :style="{height:seemore?introHeight : '' }" v-if="introduce">
						<div class="introduce pb20" :style="{'padding-top': audioArr.src ? '0' : '40rpx'}">{{introduce}}
						</div>
					</div>
					<div class="more fs12 ca8 lh40 textc" @click="seemore = !seemore" v-if="moreshow">了解更多</div>
				</div>
			</div>
			<!-- vr -->
			<!-- <div class="pl15 pr15">
				<subhead title="VR展示" dec="VR"></subhead>
				<div class="disflex wrap jsbet" v-for="(item,index) in vrList" :key="index">
					<div @click="tovr" class="bgfff overhidden firstVideo" style="position: relative;">
						<image class="disblock" style="width:100%;height:350rpx;" :src="item.vrUrl">
							<img :src="item.vrUrl" alt class="w50 h50 posab top0 left0 right0 bottom0 mauto" />
						</image>
						<div class="fs14 pl15 c38 fbold">{{item.vrTitle}}</div>
					</div>
				</div>
			</div> -->
			<!--个人动态-->
			<div v-if="dynamic_lists.length" class="pl15 pr15" id="tab6">
				<subhead title="个人动态" dec="MOMENT"></subhead>
				<div v-if="dynamic_lists.length" class="shadow_gray">
					<div class="shadow_gray pb10 mb20" v-for="(dynamic_item, k1) in dynamic_lists" :key="k1"
						style="position: relative;">
						<div class="bgfff pt20 pl15 pr16 mb5">
							<div class="disflex mb5">
								<img :src="dynamic_item.dynamicCreateLogo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card1_logo.png'"
									alt="" mode="aspectFill" class="w40 h40 bradius5 mr8 companyLogo">
								<div class="disflex flex-column jsaround">
									<span
										class="fbold cblue_3 w250 fs14 over_1">{{dynamic_item.dynamicCreateName}}</span>
									<span class="ca8 fs12">{{dynamic_item.createTime}}</span>
								</div>
							</div>
							<div class="flex1">
								<div v-if="dynamic_item.type == 2" @click.stop="addComment(dynamic_item.dynamicId)"
									style="padding: 20rpx;background: #F5F5F6;">
									<p class="fs14 c38 ccyc" style="margin-left:32px;">{{dynamic_item.title}}</p>
									<div class="disflex picture-list" style="margin-left: 30px;margin-top: 15rpx;">
										<div class="w70 h70" v-for="(v,k) in dynamic_item.photos" :key="k" style="margin-bottom: 15px;margin-right: 15px;">
											<img :src="v" mode="aspectFill" :lazy-load="true"
												@click.stop="previewImage(v)">
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--文章-->
			<div class="pl15 pr15" id="tab7" v-if="article_lists.length">
				<subhead title="个人文章" dec="ARTICLE"></subhead>
				<!--        <div class="bgfff   pt20 pb15  fs16 bradius5">
                <div v-html="company.companyIntroduce"></div>
              </div> -->
				<view  @click="toDetail(item)" class="disflex wenzhang" style="background-color: #fff;margin-bottom: 20rpx;" v-for="(item,index) in article_lists" :key='index'>
					<view class="w250" style="margin: 20rpx;">
						<view class="disflex">
							<text class="fs14 c38 over_2">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
							<!-- <view class="w22">
								<image class="w20 h20" :src="pay_selectIcon"></image>
							</view> -->
						</view>
						<!-- <p class="fs12 ca7 mt15">本文为普通转发文章</p> -->
					</view>
					<img :lazy-load="true" mode="aspectFill"
						:src="item.photos[0]"
						class="w65 h65 bradius4 mr8" style="margin: 20rpx;">
				</view>
			</div>

			<div class="fix_bottom bgfff edit_input trans2" :class="input_show ? '' : 'input-hide'"
				style="z-index=9999">
				<div class="bgfff pt3 pb5 pl10 disflex jsbet pr11 borderbox align-cen" style="z-index=9999 ">
					<input fixed="true"
						class=" borderbox lh30 pr11 bgf5f6 bradius5 flex1 mr11 comment_input ca8 fs12 pl15"
						:focus="comment_focus" :placeholder="
				    replayComment.commentId
				      ? '回复 ' + replayComment.userName + '：'
				      : '评论'
				  " cursor-spacing="4"  @confirm="inputConfirm"
						:style="{ height: text_height + 'px' }" v-model="comments" />
					<span class="bgblue cfff w50 textc lh30 fs16 bradius5 disblock ml10"
						@click.stop="inputConfirm">发送</span>
				</div>
			</div>

			<!--热销商品-->
			<div class="fs16 bgfff pl16 pb15 mb4" v-if="companyGoodsResponses && companyGoodsResponses.length > 0">
				<subhead title="产品推荐" dec="PRODUCTS"></subhead>
				<div class="disflex wrap shadow_gray">
					<div class="btf5f6 bbf5f6" style="width: 96%;">
						<div class="list pt10 pb15 pl10 pr15"
							style="border-radius: 20px;display: flex;margin-top: 10px;"
							v-for="(data) in companyGoodsResponses" :key="data.goodsId" @click="selectGoods(data)">
							<image class="w60 h60 bradius5" :src="data.goodsPhoto"></image>
							<div class="list-right" style="margin-left: 10px;">
								<p>{{data.goodsName ? data.goodsName : ''}}</p>
								<div class="delete" style="margin-top: 19px;">
									<span class="fs12 corange ">参考价 ￥{{data.price}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--公司视频-->
			<!-- <div class="pl15 pr15"
           v-if="currentCompany.videoList">
        <subhead title="视频展示" dec="VIDEOS"></subhead>
        <div class="disflex wrap jsbet">
          <div v-for="(videoItem, index) in currentCompany.videoList"
               :key="index"
               class="bgfff overhidden"
               :class=" index === 0 ? 'firstVideo' : 'notFirstVideo'">
            <video :id="'myVideo'+ videoItem.videoId"
                   class="disblock"
                   v-if="playIndex === videoItem.videoId"
                   :title="videoItem.videoTitle"
                   :poster="videoItem.videoCover || ''"
                   :src="videoItem.videoUrl"
                   objectFit="cover"
                   enable-danmu
                   danmu-btn
                   controls
                   :autoplay="true"></video>
            <div class="posre"
                 :class="index === 0 ? 'w100p h194' : 'w168 h94'"
                 @click="showVideo(videoItem.videoId)"
                 v-else>
              <img mode="aspectFill"
                   :src="videoItem.videoCover || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-www/photo/20190604/1559619324240.png'"
                   alt
                   :class="index === 0 ? 'w100p h194' : 'w168 h94'" />
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-www/photo/20190604/1559619365051.png"
                   alt
                   class="w50 h50 posab top0 left0 right0 bottom0 mauto" />
            </div>
            <div class="fs14 pl15 c38 fbold">{{videoItem.videoTitle}}</div>
          </div>
        </div>
      </div> -->
			<div class="pl15 pr15" v-if="currentCompany.videoList">
				<subhead title="个人视频" dec="VIDEOS"></subhead>
				<div class="shadow_gray disflex wrap jsbet">
					<div v-for="(videoItem, index) in currentCompany.videoList" :key="index"
						class="bgfff overhidden firstVideo">
						<video :id="'myVideo'+ videoItem.videoId" class="disblock"
							v-if="playIndex === videoItem.videoId" :title="videoItem.videoTitle"
							:poster="videoItem.videoCover || ''" :src="videoItem.videoUrl" objectFit="cover"
							enable-danmu danmu-btn controls :autoplay="true"></video>
						<div class="posre w100p h194" @click="showVideo(videoItem.videoId)" v-else>
							<img mode="aspectFill"
								:src="videoItem.videoCover || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-www/photo/20190604/1559619324240.png'"
								alt class="w100p h194 bradius5" />
							<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-www/photo/20190604/1559619365051.png"
								alt class="w50 h50 posab top0 left0 right0 bottom0 mauto" />
						</div>
						<div class="fs14 pl15 c38 fbold" style="margin-bottom: 22rpx;">{{videoItem.videoTitle}}</div>
					</div>
				</div>
			</div>
			<!--introduce end-->
			<!--pic begin-->
			<div class="pl15 pr15 c38 fs16" v-if="self_photos[0] !== '暂无'">
				<subhead title="我的照片" dec="PHOTOS"></subhead>
				<!-- 没有照片直接不显示此模块，此处不要 -->
				<!-- <div class="textc shadow_gray pl15 pr15 bgfff bradius5"
             style="height: 104px"
             v-if="self_photos.length == 0">
          暂无图片
        </div> -->
				<div class="shadow_gray photos">
					<img :lazy-load="true" :src="v" alt v-for="(v,k) in self_photos" :key="k" mode="widthFix"
						class="w100p h375 bradius5" @click="previewImage(v)" />
				</div>
			</div>
			<!--pic end-->
			<!--bottom-->
			<div class="textc lh42 fs12 ca8 bgf5f6" style="padding-bottom: 50rpx;">- 到底了，看看其他的吧 -</div>
			<!--右边悬浮框-->
			<!-- <div class="index_float_right trans2 overhidden">
                <RightFloat :isShow="isShow" @clickRightRowEvent="clickRightRowEvent"></RightFloat>
                <div :class="{fadeInRight: !isShow, fadeOutRight: isShow}" style="width: 40rpx;right: 0;border-top-left-radius: 10rpx;border-bottom-left-radius: 10rpx" class="animated posfix fs10 ca8 textc floats trans2 bottom30 shadow_gray bgfff pb15" >
                    <div class="pt16" @click="clickRightRowEvent">
                        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/right_row.png" alt style="width: 30rpx;transform: rotate(180deg);height: 30rpx;" />
                    </div>
                </div>
            </div> -->
			<div v-if="isShowCourse">
				<addWxCourse top='136rpx' :isShow="isShowCourse" @close="isShowCourse=false" />
			</div>
		</scroll-view>


		<!-- <FloatButtons class="index_float_right trans2 overhidden" :isShowTalk="isShowTalk" :avatarUrl="targetAvatarUrl"
			:isLogin="isLogin" :help="help" :isBayWindow="isBayWindow" @talk="talk"
			@loginInterceptSuccess="loginInterceptSuccess">
		</FloatButtons> -->



		<div v-if="isShowAuthorize">
			<AuthorizeBox @close="isShowAuthorize = false"></AuthorizeBox>
		</div>
		<!-- <login :isShow="loginShow" :avatarUrl="targetAvatarUrl" :userInfo="userInfo" :hint="hint"
			@cancelLogin="cancelLogin" @loginSuccess="loginSuccess"></login> -->
		<!-- 帮助按钮 -->
		<!-- <HelpPage @helpxy="helpxy" :sharebtnx="sharebtnx" :sharebtny="sharebtny" :avatarUrl="HelpUrl" class="index_float_right trans2 overhidden"></HelpPage> -->
		<view class="" v-show="share"
			style="position: fixed;top:0;right:0;bottom:0;left:0;background: rgba(0,0,0,0.7);z-index:9999;"></view>
		<view v-show="share"
			style="position: fixed;top:65%;left:50%;width:600rpx;height:404rpx;box-sizing: border-box;z-index: 999999;background:#fff;margin-left: -300rpx;margin-top:-280rpx;border-radius: 20rpx;">
			<view style="text-align:center;font-size:35rpx;padding-top:20rpx;margin-bottom:20rpx;">转发文案</view>
			<textarea v-model="shareval" name="" id=""
				style="display:block;width:514rpx;padding:0 4rpx;height:160rpx;border:1rpx solid  #51CDCB;border-radius:6rpx;margin:0 auto;margin-bottom:40rpx;box-sizing:border-box;"></textarea>
			<!-- <input  style="border:1rpx solid  #08BF62;border-radius:6rpx;width:300rpx;margin:0 auto;margin-bottom:40rpx;box-sizing:border-box;" type="text"   > -->
			<!-- 筛选 -->
			<!-- <view style="padding:0 20rpx;">
        <radio-group v-if="staretitle.length>0" @change="radioChange">
                        <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in staretitle" :key="item.shareTitleInfoContent">
                            <view>
                                <view style="display:inline-block;">
                                  <radio :value="item.shareTitleInfoContent" :checked="index === current" />
                                  {{item.shareTitleInfoContent}}</view>
                            </view>
                        </label>
                    </radio-group>
      </view> -->
			<!-- <view style="padding-left:40rpx;">
				<view
					:style="{'margin-right':'20rpx',background:biaoqianindex == index?'#51CDCB':'#fff',color:biaoqianindex == index?'#fff':'#000',}"
					@click="radioChange" :data-index="index" :data-val="item.shareTitleInfoContent"
					v-for="(item, index) in staretitle" :key="item.shareTitleInfoContent"
					style="padding:4rpx 22rpx;border:4rpx solid #51CDCB;border-radius:8rpx;display:inline-block;margin-bottom:20rpx;">
					{{item.shareTitleInfoContent}}
				</view>
			</view> -->
			<!-- <button @click="add"
				style="width:500rpx;height:70rpx;line-height:70rpx;background: #08BF62;color: #fff;margin-top:120rpx;">保存到转发常用语</button> -->
			<view class="" style="display:flex;justify-content: center;align-items: center;margin-top:60rpx;">
				<button @click="shareisshow"
					style="width:200rpx;height:70rpx;line-height:70rpx;background: #F5F5F6;color: #000;">取消</button>
				<button open-type="share" type="default"
					style="width:200rpx;height:70rpx;line-height:70rpx;background: #51CDCB;color: #fff;">转发</button>
			</view>

		</view>
	</div>
</template>
<script>
	import {
		sendSocketJSON
	} from "@/utils/websocket";

	let myaudio = wx.createInnerAudioContext();
	myaudio.obeyMuteSwitch = false;

	import RightFloat from "@/components/rightFloat"; //
	// import FloatButtons from "@/pages/enterpriSeservices/FloatButtons.vue";
	// import HelpPage from "@/components/HelpPage.vue";
	import SelectorOne from '@/components/selectorOne';
	import GetPhoneNumber from "@/components/getPhoneNumber"; //
	import AddWxCourse from "@/components/addWxCourse";
	import Card_1 from "@/components/card_1"; //
	import Card_2 from "@/components/card_2"; //
	import Card_3 from "@/components/card_3"; //
	import Card_4 from "@/components/card_4"; //
	import Card_5 from "@/components/card_5"; //
	import Card_6 from "@/components/card_6"; //
	import Card_7 from "@/components/card_7"; //
	import FormId from "@/components/formId";
	import AuthorizeBox from "@/components/AuthorizeBox";
	// import login from "@/components/login";
	import DynamicItem from "@/components/dynamicItem"; //个人文章的引入
	// import Dyname from "@/components/dyname";

	import {
		mapActions,
		mapGetters,
		mapMutations
	} from "vuex";
	import WXAJAX from "@/utils/request";
	import util from "@/utils/index";
	import HandleWebsocket from "@/utils/websocket";
	import {
		authSubscribeMessage
	} from "@/utils/auth.js";
	import HandleLogin from "@/utils/handleLogin";
	// import LoginIntercept from "@/components/LoginIntercept";
	import subhead from "@/components/subhead"
	import websocket from "@/utils/websocket";
	import {
		getshare
	} from "@/utils/utils"

	export default {
		components: {
			DynamicItem, //个人文章的组件
			RightFloat,
			Card_1,
			Card_2,
			Card_3,
			Card_4,
			Card_5,
			Card_6,
			Card_7,
			FormId,
			GetPhoneNumber,
			AddWxCourse,
			// FloatButtons,
			// HelpPage,
			SelectorOne,
			// LoginIntercept,
			AuthorizeBox,
			subhead,
			// login,
			// Dyname
		},
		data() {
			return {
				commentIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_comment.png', //转发图片
				shareIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_share.png', //评论图片
				isshowyindao: true, //引导页遮罩层
				introduce: "", //介绍
				seemore: false,
				introHeight: "",
				HelpUrl: 'https://wx.mingyicloud.com/help/test.html',

				//音频列表
				audioArr: {
					id: "0",
					src: "",
					time: "",
					bl: false,
					startTime: 0
				},
				card_type: 1, //名片样式
				type: 0, //0我的名片，1别人名片
				card_msg: {
					//名片信息
					username: "",
					post: "",
					tel: "",
					company_logo: "",
					picchecked: "",
					company: ""
				},
				help: [{
						dynamicId: "449",
						isDrafts: "0",
						isShow: "1",
						type: "5",
						author: "page/index"
					}

				], //帮助
				COMPANYID: 0,
				CARDID: 0,
				playIndex: "",
				moreShow: false,
				self_photos: [],
				isThumbs: 0, //是否点赞
				right_float_show: false, //右边悬浮框
				goType: 0, // 0小程序进入，1分享进入
				hasCard: false, //  是否有名片
				isShowCourse: false,
				chooseClassShow: false,
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
				help: [{
						dynamicId: "449",
						isDrafts: "0",
						isShow: "1",
						type: "5",
						author: "page/index"
					}

				], //帮助
				isShow: true,
				avatarUrl: "", //用户的头像地址,
				isLogin: HandleLogin.returnIsLogin() || false, //是否已经登录
				isShowTalk: true, //是否显示右边侧边栏的聊一聊
				isShowLoginGuide: true, //是否显示登录引导页,
				targetAvatarUrl: "", //当前目标的人物头像
				scrollContentHeight: 0, //中间滚动区域的高度
				mainHeight: 0, //整体高度
				scrollLeft: 0,
				loginShow: false, // 登录弹框显隐
				showLogin: '',
				// headPortrait: "" //获取更改名片后的头像
				isShowAuthorize: false,
				companyGoodsResponses: [],
				cardCodeImg: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/img_card_code.png',
				saveIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/icon_save.png',
				saveIcon2: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_ web_invite_selected.png',

				weixinIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_weixin.png',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_like.png',
				isLikeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_select_like.png',
				editIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/icon_ edit.png',
				editIcon2: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_ edit.png',

				firstLoginIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/img_viewmore.png',
				lockIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_lock.png',
				dayBrowseNum: 0,
				isFirstLogin: wx.getStorageSync('isFirstLogin') || '',
				isCollected: wx.getStorageSync('showBayWindow') || '',
				isBayWindow: false, //飘窗显隐
				hint: '',
				isBind: false,

				shareval: '', //转发文案
				share: false,
				sharebtnx: 334,
				sharebtny: 365,
				staretitle: '', //转发文案
				biaoqianindex: '', //最后选中的标签下标
				mecardtitle: '', //其它职务
				userDefinedTitle: '', //其它职务标题
				dynamic_lists: [], //动态
				article_lists: [], //文章
				userId: '',

				vrList: [], //vr列表
				endPosition: 0,
				startPosition: 0,
				cardNum: 0,
				myCardList: [],
				totalNum: 0,
				nowCardIndex: 0,
				props: ['dynamic_item', 'index1'], //点赞评论
				replayComment: {}, //回复对象
				input_show: false, //评论框的控制
				comments: "",
				shareDynamicId: '',
				shareDynamicPhotos: '',
				shareDynamicTitle: '',
				pay_selectIcon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon/pay.png',
			};
		},


		watch: {
			showLogin(val, old) {
				////console.log(111)
				if (val == true) {
					this.loginShow = true
				}
			},

		},

		async onShareAppMessage(e) {
			let that = this
			if (this.shareDynamicId) {
				let shareId = '';
				var params = {
					dynamicId: this.shareDynamicId,
					shareSource: 2,
				}
				var sharedata = await WXAJAX.POST(params, '', '/share/record/add', 3);

				let path = '/pages/dynamicDetail/main?dynamicId=' + this.shareDynamicId + '&companyId=' + this.COMPANYID + '&cardId=' + this.CARDID +
					'&goType=1&shareId=' + sharedata.shareId + '&readType=' + 2;
				console.log("path", path);
				return {
					imageUrl: this.shareDynamicPhotos,
					title: this.shareDynamicTitle,
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
			} else {
				that.share = false
				// that.shareisshow()//显示隐藏切换
				that.sharexy() //点击转发  把帮助按钮回归初始位置
				const {
					name,
					companyName,
					position
				} = this.currentCompany;
				console.log('name:' + name)
				console.log('companyName:' + companyName)
				console.log('position:' + position)
				let shareSpeech = (this.currentCompany || "").shareSpeech || "";
				try {
					shareSpeech = shareSpeech
						.replace("#name#", name)
						.replace("#company#", companyName);
				} catch (e) {
					console.error("获取分享语出现错误");
				}

				return {
					title: that.shareval,
					path: "/pages/index/main?cardId=" +
						this.CARDID +
						"&companyId=" +
						this.COMPANYID +
						"&goType=1",
				};
			}
		},
		async onLoad(options) {
			let v = this
			let that = this
			if (!this.showLogin) {

			}
			if (options.cardId) {
				wx.setStorageSync("isself", 1)
this.COMPANYID =  options.companyId
this.CARDID =  options.cardId
				//从分享的名片页面进入
				// wx.setStorageSync("COMPANYID", options.companyId);
				// wx.setStorageSync("CARDID", options.cardId);

				////console.log(options.cardId);
				this.goType = options.goType
			} else if (!wx.getStorageSync("COMPANYID") || !wx.getStorageSync("CARDID")) {
				// 在缓存中存在COMPANYID和CARDID标识 通过太阳码扫码进入，在APP.vue中已经设置了COMPANYID和CARDID，则直接查询太阳码扫码进入的名片详情
				// 如果没有，则需要查询默认名片
				this.getAllCard();
			}
			//查询订阅消息



		},
		/** tab点击 */
		onTabItemTap(item) {

			//订阅授权 信息相关
			authSubscribeMessage(this.subscriptionNew);
		},
		onShow() {
			let that = this
			let redirectPage = wx.getStorageSync('redirectPage')

			if (redirectPage.indexOf('pages/dynamicDetail/main') > -1 || redirectPage.indexOf('pages/media/index') > -1) {
				wx.setStorageSync('showLogin', true)
			}
			console.log("redirectPage", redirectPage);
			if (wx.getStorageSync('isLogin')) {
				getshare() //获取分享文案
			}

			this.staretitle = uni.getStorageSync('sharetitle')
			console.log('staretitle', uni.getStorageSync('sharetitle'))
			this.showLogin = wx.getStorageSync('showLogin')
			//获取名片的公司

			let pages = getCurrentPages();
			let currentPage = pages[pages.length - 1];
			let url = `/${currentPage.route}`;
			wx.setStorageSync('pages', url)
			let lastCardId = this.CARDID;
			// this.COMPANYID = wx.getStorageSync("COMPANYID") || 0;
			// this.CARDID = wx.getStorageSync("CARDID") || 0;
			////console.log(wx.getStorageSync("CARDID"));
			this.hasCard = wx.getStorageSync("hasCard");
			this.avatarUrl = this.avatarUrl || "";
			this.isLogin = HandleLogin.returnIsLogin() || false;
			this.isBayWindow = wx.getStorageSync("showBayWindow") || false
			this.getVrlist() //vr
			this.getAllCardList()
			//缓存存储的cardid和当前页面的cardid不相等，或者 当前的card_msg 不存在，或者编辑卡片后返回
			let refreshCard = wx.getStorageSync("refreshCard") || false;
			if (lastCardId !== this.CARDID || !this.card_msg.cardId || refreshCard) {
				wx.removeStorageSync("refreshCard");
				this.inits()
			}

			if (this.avatarUrl && !this.userId) {
				this.loginShow = true
			}



			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			// if(this.isLogin){
			//   this.getMyCard()
			// }
			// isLogin


			this.getdongtai() //获取动态
			this.getwenzhang() //获取文章


		},

		onHide() {
			let that = this
			myaudio.stop();
			this.showLogin = ''
			wx.setStorageSync('pages', '')
			// wx.setStorageSync('showLogin', '')
		},
		async onPullDownRefresh() {
			let that = this
			// to doing..
			// 停止下拉刷新
			// wx.showNavigationBarLoading();
			// this.inits(1);
			// wx.stopPullDownRefresh();
			// setTimeout(function () {
			//     wx.hideNavigationBarLoading();
			// }, 300);
		},

		onPageScroll() {
			let that = this
			this.right_float_show = false;
		},
		computed: {
			...mapGetters(["currentCompany", "subscriptionNew"])
		},
		async mounted() {
			let that = this
			let a = await util.systemIfo();
			this.mainHeight = a.windowHeight;
			this.scrollContentHeight = a.windowHeight - getApp().globalData.navHeight;
		},
		methods: {
			getAllCardList() {
				let v = this;
				// if (v.isLoading) {
				//   return
				// }
				// v.isLoading = true;
				//biaoji meiyou1

				WXAJAX.POST({
					name: '',
					pageNum: v.page,
				}, '', '/businessCard/findMyCards').then((data) => {
					let arr = data.list;
					let newArr = arr.filter((item, index, arr) => {
						return item.auditState != 0
					})
					v.myCardList = newArr

					v.totalNum = v.myCardList.length - 1;
					let cardIdNow = this.CARDID;
					v.nowCardIndex = newArr.findIndex(item => item.cardId === cardIdNow);
					// console.log(v.nowCardIndex,888888888)
					// this.last_searchkey = this.searchkey;
					// state : 1 -- 默认 ， 2 -- 浏览记录 ， 3 -- 自己的



				}).catch((err) => {

				});


			},
			touchStart(event) {
				let v = this;
				// 获取初始时间

				this.startTime = Date.now()
				// 获取初始的位置
				this.startPosition = event.changedTouches[0].clientX
			},
			touchEnd(event) {
				let v = this;
				const endTime = Date.now()
				if (endTime - this.startTime > 2000) {
					// 如果手指滑动的距离超过2s 就默认不合法
					return;
				}
				this.endPosition = event.changedTouches[0].clientX

				// 判断其滑动的距离是否值得触发，给定一个10 的距离

				if (Math.abs(this.endPosition - this.startPosition) > 10) {

					this.endPosition = event.changedTouches[0].clientX
					var elePosition = this.endPosition - this.startPosition > 0 ? "right" : "left"
				} else {

					return;
				}

				if (elePosition == 'left') {
					if (v.nowCardIndex >= v.totalNum) {
						v.nowCardIndex = 0
					} else {
						v.nowCardIndex++
					}
					let cL = v.myCardList[v.nowCardIndex]
					v.comId = cL.companyId
					v.carId = cL.cardId

					v.userId = cL.userId
					v.avatarUrl = cL.logo
					v.username = cL.name
					// wx.setStorageSync('SELFCARDID', carId); /*id*/
					// wx.setStorageSync('userId', userId); /*id*/
					// wx.setStorageSync('avatarUrl', avatarUrl); /*id*/
					// wx.setStorageSync('USERNAME', username); /*id*/
					// wx.setStorageSync('COMPANYID', comId); /*id*/
					// wx.setStorageSync('CARDID', carId); /*id*/
					v.CARDID = carId;
					v.inits()
				} else {

					if (v.nowCardIndex == 0) {

						v.nowCardIndex = v.totalNum
					} else {
						v.nowCardIndex--
					}
					let cL = v.myCardList[v.nowCardIndex]

					v.comId = cL.companyId
					v.carId = cL.cardId

					v.userId = cL.userId
					v.avatarUrl = cL.logo
					v.username = cL.name
					// wx.setStorageSync('SELFCARDID', carId); /*id*/
					// wx.setStorageSync('userId', userId); /*id*/
					// wx.setStorageSync('avatarUrl', avatarUrl); /*id*/
					// wx.setStorageSync('USERNAME', username); /*id*/
					// wx.setStorageSync('COMPANYID', comId); /*id*/
					// wx.setStorageSync('CARDID', carId); /*id*/
					v.CARDID = carId;
					v.inits()
				}

				// wx.setStorageSync('SELFCARDID', cardid);/*id*/
				// wx.setStorageSync('userId', userId);/*id*/
				// wx.setStorageSync('avatarUrl', avatarUrl);/*id*/
				// wx.setStorageSync('USERNAME', username);/*id*/
				// console.log(elePosition)
			},
			//查询VR数据
			getVrlist() {
				let data = {
					cardId: this.CARDID,
					pageNum: 1,
					pageSize: 5,
				}
				WXAJAX.POST(
					data,
					"",
					"/vr/queryListPlatformVrInfo",
					"","",1
				).then(data => {
					if (data.list) {
						this.vrList = data.list.splice(0, 2)
					}
				});
			},
			...mapActions(["setCurrentCompany", "setSubscriptionNew"]),
			...mapMutations(["setEditStatus", "setAvatarUrl"]),
			getwenzhang() {

				//文章
				let v = this
				let that = this
				console.log('请求文章')
				WXAJAX.POST({
						companyId: this.COMPANYID,
						pageNum: 1,
						pageSize: 5,
						refresh: '',
						type: 1,
						createUserId:this.CARDID,
						a: 1
					},
					"",
					"/personal/getDynamicInfo","","",2
				).then((data, code) => {
					console.log('文章列表1', data)
					wx.hideLoading();
					if (data) {
						let nowTime = +new Date(),
							addTime = "",
							diff = 0;

						data.forEach(function(i, k) {
							i.photos = i.photos ? i.photos.split(",") : [];
							i.createTime = util.getdate(i.createTime, "dateTime");
							i.createTime = v.getDateConversion(i.createTime)
							i.createTime = util.getFormatTime(i.createTime, true)
							i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
						});
						for (var i = 0; i < data.length; i++) {
							if (!data[i].originAuthor) {
								data[i].originAuthor = "未知"
							}
						}
						v.article_lists = data;
						// v.article_lists = [...v.article_lists,...data];
						// console.log('...v.dynamic_lists',[...v.dynamic_lists])
						// console.log('v.article_lists',v.article_lists)
						console.log('文章列表',v.article_lists)
					} else {
						v.article_lists = ''
						// wx.showToast({
						//   title: '没有更多信息',
						//   icon: 'success',
						//   duration: 1000
						// })
						// setTimeout(function () {
						//   v.nodata = true ;
						//   v.isLoading = false ;
						// },500);
					}
				}).catch(err => {
					console.log('err', err)
					console.log(4)
				});
			},
			getdongtai() {
				let v = this
				let that = this
				console.log('wx.getStorageSync(COMPANYID)',this.COMPANYID)
				console.log('wx.getStorageSync(CARDID)', this.CARDID)
				//个人动态
				WXAJAX.POST({
						companyId: this.COMPANYID,
						pageNum: 1,
						pageSize: 5,
						refresh: '',
						type: 2,
						createUserId: this.CARDID
					},
					"",
					"/personal/getDynamicInfo","","",2
				).then((data, code) => {
					wx.hideLoading();
					console.log('data', data)
					if (data) {
						let nowTime = +new Date(),
							addTime = "",
							diff = 0;

						data.forEach(function(i, k) {
							console.log('一')
							i.photos = i.photos ? i.photos.split(",") : [];
							console.log('二')
							i.createTime = util.getdate(i.createTime, "dateTime");
							console.log('三')
							i.createTime = v.getDateConversion(i.createTime)
							console.log('四')
							i.createTime = util.getFormatTime(i.createTime, true)
							console.log('五')
							i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
						});
						v.dynamic_lists = [...data];
						// v.page++;
						// setTimeout(function () {
						//   v.isLoading = false;
						// }, 500);
					} else {
						v.dynamic_lists = ''
						// wx.showToast({
						//   title: '没有更多信息',
						//   icon: 'success',
						//   duration: 1000
						// })
						// setTimeout(function () {
						//   v.nodata = true ;
						//   v.isLoading = false ;
						// },500);
					}
				}).catch(err => {
					console.log(444)
					console.log('err', err);
				});
			},

			toDetail(item) { //查看文章详情
				let that = this
				console.log('查看文章详情')
				const {
					companyId,
					cardId
				} = this.currentCompany;
				let url = '../dynamicDetail/main?dynamicId=' + item.dynamicId + '&companyId=' + item.companyId + '&cardId=' + item.cardId;
				wx.navigateTo({
					url: url
				})
			},
			// 点击转发，评论，点赞，
			// dynamic_detail(id) {
			//   console.log(id)
			//   return
			//   this.$emit('dynamic_detail', id);
			// },
			// operate_tap(index1) {
			//   this.$emit('operate_tap', index1)
			// },
			// addComment() {
			//   const { companyId, cardId } = this.currentCompany;
			//   let url = '../commentDetail/main?dynamicId=' + this.dynamic_item.dynamicId + '&companyId=' + companyId + '&cardId=' + cardId;
			//   wx.navigateTo({ url: url })
			// },
			// addCommentA(index1, replayComment = {}) {
			//   this.$emit('addCommentA', index1, replayComment);
			// },
			// zan1(index1, isThumbs) {//点赞
			// console.log('点赞1111',)
			//   this.$emit('zan', index1, isThumbs, this.dynamic_item.dynamicId);
			// },
			getMore() {
				wx.showLoading();
				WXAJAX.POST({
						pageSize: 10,
						pageNum: parseInt(this.dynamic_item.commentModelList.length / 10) + 1,
						dynamicId: this.dynamic_item.dynamicId,
					}, '', '/personal/selectComment')
					.then(res => {
						wx.hideLoading();
						this.$emit('getMoreComment', res, this.index1);
					});
			},
			previewImage(src) {
				let source = this.checkImgNameIsNumber(src) ? src : (src + '.primary.png');
				let sourceArr = this.dynamic_item.photos.map(val => this.checkImgNameIsNumber(val) ? val : (val +
					'.primary.png'));
				wx.previewImage({
					current: source,
					urls: sourceArr
					// urls必须是数组 不然会报错
				})
			},

			detail_tap(type) {
				console.log(type)
				if (type == 2) {
					this.addComment()
				} else if (type == 1 || 3) {
					this.toDetail()
				}
			},
			clearPage() {
				//页面还原
				console.log("clearpage");
				this.input_show = false;
				this.comment_focus = false;
				this.comments = "";
				console.log(1111222233333);
				try {
					this.$set(
						this.dynamic_lists[this.add_comments_index],
						"operate_show",
						false
					);
				} catch (e) {}
			},
			addComment(dynamicId) {
				let that = this
				console.log(111)
				console.log(this.currentCompany)
				const {
					companyId,
					cardId
				} = this.currentCompany;
				let url = '../../commentDetail/main?dynamicId=' + dynamicId + '&companyId=' + companyId + '&cardId=' + cardId;
				wx.navigateTo({
					url: url
				})
			},
			// 添加评论
			addCommentA(index1, replayComment) {
				console.log('评论a', index1)
				// article
				var article_lists = this.article_lists[index1]
				//添加评论
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
				this.input_show = true;
				this.replayComment = replayComment;
				// this.comment_focus = true ;
				this.add_comments_index = index1;
				let v = this;
				console.log('评论', v.article_lists[index1])
				setTimeout(function() {
					v.$set(v.article_lists[index1], "operate_show", false);
					v.comment_focus = true;
				}, 200);
			},
			inputgetFocus(that, e) {
				//input框focus时
				let v = this;
				/*
				                if(v.keyboard_height == 0) {
				                    wx.getSystemInfo({
				                        success(res) {
				                            let tabbar = res.screenHeight - res.windowHeight ;
				                            v.keyboard_height = e.target.height - tabbar + 'px';
				                        }
				                    });
				                }*/
				/*   v.comment_focus = false ;
				   setTimeout(function () {
				       v.comment_focus = true ;
				   },100)*/
				/*   this.emoji_show = false ;
			let v= this ;
			console.log('commentFocus')
			v.comment_focus = false ;
			setTimeout(function () {
			    // v.comment_focus = true ;
			},100)*/
			},
			inputConfirm() {
				let that = this
				console.log('add_comments_index', this.add_comments_index)
				let dynamic_lists = that.article_lists[that.add_comments_index]
				console.log('',dynamic_lists)
				//输入完成
				this.emoji_show = false;
				this.comment_focus = false;
				authSubscribeMessage(this.subscriptionNew);
				WXAJAX.POST({
						dynamicId: this.article_lists[this.add_comments_index].dynamicId,
						parentId: this.replayComment.commentId || 0,
						cardId: this.currentCompany.cardId || this.CARDID || 0,
						text: this.comments
					},
					"",
					"/personal/doComment"
				).then(res => {
					console.log('输入完成',res)
					let comments = this.article_lists[this.add_comments_index];
					comments.commentModelList = comments.commentModelList ?
						comments.commentModelList : [];
					if (
						comments.commentModelList.length < 10 ||
						comments.commentNum > comments.commentModelList.length
					) {
						this.article_lists[this.add_comments_index].commentModelList.push({
							text: this.comments,
							replyName: this.replayComment.userName || "",
							userName: wx.getStorageSync("USERNAME")
						});
						this.article_lists[this.add_comments_index].commentNum = this.article_lists[this
							.add_comments_index].commentModelList.length
						console.log('评论次数',this.article_lists[this.add_comments_index].commentNum)
						this.$set(
							this,
							"article_lists",
							JSON.parse(JSON.stringify(this.article_lists))
						);
					}
					this.input_show = false;
					this.comments = "";
				});
		},
		// 点击隐藏评论
		conceal() {
			// console.log(11111222222)
			this.input_show = false;
		},

		//解决ios时间格式兼容问题
		getDateConversion(data) {
			let phoneSystem = "";
			wx.getSystemInfo({
				success: function(res) {
					phoneSystem = res.system;
				}
			});
			if (phoneSystem.indexOf("iOS") != -1) {
				data = data.replace(/-/g, "/");
			}
			return Date.parse(data);
		},
		tovr() {
			// let url = encodeURIComponent('https://720vr.colorpush.cn/tour/918376b6bc6d05d2')
			let url = encodeURIComponent('http://shop.mingyicloud.com/webpage/#/pages/index/index')

			console.log(url)
			// console.log("../help/webView?url=" +this.HelpUrl)
			// router.push('pages/help/webView?url=https://720yun.com/t/ddvkcqdl0iy?scene_id=66167768#scene_id=66167768')
			uni.navigateTo({
				url: `/pages/help/webView?url=${url}`
			})
		},
		add() {
			// this.shareval
			if (!this.shareval) {
				uni.showToast({
					title: "转发文案未填写",
					infoType: 0,
				})
			}

			// WXAJAX.POST(
			//   {pageSize:5,pageNum:1},
			//   "",
			//   "/ownShareTitleInfo/queryList",'3'
			// )
			WXAJAX.POST({
					shareTitleInfoContent: this.shareval,
					infoType: 0,
					contentRank: 1,
					itemId: ''
				},
				"",
				"/ownShareTitleInfo/add", '3'
			).then(data => {
				// let selfCard = null;
				// let defaultCard = null;
				// state : 1 -- 默认 ， 2 -- 浏览记录 ， 3 -- 自己的
				if (data) {
					getshare() //获取分享文案
					this.staretitle = uni.getStorageSync('sharetitle')
					uni.showToast({
						title: "保存成功",
						infoType: 0,
					})

				}
			}).catch(err => {
				console.log('错误', err)
			});
		},
		goSeeMe() {
			if (wx.getStorageSync('isself') != 1) {
				wx.navigateTo({
					url: '../seeMe/seeMe',
				});
			}

		},
		radioChange(e) {
			console.log(1)
			let that = this
			// 没定好是用单选框做还是用view的标签做  所以两种方式都做了
			if (Object.keys(e).length > 0) {
				that.shareval = e.detail.value
			}
			if (e.currentTarget.dataset.val) {
				that.shareval = e.currentTarget.dataset.val
				that.biaoqianindex = e.currentTarget.dataset.index
			}
		},
		helpxy(x, y) {
			let that = this
			console.log(12)
			that.$nextTick(function() {
				that.sharebtnx = x
				that.sharebtny = y
			})
		
		},
		sharexy() { //点击转发之后  把帮助按钮回归到初始位置
			let that = this
			console.log(2, that.sharebtnx)
			if (that.sharebtnx != 334) {
				that.sharebtnx = 334
			}
			if (that.sharebtny != 365) {
				that.sharebtny = 365
			}
		},
		shareisshow() { //分享弹窗显示隐藏
			console.log(112)
			let that = this
			that.share = !that.share
			const {
				name,
				companyName,
				position
			} = this.currentCompany;
			this.shareval = `您好，我是${companyName || ""}的${position || ""}${name || ""}，敬请惠存!`;
			console.log(that.share)
		},
		closeModel() {
			this.$set(this, 'chooseClassShow', false);
		},
		/**
		 * 获取用户信息
		 * @param e
		 * @constructor
		 */

		GetUserInfo(e) {
			authSubscribeMessage(this.subscriptionNew);
			let _v = this;
			// wx.getUserInfo({
			//   success(res) {
			//   },
			//   fail(res) {
			//     _v.noPermission = true;
			//   }
			// });

			// const msg = e.target;
			wx.getUserProfile({
				desc: '为了更好的为您服务！',
				success: (msg) => {
					if (!msg.rawData || !msg.signature || !msg.encryptedData || !msg.iv) {
						this.loginFailed();
						return;
					}
					HandleLogin.login(
						data => {
							HandleLogin.setLoginMessageInStorage(data, false);
							// 进入首页，则需要连接websocket
							if (data.cardId) {
								this.getSelfCard(data.cardId)
							}
							HandleWebsocket.connectWebsocket();
							this.loginSuccess();
						},
						() => {
							this.loginFailed();
						}, msg
					);
				},
			})

			console.log(this.userInfo);
		},
		choose_tap(url, name) {
			if (!wx.getStorageSync('SELFCARDID')) {
				wx.showToast({
					title: '请先创建自己的名片',
					icon: 'none',
					duration: 2000 //持续的时间
				})
				setTimeout(function() {
					wx.navigateTo({
						url: "/pages/enterpriSeservices/chooseIdentity/main?goType=1"
					});
				}, 1000);
				return;
			}
			authSubscribeMessage(this.subscriptionNew);
			// this.choose_class_id = id;
			this.chooseClassShow = false;

			console.log(`/pages/clientAdd/main?type=userAdd&goType=1&cardId=${this
          .currentCompany.cardId || ""}&userId=${this.currentCompany.userId ||
          ""}&ipaCustomer=` + url);
			if (!HandleLogin.returnIsLogin()) {
				this.loginGuide();
				return;
			}
			// zlz
			if (url == 1) {
				//存为客户
				util.toMiniProgram(
					`/pages/clientAdd/main?type=userAdd&goType=1&cardId=${this
           .currentCompany.cardId || ""}&userId=${this.currentCompany.userId ||
           ""}`
				);
				// wx.navigateTo({
				//   url:
				//     "../clientAdd/main?type=userAdd&goType=1&cardId=" +
				//     this.currentCompany.cardId +
				//     "&userId=" +
				//     this.currentCompany.userId +
				//     "&ipaCustomer=" +
				//     url
				// });
			} else {
				wx.navigateTo({
					url: "../mailAdd/main?cardId=" +
						this.currentCompany.cardId +
						"&userId=" +
						this.currentCompany.userId +
						"&cId=" +
						this.currentCompany.companyId
				});
			}
		},

		getAllCard() {
			//biaoji meiyou1
			WXAJAX.POST({
					name: "",
					pageNum: 1
				},
				"",
				"/businessCard/seeDetail"
			).then(data => {
				let selfCard = null;
				let defaultCard = null;
				// state : 1 -- 默认 ， 2 -- 浏览记录 ， 3 -- 自己的
				if (data) {
					for (let index = 0; index < data.list.length; index++) {
						if (selfCard || defaultCard) {
							break;
						}
						const i = data.list[index];
						const cardData = {
							picchecked: i.logo || '',
							username: i.name || '',
							tel: i.phone || '',
							wx: i.personalWx || '',
							company_wx: i.companyWx || '',
							email: i.email || '',
							post: i.position || '',
							company: i.companyName,
							company_logo: i.companyLogo,
							cardId: i.cardId,
							companyId: i.companyId,
							recordId: i.recordId,
							shareSpeech: i.shareSpeech || '',
						};
						if (i.state === 3) {
							selfCard = cardData;
						} else if (i.state === 1) { //默认名片
							if (defaultCard == null) {
								defaultCard = cardData;
							}
						}
					}
					if (selfCard) {
						console.log('selfCard', selfCard);

						this.CARDID = selfCard.cardId;
						// wx.setStorageSync("CARDID", selfCard.cardId);
						// wx.setStorageSync("COMPANYID", selfCard.companyId);
						wx.setStorageSync("SELFCARDID", selfCard.cardId);
						wx.setStorageSync("SELFCOMPANYID", selfCard.companyId);
					} else if (defaultCard) {
						this.CARDID = defaultCard.cardId;
						// wx.setStorageSync("CARDID", defaultCard.cardId);
						// wx.setStorageSync("COMPANYID", defaultCard.companyId);
					}

					if (this.CARDID) {
						this.inits(1);
					}
				}
			}).catch(err => {
				console.log('错误', err)
				if (err.code == 401) {
					this.islogin = false;
				}
			});
		},
		scrollviewRight() {
			this.scrollLeft += 280;
		},

		//获取手机号
		getPhoneNumber(e) {
			if (this.phone) return;

			if (!e.target.encryptedData) {
				return;
			}
			WXAJAX.POST({
						phoneData: e.target.encryptedData,
						phoneIv: e.target.iv
					},
					"",
					"/home/getWxPhone"
				)
				.then(res => {
					wx.setStorageSync("phone", res);
					this.setPhone(res);
					this.phone = res;
					this.makePhone();
				})
				.catch(err => {
					////console.log("获取手机号出错：", err);
				});
		},
		//查询订阅消息
		getSubscription() {
			//固定公司主体查询 解决订阅消息没有按小程序主体设计的bug
			WXAJAX.POST({
					companyId: WXAJAX.smartMainId
				},
				"",
				"/subscription/getComanySub"
			).then(data => {
				//存放到store
				this.setSubscriptionNew(data);
			});
		},
		//下拉刷新
		scrolltoupper(e) {
			// wx.showLoading({
			// title: '获取最新数据中',
			// });
			// this.inits(1);
		},
		clickOne() {
			////console.log("click");
		},
		clickRightRowEvent() {
			this.isShow = !this.isShow;
		},
		//隐藏登录引导
		cancelLoginGuide() {
			this.isShowLoginGuide = false;
		},
		//需要登录引导的回调
		loginGuide() {
			this.isShowLoginGuide = true;
		},
		//帮助
		// tohelp(){
		//   wx.navigateTo({
		//     url:
		//       "../help/webView?url=" +this.HelpUrl
		//   });
		// },
		//聊一聊
		talk() {
			let that = this
			authSubscribeMessage(this.subscriptionNew);
			if (this.currentCompany.userId && this.currentCompany.cardId) {
				wx.navigateTo({
					url: "../IM/main?userId=" +
						this.currentCompany.userId +
						"&logo=" +
						this.currentCompany.logo +
						"&type=2&cardId=" +
						this.currentCompany.cardId +
						"&name=" +
						this.currentCompany.name +
						"&companyId=" +
						this.currentCompany.companyId +
						"&wxCode=" +
						(this.currentCompany.personalWx || "") +
						"&phone=" +
						this.currentCompany.phone
				});
			}
		},
		//头像登录成功的回调
		loginSuccess(url) {
			this.loginShow = false
			this.loginInterceptSuccess();
			this.findCardDetail(1);
			this.isLogin = HandleLogin.returnIsLogin() || false;
		},
		// 其他监听事件登录 成功回调
		loginInterceptSuccess() {
			this.isLogin = HandleLogin.returnIsLogin() || false;
			this.hasCard = wx.getStorageSync("hasCard") || false;
			this.avatarUrl = wx.getStorageSync("avatarUrl") || "";
			let SELFCOMPANYID = wx.getStorageSync("SELFCOMPANYID") || '';

			if (!SELFCOMPANYID) {
				this.getSelfCard()
			}
			////console.log(this.avatarUrl)
		},
		getSelfCard() {
			let that = this
			WXAJAX.POST('', '', '/businessCard/getUserCard')
				.then(data => {
					console.log('data', data)
					let {
						pluralistic
					} = data //获取名片更多头衔数据
					console.log('首页获取名片数据', pluralistic)
					if (pluralistic != undefined) {
						that.mecardtitle = JSON.parse(pluralistic)
						console.log('写入页面完成', that.mecardtitle)
						wx.setStorageSync("mecardtitle", pluralistic);
					} else {
						that.mecardtitle = ''
						// console.log('写入页面完成',that.mecardtitle)
						wx.setStorageSync("mecardtitle", '');
					}
					if (data.cardId && data.companyId) {
						wx.setStorageSync("SELFCARDID", data.cardId);
						wx.setStorageSync("SELFCOMPANYID", data.companyId);
					}
				})
				.catch(err => {
					//console.log("名片错误：", err);
				});
		},
		loginFailed() {
			this.isShowLoginGuide = true;
		},
		toShowBill() {
			authSubscribeMessage(this.subscriptionNew);
			if (!HandleLogin.returnIsLogin()) {
				this.loginGuide();
				return;
			}

			wx.navigateTo({
				url: "/pages/showBill/main?cardId=" + this.CARDID
			});
		},
		showVideo(index) {
			authSubscribeMessage(this.subscriptionNew);
			this.playIndex = index;
		},
		inits(refresh) {
			this.findCardDetail(refresh);
		},
		findCardDetail(refresh) {
			let that = this

			let url = "/businessCard/cardDetails";
			console.log('isself:' + wx.getStorageSync('isself'))
			if (wx.getStorageSync('isself') == 2) {
				url = "/businessCard/myCardDetails";
			}

			//获取数据
			wx.showLoading({
				mask: true
			});
			WXAJAX.POST({
						userId: this.userId,
						cardId: that.CARDID,
						refresh: refresh || ""
					},
					"",
					url,"","",2
				).then((data, code) => {
					wx.hideLoading();
					if (data) {

						if (data.soundRecording) {
							that.audioArr = {
								bl: false,
								time: data.soundTime || 0,
								id: 1,
								src: data.soundRecording
							};
						} else {
							that.audioArr = {
								bl: false,
								time: 0,
								id: 1,
								src: ""
							};
						}
						//获取名片头衔数据
						let {
							pluralistic,
							userDefinedTitle
						} = data
						console.log('首页获取自定义其它职务标题', userDefinedTitle)
						console.log('首页获取名片数据', pluralistic)
						if (userDefinedTitle) {
							this.userDefinedTitle = userDefinedTitle
						}
						if (pluralistic != undefined) {
							that.mecardtitle = JSON.parse(pluralistic)
							console.log('写入页面完成', that.mecardtitle)
							wx.setStorageSync("mecardtitle", pluralistic);
						} else {
							that.mecardtitle = '';
							wx.setStorageSync("mecardtitle", '');
						}
						//切换更换头像
						that.dayBrowseNum = data.dayBrowseNum  //今日加的人数
						that.card_msg = {
							cardId: data.cardId,
							companyId: data.companyId,
							picchecked: data.logo || "",
							username: data.name || "",
							tel: data.phone || "",
							wx: data.personalWx || "",
							company_wx: data.companyWx || "",
							email: data.email || "",
							post: data.position || "",
							company: data.companyName,
							company_logo: data.companyLogo,
							browseNum: data.browseNum || 0,
							thumbsNum: data.thumbsNum,
							address: data.address || "",
							browsePhoto: data.browsePhoto ? data.browsePhoto.split(",") : []
						};
						wx.setStorageSync("currentUserId", data.userId);
						that.queryHotGoods(data.cardId);

						that.hint = data.hint || ''
						that.isBind = data.isBind || ''
						that.introduce = data.briefIntroduction || "";
						that.self_photos = data.photo ? data.photo.split(",") : ['暂无'];

						that.card_msg.browsePhoto.splice(2, 2)
						that.card_type = data.style;
						// console.log(that.card_type,99999999999)
						that.type = data.isMyCard;
						that.userId = data.userId;
						/*封：20210224 start-zlz*/
						// if(wx.getStorageSync('isself')==2){
						//   that.type = 0;
						// }else{
						//   that.type = 1;
						// }
						/*封：20210224 end-zlz*/
						that.isThumbs = data.isThumbs;
						console.log("type", that.type)

						wx.setStorageSync("CARDTEL", data.phone);
						that.getSubscription(); //查询订阅消息
						that.getdongtai(); //获取名片动态
						that.getwenzhang() //获取名片文章
						that.setCurrentCompany(data);
						if (that.currentCompany.userId === wx.getStorageSync("userId")) {
							// this.isShowTalk = false;
							that.isShowTalk = true;
							that.targetAvatarUrl = that.currentCompany.logo;
						} else {
							that.isShowTalk = true;
							that.targetAvatarUrl = that.currentCompany.logo;
						}
						that.$nextTick(() => {
							that.getIntroHeight();
						});
					}
				})
				.catch(err => {
					//this.card_msg = {};
					console.log(err);
					wx.hideLoading();
				});
		},
		toCardCase() {
			authSubscribeMessage(this.subscriptionNew);
			//名片夹
			wx.redirectTo({
				url: "../cardCase/main"
			});
		},
		getIntroHeight() {
			let v = this;
			wx.createSelectorQuery()
				.select(".introduce")
				.boundingClientRect(function(rect) {
					if (!rect) return;

					if (rect.height < 107) {
						v.moreShow = false;
					} else {
						v.moreShow = true;
					}
					v.introHeight = rect.height + "px";
				})
				.exec();
		},
		//音频播放
		audioPlay(e) {
			var that = this,
				id = e.currentTarget.dataset.id,
				key = e.currentTarget.dataset.key,
				audioArr = that.audioArr,
				vidSrc = audioArr.src;

			if (!vidSrc) {
				return;
			}
			myaudio.src = vidSrc;
			myaudio.autoplay = true;
			myaudio.startTime = 0;

			//切换显示状态
			that.$set(that.audioArr, "bl", true);
			// audioArr.bl = true;

			//开始监听
			myaudio.onPlay(() => {
				that.audioArr = audioArr;
			});

			//结束监听
			myaudio.onEnded(() => {
				audioArr.bl = false;
				myaudio.stop();
				myaudio.destroy();
				myaudio = wx.createInnerAudioContext();
				myaudio.obeyMuteSwitch = false;
				that.$set(that.audioArr, "bl", false);
			});
		},
		// 音频停止
		audioStop(e) {
			var that = this,
				key = e.currentTarget.dataset.key,
				audioArr = that.audioArr;
			//切换显示状态
			audioArr.bl = false;

			myaudio.stop();
			myaudio.destroy();
			myaudio = wx.createInnerAudioContext();
			myaudio.obeyMuteSwitch = false;
		},
		createCode() {
			if (!HandleLogin.returnIsLogin()) {
				this.loginGuide();
				return;
			}
			WXAJAX.POST({
						cardId: this.CARDID
					},
					"",
					"/businessCard/getWxTwoCode"
				)
				.then(data => {
					wx.navigateTo({
						url: "/pages/my/cardCode/main?code=" + data
					});
				})
				.catch(err => {
					wx.hideLoading();
				});
		},
		page_turn(url) {
			authSubscribeMessage(this.subscriptionNew);
			//名片夹
			if (url === "cardCode") {
				wx.setStorageSync({
					wxCodeMsg: {
						name: this.card_msg.name,
						logo: this.card_msg.logo,
						company_logo: this.card_msg.company_logo,
						post: this.card_msg.post
					}
				});
				wx.navigateTo({
					url: "../" +
						url +
						"/main?companyId=" +
						this.COMPANYID +
						"&cardId=" +
						this.CARDID
				});
			} else {
				wx.navigateTo({
					url: "../" + url + "/main"
				});
			}
			// wx.redirectTo({url:'../'+url+'/main'})
		},
		uploadpic(type) {
			//card2 选择公司图片
		},
		createCard() {
			authSubscribeMessage(this.subscriptionNew);
			// if(!HandleLogin.returnIsLogin()){
			//     this.loginGuide();
			//     return ;
			// }

			// this.toCreatePage();//zlz：原来是创建名片打开crm小程序

		},
		SaveToCustomer() {
			authSubscribeMessage(this.subscriptionNew);
			if (!HandleLogin.returnIsLogin()) {
				this.loginGuide();
				return;
			}
			//存为客户
			util.toMiniProgram(
				`/pages/clientAdd/main?type=userAdd&goType=1&cardId=${this
          .currentCompany.cardId || ""}&userId=${this.currentCompany.userId ||
          ""}`
			);
		},
		updateMyCard() {
			authSubscribeMessage(this.subscriptionNew);
			if (!HandleLogin.returnIsLogin()) {
				this.loginGuide();
				return;
			}
			let type = "edit";
			this.setEditStatus(type);
			wx.navigateTo({
				url: "../editCard/main?type=edit"
			});
		},
		addToAddressBook() {
			//添加到通讯录
			authSubscribeMessage(this.subscriptionNew);
			wx.addPhoneContact({
				firstName: this.card_msg.username,
				mobilePhoneNumber: this.card_msg.tel,
				organization: this.card_msg.company,
				success: function(res) {
					////console.log("success", res);
				},
				fail: function(err) {
					////console.log(err);
				}
			});
		},
		makePhone() {
			//拨打电话
			authSubscribeMessage(this.subscriptionNew);
			this.addCallsPhoneRecord(this.card_msg.cardId); // 好像没用，是underfind
			util.MakePhone(this.card_msg.tel || "");
		},
		addWx() {
			//添加微信
			authSubscribeMessage(this.subscriptionNew);
			let v = this;
			if (v.card_msg.wx) {
				wx.setClipboardData({
					data: v.card_msg.wx,
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

		// previewImage(src) {//不知道当初从哪复制过来的干啥的  先注释吧，采用下面同名事件
		//   authSubscribeMessage(this.subscriptionNew);
		//   if(src){
		//     //点击图片放大
		//     var v = this;
		//     console.log('v.self_photos',v.self_photos)
		//     wx.previewImage({
		//       current: src,
		//       urls: v.self_photos
		//       // urls必须是数组 不然会报错
		//     });
		//   }
		// },
		previewImage(urls) { //点击图片全屏预览
			wx.previewImage({
				urls: [urls + '.primary.png']
			})
		},
		doThumbs() {
			//点赞
			authSubscribeMessage(this.subscriptionNew);
			util.isLogin({
				isLogin: this.isLogin,
				success: res => {
					wx.showLoading();
					WXAJAX.POST({
							cardId: this.CARDID
						},
						"",
						"/businessCard/doThumbs","","",2
					).then(data => {
						this.isThumbs = data;
						wx.hideLoading();
						//this.$set(this.card_msg, "thumbsNum", ++this.card_msg.thumbsNum);
						//出现负数 bug 因此只能增加点赞数量 不能取消
						if (!this.isThumbs) {
							if (this.card_msg.thumbsNum > 0) {
								this.$set(
									this.card_msg,
									"thumbsNum",
									--this.card_msg.thumbsNum
								);
							} else {
								this.$set(this.card_msg, "thumbsNum", 0);
							}
						} else {
							this.$set(this.card_msg, "thumbsNum", ++this.card_msg.thumbsNum);
						}
					});
				}
			});
		},
		shareTo(id, photos, title) {
			this.shareDynamicId = id;
			this.shareDynamicPhotos = photos;
			this.shareDynamicTitle = title;
			console.log("shareDynamicId", this.shareDynamicId, photos, title);
		},
		zan(index1, isThumbs, dynamicId) { //点赞组件
			console.log('点赞',index1)
			//点赞
			let isLogin = HandleLogin.returnIsLogin();
			if (!isLogin) {
				uni.showToast({
					title: "请先登录,才可以点赞喔",
					icon: "none"
				});
				return;
			}

			let v = this;
			wx.showLoading();
			WXAJAX.POST({
						dynamicId: dynamicId,
						cardId: wx.getStorageSync("CARDID")
					},
					"",
					"/personal/doDynamicThumbs"
				)
				.then(data => {
					console.log('点赞1111', v.article_lists)
					wx.hideLoading();
					if (data) {
						//点赞
						v.article_lists[index1].doThumbsName.push(data); //添加人名
						v.$set(v.article_lists[index1], "isThumbs", 1);
						v.$set(
							v.article_lists[index1],
							"doThumbsNum",
							v.article_lists[index1].doThumbsNum +=1
						);
					} else {
						v.article_lists[index1].doThumbsName.pop();
						v.$set(v.article_lists[index1], "isThumbs", 0);
						v.$set(
							v.article_lists[index1],
							"doThumbsNum",
							v.article_lists[index1].doThumbsNum -= 1
						);
					}
					let status = !v.article_lists[index1].operate_show;
					v.$set(v.article_lists[index1], "operate_show", status);

				})
				.catch(err => {
					console.log(err);
					wx.hideLoading();
				});
		}, //点赞组件
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
		//取消登录
		cancelLogin() {
			this.loginShow = false
		},
		collected_tap(v) {
			let data = !v

		},
		async queryHotGoods() {
			if (this.card_msg && this.card_msg.cardId != 0 && this.card_msg.cardId) {
				//关闭热销商品查询
				let data = await WXAJAX.POST({
						cardId: this.card_msg.cardId
					},
					"",
					"/businessCard/getCardHotGoods"
				);
				if (data) {
					this.companyGoodsResponses = data;
					//处理金额 保留2位小数
					//.toFixed(2)
					this.companyGoodsResponses.forEach(item => {
						var price = item.price / 100;
						item.price = price.toFixed(2);
					})
				} else {
					this.companyGoodsResponses = [];
				}
			}
		},
		selectGoods(goods) {
			if (goods.goodsId) {
				wx.navigateTo({
					url: "../../../companyPack/prodDetail/main?goodId=" + goods.goodsId
				});
			}
		},

	},
	};
</script>
<style>
	/* 动态列表样式 */
	.picture-list {
		flex-wrap: wrap;
	}

	.picture-list div {
		overflow: hidden;
		margin-right: 10upx;
		margin-top: 6upx;
	}

	.picture-list img {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.picture-list div:nth-child(3n) {
		margin-right: 0;
	}

	.picture-list div:nth-child(1),
	.picture-list div:nth-child(2),
	.picture-list div:nth-child(3) {
		margin-top: 0;
	}

	/* 动态样式结束 */
	.more-info {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		height: 262upx;
		width: 30upx;
		background: white;
		/* box-shadow: 0px 0px 20upx 0px rgba(56, 56, 56, 0.1); */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.more-info .left-img {
		width: 10upx;
		height: 20upx;
	}

	.operation-box {
		margin-left: 130upx;
		margin-right: 20upx;
	}

	.business_card {
		position: absolute;
		box-sizing: border-box;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		padding-top: 0;
		width: 132upx;
	}

	.business_card p {
		writing-mode: tb-rl;
	}

	.index {
		position: relative;
	}

	.user-btn-group>* {
		margin: 0;
	}

	.card_menu {
		position: relative;
	}

	.scroll-list {
		width: 567upx;
		white-space: nowrap;
		padding: 20upx 40upx 20upx 20upx;
	}

	.scroll-list>div {
		white-space: nowrap;
		box-sizing: border-box;
	}

	.self_introduce {
		/* min-height: 214upx; */
		transition: 0.1s;
		overflow: hidden;
	}

	.self_introduce.higher {
		height: auto;
	}

	.output-audio {
		width: 334upx;
		height: 80upx;
		position: relative;
		margin-right: 22upx;
	}

	.audio::before {
		content: "";
		display: block;
		width: 20upx;
		height: 20upx;
		background: #f5f5f6;
		position: absolute;
		border: 1upx solid #e8e8e8;
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
		background: #f5f5f6;
		border: 1upx solid #e8e8e8;
		position: relative;
		height: 30upx;
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

	.edit-btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.card-case {
		position: fixed;
		right: 0;
		top: 40upx;
		z-index: 999;
	}

	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: transparent;
	}

	/*定义滚动条轨道 内阴影+圆角*/
	/* ::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 20upx transparent;
  border-radius: 20upx;
  background-color: transparent;
} */

	/*定义滑块 内阴影+圆角*/
	/* ::-webkit-scrollbar-thumb {
  border-radius: 20upx;
  -webkit-box-shadow: inset 0 0 20upx transparent;
  background-color: transparent;
} */

	video {
		width: 100%;
		height: 388upx;
		border-radius: 10upx 10upx 0 0;
	}

	.firstVideo {
		width: 100%;
	}

	.firstVideo div {
		line-height: 60upx;
	}

	.notFirstVideo {
		width: 336upx;
		margin-top: 20upx;
		border-radius: 10upx 10upx 0 0;
	}

	.notFirstVideo video {
		height: 188upx;
	}

	.notFirstVideo div {
		line-height: 48upx;
	}

	.create-card {
		align-items: stretch;
	}

	.browsing-history {
		width: 17upx;
	}

	.newNub {
		position: relative;
	}

	.newl-added {
		position: absolute;
		color: #51CDCB;
		top: 18.5upx;
		right: -38upx;
		/* right: -85upx; */
	}

	.seen_peo {
		position: relative;
	}

	.seen_peo_dot {
		display: block;
		position: absolute;
		top: -12upx;
		left: 40upx;
		background-color: #FD634E;
		width: 17upx;
		height: 17upx;
		z-index: 106;
		border-radius: 50%;
	}

	.companyLogo {
		border-radius: 50%;
	}
</style>
<style scoped>
	.forward {
		padding: 0 185upx 0 185upx;
	}

	.first-login-img {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
	}

	.photos img {
		margin-top: 25rpx;
	}

	.input-hide {
		height: 0;
	}
	.wenzhang {
		width: 96%;
		margin: 0 auto;

		box-shadow: rgb(167, 225, 221) 2rpx 2rpx 6px 4rpx;
		border-radius: 6px;
	}
	.ccyc{
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
</style>
