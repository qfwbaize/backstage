<template>
  <div class="commidit">
    <ul>
      <li  v-for="(item,index) in info" :key="index">
        <div class="class-type" @click="showList(item)">
           <p class="fs16 c38 fbold">{{item.goodsTypeName}}</p>
           <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/up.png" alt="" :class="item.isOpen ? 'rotate180' : ''" class="w10 h10 trans2"/>
        </div>
        <div class="btf5f6 overhidden trans2 bbf5f6" :style="item.isOpen ? 'dispaly:inline; trans2' : 'display:none;'">
          <div class="list  pt10 pb15 pl10 pr15"
               v-for="(data) in item.companyGoodsResponses"
               :key="data.goodsId"
               @click="select(data)">
            <image class="w60 h60" :src="data.goodsPhoto"></image>
            <div class="list-right">
              <p>{{data.goodsName}}</p>
              <div class="delete">
                <span class="fs12 corange">￥{{data.price}}</span>
                <span class="w20 h20 bradius50p be8" v-if="data.isSelect == false"></span>
                <span class="bgblue w20 h20 bradius50p be8" v-else></span>
              </div>
            </div>
          </div>
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
  import { mapMutations } from "vuex";
  import {mapGetters} from "vuex";
  export default {
    data(){
      return{
        downImg: WXAJAX.imgBackUrl + 'yimai_photos/crm/up.png',
        listImg: WXAJAX.imgBackUrl+'/product-index/dynamic.png',
        deleteImg: WXAJAX.imgBackUrl  + '/product-index/20190425173426.png',
        info:'',
        companyId:'',
        arr:[],
        cardId:'',
        isLoading:false,
      }
    },
    onLoad(option) {

      this.companyId = option.cid
      // this.companyId =  wx.getStorageSync('COMPANYID')
      if(option.cardId){
        this.cardId = option.cardId
      }
      this.getCompanyGoods()

    },
    watch:{
      info(newVal,oldVal){
        for(var i in newVal){

          this.$set(newVal[i],'isOpen',false)
          var goods = newVal[i].companyGoodsResponses
          for(var j in goods){

            this.$set(goods[j],'isSelect',false)
            if(goods[j].isChange!=undefined){
              this.$set(goods[j],'isSelect',true)
              this.$set(newVal[i],'isOpen',true)
            }

          }
        }
      },
    },
    methods:{
      ...mapMutations(['setSelectGoodsInfo']),
      //获取商品信息
      async getCompanyGoods(){
        try {
          wx.showLoading();
          this.isLoading = true;
          // let data = await WXAJAX.POST(
          //   {companyId:this.companyId,cardId:this.cardId},
          //   "",
          //   "/customerEssay/queryCompanyGoods",'1'
          // );
          // console.log(data)
          let data = await WXAJAX.POST(
            {companyId:this.companyId,cardId:this.cardId},
            "",
            "/customerEssay/queryCompanyGoodsByCardId"
          );
          if (data) {
            for(var i in data){
              var item = data[i].companyGoodsResponses
              for (var j in item){
                item[j].price = (item[j].price/100).toFixed(2)
                if(item[j].isChange!=undefined){
                  this.arr.push(item[j]);
                }
              }
            }
            this.info = data
          }
          this.isLoading = false;
          wx.hideLoading();
        } catch (error) {
          this.isLoading = false;
          wx.hideLoading();
          // console.log(".............", error);
        }
      },
      //控制list显隐
      showList(item){
        item.isOpen = !item.isOpen
      },
      //选择商品
      select(data){
        const goods = this.arr.find(item => {return item.goodsId == data.goodsId});
        if(!goods){
          data.isSelect = !data.isSelect;
          this.arr.push(data);
        }else{
          //移除取消选择
          data.isSelect = !data.isSelect;
          this.arr = this.arr.filter(item => {return item.goodsId !=  data.goodsId});
        }
      },
      async confirm(){
        this.setSelectGoodsInfo(this.arr);
        //热销商品选择
        if(this.cardId &&  this.arr){
          let goodIds = [];
          this.arr.forEach( a =>{
            goodIds.push(a.goodsId);
          })
          // if(goodIds.length > 4){
          //   wx.showToast({
          //     title: '最多设置4个热销商品！',
          //     duration: 2000,
          //     icon: 'none'
          //   });
          //   return ;
          // }
          //添加热销商品
          let data = await WXAJAX.POST(
            {cardId : this.cardId,goodIds:goodIds},
            "",
            "/businessCard/addCardHotGoods"
          );
          //默认返回上次打开页面
          uni.navigateBack({
            delta:1
          })
        }else{
          // if(this.arr.length > 3){
          //   wx.showToast({
          //     title: '最多设置3个商品！',
          //     duration: 2000,
          //     icon: 'none'
          //   });
          //   return ;
          // }
          //默认返回上次打开页面
          uni.navigateBack({
            delta:1
          })
        }
      }
    }
  }
</script>

<style scoped>
  .commidit{
    height: 100%;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
  }
  .commidit ul{
    display: flex;
    overflow: auto;
    flex: 1;
    flex-direction: column;
  }
  .class-type{
    box-sizing: border-box;
    height: 88upx;
    padding:20upx 30upx 30upx 20upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .class-type p{
  }

  .list{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .list-right{
    width: 490upx;
    font-size: 28upx;
    line-height: 44upx;
    font-weight: 600;
    word-break: break-all;
    display: -webkit-box; /**对象作为伸缩盒子模型展示**/
    -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
    -webkit-line-clamp: 2; /**显示的行数**/
    overflow: hidden; /**隐藏超出的内容**/
  }
  .delete{
    position: absolute;
    width: 490upx;
    bottom: 20upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .confirm-btn{
    height: 98upx;
    line-height: 98upx;
    text-align: center;
    color: #FFFFFF;
    font-size: 36upx;
    background:linear-gradient(90deg,rgba(118,218,217,1),rgba(81,205,204,1));
  }
</style>
