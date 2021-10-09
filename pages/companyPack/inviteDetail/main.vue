<template>
    <div style="width: 100%;height: 100%;background-color: #FFFFFF;">
        <div class="bgfff pt15 pl15 pr15 pb15 mt10">
            <p class="disflex jsbet fs14">
                <span class="c38" style="font-size: 28rpx;font-weight: bold;">{{invite.position}}</span>
                <span class="ca8 fs12">{{invite.time}}</span>
            </p>

            <div class="disflex jsbet fs12 ca8 pt13">
                <div>
                    {{invite.recruitAddress}} | {{experienceArray[invite.experience-1].title}} | {{educatArray[invite.education-1].title}}
                </div>
                <span class="cblue fs14">{{invite.minSalary}}-{{invite.maxSalary}}</span>
            </div>

        </div>

        <div class="bgfff lh25 fs14 c38 pl16 pr17">
            <text>{{invite.requirement}}</text>
        </div>
        <BottomButtonSmall :text="'联系HR'" :url="'tel'" @btn_tap="btn_tap"></BottomButtonSmall>

    </div>
</template>

<script>
    import WXAJAX from '../../../utils/request'
    import util from '../../../utils'
    import BottomButtonSmall from '@/components/bottom_button_small' // 订单项
    export default {
        name: '',
        components: {BottomButtonSmall},
        data() {
            return{
                recruitId:0,
                invite:{
                    experience:1,
                    education:1,
                },
                /*学历*/
                educatArray:[
                    {title:'全部',id:1},{title:'初中及以下',id:2},{title:'中专/中技',id:3},
                    {title:'高中',id:4},{title:'大专',id:5},{title:'本科',id:6},
                    {title:'硕士',id:7},{title:'博士',id:8}
                ],
                /*经验*/
                experienceArray:[
                    {title:'应届生',id:1},{title:'1年以内',id:2},
                    {title:'1-3年',id:3},{title:'3-5年',id:4},{title:'5-10年',id:5},
                    {title:'10年以上',id:6}, {title:'全部',id:7},
                ],
            }
        },
        onShow() {
            wx.setNavigationBarTitle({
                title: "招聘详情"
            });
            this.recruitId = this.$root.$mp.query.recruitId || 0;
            this.getInits() ;
        },
        methods: {
          btn_tap(){
              let phone = '' ;
              if(this.invite.recruitPhone){
                  phone = String(this.invite.recruitPhone);
              }

              if (!phone) {
                wx.showToast({
                  title: 'hr还未添加联系方式！',
                  duration: 2000,
                  icon: 'none'
                });
                return;
              }

              util.MakePhone(phone);
          },
            getInits(){
                let v = this ;
                wx.showLoading();
                WXAJAX.POST({
                    recruitId:this.recruitId ,
                }, '', '/recruit/queryPage','','',1).then((data) => {

                    wx.hideLoading();
                    if(data){
                        // data = data.list[0];
                        // data.list[0].maxSalary = (data.list[0].maxSalary/1000/100)+'k';
                        // data.list[0].minSalary = (data.list[0].minSalary/1000/100)+'k';
                        // data.list.time = util.getdate( data.list.createTime , 'dateTime') ;
                        v.invite = data.list[0] ;
                         v.invite.maxSalary = ( v.invite.maxSalary/1000/100)+'k';
                         v.invite.minSalary = ( v.invite.minSalary/1000/100)+'k';
                        console.log(v.invite ,"sfsfrgergbethbtrhbtrgg")

                    }else{
                        setTimeout(function () {
                            v.isLoading = false ;
                        },500);
                    }
                }).catch((err) => {
                    console.log(err);
                    wx.hideLoading();
                    if(err.code == 204){
                        v.nodata = true ;
                    }
                    setTimeout(function () {
                        v.isLoading = false ;
                    },500);
                });
            },
        }
    }
</script>

<style>

</style>
