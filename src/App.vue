<template>
  <div class="yjb-container">
    <router-view/>
  </div>
</template>

<script>
import {
  getUserinfo
} from '@/api';
import {
  setLocalStorage
} from '@/assets/scripts/utils';

export default {
  name: 'App',
  mounted () {
    this.initUserinfo();
  },
  methods: {
    initUserinfo () {
      getUserinfo().then(data => {
        if (data.data.success == 'OK') {
          const userinfo = {
            idNumber: data.data.data.idNumber,
            name: data.data.data.name,
            phone: data.data.data.phone,
            idType: data.data.data.idType
          };
          setLocalStorage('uid', data.data.data.userId);
          this.$store.commit('updateUserinfo', {
            userinfo: userinfo
          });
        } else {

        }
      });
    },
  }
}
</script>

<style lang="less">
  @import './assets/styles/base.less';
  @import './assets/styles/date-picker-bottom.css';

  body, html {
    margin: 0;
    padding: 0;
    background: @bg-default;
    color: @text-color-default;
    font-family: PingFangSC-Regular, "Helvetica Neue", Helvetica, "Hiragino Sans GB", Arial, "Microsoft Yahei", "微软雅黑";
  }
  div, p, span, section, textarea, input, button, a {
    box-sizing: border-box;
  }
  p, ul {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: @text-color-default;
  }
  input, textarea {
    font-size: 0.3733rem;
  }
  input::-webkit-input-placeholder{
    color: #A7A7A7;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #A7A7A7;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #A7A7A7;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: #A7A7A7;
  }
  img {
    &:not(.diagnosis-img, .score-img, .file-delete) {
      pointer-events: none;
    }
  }

  /**
   * 公共样式
   */
  ul,li{
    list-style: none;
  }
  .fll{
    float:left;
  }

  .container-with-bar {
    padding-bottom: 1.5rem;
  }

  .bottom-bar {
    width: 100%;
    height: 1.34667rem;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    font-size: 0.48rem;
    border-top: 1px solid #EBECF1;
  }

  .no-scroll {
    overflow: hidden;
  }

  .arrow-none {
    opacity: 0;
  }

  .card {
    width: 100%;
    background: @bg-white;
    font-size: 0.3733rem;
    margin-top: 0.21333rem;
    border-top: 1px solid @border-default;
    border-bottom: 1px solid @border-default;
  }

  .card-no-margin {
    margin-top: 0;
  }

  .card-with-padding {
    width: 100%;
    background: @bg-white;
    font-size: 0.3733rem;
    margin-top: 0.21333rem;
    padding: 0 0.32rem;
    border-top: 1px solid @border-default;
    border-bottom: 1px solid @border-default;
  }

  .card-title {
    width: 100%;
    display: flex;
    padding: 0.4266rem 0 0.32rem 0;
    border-bottom: 1px solid @border-default;
  }

  .card-title-opt {
    color: #E49A2D;
    margin-left: auto;
  }

  .card-item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 1.3333rem;
    padding: 0 0.32rem;
    border-bottom: 1px solid @border-default;
    position: relative;

    input {
      width: calc(~"100% - 0.58rem - 2.666rem");
      text-align: right;
      margin-left: auto;
      height: 100%;
      padding: 0;
      border: none;
      outline: none;
    }
  }

  .card-item:last-child {
    border-bottom: 0;
  }

  .card-desc-item {
    width: 100%;
  }

  .card-piece {
    padding: 0.4rem 0.32rem;
    font-size: 0.3733rem;
    color: #9A9A9A;
  }

  .card-desc-label {
    padding: 0 0.32rem;
    margin-top: 0.48rem;
  }

  .card-item-label {
    width: 2.2666rem;
  }

  .card-default-value {
    width: calc(~"100% - 0.58rem - 2.666rem");
    text-align: right;
    margin-left: auto;
    color: @text-color-gray;
  }

  .card-item-value {
    width: calc(~"100% - 0.58rem - 2.666rem");
    text-align: right;
    margin-left: auto;
  }

  .icon-arrow-right {
    width: 0.2rem;
    height: 0.4rem;
    margin-left: auto;
  }

  .no-data {
    padding: 0.32rem;
  }
</style>
