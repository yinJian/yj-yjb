<template>
  <div>
    <template v-if="edit">
      <div class="card">
        <div class="card-item">
          <div class="card-item-label">申请人姓名</div>
          <input type="" name="" v-model="username" placeholder="必填">
        </div>
        <div class="card-item">
          <div class="card-item-label">身份证号</div>
          <input type="" name="" v-model="idNumber" placeholder="必填">
        </div>
        <div class="card-item">
          <div class="card-item-label">新手机号</div>
          <input type="" v-model="phone" name="" class="phone-input">
          <div class="send-code" @click="sendCodeHandler" v-if="!sended">获取验证码</div>
          <div class="send-code send-code-disabled" v-if="sended">{{ time }}秒后重发</div>
        </div>
        <div class="card-item">
          <div class="card-item-label">验证码</div>
          <input type="" name="" v-model="code" placeholder="必填">
        </div>
      </div>
      <div class="bottom-bar">
        <div class="apply-submit" @click="verifyHandler">保存</div>
      </div>
    </template>
    <template v-else>
      <div class="card">
        <div class="card-item">
          <div class="card-item-label">申请人姓名</div>
          <div class="card-default-value">{{ oldName }}</div>
        </div>
        <div class="card-item">
          <div class="card-item-label">身份证号</div>
          <div class="card-default-value">{{ oldNumber }}</div>
        </div>
      </div>
      <div class="bottom-bar">
        <div class="apply-submit" @click="editHandler">修改身份信息</div>
      </div>
    </template>
  </div>
</template>

<script>
  import {
    getUserinfo,
    codeCheck,
    sendCode,
    bindUser,
    unBindWechat
  } from '@/api';
  import {
    mapState
  } from 'vuex';
  import {
  setLocalStorage,
  removeLocalStorage
} from '@/assets/scripts/utils';
  var timer = null;

  export default {
    data () {
      return {
        edit: false,
        sended: false,
        time: 60,
        phone: '',
        code: '',
        idNumber: '',
        username: '',
        oldNumber: '',
        oldName: '',
        avatar: '',
        oldPhone: ''
      }
    },
    mounted () {
      document.title = '验证身份';
      this.initUserinfo(true);
    },
    methods: {
      initUserinfo (isJump) {
        if (this.userinfo) {
          this.oldPhone = this.userinfo.phone;
          this.oldName = this.userinfo.name;
          this.oldNumber = this.userinfo.idNumber;
        } else {
          if (isJump) {
            this.$router.push('/signin?redirect='+encodeURIComponent(this.$route.path));
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
      editHandler () {
        unBindWechat().then(data => {
          if (data.data.success = 'OK') {
            this.edit = true;
            removeLocalStorage('uid');
            this.$store.commit('updateUserinfo', {
              userinfo: null
            });
          }
        });
      },
      verifyHandler () {
        const {
          username,
          code,
          phone,
          idNumber
        } = this;
        if (!username) {
          this.$yjToast('用户名不能为空！');
          return;
        }
        if (!idNumber) {
          this.$yjToast('身份证不能为空！');
          return;
        }
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
            bindUser(idNumber, username, phone).then(data => {
              if (data.data.success == 'OK') {
                this.$yjToast('修改信息成功！');
                getUserinfo().then(data => {
                  if (data.data.success == 'OK') {
                    const userinfo = {
                      idNumber: data.data.data.idNumber,
                      name: data.data.data.name,
                      phone: data.data.data.phone
                    };
                    setLocalStorage('uid', data.data.data.userId);
                    this.$store.commit('updateUserinfo', {
                      userinfo: userinfo
                    });
                  } else {

                  }
                });
              } else {
                this.$yjToast(data.data.message)
              }
            })
          }
        });
      }
    },
    watch: {
      userinfo: {
        handler (newValue) {
          this.initUserinfo(false);
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
