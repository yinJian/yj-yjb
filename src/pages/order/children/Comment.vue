<template>
  <div class="container-with-bar">
    <div class="comment-title">你好，评价一下我们的服务吧</div>
    <div class="comment-list">
      <div class="comment-item">
        <div class="service-score">
          <span>优加服务满意度</span>
          <div class="score-stars">
            <img class="score-img" :src="simg <= scoreService ? starHL : star" v-for="(simg, sindex) in [1,2,3,4,5]" @click="scoreService = (sindex+1)">
          </div>
        </div>
        <div class="comment-textarea-wrapper">
          <textarea placeholder="" v-model="serviceComment"></textarea>
        </div>
      </div>
      <div class="comment-item">
        <div class="service-score">
          <div class="service-people">
            <img src="../../../assets/images/eczhenliao@2x.png" class="service-people-avatar">
            <div class="service-people-info">
              <p>医学顾问</p>
              <p>{{ sName }}</p>
            </div>
          </div>
          <div class="score-stars">
            <img class="score-img" :src="simg <= scorePeople ? starHL : star" v-for="(simg, sindex) in [1,2,3,4,5]" @click="scorePeople = (sindex+1)">
          </div>
        </div>
        <div class="comment-textarea-wrapper">
          <textarea placeholder="" v-model="peopleComment"></textarea>
        </div>
      </div>
      <div class="comment-item">
        <div class="service-score">
          <span>医院服务满意度</span>
          <div class="score-stars">
            <img class="score-img" :src="simg <= scoreResult ? starHL : star" v-for="(simg, sindex) in [1,2,3,4,5]" @click="scoreResult = (sindex+1)">
          </div>
        </div>
        <div class="comment-textarea-wrapper">
          <textarea placeholder="" v-model="hosComment"></textarea>
        </div>
      </div>
      <div class="bottom-bar">
        <div class="comment-submit" @click="commentHandler">提交评论</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    comment,
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
        scoreService: 5,
        scorePeople: 5,
        scoreResult: 5,
        serviceComment: '',
        hosComment: '',
        peopleComment: '',
        hosName: '',
        sName: ''
      }
    },
    mounted () {
      document.title = '填写评论';
      this.orderMainId = this.$route.params.id;
      this.initCommentInfo();
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
      commentHandler () {
        let {
          orderMainId,
          scoreService,
          scorePeople,
          scoreResult,
          serviceComment,
          hosComment,
          peopleComment
        } = this;
        if (serviceComment.length > 200) {
          this.$yjToast('服务评价内容最多200字！');
          return;
        }
        if (hosComment.length > 200) {
          this.$yjToast('医院评价内容最多200字！');
          return;
        }
        if (peopleComment.length > 200) {
          this.$yjToast('顾问评价内容最多200字！');
          return;
        }
        if (!serviceComment) {
          serviceComment = '非常满意！';
        }
        if (!hosComment) {
          hosComment = '非常满意！';
        }
        if (!peopleComment) {
          peopleComment = '非常满意！';
        }
        comment(orderMainId, scoreService, serviceComment, scoreResult, hosComment, scorePeople, peopleComment).then(data => {
          if (data.data.success == 'OK') {
            this.$yjToast('评价成功！');
            setTimeout(() => {
              this.$router.go(-1);
            }, 1500);
          } else {
            this.$yjToast(data.data.message);
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
      font-size: 0.3733rem;
      color: #C0C0C0;
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
    height: 4.2133rem;
    background: #F7F7F7;
    border-radius: 0.1333rem;
    position: relative;
    margin-top: 0.4266rem;

    textarea {
      width: 100%;
      height: 3rem;
      outline: none;
      border: none;
      background: #F7F7F7;
      padding: 0.32rem;
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