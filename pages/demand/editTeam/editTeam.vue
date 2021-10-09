<template>
	<view class="content">
    <view class="teaminfo">
      <!-- 上传图片 -->
     <div style="margin-left:40rpx ;">
       <div class="disflex jsbet">
         <p class="fs14 c38">上传图片</p>
       </div>
       <div class="disflex wrap pt20 pb20 w290">
         <div class="bgfff w80 h80 mr7 mb7 posre" v-for="(v,k) in self_photos" :key="k">
           <img mode="aspectFill" :src="v" alt="" class="w100p h100p">
           <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
             class="w20 h20 posab right2 top2" @click="delImg(k)">
         </div>
         <div v-if="self_photos.length < 1" class="bgfff bdash_a8 w80 h80 add_img bradius5 mr7"
           @click="uploadpic('self', 1)"></div>
       </div>
     </div>

     <view class="teamname"><text>姓名</text><input v-model="memberName" type="text"  placeholder="请输入姓名" /></view>

     <view class="teamname"><text>职位</text><input v-model="memberPosition" type="text"  placeholder="请输入职位" /></view>

     <view class="teamname"><text>毕业院校</text><input v-model="memberVitae" type="text"  placeholder="请输入毕业院校" /></view>

     <view class="teamdetail">详情页</view>

     <RichEditor :toolbars="toolbars" ref="rich"  :initContent="richText" />

     <BottomButtonSmall v-show="type == 0" :text="'编辑'" :url="'confirm'" @btn_tap="saveEdit"></BottomButtonSmall>
     <BottomButtonSmall v-show="type == '' " :text="'添加'" :url="'confirm'" @btn_tap="save"></BottomButtonSmall>


    </view>
	</view>
</template>

<script>
  import WXAJAX from "@/utils/request";
  import util from "@/utils/index";
  import RichEditor from '@/components/RichEditor';
  import BottomButtonSmall from '@/components/bottom_button_small'
	export default {
    components: {
    	RichEditor,
      BottomButtonSmall,
    },
		data() {
			return {
         self_photos: [],
         toolbars: ['bold', 'italic', 'underline', 'alignLeft',
         	'alignCenter', 'alignRight', 'alignJustify',
         	"fontSize", "checklist", "orderedList",
         	"bulletList", "outdent", "indent", "insertDivider", "insertImage", "undo", "redo", "clear"
         ],
         richText: '',
         type: '',
         websiteId: 0,
         memberName:'',
         memberPosition:'',
         memberVitae:'',
         teamMemberId:0
			}
		},
    onLoad(e){
      if(e.type == 0){
        this.type = e.type
        this.teamMemberId = e.teamMemberId
        uni.setNavigationBarTitle({
          title:'修改团队介绍'
        })
        this.getEdit(e.teamMemberId)
      }
    },
    mounted(){
      // this.richText = wx.getStorageSync('editOperator');
      // this.type = this.$root.$mp.query.type || '';
      // this.websiteId = wx.getStorageSync('websiteId') || 0;
    },
		methods: {
      //删除图片
      delImg(index) {
        wx.showLoading();
        this.self_photos.splice(index, 1);
        wx.hideLoading();
      },
      //上传图片
      async uploadpic(str, count) {
        this.showPageStatus = "0";
        let path = await util.chooseImage("file", count);
        if (!(path instanceof Array)) return;
        this.uploadImgFun(path, 0, str);
      },
      async uploadImgFun(arr, index = 0, str) {

        await this.uploadImg(arr[index], str);
        if (index < arr.length - 1) {
          this.uploadImgFun(arr, index + 1, str);
        }
      },
      uploadImg(path, str) {
        if (str == "self" && this.self_photos.length >= 9) {
          wx.showToast({
            title: "最多选择9张！",
            duration: 1500,
            icon: "none"
          });
          return;
        }
        wx.showLoading({
          mask: true
        });
        return WXAJAX.UploadImage(path)
          .then(data => {

            wx.hideLoading();
            data = JSON.parse(data);
            if (data.code == "200") {
              if (str == "self") {
                this.self_photos.push(`${WXAJAX.imgBackUrl}${data.data}`);
                this.$emit('img_tap', this.self_photos, this.number)
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
          });
      },
      //添加信息
      async save() {
        if(this.memberName == '' || this.memberPosition == '' || this.memberVitae == '' || this.self_photos.length == 0){
          uni.showToast({
            title:'请先将信息补充完整',
            icon:'none'
          })
          return;
        }
      	let result = await this.$refs.rich.getContents();
      	result = result.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block" ');
      	// if (this.type == 'prod' || this.type == 'article') {
      	// 	wx.setStorageSync('editOperator', result);
      	// 	wx.showLoading();
      	// 	setTimeout(function() {
      	// 		wx.hideLoading();
      	// 		wx.navigateBack();
      	// 	}, 600);
      	// } else {
          var url = this.self_photos.toString()
      		wx.showLoading();
      		let params = {};
          params.memberName = this.memberName
          params.memberPhoto = url
          params.memberPosition = this.memberPosition
          params.memberVitae = this.memberVitae
          params.memberDetails = result
      		WXAJAX.POST(params, '', '/teamMember/add','','',1).then((data) => {
      			wx.hideLoading();
      			if (data) {
      				wx.showToast({
      					title: '成功！',
      					icon: 'success'
      				});
      				setTimeout(function() {
      					wx.navigateBack();
      				}, 500)
      			}

      		}).catch((err) => {
      			wx.hideLoading();
      			wx.showToast({
      				title: err.message,
      				duration: 2000,
      				icon: 'none'
      			});
      		});
      	// }
      },
      //获取详情
      getEdit(teamMemberId){
         WXAJAX.POST({teamMemberId:teamMemberId},'','/teamMember/query','','',1).then(res=>{
          this.richText = res.memberDetails
          this.memberName = res.memberName
          this.memberPosition = res.memberPosition
          this.memberVitae = res.memberVitae
          this.self_photos.push(res.memberPhoto)
        })
      },
      //修改信息
      async saveEdit(){
        if(this.self_photos.length == 0){
          uni.showToast({
            title:'请上传图片',
            icon:'none'
          })
          return;
        }
        let resultinfo = await this.$refs.rich.getContents();
        resultinfo = resultinfo.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
        var data = {}
        data.teamMemberId = this.teamMemberId
        data.memberName = this.memberName
        data.memberPhoto = this.self_photos.toString()
        data.memberPosition = this.memberPosition
        data.memberVitae = this.memberVitae
        data.memberDetails = resultinfo
        WXAJAX.POST(data,'','/teamMember/update','','',1).then(res=>{
          uni.navigateBack()
        })
      }

		}
	}
</script>

<style scoped>
.content{
  width: 100vw;
  height: 100vh;
  background-color: #FFFFFF;
}
.teaminfo{
  /* padding: 40rpx; */
  width: 100%;
  background-color: #FFFFFF;
}
.teamname{
  display: flex;
  line-height: 60rpx;
  margin-bottom: 60rpx;
  color: rgba(16, 16, 16, 100);
  font-size: 28rpx;
  font-family: PingFangSC-regular;
  margin-left: 40rpx;
}
.teamname text{
  width: 112rpx;
}
.teamname input{
  margin-left: 44rpx;
  width: 400rpx;
  height: 60rpx;
  border-radius: 12rpx;
  color: rgba(136, 136, 136, 100);
  font-size: 28rpx;
  text-align: left;
  font-family: Microsoft Yahei;
  border: 2rpx solid rgba(187, 187, 187, 100);
  padding-left: 20rpx;
}
.teamname textarea{
  margin-left: 44rpx;
  width: 520rpx;
  height: 160rpx;
  line-height: 40rpx;
  border-radius: 12rpx;
  color: rgba(136, 136, 136, 100);
  font-size: 28rpx;
  text-align: left;
  font-family: Microsoft Yahei;
  border: 2rpx solid rgba(187, 187, 187, 100);
  padding: 20rpx;
}
.teamdetail{
  color: rgba(16, 16, 16, 100);
  font-size: 28rpx;
  font-family: PingFangSC-regular;
  margin-left: 40rpx;
  margin-bottom: 20rpx;
}
</style>
