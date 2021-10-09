<template>
  <div class="select">
    <!-- 搜索框 -->
    <view class="search">
    	<view class="searchicon">
    		<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/greensearch.png" mode="">
    		</image>
    	</view>
      <input confirm-type="search" v-model="searchVal" type="text" placeholder-style=" color: #1EC4B9;" placeholder="搜索任务关键词"	 />
    </view>
    <!-- <div class="title"  @click="allSelect">
      <span class="w20 h20 " :class="{'active': selectdeLength  == data.length }"></span>
      <p class="ca8">全选</p>
    </div> -->
    <!-- <view v-if="taskType==0" class="collection">我收藏的机构</view> -->
    <ul style="margin-bottom: 98upx;min-height: 100vh;">
      <!-- <li v-if="taskType==0" v-for="(item,index) in collectionList" :key="index" @click="singleChoice(item.cardId,item.name,item.phone,item.companyName,item.position)">
          <span class="w20 h20 mr15" :class="{'active':selectdeList.includes(item.cardId)}"></span>
           <image class="w60 h60" :src="item.photos"></image>
           <div class="name">
             <p class="c38 fbold fs16">{{item.name}}</p>
           </div>
       </li> -->
       <!-- <li v-if="taskType==0" style="font-size: 32rpx;color: #383838;font-weight: bold;">机构列表</li> -->
    	<li v-if="taskType==0" v-for="(item,index) in taskArr" :key="item.cardId" @click="singleChoices(item.cardId,item.name,item.phone,item.companyName,item.position)">
          <span class="w20 h20 mr15" :class="{'active':selectdeList.includes(item.cardId)}"></span>
           <image class="w60 h60" :src="item.userLogo"></image>
           <div class="name">
             <p class="c38 fbold fs16">{{item.name}}</p>
           </div>

       </li>
      <li v-if="taskType==1"  v-for="(item,index) in taskArr" :key="item.cardId" @click="singleChoice(item.cardId,item.name,item.phone,item.companyName,item.position)">
           <span class="w20 h20 mr15" :class="{'active':selectdeList.includes(item.cardId)}"></span>
            <image class="w60 h60" :src="item.userLogo"></image>
            <div class="name">
              <p class="c38 fbold fs16">{{item.name}}</p>
              <p class="c78 fs14">公司：{{item.companyName}}   职位：{{item.position}} <br> 电话：{{item.phone}}</p>
            </div>

        </li>
    </ul>
    <div class="confirm-btn" @click="confirm">
      确认
    </div>
  </div>
</template>

<script>
  import http from "@/utils/http"
  import WXAJAX from '../../../utils/request.js';
  import {mapMutations} from 'vuex'
  export default {

    data(){
      return{
        listImg: WXAJAX.imgBackUrl+'/product-index/dynamic.png',
        companyId: this.$store.state.companyId,
        data:[],
        customerList:[],
        selectdeList:[],
        selectdeLength:'',
        page:1,
        taskType:'',
        searchVal:'',
        collectionList:[],

      }
    },
    computed:{
      taskArr(){
        var taskArr = this.data,
        searchVal = this.searchVal
        if(!searchVal){
          return taskArr
        }
        searchVal = searchVal.trim().toLowerCase()
        taskArr = taskArr.filter(function(item){
          if(item.name.toLowerCase().indexOf(searchVal) !== -1){
            return item
          }
        })
        return taskArr
      }
    },
    watch:{
      //vue监听不到变化数组的length
      selectdeList(newVal,oldVal){
        this.selectdeLength = newVal.length
      }
    },
    onLoad(option){
      if(option.taskType){ this.taskType=option.taskType }
    },
    mounted() {
      this.getList()
      this.getCollection()
    },
    onPullDownRefresh() {
        this.page = 1;
        this.data = [];
        this.getList(this.page);
        wx.stopPullDownRefresh();
      },
    onReachBottom() {
      console.log("页面上拉触底事件的处理函数")
        this.page++;
        console.log(this.page)
        this.getList(this.page);
     },

    methods:{
      //保存成员id
      ...mapMutations(['setSaffId','customerInfo']),
      getCollection(){
        WXAJAX.POST({itemType:3,pageNum:1},'','/personal/getCollection','','',2).then(res=>{
          if(res){
            this.collectionList = res
          }

        })
      },
      //请求数据
      async getList(pageNum){
        try {
          wx.showLoading();
          let data = await WXAJAX.POST(
            {companyId:this.companyId,pageNum:pageNum},
            "",
            "/businessCard/getCompanyStaffList"
          );
          if(this.taskType==0){
              data = await http({url:'/apis/companytask/company',method:'GET'})
          }
          // if(this.taskType==0){
          //   data = await WXAJAX.POST(
          //     {companyId:this.companyId,pageNum:pageNum},
          //     "",
          //     "/personal/querPageCompanyAllInfo","","",2
          //   );
          // }
          if (data) {
           let list=[];
           // item.cardId,item.name,item.phone,item.companyName,item.position;userLogo
           if(this.taskType == 1){
             data.list.forEach(function (i, k) {
               list[k] = {
                 cardId:i.cardId ,
                 name : i.name ,
                 phone : i.phone || '无' ,
                 companyName : i.customerCompanyName || '无' ,
                 position : i.position || '无' ,
                 userLogo : i.logo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card1_user.png',
               };
             });
           }

            if(this.taskType == 0){
              data.data.data.forEach(function (i, k) {
                list[k] = {
                  cardId:i.company_id ,
                  name : i.company_name ,
                  phone : i.phone || '无' ,
                  companyName : i.industryLabel || '无' ,
                  position : i.position || '无' ,
                  userLogo : i.company_logo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card1_user.png',
                };
              });
            }
            if(this.data){
              this.data = [...this.data,...list]
            }
            // if(this.data && this.data.length > 0){
            //   this.data = this.data.concat(list)
            // }else{
            //   this.data = list
            // }


          }else{
            this.page--;
          }
          wx.hideLoading();
        } catch (error) {
          wx.hideLoading();
          console.log(".............", error);
        }
      },
      //单选按钮
      singleChoices(id,name,phone,companyName,position){
        this.selectdeList=[id];
        this.customerList = [id,name,phone,companyName,position]
      },
      //多选
      singleChoice(id,name,phone,companyName,position){

        // this.selectdeList=[id];
        // this.customerList = [id,name,phone,companyName,position]
        if(this.selectdeList.indexOf(id) == -1){
          this.selectdeList.push(id)
        }else{
          this.selectdeList.splice(this.selectdeList.indexOf(id),1)
        }
        // if(this.selectdeList.includes(id)){
        //   this.selectdeList = this.selectdeList.filter(item=>{
        //     return item !== id
        //   })
        // }else{
        //   this.selectdeList.push(id)
        // }
      },
      //全选按钮
      allSelect(){
          var len = this.data.length;
          this.selectdeList = [];
          for(var i=0;i<len;i++){
            // this.selectdeList.push(this.data[i].userId);
            this.selectdeList.push(this.data[i].cardId);
          }
          if(this.selectdeLength == this.data.length){
            this.selectdeList = []
          }
        },
        confirm(){
          this.setSaffId(this.selectdeList)
          wx.setStorageSync('customerList',this.customerList);
          // this.customerInfo(this.customerList)

          wx.navigateBack({
            delta:1
          })
        }
    },
  }
</script>

<style scoped>
 .select{
   position: absolute;
   width: 100%;
   box-sizing: border-box;
   display: flex;
   background: #FFFFFF;
   flex-direction: column;
 }
 .title{
   height: 88upx;
   display: flex;
   align-items: center;
   padding-left: 32upx;
 }
 span{
   border:1upx solid #E8E8E8;
   border-radius: 50%;
   margin-right: 20upx;
 }
 ul{
   display: flex;
   flex-direction: column;
   padding-left: 32upx;
 }
 ul li{
   height: 160upx;
   display: flex;
   align-items:center;
 }
 ul li image{
   border-radius: 10upx;
   margin-right: 22upx;
 }
 .name{
   height: 120upx;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
 }
 .active{
   background: #51CDCB;
 }
 .confirm-btn{
  position: fixed;
  bottom: 0;
  height: 98upx;
  width: 100%;
  line-height: 98upx;
  text-align: center;
  color: #FFFFFF;
  font-size: 36upx;
  background:linear-gradient(90deg,rgba(118,218,217,1),rgba(81,205,204,1));
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
  .collection{
    font-size: 32rpx;
    color: #383838;
    font-weight: bold;
    margin-left: 32rpx;
  }
</style>
