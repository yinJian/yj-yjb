<template>
  <div class="doctor_container">
    <div v-show="!activeSuccess">
      <div class="card-item">
        <div class="card-item-label"><img src="../../../assets/images/account-icon.png"/></div>
        <input placeholder="请输入卡号" v-model="cardNumber"/>
      </div>
      <div class="card-item" style="border-bottom: 0;">
        <div class="card-item-label"><img src="../../../assets/images/password-icon.png"/></div>
        <input placeholder="请输入密码" v-model="password"/>
      </div>
      <div class="doctor_apply" @click="active">确认激活</div>
    </div>
    <div v-show="activeSuccess" class="active-success">
      <img src="../../../assets/images/active-success-icon.png" class="success-icon"/>
      <p>激活成功！</p>
      <div class="doctor_apply" @click="actived">确定</div>
    </div>
  </div>
</template>

<script>
  import {activeCard} from '@/api'
    export default {
      data(){
        return{
          cardNumber: '',
          password: '',
          activeSuccess: false
        }
      },
      methods:{
        active(){
          activeCard(this.cardNumber,this.password).then(data =>{
            if(data.data.code == '200'){
              this.activeSuccess = true
            }else {
              this.$yjToast(data.data.msg)
            }
          })
        },
        actived(){
          this.$router.push('/teldoctor/person')
        }
      },
      mounted (){
        document.title = '卡激活'
      }
    }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .card-item{
    padding: 0;
    margin: 0 40px;
    width: calc(~"100% - 80px");
    line-height: 130px;
    height: auto;
    img{
      width: 40px;
      transform: translateY(30%);
    }
    input{
      font-size: 34px;
    }
  }
  .doctor_container{
    height: 100vh;
    background: @bg-white;
    overflow: hidden;
  }

  .doctor_apply{
    background: #F39800;
    color: @text-color-white;
    display: block;
    font-size: 32px;
    text-align: center;
    line-height: 88px;
    border-radius: 60px;
    width: 600px;
    height: 88px;
    margin: 60px auto 0;
    box-shadow: 0 6px 14px 0 rgba(255,153,62,0.4);
  }

  .active-success{
    text-align: center;
    margin: 3rem auto 0;
    font-weight: normal;
    p{
      margin-top: 0.4rem;
      font-size: 0.5rem;
    }
  }
  .success-icon{
    width:2.6rem;
  }
</style>
