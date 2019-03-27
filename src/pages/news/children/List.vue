<template>
  <div>
    <div class="news-list">
      <router-link to="detail" class="news-item">
        <img src="../../../assets/images/hospital-call@2x.png" class="news-cover">
        <div class="news-info">
          <p class="news-title">名医简介</p>
          <p class="news-time">2018-09-09</p>
          <div class="news-desc">黄医生，北京协和医院麻醉学 教授，男，1960年7月…</div>
        </div>
      </router-link>
      <router-link to="detail" class="news-item">
        <img src="../../../assets/images/hospital-call@2x.png" class="news-cover">
        <div class="news-info">
          <p class="news-title">名医简介</p>
          <p class="news-time">2018-09-09</p>
          <div class="news-desc">黄医生，北京协和医院麻醉学 教授，男，1960年7月…</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .news-item {
    padding: 0.48rem 0.32rem;
    border-bottom: 1px solid @border-default;
    display: flex;
    background: @bg-white;
  }

  .news-cover {
    width: 3.44rem;
    height: 2.56rem;
  }

  .news-info {
    width: calc(~"100% - 3.44rem - 0.32rem");
    margin-left: auto;
  }

  .news-title {
    font-size: 0.4266rem;
  }

  .news-time {
    color: #9F9F9F;
    font-size: 0.3733rem;
    margin-top: 0.16rem;
  }

  .news-desc {
    font-size: 0.4266rem;
    color: #9C9C9C;
    line-height: 0.64rem;
  }
</style>