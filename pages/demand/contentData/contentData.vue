<template>
  <view class="content">
    <view class="lineTop">
      <view style="font-weight: bold;">数据趋势</view>
      <view class="selectInput">
        <picker @change="bindPickerChange" :value="index" :range="array">
          <view style="color: #a1a2a1;">{{array[index]}}</view>
        </picker>
      </view>
    </view>
   <view class="echarts">
       <canvas style="width: 100%;height: 100%;" canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchend="touchEndLineA"></canvas>
   </view>

    <view class="dataCenter">
      <view class="lineTop">
        <view style="font-weight: bold;">{{array[index]}}阅读量最多文章</view>
        <view style="color: #00BBAE;font-size: 28rpx;">排行榜</view>
      </view>
      <view class="article">
        <view class="articleImg">
          <image style="width: 124rpx;height: 124rpx;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-gift@3x.png" mode=""></image>
        </view>
        <view style="margin-left: 15rpx;">
          <view class="articleTitle">骨质疏松疾病的治疗与预防</view>
          <view class="articleData">
            <view style="display: flex;">
              <image style="margin-top: 4rpx; width: 42rpx;height: 42rpx;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-gift@3x.png" mode=""></image>
              <view style="font-size: 24rpx;color:#a1a2a1;">170</view>
             </view>
            <view style="display: flex;">
              <image style="margin-top: 4rpx; width: 42rpx;height: 42rpx;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-gift@3x.png" mode=""></image>
              <view style="font-size: 28rpx;color:#00BBAE;">170次</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="dataBottom">
      <view class="lineTop">
        <view style="font-weight: bold;">{{array[index]}}内容数据</view>
        <view ></view>
      </view>
      <view class="selectNav">
        <view :class="ativeIndex == 0 ? 'activeIndex' :'active' " @click="ativeIndex = 0">文章</view>
        <view :class="ativeIndex == 1 ? 'activeIndex' :'active' " @click="ativeIndex = 1">视频</view>
        <view :class="ativeIndex == 2 ? 'activeIndex' :'active' " @click="ativeIndex = 2">文件</view>
      </view>
      <view class="tableList">
        <view class="tableHead">
          <view class="tableTitle">标题</view>
          <view class="tableText">阅读</view>
          <view class="tableText">点赞</view>
          <view class="tableText">评论</view>
        </view>
        <view class="">
          <view class="tableHead" @click="toShow">
            <view class="tableTitle">骨质疏松疾病的治...</view>
            <view class="tableText">170</view>
            <view class="tableText">30</view>
            <view class="tableText">30</view>
          </view>
          <view class="showData" v-show="show">
            <view class="showText">
              <view class="showMsg">转发数量</view>
              <view class="showMsg">总阅读量</view>
              <view class="showMsg">总点赞数</view>
            </view>
            <view class="showText">
              <view class="showMessage">30</view>
              <view class="showMessage">30</view>
              <view class="showMessage">30</view>
            </view>

          </view>
        </view>

        <view class="">
          <view class="tableHead" @click="toShow">
            <view class="tableTitle">骨质疏松疾病的治...</view>
            <view class="tableText">170</view>
            <view class="tableText">30</view>
            <view class="tableText">30</view>
          </view>
          <view class="showData" v-show="show">
            <view class="showText">
              <view class="showMsg">转发数量</view>
              <view class="showMsg">总阅读量</view>
              <view class="showMsg">总点赞数</view>
            </view>
            <view class="showText">
              <view class="showMessage">30</view>
              <view class="showMessage">30</view>
              <view class="showMessage">30</view>
            </view>

          </view>
        </view>

        <view class="">
          <view class="tableHead" @click="toShow">
            <view class="tableTitle">骨质疏松疾病的治...</view>
            <view class="tableText">170</view>
            <view class="tableText">30</view>
            <view class="tableText">30</view>
          </view>
          <view class="showData" v-show="show">
            <view class="showText">
              <view class="showMsg">转发数量</view>
              <view class="showMsg">总阅读量</view>
              <view class="showMsg">总点赞数</view>
            </view>
            <view class="showText">
              <view class="showMessage">30</view>
              <view class="showMessage">30</view>
              <view class="showMessage">30</view>
            </view>

          </view>
        </view>

        <view class="allin">查看全部</view>

      </view>
    </view>

  </view>
</template>

<script>
  import uCharts from '@/js_sdk/u-charts/u-charts.js';
  import {
    isJSON
  } from '@/common/checker.js';
  var _self;
  var canvaLineA = null;
  var lastMoveTime = null; //最后执行移动的时间戳
  export default {
    data() {
      return {
        array: ['近七日', '近30日', '近半年'],
        index: 0,
        ativeIndex:0,
        show:false,
        
        cWidth: '',
        cHeight: '',
        pixelRatio: 1,
        textarea: '',
        Interactive: '', //交互显示的数据


      }
    },

   onLoad() {
     _self = this;
     this.cWidth = uni.upx2px(670);
     this.cHeight = uni.upx2px(368);
     this.getServerData();
   },
    methods: {
      getServerData() {
        let LineA = {
          "categories": [
            "9.1",
            "9.2",
            "9.3",
            "9.4",
            "9.5",
            "9.6"
          ],
          "series": [{
              "name": "文章阅读量",
              "data": [
                35,
                8,
                25,
                37,
                4,
                20
              ]
            },
            {
              "name": "视频播放量",
              "data": [
                70,
                40,
                65,
                100,
                44,
                68
              ]
            }
          ]
        }
        //第二根线为虚线的设置
        // LineA.series[1].lineType='dash';
        // LineA.series[1].dashLength=10;
        _self.textarea = JSON.stringify(LineA);
        _self.showLineA("canvasLineA", LineA);
      
      },
      showLineA(canvasId, chartData) {
        console.log("chartData", chartData)
        canvaLineA = new uCharts({
          $this: _self,
          pixelRatio: _self.pixelRatio,
          categories: chartData.categories,
          series: chartData.series,
          width: _self.cWidth * _self.pixelRatio,
          height: _self.cHeight * _self.pixelRatio,
          canvasId: canvasId,
      
          type: 'line',
          colors: ['#5087EC', '#68BBC4', '#8543e0', '#90ed7d'],
          fontSize: 11,
          padding: [0, 0, 0, 0],
          legend: {
            show: true,
            margin: 12,
            position: 'top',
            fontSize: 11,
            borderWidth: 1,
          },
          dataLabel: true,
          dataPointShape: true,
      
          animation: true,
          xAxis: {
            type: 'grid',
            gridColor: '#CCCCCC',
            gridType: 'solid',
            disableGrid: true
          },
          yAxis: {
            gridType: 'dash',
            gridColor: '#CCCCCC',
            "dashLength": 2,
          },
      
          extra: {
            line: {
              type: 'straight',
              width: 1,
            }
          }
        });
      
      },
      touchEndLineA(e) {
        let currIndex = canvaLineA.getCurrentDataIndex(e);
        if (currIndex > -1 && currIndex < canvaLineA.opts.categories.length) {
          let riqi = canvaLineA.opts.categories[currIndex];
          let leibie = canvaLineA.opts.series[0].name;
          let shuju = canvaLineA.opts.series[0].data[currIndex];
          this.Interactive = leibie + ':' + riqi + '-' + shuju + '元';
        }
        canvaLineA.touchLegend(e);
        canvaLineA.showToolTip(e, {
          format: function(item, category) {
            return category + ' ' + item.name + ':' + item.data
          }
        });
      },
      toShow(){
        this.show = !this.show
      },
      bindPickerChange(e) {
        this.index = e.target.value
      },
      selectNav(index){
        this.ativeIndex = index
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 670rpx;
    padding: 40rpx 40rpx;
    background-color: #FFFFFF;
  }

  .lineTop {
    width: 670rpx;
    height: 60rpx;
    display: flex;
    justify-content: space-between;
    line-height: 60rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    font-family: PingFangSC-semiBold;

  }
  .selectInput{
    width: 140rpx;
    height: 50rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    box-shadow: 0px 2rpx 2rpx 0px rgba(0, 0, 0, 0.4);
    font-family: Microsoft Yahei;
    margin-top: 5rpx;
    text-align: center;
    line-height: 50rpx;
  }
  .echarts{
    width:670rpx;
    height: 366rpx;
    margin-top: 40rpx;
    margin-bottom: 60rpx;
  }
  .charts-box{
    width: 100%;
    height: 300px;
  }
  .article{
    width:670rpx;
    height: 124rpx;
    margin-top: 40rpx;
    margin-bottom: 30rpx;
    display: flex;
  }
  .articleTitle{
    width: 410rpx;
    height: 70rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular
  }
  .articleData{
    width:520rpx;
    height: 50rpx;
    line-height: 50rpx;
    display: flex;
    justify-content: space-between;
  }
  .selectNav{
    width: 310rpx;
    height: 64rpx;
    line-height: 64rpx;
    margin-top: 40rpx;
    margin-bottom: 50rpx;
    margin-left: 180rpx;
    display: flex;
  }
  .active{
    flex:1;
    height: 64rpx;
    text-align: center;
    font-size: 28rpx;
  }
  .activeIndex{
    text-align: center;
    flex:1;
    height: 64rpx;
    color: skyblue;
    border-bottom: 1px solid skyblue;
    font-size: 28rpx;
  }
  .tableHead{
    width: 670rpx;
    height:45rpx;
    display: flex;
    margin: 50rpx 0;
  }
  .tableTitle{
    width: 300rpx;
    font-size: 28rpx;
    color:#a1a2a1;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .tableText{
    flex: 1;
    font-size: 28rpx;
    color:#a1a2a1;
    text-align: center;
  }
  .showData{
    width: 670rpx;
    height: 200rpx;
    background-color: rgba(0, 0, 0, 0.03);
  }
  .showText{
    width: 100%;
    height: 100rpx;
    display: flex;
    text-align: center;
    line-height: 100rpx;
  }
  .showMsg{
    flex: 1;
    font-size: 28rpx;
  }
  .showMessage{
    flex: 1;
    font-size: 28rpx;
    color:#00BBAE;
  }
  .allin{
    width: 100%;
    color:#a1a2a1;
    text-align: center;
    margin: 40rpx 0;
  }
</style>
