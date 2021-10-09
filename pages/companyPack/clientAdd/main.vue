<template>
  <div>

    <div class="bgfff lh49 fs16 c38 pl15 pr15 mb11">
      <div class="disflex jsbet">
        <span class="fbold pr16 marks">姓名</span>
        <input type="text" class="pha8 textr flex1 lh49 h49" placeholder="姓名" v-model="name" >
      </div>

      <div class="disflex jsbet">
        <span class="fbold pr16">性别</span>
        <div class="gender disflex jsbet">
          <radio-group @change="radioChange($event,'gender')" class="disflex">
            <label class="uni-list-cell mr10 uni-list-cell-pd" v-for="(item, index) in genders" :key="item.id">
              <radio :value="item.id" color="#51CDCB" :checked="index === gendercurrent" />{{item.name}}
            </label>
          </radio-group>
        </div>
      </div>
      <div class="disflex jsbet">
        <span class="fbold pr16">手机号  </span>
        <input type="text" class="pha8 textr flex1 lh49 h49" placeholder="手机号" v-model="tel" >
      </div>

      <div class="disflex jsbet">
        <span class="fbold pr10">微信号 </span>
        <input type="text" class="pha8 textr flex1 lh49 h49" placeholder="微信号" v-model="wx" >

      </div>

      <div class="disflex jsbet">
        <span class="fbold pr10">机构微信 </span>
        <input type="text" class="pha8 textr flex1 lh49 h49" placeholder="机构微信" v-model="company_wx" >

      </div>

      <div class="disflex jsbet">
        <span class="fbold pr10">所属部门 </span>
        <input type="text" class="pha8 textr flex1 lh49 h49" placeholder="所属部门" v-model="department" >

      </div>

      <div class="disflex jsbet">
        <span class="fbold pr10">邮箱 </span>
        <input type="text" class="pha8 textr flex1 lh49 h49" placeholder="邮箱" v-model="email" >

      </div>


    </div>


    <div class="bgfff lh49 fs16 c38  pl15 pr15 mb11">
      <div class="disflex jsbet">
        <span class="fbold pr10">职位</span>
        <input type="text" class="pha8 textr flex1 lh49 h49" placeholder="职位" v-model="post" >
      </div>

      <div class="disflex jsbet">
        <span class="fbold pr10">机构 </span>
        <div class="disflex row-reverse align-cen" @click="chooseCompany()">
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10" />
          <input type="text" class="pha8 textr flex1 lh49 h49" placeholder="机构名称" v-model="createCompanyName" style="margin-right:20upx;color:#A7A7A7;font-size:24upx;">
        </div>

      </div>

    </div>

    <div class="bgfff lh49 fs16 c38  pl15 pr15">

      <div class="disflex jsbet">
        <span class="fbold pr10">备注 </span>
        <input type="text" class="pha8 textr flex1 lh49 h49" placeholder="备注" v-model="remark" >
      </div>

      <div class="disflex jsbet" @click="editTab_tap()">
        <span class="fbold pr10">标签</span>
        <div class="disflex row-reverse align-cen">

          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10" />
          <div class="disflex pt12  wrap pb7">
            <span v-for="(v,k) in choose_tab" class="bradius3 lh25 pl12 pr13 mr10 fs14 h25 mb5"
                  :key="k"
                  :style="{'background' : v.bg , 'color' : v.color}"
                  v-if="v.title">
                {{v.title}}
            </span>
          </div>
          <p v-if="!choose_tab[0].title" style="margin-right:20upx;color:#A7A7A7;font-size:24upx;">编辑标签</p>
        </div>
      </div>

      <div class="disflex jsbet">
        <span class="fbold pr10 marks w74">重点客户</span>

        <radio-group @change="radioChange($event,'majorCustomer')" class="disflex">
          <label class="uni-list-cell mr10 uni-list-cell-pd">
            <radio :value="1" color="#51CDCB" :checked="1 === ifmajorCustomer" />是
          </label>
          <label class="uni-list-cell mr10 uni-list-cell-pd">
            <radio :value="0" color="#51CDCB" :checked="0 === ifmajorCustomer" />否
          </label>
        </radio-group>
      </div>


    </div>

    <p class="lh32 pl16 fs12 ca8">标签能对客户进行分类，可用于筛选和搜索</p>

    <div class="bgfff lh49 fs16 c38  pl15 pr15">

      <div class="disflex jsbet">
        <span class="fbold pr10 marks w74">共享范围</span>
        <!-- <div class="disflex row-reverse align-cen" >
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10" />
          <span class="pr15">{{share_scope.name}}</span>
        </div> -->
        <radio-group @change="radioChange($event,'shared')" class="disflex">
          <label class="uni-list-cell mr10 uni-list-cell-pd" v-for="(item, index) in sharedScopes" :key="item.id">
            <radio :value="item.id" color="#51CDCB" :checked="index === sharedcurrent" />{{item.name}}
          </label>
        </radio-group>
      </div>
    </div>

    <p class="lh32 pl16 fs12 ca8 mb10">独占客户只能自己查看，共享客户全机构可查看</p>

    <div class="pb50 lh49 fs16 c38" @click="addTradingMoneyShow">
      <div class="disflex jsbet bgfff  pl15 pr15">
        <span class="fbold pr10">成交金额</span>
        <div class="disflex row-reverse align-cen" >
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10" />
          <span class="pr15">{{tradingVolume || '请输入成交金额'}}</span>
        </div>
      </div>
    </div>

    <!--标签弹框-->
    <div v-if="editTab">
      <ClientAddModal :status="editTab"
                      :tabs="tabs"
                      @modal_tab_tap="modal_tab_tap"
                      @modal_btn_tap="modal_btn_tap"
                      @closeModal="editTab = !editTab"
      ></ClientAddModal>
    </div>


    <!--提示弹框-->
    <div v-show="dialog_show">
      <DialogBox :dialog_title="'无法添加'" @btn_tap="hint_btn_tap" :dialog_ph="dialog_ph"
                 :memberType="addClientDialogType"
                 :memberInfo="addClientDialogTypeInfo"
                 :type = "'hint1'"
                 :left="'取消'"
                 :right="addClientDialogRightTips"
      ></DialogBox>
    </div>

    <!--成交金额-->
    <div v-show="dialog_money_show">
      <DialogBox :dialog_title="dialog_money_title" @btn_tap="trademoney_btn_tap" :dialog_ph="dialog_money_ph"
                 :dialog_ph_2="dialog_money_ph_2"
                 :type="'input_2'"
                 :default="tradingVolume"
                 :default_2="tradingVolume_mark"
                 :left="'取消'"
                 :right="'保存'"
      ></DialogBox>

    </div>

    <!--共享范围-->
    <div v-if="shareScopeShow">
      <SelectorOne
        :title="'选择共享范围'"
        :status="shareScopeShow"
        :allClass="shareScopeClass"
        :choose_id="share_scope.id"
        @choose_tap="choose_scope_tap"
        @closeModal="shareScopeShow=false"
      ></SelectorOne>
    </div>



    <!--bottom-->
    <BottomButtonTwo :left="bottom.left" :right="bottom.right" @page_turn="page_turn"></BottomButtonTwo>

  </div>
</template>

<script>
  import BottomButtonTwo from '@/components/bottom_button_two' // 订单项
  import ClientAddModal from '@/components/clientAddModal' // 订单项

  import DialogBox from '@/components/dialogBox' // 对话框
  import SelectorOne from '@/components/selectorOne' // 订单项
  import StaticResources from '@/components/StaticResources';
  import WXAJAX from '@/utils/request'
  import util from '@/utils/index'

  export default {
    name: '',
    components: {ClientAddModal,BottomButtonTwo,DialogBox,SelectorOne, StaticResources},
    data() {
      return{
        name:'',
        tel : '' ,
        wx : '' ,
        company_wx : '' ,
        email : '' ,
        department : '',
        post : '' ,
        createCompanyName : '',
        createCompanystate:false,
        company : '' ,
        remark : '' ,
        logo: '',
        tradingVolume:'',//成交金额
        choose_tab : [{},{},{}] ,
        share_scope : {
          name:'独占',
          id:1
        } , //1:独占客户，2:共享客户, 3:成单客户
        shareScopeShow:false ,
        shareScopeClass:[
          {name:'独占' , id:1},
          {name:'共享' , id:2},
        ],
        bottom: {
          left: {
            text: '取消', url: 'cancel'
          },
          right: {
            text: '保存', url: 'save'
          }
        },
        editTab:false ,
        majorCustomer:0,
        customerCompanyId:0,
        ifmajorCustomer:0,
        tabs : [ ],
        dialog_show:false,
        addClientDialogRightTips: '确定',
        addClientDialogType: '',
        addClientDialogTypeInfo: '',
        memberName: '',
        /*成交金额*/
        dialog_money_show:false ,
        tradingVolume_mark:'',//成交金额备注
        dialog_money_title:'成交金额',
        dialog_money_ph:'请输入成交金额',
        dialog_money_ph_2:'备注' ,
        cardId : 0 ,//客户id
        ipaCustomer:1,
        editType : 'add' ,//
        userId:0,
        customerId:0,
        companyId:0,
        genders:[{
          name:'男',
          id:1
        },{
          name:'女',
          id:2
        }],
        gendercurrent:0,
        sharedcurrent:1,
        gender:1, //性别默认男性
        sharedScopes:[{
          name:'共享',
          id:2
        },{
          name:'独占',
          id:1
        }],
      }
    },
    onShow(options){

      let company = wx.getStorageSync('choose_company') || '' ,
        company_id = wx.getStorageSync('choose_company_id') || 0 ;

      this.companyId = company_id ;
      this.company = company ;
      this.createCompanyName = company?company:this.createCompanyName ;
      wx.removeStorageSync('choose_company');
      wx.removeStorageSync('choose_company_id');

      if (wx.getStorageSync('isClearClientInfo')) {
        wx.removeStorageSync('isClearClientInfo');
        this.clearData();
      }
      this.getTabs();

    },
    onUnload(){
      wx.setStorageSync('clientDetail' , '') ;
    },
    mounted() {
      this.editType = this.$root.$mp.query.type || 'add';
      this.cardId = this.$root.$mp.query.cardId || '';
      this.ipaCustomer = this.$root.$mp.query.ipaCustomer || '';
      this.userId = this.$root.$mp.query.userId || '';

      this.companyId = 0 ;
      this.company = '' ;

      let title = '添加客户';
      // console.log("editType",this.editType)
      // console.log("cardId",this.cardId)
      // return ;
      if(this.editType == 'edit'){//修改
        title = '修改客户' ;
        this.getClientMsg() ;
      } else if (this.editType == 'userAdd') {
        this.getClientMsg() ;
      }

      wx.setNavigationBarTitle({
        title: title
      });

    },
    methods: {
      clearData(){
        this.userId = '' ;
        this.ipaCustomer = '' ;
        this.customerId = '';
        this.companyId = '';
        this.name = '';
        this.tel = '';
        this.wx = '';
        this.company_wx = '';
        this.email = '';
        this.department = '';
        this.post = '';
        this.logo = '';
        this.company = '';
        this.remark = '';
        this.tradingVolume = '';
        this.tradingVolume_mark = '';
        this.createCompanyName = '';
        this.choose_tab = [{},{},{}] ;
      },
      getClientMsg(){//获取客户信息
        wx.showLoading();
        let v = this ;

        let url = this.editType == 'userAdd' ? '/businessCard/getCompanyUserInfo': '/customer/getCustomerInfo';

        let params={
          cardId  : this.cardId ,
          userId: this.userId,
        };
        if(this.editType == 'userAdd'){
          params={
            cardId  : this.cardId ,
            userId: this.userId,
            isSwitch: 1,
          };
        }
        WXAJAX.POST(params, '', url).then((data) => {

          wx.hideLoading();
          if(data){
            data.customerState = data.customerState || 1;
            this.majorCustomer = data.majorCustomer || '';
            this.userId = data.userId || '';
            this.customerId = data.customerId || '';
            this.companyId = data.companyId || '';
            this.name = data.name || '';
            this.tel = data.phone || '';
            this.wx = data.personalWx || '';
            this.company_wx = data.companyWx || '';
            this.email = data.email || '';
            this.department = data.department || '';
            this.post = data.position || '';
            this.logo = data.logo || '';
            this.company = data.companyName || '';
            this.remark = data.customerRemark || '';
            this.createCompanyName = data.createCompanyName || '';
            this.$set(this.share_scope , 'id' , data.customerState||1 ) ;
            Number(data.gender )
            if( data.gender == 0 || 1){
              console.log(data.gender)
              this.gendercurrent = 0
            }else if(data.gender == 2){
              this.gender
              current = 1
            }
            switch (data.customerState) {
              case 1:

                this.$set(this.share_scope , 'name' ,'独占' ) ;
                this.sharedcurrent = 1
                this.share_scope.id = 1
                break ;
              case 2 :
                this.$set(this.share_scope , 'name' ,'共享' ) ;
                this.sharedcurrent = 0
                this.share_scope.id = 0
                break ;
              case 3 :
                this.$set(this.share_scope , 'name' ,'成单' ) ;
                this.sharedcurrent = 0
                this.share_scope.id = 0
                break ;
            }

            data.lableResponseList.forEach(function (i, k) {
              v.choose_tab[k] = {
                bg:i.lableColor ,
                id : i.lableId ,
                title : i.lableName ,
                parentId : i.parentId ,
                color : ''
              };
              if(i.lableColor == '#F5F5F6'){
                v.choose_tab[k].color = '#a8a8a8';
              }else{
                v.choose_tab[k].color = '#fff';
              }
            });
          }

        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
        });
      },
      getTabs(){//获取标签数据
        wx.showLoading();
        let v = this ;
        WXAJAX.POST('', '', '/companyCustomerLable/getTree').then((data) => {
          wx.hideLoading();
          if(data){
            v.lists = [] ;
            let datas = [] ;

            data.forEach(function (i1, k1 ) {

              let choose_id = 0 ;
              if(v.choose_tab[0].parentId){

                v.choose_tab.forEach(function (i3 , k3) {
                  if(i1.lableId == i3.parentId){
                    choose_id = i3.id ;
                  }
                });
              }

              datas.push({
                title : i1.lableName ,
                id : i1.lableId ,
                choose_id:choose_id,
                choose_title:'',
                child : [] ,
              });
              i1.lableResponses && i1.lableResponses.forEach(function (i2,k2) {
                datas[k1].child.push({
                  id : i2.lableId ,
                  title : i2.lableName ,
                  color : i2.lableColor ,
                  labelId : 0
                })

                v.choose_tab.forEach(function (i3 , k3) {
                  if (i3.id == i2.lableId){
                    v.$set(i3, 'bg', i2.lableColor);
                  }
                });
              })

            });
            v.tabs = datas;
          }

        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
        });
      },
      page_turn(method){
        if(method == 'cancel'){//取消
          wx.reLaunch({
            url: '/pages/index/main',
          });
        }else if(method == 'save'){//保存客户

          let v = this ,
            _tabs = [] ,
            params = {} ,
            _url = '/customer/manualAdd';

          if(this.editType == 'edit'){
            _url = '/customer/updCustomer';
            params.customerId = this.customerId;
            params.cardId = this.cardId;
          }

          if(this.editType == 'userAdd') {
            params.userId = this.userId;
            params.ipaCustomer = this.ipaCustomer;
            params.entrance = 2;
          }

          if(!this.name.trim()){
            wx.showToast({
              title: '请输入姓名~！',
              icon: 'none'
            });
            return
          }

          // if(!this.tel.trim() && !this.wx.trim()){
          //   wx.showToast({
          //     title: '请输入手机号~！',
          //     icon: 'none'
          //   });
          //   return
          // }

          if(this.tel.trim() && !util.checkPhone(this.tel.trim())){
            wx.showToast({
              title: '请输入正确的手机号~！',
              icon: 'none'
            });
            return
          }

          v.choose_tab.forEach(function (i,k) {
            if(i.id){
              _tabs.push(i.id);
            }
          });

          wx.showLoading();

          params.majorCustomer = this.majorCustomer ;

          params.name = this.name.trim() ;
          params.phone = this.tel.trim() ;
          params.companyId = this.companyId || 0;
          params.customerCompanyId = this.companyId || 0;
          params.cardId = this.cardId || '';
          params.lableIds = _tabs ;
          params.logo = this.logo;
          params.gender = this.gender
          params.customerState = v.share_scope.id ;
          if(this.wx.trim()) params.personalWx = this.wx.trim() ;
          if(this.company_wx.trim()) params.companyWx = this.company_wx.trim() ;
          if(this.email.trim()) params.email = this.email.trim() ;
          if(this.department.trim()) params.department = this.department.trim() ;

          if(this.post.trim()) params.position = this.post.trim() ;
          if(this.remark.trim()) params.customerRemark = this.remark.trim() ;
          if(this.tradingVolume.trim()) params.turnoverAmount = this.tradingVolume.trim() * 100 ;
          if(this.tradingVolume_mark.trim()) params.remark = this.tradingVolume_mark.trim() ;
          if(this.createCompanyName.trim()) params.createCompanyName = this.createCompanyName.trim() ;


            WXAJAX.POST(params, '', _url, true).then((data, code) => {
              wx.hideLoading();
              if (data) {
                wx.showToast({
                  title: '成功！',
                  icon: 'success'
                });
                setTimeout(function () {
                  if(getCurrentPages().length>1){
                    wx.navigateBack({
                      delta: 1
                    });
                  }else{
                    wx.switchTab({
                      url:"../index/main"
                    })
                  }

                },800)
              }


            }).catch((err) => {
              console.log(err);

              if (err.code == 201) {
                wx.hideToast();
                let data;
                try{
                  data = JSON.parse(err.message);
                }catch (e) {
                  data = {};
                  wx.showToast({
                    title: err.message,
                    duration: 2000,
                    icon: 'none'
                  });
                }

                if (data.type) {
                  this.dialog_show = true;
                  this.addClientDialogType = data.type;

                  if (data.type == '1') {
                    this.addClientDialogRightTips = '确定';
                  } else if (data.type == '2') {
                    this.addClientDialogRightTips = '确定';
                    this.addClientDialogTypeInfo = data.data;
                  } else if (data.type == '3') {
                    this.addClientDialogRightTips = '抢为独占';
                    this.addClientDialogTypeInfo = data.data;
                  }
                }
              }else{
                wx.showToast({
                  title: err.message,
                  duration: 2000,
                  icon: 'none'
                });
              }

              wx.setStorageSync("choose_company", '');
              wx.setStorageSync("choose_company_id", '');
              wx.setStorageSync("choose_company_logo", '');

              wx.hideLoading();
            });

        }
      },
      modal_tab_tap(index1 , id ,index2){//点击标签弹框 tab
        this.$set(this.tabs[index1] , 'choose_id' , id);
        let item = this.tabs[index1].child[index2];

        this.$set(this.choose_tab[index1] , 'bg',item.color);
        this.$set(this.choose_tab[index1] , 'id' , id ) ;
        this.$set(this.choose_tab[index1] , 'title' , item.title ) ;

        if(item.color == '#F5F5F6'){
          this.$set(this.choose_tab[index1] , 'color' , '#A8A8A8')
        }else{
          this.$set(this.choose_tab[index1] , 'color' , '#fff')
        }

      },
      modal_btn_tap(method ){//点击标签弹框按钮

        if(method == 'reset'){//重置
          let v = this ;

          v.tabs.forEach(function (item,index) {
            v.$set(v.tabs[index] , 'choose_id' , '');
          })
          this.choose_tab = [{},{},{}];
        }else if(method == 'confirm'){//确定
          this.editTab = false ;
          return;

          wx.showLoading();
          let v = this ,
            labelIds = [] ;
          v.choose_tab.forEach(function (i, k) {
            if(i.id){
              labelIds.push(i.id) ;
            }
          });

          WXAJAX.POST({
            customerId : v.customerId ,
            lableIds : labelIds ,

          }, '', '/customer/updCustomerLabel').then((data) => {

            wx.hideLoading();
            wx.showToast({
              title: '成功！',
              icon: 'success'
            });

          }).catch((err) => {
            console.log(err);
            wx.hideLoading();
          });


        }
      },
      hint_btn_tap(method,text){
        this.dialog_show = false ;

        if (method == 'save') {
          if (this.addClientDialogType === '3') {
            wx.navigateTo({url: '/pages/clientDetail/main?cardId='+this.addClientDialogTypeInfo});
          }
        }
      },
      trademoney_btn_tap(method , text1,text2){
        this.dialog_money_show = false ;
        this.tradingVolume = text1 ;
        this.tradingVolume_mark =  text2 ;

        if(method != 'save') {
          this.tradingVolume = '' ;
          this.tradingVolume_mark = '' ;
          return
        }
        if(this.editType == 'add') return ;

        let v = this ,
          reg = /^[1-9]+[0-9]*]*$/ ;
        if(!reg.test(text1)){
          wx.showToast({
            title: '请输入正确的金额！',
            icon: 'none'
          });
        }

        wx.showLoading();

        WXAJAX.POST({
          customerId  : v.customerId ,
          companyId : v.companyId ,
          money : (text1 * 100).toFixed(0) ,
          remark : text2 ,
        }, '', '/customer/inputDealMoney').then((data) => {

          wx.hideLoading();
          wx.showToast({
            title: '成功！',
            icon: 'success'
          });

        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
        });

      },
      choose_scope_tap(url , name ){//选择共享范围

        if(url == this.share_scope.id ) return ;

        if(url == -1){
          this.shareScopeShow = false ;
          return
        }
        this.$set(this.share_scope,'name' , name );
        this.$set(this.share_scope,'id' , url);
        this.shareScopeShow = false;

        // wx.showLoading();
        // let v = this ;
        //
        // WXAJAX.POST({
        //   customerId  : v.customerId ,
        //   customerState  : url ,
        // }, '', '/customer/updCustomerState').then((data) => {
        //
        //   wx.hideLoading();
        //   this.shareScopeShow = false ;
        //   wx.showToast({
        //     title: '成功！',
        //     icon: 'success'
        //   });
        //
        // }).catch((err) => {
        //   console.log(err);
        //   wx.hideLoading();
        // });

      },
      addTradingMoneyShow(){
        this.dialog_money_show = !this.dialog_money_show ;
        this.tradingVolume = '' ;
        this.tradingVolume_mark = '' ;
      },
      toRoute(url,query){
        wx.navigateTo({url: '../' + url + '/main?type=' + query})
      },
      radioChange(e,type){
        console.log(e)
        if(type == 'gender'){
          console.log(1)
          this.gender = e.detail.value
        }else if(type == 'majorCustomer'){
          this.majorCustomer = e.detail.value
        }else{

          this.share_scope.id = e.detail.value
          console.log(this.share_scope.id)
        }
      },
      editTab_tap(){
        this.tabs.forEach((v,k)=>{
          for(var i in this.choose_tab){
            if(v.id == this.choose_tab[i].parentId){
              this.$set(this.tabs[i] ,'choose_id' , this.choose_tab[i].id );
            }
          }
        })
        this.editTab = !this.editTab
      },
      chooseCompany(){
        let url ='/pages/companyPack/chooseCompanyItem/main';
        console.log(url);
        wx.navigateTo({
          url
        });
      }
    }
  }
</script>

<style>

</style>
