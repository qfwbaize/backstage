<template>
  <view class="tab-block">
    <ul class="tab-list" :class="showMiddleButton === true?'tab-list-middle':'tab-list-default'">
      <li v-for="(item, index) in tabList" @click="handlePush(item, index)" class="item-li" :key="index">
        <view v-show="unreadMsg != 0">
          <view v-if="index == 3" class="bubble">{{unreadMsg}}</view>
        </view>
        <view class="item-img-box">
          <image class="item-img" :src="tabIndex == index ? item.selectedIconPath :item.iconPath"
             mode="">
          </image>
        </view>
        <view class="item-text" :class="{ textlsit : tabIndex == index}">{{item.text}}</view>
      </li>
    </ul>
  </view>
</template>

<script>
  export default {
    name: "tabbar",
    props: {
      tabIndex: { //当前选中的tab项
        type: Number,
        default: 0
      },
      unreadMsg:'',
    },
    // props:['unreadMsg'],
    data() {
      return {
        tabList: [{
            iconPath: '/static/tabs/find.png',
            selectedIconPath: "/static/tabs/find-active.png",
            text: '发现',
            pagePath: '/pages/find/index',
            middleClass: ''
          },
          {
            iconPath: '/static/tabs/spread.png',
            selectedIconPath: '/static/tabs/spread-active.png',
            text: '传播',
            pagePath: '/pages/spread/main',
            middleClass: ''
          },
          {
            iconPath: '/static/tabs/follow.png',
            selectedIconPath: '/static/tabs/follow-active.png',
            text: '跟进',
            pagePath: '/pages/index/main',
            middleClass: ''
          },
          {
            iconPath: '/static/tabs/msg.png',
            selectedIconPath: '/static/tabs/msg-active.png',
            text: '消息',
            pagePath: '/pages/msg/main',
            middleClass: ''
          },
          {
            iconPath: '/static/tabs/user.png',
            selectedIconPath: '/static/tabs/user-active.png',
            text: '个人中心',
            pagePath: '/pages/mine/main',
            middleClass: ''
          }
        ],
        showTabBar: false,
        userCard:[]
      };
    },
    methods: {
      handlePush(item, index) {
        if (this.tabIndex !== index) {
          uni.redirectTo({
            url: item.pagePath,
          })
        }
      },
    }
  }
</script>

<style>
  .tab-block {
    height: 135rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-size: contain;
    width: 100vw;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 12px #A2A2A2;
  }

  .tab-list {
    height: 110rpx;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 10rpx;
  }

  .list-item {
    display: flex;
    flex: 1;
  }

  .item-li {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    flex: 1;

  }
  .item-li:nth-child(4){
     position: relative;
  }
  .item-img-box {
    width: 50rpx;
    height: 50rpx;
    margin-bottom: 15rpx;
  }

  .item-img {
    width: 100%;
    height: 100%;
  }

  .item-text {
    /* margin-left: 50rpx; */
    z-index: 1002;
    font-size: 20rpx;
    color: #000000;
  }

  .textlsit {
    color: #51CDCB;
  }
  .bubble{
    position: absolute;
    top: 0;
    right: 15rpx;
    width: 35rpx;
    height: 35rpx;
    font-size: 20rpx;
    background-color:#FF0000 ;
    border-radius: 50%;
    color: #FFFFFF;
    text-align: center;
    line-height: 35rpx;
  }
</style>
