<template>
  <div>
	<!-- 	<view class="search">
			<view class="searchicon">
				<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/greensearch.png" mode="">
				</image>
			</view>
			<input confirm-type="search" type="text" value="" placeholder-style=" color: #1EC4B9;" placeholder="搜索任务关键词"
				@input="startsearch" />
		</view> -->
    <div v-for="(v,k) in lists" :key="k"
     @click="toparticulars('inviteDetail','?recruitId='+ v.recruitId)"
     class="bgfff pt15 pl15 pr15 pb15 mt10 bradius5">
      <p class="disflex jsbet fs14"  >
        <span class="c38" style="font-weight: bold;">{{v.position}}</span>
      </p>
      <div class="disflex jsbet fs12 ca8 pt13">
        <div>
          {{v.recruitAddress}} | {{experienceArray[v.experience-1].title}} | {{educatArray[v.education-1].title}}
        </div>
        <span class="cblue" style="font-size: 24rpx;">{{v.minSalary}}-{{v.maxSalary}}</span>
      </div>
      <view class="" style="display: flex;margin-top: 20rpx;">
        <image style="width: 60rpx;height: 60rpx;border-radius: 50%;" :src="v.companyLogo" mode=""></image>
        <view class="" style="font-size: 28rpx;margin-top: 14rpx;margin-left: 20rpx;">{{v.companyName}}</view>
      </view>
    </div>
    <div v-if="videoflg" class="textc lh42 fs12 ca8 bgf5f6">- 到底了，看看其他的吧 -</div>
  </div>
</template>

<script>
  import WXAJAX from '../../../utils/request'
  import utils from '@/utils';
	export default {
		data() {
			return {
        pages:1,
        dialog_ph:'',
        lists:'',
        lastPage:'',
        videoflg:false,
        searchKey:'',
        lists: [],
        /*学历*/
        educatArray:[
            {title:'全部',id:1},{title:'初中及以下',id:2},{title:'中专/中技',id:3},
            {title:'高中',id:4},{title:'大专',id:5},{title:'本科',id:6},
            {title:'硕士',id:7},{title:'博士',id:8}
        ],
        /*经验*/
        experienceArray:[
            {title:'应届生',id:1},{title:'1年以内',id:2},
            {title:'1-3年',id:3},{title:'3-5年',id:4},{title:'5-10年',id:5},
            {title:'10年以上',id:6}, {title:'全部',id:7},
        ],
			}
		},
    onShow() {
     this.getInits()
    },
    async onPullDownRefresh() {
        // to doing..
        // 下拉刷新
        wx.showNavigationBarLoading();
        this.nodata = false ;
        this.companylists = '';
        this.pages = 1 ;
        this.getInits();
        wx.stopPullDownRefresh();
        setTimeout(function () {
            wx.hideNavigationBarLoading();
        },300)
    },
    onReachBottom() {
         if (this.pages < this.lastPage) {
           this.pages += 1
           this.getInits();
         } else {
           this.videoflg = true
         }
    },
		methods: {
      // startsearch(e) {
      // 	this.searchText = e.detail.value ? e.detail.value : '';
      // 	this.getInits();
      // },
			getInits(){ 
          var params = {}
           params.pageNum = this.pages
           // if (this.searchText) {
           // 	params.searchKey = this.searchText;
           // }
           // this.lists = []
			    WXAJAX.POST(params, '', '/recruit/queryPage','','',1).then((data) => {
			        wx.hideLoading();
			        if(data){
			            data.list.forEach(function (i, k) {
			                i.maxSalary = (i.maxSalary/1000/100)+'k';
			                i.minSalary = (i.minSalary/1000/100)+'k';
			            });
			            if(this.pages == 1){
			                this.lists = data.list
			            }else{
			                this.lists = [...this.lists ,...data.list];
			            }
                  this.lastPage = data.lastPage
			            // v.pages ++ ;
			        }
			    }).catch((err) => {
			        console.log(err);
			        wx.hideLoading();
			        if(err.code == 204){
			            this.nodata = true ;
			        }
			    });
			},
      // 招聘详情页面的跳转
      toparticulars(url , query){
        query = query || '' ;
        wx.navigateTo({url:'/pages/companyPack/'+url+'/main' + query});
      },
		}
	}
</script>

<style>
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
</style>
