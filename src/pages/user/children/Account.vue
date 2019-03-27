<template>
  <div>
    <div class="card">
      <div class="user-info">
        <img :src="avatar ? avatar : avatarDefault">
        <div>{{ oldName ? oldName : '暂无用户' }}</div>
      </div>
    </div>
    <div class="card">
      <router-link to="/order" class="card-item">
        <div class="card-label">我的订单</div>
        <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
      </router-link>
    </div>
    <div class="card">
      <router-link to="changephone" class="card-item">
        <div class="card-label">修改手机号</div>
        <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
      </router-link>
      <router-link to="verify" class="card-item">
        <div class="card-label">认证身份</div>
        <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
      </router-link>
    </div>
    <div class="card">
      <div class="card-item" @click="serviceLink">
        <div class="card-label">联系客服</div>
        <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getUserinfo,
    bindUser,
    unBindWechat
  } from '@/api';
  import {
    mapState
  } from 'vuex';
  import {
    getLocalStorage,
    setLocalStorage
  } from '@/assets/scripts/utils';
  const avatarDefault = require('@/assets/images/avatar-default.jpg');

  export default {
    data () {
      return {
        oldNumber: '',
        oldName: '',
        avatar: '',
        avatarDefault: avatarDefault,
        oldPhone: ''
      }
    },
    mounted () {
      document.title = '个人中心';
      this.avatar = getLocalStorage('avatar') ? getLocalStorage('avatar').substring(1, getLocalStorage('avatar').length - 1) : '';
      this.getUserinfo();
      this.initUserinfo(false);
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
      getUserinfo () {
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
            this.$router.push('/signin?redirect='+encodeURIComponent(this.$route.path));
          }
        });
      },
      serviceLink () {
        window.location.href = 'http://a1.7x24cc.com/phone_webChat.html?accountId=N000000011451&chatId=yjjb-a4cc2e60-ae54-11e7-a274-af708c4babc4';
      },
    },
    watch: {
      userinfo: {
        handler (newValue) {
          this.initUserinfo(true);
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

  .user-info {
    padding: 0.3733rem 0.32rem;
    display: flex;
    align-items: center;
    font-size: 0.3733rem;

    img {
      width: 1.7066rem;
      height: 1.7066rem;
      margin-right: 0.5333rem;

      .border-radius(50%);
    }
  }

  .button-logout {
    width: 8.4rem;
    height: 1.2rem;
    margin: 0.8266rem auto 0 auto;

    .button-orange();
  }
</style>