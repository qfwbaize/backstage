import axios from "./request";

/**
 *
 * @param {any} companyId 被查看的企业id
 * @param {any} shareType 分享类型  1:名片，2:商品，3:预约，4:文章
 * @param {any} itemId 分享对象id 名片id、商品id、预约产品id、文章i
 * @param {any} uuid
 */
function addShareRecord(companyId, shareType, itemId, uuid,  ) {

  return axios
    .POST(
      {
        companyId,
        shareType,
        itemId,
        uuid,
      },
      "",
      "/shareRecord/addShareRecord"
    )
    .then(res => {
      return res;
    })
    .catch(err => {});
}

/**
 *
 * @param {any} shareRecordId 分享id
 */
function openShare(shareRecordId) {
  axios
    .POST(
      {
        uuid: shareRecordId
      },
      "",
      "/shareRecord/addOpenShareCount"
    )
    .then()
    .catch(err => {});
}


/**
 * 获取到分享id(shareId) 修改分享状态（无法监听分享给哪个名片，只能通过被分享者打开页面后请求接口）
 */

function editShareRecord(shareId){
  console.log("修改分享状态",{
    shareId: shareId
  });

	axios.POST(
	    {
	      shareId: shareId,
        shareSource:2,
	    },
	    "",
	    "/share/record/update",'','',1
	  )
	  .then(res => {
      return res;
    })
	.catch(err => {});
}


async function preciseWxShare(dynamicId,precise_dynamicId,cardId,shareId){
  let preciseId='';
  await axios.POST({
      dynamicId:dynamicId,
      shareId: shareId,
      shareSource:1,
  }, '', '/share/record/update','','',1)
  .then((data) => {
  });
  await axios.POST({//获得精准转发奖励
      dynamicId: dynamicId,
      userId: cardId,
      shareId:shareId,
      answerScore:0,
  }, '', '/precise/record/add','','',1)
  .then(res => {
    preciseId=res.preciseId
  });
  return preciseId;
}

export { addShareRecord, openShare,editShareRecord,preciseWxShare };
