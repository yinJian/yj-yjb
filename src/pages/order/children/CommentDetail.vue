<template>
  <div>
    <div class="comment-list">
      <div class="comment-item">
        <div class="service-score">
          <span>优加服务满意度</span>
          <div class="score-stars">
            <img :src="simg <= scoreService ? starHL : star" v-for="(simg, sindex) in [1,2,3,4,5]">
          </div>
        </div>
        <div class="comment-textarea-wrapper">
          <textarea placeholder="您对优加提供的服务还满意吗？" disabled="disabled" v-model="serviceComment"></textarea>
          <!-- <div class="text-count">0/200</div> -->
        </div>
      </div>
      <div class="comment-item">
        <div class="service-score">
          <div class="service-people">
            <img src="../../../assets/images/eczhenliao@2x.png" class="service-people-avatar">
            <div class="service-people-info">
              <p>{{ sName }}</p>
              <p>医学顾问</p>
            </div>
          </div>
          <div class="score-stars">
            <img :src="simg <= scorePeople ? starHL : star" v-for="(simg, sindex) in [1,2,3,4,5]">
          </div>
        </div>
        <div class="comment-textarea-wrapper">
          <textarea placeholder="您对优加提供的服务还满意吗？" disabled="disabled" v-model="peopleComment"></textarea>
        </div>
      </div>
      <div class="comment-item">
        <div class="service-score">
          <span>医院服务满意度</span>
          <div class="score-stars">
            <img :src="simg <= scoreResult ? starHL : star" v-for="(simg, sindex) in [1,2,3,4,5]">
          </div>
        </div>
        <div class="comment-textarea-wrapper">
          <textarea placeholder="您对优加提供的服务还满意吗？" disabled="disabled" v-model="hosComment"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    commentDetail,
    initCommentInfo
  } from '@/api';
  const star = require('../../../assets/images/star.png');
  const starHL = require('../../../assets/images/star-HL.png');

  export default {
    data () {
      return {
        star: star,
        starHL: starHL,
        orderMainId: '',
        scoreService: 0,
        scorePeople: 0,
        scoreResult: 0,
        serviceComment: '',
        hosComment: '',
        peopleComment: '',
        hosName: '',
        sName: '',
        commentDetail: {

        }
      }
    },
    mounted () {
      document.title = '评论';
      this.orderMainId = this.$route.params.id;
      this.initCommentInfo();
      this.initComment();
    },
    methods: {
      initCommentInfo () {
        initCommentInfo(this.orderMainId).then(data => {
          console.log(data)
          if (data.data.success == 'OK') {
            this.hosName = data.data.data.hosName;
            this.sName = data.data.data.name;
          } else {
            this.$yjToast('获取顾问信息失败！');
          }
        });
      },
      initComment () {
        commentDetail(this.orderMainId).then(data => {
          if (data.data.success == 'OK') {
            this.scoreService = data.data.data.serviceEvaluate;
            this.serviceComment = data.data.data.serviceEvaluateContext;
            this.scoreResult = data.data.data.hospitalEvaluate;
            this.hosComment = data.data.data.hospitalEvaluateContext;
            this.scorePeople = data.data.data.serviceSecurity;
            this.peopleComment = data.data.data.serviceEmpathy;
          } else {
            this.$yjToast('获取评论失败！');
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .comment-title {
    padding: 0.4rem 0.32rem;
    color: #E49A2D;
  }

  .comment-item {
    padding: 0.4266rem 0.32rem;
    background: @bg-white;
    font-size: 0.4266rem;
    border-bottom: 1px solid @border-default;
  }

  .service-people {
    display: flex;
    align-items: center;
  }

  .service-people-avatar {
    width: 1.28rem;
    height: 1.28rem;
    margin-right: 0.32rem;
  }

  .service-people-info {
    p:first-child {
      font-weight: bold;
    }

    p:last-child {
      font-weight: bold;
    }
  }

  .service-score {
    display: flex;
    align-items: center;

    span {
      font-weight: bold;
    }
  }

  .score-stars {
    width: 2.9333rem;
    margin-left: auto;
    display: flex;
    justify-content: space-between;

    img {
      width: 0.48rem;
      height: 0.48rem;
      margin-left: 0.08;
    }
  }

  .comment-textarea-wrapper {
    width: 100%;
    border-radius: 0.1333rem;
    position: relative;
    margin-top: 0.4266rem;

    textarea {
      width: 100%;
      outline: none;
      border: none;
      padding: 0.32rem 0;
      background: @bg-white;
    }
  }

  .text-count {
    position: absolute;
    right: 0.32rem;
    bottom: 0.32rem;
    color: #C0C0C0;
  }

  .comment-submit {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.3rem;
    text-align: center;
    background: @bg-orange;
    color: @text-color-white;
  }
</style>