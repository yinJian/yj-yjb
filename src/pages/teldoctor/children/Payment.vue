<template>
  <div class="doctor_container">
    <div class="pay_total">
      <img src="../../../assets/images/emergency-calls.png"/>
      <p class="title">电话医生服务</p>
      <div class="money">49.00 元/次<br/><s class="flr">99.00元/次</s></div>
    </div>
    <div class="pay_content" >
      <div class="introduce">
        <div class="team-introduce">
          <h3>医生团队介绍</h3>
          <ul>
            <li>三甲医院在职医生团队，主治及以上级别，专业水平佳</li>
            <li>覆盖全科、儿科，解决日常健康及医疗问题</li>
            <li>顶级医院主任及专家智库团队，建立知识库体系，解决疑难问题</li>
          </ul>
          <h3>服务权益</h3>
          <ul>
            <li>电话医生服务购买后即刻生效，1年内有效</li>
            <li>发起服务申请，并由医生对接完成服务后，系统将扣减服务次数</li>
          </ul>
          <div v-if="payDetail">
            <ul>
              <li>服务完成后，您可在“我的订单”中查询服务记录，再次听取电话录音</li>
              <li>若您为保单/服务卡权益客户，完成保单/服务卡绑定后即可享受相应权益服务</li>
            </ul>
            <h3>服务内容</h3>
            <ul>
              <li>只需一通电话，即为您提供一对一全科医生咨询，全力解答疑问，悉心呵护您的健康</li>
              <li>医疗咨询：发热、咳嗽、慢性头痛等身体不适、常见疾病的线上咨询问诊</li>
              <li>报告解读：体检、化验单等常规检测报告的解读及相关医疗、健康建议</li>
              <li>智能导诊：根据您的病情、就医需求，为您精准匹配推荐合适的医院、科室</li>
              <li>慢病管理：针对三高等常见慢性疾病给予健康管理及慢病干预方案及建议</li>
              <li>康复疑问：针对疾病愈后、术后的康复疑问解答及愈后康复建议</li>
            </ul>
          </div>
        </div>
        <div class="pay-detail" @click="payDetail=true" v-show="!payDetail"><img src="../../../assets/images/down-arrow.png"/></div>
        <div class="pay-detail" @click="payDetail=false" v-show="payDetail"><img src="../../../assets/images/up-arrow.png"/></div>
      </div>
      <div class="pay-style">
        <div class="fll"><img src="../../../assets/images/wechat_logo1.png" class="wechat-logo"><span>微信支付</span></div>
        <div class="selecte"><img src="../../../assets/images/selected.png"/></div>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="account">实际支付：<span>49.00元</span></div>
      <div class="to-pay-btn" @click="pay">去支付</div>
    </div>
  </div>
</template>

<script>
  import { APP_URL } from '@/assets/scripts/utils.js';
  import {paymentTest} from '@/api'
    export default {
      data (){
        return {
          payDetail: false
        }
      },
      methods:{
        pay(){
          paymentTest('yjcard01','CP1000').then(data =>{
            console.log(data.data)
            function onBridgeReady(){
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId" : data.data.appId,        //公众号名称，由商户传入
                  "timeStamp": data.data.timeStamp, //时间戳，自1970年以来的秒数
                  "nonceStr" : data.data.nonceStr,  //随机串
                  "package" : data.data.prepay_id,  //预支付id
                  "signType" : data.data.signType,  //微信签名方式
                  "paySign" : data.data.paySign     //微信签名
                },
                function(res){
                  //支付成功后返回 get_brand_wcpay_request:ok
                  if(res.err_msg == "get_brand_wcpay_request:ok") {
                    window.location.href = APP_URL + "#/teldoctor/paysuccess";
                  }
                }
              );
            }
            if(typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            }else{
              onBridgeReady();
            }
          })
        }
      },
      mounted (){
        document.title = '支付费用'
      }
    }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .doctor_container{
    height: 100vh;
    background: @bg-default;
    overflow: scroll;
  }
  .pay_total{
    width: 710px;
    height: 148px;
    margin: 20px auto;
    background: @bg-white;
    border-radius: 5px;
    position: relative;
    img{
      width: 78px;
      position:absolute;
      left: 0;
      bottom: 0;
    }
    .title{
      float: left;
      font-size: 36px;
      font-weight: bold;
      color: #333333;
      line-height: 150px;
      margin-left: 45px;
    }
    .money{
      float: right;
      margin-top: 42px;
      margin-right: 41px;
      font-size: 36px;
      color: @bg-orange;
      s{
        font-size: 24px;
        color: @text-color-gray;
      }
    }
  }
  .pay_content{
    background: @bg-white;
    padding: 40px 40px 0 40px;
    margin-bottom: 102px;
    min-height: calc(100vh - 290px);
    overflow: hidden;
    .introduce{
      width: 670px;
      margin: 0 auto;
      padding: 0 30px 30px 30px;
      height: auto;
      overflow: hidden;
      box-shadow: 0 4px 10px 0 rgba(78,0,0,0.08);
      border-radius: 5px;

      .team-introduce{
        color: #666666;
        h3{
          padding-left: 26px;
          font-size: 32px;
          margin-top: 40px;
          margin-bottom: 30px;
          position: relative;
          color: #333333;
          line-height: 32px;
        }
        h3:before{
          content: '';
          width: 6px;
          height: 28px;
          background-color: #F39800;
          border-radius: 6px;
          position: absolute;
          left: 0px;
          z-index: 2;
        }
        ul{
          padding-left: 32px;
          list-style: disc;
          font-size: 28px;
          line-height: 40px;
          color: #666666;
        }
      }
      .pay-detail{
        text-align: center;
        margin-top: 20px;
        img{
          width: 36px;
        }
      }
    }
    .pay-style{
      margin-top: 38px;
      margin-bottom: 70px;
      overflow: hidden;
      font-size: 32px;
      color: #333333;
      height: 62px;
      line-height: 62px;
      .wechat-logo{
        width: 60px;
        float: left;
      }
      span{
        padding-left: 20px;
      }
      .selecte{
        float: right;
        line-height: 62px;
        img{
          margin-top:10px;
          width:40px;
        }
      }
    }
  }
  .account{
    width: 60%;
    height: 98px;
    line-height: 98px;
    text-align: left;
    padding-left: 40px;
    background: @bg-white;
    color: #999999;
    font-size: 24px;


    span{
      color: @bg-orange;
      font-size: 32px;
    }
  }
  .to-pay-btn{
    width: 40%;
    height: 98px;
    line-height: 98px;
    font-size: 32px;
    text-align: center;
    background: @bg-orange;
    color: @text-color-white;
  }
</style>
