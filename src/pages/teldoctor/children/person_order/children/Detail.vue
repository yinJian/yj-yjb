<template>
  <div class="order-detail">
    <div class="order-white-bg">
      <div class="order-detail-bg">
        <p class="order-status" v-if="status =='0001'"><img class="order-status-icon" src="../../../../../assets/images/order-status-wait-icon.png"/>待接单</p>
        <p class="order-status" v-if="status =='0006'"><img class="order-status-icon" src="../../../../../assets/images/order-status-success-icon.png"/>已接单</p>
        <p class="order-status" v-if="status =='0009'"><img class="order-status-icon" src="../../../../../assets/images/order-status-success-icon.png"/>已完成 待评价</p>
        <p class="order-status" v-if="status =='0011'"><img class="order-status-icon" src="../../../../../assets/images/order-status-success-icon.png"/>已完成 已评价</p>
        <p class="order-status" v-if="status =='0012'"><img class="order-status-icon" src="../../../../../assets/images/order-status-cancel-icon.png"/>已取消</p>
        <div class="order-detail-item" v-if="status =='0006'||status =='0009'||status =='0011'">
          <div class="order-detail-doctor" @click="viewDetail">
            <img :src="orderDetail.doctor.enclosure.enclosureUrl ? orderDetail.doctor.enclosure.enclosureUrl : defautDoctor" class="doctor-img"/>
            <div class="doctor-info">
              <p><span class="doctor-name">{{orderDetail.doctor.doctorName}}</span> &nbsp; <span class="doctor-title">{{orderDetail.doctor.doctorPost? orderDetail.doctor.doctorPost : '医生'}}</span> &nbsp;{{orderDetail.doctor.medicalSectionIdFK.medicalSectionName}}</p>
              <p>{{orderDetail.doctor.medicalSectionIdFK.medicalInstitutionsIdFK.medicalInstitutionsName}} &nbsp;&nbsp;{{orderDetail.doctor.medicalSectionIdFK.medicalInstitutionsIdFK.hospitalLevelName ? orderDetail.doctor.medicalSectionIdFK.medicalInstitutionsIdFK.hospitalLevelName :''}}</p>
            </div>
          </div>
          <div class="card" v-if="orderDetail.telephoneDoctor.doctorsAdvice != null || orderDetail.telephoneDoctor.suggestMedications != null">
            <div class="card-title">咨询建议</div>
            <div class="card-detail">
              <div class="card-detail-label">用户情况：</div>
              <div class="card-detail-value">{{orderDetail.telephoneDoctor.doctorsAdvice}}dd</div>
              <div class="card-detail-label">用药：</div>
              <div class="card-detail-value">{{orderDetail.telephoneDoctor.suggestMedications}}aa</div>
            </div>
          </div>
          <div class="card" v-if="recordList.length != 0">
            <div class="card-title">咨询录音</div>
            <div class="card-detail record">
              <div v-for="item in recordList">
                <audio controls style="width: 90%">
                  <source v-bind:src="item.enclosureUrl" type="audio/mpeg">
                  您的浏览器不支持 audio 元素。
                </audio>
                <div class="card-time fll">{{item.enclosureBeginDateStr}}-{{item.enclosureEndDateStr}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-detail-item">
          <div class="card-title">问题详情</div>
          <div class="card-detail">
            <div class="card-detail-label">咨询科室：</div>
            <div class="card-detail-value">{{orderDetail.telephoneDoctor.medicalSectionName}}</div>
            <div class="card-detail-label">具体症状描述：</div>
            <div class="card-detail-value">{{orderDetail.telephoneDoctor.customerConsultationQuestion}}</div>
          </div>
        </div>
        <div v-if="enclosure.length != 0">
          <div class="card-detail photo-tip">患处照片、检查报告、医学摄像图片</div>
          <div class="file-list">
            <div class="file-item" v-for="file in enclosure">
              <div class="file-item-wrapper">
                <img :src="file.enclosureUrl" class="file-img" @click="previewImgHandler(file.enclosureUrl)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grey-bar"></div>
    <div class="card order-number">
      <div class="card-detail pl40">
        <div class="card-detail-label card-number">订单编号：<span>{{orderDetail.orderMain.orderNumber}}</span></div>
        <div class="card-detail-label card-number">创建时间：<span>{{orderDetail.orderMain.orderDate | dateFilter('YYYY年MM月DD日 HH:mm:ss')}}</span></div>
      </div>
    </div>
    <div class="img-preview-wrapper" v-show="previewShow" @click="previewShow = false">
      <div class="img-preview-cover"></div>
      <div class="img-preview-content">
        <img :src="previewImg">
      </div>
    </div>
    <!--<div @click="returnApply" class="service-choose" v-if="status =='0011'">联系复诊</div>-->
    <div  @click="JumpLink('/teldoctor/person-order/comment?'+orderMainId)" class="service-choose" v-if="status =='0009'">去评价</div>
    <div  @click="cancelOrders" class="service-choose" v-if="status =='0001'">去取消</div>
    <!--<div class="service-choose" v-else>
      <div class="service-call">申请退款</div>
      <div class="service-apply">评价</div>
    </div>-->
    <yj-modal
      :modalShow="returnConsultShow"
      :title="title"
      :content='tips'
      :confirmBtn="confirmBtnText"
      @on-close="returnConsultShow = false"
      @on-confirm="returnConsultConfirm"
    >
    </yj-modal>
  </div>
</template>

<script>
  import {
    myOrderDetail,
    phoneFindFile,
    returnApply,
    cancleOrder
  } from '@/api';

  const defautDoctor = require('@/assets/images/default-doctor.png');
  export default {
    data(){
      return {
        orderDetail: {
          doctor: {
            doctorId: '',
            medicalSectionIdFK:{
              medicalSectionName: '',
              medicalInstitutionsIdFK: ''
            }
          },
          orderMain: {
            orderDate: '',
            orderNumber: ''
          },
          telephoneDoctor: {
            doctorsAdvice: '',
            suggestMedications: ''
          }
        },
        recordList: [ ],
        orderMainId: '',
        enclosure: {},
        previewImg: '',
        previewShow: false,
        returnConsultShow: false,
        tips: '复诊咨询提交后，医生可能正在忙碌，如医生未能及时处理您的咨询请求，请您耐心等待。' +
        '复诊咨询将为您保留24个小时，如果医生未能在24小时内处理，咨询将被关闭。',
        title: '电话复诊须知',
        confirmBtnText: '开始咨询',
        orderNumber: '',
        status: '',
        defautDoctor: defautDoctor
      }
    },
    methods: {
      JumpLink(url){
        this.$router.push(url)
      },
      previewImgHandler (img) {
        this.previewImg = img;
        this.previewShow = true;
      },
      returnApply(){
        this.returnConsultShow = true
      },
      returnConsultConfirm(){
        returnApply(this.orderMainId).then(data =>{
          if(data.data.code == '200'){
            this.$router.push('/teldoctor/return-apply?'+ this.orderMainId)
          }else if(data.data.code == '201'){
            this.$router.push('/teldoctor/payment')
          }else {
            this.$yjToast(data.data.msg)
          }
        })
        this.returnConsultShow = false
      },
      cancelOrders(){
        cancleOrder(this.orderMainId).then(data =>{
          console.log(data.data)
          if(data.data.code == '200'){
            this.$router.push('/teldoctor/person')
          }
        })
      },
      viewDetail(){
        this.$router.push('/teldoctor/team-detail?' + this.doctorId)
      }
      /*doctorOrderList(){
        this.$router.push('doctor-order-list')
      }*/
    },
    mounted (){
      document.title = '订单详情'
      this.orderMainId = window.location.href.split("?")[1]
      myOrderDetail(this.orderMainId).then(data => {
        console.log(data.data)
        if(data.data.code == '200'){
          this.orderDetail = data.data
          this.doctorId = data.data.doctor.doctorId
          this.orderNumber = data.data.orderMain.orderNumber
          this.recordList = data.data.recordList
          this.status = data.data.orderMain.customerServiceOrderStatus
          phoneFindFile(this.orderNumber).then(data => {
            if(data.data.success == 'OK'){
              this.enclosure = data.data.data;
            }
          });
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../../assets/styles/base.less';

  .card{
    border-bottom: 0;
    margin-top: 0;
    padding: 36px 0 30px;
  }
  .order-detail{
    background: @bg-white;
    min-height: 100vh;
    overflow: scroll;
  }

  .order-detail-bg{
    background-color: @bg-white;
    background-image: url("../../../../../assets/images/order-detail-bg.png");
    background-size: 100% 190px;
    background-repeat: no-repeat;
    overflow: hidden;
    width: 100vw;
    z-index: 1;
    position: relative;
    p.order-status{
      color: @bg-white;
      padding: 36px 40px;
      font-size: 32px;
      font-weight: bold;
    }
  }
  .order-status-icon{
    width: 40px;
    margin-right: 20px;
    float: left;
  }
  .card-title{
    font-size: 28px;
    color: #333333;
    font-weight: bold;
    padding: 0;
    border-bottom: 0;
    margin-bottom: 20px;
  }
  .order-detail-bg .order-detail-item{
    width: 94%;
    margin: 0 auto 20px;
    background: @bg-white;
    box-shadow: 0 4px 10px 0 rgba(78,0,0,0.08);
    border-radius: 5px;
    position: relative;
    z-index: 2;
    padding: 40px;
    overflow: hidden;
    p{
      color: #999999;
    }
    .order-detail-doctor{
      overflow: hidden;
      padding-bottom: 40px;
      p{
        padding: 0;
      }
      .doctor-img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        float: left;
      }
      .doctor-info{
        float: left;
        margin: 0 20px;
        line-height: 50px;
        p{
          font-size: 24px;
          color: #999999;
        }
        .doctor-name{
          font-size: 32px;
          color: #333333;
          font-weight: bold;
        }
        .doctor-title{
          color: #333333;
        }
      }
    }
  }

  .card-detail-label{
    float: left;
    color: #999999;
    font-size: 24px;
    span {
      color: #000000;
    }
  }
  .card-number{
    color: #333333;
    font-weight: bold;
    width: 100vw;
    font-size: 28px;
    span{
      color: #000000;
      font-weight: normal;
    }
  }
  .card-detail .card-detail-value{
    border-bottom: 0;
  }

  .card-detail{
    line-height: 46px;
    color: #cccccc;

    .card-detail-value{
      color: #333333;
    }
    .card-time{
      font-size: 24px;
      color: #999999;
    }
  }

  .service-choose {
    position: fixed;
    bottom: 0;
    font-size: 28px;
    font-weight: bold;
    width: 100%;
    height: 98px;
    line-height: 98px;
    text-align: center;
    color: @bg-orange;
    background: @bg-white;
    z-index: 99;
    box-shadow: 0 -4px 10px 0 rgba(78,0,0,0.08);
  }

  .file-list {
    width: 100%;
    padding: 0 40px;
    display: flex;
    flex-wrap: wrap;
  }

  .file-item {
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .file-item:nth-child(3n+3) {
    margin-right: 0;
  }

  .file-item-wrapper {
    position: relative;
  }

  .file-img {
    width: 100px;
    height: 100px;
    display: block;
  }

  .img-preview-content {
    width: 100%;
    height: 100vh;
    padding: 1rem 0;
    background: #000000;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;

    img {
      width: 100%;
    }
  }
  .pl40{
    padding-left: 40px;
  }
  .photo-tip{
    color: #666666;
    font-size: 24px;
    border-bottom: 1px solid #E1E1E1;
    padding: 30px 40px;
  }
  .grey-bar{
    width: 100vw;
    height: 20px;
    background: #F1F1F1;
  }
  .order-number{
    margin-bottom: 98px;
    //margin-top: 20px;
    overflow: hidden;
  }
</style>
