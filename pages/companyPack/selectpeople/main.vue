<template>
  <div class="select">
    <!-- <div class="title"  @click="allSelect">
      <span class="w20 h20 " :class="{'active': selectdeLength  == data.length }"></span>
      <p class="ca8">全选</p>
    </div> -->

    <ul style="margin-bottom: 98upx;">
    	<li v-for="(item,index) in data" :key="item.cardId" @click="singleChoice(item.cardId,item.name,item.phone,item.companyName,item.position,item.companyNature,item.department)">
        <span class="w20 h20 mr15" :class="{'active':selectdeList.includes(item.cardId)}"></span>
         <image class="w60 h60" :src="item.userLogo"></image>
         <div class="name">
           <p class="c38 fbold fs16">{{item.name}}</p>
           <p class="c78 fs14">公司：{{item.companyName}}  <br> 职位：{{item.position}} <br> 电话：{{item.phone}}</p>
         </div>
       </li>
    </ul>
    <div class="confirm-btn" @click="confirm">
      确认
    </div>
  </div>
</template>

<script>
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
        page:1
      }
    },
    watch:{
      //vue监听不到变化数组的length
      selectdeList(newVal,oldVal){
        this.selectdeLength = newVal.length
      }
    },
    onLoad(option){

    },
    mounted() {
      this.getList()
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
      //请求数据
      async getList(pageNum){
        try {
          wx.showLoading();
          let data = await WXAJAX.POST(
            {companyId:this.companyId,pageNum:pageNum},
            "",
            "/customer/getCustomer"
            // "/businessCard/getCompanyStaffList"
            // "/ipa/selectIpaList"
          );
          if (data) {
           let list=[];
           // item.cardId,item.name,item.phone,item.companyName,item.position;userLogo
            data.forEach(function (i, k) {
              list[k] = {
                cardId:i.cardId ,
                name : i.name ,
                phone : i.phone || '无' ,
                companyName : i.customerCompanyName || '无' ,
                position : i.position || '无' ,
                userLogo : i.userLogo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card1_user.png',
                companyNature:i.companyNature|| '无',
                department:i.department|| '无',
              };
            });

            if(this.data && this.data.length > 0){
              this.data = this.data.concat(list)
            }else{
              this.data = list
            }
            // if(this.data && this.data.length > 0){
            //   this.data = this.data.concat(data.list)
            // }else{
            //   this.data = data.list
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
      singleChoice(id,name,phone,companyName,position,companyNature,department){
        this.selectdeList=[id];
        this.customerList = [id,name,phone,companyName,position,companyNature,department]
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
</style>
