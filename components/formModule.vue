<template>
  <div>
    <!-- 单选项 -->
    <div class="singleChoice bbe8 mb20">
      <div class="disflex mb20">
        <span class="w6 h18 bgblue mr13"></span>
        <p class="fs18 fbold lh1">单选项</p>
      </div>
      <div class="disflex mb15 ml19" v-for="(item,index) in items" :key="index" @click="singleChoice(index)">
        <div class="w20 h20 bradius10 b2e8 disflex jscen align-cen mr8 "
             style="transition: all .4s" :class="index ==
             singleCurrent ? 'active' : ''">
          <span class="disblock w10 h10 bradius5" style="transition: all .4s"></span>
        </div>
        <p class="fs16" :class="index == singleCurrent ? 'c38' : 'c78' ">{{item.name}}</p>
      </div>
    </div>
    <!-- 复选项 -->
    <div class="checkChoice bbe8 mb20">
      <div class="disflex mb20">
        <span class="w6 h18 bgblue mr13"></span>
        <p class="fs18 fbold lh1">复选项</p>
      </div>
      <div class="disflex mb15 ml19"
           v-for="(item,index) in items"
           :key="index" @click="checkChoice(item)">
        <div class="w20 h20 bradius3 b2e8 disflex jscen align-cen mr8 "
             style="transition: all .4s"
             :class="item.checked ? 'active' : ''">
          <span class="disblock w10 h10 bradius2" style="transition: all .4s"></span>
        </div>
        <p class="fs16" :class="item.checked ? 'c38' : 'c78' ">{{item.name}}</p>
      </div>
    </div>
    <!-- 下拉选项 -->
    <div class="drop_down bbe8 mb20">
      <div class="disflex mb20">
        <span class="w6 h18 bgblue mr13"></span>
        <p class="fs18 fbold lh1">下拉选项</p>
      </div>
      <div class="disflex jsbet align-cen pb15 posre" @click="dropDownTap">
        <p class="fs16 ce8 ml19">请选择内容</p>
        <img :src="rightIcon" class="w10 h10">
        <div class="posab w100p bgfff downBox" :class="dropDown ? 'showDropDown' : ''">
          <div class="problemBox bgfff">
            <div class="fs16 c78 mb10" v-for="(item,index) in title" :class="dropDown ? 'activeDropDown' : ''" :key="index">
              {{item.dec}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 文本框 -->
    <div class="textChoice bbe8 mb20">
      <div class="disflex mb20">
        <span class="w6 h18 bgblue mr13"></span>
        <p class="fs18 fbold lh1">文本框</p>
      </div>
      <div class="pl20 pr20 posre">
        <textarea class="w100p pb28"
                  maxlength="500"
                  @input="text_tap"
                  placeholder="请输入内容"></textarea>
        <p class="c78 textLength">{{text.length}}/500</p>
      </div>
    </div>
    <!-- 评分 -->
    <div class="starChoice bbe8 mb20">
      <div class="disflex mb20">
        <span class="w6 h18 bgblue mr13"></span>
        <p class="fs18 fbold lh1">评分</p>
      </div>
      <div class="disflex flex-column">
        <div class="disflex mb15 jsbet" v-for="(item,index) in starArr" :key="index">
            <span class="fs16 ca7">{{item.title}}</span>
            <div class="disflex ">
              <span class="starImg"
                  v-for="(v,k) in star"
                  :key="k"
                  :class="item.choice >= k ? 'selectStar' : ''"
                  @click="star_tap(k,item)"></span>
            </div>
        </div>
      </div>
    </div>
    <!-- 图片上传 -->
    <div class="imgChoice bbe8 mb20">
      <div class="disflex mb20">
        <span class="w6 h18 bgblue mr13"></span>
        <p class="fs18 fbold lh1">图片上传</p>
      </div>
      <p class="fs14 ca7 mb20">建议上传不超过4MB的jpg/png图片</p>
      <div class="disflex wrap mb20">
        <div class="bgfff bdash_a8 w80 h80 mr7 mb7 posre"
             v-for="(v,k) in self_photos"
             :key="k">
          <img mode="aspectFill"
               :src="v"
               alt=""
               class="w100p h100p">
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png"
               alt=""
               class="w20 h20 posab right2 top2"
               @click="delImg(k)">
        </div>
        <div v-if="self_photos.length < 3"
             class="bdash_a8 w80 h80 add_img mr7"
             @click="uploadpic('self', 3)"></div>
      </div>
    </div>
    <!-- 地址定位 -->
    <div class="imgChoice bbe8 mb20">
      <div class="disflex mb20">
        <span class="w6 h18 bgblue mr13"></span>
        <p class="fs18 fbold lh1">地址定位</p>
      </div>
      <div class="disflex jsbet mb20 align-cen" @click="position_tap">
        <p class="fs16 ca7">{{address || '点击获取地理位置'}}</p>
        <img :src="rightIcon" class="w10 h10">
      </div>
    </div>
    <!-- 个人信息 -->
    <div class="information bbe8 mb20">
      <div class="disflex mb20">
        <span class="w6 h18 bgblue mr13"></span>
        <p class="fs18 fbold lh1">个人信息</p>
      </div>
      <div class="disflex flex-column mb20">
        <input class="bradius5 bgf5f6 h39 mb10 pl15 pr15 fs16 ca7" placeholder="姓名"  type="text">
        <input class="bradius5 bgf5f6 h39 mb10 pl15 pr15 fs16 ca7" placeholder="联系电话"  type="text">
        <input class="bradius5 bgf5f6 h39 pl15 pr15 fs16 ca7" placeholder="联系地址"  type="text">
      </div>
    </div>
    <!-- 提交日期 -->
    <div class="information mb20">
      <div class="disflex mb20">
        <span class="w6 h18 bgblue mr13"></span>
        <p class="fs18 fbold lh1">提交日期</p>
      </div>
      <div class="bbe8">
        <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
          <div class="disflex jsbet align-cen bbe8 pt10 pl18 pb10">
            <p class="fs16 ca7">{{ specificDate || '请选择年月日'}}</p>
            <img :src="rightIcon" class="w10 h10">
          </div>
        </picker>
      </div>
      <div>
        <picker mode="time" :value="time" start="00:01" end="23:59" @change="bindTimeChange">
          <div class="disflex jsbet align-cen bbe8 pt10 pl18 pb10">
            <p class="fs16 ca7">{{hourData || '请选择时间'}}</p>
            <img :src="rightIcon" class="w10 h10">
          </div>
        </picker>
      </div>
    </div>
  </div>
</template>

<script>
import WXAJAX from "@/utils/request";
import util from "@/utils/index";

export default {
  name: '',
  props:[],
  components: {},

  data() {
    const currentDate = this.getDate({
        format: true
    })
    return{
       items: [{
          value: 'USA',
          name: '美国',
          checked:false
        },
        {
          value: 'CHN',
          name: '中国',
          checked:false
        },
        {
          value: 'BRA',
          name: '巴西',
          checked:false
        },
        {
          value: 'JPN',
          name: '日本',
          checked:false
        },
        {
          value: 'ENG',
          name: '英国',
          checked:false
        },
        {
          value: 'FRA',
          name: '法国',
          checked:false
        },
      ],
      title:[{
        dec:'问题1'
      },{
        dec:'问题2'
      },{
        dec:'问题3'
      },{
        dec:'问题3'
      },{
        dec:'问题3'
      }],
      star:[0,1,2,3,4],
      starArr:[{
        title:1111111,
        choice:-1
      },{
        title:22222,
        choice:-1
      }],
      singleCurrent: 0,
      rightIcon:WXAJAX.imgBackUrl + '/yimai_photos/user/right.png',
      starIcon:WXAJAX.imgBackUrl + '/yimai_photos/crmAdd/icon_star@2x.png',
      unStartIcon:WXAJAX.imgBackUrl + '/yimai_photos/crmAdd/icon_star_unselected@2x.png',
      dropDown:false,
      starNum:'-1',
      text:'',
      self_photos: [],
      address:'',
      date: currentDate,
      time: '12:01',
      specificDate:'',
      hourData:''
    }
  },
  computed: {
      startDate() {
          return this.getDate('start');
      },
      endDate() {
          return this.getDate('end');
      }
  },
  onShow() {
    this.addressSplicing()
  },
  methods: {
    singleChoice(idx){
      this.singleCurrent = idx
    },
    checkChoice(item){
      item.checked = !item.checked
    },
    dropDownTap(){
      this.dropDown = !this.dropDown
    },
    star_tap(k,item){
      item.choice = k

    },
    text_tap(e){
      this.text = e.detail.value
    },

    async uploadpic(str, count) {
      // let a = this.card_msg;
      if (str == "self" && this.self_photos.length >= 9) {
        wx.showToast({
          title: "最多选择九张！",
          duration: 1500,
          icon: "none"
        });
        return;
      }
      this.showPageStatus = "0";
      let path = await util.chooseImage("file", count);
      if (!(path instanceof Array)) return;
      this.uploadImgFun(path, 0, str);
    },
    // 递归上传
    async uploadImgFun(arr, index = 0, str) {
      await this.uploadImg(arr[index], str);
      if (index < arr.length - 1) {
        this.uploadImgFun(arr, index + 1, str);
      }
    },
    uploadImg(path, str) {
      let v = this;
      wx.showLoading({ mask: true });
      return WXAJAX.UploadImage(path)
        .then(data => {
          wx.hideLoading();
          data = JSON.parse(data);
          if (data.code == "200") {
            if (str == "user") {
              console.log("头像上传", data);
              // v.$set(v.card_msg, 'picchecked', `${WXAJAX.imgBackUrl}${data.data}`);\

              v.card_msg.picchecked = `${WXAJAX.imgBackUrl}${data.data}`;
            } else if (str == "self") {
              this.self_photos.push(`${WXAJAX.imgBackUrl}${data.data}`);
            }
          } else {
            wx.showToast({
              title: "网络异常",
              duration: 2000,
              icon: "none"
            });
          }
        })
        .catch(err => {
          wx.hideLoading();
          console.log("err -- ", err);
        });
    },
    position_tap(){
      wx.navigateTo({
        url:"../companyPack/companyAddr/main"
      })
    },
    addressSplicing(){
      let add = uni.getStorageInfoSync('company_address')
      this.address = add.street +  add.build

    },
    delImg(index) {
      //删除图片
      wx.showLoading();
      this.self_photos.splice(index, 1);
      wx.hideLoading();
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === 'start') {
          year = year - 60;
      } else if (type === 'end') {
          year = year + 60;
      }
      month = month > 9 ? month : '0' + month;;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    },
    bindDateChange: function(e) {
      this.date = e.target.value
      this.specificDate = this.date
    },
    bindTimeChange: function(e) {
      this.time = e.target.value
      this.hourData = this.time
    },
  },

}
</script>

<style scoped>
.active{
  transition: all .4s;
  border:2upx solid #51CDCB;
}
.active span{
  transition: all .4s;
  background: #51CDCB;
}
.downBox{
  transition: all .4s;
  position: absolute;
  overflow: hidden;
  height: 0upx;
  top: 40upx;
}

.showDropDown{
  transition: all .4s;
  height: 300upx;
  display: flex;
  flex-direction: column;
  z-index: 10;
}
.problemBox{
  padding: 38upx;
  box-sizing: border-box;
  flex: 1;
  overflow: auto;
}
.starImg{
  transition: all .4s;
  display: block;
  width: 36upx;
  height: 36upx;
  background: url('https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmAdd/icon_star_unselected@2x.png');
  background-size: cover;
  margin-right: 30upx;
}
.selectStar{
  transition: all .4s;
  background: url('https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmAdd/icon_star@2x.png');
  background-size: cover;
}
.textLength{
  position: absolute;
  right: 0;
  bottom: 20upx;
}
</style>























