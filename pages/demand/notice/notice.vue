<template>
  <div class="borderbox bgfff content">

    <div class="">
      <div class="bbf5f6">
        <div class="disflex jsbet h44 align-cen pl15 pr15" style="position: relative;">
          <div class="fs14 c78">通知列表</div>
          <!-- <span class="spot" v-show="checkLength != 0 ">{{checkLength}}</span> -->
          <div class="disflex align-cen">
            <img :src="icon4" class="w15 h15 mr7" alt="">
            <p class="fs14 cblue" @click="show_dialog_box">清除未读</p>
          </div>
          <!-- <div class="disflex align-cen">
            <img :src="icon3" class="w15 h15 mr7" alt="">
            <p class="fs14 cblue" @click="allDel">全部删除</p>
          </div> -->
        </div>
      </div>
      <div class="pl15 pr15 pb15">

        <div class="order-item" :data-index="index" @touchstart="drawStarts" @touchmove="drawMoves" @touchend="drawEnds"
          :style="'right:'+item.right+'px'" v-for="(item,index) in noticeList" :key="index">
          <!-- 列表内容 -->
          <div class="w100p msg_box  pt20 pr23 pb16 pl15 posre mt10" @click="setRead(item.id)">
            <div class="disflex">
              <div v-show="item.is_read == 1" style="width: 8rpx;" class="w4 h4 bgblue bradius50p mr7 mt10"></div>
              <div v-show="item.is_read == 0" style="background-color: red; width: 8rpx;"
                class="w4 h4 bradius50p mr7 mt10"></div>
              <div class="flex1 lh27 fs14 c38">
                <span class="cblue">{{item.content}}</span>
              </div>
            </div>
            <div class="lh27 fs12 c38" style="text-align: right;color: #afafaf;">{{item.create_time}}</div>
          </div>
          <!-- 删除 -->
          <div class="remove" @click="delMechanism(item.id)">删除</div>
        </div>


        <!-- 通知 -->
        <div class="order-item" :data-index="index" @touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd"
          :style="'right:'+item.right+'px'" v-for="(item,index) in checkList" :key="index">
          <!-- 列表内容 -->
          <div class="w100p msg_box  pt20 pr23 pb16 pl15 posre mt10">
            <div class="disflex">
              <div v-show="item.type == 1" style="width: 8rpx;" class="w4 h4 bgblue bradius50p mr7 mt10"></div>
              <div v-show="item.type == 0" style="background-color: red; width: 8rpx;"
                class="w4 h4 bradius50p mr7 mt10"></div>
              <div class="flex1 lh27 fs14 c38" @click="notification_tap(item,true)">
                <span class="cblue">{{item.message}}</span>
              </div>
            </div>
            <div class="lh27 fs12 c38" style="text-align: right;color: #afafaf;">{{item.checkTime}}</div>
          </div>
          <!-- 删除 -->
          <div class="remove" @click="delData(item)">删除</div>
        </div>


        <div class="pt90 disflex flex-column jscen align-cen" v-if="checkList.length == 0 && noticeList.length == 0">
          <img :src="icon_nodata" class="w170 h170">
          <span class="ca8 fs12 mt10">暂无通知消息</span>
        </div>
      </div>
    </div>

    <div v-if="showDialog">
      <promptDialogBox :dialog_doc="dialog_doc" @dialogbox_tap="dialogbox_tap" @btn_tap="btn_tap">
      </promptDialogBox>
    </div>

  </div>
</template>

<script>
  import NoData from "@/components/noData";
  import store from "../../../store/index";
  import MsgBox from "@/components/msgBox"; // 订单项
  import websocket from "../../../utils/websocket";
  import HandleLogin from "@/utils/handleLogin";
  import {
    authSubscribeMessage
  } from "../../../utils/auth.js";
  import {
    mapGetters,
    mapState
  } from "vuex";
  import WXAJAX from "../../../utils/request";
  import utils from "../../../utils/index"
  import http from "../../../utils/http"
  import promptDialogBox from "@/components/promptDialogBox"
  import {
    toMiniProgram
  } from "@/utils";

  export default {
    name: "",
    components: {
      MsgBox,
      NoData,
      promptDialogBox
    },
    computed: {
      ...mapGetters(["subscriptionNew"])
    },
    data() {
      return {
        page: 1,
        msg_lists: [],
        notice: [{
          title: '需求',
          isCheck: false
        }, {
          title: '需求',
          isCheck: false
        }, {
          title: '产品',
          isCheck: false
        }, {
          title: '名片',
          isCheck: false
        }],
        navHeight: '',
        navBarUserHeight: '',
        navTop: '',
        leftIcon: WXAJAX.imgBackUrl + '/yimai_photos/crmAdd/Icon_back.png',
        tabType: 1,
        icon3: WXAJAX.imgBackUrl + '/yimai_photos/user/del.png',
        icon4: WXAJAX.imgBackUrl + '/yimai_photos/user/msg/ic_clear@2x.png',
        icon_nodata: WXAJAX.imgBackUrl + '/product-index/20190418164236.png',
        scrollChange: false,
        notificationList: '',
        orderList: '', //订单列表
        checkList: '', //审核列表
        orderLength: 0, //订单数量
        checkLength: 0, //审核数量
        orderTime: '', //订单时间
        checkTime: '', //审核时间
        allLength: '',
        showDialog: false,
        dialog_doc: '',
        delBtnWidth: 100,
        noticeList:[],
        pages:1,
      };
    },
    /** tab点击 */
    onTabItemTap(item) {
      //订阅授权 信息相关
      authSubscribeMessage(this.subscriptionNew);
    },
    onShow() {
      this.getMechanismsg()
      websocket.sendSocketJSON("1011");
      // websocket.sendSocketJSON("1010");
    },
    onReachBottom(){
      this.pages++
      this.getMechanismsg()
    },
    onPullDownRefresh(){
      this.pages = 1
      this.getMechanismsg()
    },
    watch: {
      'msgCont': {
        deep: true,
        immediate: true,
        handler(value) {
          this.notificationList = value.notificationList
          if (!this.notificationList) {
            return
          }
          this.checkFilter()
        }
      },
    },
    computed: {
      ...mapState(['msgCont']),
    },
    methods: {
      //设置已读
      setRead(e){
        var data = {
          id:e
        }
        http({url:'/apis/messages/read',method:'GET',data:data}).then(res=>{
          if(res.data.code == 200){
            this.getMechanismsg()
          }
        })
      },
      //开始触摸滑动
      drawStarts(e) {
        // console.log("开始触发");
        var touch = e.touches[0];
        this.startX = touch.clientX;
      },
      //触摸滑动
      drawMoves(e) {
        // console.log("滑动");
        for (var index in this.noticeList) {
          this.$set(this.noticeList[index], 'right', 0);
        }
        var touch = e.touches[0];
        var item = this.noticeList[e.currentTarget.dataset.index];
        var disX = this.startX - touch.clientX;
        if (disX >= 20) {
          if (disX > this.delBtnWidth) {
            disX = this.delBtnWidth;
          }
          this.$set(this.noticeList[e.currentTarget.dataset.index], 'right', disX);
        } else {
          this.$set(this.noticeList[e.currentTarget.dataset.index], 'right', 0);
        }
      },
      //触摸滑动结束
      drawEnds(e) {
        // console.log("滑动结束");
        var item = this.noticeList[e.currentTarget.dataset.index];
        if (item.right >= this.delBtnWidth / 2) {
          this.$set(this.noticeList[e.currentTarget.dataset.index], 'right', this.delBtnWidth);
        } else {
          this.$set(this.noticeList[e.currentTarget.dataset.index], 'right', 0);
        }
      },
      //删除机构消息
      delMechanism(e){
        var data = {
          id:e
        }
        http({url:'/apis/messages/del',method:'DELETE',data:data}).then(res=>{
          if(res.data.code == 200){
            this.getMechanismsg()
            uni.showToast({
              title:'删除成功',
              icon:'none'
            })
          }
        })
      },
      //获取机构消息列表
      getMechanismsg(){
        var data = {
          page:this.pages,
        }
        http({url:'/apis/messages/index',method:'GET',data:data}).then(res=>{
          if(res.data.code == 200){
            console.log(this.pages,9999999)
            if(this.pages == 1 ){
              this.noticeList = res.data.data
            }else{
              this.noticeList = [...this.noticeList,...res.data.data]
            }

          }
        })
      },
      //全部删除
      allDel(){
        if(this.checkList.length !== 0){
          let allDelparam = {
            code: 1013,
          }
          websocket.deleteStatus(allDelparam)
          this.checkFilter()
          uni.showToast({
            title:'删除成功',
            icon:'none'
          })
        }

      },
      //开始触摸滑动
      drawStart(e) {
        // console.log("开始触发");
        var touch = e.touches[0];
        this.startX = touch.clientX;
      },
      //触摸滑动
      drawMove(e) {
        // console.log("滑动");
        for (var index in this.checkList) {
          this.$set(this.checkList[index], 'right', 0);
        }
        var touch = e.touches[0];
        var item = this.checkList[e.currentTarget.dataset.index];
        var disX = this.startX - touch.clientX;
        if (disX >= 20) {
          if (disX > this.delBtnWidth) {
            disX = this.delBtnWidth;
          }
          this.$set(this.checkList[e.currentTarget.dataset.index], 'right', disX);
        } else {
          this.$set(this.checkList[e.currentTarget.dataset.index], 'right', 0);
        }
      },
      //触摸滑动结束
      drawEnd(e) {
        // console.log("滑动结束");
        var item = this.checkList[e.currentTarget.dataset.index];
        if (item.right >= this.delBtnWidth / 2) {
          this.$set(this.checkList[e.currentTarget.dataset.index], 'right', this.delBtnWidth);
        } else {
          this.$set(this.checkList[e.currentTarget.dataset.index], 'right', 0);
        }
      },
      //删除方法
      delData(item) {
        let delparam = {
          message:item,
          type: item.type,
          code: 1013,
          targetId: item.companyId,
          noticeType: item.noticeType
        }
        websocket.deleteStatus(delparam)
        this.checkFilter()
        uni.showToast({
          title:'删除成功',
          icon:'none'
        })
      },
      //通知列表
      checkFilter() {
        let unreadLength = ''
        let orderList = []
        let arr = this.notificationList
        for (var i in arr) {
          arr[i].checkTime = utils.getdate(arr[i].time, 'monthTime')
          orderList.push(arr[i])
        }
        orderList = orderList.reverse()
        unreadLength = orderList.filter(v => {
          return v.type == 0
        })
        this.checkLength = unreadLength.length
        if (this.checkLength >= 100) {
          this.checkLength = 99
        }
        if (this.checkLength) {
          this.dialog_doc = '此操作会将未读的通知提示全部标记为已读'
        } else {
          this.dialog_doc = ''
        }
        this.checkList = orderList
      },
      //点击读取并跳转
      notification_tap(item, type) {
        if (item.type == 0) {
          let param = {
            type: item.type,
            code: 1012,
            targetId: item.companyId,
            noticeType: item.noticeType
          }
          websocket.updateStatus(param)
        }
        if (item.itemId) { //文章详情
          if (item.noticeType == 111 || item.noticeType == 112 || item.noticeType == 113 || item.noticeType == 114) {
            uni.navigateTo({
              url: '../../companyPack/find/dynamicDetail/main?dynamicId=' + item.itemId + '&companyId=' + item
                .companyId
            })
          }

        }
        if (item.itemId) { //动态详情
          if (item.noticeType == 6) {
            uni.navigateTo({
              url: '../../companyPack/commentDetail/main?dynamicId=' + item.itemId + '&companyId=' + item.companyId
            })
          }

        }
        if (item.noticeType == 1) { //名片审核通知
          uni.navigateTo({
            url: '../../companyPack/tendencies/main'
          })
        } else if (item.noticeType == 8) { //产品审核通知
          uni.navigateTo({
            url: '../../companyPack/prodDetail/index?goodsId=' + item.itemId
          })
        } else if (item.noticeType == 9) { //需求审核通知
          uni.navigateTo({
            url: '../adminDemand/adminDemand'
          })
        }
        // if(item.noticeType == 2 || item.noticeType == 10){
        // 		uni.navigateTo({
        // 			url:'../orderLists/main'
        // 		})
        // }
        if (item.itemId) { //跳转到任务大厅
          if (item.noticeType == 17 || item.noticeType == 18 || item.noticeType == 19 || item.noticeType == 20) {
            uni.navigateTo({
              url: '../taskHall/taskHall'
            })
          }
        }


      },
      show_dialog_box() {
        this.noticeList.forEach(item=>{
          if(item.is_read == 0){
            this.setRead(item.id)
          }
        })
        this.showDialog = true
      },
      //设置消息读取弹框显隐
      dialogbox_tap() {
        this.showDialog = false
      },
      //设置消息全部已读
      btn_tap() {
        websocket.sendSocketJSON('1012')
        wx.showLoading({
          title: '清理中',
          mask: true
        })
        setTimeout(function() {
          websocket.sendSocketJSON('1011')
          wx.hideLoading()
        }, 1000)

        this.showDialog = false

      },
    }

  };
</script>
<style>
  page {
    background: #ffffff;
  }
</style>
<style scoped>
  .content{
    width: 100vw;
    overflow: hidden;
  }
  .spot {
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
    background-color: red;
    line-height: 36rpx;
    text-align: center;
    font-size: 20rpx;
    color: #FFFFFF;
    position: absolute;
    top: 26rpx;
    left: 160rpx;
  }

  .back-btn {
    position: fixed;
    bottom: 40upx;
    right: 40upx;
  }

  .title {
    font-size: 36upx;
    color: #383838;
    opacity: 0.4;
    transition: all .2s;
  }

  .active {
    font-size: 40upx;
    color: #383838;
    transition: all .2s;
  }

  .msg_box {
    background: #F5F5F6;
    border-radius: 10upx;
  }

  .triangle {
    position: absolute;
    left: 15upx;
    top: -19upx;
    width: 0;
    height: 0;
    border-width: 0 20upx 20upx;
    border-style: solid;
    border-color: transparent transparent #F5F5F6;
  }

  .float_number {
    position: absolute;
    display: block;
    width: 30upx;
    height: 30upx;
    background: #FD634E;
    border-radius: 50%;
    font-size: 18upx;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .list_number_positon {
    top: -15upx;
    left: 40upx;
  }

  .top_number_position {
    top: -5upx;
    left: 65upx;
  }

  .remove {
    width: 80px;
    height: calc(100% - 20rpx);
    background-color: red;
    color: white;
    position: absolute;
    top: 0;
    right: -120rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
  }

  .order-item {
    width: 100%;
    display: flex;
    position: relative;
  }
</style>
