<template>
  <div
    :style="'background-position: 0 ' + navHeight + 'px'"
    class="trans2 h100p bgfff borderbox posre sale-ranking">
    <statusbarTitle
    :navHeight="navHeight"
    :statusBarHeight="statusBarHeight"
    title="销售排行"
    @toBack="toBack"></statusbarTitle>
    <!--选择-->
    <div class="sale-ranking-top w100p h200 pb5">
      <!--type1-->
      <div class="disflex jsaround fs14 ca8 lh26 pt15">
            <div :class="type1_id == v.id ? 'cblue fbold bradius3 ' : '' "
                  v-for="(v,k) in type_text"
                  :key="k"
                  style="color:#F5F5F6;position: relative;height:72upx"
                  class="pl11 pr11 mr10"
                  @click="type_tap(1,v.id)">{{v.name}}
                  <span
                  :class="type1_id == v.id ? '' : 'isdisplay' "
                  style="display:block;position:absolute;height:8upx;width:32upx;left:0;right:0;bottom:0;margin:auto;background:#ffffff;"></span>
            </div>
      </div>
      <!--type2-->
      <div class="disflex pl14 fs12  pt16" v-if="type_text[type1_id].child">
            <div v-for="(v,k) in type_text[type1_id].child"
                  class="borderbox pl10 pr10 pt5"
                   style="color:#F5F5F6"
                  :key="k"
                  @click="type_tap(2,v.id)"
                  :class="type2_id == v.id ? 'type2_select' : '' ">{{v.name}}</div>
            <div @click="selectClass" class="borderbox cfff mrl50 pl10 pr10 pt5">{{chooseName}}</div>
            <img style="width:20upx;height:20upx;padding-top:16upx" :src="downIcon" >
      </div>
      <!--type3-->

      <div class="disflex user_box w100p borderbox align-cen jsbet pl16 pr15 pt15 pb15 fs16 mr10">
        <div class="disflex">
          <div class="disflex fd jsaround align-cen mr15">
            <span class="cfff fs18 fbold">{{myRanking.sort}}</span>
            <span class="cfff fs12">我的排名</span>
          </div>
          <div class="user_photo_box">
            <img :src="myRanking.userPhoto" alt=""
               mode="aspectFill"/>
          </div>

          <p class="ml10 lh60 cfff fbold">{{myRanking.userName}}</p>
        </div>
        <span class="cfff">{{myRanking.data || 0}}{{type1_id == '3' ? '%' : ''}}</span>
      </div>
    </div>
    <!--排名-->
    <div class="sale-ranking-list bgfff bradiustr10">
      <div class="sale-ranking_center_icon">
        <span></span>
      </div>
      <div class="top-three">
        <div class="person">
          <div class="disflex fd aife" v-if="topThree[1]">
            <img :src="topThree[1].userPhoto" mode="aspectFill" style="width:120upx;height:120upx;border-radius:50%;margin:0 auto;">
            <span class="person_ranking">亚军</span>
            <p class="c38 fs14 mt10 mb10">{{topThree[1].userName}}</p>
            <p class="ca7 fs12">{{topThree[1].data}}</p>
          </div>
        </div>
        <div class="person champion">
          <div class="disflex fd aife">
            <img :src="topThree[0].userPhoto"  mode="aspectFill" style="width:140upx;height:140upx;border-radius:50%;margin:0 auto;">
            <img class="crown" :src="crownIcon" style="width:80upx;height:80upx;border-radius:50%;">
            <p class="c38 fs14 mt10 mb10">{{topThree[0].userName}}</p>
            <p class="ca7 fs12 mb10">{{topThree[0].data}}</p>
            <span>冠军</span>
          </div>
        </div>
        <div class="person">
          <div class="disflex fd aife" v-if="topThree[2]">
            <img :src="topThree[2].userPhoto" mode="aspectFill" style="width:120upx;height:120upx;border-radius:50%;margin:0 auto;">
            <span class="person_ranking">季军</span>
            <p class="c38 fs14 fbold mt10 mb10">{{topThree[2].userName}}</p>
            <p class="ca7 fs12 mt10 mb10">{{topThree[2].data}}</p>
          </div>
        </div>
      </div>
      <div class="disflex jsbet pl16 pr15 pt15 pb15 fs16 lh50"
          v-for="(v,k) in ranking_lists" :key="k">
        <div class="disflex ranking_order" :class="k == 0 ? 'active' : '' ">
          <span class="c38 fs18 fbold pr15">{{v.sort}}</span>
          <img :src="v.userPhoto"
              mode="aspectFill"
                            class="w50 h50 bradius5 mr10 posre"/>
          <p class="lh50 c38 fs14 fbold">{{v.userName}}</p>
        </div>
        <span>{{v.data || 0}}{{type1_id == '3' ? '%' : ''}}</span>
      </div>
    </div>
    <div>
      <selectorOne
        :status="chooseTimeShow"
        :allClass="type_time"
        :choose_id="selectId"
        @choose_tap="chooseTime"
        @closeModal="chooseTimeShow=false"
      >
      </selectorOne>
    </div>


  </div>
</template>

<script>
  import WXAJAX from '@/utils/request'
  import StaticResources from '@/components/StaticResources';
  import statusbarTitle from "@/components/statusbarTitle"
  import selectorOne from "@/components/selectorOne"

  export default {
    name: '',
    components: {StaticResources,statusbarTitle,selectorOne},
    data() {
      return {
        type_text: [
          {
            name: '客户人数',
            id: 0,
            child: [
              {name: '客户总数', id: 0},
              {name: '新增客户', id: 1}
            ]
          },
          {
            name: '订单量',
            id: 1,
            child: [
              {name: '订单总数', id: 2},
              {name: '成交金额', id: 3}
            ]
          },
          {
            name: '互动频率',
            id: 2,
            child: [
              {name: '跟进总数', id: 4},
              {name: '咨询总数', id: 5}
            ]
          },
          {
            name: '成交率区间',
            id: 3,
            child: null
          },
        ],
        type_time: [
          {name: '全部', id: 0},
          {name: '近7天', id: 7},
          {name: '近15天', id: 15},
          {name: '近30天', id: 30},
        ],
        type1_id: 0,
        type2_id: 0,
        type3_id: 0,
        ranking_lists: [
          {logo: '', name: '王先生'},
          {logo: '', name: '王先生'},
          {logo: '', name: '王先生'},
          {logo: '', name: '王先生'},
          {logo: '', name: '王先生'},
          {logo: '', name: '王先生'},
          {logo: '', name: '王先生'},
          {logo: '', name: '王先生'},
          {logo: '', name: '王先生'},
        ],
        pt: 206 ,
        myRanking:{} ,
        navHeight:0,
        statusBarHeight:0,
        topThree:[],
        crownIcon :WXAJAX.imgBackUrl+'yimai_photos/crmRevision/champion.png',
        downIcon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/down-icon.png',
        selectId:'',
        chooseTimeShow:false,
        chooseName:'全部'
      }
    },
      mounted(){
          this.getTitleHeight();
          this.calculateNavBarHeight()
          this.getInits()
      },
    watch: {
      'menu_id': function (newVal, oldVal) {
        if (newVal == 1) {
          this.getInits();
        }
      },
      'type1_id': function (newVal, oldVal) {
        this.$nextTick(()=>{
          this.getTitleHeight();
        })
      }
    },
    methods: {
      getTitleHeight(){
        wx.createSelectorQuery().selectAll('.enterprise_menu, .saleRanking_top').boundingClientRect((rects)=>{
          let pt = 0;
          rects.map(val=>{
            pt += val.height || 0;
          });

          this.pt = pt;
        }).exec();
      },
      type_tap(size, id) {
        if (size == 1) {
          this.type1_id = id;
          this.type_text[id].child && (this.type2_id = this.type_text[id].child[0].id);
        } else if (size == 2) {
          this.type2_id = id;
        } else {
          this.type3_id = id;
        }
        this.getInits();

      },
      getInits() {//销售排行
        console.log(this.type1_id, this.type2_id, this.type3_id);
        let url = '',
          params = {ignore: true};

        switch (this.type1_id) {
          case 0 : //客户人数
            url = '/finance/selectCustomerNum';
            if (this.type2_id != 0) {
              params = {
                whereDate: 1,
              }
            }
            break;
          case 1 ://订单量
            url = '/finance/selectOrderNum';
            params.type = this.type2_id - 1;
            if (this.type3_id != 0) {
              params.days = this.type3_id;
            }

            break;
          case 2 ://互动频率
            url = '/finance/selectInteractionNum';
            params.type = this.type2_id - 3;
            if (this.type3_id != 0) {
              params.days = this.type3_id;
            }

            break;
          case 3 ://成交率区间
            url = '/finance/selectDelNum';
            if (this.type3_id != 0) {
              params.days = this.type3_id;
            }
            break;
        }


        wx.showLoading();
        let v = this;
        WXAJAX.POST(params, '', url).then((data) => {
          this.topThree = []
          wx.hideLoading();
          if(data){
            if (this.type1_id==1 && this.type2_id==3){
              data.data.map(val=>{
                val.data = (val.data/100).toFixed(2);
              })

              data.my.data = (data.my.data/100).toFixed(2);
            }
            this.myRanking = data.my ;
            this.ranking_lists = data.data;
            for(var i in this.ranking_lists){
              if(i >= 3){

              }else{
                this.topThree.push(this.ranking_lists[i])
              }

            }
            this.ranking_lists.splice(0,3)
          }

        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
        });
      },
      calculateNavBarHeight () {
        let menuButtonBounding = getApp().globalData.menuButtonBounding;
        wx.getSystemInfo({
          success: res => {
            let statusBarHeight = res.statusBarHeight; //胶囊按钮与顶部的距离
            let navHeight = statusBarHeight + (menuButtonBounding.top - statusBarHeight) * 2 + menuButtonBounding.height; //导航高度
            this.navHeight = navHeight;
            this.statusBarHeight = statusBarHeight
          },
          fail (err) {
            console.log(err);
          }
        });
      },
      chooseTime(id,name){
        this.selectId = id
        this.chooseTimeShow = false
        this.chooseName = name
        this.type_tap(3,id)
      },
      selectClass(){
        this.chooseTimeShow = true
      },
      toBack(){
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
</script>

<style scoped>
.sale-ranking{
  background-image:url('https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/enterprise_top.png');
  background-size:100% 500upx;
  background-repeat: no-repeat;
}
.sale-ranking-top {
  position: relative;
}

/* .ranking_order.active p {
  color: #FFA133;
} */

/* .ranking_order.active img::before {
  content: '';
  position: absolute;
  width: 28upx;
  height: 42upx;
  border-radius: 0 0 10upx 10upx;
  background: #FFA133;
  top: 0;
  left: 12upx;
} */
.type2_select{
  height:48upx;
  background:rgba(255,255,255,0.3);
  border-radius:24upx;
}
.sale-ranking_center_icon{
  width: 100%;
  height: 40upx;
  box-sizing: border-box;
  padding-top: 32upx;
}
.sale-ranking_center_icon span{
  display: block;
  width:100upx;
  height:8upx;
  background:rgba(245,245,246,1);
  border-radius:4upx;
  margin:0 auto;
}
.user_photo_box{
  width: 120upx;
  height: 120upx;
  border-radius: 50%;
  background:rgba(255,255,255,0.15);
  display: flex;
  justify-content: center;
  align-items: center;
}
.user_photo_box img{
  width: 100upx;
  height: 100upx;
  border-radius: 50%;
}
.user_box{
  position: absolute;
  bottom: 20upx;
}
.sale-ranking-list{

}
.top-three{
  height: 437upx;
  padding:21upx 60upx 0 60upx;
  display: flex;
  justify-content: space-between;
}
.person{
  max-width: 140upx;
  height: 100%;
  overflow: hidden;
  padding-top: 152upx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120upx;
  position: relative;
}
.person p{
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.champion{
  padding-top: 38upx;
}
.champion span{
  text-align: center;
  display: block;
  width: 124upx;
  height: 52upx;
  font-size:28upx;
  text-align: center;
  background: #FE7563;
  border-radius: 52upx;
  color: #ffffff;
  line-height: 52upx;
  margin:0 auto;
}
.crown{
  position: absolute;
  top: 0;
  left: 0;
}
.person_ranking{
  display: block;
  width: 60upx;
  height: 30upx;
  border-radius:30upx;
  background: #FCAD3D;
  font-size: 20upx;
  text-align: center;
  line-height: 30upx;
  color: #ffffff;
  position:absolute;
  top:252upx;
  left: 0;
  right: 0;
  margin: auto;
}
.isdisplay{
  opacity: 0;
}
</style>






























