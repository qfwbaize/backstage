<template>
  <div class="dyamic-manage">
    <!-- 头部两个盒子 -->
    <view class="" style="display: flex;justify-content: space-between;">
      <!-- 写文章 -->
      <view class="write" @click="addArticle()">
        <view class="" style="margin-left: 14px;">
          <view class="" style="font-size: 16px;color: #FFFFFF;margin-top: 15px;">写原创文章</view>
          <view class="" style="font-size: 12px;color: #FFFFFF;">WRITE AN ARTICLE</view>
        </view>
        <image style="width: 69px;height: 69px;position: absolute;right: 0;bottom: -4px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/grounding-cup.png"
          mode="">
        </image>
      </view>
      <!-- 转发文章 -->
      <view class="document" @click="wardarticle()">
        <view class="" style="margin-left: 14px;">
          <view class="" style="font-size: 16px;color: #FFFFFF;margin-top: 15px;">转载文章</view>
          <view class="" style="font-size: 12px;color: #FFFFFF;">REPRINTED ARTICLE</view>
        </view>
        <image style="width: 69px;height: 69px;position: absolute;right: 0;bottom: -4px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/copied-articles.png"
          mode=""></image>
      </view>
    </view>
    <view class="fs16 fbold mt10 mb10">文章管理</view>
    <view class="disflex">
      <view :class="tabtypes == 1?'probable': 'noprobable'" @click="tabtype(1)">
        个人文章
      </view>
      <view :class="tabtypes == 2?'probable': 'noprobable'" @click="tabtype(2)">
        机构文章
      </view>
    </view>

    <view class="mt10 w100p disflex jsbet mb10 fbold">
      <view class="fs14">已发布文章({{tabtypes==1?perNum:mechNum}})</view>
      <view class="fs14" @click="draft">草稿({{draftsnmb}})</view>
    </view>

    <!-- 文章列表 -->
    <view v-if="tabtypes == 1" style="width: 100%;">
      <view class="" style="margin-bottom: 20px;" v-for="(item,index) in perArticles" :key="index">
        <view class="article" style="">
          <view class="mainpart" @click="toDetail(item)">
            <view class="" style="" style="position: relative;">
              <view class="fs14 fbold over_2" style="width: 180px; color: #101010;height: 76rpx;">
                {{item.title}}
              </view>
              <view class="" style="width: 160px;font-size: 10px;color: #A8A8A8;">
                {{item.author || ''}}
              </view>
              <view class="trigram" style="position: absolute;bottom: 0rpx;">
                <view class="" style="display: flex;flex-direction: row;">
                  <image style="width: 16px;height: 16px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_like.png"
                    mode="">
                  </image>
                  <view class="" style="color: #8B8B8B;font-size: 12px;height: 16px;margin-left: 10rpx;">
                    {{item.likeNum}}
                  </view>
                </view>
                <view class="" style="display: flex;flex-direction: row;">
                  <image style="width: 16px;height: 16px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_comment.png"
                    mode="">
                  </image>
                  <view style="color: #8B8B8B;font-size: 12px;height: 16px;margin-left: 10rpx;">
                    {{item.commentNum}}
                  </view>
                </view>
                <view style="display: flex;flex-direction: row;">
                  <image style="width: 16px;height: 16px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_share.png"
                    mode="">
                    <view style="color: #8B8B8B;font-size: 12px;height: 16px;margin-left: 10rpx;">
                      {{item.shareNum}}
                    </view>
                </view>
              </view>
            </view>
            <image :src=item.photos mode="" class="headerimage"></image>
          </view>
          <view class="exactdate">
            <view style="display: flex;">
              <view class="cb8 mt5 fs12">
                {{item.createTimeStr}}
              </view>
              <view class="mt5 fs12 ml10">
                <view class="h20 lh20 bradius5 textc mt5" v-show="item.isShow == 1" style="width: 55px;color: #FFFFFF;font-size: 12px;background-color:#1AD09C;">
                  已上架</view>
                <!-- <view class="" v-show="item.isDrafts == 1" style="width: 42px;height: 19px;color: #000F15;font-size: 12px;background-color:#DEDEDE;border-radius: 6px;text-align: center;margin-top:5px;line-height: 19px;">
                  未上架</view>

                <view class="" v-show="item.isShow == 0" style="width: 42px;height: 19px;color: #FFFFFF;font-size: 12px;background-color:#03D3C5;border-radius: 6px;text-align: center;margin-top:5px;line-height: 19px;">
                  审核中</view>

                <view class="h20 lh20" v-show="item.isShow == 1" style="width: 55px;color: #FFFFFF;font-size: 12px;background-color:#1AD09C;border-radius: 6px;text-align: center;margin-top:5px;">
                  审核通过</view>

                <view class="lh18" v-show="item.isShow == 2" style="width: 160rpx;color: #000F15;font-size: 12px;background-color:#DEDEDE;border-radius: 6px;text-align: center;margin-top:5px;">
                  审核未通过</view> -->

              </view>
            </view>
            <view class="" @click="feat(item.dynamicId,item,index)" style="width: 30px;height: 30px;font-size: 24px;line-height: 24px;font-weight: bold;">...
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="tabtypes == 2" style="width: 100%;margin-top:38rpx;">
      <view class="" style="margin-bottom: 20px;" v-for="(item,index) in mechArticles" :key="index">
        <view class="article" style="">
          <view class="mainpart" @click="toDetail(item)">
            <view class="" style="" style="position: relative;">
              <view class="fs14 fbold over_2" style="width: 180px; color: #101010;height: 76rpx;">
                {{item.title}}
              </view>
              <view class="" style="width: 160px;font-size: 10px;color: #A8A8A8;">
                {{item.author || ''}}
              </view>
              <view class="trigram" style="position: absolute;bottom: 0rpx;">
                <view class="" style="display: flex;flex-direction: row;">
                  <image style="width: 16px;height: 16px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_like.png"
                    mode="">
                  </image>
                  <view class="" style="color: #8B8B8B;font-size: 12px;height: 16px;margin-left: 10rpx;">
                    {{item.likeNum}}
                  </view>
                </view>
                <view class="" style="display: flex;flex-direction: row;">
                  <image style="width: 16px;height: 16px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_comment.png"
                    mode="">
                  </image>
                  <view style="color: #8B8B8B;font-size: 12px;height: 16px;margin-left: 10rpx;">
                    {{item.commentNum}}
                  </view>
                </view>
                <view style="display: flex;flex-direction: row;">
                  <image style="width: 16px;height: 16px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_share.png"
                    mode="">
                    <view style="color: #8B8B8B;font-size: 12px;height: 16px;margin-left: 10rpx;">
                      {{item.shareNum}}
                    </view>
                </view>
              </view>
            </view>
            <image :src=item.photos mode="" class="headerimage"></image>
          </view>
          <view class="exactdate">
            <view style="display: flex;">
              <view class="cb8 mt5 fs12">
                {{item.createTimeStr}}
              </view>
              <view class="mt5 fs12 ml10">

                <view class="bradius5 textc mt5" v-show="item.isDrafts == 1" style="width: 42px;height: 19px;color: #000F15;background-color:#DEDEDE;line-height: 19px;">
                  未上架</view>

                <view class="bradius5 textc mt5" v-show="item.isShow == 0" style="width: 42px;height: 19px;color: #FFFFFF;background-color:#03D3C5;line-height: 19px;">
                  审核中</view>

                <view class="h20 lh20 bradius5 textc mt5" v-show="item.isShow == 1" style="width: 55px;color: #FFFFFF;background-color:#1AD09C;">
                  审核通过</view>

                <view class="lh18 bradius5 textc mt5" v-show="item.isShow == 2" style="width: 160rpx;color: #000F15;background-color:#DEDEDE;">
                  审核未通过</view>

              </view>
            </view>
            <view class="fs24 w15 h15 lh12 fbold" @click="feat(item.dynamicId,item,index)">...
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 弹出框 -->
    <view class="" v-show="!popup">
      <view class="" style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);"
        @click="featno()">
      </view>
      <view class="warn">
        <view class="mainstay">
          <view class="" style="">
            <view class="" style="width: 180px; font-size: 14px;color: #101010;">{{conlist.title}}</view>
            <view class="" style="width: 160px;font-size: 14px;color: #101010;margin-top: 4px;">
              {{conlist.companyName}}
            </view>
            <view class="trigram">
              <view class="" style="display: flex;flex-direction: row;">
                <image style="width: 16px;height: 16px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_like.png"
                  mode="">
                </image>
                <view class="" style="color: #8B8B8B;font-size: 12px;height: 16px;margin-left: 10rpx;">
                  {{conlist.likeNum}}
                </view>
              </view>
              <view class="" style="display: flex;flex-direction: row;">
                <image style="width: 16px;height: 16px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_comment.png"
                  mode="">
                </image>
                <view class="" style="color: #8B8B8B;font-size: 12px;height: 16px;margin-left: 10rpx;">
                  {{conlist.commentNum}}
                </view>
              </view>
              <view class="" style="display: flex;flex-direction: row;">
                <image style="width: 16px;height: 16px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_share.png"
                  mode="">
                  <view class="" style="color: #8B8B8B;font-size: 12px;height: 16px;margin-left: 10rpx;">
                    {{conlist.shareNum}}
                  </view>
              </view>
            </view>
          </view>
          <image :src=conlist.photos mode="" class="headerimage"></image>
        </view>
        <view class="" style="display: flex;flex-direction: row; margin-bottom: 13px;margin-left: 18px;">
          <view class="transmit" style="margin-right: 15px;" @click="forward()">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/fas fa-share.svg" mode="">
            </image>
            <view class="" style="color: #101010;font-size: 14px;">转发文章</view>
          </view>
          <view class="transmit" @click="godelete()">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-26-trash-can.svg"
              mode=""></image>
            <view class="" style="color: #101010;font-size: 14px;">删除文章</view>
          </view>
        </view>
        <view class="" style="margin-left: 18px;">
          <view class="grounding" style="justify-content: space-between;">
            <view class="" style="display: flex;justify-content: space-between;">
              <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-edit.svg" style="width: 24px;height: 24px;margin-left:40px;margin-right: 5px;"
                mode=""></image>
              <view class="" style="color: #101010;font-size: 14px;margin-top: 3px;">是否上架</view>
            </view>
            <view class="" style="margin-right:30px;">
              <switch name="switch" @change="switchChange" :checked="treatmentStatu.checked" />
            </view>
          </view>
          <!--          <view class="grounding">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/particulars.png"
              style="width: 24px;height: 24px;margin-left:40px;margin-right: 5px;" mode=""></image>
            <view class="" style="color: #101010;font-size: 14px;">数据详情</view>
          </view> -->
          <view class="grounding" @click="getcollection()">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-grade.svg" style="width: 24px;height: 24px;margin-left:40px;margin-right: 5px;"
              mode=""></image>
            <view class="" style="color: #101010;font-size: 14px;">添加到我的收藏</view>
          </view>

          <!-- <view class="grounding" style="margin-bottom: 5px;" @click="getcontributors()">
						<image class="contribute" v-show="treatmentStatu.checked == false "
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/jigouwenku.png"
							mode=""></image>
						<image class="contribute" v-show="treatmentStatu.checked == true"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/jigouwenkugrey.png"
							mode=""></image>
						<view class="" style="color: #101010;font-size: 14px;">投稿到我的机构文库</view>
					</view> -->
          <!-- <view class="grounding" style="margin-bottom: 5px;" @click="getinstitutions(conlist)">
						<image class="contribute" v-show="treatmentStatu.checked == false "
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-mail-send-fill.svg"
							mode=""></image>

						<image class="contribute" v-show="treatmentStatu.checked == true"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/contribute.png"
							mode=""></image>
						<view class="" style="color: #101010;font-size: 14px;">投稿到其他机构文库</view>
					</view> -->
        </view>
      </view>
    </view>
    <SHARE v-if="share==true" :dynamicId="listid" :companyId="companyId" saveType='1' @closeShare="closeShare">
    </SHARE>
    <div v-if="videoflg" class="textc lh42 fs12 ca8">- 到底了，看看其他的吧 -</div>
  </div>

  </div>
</template>

<script>
  import imgBackUrl from '../../../utils/request.js'
  import WXAJAX from "@/utils/request";
  import SHARE from '@/components/share'; //转发
  export default {
    components: {
      SHARE,
    },
    data() {
      return {
        type: 1,
        perArticles: [], //个人文章的列表
        mechArticles: [], //机构文章的列表
        perNum:0,
        mechNum:0,
        perPageNum: 1, //页数
        mechPageNum: 1, //页数
        essay: 0, //以发布文章
        popup: true, //控制弹出框的显隐
        listid: '', //传参文章id
        conlist: '', //文章的详情
        articlelist: '', //收藏的类型
        treatmentStatu: {
          checked: false
        }, //开关的传值
        articletitle: '', //文章的标题
        // paglist: ['已上架', '未上架', '以投稿审核中', '审核通过', '审核未通过', ]
        onlinot: '',
        share: false,
        draftsnmb: 0, //草稿的个数
        lastPage: '',
        videoflg: false,
        companyId: '',
        tabtypes: 1,
        isOrgShow: 0,
        isLibrary: 0,
        list_index: '', //文章的数组下标

      }
    },
    onLoad() {
      this.getdrafts();
      this.type = this.$root.$mp.query.type;
      if (this.type == 1) {
        wx.setNavigationBarTitle({
          title: "发动态"
        });
      } else if (this.type == 2) {
        wx.setNavigationBarTitle({
          title: "发文章"
        });
      } else {
        wx.setNavigationBarTitle({
          title: "产品"
        });
      }

    },
    onShow() {
      this.getachieve(0, 0, this.perPageNum) //个人文章
      this.getachieve(1, 0, this.mechPageNum) //机构文章
    },
    // async onPullDownRefresh() {
    // 	// 下拉刷新
    // 	this.pageNum = 1
    // 	this.getachieve();
    // },
    onReachBottom() {
      if (this.tabtypes == 1) { //个人文章
        this.perPageNum++
        this.getachieve(0, 0, this.perPageNum);
      } else { //机构文章
        this.mechPageNum++
        this.getachieve(1, 0, this.mechPageNum);
      }

    },
    methods: {
      tabtype(i) {
        this.tabtypes = i
        if (this.tabtypes == 1 && this.perArticles.length == 0) { //个人文章
          this.videoflg = true
        }
        if (this.tabtypes == 2 && this.mechArticles.length == 0) { //机构文章
          this.videoflg = true
        }
      },
      // 转发到外部机构
      getinstitutions(com) {
        let dynamicId = com.dynamicId
        let companyId = com.companyId
        let saveType = 1
        let type = com.type
        uni.navigateTo({
          url: './institutions?&saveType=1&type=' + type + "&companyId=" + companyId + "&dynamicId=" +
            dynamicId
        })
      },
      // 跳转到草稿箱
      draft() {
        wx.navigateTo({
          url: '../draft/draft'
        })
      },
      choose_tap(url) {
        wx.navigateTo({
          url: '/' + url
        });
      },
      // 草稿箱的接口调取草稿箱的总数
      getdrafts() {
        WXAJAX.POST({
          pageNum: '',
          type: 1,
          isDrafts: 1,
        }, '', '/dynamic/listMyDynamic', '', '', 1).then(res => {
          if (res) {
            this.draftsnmb = res.total
          }
        })
      },

      // 获取文章的接口
      getachieve(isOrgShow, isLibrary, pageNum) {
        WXAJAX.POST({
          pageNum: pageNum,
          type: 1,
          isDrafts: 0,
          // isShow:1,//上架
          isOrgShow: isOrgShow,//机构/个人
          isLibrary: isLibrary,
          pageSize: 5,
        }, '', '/dynamic/listMyDynamic', '', '', 1).then(res => {
          if (res && res.list) {
            if (isOrgShow) {
              this.mechNum = res.total
            } else {
              this.perNum = res.total
            }
            if (this.pageNum == 1) {
              if (isOrgShow) {
                this.mechArticles = res.list
              } else {
                this.perArticles = res.list
              }

            } else {
              if (isOrgShow) {
                this.mechArticles = [...this.mechArticles, ...res.list]
              } else {
                this.perArticles = [...this.perArticles, ...res.list]
              }
            }
            this.essay = res.total
          } else {
            this.videoflg = true
          }
          console.log(this.videoflg)
        })
      },
      // 弹窗控制显隐
      feat(concent, item, index) {
        this.popup = !this.popup
        this.listid = concent
        this.companyId = item.companyId
        this.list_index = index
        this.getparticulars()
      },
      // 获取文章详情
      getparticulars() {
        WXAJAX.POST({
          companyId: '',
          dynamicId: this.listid,
          cardId: '',
        }, '', '/dynamic/getDynamicDetail', '', '', 1).then(res => {
          this.conlist = res
          this.articlelist = res.pushEffectReward.timeType
          this.articletitle = res.title
          if (res.isDrafts == 0) {
            this.treatmentStatu.checked = true
          }
          if (res.isDrafts == 1) {
            this.treatmentStatu.checked = false
          }
        })
      },
      // 控制弹窗关闭的效果
      featno() {
        this.popup = !this.popup
      },
      //删除文章
      godelete() {
        var that = this;
        uni.showModal({
          icon: 'none',
          content: '是否要删除文章',
          success: function(res) {
            if (res.confirm) {
              WXAJAX.POST({
                dynamicId: that.listid,
              }, '', '/dynamic/delDynamic', '', '', 1).then(res => {

                if (this.tabtypes == 1) { //个人文章
                  this.perArticles.splice(this.list_index, 1)
                } else { //机构文章
                  this.mechArticles.splice(this.list_index, 1)
                }
                that.popup = !that.popup
              })
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
      // 添加文章到收藏
      getcollection() {
        WXAJAX.POST({
            itemId: this.listid,
            itemType: 2,
          }, '', '/personal/addCollection', '', '', 2).then(res => {
            uni.showToast({
              title: '文章已收藏',
              duration: 2000,
              icon: 'none',
            });
          }),
          this.popup = !this.popup
      },
      // 开关控制是否上架
      switchChange(e) {
        let value = e.target.value
        this.$set(this.treatmentStatu, 'checked', value) // 将点击改变的状态赋给treatmentStatu.checked
        if (this.treatmentStatu.checked == true) {
          WXAJAX.POST({
            dynamicId: this.listid,
            isDrafts: 0,
          }, '', '/dynamic/editDynamicInfo', '', '', 1).then(res => {
            uni.showToast({
              title: '文章已上架',
              duration: 2000,
              icon: 'none',
            });
          })
        }
        if (this.treatmentStatu.checked == false) {
          WXAJAX.POST({
            dynamicId: this.listid,
            isDrafts: 1,
          }, '', '/dynamic/editDynamicInfo', '', '', 1).then(res => {
            uni.showToast({
              title: '文章已下架',
              duration: 2000,
              icon: 'none',
            });
            this.articles.splice(this.list_index, 1)
          })
        }
        // this.getachieve()
      },
      // 控制是否投稿到机构
      getcontributors() {
        console.log(this.tabtypes, "1or0");
        if (this.treatmentStatu.checked == true) {
          uni.showToast({
            title: '已发布的文章不能给机构投稿',
            duration: 2000,
            icon: 'none',
          });
        }
        if (this.treatmentStatu.checked == false) {
          WXAJAX.POST({
            dynamicId: this.listid,
            title: this.articletitle,
            isOrgShow: 1,
            isDrafts: 0,
            isLibrary: 1,
            isShow: 0,
          }, '', '/dynamic/editDynamicInfo', '', '', 1).then(res => {
            uni.showToast({
              title: '已投稿到机构待审核',
              duration: 2000,
              icon: 'none',
            });
          })
        }
      },
      //写原创文章
      addArticle() {
        wx.navigateTo({
          url: "/pages/article/editArticle/main"
        });
      },
      // 文章转载
      wardarticle() {
        wx.navigateTo({
          url: "/pages/article/editArticle/publicArticle"
        });
      },
      //查看文章详情
      toDetail(item) {
        const companyId = item.companyId;
        const cardId = item.cardId
        const dynamicId = item.dynamicId
        let url = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + dynamicId + '&companyId=' + companyId +
          '&cardId=' + cardId;
        wx.navigateTo({
          url: url
        })
      },
      //转发文章的开关
      forward() {
        console.log(11111)
        this.share = !this.share
      },
      closeShare() {
        this.share = false;
        this.dynamicId = '';
        this.companyId = '';
        this.title = '';
        this.photos = '';
      },
    }
  };
</script>

<style scoped>
  .page {
    box-sizing: border-box;
  }

  .dyamic-manage {
    background: #ffffff;
    box-sizing: border-box;
    padding: 30upx 30upx 0 30upx;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .dyamic-manage-top {
    display: flex;
    justify-content: space-between;
  }

  .noprobable {
    width: 116rpx;
    height: 52rpx;
    color: #8B8B8B;
    background-color: #DEDEDE;
    font-size: 24rpx;
    border: 1rpx solid rgba(255, 255, 255, 100);
    border-radius: 15rpx;
    line-height: 52rpx;
    text-align: center;
    margin-right: 20rpx;
  }

  .probable {
    width: 116rpx;
    height: 52rpx;
    color: #FFFFFF;
    background-color: #03D3C5;
    font-size: 24rpx;
    border: 1rpx solid rgba(255, 255, 255, 100);
    border-radius: 15rpx;
    line-height: 52rpx;
    text-align: center;
    margin-right: 20rpx;
  }


  .title {
    color: #fff;
  }

  .left-img {
    width: 12upx;
    height: 22upx;
  }

  .dyamic-manage-content {
    padding-top: 30upx;
    font-size: 32upx;
    color: rgba(56, 56, 56, 1);
    flex: 1;
  }

  .list {
    padding: 0 58upx 0 61upx;
    height: 170upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10upx;
    margin-bottom: 20upx;
    box-shadow: 0upx 0upx 20upx 0upx rgba(56, 56, 56, 0.08);
  }

  .list image {
    width: 182upx;
    height: 70upx;
  }

  .dyamic-manage-btn {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 16upx;
    width: 268.2upx;
    height: 10upx;
    background: #A1A2A2;
    border-radius: 3upx;
  }

  .article {
    width: 100%;
    box-shadow: 0px 4rpx 12rpx 0px rgba(167, 225, 221, 100);
    border: 1px solid rgba(255, 255, 255, 100);
  }

  .trigram {
    width: 280rpx;
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
  }

  .transmit {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 320rpx;
    height: 112rpx;
    box-shadow: 0px 4rpx 12rpx 0px rgba(200, 232, 226, 100);
    border: 2rpx solid rgba(255, 255, 255, 100);
    border-radius: 12rpx;
  }

  .transmit image {
    width: 48rpx;
    height: 48rpx;
    margin-left: 50rpx;
    margin-right: 10rpx;
  }

  .grounding {
    width: 680rpx;
    height: 112rpx;
    box-shadow: 0px 4rpx 12rpx 0px rgba(200, 232, 226, 100);
    border: 2rpx solid rgba(255, 255, 255, 100);
    border-radius: 12rpx;
    margin-top: 12rpx;
    display: flex;
    align-items: center;
  }

  .warn {
    width: 100%;
    overflow: hidden;
    position: fixed;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 8px;
    background-color: #fff;
  }

  .contribute {
    width: 48rpx;
    height: 48rpx;
    margin-left: 80rpx;
    margin-right: 10rpx;
  }

  .write {
    width: 330rpx;
    height: 142rpx;
    background-color: #04D7D0;
    border-radius: 28rpx;
    position: relative;
  }

  .document {
    width: 330rpx;
    height: 142rpx;
    background-color: #1AD09C;
    border-radius: 28rpx;
    position: relative;
  }

  .headerimage {
    width: 154rpx;
    height: 150rpx;
    margin-right: 40rpx;
    border-radius: 15rpx;
  }

  .mainpart {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 30rpx;
    margin-top: 34rpx;
  }

  .exactdate {
    display: flex;
    justify-content: space-between;
    margin-left: 32rpx;
    margin-right: 26rpx;
    /* align-items: baseline; */
    margin-bottom: 10rpx;
  }

  .mainstay {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 40rpx;
    margin-top: 34rpx;
    margin-bottom: 30rpx;
  }
</style>
