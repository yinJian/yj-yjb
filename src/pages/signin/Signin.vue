<template>
  <div class="signin-container">
    <div class="signin-logo">
      <img src="../../assets/images/img_logo.png">
    </div>
    <div class="signin-form">
      <div class="form-group">
        <input type="text" name="name" v-model="username" class="lg-input" placeholder="姓名">
      </div>
       <div class="form-group">
         <select class="idcard" v-model="selectedID">
           <option v-for="IDlist in IDtype" :value="IDlist.IDcode">{{IDlist.IDname}}</option>
         </select>
        <input type="text" name="name" maxlength="18" class="lg-input" v-model="idNumber">
      </div>
       <div class="form-group">
        <div class="area-code">
          <span>＋86</span>
        </div>
        <input type="tel" name="name" maxlength="11" v-model="phone" placeholder="手机号" class="tel-input">
        <div class="send-code" @click="sendCodeHandler" v-if="!sended">获取验证码</div>
        <div class="send-code send-code-disabled" v-if="sended">{{ time }}秒后重发</div>
      </div>
       <div class="form-group">
        <input type="tel" name="name" class="lg-input" v-model="code" placeholder="请输入验证码">
      </div>
      <div class="button-validate" @click="verifyHandler">立即验证</div>
      <p class="signin-tip">您提交的信息将作为后续医疗服务使用，不会被用作其他用途。</p>
      <p class="signin-agreement">注册即代表您同意 <span @click="jumpLink('/agreement')">《用户协议》</span></p>
    </div>
  </div>
</template>

<script>
  import {
    getUserinfo,
    bindWechat,
    sendCode,
    codeCheck,
    bindUser
  } from '@/api';
  import {
    mapState
  } from 'vuex';

  var timer = null;

  export default {
    data () {
      return {
        serviceType: 0,
        sended: false,
        time: 60,
        username: '',
        phone: '',
        idNumber: '',
        code: '',
        selectedID: '01',
        IDtype: [
          {
            IDcode: '01',
            IDname: '居民身份证'
          },
          {
            IDcode: '04',
            IDname: '军官证'
          },
          {
            IDcode: '07',
            IDname: '中国护照'
          }
          /*{
            IDcode: '02',
            IDname: '居民户口薄'
          },
          {
            IDcode: '03',
            IDname: '驾驶证'
          },
          {
            IDcode: '05',
            IDname: '士兵证'
          },
          {
            IDcode: '06',
            IDname: '军官离退休证'
          },
          {
            IDcode: '08',
            IDname: '异常身份证'
          },
          {
            IDcode: '09',
            IDname: '港澳通行证'
          },
          {
            IDcode: '10',
            IDname: '台湾通行证'
          },
          {
            IDcode: '11',
            IDname: '回乡证'
          },
          {
            IDcode: '51',
            IDname: '外国护照'
          },
          {
            IDcode: '52',
            IDname: '旅行证'
          },
          {
            IDcode: '53',
            IDname: '居留证件'
          },
          {
            IDcode: '71',
            IDname: '组织机构代码证'
          },
          {
            IDcode: '72',
            IDname: '税务登记证'
          },
          {
            IDcode: '73',
            IDname: '营业执照'
          },
          {
            IDcode: '99',
            IDname: '其他证件'
          }*/
        ]
      }
    },
    mounted () {
      this.initUserinfo();
      this.serviceType = this.$route.params.type;
    },
    methods: {
      initUserinfo () {
        if (this.userinfo) {
          if (this.$route.query.redirect) {
            this.$router.replace(decodeURIComponent(this.$route.query.redirect));
          } else {
            this.$router.push('/service');
          }
        }
      },
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
        let {
          username,
          phone,
          idNumber } = this;
        if (!username) {
          this.$yjToast('用户名不能为空！');
          return;
        }
        if (!idNumber) {
          this.$yjToast('身份证不能为空！');
          return;
        }
        if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idNumber)) {
          this.$yjToast('身份证格式不正确！');
          return;
        }
        if (!phone) {
          this.$yjToast('请输入正确的手机号！');
          return;
        }
        if (!/^1[34578]\d{9}$/.test(phone)) {
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
      jumpLink(url) {
        this.$router.push(url);
      },
      verifyHandler () {
        const {
          username,
          code,
          phone,
          idNumber,
          selectedID
        } = this;
        if (!username) {
          this.$yjToast('用户名不能为空！');
          return;
        }
        if (!idNumber) {
          this.$yjToast('身份证不能为空！');
          return;
        }
        if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idNumber)) {
          this.$yjToast('身份证格式不正确！');
          return;
        }
        if (!phone) {
          this.$yjToast('请输入正确的手机号！');
          return;
        }
        if (!/^1[34578]\d{9}$/.test(phone)) {
          this.$yjToast('请输入正确的手机号！');
          return;
        }
        if (!code) {
          this.$yjToast('请输入验证码！');
          return;
        }
        codeCheck(phone, code).then(data => {
          if (data.data.success == 'OK') {
            bindUser(selectedID, idNumber, username, phone).then(data => {
              if (data.data.success == 'OK') {
                this.$yjToast('登录成功！');
                this.$store.commit('updateUserinfo', {
                  userinfo: data.data.data
                });
                if (this.$route.query.redirect) {
                  this.$router.replace(decodeURIComponent(this.$route.query.redirect));
                } else {
                  this.$router.replace({
                    path: '/service/list'
                  });
                }
              } else {
                this.$yjToast(data.data.message);
              }
            })
          } else {
            this.$yjToast('请输入正确的验证码！');
          }
        });
      }
    },
    watch: {
      userinfo: {
        handler () {
          this.initUserinfo();
        },
        deep: true
      }
    },
    computed: {
      ...mapState([
        'userinfo'
      ])
    }
  }
</script>

<style lang="less" scoped>
   @import '../../assets/styles/base.less';

  .signin-container {
    width: 100%;
    height: 100vh;
    padding-top: 1.8666rem;
    background:rgba(255,255,255,1);
  }

  .signin-logo {
    width: 4.7733rem;
    margin: 0 auto;

    img {
      width: 100%;
    }
  }

  .signin-form {
    width: 100%;
    background: @bg-white;
    padding: 0 1.2rem;
    margin-top: 1.6rem;
  }

  .form-group {
    display: flex;
    align-items: center;
    border-bottom: 0.0533rem solid @border-default;
    padding-left: 0.1333rem;
    margin-bottom: 0.2133rem;

    input {
      height: 100%;
      border: none;
      outline: none;
      font-size: 0.4266rem;
      color: @text-color-input;
      line-height: 0.4266rem;
      padding: 0.2133rem 0;
    }
  }

  .lg-input {
    width: 100%;
  }

  .tel-input {
    width: calc(~"100% - 1.2rem - 1.7333rem - 0.24rem");
    color: #28354C;
  }

  .area-code {
    width: 1.3rem;
    font-size: 0.4266rem;
    line-height: 0.4266rem;
    color: #28354C;
    margin-right: 0.24rem;
    white-space: nowrap;

    span {
      display: inline-block;
      border-right: 2px solid @border-default;
      padding-right: 0.2133rem;
      line-height: 0.32rem;
    }
  }

  .send-code {
    width: 1.7333rem;
    text-align: right;
    font-size: 0.32rem;
    line-height: 0.32rem;
    padding: 0.2133rem 0;
    color: #E49A2D;
  }

  .send-code-disabled {
    color: #a7a7a7;
  }

  .button-validate {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.3333rem;
    text-align: center;
    margin: 2.1066rem auto 0 auto;

    .button-orange();
  }

  .signin-tip {
    font-size: 0.2666rem;
    color: #C3C3C3;
    margin-top: 0.1866rem;
    line-height: 0.56rem;
    text-align: center;
  }

  .signin-agreement {
    font-size: 0.32rem;
    color: #929292;
    line-height: 0.56rem;
    text-align: center;

    span {
      color: #E49A2D;
    }
  }

  select.idcard{
    height:100%;
    color: #999;
    border: #999;
    outline: none;
    margin-right:0.2rem;
  }
</style>
