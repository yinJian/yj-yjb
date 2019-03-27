<template>
  <div class="doctor_container">
    <div class="active-success">
      <img src="../../../assets/images/active-success-icon.png" class="success-icon"/>
      <p>支付成功</p>
      <div class="company-name">优加健保健康科技（北京）有限公司</div>
      <div class="money">49.00</div>
      <router-link to="home" class="doctor_apply">确定</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data (){
      return {
        payDetail: false
      }
    },
    methods:{

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
    background: @bg-white;
    overflow: hidden;
  }
  .doctor_apply{
    width: 600px;
    height: 88px;
    line-height: 88px;
    background: #F39800;
    box-shadow: 0 6px 14px 0 rgba(255,153,62,0.40);
    border-radius: 60px;
    font-size: 32px;
    color: @text-color-white;
    text-align: center;
    display: block;
    margin: 100px auto 0;
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
  .company-name{
    width: 543px;
    margin: 24px auto 0;
    line-height: 33px;
    font-size: 24px;
    color: #666666;
  }
  .money{
    color: #333333;
    font-size: 38px;
    font-weight: bold;
    margin-top: 20px;
  }
  .success-icon{
    width: 200px;
  }
</style>
