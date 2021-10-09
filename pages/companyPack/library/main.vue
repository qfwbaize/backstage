<template>
	<div class="borderbox bgfff h100p posre ">
		<!-- <div class="borderbox fix_top bgblue" :style="{height:navHeight,paddingTop:navTop,paddingBottom:'10px'}">
    	<div class="disflex align-cen h100p jscen">
        <img @click="goBack()" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mine/back.png" alt="" class="w18 h18 posab" style="left:40rpx;">
    		<div class="fs15 cfff fbold">机构文库</div>
    	</div>
    </div> -->
		<div class="disflex jsbet h100p" style="position: relative;">
			<div class="h100p items fs14" style="background-color: #F5F5F5;width: 166rpx;">
				<div :class="tabType == 1 ? 'active' : ''" @click="tab_type_tap(1)">机构文章</div>
				<div :class="tabType == 2 ? 'active' : ''" @click="tab_type_tap(2)">机构视频</div>
				<div :class="tabType == 3 ? 'active' : ''" @click="tab_type_tap(3)">机构图片</div>
				<div style="border-bottom: dashed   1px #000000;" :class="tabType == 4 ? 'active' : ''"
					@click="tab_type_tap(4)">机构文件</div>
				<!-- 左侧导航的新增文件图标 -->
				<div style="color: #00D7D0; font-weight: bold; margin-left: -40rpx;" @click="archives"
					v-if="isBoss == true">
					<div class='' style="">添加文件夹</div>
				</div>
				<!-- 新增文件类目 -->
				<scroll-view scroll-y='true' style="height: 600rpx;">
					<div v-for="(itm,index) in navlist " :key="itm.cardId" v-if="activess == true">
						<div id="Folder" :class="tabType == (itm.customFolderId + 2) ? 'actives' : ''"
							@click="tab_type_tap((itm.customFolderId + 2),index)">
							{{itm.folderName}}
						</div>
					</div>
				</scroll-view>
			</div>
			<div v-if="tabType == 1" class="" style="width: 584rpx; background-color: #DCDCDC;">
				<scroll-view :style="{height: scrollContentHeight+'px'}" class="dynamic-content" :scroll-y="true"
					:enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper'
					@scrolltolower="scrolltolower">
					<div class="disflex jsaround align-cen fs12 bgc0  h40 w584" style="color: rgb(1, 196, 161);">
						<div class="disflex align-cen ml-10" @click="adtions">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-settings.svg"
								mode="" class="w24 h24"></image>
							<div class="ml10">管理当前文件夹</div>
						</div>
						<div @click="article" class="disflex align-cen">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-cloud_upload.svg"
								mode="" class="w24 h24"></image>
							<div class="ml10">写文章</div>
						</div>
					</div>

          <view class="search">
          	<view class="searchicon">
          		<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/greensearch.png" mode="">
          		</image>
          	</view>
            <input confirm-type="search" v-model="searchVal" type="text" placeholder-style=" color: #1EC4B9;" placeholder="搜索文章"	 />
          </view>

          <view class="screen fs12">
              <view class="active">附近</view>
              <view class="">城市</view>
              <view class="">机构</view>
          </view>

					<!-- 列表 -->
					<div v-for="info in articleList" :key="info.dynamicId ">
						<!-- 列表 -->
						<div v-if="info.isShow == 0 || info.isShow == 1" class="disflex jsaround  pt10 align-cen pr12  w290 h76 bgc0 mt11">
							<img @click="goDetail(info.dynamicId)"
								style="width: 120rpx;height: 116rpx;border-radius: 12rpx;" :src="info.photos" alt="">
							<div class="disflex jsbet flex-column" style="height: 115rpx;width:380rpx;">
								<div class="disflex">
									<span class="over_2 fs13" style="width: 300rpx;">{{info.title}}</span>
									<span @click="showlist(info.dynamicId)" class="fs12 review " style=";"
										v-if="info.isShow==0">审核中</span>
									<span @click="showlist(info.dynamicId)" class="fs12 review " style=";"
										v-if="info.isShow==2">审核未通过</span>
									<!-- <span class="fs12 review2" v-else></span> -->
								</div>
								<div class="fs12 disflex jsbet cb8">{{info.createTime}}由{{info.name}}添加
									<!--弹出弹窗 -->
									<p class='w24 h24  mt-75 arr' v-if="">
										<image v-if="info.isShow ==1" @click="setisshow(info.dynamicId)" class="imgsize" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-more-2-fill.svg" mode="">
										</image>
										<image v-else @click="showlist(info.dynamicId)" class="imgsize"
											src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-more-2-fill.svg"
											mode="">
										</image>
									</p>

								</div>
							</div>
						</div>
					</div>
				</scroll-view>
			</div>
			<div v-if="tabType == 2" class=" " style="width: 584rpx; background-color: #DCDCDC;">
				<scroll-view :style="{height: scrollContentHeight+'px'}" class="dynamic-content " :scroll-y="true"
					:enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper'
					@scrolltolower="scrolltolower">
					<div class="disflex jsaround align-cen fs12 bgc0  h40 w584" style="color: rgb(1, 196, 161);">
						<div class="disflex align-cen" @click="adtions">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-settings.svg"
								mode="" class="w24 h24"></image>
							<div class="ml10">管理当前文件夹</div>
						</div>
						<div @click="Videojump" class="disflex align-cen">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-cloud_upload.svg"
								mode="" class="w24 h24"></image>
							<div class="ml10">上传视频</div>
						</div>
					</div>
					<div v-for="(info,index) in video_list" :key="index">
						<div class="mt10 " style="margin-left: 32rpx;" @click="toviedoinfo(info)"
							v-if="info.isShow == 1">
							<video :poster="info.coverImg" @play="playVideo" :id="'myVideo' + index"
								style="width: 522rpx;height: 450rpx;" class="bradius5" :src="info.url"></video>
						</div>
						<div class="mt10 " style="margin-left: 32rpx;" v-else @click="NODetails">
							<video :poster="info.coverImg" @play="playVideo" :id="'myVideo' + index"
								style="width: 522rpx;height: 450rpx;" class="bradius5" :src="info.url"></video>
						</div>
						<div class="disflex jsbet  h49 fs12 lh49  bgfff">
							<p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
								{{info.uploadTime}}由{{info.userName}}上传
								<span @click="showlist(info.dynamicId)" class="fs12 review " style="margin-left: 6rpx;"
									v-if="info.isShow==0">审核中</span>
								<span @click="showlist(info.dynamicId)" class="fs12 review " style="margin-left: 6rpx;"
									v-if="info.isShow==2">审核未通过</span>
							</p>
							<p v-if="info.isShow == 1" class="fbold" style="color:rgba(1, 196, 161, 1);min-width:80rpx;"
								@click="videodel(index)">
								删除</p>
							<p v-else class="fbold" style="color:rgba(1, 196, 161, 1);min-width:80rpx;"
								@click="showlist(info.dynamicId)">
								删除</p>

							<!-- <div class="disflex jsbet">
								<button class="w70 h30 lh25 textc fs14" open-type="share"
									style="background-color:#00D7D0;color:#FFFFFF;border-radius:5px;padding:3px 4px 0px 4px;">发起转发</button>
							</div> -->
						</div>
					</div>





				</scroll-view>
			</div>
			<div v-if="tabType == 3" class=" " style="width: 584rpx; background-color: #DCDCDC;">
				<scroll-view :style="{height: scrollContentHeight+'px'}" class="dynamic-content " :scroll-y="true"
					:enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper'
					@scrolltolower="scrolltolower">
					<div class="disflex jsaround align-cen fs12 bgc0  h40 w584" style="color: rgb(1, 196, 161);">
						<div class="disflex align-cen" @click="adtions">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-settings.svg"
								mode="" class="w24 h24"></image>
							<div class="ml10">管理当前文件夹</div>
						</div>
						<div @click="uploadpic" class="disflex align-cen">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-cloud_upload.svg"
								mode="" class="w24 h24"></image>
							<div class="ml10">上传图片</div>
						</div>
					</div>

					<div v-for="(info,index) in video_data" :key="index" class="bgfff mt10">
						<div class="disflex jsbet  align-cen pr12   h100F">
							<image style="width: 480rpx; height: 480rpx; margin-left: 50rpx; margin-top: 20rpx;"
								class="bradius5" :src="info.photos" mode="">
							</image>
						</div>
						<div class="disflex jsbet  align-cen h49 fs12 c38  " style="margin-left: 20rpx;">
							<p class="fs12"
								style="width: 360rpx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
								{{info.createTimeStr}}由{{info.author}}上传
							</p>
							<!-- <span class="fs12 review " style="margin-right: 10rpx;" @click="showlist(info.dynamicId)" v-if="info.isShow==0">审核中</span> -->
							<p class="fbold" style="color:rgba(1, 196, 161, 1);min-width: 80rpx;margin-right: 10rpx;"
								@click="imgdel(index)">删除</p>
							<!-- <view class="" @click="featno()"
								style="background-color: #00D7D0;color: #FFFFFF;border-radius: 10rpx;padding: 8rpx 8rpx 8rpx 8rpx;">
								生成海报
							</view> -->
						</div>
					</div>

				</scroll-view>
				<!-- 弹出框 -->
				<view class="" v-show="!popup">
					<view class=""
						style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);">
					</view>
					<view class="warn">
						<view class="" style="display: flex;flex-direction:column;">
							<view class="" style="display: flex;flex-direction:row-reverse;margin-bottom: 10rpx;">
								<view class="shutoff" @click="featno()">x</view>
							</view>
							<view class="">
								<!--   style="background-image: url(https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/posterbackground.png);background-size:526rpx 680rpx;background-repeat: no-repeat;width: 526rpx;height: 680rpx;" -->
								<view class="large">
									<image class="compiler"
										src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ze-edit@3x.png"
										@click="addimg()" mode=""></image>
									<image style="width:100%;height: 500rpx;display: block;" v-if="negative"
										:src=negative mode="">
									</image>
								</view>
								<view class=""
									style="display: flex;flex-direction:row;background-color: #FFFFFF;align-items: center;">
									<view class="">
										<view class="large">
											<view class="compiler" @click.stop="addtitle()">
												<image style="width: 40rpx;height: 40rpx;"
													src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ze-edit@3x.png"
													mode=""></image>
											</view>
											<!-- <textarea class="inputbox" value="titlelist" v-model="titlelist" /> -->
											<view class="inputbox fs10">{{titlelist}}</view>
										</view>
									</view>
									<image style="height: 180rpx;width: 180rpx;margin-left: 20rpx;"
										src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210226/1614345293847.png"
										mode="">
									</image>
								</view>
							</view>
							<view class="preservation" @click="saveposter()">保存海报</view>
						</view>
					</view>
				</view>
				<!-- 图片弹出框 -->
				<view class="" v-show="!ishowchangepng">
					<view class="" @click="addimg()"
						style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);">
					</view>
					<view class="warnone">
						<view class="" style="display: flex;flex-direction: column;">
							<view class="alter">更改图片</view>
							<view class=""
								style="display: flex;flex-direction: row;justify-content: space-around;margin-top: 30rpx;">
								<view class="" @click="getalbum()">
									<image
										src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/fas fa-image@3x.png"
										style="width: 100rpx;height: 100rpx;" mode=""></image>
									<view class="wen">相册图库</view>
								</view>
								<view class="">
									<image style="width: 100rpx;height: 100rpx;"
										src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-perm_media@3x.png"
										mode=""></image>
									<view class="wen">海报图库</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 文案弹出框 -->
				<view class="" v-show="!ishowcopywriting">
					<view class=""
						style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);"
						@click="addtitle()"></view>
					<view class="warnone">
						<view class="" style="display: flex;flex-direction: column;">
							<view class="" style="display: flex;flex-direction: row;justify-content: space-between;">
								<view class="cancelsave" style="color: #8D8D8D;" @click="addtitle()">取消</view>
								<view class="alter">更改文案</view>
								<view class="cancelsave" style="color: #27C6BB;margin-right: 20rpx;"
									@click="keepcopy()">保存</view>
							</view>
							<view class="">
								<textarea class="inputcopy" value="titlelist" v-model="titlelist" :maxlength="30"
									:data-maxnum="reason.length+'/30'" />
							</view>
							<view class="anothercopy">
								<view class="plusign">+</view>
								<view class="" style="font-size: 34rpx;color: #00D7D0;">选择其他文案</view>
							</view>
						</view>
					</view>
				</view>
			</div>
			<div v-if="tabType == 4" class=" " style="width: 584rpx; background-color: #DCDCDC;">
				<scroll-view :style="{height: scrollContentHeight+'px'}" class="dynamic-content " :scroll-y="true"
					:enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper'
					@scrolltolower="scrolltolower">
					<div class="disflex jsaround align-cen fs12 bgc0  h40 " style="color: rgb(1, 196, 161);">
						<div class="disflex align-cen" @click="adtions">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-settings.svg"
								mode="" class="w24 h24"></image>
							<div class="ml10">管理当前文件夹</div>
						</div>
						<div class="disflex align-cen">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-cloud_upload.svg"
								mode="" class="w24 h24"></image>
							<div class="ml10" @click="toUploadFile">去上传</div>
						</div>
					</div>
					<div v-for="(info,index) in filelist" :key="index">
						<div class="disflex  mt10 align-cen pr12  bgfff h100 ml3" style="">
							<img @click="toDetailz(info)" style="width: 120rpx;height: 116rpx;border-radius: 12rpx;"
								:src="info.imgurl" alt="">
							<div class="disflex  flex-column ml10" style="height: 115rpx;">
								<div class="disflex jsbet align-cen">
									<span @click="toDetailz(info)" class="fs14 articleTitle over_1"
										style="width: 200rpx;">{{info.title}}</span>
									<span class="fs12 review " style="margin-left: -6rpx;"
										v-if="info.isShow==0">审核中</span>
								</div>
								<div class="fs12 disflex jsbet fs10 mt20" style="width: 400rpx;">
									<P>{{info.filetime}}由{{info.author}}添加</P>
									<p class="fbold" style="color:rgba(1, 196, 161, 1);min-width: 80rpx;"
										@click="filedel(index)">删除</p>
								</div>
							</div>
						</div>
					</div>
				</scroll-view>
			</div>
			<div v-if="tabType == j " class=" " style="width: 584rpx; background-color: #DCDCDC;">
				<scroll-view :style="{height: scrollContentHeight+'px'}" class="dynamic-content " :scroll-y="true"
					:enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper'
					@scrolltolower="scrolltolower">
					<div class="disflex jsaround align-cen fs12 bgc0  h40 w584" style="color: rgb(1, 196, 161);">
						<div class="disflex align-cen" @click="adtion">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-settings.svg"
								mode="" class="w24 h24"></image>
							<div class="ml10">管理当前文件夹</div>
						</div>
						<div @click="choice" class="disflex align-cen">
							<image
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-cloud_upload.svg"
								mode="" class="w24 h24"></image>
							<div class="ml10">上传</div>
						</div>
					</div>

					<div v-for="(info,index) in customlist" :key="index" class="">
						<div class="disflex   align-cen pr12 mt15  bgfff h100 ml3 " style="">
							<img @click="downloadFile(index)"
								style="width: 120rpx;height: 116rpx;border-radius: 12rpx; margin-left: 5px;"
								:src="info.imgurl" alt="">
							<div class="disflex  flex-column ml10" style="height: 115rpx;">
								<div class="disflex jsbet align-cen">
									<span class="fs14 articleTitle over_1" style="width: 220rpx;">{{info.title}}</span>
									<span class="fs12 review " style="margin-left: 6rpx;"
										v-if="info.isShow==0">审核中</span>
								</div>
								<div class="fs12 disflex jsbet fs10 mt20" style="width: 400rpx;">
									<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" class="">
										{{info.filetime}}由{{info.author}}添加</span>
									<p class="fbold" style="color:rgba(1, 196, 161, 1);min-width: 80rpx;"
										@click="filedel(index)">删除</p>
								</div>
							</div>
						</div>
					</div>
				</scroll-view>
			</div>
		</div>
		<!-- 	<SHARE v-if="share==true" :dynamicId="dynamicId" :companyId="companyId" saveType='1' @closeShare="closeShare">
		</SHARE> -->


		<view v-if="Administration == true">
			<div class="Mask" @click="actAtion"> </div>
			<div class="shareDivs">
				<div class=" w100p disflex jsaround mt15">
					<div class="fs14 lh30"> 文件夹名称</div>
					<input v-model="mag" type="text" class="inpes fs14" placeholder="输入文件夹名称" />
				</div>
				<div class="w100p disflex jsaround mt25 pb10">
					<div class="fs14 lh30 ml15">文件夹权限</div>
					<input @click="input" type="text" :value="names" class="inps ml20 fs14" placeholder="选择以下联系人" />
					<!-- <button type="" class="btns fs14" @click="button">完成设置</button> -->
					<div class="btns fs12" @click="button()">完成设置</div>
				</div>
				<div class="w100p h180 bgfff b1s" style="overflow: hidden; overflow-y: auto;" v-if='drop == true'>
					<!-- 管理成员列表 -->
					<ul v-for="(v,index) in member" :key="index">
						<li class="uls disflex jsbet">
							<div class="">
								<image class="w40 h40  bradius50p  mt10" :src="v.logo" mode=""></image>
							</div>
							<div class="fs14 ml10 " style="margin-top: 32rpx;"> {{v.name}}</div>
							<div class="">
								<checkbox-group class="uni-list" @change="checkboxChange(index)"
									style="margin-top: 20rpx;">
									<label class="uni-list-cell uni-list-cell-pd">
										<view>
											<checkbox value="" :checked="v.checked"></checkbox>
										</view>
									</label>
								</checkbox-group>
							</div>
						</li>
					</ul>
				</div>
				<div class="fs14  w100p h60  lh20 textc bgfff corange" style="border-radius: 0 0  10rpx 10rpx;"
					@click="del">删除当前文件夹</div>
			</div>
		</view>

		<!-- 自定义文件的详情 -->
		<div class="" v-if='chiose == true'>
			<div class="Masks" @click='chioce1'></div>
			<div class="shareDives">
				<button style="margin-top: 50%;" v-if="videoimg == 0" @click="copyBtn">一键复制在浏览器下载</button>
				<video style="width: 100%;height: 100%; " v-if="videoimg == 1" :src="videourl" controls></video>
				<image style="width: 100%;height: 100%;" v-if="videoimg == 2" :src="videourl" mode=""></image>
			</div>
		</div>
		<POPUP @fuck="getfuck" v-if="(isshow == 1)" @click="closeSh" :name="name" :url="url" :time="time" :tit='tit'
			:dynamicId='dynamicId' :companyId='companyId' :saveType='1' :type='type'></POPUP>
	</div>
</template>

<script>
	import POPUP from '@/components/popup'
	import SHARE from '@/components/share' //转发
	import WXAJAX from "@/utils/request";
	import util from '@/utils/index';
	export default {
		components: {
			SHARE,
			POPUP
		},
		data() {
			return {
				imgisLoading: false,
				visLoading: false,
				isLoading: false,
				delid: '', //机构文件和自定义文件删除的id
				videotime: '', //视频分割后的时间
				timeStr: '', //图片分割后的时间
				customFolderId: '',
				number2: 7,
				number: 4, //上传默认为4  自定义改为8
				activess: false,
				imgurl: '',
				filename: '', //文件名字
				filepath: '', //文件地址
				filelist: [], //文件
				i: 0, //下标
				imgBackUrl: '', //上传的图片
				mag: '',
				msg: '',
				j: 0,
				index: '',
				isBoss: '',
				chiose: false,
				drop: false,
				Administration: false,
				page: 1,
				articleList: '',
				video_data: '',
				video_list: [], //视频列表
				tabType: 1,
				navHeight: '',
				navBarUserHeight: '',
				scrollContentHeight: 0,
				navTop: '',
				share: false,
				allLength: '',
				searchkey: '',
				queryType: 1, //1、最新，2、最多
				type: 1, //
				dynamicId: '',
				companyId: '',
				photos: '',
				title: '',
				isshow: 0, //1==显示弹窗  0==关闭弹窗
				// 给弹窗的参数
				url: '', //图片地址
				name: '', //姓名
				tit: '', //标题
				time: '', //时间
				navlist: [], //新建文件夹的列表
				member: [{
					name: '张三',
					checked: false,
					cardId: 1
				}, {
					name: '李斯',
					checked: false,
					cardId: 2
				}, {
					name: '王五',
					checked: false,
					cardId: 3
				}, {
					name: '赵四',
					checked: false,
					cardId: 4
				}, {
					name: '刘能',
					checked: false,
					cardId: 5

				}, {
					name: "谢大脚",
					checked: false,
					cardId: 6
				}],
				upload: [{
						title: '写文章',
						url: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-book-mark.png'
					},
					{
						title: '上传图片',
						url: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-inser.png',
					},
					{
						title: '上传视频',
						url: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/play-circle.png'
					}, {
						title: '上传文件',
						url: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-file.png'
					}
				],
				popup: true, //控制弹出框的显隐
				ishowchangepng: true, //控制更改图片的显隐
				ishowcopywriting: true, //控制更改文案的显隐
				titlelist: '欢迎来到我的小程序111111111',
				imgLists: '', //二维码图片
				listimg: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/posterbackgroundimg.png', //模板
				negative: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210525/626aca391e6a78a81a228d49f1910c07.jpg', //底片照片
				custom: 'file', //上传的类型默认为只能上传除音频视频之外的
				customlist: [], //自定义文件上传的一切文件
				progress: '', //下载进度
				videoimg: 0,
				videourl: "", //弹窗视频地址
				videoContextList: [],
				video: 0,
				names: [],
				cardId: [],
				lastPage: '',
			}
		},
		/** tab点击 */
		onTabItemTap(item) {
			//订阅授权 信息相关
		},
		onLoad(option) {
			this.calculateNavBarHeight()
			this.getqueryList(); //查询新建文件的权限
			this.navlist.push(option)
			// console.log(this.navlist);
			this.getisBOSS() //判断当前是否是boss号
			this.getCompanyStaffList() //查询当前机构的成员列表
			this.tab_type_tap(1);
		},
		onShow() {

		},
		onPullDownRefresh() {
			this.page = 1;
			this.data = [];
			wx.stopPullDownRefresh()
		},
		onReachBottom() {
			console.log('上拉')

		},
		onShow() {

    },
		onHide() {},
		async mounted() {
			let a = await util.systemIfo();
			let navHeight = getApp().globalData.navHeight;
			this.scrollContentHeight = a.windowHeight;
		},
		async onShareAppMessage(e) {
			wx.showLoading();
			let shareId = '';
			var that = this
			if (this.preciseRewardAmount <= 0) {
				wx.showToast({
					title: "奖励金额必须大于0！",
					icon: "none",
					duration: 2000
				});
				return;
			}
			var sharedata = await WXAJAX.POST({ //添加分享记录
				dynamicId: this.dynamicId,
				shareSource: 1,
			}, '', '/share/record/add', '', '', 1)

			let path = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + this.dynamicId + '&companyId=' + wx
				.getStorageSync(
					'COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' + '&shareId=' + sharedata
				.shareId;
			console.log("path", path);
			wx.hideLoading();
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
		},
		computed: {},
		methods: {
      //跳转到上传文件页面
      toUploadFile(){
        uni.navigateTo({
        	url: '../../demand/uploadFile/uploadFile'
        })
      },
			showlist(dynamicId) {
				if (uni.getStorageSync("isBoss") == true) {

					uni.navigateTo({
						url: './examine?dynamicId=' + dynamicId
					})
				} else {
					uni.showToast({
						title: '当前账号没有权限查看',
						icon: "none"
					})
				}
			},
			NODetails() {
				uni.showToast({
					title: '正在审核中不可查看详情',
					icon: 'none'
				})
			},
			NOdel() {
				uni.showToast({
					title: "正在审核中不可删除",
					icon: "none"
				})
			},
			// 视频详情
			toviedoinfo(info, index) {
				var videoContext = wx.createVideoContext("myVideo" + index, this);
				videoContext.pause();
				let id = info.videoId
				let companyId = info.companyId
				wx.navigateTo({
					url: `../../companyPack/videodetails/videodetails?videoId=${id}&companyId=${companyId}`
				});
			},
			checkboxChange(i) {
				console.log(i);
				let v = this
				this.member[i].checked = !this.member[i].checked
				for (let i = 0; i < this.member.length; i++) {
					if (this.member[i].checked == true) {
						let bosscardid = wx.getStorageSync("cardId")
						v.cardId.push(v.member[i].cardId, bosscardid)
						v.names.push(v.member[i].name)
						v.names = [...new Set(v.names)]
						v.cardId = [...new Set(v.cardId)]
					} else if (this.member[i].checked == false) {
						v.names.splice(i, 1)
						v.cardId.splice(i, 1)
					}
				}
				console.log(v.cardId, "权限人员id");

			},
			goDetail(i) {
				console.log(i);
				uni.navigateTo({
					url: `../../article/articleDetail/index?id=` + i
				})
			},
			Videojump() {
				uni.navigateTo({
					url: "/pages/buyVideo/editVideo/main?type=wkadd"
				})
			},
			article() {
				uni.navigateTo({
					url: '/pages/article/editArticle/main'
				})
			},
			copyBtn() {
				let v = this
				wx.setClipboardData({
					data: v.progress,
					success(res) {
						wx.getClipboardData({
							success(res) {
								console.log(res) // data
							}
						})
					}
				})
			},
			//自定文件的查看详情与下载
			downloadFile(i) {
				let v = this
				let fileimgname = this.customlist[i].title.split(".")
				console.log(fileimgname[1]);
				if (fileimgname[1] == "pdf" || fileimgname[1] == "xlsx" || fileimgname[1] == "docx" || fileimgname[1] ==
					"zip" || fileimgname[1] == "txt") {

					this.chiose = true
					this.progress = this.customlist[i].photos
					this.videoimg = 0
				} else if (fileimgname[1] == "mp4") {
					this.chiose = true
					this.videoimg = 1
					this.videourl = this.customlist[i].photos
				} else
				if (fileimgname[1] == "jpg" || fileimgname[1] == "png") {
					v.chiose = true
					v.videoimg = 2
					v.videourl = v.customlist[i].photos
				}
			},
			// 删除视频
			videodel(id) {
				if (this.isBoss == false) {
					uni.showToast({
						title: "当前账号非boss请联系boss删除",
						icon: 'none'
					})
				} else {
					let companyId = this.video_list[id].companyId
					// console.log(this.video_list[id].isShow,"开始的靠近哪里看");
					let isShow = this.video_list[id].isShow
					let videoId = this.video_list[id].videoId
					console.log(companyId, videoId, '视频id和机构id');
					let v = this
					uni.showModal({
						title: '提示',
						content: '是否要刪除视频',
						success: function(res) {
							if (res.confirm) {
								wx.showLoading()
								WXAJAX.POST({
										companyId: companyId,
										videoId: videoId
									}, '', '/shortVideo/deleteById')
									.then((data, code) => {
										wx.showToast({
											title: '删除成功',
											duration: 2000,
											icon: "none"
										});
										v.getqueryCompanyService()
									})
							} else if (res.cancel) {
								console.log("取消删除");
							}
						}
					});

				}
			},
			// 删除上传的文件
			filedel(i) {
				if (uni.getStorageSync("isBoss") == false) {
					uni.showToast({
						title: "当前账号非Boos号不可删除",
						icon: "none"
					})
				} else {
					console.log(i);
					let v = this
					if (this.custom == "file") {
						this.delid = this.filelist[i].dynamicId
					} else if (this.custom == "all") {
						this.delid = this.customlist[i].dynamicId
					}
					uni.showModal({
						title: '提示',
						content: '确定删除该文件',
						success: function(res) {
							if (res.confirm) {
								WXAJAX.POST({
									dynamicId: v.delid,
								}, '', '/company/delDynamicInfo').then((data) => {
									wx.showToast({
										title: '删除成功！',
										icon: 'success'
									});
									// 刷新列表
									v.filelist.splice(v.filelist.indexOf(i), 1);
									v.getfilelist()
								})
								// v.getfilelist()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}


			},
			uploadFils() {
				let v = this
				wx.chooseMessageFile({
					count: 1,
					type: this.custom,
					success(res) {
						let filepath = res.tempFiles[0].path
						let name = res.tempFiles[0].name
						v.uploadFileS(filepath, name)
					}
				})
			},
			// 上传到
			uploadFileS(path, name) {
				let v = this;
				wx.showLoading({
					mask: true
				});
				return WXAJAX.UploadImage(path).then((data) => {
					wx.hideLoading();
					data = JSON.parse(data);
					if (data.code == '200') {
						// console.log(data);
						this.imgBackUrl = data.data
						this.filename = name
						this.getFile()
					} else {
						wx.showToast({
							title: '网络异常',
							duration: 2000,
							icon: 'none'
						})
					}
				}).catch((err) => {
					wx.hideLoading();
					console.log('err -- ', err);
				})
			},
			// 发布文件
			async getFile() {
				let url = '/dynamic/addDynamicInfo';
				let imgBackUrls = (WXAJAX.imgBackUrl + this.imgBackUrl)
				let data = {
					companyId: wx.getStorageSync("COMPANYID"),
					type: this.number,
					photos: imgBackUrls,
					title: this.filename,
					isDrafts: 0,
					isOrgShow: 1,
					customFolderId: this.customFolderId
				}
				console.log(data, 'data');
				await WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
					// console.log(res, '发布自定义文件');
				})
				this.getfilelist()

			},
			// 查询文件
			getfilelist() {
				let than = this
				let url = '/dynamic/listCompanyDynamic'
				let data = {
					type: this.number,
					queryType: this.queryType,
					pageNum: this.page,
          pageSize:10,
					customFolderId: this.customFolderId,
          isShows:[0,1]
				}
				WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
					if (res) {
						if (this.custom == "file") {
							if (this.page == 1) {
								this.filelist = res.list
							} else {
								this.filelist = [...this.filelist, ...res.list]
							}
							console.log(this.filelist, '机构文件上传固定文件');
							for (let i = 0; i < res.list.length; i++) {
								this.filelist[i].filetime = this.filelist[i].createTimeStr.split(" ")[0]
								this.filelist[i].fileimg = this.filelist[i].title.split(".")[1]
								if (this.filelist[i].fileimg === "pdf") {
									this.filelist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-file.png"
								} else if (this.filelist[i].fileimg === "docx") {
									this.filelist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/word.png"
								} else if (this.filelist[i].fileimg === "xlsx") {
									this.filelist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/excel.png"
								} else if (this.filelist[i].fileimg === "txt") {
									this.filelist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-124-document-file-zip@3x.png"
								} else if (this.filelist[i].fileimg === "zip") {
									this.filelist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-124-document-file-zip@3x.png"
								}
							}
							// console.log(this.filelist, "文件列表");

						} else if (this.custom == "all") {
							this.customlist = res.list
							// if (this.page == 1) {
							// 	this.customlist = res.list
							// } else {
							// 	this.customlist = [...this.customlist, ...res.list]
							// }
							console.log(this.customlist, "自定义上传的文件");
							for (var i = 0; i < this.customlist.length; i++) {
								this.customlist[i].fileimgname = this.customlist[i].title.split('.')[1];
								this.customlist[i].filetime = this.customlist[i].createTimeStr.split(' ')[0]
								if (this.customlist[i].fileimgname === "pdf") {
									this.customlist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-file.png"
								} else if (this.customlist[i].fileimgname === "docx") {
									this.customlist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/word.png"
								} else if (this.customlist[i].fileimgname === "xlsx") {
									this.customlist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/excel.png"
								} else if (this.customlist[i].fileimgname === "jpg" || this.customlist[i]
									.fileimgname === "png") {
									this.customlist[i].imgurl = this.customlist[i].photos
								} else if (this.customlist[i].fileimgname === "mp4") {
									this.customlist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/play-circle.png"
								} else if (this.customlist[i].fileimgname === "txt") {
									this.customlist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-124-document-file-zip@3x.png"
								} else if (this.customlist[i].fileimgname === "zip") {
									this.customlist[i].imgurl =
										"https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-124-document-file-zip@3x.png"
								}
							}
						}
					} else {
						console.log("没有更多数据了");

						this.customlist = ""
					}

				}).catch((err) => {
					console.log(err, "err----");
				})
			},
			// 删除机构图片
			imgdel(i) {
				if (uni.getStorageSync("isBoss") == false) {
					uni.showToast({
						title: "当前账号非Boss号不可删除",
						icon: 'none'
					})
				} else {
					console.log(i);
					let id = this.video_data[i].dynamicId
					let v = this
					uni.showModal({
						title: '提示',
						content: '确定删除该图片',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定')
								WXAJAX.POST({
									dynamicId: id,
								}, '', '/company/delDynamicInfo').then((data) => {

									v.getnamic()

									wx.showToast({
										title: '删除成功！',
										icon: 'success'
									});


								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});

				}

			},
			// 机构视频
			getqueryCompanyService() {
				let companyId = wx.getStorageSync('SELFCOMPANYID') ? wx.getStorageSync('SELFCOMPANYID') : wx
					.getStorageSync('COMPANYID');
				let url = "/shortVideo/queryPage"
				let data = {
					companyId: companyId,
					pageNum: this.page,
					pageSize: 5,
					isOrgShow: 1,
          isShows:[0,1]
					// isLibrary: 1
				}

				WXAJAX.POST(data, '', url, '', '', 2).then((res) => {
					console.log(res, '查看视频');
					this.lastPage = res.lastPage
					if (res.list) {
						res.list.forEach(function(i, k) {
							i.uploadTime = i.uploadTime.split(" ")[0];
						});
						if (this.page == 1) {
							this.video_list = res.list
						} else {
							this.video_list = [...this.video_list, ...res.list]
						}
						this.init()
					} else {
						this.video_list = ""
					}

				}).catch(err => {
					this.visLoading = true
				});
			},
			init() {
				for (var i = 0; i < this.video_list.length; i++) {
					const video = uni.createVideoContext("myVideo" + i, this);
					this.videoContextList.push(video);
				}
			},
			//视频暂停
			playVideo(e) {
				var that = this;
				var id = e.currentTarget.id;
				for (var i = 0; i < that.video_list.length; i++) {
					if (id === 'myVideo' + i) {
						//console.log('播放视频不做处理');
					} else {
						//console.log('暂停其他正在播放的视频');
						var videoContext = wx.createVideoContext("myVideo" + i, that);
						videoContext.pause();
					}
				}

			},
			// 关闭选择上传文件类型的弹窗
			chioce1() {
				this.chiose = false
				this.videoimg = 0
			},
			// 统一上传可选择任意类型文件视频图片
			choice() {
				this.uploadFils()
			},
			// 判断房前是否是老板号
			getisBOSS() {
				this.isBoss = wx.getStorageSync('isBoss')
			},
			// 查询新建文件的权限
			async getqueryList() {
				let companyId = wx.getStorageSync('SELFCOMPANYID') ? wx.getStorageSync('SELFCOMPANYID') : wx
					.getStorageSync('COMPANYID');
				let url = '/org/folder/authority/queryList'
				let data = {
					companyId: companyId
				}
				await WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
					console.log(res, '查询机构自定义文件夹权限列表');
					if (res == undefined) {
						this.activess = false
					} else {
						this.activess = true
						this.navlist = res
					}
				})
			},
			// 查询成员列表
			getCompanyStaffList() {
				let _url = "/businessCard/getCompanyStaffList"
				let data = {
					pageNum: 1,
					type: 1
				}
				WXAJAX.POST(data, '', _url, '', '').then(res => {
					this.member = res.list
					console.log(this.member, '成员列表');
				})
			},
			// 删除当前文件
			del() {
				console.log(this.customlist, "上传的文件列表");

				let v = this
				uni.showModal({
					title: '提示',
					content: '是否删除当前文件夹',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							if (v.customlist) {
								uni.showToast({
									title: "该文件夹下还有文件不可删除",
									icon: "none"
								})
								v.Administration = false

							} else {
								let i = v.index
								let url = '/org/folder/del'
								let data = {
									customFolderId: v.navlist[i].customFolderId,
									isDel: 1
								}
								WXAJAX.POST(data, '', url, '', '', 1).then(res => {
									console.log(res, '删除当前文件');
								})
								wx.redirectTo({
									url: '/pages/companyPack/library/main'
								})

							}

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});


			},
			// 跳转到新增文件页面
			archives() {
				wx.navigateTo({
					url: '../archicve/archicve'
				})
			},
			getchange(e) {
				console.log(e);
			},
			input() {
				this.drop = true
			},
			button() {
				this.drop = false;
				for (var j = 0; j < this.member.length; j++) {
					if (this.member[j].checked == true) {
						this.member[j].name
						this.msg = this.member[j].name
					} else {
						this.msg = ''
					}
				}

				let i = this.index
				let customFolderId = this.navlist[i].customFolderId
				console.log(customFolderId, "任务组件id");
				// this.customFolderId = customFolderId

				let _url = "/org/folder/update"
				let data = {
					customFolderId: customFolderId,
					folderName: this.mag
				}
				WXAJAX.POST(data, "", _url, "", "", 1).then(res => {
					this.setbatchAdd()
					// 关闭管理当前文件弹窗
					this.Administration = false
					// getqueryList
					// 重新调取自定义文件列表
					this.getqueryList()

				})
			},
			// 文件权限更改
			setbatchAdd() {
				console.log(this.cardId, "谁可以看见文件夹");
				if (this.cardId == "") {
					return
				} else {
					let url = "/org/folder/authority/batchAdd"
					let _data = {
						customFolderId: this.customFolderId,
						listCardIds: this.cardId,
					}

					WXAJAX.POST(_data, "", url, "", "", 1).then((res) => {
						console.log(res, "1");
					})
				}


			},
			// 管理文件弹窗
			adtion() {
				this.Administration = true
				let than = this
				console.log(than.tabType);
				let i = this.index
				than.mag = this.navlist[i].folderName
			},
			adtions() {
				uni.showModal({
					title: '提示',
					content: '这是默认文件不可删除',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			actAtion() {
				this.Administration = false
			},
			// 图片
			async uploadpic(count) {
				let path = await util.chooseImage('file', count);
				if (Object.prototype.toString.call(path) !== '[object Array]') return;
				this.uploadImgFun(path, 0)
			},

			async uploadImgFun(arr, index = 0) {
				// console.log(arr, '这是图片arr');
				await this.uploadImg(arr[index])
				if (index < arr.length - 1) {
					this.uploadImgFun(arr, index + 1)
				}
			},
			uploadImg(path) {
				let v = this;
				wx.showLoading({
					mask: true
				});
				return WXAJAX.UploadImage(path).then((data) => {
					wx.hideLoading();
					data = JSON.parse(data);
					if (data.code == '200') {
						this.imgBackUrl = data.data
						this.getimg()
					} else {
						wx.showToast({
							title: '网络异常',
							duration: 2000,
							icon: 'none'
						})
					}
				}).catch((err) => {
					wx.hideLoading();
					console.log('err -- ', err);
				})
			},
			// 机构图片的上传
			async getimg() {
				let url = '/dynamic/addDynamicInfo';
				let imgBackUrls = (WXAJAX.imgBackUrl + this.imgBackUrl)
				let data = {
					companyId: wx.getStorageSync("COMPANYID"),
					type: this.number2,
					photos: imgBackUrls,
					title: "图片",
					isDrafts: 0,
					isOrgShow: 1,
					isLibrary: 1
				}
				await WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
					console.log(res, '发布图片');

				})
				this.getnamic()
			},
			// 查询上传的图片列表
			async getnamic() {
				let v = this.i
				let url = '/dynamic/listCompanyDynamic'
				let data = {
					type: this.number2,
					queryType: this.queryType,
					pageNum: this.page,
					isLibrary: 1,
          isShows:[0,1]
				}
				await WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
					if (res) {
						res.list.forEach(function(i, k) {
							i.createTimeStr = i.createTimeStr.split(" ")[0];
						});
						if (this.page == 1) {
							this.video_data = res.list
						} else {
							this.video_data = [...this.video_data, ...res.list]
						}
					} else {
						this.video_data = ""
						this.imgisLoading = false

					}
				}).catch((err) => {
					this.imgisLoading = true
				})
			},
			getfuck(e) {
				console.log(e);
				this.isshow = e
			},
			// 点击三个点出现弹窗
			setisshow(dynamicId) {
				this.isshow = 1
				let v = this
				console.log(v.articleList);
				// 通过dynamicid判断数组的下标
				const index = v.articleList.findIndex((role) => role.dynamicId === dynamicId)
				console.log(v.articleList[index]);

				this.photos = v.articleList[index].photos //封面图片
				this.title = v.articleList[index].title //标题
				this.url = v.articleList[index].photos //图片地址
				this.name = v.articleList[index].name //姓名
				this.tit = v.articleList[index].title //标题
				this.time = v.articleList[index].createTime //时间
				this.dynamicId = v.articleList[index].dynamicId
				this.companyId = v.articleList[index].companyId
				this.type = v.articleList[index].type
				// console.log(this.type, this.companyId, this.dynamicId, this.name, this.time,"该发言人很辛苦");
			},

			calculateNavBarHeight() {
				if (getApp().globalData.menuButtonBounding === 0) {
					getApp().globalData.menuButtonBounding = wx.getMenuButtonBoundingClientRect();
				}
				let menuButtonBounding = getApp().globalData.menuButtonBounding;
				wx.getSystemInfo({
					success: res => {
						let statusBarHeight = res.statusBarHeight; //胶囊按钮与顶部的距离
						let navHeight =
							statusBarHeight +
							(menuButtonBounding.top - statusBarHeight) * 2 +
							menuButtonBounding.height; //导航高度
						let navBarUserHeight = navHeight - statusBarHeight;
						this.navHeight = navHeight + 10 + "px";
						this.navTop = statusBarHeight + "px";
						wx.setStorageSync('navTop', this.navTop)
						this.navBarUserHeight = navBarUserHeight + "px";
					},
					fail(err) {}
				});
			},
			toDetailz(did) {
				let dynamicId = did.dynamicId
				uni.navigateTo({
					url: './details?&dynamicId=' + dynamicId
				})

			},
			toShare(did, companyId, title, photos) {
				this.dynamicId = did;
				this.companyId = companyId;
				this.title = title;
				this.photos = photos;
				this.share = true;
			},
			closeSh() {
				this.isshow = 0
			},
			closeShare() {
				this.share = false;
			},
			// 获取机构文章
			async getArticleData() {
				var v = this
				this.isLoading = true;
				wx.showLoading({});
				let url = "/dynamic/listCompanyDynamic"
				try {
					let data = await WXAJAX.POST({
							type: v.type,
							pageSize: 10,
							queryType: v.queryType,
							pageNum: v.page,
							isDrafts: 0,
							isOrgShow: 1,
              isShows:[0,1]
						},
						"",
						url,
						"", "", 1
					);

					if (data.list) {
						v.lastPage = data.lastPage
						for (var i = 0; i < data.list.length; i++) {
							data.list[i].createTime = this.formatDate('yyyy年MM月dd日', data.list[
								i].createTime);
						}
						if (v.page == 1) {
							v.articleList = data.list || [];

						} else {
							v.articleList = [...v.articleList, ...data.list] || [];
						}

						console.log(v.articleList, "获取机构文章")

					} else {
						this.articleList = ''
						this.page = 1;
					}

					this.isLoading = false;
					wx.hideLoading();
				} catch (error) {
					this.isLoading = true;
					wx.hideLoading();
				}
			},
			goBack() { // 返回上一页
				wx.navigateBack()
			},
			//切换列表
			tab_type_tap(type, index) {
				this.tabType = type;
				this.customFolderId = '';
				this.page = 1;
				if (type == 1) {
					this.number = 1;
					this.getArticleData();
				} else if (type == 2) {
					this.getqueryCompanyService() //查询视频
				} else if (type == 3) {
					this.number = 7;
					this.getnamic() // 查询上传的图片
				} else if (type == 4) {
					this.number = 4;
					this.custom = "file"
					this.getfilelist() //查询上传的文件列表
				}
				if (type > 4) {
					this.j = type
					this.index = index
					this.number = 8
					this.customFolderId = this.j - 2
					console.log(this.customFolderId, '查看id');
					this.custom = "all"
					// 查看文件
					this.getfilelist();
				}
			},
			//下拉刷新
			scrolltoupper() {
				this.page = 1;
				let v = this
				if (v.tabType == 1) {
					v.articleList = []
					v.getArticleData()
				} else if (v.tabType == 2) {
					v.video_list = []
					v.getqueryCompanyService()
				} else if (v.tabType == 3) {
					v.video_data = []
					v.getnamic()
				} else if (v.tabType >= 4) {
					v.filelist = []
					v.customlist = []
					v.getfilelist()
				}
				// this.getActivity();
			},
			//上拉加载更多
			scrolltolower() {
				console.log("测试上拉加载更多");
				this.getActivity();
			},
			getActivity() {
				let v = this

				if (v.lastPage > v.page) {
					v.page += 1

					if (v.tabType == 1) {
						v.getArticleData()
					} else if (v.tabType == 2) {
						v.getqueryCompanyService()
					} else if (v.tabType == 3) {
						v.getnamic()
					} else if (v.tabType >= 4) {
						v.getfilelist()
					}
				} else {
					v.page = 1
				}

			}

		},

		// // 编辑添加图片
		// addimg() {
		// 	this.ishowchangepng = !this.ishowchangepng
		// },
		// // 选则相册的更改图片
		// async selectImg() {
		// 	let path = await util.chooseImage("file", 1);
		// 	this.imgUrl = await this.uploadImg(path[0]);
		// },
		// uploadImg(path) {
		// 	wx.showLoading({
		// 		mask: true,
		// 		title: "上传中"
		// 	});
		// 	return new Promise(resolve => {
		// 		WXAJAX.UploadImage(path)
		// 			.then(data => {
		// 				wx.hideLoading();
		// 				data = JSON.parse(data);
		// 				console.log(data.code, 1111111);
		// 				if (data.code == 200) {
		// 					resolve(WXAJAX.imgBackUrl + data.data + ".primary.png");
		// 					this.negative = WXAJAX.imgBackUrl + data.data + ".primary.png"
		// 				} else {
		// 					wx.showToast({
		// 						title: "网络异常",
		// 						duration: 2000,
		// 						icon: "none"
		// 					});
		// 				}
		// 			})
		// 			.catch(() => {
		// 				wx.hideLoading();
		// 			})
		// 			.then(url => url);
		// 	});
		// },
		// // 添加编辑文字
		// addtitle() {
		// 	this.ishowcopywriting = !this.ishowcopywriting
		// },
		// // 点击保存文字
		// keepcopy() {
		// 	this.ishowcopywriting = !this.ishowcopywriting
		// },
		// // 获取海报
		// saveposter() {
		// 	WXAJAX.POST({
		// 			listImageEntity: [{
		// 					param: this.titlelist,
		// 					type: 1,
		// 					xAxis: 10,
		// 					yAxis: 300,
		// 					size: 12,
		// 					rgb: 0x121212,
		// 					centered: false,
		// 				},
		// 				{
		// 					param: this.negative,
		// 					type: 2,
		// 					width: 263,
		// 					high: 250,
		// 					xAxis: 0,
		// 					yAxis: 0,
		// 				},
		// 				{
		// 					param: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210226/1614345293847.png',
		// 					type: 2,
		// 					width: 90,
		// 					high: 90,
		// 					xAxis: 173,
		// 					yAxis: 250,
		// 				}
		// 			],
		// 			card2BackUrl: this.listimg,
		// 		}, '', '/poster/createPoster', '', '', 1)
		// 		.then(res => {
		// 			uni.downloadFile({
		// 				url: res,
		// 				success: (res) => {
		// 					if (res.statusCode === 200) {
		// 						console.log('下载成功', res);
		// 						uni.saveImageToPhotosAlbum({
		// 							filePath: res.tempFilePath,
		// 							success: function(fres) {
		// 								wx.showToast({
		// 									title: '保存成功!',
		// 									icon: 'none'
		// 								});
		// 								console.log(fres);
		// 							},
		// 							fail(err) {
		// 								wx.showToast({
		// 									title: '保存失败!',
		// 									icon: 'none'
		// 								});
		// 								console.log(err)
		// 							}
		// 						})
		// 					}
		// 				}
		// 			});
		// 		});
		// 	this.popup = !this.popup
		// },
		// // 跳转海报图库
		// toposter() {
		// 	uni.navigateTo({
		// 		url: '../../companyPack/postergallery/postergallery'
		// 	})
		// },
		// // 跳转文库
		// tocopy() {
		// 	uni.navigateTo({
		// 		url: '../../companyPack/copylibrary/copylibrary'
		// 	})
		// },
	}
</script>
<style scoped>
	.b1s {
		border: 1px solid #000000;
	}

	.ml3 {
		margin-left: 2rpx;
	}

	#Folder {
		width: 125rpx;
		height: 40rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		margin-left: -25rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}

	#border {
		/* border-bottom: 1px solid #0066CC; */
		border-bottom: 1px dashed #A09D9D;

	}

	.shareDives {
		position: absolute;
		bottom: 0rpx;
		width: 748rpx;
		height: 1000rpx;
		background-color: white;
		border-radius: 10px;
		margin: 0 auto;
	}

	.Masks {
		position: absolute;
		top: 0rpx;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.38;
	}

	.inpes {
		width: 432rpx;
		height: 60rpx;
		border: 1px solid rgba(187, 187, 187, 100);
		border-radius: 6px;
	}

	.shareDivs {
		position: absolute;
		top: 160rpx;
		left: 38rpx;
		width: 672rpx;
		height: 328rpx;
		background-color: white;
		border-radius: 10px;
		margin: 0 auto;
	}

	.actives {
		color: rgba(30, 196, 185, 1);
	}

	.uls {
		width: 80%;
		height: 100rpx;
		border-bottom: 2rpx solid #A09D9D;
		margin: 0 auto;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.btns {
		width: 138rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 12rpx;
		background-color: rgba(3, 211, 197, 100);
		color: #FFFFFF;
		text-align: center;

	}

	.inps {
		width: 432rpx;
		height: 60rpx;
		border: 1px solid rgba(187, 187, 187, 100);
		border-radius: 6px;
	}

	.inps {
		width: 258rpx;
		height: 60rpx;
		border: 1px solid rgba(187, 187, 187, 100);
		border-radius: 6px;
	}

	.mb0 {
		margin-bottom: 0rpx;
	}

	.w378 {
		width: 756rpx;
	}

	.h404 {
		height: 808rpx;
	}

	.ml10 {
		margin-left: 10rpx;
	}

	.bgc0 {
		background-color: #FFFFFF;
	}

	page {
		background-color: #FFFFFF;
	}

	.w291 {
		width: 582rpx;
	}

	.mt-75 {
		margin-top: -75rpx;
	}

	.imgsize {
		width: 100%;
		height: 100%;
    margin-top: 34rpx;
	}

	.items div {
		height: 70rpx;
		margin-top: 30rpx;
		padding-left: 26rpx;
		line-height: 70rpx;
	}

	.active {
		color: rgba(30, 196, 185, 1);
		font-weight: bold;
	}



	.Mask {
		position: absolute;
		top: 0rpx;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.38;
	}

	/* .shareDiv {
		position: absolute; */
	/* bottom: 0rpx; */
	/* 	top: 160rpx;
		left: 38rpx;
		width: 672rpx;
		background-color: white;
		border-radius: 10px;
		margin: 0 auto;
	} */

	.shareTo {
		margin-top: 77rpx;
	}

	.shareTo img {
		width: 60rpx;
		height: 60rpx;
		padding: 20rpx 25rpx;
		border-radius: 20rpx;
		margin-bottom: 5rpx;
	}

	.shareToTitle {
		margin-top: 40rpx;
		margin-left: 44rpx;
		font-size: 36rpx
	}

	.share {
		width: 172rpx;
		height: 54rpx;
		border-radius: 12rpx;
		margin: 0 auto;
		margin-top: 20rpx;
	}

	.review {
		color: rgb(1, 196, 161);
		box-shadow: rgb(196 241 238) 0px 2px 6px 0px;
		width: 97rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
		background-color: rgb(196, 241, 238);
		border-radius: 10rpx;

	}

	.review2 {
		width: 96rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
		border-radius: 12rpx;
	}

	.review3 {
		width: 50rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
		border-radius: 12rpx;
	}

	::-webkit-scrollbar {

		width: 0;

		height: 0;

		color: transparent;

	}

	.warn {
		width: 526rpx;
		overflow: hidden;
		position: fixed;
		right: 15%;
		top: 10%;
		left: 15%;
		margin: auto;
		border-radius: 8px;
		background: rgba(0, 0, 0, -0.5);
	}

	.warnone {
		background-color: #FFFFFF;
		width: 100%;
		overflow: hidden;
		position: fixed;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 24rpx 24rpx 0 0;
	}

	.shutoff {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		border: 3rpx solid #FFFFFF;
		font-size: 56rpx;
		text-align: center;
		line-height: 35rpx;
		color: #FFFFFF;
	}

	.inputbox {
		width: 300rpx;
		border: 4rpx dashed #007AFF;
		margin-left: 10rpx;
	}

	/*  .scriptlsit{
    font-size: 50rpx;
    font-weight:bold;
    color: #00D7D0;
    text-align: center;
    margin-bottom: 10rpx;
  } */
	.preservation {
		width: 100%;
		height: 70rpx;
		background-color: #03D3C5;
		color: #FFFFFF;
		font-size: 50rpx;
		text-align: center;
		margin-top: 70rpx;
		border-radius: 12rpx;
	}

	.large {
		position: relative;
	}

	.compiler {
		position: absolute;
		right: 0;
		top: 0;
		width: 40rpx;
		height: 40rpx;
		z-index: 999;
		background-color: #FFFFFF;
	}

	.alter {
		font-size: 40rpx;
		text-align: center;
		color: #000000;
		margin-top: 20rpx;
	}

	.wen {
		font-size: 24rpx;
		color: #999999;
		margin-top: 30rpx;
		margin-bottom: 60rpx;
	}

	.cancelsave {
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.inputcopy {
		width: 680rpx;
		height: 150rpx;
		background-color: #C0C0C0;
		margin-left: 36rpx;
		margin-right: 36rpx;
		margin-top: 60rpx;
		border-radius: 16rpx;
	}

	.anothercopy {
		width: 330rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-bottom: 80rpx;
		border: 4rpx solid #03D3C5;
		border-radius: 40rpx;
		margin-left: 210rpx;
		margin-top: 30rpx;
	}

	.plusign {
		width: 40rpx;
		height: 40rpx;
		background-color: #00D7D0;
		color: #FFFFFF;
		font-size: 50rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 32rpx;
		margin-right: 10rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

  .screen{
    display: flex;
    margin-bottom: 20rpx;
    margin-top: 20rpx;
  }
  .screen view{
    background-color:#EFEFEF;
    color: #1ad0c3;
    margin-left: 20rpx;
    padding: 10rpx 12rpx;
    border-radius: 8rpx;

  }
  .screen .active{
    background-color:#1ad0c3;
    color: white;
  }
  .search {
  	width: 92%;
  	height: 72rpx;
  	border-radius: 30rpx;
  	background-color: rgba(244, 255, 255, 100);
  	color: rgba(30, 196, 185, 100);
  	font-size: 28rpx;
  	text-align: center;
  	box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
  	font-family: Microsoft Yahei;
  	margin-top: 14rpx;
  	display: flex;
  	margin-left: 25rpx;
  }
.main {
		width: 92%;
		margin-top: 40rpx;
		margin-left: 40rpx;
		padding-bottom: 100rpx;
	}
  .searchicon {
  	width: 52rpx;
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
</style>
