<template>
  <div>
    <div class="news-detail-title">
      <img src="../../../assets/images/title-bar@2x.png">
      <p>专家预约</p>
      <img src="../../../assets/images/title-bar@2x.png">
    </div>
    <p class="news-time">2018-09-09</p>
  </div>
</template>

<script>
  
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .news-detail-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.88rem;
    font-size: 0.5333rem;

    img {
      width: 0.32rem;
    }

    p {
      margin: 0 0.2666rem;
    }
  }

  .news-time {
    font-size: 0.3733rem;
    color: #9F9F9F;
    margin-top: 0.32rem;
    text-align: center;
  }
</style>