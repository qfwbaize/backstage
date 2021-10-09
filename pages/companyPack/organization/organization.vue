<template>
  <div class="box">
    <view class="section" v-if="isboss" @click="administrative()">管理部门</view>
    <!-- 部门列表 -->
    <view class="" style="margin-top: 28rpx;">
      <view class="branch" v-for="(item,index) in departliat" :key="index" @click="tomarket(item.department,item.departmentId)">
        <view class="tment">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/member.png" mode=""></image>
        </view>
        <view class="branchlist">
          <view class="">{{item.department}}</view>
          <!-- <view class="">(4人)</view> -->
        </view>
      </view>
    </view>
    <!-- 员工列表 -->
    <view class="" style="margin-top: 26rpx;margin-bottom: 30rpx;" v-for="(item,index) in staffdetails" :key="index">
      <view class="particulars" @click="information(item.cardId)">
        <image :src=item.logo mode=""></image>
        <view class="employee">{{item.name}}</view>
        <view class="" style="margin-left: 90rpx;" v-if="item.accountId == undefined ">离职人员</view>
      </view>
    </view>

    <view class="sectionlist" v-show="issection">
      <view class="" style="display: flex;">
        <view class="addlist" @click="toaddmenebers()">添加成员</view>
        <view class="addlist" @click="addsection()">添加部门</view>
        <view class="addlist" @click="management()">更多管理</view>
      </view>
    </view>
    <!-- 添加部门的弹出框 -->
    <view class="" v-show="ispopup">
      <view class=""style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);" @click="nosection()"></view>
      <view class="warn">
        <view class="" style="background-color: #FFFFFF;">
          <view class="tianlist">添加部门</view>
          <view class="">
            <input class="inputt" type="text" value="" placeholder="请输入部门名称" v-model="newly"/>
          </view>
          <view class="" style="display: flex;flex-direction: row-reverse;margin-top: 96rpx;padding-bottom: 24rpx;">
            <view class="" style="margin-right: 72rpx;color: #0266BC;" @click="determine()">确定</view>
            <view class="" style="margin-right: 72rpx;" @click="remove()">取消</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 更多管理的弹出框 -->
    <view class="" v-show="ismanage">
      <view class=""style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);" @click="nomanage()"></view>
      <view class="warn">
        <view class="" style="background-color: #FFFFFF;padding-top: 32rpx;padding-left: 34rpx;padding-bottom: 34rpx;">
          <view class="" style="font-size: 30rpx;color: #101010;margin-bottom: 56rpx;" @click="tobatchmove()">批量移动成员</view>
          <view class="" style="font-size: 30rpx;color: #101010;margin-bottom: 56rpx;" @click="overcustomer()">移交我的客户</view>
          <!-- <view class="" style="font-size: 30rpx;color: #101010;margin-top: 62rpx;">设置管理员</view> -->
        </view>
      </view>
    </view>
    <view class="customer" v-if="!isboss" @click="overcustomer()">移交我的客户</view>
  </div>
</template>

<script>
  import WXAJAX from "@/utils/request"
	export default {
		data() {
			return {
      issection:false,  //部门管理
      ispopup: false, //控制弹出框的显隐
      ismanage:false, //控制更多管理的显隐
      newly:'',//部门名称
      pageNum:1,
      departliat:'', //部门详情列表
      staffdetails:'', //公司的职员
      cardId:'',
      isboss:'',
      userId:'',
			}
		},
    onShow() {
      this.getstructure()
      this.getcomypor()
      this.isboss = uni.getStorageSync('isBoss')
      this.cardId = uni.getStorageSync('cardId')
      this.userId = uni.getStorageSync('userId')
    },
		methods: {
      // 查询公司的部门详情
      getstructure(){
        WXAJAX.POST({
          pageNum:this.pageNum,
          companyId:uni.getStorageSync('COMPANYID'),
          isDel:0,
        }, '', '/department/queryPage', '', '',1).then((res) => {
            this.departliat=res.list
        })
      },
      // 点击管理部门
      administrative(){
        this.issection = !this.issection
      },
      // 添加部门的弹出框
      addsection(){
        this.ispopup = !this.ispopup
      },
      // 查询公司人员
      getcomypor() {
        WXAJAX.POST({
          ignore: true,
          department:'无',
        }, '', '/businessCard/getCompanyStaffList', '', '', ).then((res) => {
          this.staffdetails=res.list

        })
      },
      // 点击确定的按钮
      determine(){
        this.ispopup = !this.ispopup
        WXAJAX.POST({
          department:this.newly,
          departmentDesc:'',
          isDel:0,
        }, '', '/department/add', '', '',1).then((res) => {
            uni.showToast({
                title: '添加成功',
                duration: 2000
            });
             this.getstructure()
             this.newly = ''
        })
      },
      // 点击取消的按钮
      remove(){
         this.ispopup = !this.ispopup
      },
      // 更多管理的弹出框
      management(){
        this.ismanage = !this.ismanage
      },
      // 更多管理的遮罩
      nomanage(){
        this.ismanage = !this.ismanage
      },
      // 添加部门的遮罩
      nosection(){
       this.ispopup = !this.ispopup
      },
      // 添加成员设置
      toaddmenebers(){
       uni.navigateTo({
       	url: "../../companyPack/addmembers/addmembers"
       });
      },
      // 跳转到部门详情
      tomarket(department,departmentId){
       uni.navigateTo({
       	url: "../../companyPack/market/market?department=" + department+"&departmentId="+departmentId
       });
      },
      // 跳转到批量移动成员
      tobatchmove(){
        let end = ''
        this.ismanage = !this.ismanage
        uni.navigateTo({
        	url: "../../companyPack/batchmove/batchmove?end=" + 1
        });
      },
      // 跳到编辑成员
      information(concnoa) {
        let add = concnoa
        uni.navigateTo({
          url: "../../companyPack/editorialmembers/editorialmembers?add="+add
        });
      },
      // 移交我自己的用户
      overcustomer(){
        let userId =this.userId;
         let cardId = this.cardId;
         this.ismanage = !this.ismanage
        uni.navigateTo({
          url:`../../companyPack/connection/connection?userId=${userId}&cardId=${cardId}`
        });
      },
		}
	}
</script>

<style scoped>
  .box{
    padding-right: 40rpx;
    padding-left: 40rpx;
  }
  .section{
    display: flex;
    flex-direction: row-reverse;
    color: #101010 ;
    font-size: 28rpx;
    margin-top: 20rpx;

    color: #007AFF;
  }
  .branch{
    width: 100%;
    height: 152rpx;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    display: flex;
    margin-bottom: 28rpx;
    align-items: center;
  }
  .tment{
    width: 114rpx;
    height: 114rpx;
    border-radius: 12rpx;
    background-color: #0266BC ;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-top: 20rpx; */
    margin-left: 32rpx;
    margin-right: 34rpx;
  }
  .tment image{
    width: 66rpx;
    height: 66rpx;
  }
  .branchlist{
    display: flex;
    /* margin-top: 20rpx; */
    color: #101010 ;
    font-size: 28rpx;
  }
  .sectionlist{
    width: 100%;
    height: 76rpx;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .addlist{
    flex: 1;
    text-align: center;
    line-height: 76rpx;
    color: #0266BC ;
    font-size: 28rpx;
  }
  .warn {
  	width: 680rpx;
  	overflow: hidden;
  	position: fixed;
  	right: 5%;
  	top: 30%;
  	left: 5%;
  	margin: auto;
  	border-radius: 8px;
  	background: rgba(0, 0, 0, -0.5);
  }
  .tianlist{
    color: #101010 ;
    font-size: 30rpx;
    padding-top: 32rpx;
    margin-left: 34rpx;
    font-family: PingFangSC-regular;
  }
  .inputt{
    width: 592rpx;
    height: 60rpx;
    border: 2rpx solid #BBBBBB;
    margin-left: 34rpx;
    margin-top: 48rpx;
  }
  .particulars {
    width: 674rpx;
    height: 142rpx;
    background-color: #FFFFFF;
    display: flex;
    border-radius: 12rpx;
    align-items: center;
  }

  .particulars image {
    width: 110rpx;
    height: 110rpx;
    margin-left: 30rpx;
    border-radius: 12rpx;
  }
  .employee {
    font-size: 28rpx;
    color: #101010;
    margin-left: 36rpx;
  }
  .customer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    background-color: #1CD09D ;
    color: #FFFFFF;
    font-size: 32rpx;
    line-height: 100rpx;
    text-align: center;
  }
</style>
