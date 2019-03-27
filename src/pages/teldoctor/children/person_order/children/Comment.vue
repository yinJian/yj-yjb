<template>
  <div class="comment-wrap">
    <div class="order-list">
      <img src="../../../../../assets/images/default-doctor.png" class="doctor-img"/>
      <div class="doctor-info">
        <p> <span class="doctor-name">{{doctorInfo.doctorName}}医生</span> <span class="doctor-title">{{doctorInfo.doctorPost}}</span> {{doctorInfo.doctorMedicalSectionName}}</p>
        <p style="line-height: 0.7rem">{{doctorInfo.medicalInstitutionsName}}</p>
      </div>
    </div>
    <div class="doctor-comment top">
      <div class="doctor-comment-title">为医生评价</div>
      <div class="score-stars">
        <img class="score-img" :src="simg <= scorePeople ? starHL : star" v-for="(simg, sindex) in [1,2,3,4,5]" @click="scorePeople = (sindex+1)">
      </div>
      <div class="score-describe" @change="scoreDescrib">{{scoreDescribe}}</div>
      <div class="comment-word">
        <span v-for="item in commentLabel" :class="item.selected?'active':''" @click="item.selected = !item.selected">{{item.value}}</span>
      </div>
      <div class="card-detail">
        <textarea class="patient-desc" maxlength="200" placeholder="其他建议" v-model="commentText"></textarea>
      </div>
    </div>
    <div class="apply-submit" @click="submitComment" ref="commentBtn">提交</div>
  </div>
</template>

<script>
  import {doctorComment,doctorInfo} from '@/api'

  const star = require('../../../../../assets/images/star.png');
  const starHL = require('../../../../../assets/images/star-HL.png');
  const orderMainId = window.location.href.split("?")[1]
  export default {
    data (){
      return {
        star: star,
        starHL: starHL,
        scorePeople: 5,
        scoreDescribe: '非常满意，无可挑剔',
        commentLabel:[
            {
              value: '服务和蔼',
              selected: false
            },
            {
              value: '解答清晰',
              selected: false
            },
            {
              value: '医术精湛',
              selected: false
            },
            {
              value: '知识丰富',
              selected: false
            },
            {
              value: '受益非浅',
              selected: false
            }
          ],
        commentText: '',
        doctorInfo: {
          doctorName: '',
          doctorPost: '',
          doctorMedicalSectionName: '',
          medicalInstitutionsName: ''
        }
      }
    },
    methods: {
      submitComment(){
        doctorComment(orderMainId,this.scorePeople,this.commentText,this.getCommentLabel()).then(data =>{
          if(data.data.code == '200'){
            this.$router.push('/teldoctor/person')
            this.$refs.commentBtn.style.display = 'none'
          }
        })
      },
      scoreDescrib(){
        switch(this.scorePeople)
        {
          case 1:
            this.scoreDescribe = '非常不满意，各方面都很差';
            break;
          case 2:
            this.scoreDescribe = '不满意，比较差';
            break;
          case 3:
            this.scoreDescribe = '一般，还需改善';
            break;
          case 4:
            this.scoreDescribe = '比较满意，仍可改善';
            break;
          case 5:
            this.scoreDescribe = '非常满意，无可挑剔';
            break;
          default:
            this.scoreDescribe = '非常满意，无可挑剔';
        }
      },
      getCommentLabel(){
        var commentLabelt = [];
        this.commentLabel.forEach(function (label) {
          if(label.selected){
            commentLabelt.push(label.value)
          }
        })
        return commentLabelt.join('#')
      }
    },
    mounted(){
      document.title = '评价'
      doctorInfo(orderMainId).then(data =>{
        console.log(data.data.data)
        if(data.data.code == '200'){
          this.doctorInfo = data.data.data
        }
      })
    },
    updated(){
      this.scoreDescrib()
      console.log(this.getCommentLabel())
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../../assets/styles/base.less';

  .comment-wrap{
    background: @bg-white;
    height: 100vh;
  }
  .order-list{
    height: 180px;
    padding: 40px;
    overflow: hidden;
    border-bottom: 1px solid #E1E1E1;
  }
  .doctor-img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    float: left;
  }
  .doctor-info{
    float: left;
    font-size: 24px;
    margin: 10px 0 0 20px;
    color: #999999;
    line-height: 40px;
  }
  .doctor-name{
    font-size: 32px;
    color: #333333;
    font-weight: bold;
  }
  .doctor-title{
    color: #333333;
  }
  .apply-submit {
    width: 80%;
    height: 88px;
    line-height: 88px;
    color: @text-color-white;
    display: block;
    font-size: 32px;
    text-align: center;
    background: #F39800;
    box-shadow: 0 6px 14px 0 rgba(255,153,62,0.40);
    border-radius: 60px;
    margin: 60px auto;
  }
  .doctor-comment-title{
    font-size: 24px;
    text-align: center;
    margin-top: 40px;
    color: #999999;
  }
  .score-stars {
    width: 382px;
    margin: 40px auto;
    display: flex;
    justify-content: space-between;

    img {
      width: 44px;
      height: 40px;
      margin-right: 40px;
    }
  }
  .score-describe{
    text-align: center;
    font-size: 28px;
    color: #F39700;
    line-height: 28px;
    margin-bottom: 40px;
  }
  .comment-word{
    padding:0.2rem 0.8rem;
    color: #999;
    span{
      width: 300px;
      height: 70px;
      display: inline-block;
      text-align: center;
      line-height: 70px;
      font-size: 24px;
      color: #999999;
      background: #FFFFFF;
      border: 2px solid #E1E1E1;
      margin: 0 20px 20px 0;
    }
    span:nth-child(2n+2){
      margin-right: 0;
    }
    span.active{
      color: #F39700;
      background: rgba(243,152,0,0.10);
      border: 2px solid #F39800;
    }
  }

  .patient-desc {
    margin-left: 5%;
    width: 90%;
    height: 180px;
    padding: 40px;
    font-size: 28px;
    color: #333333;
    border: 1px solid #C8C8C8;
    border-radius: 5px;

    textarea::-webkit-input-placeholder{
      color: #C8C8C8;
    }
  }
</style>
