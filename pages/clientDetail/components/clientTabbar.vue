<template>
  <div class="bgfff pb44">
    <div class="client-box">
      <div class="client-list" :class="current == 0 ? 'isShow' : ''">
        <div class="track" :style="'min-height:' + trackHeight + 'px'">
            <p>{{firstLog}}</p>
            <div class="track-list" :class="index == 0 ? 'first' : ''" @click="aaa(item,logs)" v-for="(item,index) in logs" :key='index'>
            <div class="track-list-top">
              <div class="track-list-top-name">
                <img :src="item.logo">
                <span>{{item.followName}}</span>
              </div>
              <div class="track-list-top-time">
                <span>{{item.time[0] + '  ' + item.time[1]}}</span>
              </div>
            </div>
            <div class="track-list-bottom" v-if="item.mark">
              [{{item.mark}}]{{item.followRemark.data}}
            </div>
            <div class="track-list-bottom" v-else-if="item.infoText[0].lableName">
              添加/更改标签：<span v-for="(v,k) in item.infoText" :key="k">[{{v.lableName}}]</span>
            </div>
            <div class="track-list-bottom" v-else>
              [{{item.infoText}}]
            </div>
          </div>
        </div>
      </div>
      <div class="client-list" :class="current == 1 ? 'isShow' : ''">
        <div class="track" :style="'min-height:' + trackHeight + 'px'" v-if="moneyLog !== 0" @click="aaa(moneyLog)">
            <p>总金额为{{moneyLog /100}} 元</p>
            <div class="track-list" :class="index == 0 ? 'first' : ''" @click="aaa(item)" v-for="(item,index) in deallogs" :key='index'>
            <div class="track-list-top">
              <div class="track-list-top-name">
                <img :src="item.logo">
                <span>{{item.name}}</span>
              </div>
              <div class="track-list-top-time">
                <span>{{item.time[0] + '  ' + item.time[1]}}</span>
              </div>
            </div>
            <div class="track-list-bottom">
              [{{item.money /100 || ''}}元]{{item.remark}}
              <div class="disflex">
                <img class="w50 h50 mt5" :src="v" v-for="(v,index) in item.photos" :key="index">
              </div>
            </div>

          </div>
        </div>
        <NoData desc="暂无数据" v-else/>
      </div>
      <div class="client-list" :class="current == 2 ? 'isShow' : ''">
        <div v-if="isShowData">
          <Log
          :userInfo="userInfo"
          :hideIcon="true"
          :filterLogObj="filterLogObj">
          </Log >
        </div>
          <NoData desc="暂无数据" v-else/>
      </div>
      <div class="client-list" :class="current == 3 ? 'isShow' : ''" >
        <div v-if="isShowData">
          <AI
          :userInfo="userInfo"
          :hideIcon="true"
          ></AI>
        </div>
          <NoData desc="暂无数据" v-else/>
      </div>

    </div>
  </div>
</template>

<script>
import AI from '@/pages/clientList/customerAnalysis/ai/index' //
import Log from '@/pages/clientList/customerAnalysis/log/index' //
import WXAJAX from '@/utils/request'
import util from '@/utils/index'
import NoData from '@/components/noData';

export default {
  props:['logs', 'deallogs' , 'moneyLog' ,'type', 'istop' , 'isTopTitle','isInFollowLog', 'firstLog', 'isShowAdd', 'userId', 'current' , 'msg'],
  components: { AI,Log,NoData },
 data () {
 return {
   tabs:[{
     name:'跟进记录',
     type:'track',
     id:0
   },{
     name:'成交记录',
     type:'deal',
     id:1
   },{
     name:'互动记录',
     type:'interaction',
     id:2
   },{
     name:'AI分析',
     type:'AI',
     id:3
   }],
   swiperHeight:0,
   trackHeight:0,//跟踪模块高度
   seeType: {
        1: {
          title: '名片',
          1: '现在沟通，效率更高哦',
          4: '成交有望'
        },
        2: {
          title: '产品',
          1: '尽快把握商机',
          4: '可标注为重点客户',
        },
        3: {
          title: '官网',
          1: '有望合作',
          4: '可标注为重点客户',
        },
        4: {
          title: '动态',
          1: '合作意向很强烈',
          4: '成单在望',
        }
      },
      page: 1,
      isLoading: false,//是否在加载
      nodata: false,//是否已经没有数据
      isShowData:false,
      //客户信息
      userInfo: {},
      navHeight: 0,
      scrollContentHeight: 0,
      scrollTop: 0,
      keysArray: [], //来作为唯一值的key数组
      filterLogObj: {}, //清洗过后的日志对象
  }
 },

 watch:{
  deallogs(newVal,old){
     let number = 0
     number = newVal.forEach(item => {
       return item.money
     });

   }
 },
 onShow(){

   if(this.userId){
    this.getCardMsg(this.userId)
   }

 },
 mounted(){
  let isDataShow = wx.getStorageSync('AIUserId')
  console.log(isDataShow)
  if(isDataShow == 0 || ''){
    this.isShowData = false
  }else{
    this.isShowData = true
  }
  console.log(this.isShowData)
 },
 methods:{

  //  tab_tap(type,index){
  //    console.log(this.userId)
  //    this.current = index
  //    console.log(index)
  //    if(index == 2){

  //     this.getSeeRecordList()
  //    }
  //   //this.$emit('tabSwitch',type)
  //  },
   swiper_tap(e){

     this.current = e.detail.current

     if(e.detail.current == 2){
      this.getSeeRecordList()
     }
     this.setSwiperHeighht()
   },
  //  setSwiperHeighht(){
  //    let query = uni.createSelectorQuery().in(this)
  //    query.selectAll('.swiper-list').boundingClientRect();
  //    query.exec((res)=>{
  //        console.log(res)
  //        this.swiperHeight = res[0][this.current].height
  //    })
  //  },
    // menu_tap (id) {
    //   //设置滚动条位置, 先设置1 再延迟设置为0 是因为mpvue检测到数据没有发生变化 是不会真正去改变值，导致scrollview滚动到顶部失效
    //   this.scrollTop = 1;
    //   setTimeout(() => {
    //     this.scrollTop = 0;
    //   }, 50);
    //   this.menu_id = id;
    //   if (id == 1 && this.acitveRecord[0].time.length == 0) {
    //     this.page = 1;
    //     this.keysArray = [];
    //     this.getSeeRecordList();
    //   }
    //   wx.showLoading();
    //   setTimeout(function () {
    //     wx.hideLoading();
    //   }, 1500);
    // },
    getCardMsg(userId){//获取名片信息
      let v = this;
      wx.showLoading();
      WXAJAX.POST({
        'userId':userId
      }, '', '/seeRecord/customerAnalysis').then((data) => {
        wx.hideLoading();
        if (data) {
          data.analysisModel.rate = ((data.analysisModel.rate || 0) * 100).toFixed(2);
          this.userInfo = data;
        }
      }).catch((err) => {
        console.log(err);
        wx.hideLoading();

      });
    },
    getSeeRecordList () {//互动记录
      if (this.isLoading) {
        return
      }
      this.isLoading = true;

      WXAJAX.POST({
        // entranceType: 1,
        pageNum: this.page,
        pageSize: 10,
        userId: wx.getStorageSync('AIUserId')
      }, '', '/seeRecord/getSeeRecordHistory').then((data) => {
        wx.hideLoading();
        if (data) {
          data.forEach((i, k) => {
            //通过时间数组,将时间存入数组,如果是同一天的,只能放入一份,不是同一天的push到数组里
            let day = util.getdate(i.createTime, '年月日');  //得到的day 是 年-月-日 这种格式
            //先查找数组里面是否已经有这个时间段了
            let position = this.keysArray.indexOf(day);
            if (position > -1) { //position大于-1 说明数组里面已经有这个时间了, 这个position作为对象的key, 从存放数据的对象里面找到对应的数据,把遍历得到的数据,存入这个对象
              let item = this.handlerLogData(i);
              this.filterLogObj[position].children.push(item);
            } else { //position 等于 -1, 则说明这是新的一个日期,需要构建一个新的对象,将数据放入过滤后的日志对象里, 将存放keys的数组的长度-1来作为key
              this.keysArray.push(day);
              let item = this.handlerLogData(i);
              this.filterLogObj[this.keysArray.length - 1] = {
                time: i.createTime,
                children: [item]
              }
            }
          });
        } else {
          this.page--;
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }).catch((err) => {
        this.page--;
        wx.hideLoading();
        if (err.code == 204) {
          this.nodata = true;
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
    },
    handlerLogData (log) {
      let time = util.getdate(log.createTime, 'monthTime');
      return {
        time,
        nickName: log.nickName,
        seeType: log.seeType,
        ranking: log.ranking
      }
    },
    aaa(data){
      console.log(data)
    }
 },
}

</script>

<style scoped>
.client-tab{
  height: 88upx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.client-tab p{
  transition: all 0.5s;
  display: block;
  box-sizing: border-box;
  padding:0 40upx;
  height: 88upx;
  line-height: 88upx;
  color: #383838;
  font-size: 28upx;
  position: relative;
}
.active{
  transition: all 0.5s;
  color: #51CDCB !important;
}

.client-tab span{
  transition: all 0.5s;
  background: #ffffff;
  display: block;
  width: 100%;
  height: 4upx;
  position: absolute;
  bottom: 0;
  left: 0;
}
.isSelect{
  transition: all 0.5s;
  background: #51CDCB !important;
}
.client-box{

}
.track p{
  display: block;
  height: 78upx;
  line-height: 78upx;
  padding-left: 30upx;
  color: #A8A8A8;
  font-size: 28upx;
  border-top: 1upx solid #F5F5F6;
  border-bottom: 1upx solid #F5F5F6;
}
.track-list{
  min-height: 100upx;
}
.track-list-top{
  height: 78upx;
  width: 100%;
  box-sizing: border-box;
  padding:0 30upx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28upx;
}

.track-list-top-name{
  height: 100%;
  display: flex;
  align-items: center;
  color: #787878;
  font-weight: bold;
}
.track-list-top-name img{
  width: 60upx;
  height: 60upx;
  border-radius: 50%;
  margin-right: 20upx;
}
.track-list-top-time{
  color: #787878;
}
.track-list-bottom{
  padding: 20upx 40upx 20upx 110upx;
  border-bottom: 1upx solid #F5F5F6;
  color: #787878;
  font-size: 24upx;
}
.first .track-list-top-name{
  color: #51CDCB;
}
.first .track-list-top-time{
  color: #51CDCB;
}
.first .track-list-bottom{
  color: #51CDCB;
}
.client-box{
  position: relative;
}
.client-list{
  transition: all .4s;
  position: absolute;
  background: #ffffff;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  padding:0 30pux;
  display: none;
  margin-bottom: 120upx;
}
.isShow{
  transition: all .4s;
  display: block;
}
.noData{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200upx;
}
</style>
