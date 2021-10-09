import WXAJAX from './request.js'
export  const getshare = ()=> {//获取分享文案
  WXAJAX.POST(
    {pageSize:5,pageNum:1},
    "",
    "/ownShareTitleInfo/queryList","","",'1'
  ).then(data => {
    console.log('data1',data.list)
	if(Array.isArray(data.list)){
		 uni.setStorageSync('sharetitle',data.list)
	}else{
		uni.setStorageSync('sharetitle','')
	}
    
  });
}
