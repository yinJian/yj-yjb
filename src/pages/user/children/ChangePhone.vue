<template>
  <div>
    <template v-if="!verified">
      <div class="card">
        <div class="card-item">
          <div class="card-item-label">申请人姓名</div>
          <input type="" name="" v-model="username" placeholder="必填">
        </div>
        <div class="card-item">
          <div class="card-item-label">身份证号</div>
          <input type="" name="" v-model="idNumber" placeholder="必填">
        </div>
      </div>
      <div class="bottom-bar">
        <div class="apply-submit" @click="verifyHandler">下一步</div>
      </div>
    </template>
    <template v-else>
      <div class="card">
        <div class="card-item">
          <div class="card-item-label">新手机号</div>
          <input type="" v-model="phone" name="" class="phone-input">
          <div class="send-code" @click="sendCodeHandler" v-if="!sended">获取验证码</div>
          <div class="send-code send-code-disabled" v-else="sended">{{ time }}秒后重发</div>
        </div>
        <div class="card-item">
          <div class="card-item-label">验证码</div>
          <input type="" v-model="code" name="" placeholder="必填">
        </div>
      </div>
      <div class="bottom-bar">
        <div class="apply-submit" @click="bindPhoneHandler">确认</div>
      </div>
    </template>
  </div>
</template>

<script>
  import { sendCode, codeCheck, checkUserInfo, updatePhone } from '@/api';
  let timer = null;
  export default {
    data () {
      return {
        username: '',
        idNumber: '',
        verified: false,
        sended: false,
        phone: '',
        code: '',
        time: 60
      }
    },
    mounted () {
      document.title = '修改手机';
    },
    methods: {
      startTimer () {
        timer = setInterval(() => {
          if (this.time > 0) {
            this.time--;
          } else {
            this.time = 60;
            clearInterval(timer);
            this.sended = false;
          }
        }, 1000);
      },
      sendCodeHandler () {
        let { phone } = this;
        if (!phone) {
          this.$yjToast('请输入正确的手机号！');
          return;
        }
        this.sended = true;
        this.startTimer();
        sendCode(phone).then(data => {
          if (data.data.success == 'OK') {
            this.$yjToast('验证码发送成功！');
          } else {
            this.$yjToast(data.data.message);
          }
        });
      },
      bindPhoneHandler () {
        let {
          phone,
          code
        } = this;
        if (!phone) {
          this.$yjToast('请输入正确的手机号！');
          return;
        }
        if (!code) {
          this.$yjToast('请输入验证码！');
          return;
        }
        codeCheck(phone, code).then(data => {
          if (data.data.success == 'OK') {
            updatePhone(phone).then(data => {
              if (data.data.success == 'OK') {
                this.$yjToast('修改手机号成功！');
                this.$router.replace('/user/account');
              } else {
                this.$yjToast(data.data.message);
              }
            });
          }
        });
      },
      verifyHandler () {
        const {
          username,
          idNumber
        } = this;
        if (!username) {
          this.$yjToast('请输入用户姓名！');
          return;
        }
        if (!idNumber || !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idNumber)) {
          this.$yjToast('请输入正确的身份证号！');
          return;
        }
        checkUserInfo(username, idNumber).then(data => {
          console.log(data)
          if (data.data.success == 'OK') {
            this.verified = true;
          } else {
            this.$yjToast('用户信息有误！');
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .apply-submit {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.3rem;
    text-align: center;
    background: @bg-orange;
    color: @text-color-white;
  }

  .apply-desc {
    width: 100%;
    height: 4.7733rem;
    padding: 0.32rem;
    border: none;
    outline: none;
  }

  .phone-input {
    width: calc( 100% - 5.4rem );
  }

  .send-code {
    width: 2.4rem;
    height: 0.6666rem;
    line-height: 0.6666rem;
    font-size: 0.3733rem;
    color: #E49A2D;
    text-align: right;
  }

  .send-code-disabled {
    color: #a7a7a7;
  }
</style>