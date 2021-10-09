<template>
	<web-view :src="src" @message='getMessage1'></web-view>
</template>
<script>
export default {
	data() {
		return {
			src: 'https://wx.mingyicloud.com/app/myy/infomgmt.nsf/ctrlData?openform#aaa=333',
      tempStr:'https://wx.mingyicloud.com/app/myy/infomgmt.nsf/ctrlData?openform#aaa=333',
      firstOpenFlg:1,
		}
	},
	onLoad(option) {
    console.log("option",option.url);
    let H5Title=option.H5title;
    //console.log("option",option.url.replace("FXM","?").replace("FxM","&").replace("Fxm","="));
    this.tempStr= option.url;
    let tempStr = option.url;
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
    tempStr=tempStr.replace("FXM","?").replace("FxM","&").replace("Fxm","=");

    console.log("tempStr",tempStr);
    wx.setNavigationBarTitle({ title: H5Title});
		this.src = tempStr;//option.url.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
   // setInterval(() => {
   //  　　setTimeout(()=>{
   //         this.test('test');//我们的获取接口数据函数
   //      },0)
   //   }, 5000)
	},
  onShow() {
    this.test()
    //this.wxMiniProgramReady()
  },
  methods: {
    test(test){
      if(!test){
        let test = "test"
      }
      if(this.firstOpenFlg==1){//第1次打开src
        this.firstOpenFlg=0;
      
        return;
      }
      //打开过小程序页面，传回过参数
      console.log('getLoc：=====',wx.getStorageSync('H5_loc'));
      console.log('getKey11：=====',wx.getStorageSync('H5_key'));
      console.log('getValue：=====',wx.getStorageSync('H5_value'));
      let tempS="";
      let H5_loc="https://"+wx.getStorageSync('H5_loc');
      if(H5_loc.length>15){
        tempS=H5_loc;
        wx.setStorageSync('H5_loc','');
      }else{
        tempS=this.src;
      }

      if(tempS.indexOf("#")==-1){
        this.src=tempS+"#H5_key="+wx.getStorageSync('H5_key')+"&H5_value="+wx.getStorageSync('H5_value')+"&over";

      }else{
        //let tempS=this.src;

        tempS=tempS.substring(0,tempS.indexOf("#"))+"#H5_key="+wx.getStorageSync('H5_key')+"&H5_value="+wx.getStorageSync('H5_value')+"&over";
        this.src=tempS;
      }
      console.log('this.src：=====',this.src);

      return;
      // this.src = this.tempStr
      console.log('进了11122233',this.src)
      this.tempStr+="#"+wx.getStorageSync("abc");
      let aaa = this.tempStr

      aaa=aaa.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
      aaa=aaa.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
      aaa=aaa.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
      aaa=aaa.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
      aaa=aaa.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
      aaa=aaa.replace("FXM","?").replace("FxM","&").replace("Fxm","=");
      this.src = aaa
      console.log('进了AAA',aaa)
    },


  getMessage1(e){
    console.log('回来了===========')
  }

  },

}
</script>
