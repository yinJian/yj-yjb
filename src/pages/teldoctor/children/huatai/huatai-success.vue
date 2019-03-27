<template>
  <div class="doctor_container">
    <div class="active-success">
      <img src="../../../../assets/images/success.png" class="success-icon"/>
      <p>订单已经提交成功</p>
      <div class="tip">医生将在15分钟内以系统电话 <span>17180195256</span> 联系您请保持电话通畅</div>
      <div class="doctor_apply" @click="finishHandler">确定</div>
    </div>
  </div>
</template>

<script>
    export default {
        methods:{
          finishHandler (){
            location.href = 'http://wechattest.pc.ehuatai.com/h014list?openid=' + this.$route.params.open_id
          }
        }
    }
</script>

<style lang="less" scoped>
  @import '../../../../assets/styles/base.less';

  .doctor_container{
    height: 100vh;
    background: #fff;
    overflow: hidden;
  }
  .active-success{
    text-align: center;
    margin: 200px auto 0;
    font-weight: normal;
    p{
      margin-top: 26px;
      font-size: 36px;
      color: #333333;
    }
  }
  .success-icon{
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }
  .tip{
    width: 543px;
    margin: 24px auto 0;
    line-height: 33px;
    font-size: 24px;
    color: #666666;
    span{
      color: orange;
    }
  }
  .doctor_apply{
    width: 600px;
    height: 88px;
    line-height: 88px;
    background: #0A5690;
    box-shadow: 0 6px 14px 0 rgba(255,153,62,0.40);
    border-radius: 60px;
    font-size: 32px;
    color:#fff;
    text-align: center;
    display: block;
    margin: 100px auto 0;
  }
</style>
