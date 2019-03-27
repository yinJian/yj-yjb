<template>
  <div class="doctor_container">
    <div class="active-success">
      <img src="../../../assets/images/success-icon1.png" class="success-icon"/>
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
            this.$router.push('person')
          }
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
  .success-icon{
    width: 200px;
  }
  .tip{
    width: 543px;
    margin: 24px auto 0;
    line-height: 33px;
    font-size: 24px;
    color: #666666;
    span{
      color: @bg-orange;
    }
  }
</style>
