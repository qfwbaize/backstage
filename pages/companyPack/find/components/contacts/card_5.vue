<template>
    <div class="bgfff pl15 pt15 pr15 pb15 card5">
        <div class="posre h426 overhidden boxshadow">
            <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card5_bg.png" alt=""
                 class="posab left0 top0  w100p h426 imgborder">

          <div class="align-cen fs12 ce8 card_company disflex">
            <div class="card_line_2"></div>
            <span class="pr14 fs12" style="width: 300rpx; position: absolute;top: -6rpx;left: 10rpx;">{{card_msg.companyName || '公司名称'}}</span>
          </div>

          <div class="cacrd5_header" >
            <img :src="card_msg.logo || userlogo" alt=""
                 mode="aspectFill"
                 class="imgheader">
          </div>

          <div class="cacrd3_right" >
            <p class="fs20 fbold">{{card_msg.name || '姓名'}}</p>
            <p class="fs12 lh20 ">{{card_msg.position || '职位'}}</p>
          </div>

          <div class="cacrd3_telemail " >
              <p class="fs12  pb6">{{card_msg.phone || '电话'}}</p>
              <p class="fs12 ">{{card_msg.email || '邮箱'}}</p>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "card_5",
        props:['card_msg','type'],
        data(){
          return {
            userlogo: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_default_avatar_square.png', //头像
            cardMsg : {}
          }
        },created() {
        }
    }
</script>

<style>
    div {
  color: #e9dabf;
}
.boxshadow {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(6, 1, 0, 0.35);
  border-radius: 20px;
}

.imgborder {
  border-radius: 10px;
}

.card_line_2 {
  position: relative;
  color: #e9dabf;
  margin-right: 4upx;
}

.card_line_2::before,
.card_line_2::after {
  position: absolute;
  width: 4rpx;
  height: 18rpx;
  background: #e9dabf;
  top: 20rpx;
  bottom: 0;
  margin: auto;
  font-size: 24rpx;
  content: "";
}

.card_line_2::before {
  right: 0;
}

.card_line_2::after {
  right: 10rpx;
}

.card_company {
  position: relative;
  top: 60upx;
  left: 49upx;
  font-size: 12px;
  letter-spacing: 1px;
}
.card5 .cacrd3_right {
  position: absolute;
  right: 120upx;
  text-align: left;
  top: 185upx;
  width: 200upx;
}
.cacrd5_header{
	position: absolute;
	right: 221.5rpx;
	top: 65rpx;
}
.card5 .imgheader {
    width: 94upx;
    height: 94upx;
    border-radius: 5px;

  }
  .card5 .cacrd3_telemail {
    position: absolute;
    text-align: left;
    right: 0upx;
    bottom: 54upx;
    width: 280upx;
  }
/*  @media screen and (width: 320px) {
  .card5 .cacrd5_header {
    position: absolute;
    right: 222upx;
    top: 65upx;
  }
  .card5 .imgheader {
    width: 94upx;
    height: 94upx;
    border-radius: 5px;
  }

  .card5 .cacrd3_telemail {
    position: absolute;
    text-align: left;
    right: 0upx;
    bottom: 54upx;
    width: 280upx;
  }
} */
/*  @media screen and (width: 360px) {
  .card5 .cacrd5_header {
    position: absolute;
    right: 222upx;
    top: 65upx;
  }
  .card5 .imgheader {
    width: 94upx;
    height: 94upx;
    border-radius: 5px;
  }

  .card5 .cacrd3_telemail {
    position: absolute;
    text-align: left;
    right: 0upx;
    bottom: 54upx;
    width: 280upx;
  }
} */

/* @media screen and (min-width: 375px) {
  .card5 .cacrd5_header {
    position: absolute;
    right: 222upx;
    top: 65upx;
  }
  .card5 .imgheader {
    width: 94upx;
    height: 94upx;
    border-radius: 5px;
  }

  .card5 .cacrd3_telemail {
    position: absolute;
    text-align: left;
    right: 0upx;
    bottom: 54upx;
    width: 280upx;
  }
} */

/* @media screen and (min-width: 414px) {
  .card5 .cacrd5_header {
    position: absolute;
    right: 222upx;
    top: 65upx;
  }
  .card5 .imgheader {
    width: 94upx;
    height: 94upx;
    border-radius: 5px;
  }
  .card5 .cacrd3_telemail {
    position: absolute;
    text-align: left;
    right: 0upx;
    bottom: 55upx;
    width: 280rpx;
  }
} */




</style>
