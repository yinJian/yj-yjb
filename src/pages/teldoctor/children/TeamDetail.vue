<template>
  <div class="doctor-team-detail">
    <div class="doctor-team-bg">
      <!-- 医生内容 -->
      <div class="doctor-content">
        <img :src="doctorDetail.doctorHeadPictureURL ? doctorDetail.doctorHeadPictureURL : defautDoctor" class="doctor-img"/>
        <div class="doctor-intro">
          <div>
            <span class="doctor-name">{{doctorDetail.doctorName}}医生</span> &nbsp;&nbsp;
            <span class="doctor-title">{{doctorDetail.doctorPost?doctorDetail.doctorPost:'医生'}}</span>
          </div>
          <div class="comment-word"><span v-for="it in splitStr(doctorDetail.doctorTags)">{{it}}</span></div>
          <div class="hospital">
            <span>{{doctorDetail.medicalInstitutionsName}}</span>
            <span>{{doctorDetail.doctorMedicalSectionName}}</span>
            <span class="hospital-level">{{doctorDetail.hospitalLevelCode}}</span>
          </div>
          <ul class="evaluation">
            <li>
              <p class="evaluation-number">{{doctorDetail.consultCount}}</p>
              <p>咨询次数</p>
            </li>
            <li>
              <p class="evaluation-number">{{doctorDetail.clinicalCount}}</p>
              <p>临床经验</p>
            </li>
            <li>
              <p class="evaluation-number">{{doctorDetail.evaluationRate}}</p>
              <p>好评率</p>
            </li>
          </ul>
        </div>
      </div>
      <!--医生介绍-->
      <!-- <div class="introduce">
        2010年7月医学硕士毕业，自2010年7月毕业后就职于三家医院：北京军区总医院、附属八一儿童医院sdfesfsdf...
      </div> -->
    </div>
    <hr/>
    <!-- 评价 -->
    <!-- <div class="doctor_evaluation white">
      <div class="eva_title">
        <b>患者评价</b>
        <span>（223）</span>
        <router-link class="flr" to="evaluation"><span>查看全部</span> <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right"></router-link>
      </div>
      <evaluation-detail type='child'></evaluation-detail>
    </div> -->
  </div>
</template>

<script>
  import {doctorTeamDetail} from '@/api'
  import evaluationDetail from '@/components/doctor/evaluation.vue'
  const defautDoctor = require('@/assets/images/default-doctor.png')
    export default {
      components: {
        evaluationDetail
      },
      data(){
        return {
          doctorDetail: { },
          defautDoctor: defautDoctor
        }
      },
      methods: {
        splitStr(str){
          const arr = []
          const newStr = (str || "").split('#')
          newStr.map(function (val) {
            if (val !== "" && val != undefined) {
              arr.push(val);
            }
          })
          return arr
        }
      },
      mounted (){
        document.title = '医生详情'
        const doctorId = window.location.href.split('?')[1]
        doctorTeamDetail(doctorId).then(data=>{
          this.doctorDetail = data.data.data
        })
      }
    }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';
  ul,li{
    list-style: none;
  }
  .doctor-team-detail{
    min-height: 100vh;
    background: @bg-white;
  }
  .doctor-team-bg{
    background: url("../../../assets/images/doctor-detail-bg.png") no-repeat;
    background-size: contain;
    height: 8.2rem;
    width: 100vw;
    z-index: 1;
    position: relative;
  }
  .doctor-content{
    width: 690px;
    height: 376px;
    margin: 0 auto;
    background: @bg-white;
    box-shadow: 0 4px 10px 0 rgba(78,0,0,0.08);
    border-radius: 5px;
    position: relative;
    z-index: 2;
    top: 100px;
  }
  .doctor-img{
    position: absolute;
    top:-40px;
    left: 50%;
    transform: translate(-50%,0);
    width: 100px;
    border-radius: 50%;
  }
  .doctor-intro{
    width: 90%;
    text-align: center;
    margin: 0 auto;
    padding-top: 80px;
    color: #999999;
  }
  .doctor-name{
    font-size: 32px;
    color: #333333;
    line-height: 32px;
    font-weight: bold;
  }
  .doctor-title{
    font-size: 24px;
    color: #333333;
    line-height: 24px;
  }

  .comment-word{
    color: #999;
    font-size: 18px;
    span{
      background: #F1F1F1;
      border-radius: 98px;
      padding: 4px 8px;
      margin-right: 10px;
      color: #999999;
      line-height: 66px;
    }
  }

  .hospital{
    font-size: 24px;
    color: #999999;
    height: 40px;
    line-height: 40px;
  }
  .hospital-level{
    font-size: 20px;
    color: #2C5CE1;
    line-height: 20px;
    background: #E2F5FF;
    padding: 4px 8px;
    margin-left: 6px;
    border: 1px solid #83BBFF;
    border-radius: 5px;
  }

  ul.evaluation{
    margin-top: 50px;
    font-size: 28px;
    color: #333333;
    line-height: 28px;


    li{
      float: left;
      width: 30%;
    }
  }
  .evaluation-number{
    font-weight: bold;
    font-size: 32px;
    color: #F39700;
    line-height: 32px;
    margin-bottom: 14px;
  }
  .introduce{
    font-size: 28px;
    color: #333333;
    line-height: 40px;
    width: 670px;
    margin: 1.7rem auto 0;
    text-indent: 0.8rem;
  }
  hr {
    margin:40px 0;
  }

  /* 评价内容 */
  .doctor_evaluation {
    position: absolute;
    width: 100%;
    .eva_title {
      line-height: 32px;
      margin: 0 38px;
      margin-bottom: 35px;
      b {
        font-size: 32px;
        color: #333;
      }
      span {
        font-size: 28px;
        color: #666666;
        line-height: 32px;
      }
      a {
        span {
          color: #999999;
          position: relative;
          top:-3px;
        }
      }
    }
  }
</style>
