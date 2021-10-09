<template>
  <div class="box">
    <view class="">
      <view class="information">
        <view class="category">姓名:</view>
        <input class="inptu" type="text" disabled value="name" v-model="name" />
      </view>
      <!--<view class="information">
        <view class="category">性别:</view>
        <input class="inptu" type="text" disabled value="sex" v-model="sex" />
      </view> -->
      <view class="information">
        <view class="category">手机:</view>
        <input class="inptu" type="text" disabled value="handset" v-model="handset" />
      </view>
      <!--<view class="information">
        <view class="category">座机:</view>
        <input class="inptu" type="text" disabled value="camera" v-model="camera" />
      </view> -->
      <view class="information">
        <view class="category">邮箱:</view>
        <input class="inptu" type="text" disabled value="mailbox" v-model="mailbox" />
      </view>
      <!-- <view class="information">
        <view class="category">地址:</view>
        <input class="inptu" type="text" disabled value="site" v-model="site" />
      </view> -->
      <view class="information">
        <view class="category">职务:</view>
        <input class="inptu" type="text" disabled value="position" v-model="position" />
      </view>
      <view class="distribution">
        <view class="department">
          <view class="" style="margin-right: 20rpx;">部门:</view>
          <input type="text" value="" disabled placeholder="暂未分配部门" style="z-index: 1;" v-model="tmentlist" />
        </view>
        <view class="dedicated" @click="toinstall()">设置部门</view>
      </view>
      <view class=" dignity">
        <view class="" style="margin-right: 40rpx;">身份:</view>
        <view class="" @click="identities()">
          <input type="text" value="" placeholder="superior" disabled v-model="superior" />
        </view>
      </view>
      <!-- <view class="identity" v-if="">保存</view> -->
       <view class="detachment_one" v-if="isboss" @click="client()">移交成员客户</view>
      <view class="detachment" v-if="isboss" @click="strikeout()">移交名片</view>
      <view class="" v-show="ispopup">
        <view class="" style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);"
          @click="nosection()"></view>
        <view class="warn">
          <view class="" style="background-color: #FFFFFF;z-index: 9999;">
            <view class="general" style="border-bottom:2rpx solid #000000 ;" @click="staff(1)">普通成员</view>
            <view class="general" @click="staff(2)">管理员</view>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
  import WXAJAX from "@/utils/request"
  export default {
    data() {
      return {
        name: '', //姓名
        sex: '', //性别
        handset: '', //手机
        camera: '', //座机
        mailbox: '', //邮箱
        site: '', //地址
        position: '', //职务
        ispopup: false,
        superior: '普通员工',
        personid: '', //id值
        tmentlist: '', //部门
        isboss:'',
        cardId:'',
        userId:'',
      }
    },
    onLoad(options) {
      this.personid = options.add

    },
    onShow() {
      this.getsuprolist()
       this.isboss = uni.getStorageSync('isBoss');
    },
    methods: {
      // 点击身份的切换
      staff(con) {

        if (con == 1) {
          this.superior = '普通成员'
        }
        if (con == 2) {
          this.superior = '管理员'
        }
        this.ispopup = !this.ispopup

      },
      nosection() {
        this.ispopup = !this.ispopup
      },
      // 修改身份的
      identities() {
        // if (this.isboss == true) {
        //   this.ispopup = !this.ispopup
        // } else {
        //   uni.showToast({
        //     title: '员工不能修改自己身份',
        //     duration: 2000,
        //     icon: 'none',
        //   });
        // }
        
      },
      // 成员详情
      getsuprolist() {
        WXAJAX.POST({
          // ignore: true,
          cardId: this.personid,
        }, '', '/businessCard/getCompanyUserInfo', '', '', ).then((res) => {
          console.log(res)
          this.name = res.name //姓名
          this.handset = res.phone //手机
          this.mailbox = res.email //邮箱
          this.position = res.position //职务
          this.tmentlist = res.department //部门
          this.userId = res.userId
          this.cardId =res.cardId
        })
      },
      // 设置部门
      toinstall() {
        if (this.isboss == true) {
          let list = '';
          uni.navigateTo({
            url: "../../companyPack/setdepartment/setdepartment?list=" + this.personid
          });
        } else {
          uni.showToast({
            title: '员工不能修改自己所属部门',
            duration: 2000,
            icon: 'none',
          });
        }
      },
      // 移交客户
      client(){
        let userId =this.userId;
        let cardId = this.cardId;
       uni.navigateTo({
         url:`../../companyPack/connection/connection?userId=${userId}&cardId=${cardId}`
       });
      },
      // 移交名片
      strikeout() {
         let cardId = this.cardId;
        uni.navigateTo({
          url:`../../companyPack/batchmove/batchmove?cardId=${cardId}&type=${2}`
        });
      },
    }
  }
</script>

<style scoped>
  .box {
    /* width: 100%; */
    /* height: 100%; */
    /* padding-left: 40rpx; */
    /* padding-top: 40rpx; */
    /* padding-right: 42rpx; */
  }

  .information {
    width: 100%;
    height: 94rpx;
    background-color: #FFFFFF;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-top: 30rpx;

  }

  .inptu {
    /* border: 2rpx solid #000000; */
    height: 94rpx;
    width: 550rpx;
    font-size: 30rpx;
    z-index: 1;
  }

  .category {
    margin-left: 40rpx;
    margin-right: 20rpx;
  }

  .detachment {
    width: 100%;
    height: 94rpx;
    text-align: center;
    line-height: 94rpx;
    font-size: 34rpx;
    color: #FF0000;
    background-color: #FFFFFF;
    margin-bottom: 50rpx;
  }
  .detachment_one {
    width: 100%;
    height: 94rpx;
    text-align: center;
    line-height: 94rpx;
    font-size: 34rpx;
    color: #000000;
    background-color: #FFFFFF;
    margin-bottom: 50rpx;
  }
  .identity {
    width: 100%;
    height: 94rpx;
    text-align: center;
    line-height: 94rpx;
    font-size: 34rpx;
    color: #00E266;
    background-color: #FFFFFF;
    margin-bottom: 40rpx;
  }

  .distribution {
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 30rpx;
  }

  .department {
    display: flex;
    margin-left: 40rpx;
    padding-top: 24rpx;
  }

  .dedicated {
    margin-left: 162rpx;
    margin-top: 44rpx;
    padding-bottom: 36rpx;
    color: #0266BC;
  }

  .dignity {
    width: 100%;
    height: 94rpx;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    padding-left: 40rpx;
    margin-top: 24rpx;
    margin-bottom: 40rpx;
  }

  .warn {
    width: 680rpx;
    overflow: hidden;
    position: fixed;
    right: 5%;
    top: 40%;
    left: 5%;
    margin: auto;
    border-radius: 8px;
    /* background: rgba(0, 0, 0, -0.5); */
    background-color: #FFFFFF;
    z-index: 9999;
  }

  .general {
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    z-index: 9999999;
  }
</style>
