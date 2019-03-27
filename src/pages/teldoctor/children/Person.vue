<template>
  <div class="person-center">
    <div class="user-info">
      <img :src="avatar ? avatar : defautPerson">
      <div>{{ oldName ? oldName : '暂无用户' }}</div>
    </div>
    <p class="tips">注意：医生咨询服务仅为建议，具体诊疗请到医院就医</p>
    <div class="card-tabs">
      <div class="card-tab" :class="{'card-tab-active':index == num}" v-for="(tab, index) in orderTab" :key="tab.name" @click="orderTabHandler(index)">
        <span>{{ tab.name }}</span>
      </div>
    </div>
    <div class="cards" style="margin-bottom: 1.6rem">
      <div class="order-card" v-if="num == 0" v-for="item in myOrderCon" @click="(item.orderType=='0008')?JumpLink('/teldoctor/person-order/detail?'+item.orderMainId):JumpLink('/order/detail/'+item.orderNumber)" >
        <div class="order-time">
          <!--2018年08月01日  21:00:00--> {{ item.orderDate | dateFilter('YYYY年MM月DD日 HH:mm:ss') }} &nbsp;&nbsp;&nbsp;<span v-if="item.isReferral == '0001'">复诊订单</span>
          <span class="order-state" v-show="item.customerServiceOrderStatus =='0001'">待接单</span>
          <span class="order-state" v-show="item.customerServiceOrderStatus =='0006'">已接单</span>
          <span class="order-state-cancel" v-show="item.customerServiceOrderStatus =='0012'">已取消</span>
          <span class="order-state" v-show="item.customerServiceOrderStatus =='0011'">已评价</span>
          <span class="order-state" v-show="item.customerServiceOrderStatus =='0009'">订单完成（待评价）</span>
          {{item.orderType}}
        </div>
        <div class="order-list" v-if="item.doctor != null">
         <!-- <img src="../../../assets/images/avatar-default.jpg" class="doctor-img"/>-->
          <img :src="item.doctor.enclosure.enclosureUrl?item.doctor.enclosure.enclosureUrl:defautDoctor" class="doctor-img"/>
          <div class="doctor-info">
            <p><span class="doctor-name">{{item.doctor.doctorName}}</span>  &nbsp;&nbsp;<span class="doctor-title">{{item.doctor.doctorPost}}</span>  &nbsp;&nbsp;{{item.doctor.medicalSectionIdFK.medicalSectionName}}</p>
            <p>{{item.doctor.medicalSectionIdFK.medicalInstitutionsIdFK.medicalInstitutionsName}}</p>
          </div>
        </div>
      </div>
      <div class="order-card" v-if="num == 1" v-for="ite in healthCardCon">
        <div class="health-card-list">
          <div class="health-card-left">
            <p class="health-card-title">优加电话医生卡</p>
            <p><span>电话咨询医生{{ite.serviceNumber == -1 ? '不限' : ite.serviceNumber}}次</span></p>
            <p><span>卡号：{{ite.cardNumber}}</span></p>
            <p><span>有效期：{{ite.startTime}}至{{ite.endTime}}</span></p>
          </div>
          <div class="health-card-right">
            <p class="remain">剩余{{ite.remainingNumber}}次</p>
            <p><span>已使用{{ite.useNumber}}次</span></p>
          </div>
        </div>
      </div>
      <div class="order-card" v-if="num == 2" v-for="it in policyCon">
        <div class="policy">
          <h3>{{it.insuranceName}}</h3>
          <p>保单号：{{it.policyNumber}}</p>
          <p>有效期：{{it.startTime}} 至 {{it.endTime}}</p>
        </div>
      </div>
      <div class="nothing" v-if="num == 0 && myOrderCon.length <= 0">
        <img src="../../../assets/images/no-order-i.png"/>
        <p>您还没有订单</p>
      </div>
      <div class="nothing" v-if="num == 1 && healthCardCon.length <= 0">
        <img src="../../../assets/images/no-health-card.png"/>
        <p>您还没有健康卡</p>
      </div>
      <div class="nothing" v-if="num == 2 && policyCon.length <= 0">
        <img src="../../../assets/images/no-policy.png"/>
        <p>您还没有保单</p>
      </div>
    </div>
    <div class="bottom-bar" v-if="num == 1">
      <div class="service-choose">
        <router-link to="active" class="service-call" ><img src="../../../assets/images/active-card.png"/><span>卡激活</span></router-link>
        <router-link to="payment" class="service-apply"><img src="../../../assets/images/buy-card.png"/><span>购买新卡</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    personCenter,
    bindPhDoctorUsers
  } from '@/api';
  import {getLocalStorage} from "../../../assets/scripts/utils";
  import {mapState} from 'vuex'
  const defautDoctor = require('@/assets/images/default-doctor.png');
  const defautPerson = require('@/assets/images/default-person.png');
    export default {
      data () {
        return {
          orderTab: [{name: '我的订单'},{name: '健康卡'},{name: '我的保单'}],
          num: 0,
          myOrderCon: [],
          healthCardCon: [],
          policyCon: [],
          oldName: '',
          avatar: '',
          defautDoctor: defautDoctor,
          defautPerson: defautPerson
        }
      },
      methods: {
        JumpLink(url){
          this.$router.push(url)
        },
        orderTabHandler (index) {
          this.num = index
        },
        getTabList(){
          personCenter().then(data => {
            if(data.data.code == '200'){
              console.log(data.data)
              this.myOrderCon = data.data.orderMainList
              this.healthCardCon = data.data.yjhealthCardList
              this.policyCon = data.data.userInsuranceList
            }else {
              this.$yjToast(data.data.msg);
            }
          })
        }
      },
      mounted(){
        document.title = '个人中心'
        this.getTabList()
        bindPhDoctorUsers().then(data =>{
          if(data.data.success == 'OK'){
            this.oldName = this.userinfo.name
            this.avatar = getLocalStorage('avatar') ? getLocalStorage('avatar').substring(1, getLocalStorage('avatar').length - 1) : '';
          }else {
            this.$router.push('/teldoctor/signin?redirect='+encodeURIComponent(this.$route.path));
          }
        })
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

  .person-center{
    background: @bg-white;
    min-height: 100vh;
    overflow: hidden;
  }
  .user-info {
    padding: 40px;
    display: flex;
    align-items: center;
    font-size: 32px;
    font-weight: bold;
    color: #FFFFFF;
    background: -webkit-linear-gradient(left, #F39800 , #FFC972); /* Safari 5.1 - 6.0 */
    background: -moz-linear-gradient(right, #F39800, #FFC972); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #F39800 , #FFC972); /* 标准的语法 */

    img {
      width: 60px;
      height: 60px;
      margin-right: 20px;

      .border-radius(50%);
    }
  }

  .card-tabs {
    width: 100%;
    height: 90px;
    line-height: 90px;
    display: flex;
    align-items: center;
    font-size: 32px;
    color: #333333;
    background: @bg-white;
    margin-top:0;
    -moz-box-shadow:0px 2px 5px #e2e2e2;
    -webkit-box-shadow:0px 2px 5px #e2e2e2;
    box-shadow:0px 2px 5px #e2e2e2;
  }

  .card-tab {
    width: 33.33%;
    text-align: center;
    color:#333333;

    span {
      display: inline-block;
    }
  }

  .card-tab-active {
    color:@bg-orange;
    border-bottom: 4px solid @bg-orange;
  }

  .tips{
    text-align: left;
    padding-left: 40px;
    color: #F39700;
    background: #FFF8E6;
    height: 68px;
    line-height: 68px;
    font-size: 24px;
  }

  .order-card{
    border: 0;
    width: calc(~"100% - 56px");
    margin: 20px auto;
    box-shadow: 0 4px 10px 0 rgba(78,0,0,0.08);
    border-radius: 5px;
  }
  .order-time {
    padding: 30px 42px 18px;
    color: #999999;
    font-size: 28px;
  }
  .order-state{
    color: #F39700;
    float: right;
  }
  .order-state-cancel{
    float: right;
  }
  .doctor-img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    float: left;
  }
  .doctor-info{
    float: left;
    margin-left: 22px;
    margin-top: 10px;
    color: #999999;
    font-size: 24px;
    line-height: 44px;
    .doctor-name{
      font-size: 32px;
      color: #333333;
      font-weight: bold;
    }
    .doctor-title{
      color: #333333;
    }
  }
  .order-list{
    overflow: hidden;
    padding: 22px 42px 30px;
  }

  .health-card-list,.policy{
    padding: 40px;
    line-height: 40px;
    overflow: hidden;
    span{
      font-size: 24px;
      color: #999999;
    }
  }
  .policy{
    h3{
      font-size: 32px;
    }
    p{
      color: #999999;
    }
  }
  .health-card-left{
    width: 72%;
    float: left;
  }
  .health-card-title{
    font-size: 32px;
    margin-bottom: 30px;
    font-weight: bold;
    color: #333333;
  }
  .health-card-right{
    width: 28%;
    float: right;
    text-align: right;
    margin-top: 50px;
    .remain{
      color: #F39700;
      font-size: 28px;
    }
  }
  .bottom-bar{
    border-top:0;
    box-shadow: 0 -4px 10px 0 rgba(78,0,0,0.08);
  }
  .service-choose {
    width: 100%;
    height: 98px;
    line-height: 102px;
    display: flex;
    font-size: 28px;
    background: @bg-white;
    img{
      margin-top: 36px;
      float: left;
      width: 28px;
    }
    span{
      float: left;
      margin-left: 20px;
    }
  }

  .service-apply {
    width: 50%;
    color: @bg-orange;
    text-align: center;
    padding-left: 14%;
  }

  .service-call {
    width: 50%;
    color: #333333;
    border-right: 1px solid #eeeeee;
    text-align: center;
    padding-left: 15%;
  }

  .nothing{
    text-align: center;
    padding: 200px 0;
    img{
      width: 160px;
    }
    p{
      color: #333333;
      margin-top: 20px;
      font-size: 32px;
      font-weight: bold;
    }
  }
</style>
