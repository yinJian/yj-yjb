<template>
  <div class="doctor_container">
    <div class="doctor-home-bg">
      <img src="../../../assets/images/logo.png" class="logo-icon"/>
      <div class="doctor-home-content">
        <ul class="section">
          <li @click="isJumpLink('/teldoctor/active')">
            <img src="../../../assets/images/jihuo.png"/>
            <p>激活卡</p>
          </li>
          <li @click="JumpLink('/teldoctor/team')">
            <img src="../../../assets/images/yishengtuandui.png"/>
            <p>医生团队</p>
          </li>
          <li @click="isJumpLink('/teldoctor/person')">
            <img src="../../../assets/images/gerenzhongxin.png"/>
            <p>个人中心</p>
          </li>
        </ul>
        <div class="section-item quick-visit" @click="quickVisit">
          <img src="../../../assets/images/kuaisuwenzhen.png"/>
          <div class="section-item-right">
            <h3>快速问诊</h3>
            <p>开放时间：每天09:00至21:00</p>
          </div>
        </div>
        <!--<div class="section-item night-call" @click="nightModel">
          <img src="../../../assets/images/yejianzhihu.png"/>
          <div class="section-item-right">
            <h3>夜间直呼</h3>
            <p>开放时间：每天21:00至次日09:00</p>
          </div>
        </div>-->
        <div class="section-item stay-expect">
          <img src="../../../assets/images/jingqingqidai.png"/>
          <div class="section-item-right">
            <h3>敬请期待</h3>
            <p>正在开发中，敬请期待</p>
          </div>
        </div>
      </div>
    </div>
    <call-modal
      :modalShow="nightCallShow"
      :content="tips"
      @on-close="nightCallShow = false"
      @on-confirm="nightCallConfirm"
    ></call-modal>
  </div>
</template>

<script>
  import{
    quickVisit,
    bindPhDoctorUsers,
    checkNightDate,
    checkDayDate,
    patientPhone
  } from '@/api';

  import {mapState} from 'vuex'
  var time = Number(new Date())
  export default {
    data (){
      return {
        nightCallShow: false,
        tips: '拨打医生电话'
      }
    },
    methods:{
      JumpLink(url){
        this.$router.push(url)
      },
      isJumpLink(url){
        bindPhDoctorUsers().then(data =>{
          if(data.data.success == 'OK'){
            this.$router.push(url)
          }else {
            this.$router.push('/teldoctor/signin?redirect='+encodeURIComponent(this.$route.path));
          }
        })
      },
      nightModel(){
        checkNightDate(time).then(data =>{
          if(data.data.success == 'OK'){
            bindPhDoctorUsers().then(data =>{
              if(data.data.success == 'OK'){
                quickVisit(this.userinfo.name,this.userinfo.idType,this.userinfo.idNumber).then(data =>{
                  if(data.data.code == '200'){
                    patientPhone().then(data =>{
                      if(data.data.success == 'OK'){
                        this.nightCallShow = true
                      }else {
                        this.$yjToast(data.data.message)
                      }
                    })
                  }else if(data.data.code == '201'){
                    this.$router.push('/teldoctor/payment')
                  }else {
                    this.$yjToast(data.data.msg)
                  }
                })
              }else {
                this.$router.push('/teldoctor/signin?redirect='+encodeURIComponent(this.$route.path));
              }
            })
          }else {
            this.$yjToast('不在规定时间范围！')
          }
        })
      },
      nightCallConfirm(){
        this.nightCallShow = false
      },
      quickVisit(){
        checkDayDate(time).then(data =>{
          if(data.data.success == 'OK'){
            bindPhDoctorUsers().then(data =>{
              if(data.data.success == 'OK'){
                quickVisit(this.userinfo.name,this.userinfo.idType,this.userinfo.idNumber).then(data =>{
                  if(data.data.code == '200'){
                    this.$router.push('/teldoctor/apply')
                  }else if(data.data.code == '201'){
                    this.$router.push('/teldoctor/payment')
                  }else {
                    this.$yjToast(data.data.msg)
                  }
                })
              }else {
                this.$router.push('/teldoctor/signin?redirect='+encodeURIComponent(this.$route.path));
              }
            })
          }else{
            this.$yjToast('不在规定时间范围！')
          }
        })
      },
    },
    mounted(){
      document.title = '电话医生'
    },
    computed: {
      ...mapState([
        'userinfo'
      ])
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';
  
  *{
    margin: 0;
    padding: 0;
  }
  ul,li{
    list-style: none;
  }
  .doctor_container{
    min-height: 100vh;
    overflow: scroll;
    background: @bg-white;
  }
  .doctor-home-bg{
    background: url("../../../assets/images/home-bg.png") no-repeat;
    background-size: 100% 100%;
    height: 456px;
    width: 100vw;
    z-index: 1;
    position: relative;
  }
  .logo-icon{
    position: absolute;
    top: 66px;
    left: 50%;
    transform: translate(-50%,0);
    width: 110px;
  }
  .doctor-home-content{
    width: 90%;
    margin: 0 auto;
    height: 174px;
    background: #FFFFFF;
    -webkit-box-shadow: 0px 2px 5px #e2e2e2;
    box-shadow: 0px 2px 5px #e2e2e2;
    position: relative;
    z-index: 2;
    top: 320px;
    border-radius: 8px;
    padding-top: 40px;
  }

  .section{
    overflow: hidden;
    li{
      float: left;
      width: 33.33%;
      text-align: center;
    }
    p{
      color: #666666;
      font-size: 28px;
    }
    img{
      width: 50px;
    }
  }
  .section-item{
    height: 200px;
    border-radius: 8px;
    margin-top: 40px;
    overflow: hidden;
    color: @bg-white;
    img{
      width: 166px;
      margin-top: 30px;
    }
  }
  .section-item-right{
    float: right;
    text-align: right;
    margin-top: 40px;
    margin-right: 40px;
    h3{
      font-size: 36px;
      margin-bottom: 20px;
      font-weight: normal;
    }
    p{
      font-size: 24px;
      opacity: 0.7;
    }
  }
  .quick-visit{
    margin-top: 120px;
    background: -webkit-linear-gradient(30deg, #57D6B1, #8AF6AC); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(30deg, #57D6B1, #8AF6AC); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(30deg, #57D6B1, #8AF6AC); /* Firefox 3.6 - 15 */
    background: linear-gradient(30deg, #57D6B1, #8AF6AC); /* 标准的语法 */

  }
  /*.night-call{
    background: -webkit-linear-gradient(30deg, #7F7EFD, #77B4FF); !* Safari 5.1 - 6.0 *!
    background: -o-linear-gradient(30deg, #7F7EFD, #77B4FF); !* Opera 11.1 - 12.0 *!
    background: -moz-linear-gradient(30deg, #7F7EFD, #77B4FF); !* Firefox 3.6 - 15 *!
    background: linear-gradient(30deg, #7F7EFD, #77B4FF); !* 标准的语法 *!
  }*/
  .stay-expect{
    margin-bottom: 1rem;
    background: -webkit-linear-gradient(30deg, #A9B7DA, #B6C9E0); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(30deg, #A9B7DA, #B6C9E0); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(30deg, #A9B7DA, #B6C9E0); /* Firefox 3.6 - 15 */
    background: linear-gradient(30deg, #A9B7DA, #B6C9E0); /* 标准的语法 */
  }
</style>
