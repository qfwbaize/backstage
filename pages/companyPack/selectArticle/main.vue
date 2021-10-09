<template>
  <div class="article">
    <ul>
    	<li>
        <div class="list h85 pt10 pb15 pl10 pr15"
             v-for="(item,index) in list"
             :key="item.dynamicId"
             @click="select(item)"
             :class="{ 'active':arr.includes(item)}"
             >
          <image class="w60 h60" :src="item.dynamicUrl"></image>
          <div class="list-right">
            <p>{{item.title}}</p>
            <div class="delete">
              <span class="fs12 fnormal ca8">{{item.createTime}}</span>
              <span class="fs12 fnormal ca8">浏览 {{item.seeNum || 0}}</span>
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
  import WXAJAX from '../../../utils/request.js'
  import {mapStates,mapMutations} from 'vuex'

  export default {
    data(){
      return{
        downImg:WXAJAX.imgBackUrl + '/product-index/20190514143457.png',
        list:this.$store.state.allRecordsInfo,
        //存储选中状态
        arr:[],
        companyId:this.$store.state.companyId,
        type:'',
        page:1
      }
    },
    onLoad(option) {

      if(option.type){
        this.type = option.type
      }
      this.getCompanyDynamics()
    },
    mounted(){
      this.list = this.setSelect(this.list)
      console.log(this.$store )
    },
    async onPullDownRefresh() {
        this.page = 1;
        this.list = '';

        await this.getCompanyDynamics(this.page);
        wx.stopPullDownRefresh();
      },
      async onReachBottom() {
        if (this.isLoading) {
          return;
        }
        this.page++;
        await this.getCompanyDynamics(this.page);
     },
    methods:{
      ...mapMutations(['setSelectRecordsInfo']),
      async getCompanyDynamics(){
        wx.showLoading()
        try {
          let data = await WXAJAX.POST(
            {
              // companyId:this.companyId,
              companyId:wx.getStorageSync('COMPANYID'),
              pageNum:this.page
            },
            "",
            "/customerEssay/queryCompanyDynamics"
          );
          if (data) {
            console.log(data,999999)
            if(this.page === 1){
              this.list = data.list
            }else{
              this.list = [...this.list, ...data.list] || [];
            }

          }

          for(var i = 0;i < this.list.length;i++){
            if(this.list[i].photos){
              this.list[i].dynamicUrl = []
              this.list[i].dynamicUrl = this.list[i].photos.split(',')[0]
            }
            if(this.list[i].type == 4){
              this.list[i].spot = this.list[i].title.split('.')[1]
              if(this.list[i].spot == "docx"){
                this.list[i].dynamicUrl = "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/word.png"
              }else if(this.list[i].spot == "pdf"){
                this.list[i].dynamicUrl = "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-file.png"
              }else if(this.list[i].spot == "xlsx"){
                this.list[i].dynamicUrl = "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/excel.png"
              }else if(this.list[i].spot == "txt"){
                this.list[i].dynamicUrl = "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-124-document-file-zip@3x.png"
              }else if(this.list[i].spot == "zip"){
                this.list[i].dynamicUrl = "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-124-document-file-zip@3x.png"
              }
            }
            if(this.list[i].type == 6){
              this.list[i].dynamicUrl = "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/play-circle.png"
            }
          }


          console.log(this.list,7777777)
          this.isLoading = false;
          wx.hideLoading();
        } catch (error) {
          this.isLoading = false;
          wx.hideLoading();
          console.log(".............", error);
        }
      },
      //向数据中添加选取属性
      //info:数据
      setSelect(info){
        var arr = info
        for(var i in arr){
          this.$set(arr[i],'isSelect',false)
        }
        // console.log(arr)
        return arr
      },
      //选择文章
      select(item){
         if(this.arr.includes(item)){
           this.arr = this.arr.filter(val=>{
             return val !== item
           })
         }else{
           this.arr.push(item)
           //console.log(this.selectdeList.length)
         }

        //判断上个页面传回的type判断是选择一个还是选择三个
        if(this.type == 1){
          //判断数组中到底是一个还是三个
          if(this.arr.length > 1){
            this.arr[0].isSelect = false
            this.arr.shift()
          }
        }else{
          if(this.arr.length > 3){
           this.arr[0].isSelect = false
           this.arr.shift()
          }
        }
      },
      //确认按钮
      confirm(){
        this.setSelectRecordsInfo(this.arr);
        uni.navigateBack({
          delta:1
        })
      }
    }
  }
</script>

<style scoped>
.article{
  width: 100%;
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: column;
  padding-bottom: 98upx;
}
.article ul{
  padding:20upx 25upx 118upx 35upx;
  padding-bottom: 30upx;
}
.list{
  transition: all .4s;
  background: #FFFFFF;

  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20upx;
  border:4upx solid #FFFFFF;
  border-radius: 20upx;
}
.list-right{
  width: 490upx;
  font-size: 28upx;
  height: 82upx;
  overflow: hidden;
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
.active{
  transition: all .4s;
  border:4upx solid #51cdcb;
}
.confirm-btn{
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 98upx;
  line-height: 98upx;
  text-align: center;
  color: #FFFFFF;
  font-size: 36upx;
  background:linear-gradient(90deg,rgba(118,218,217,1),rgba(81,205,204,1));
}
</style>
