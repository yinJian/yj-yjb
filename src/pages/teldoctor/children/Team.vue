<template>
  <div class="doctor-team">
    <div class="card-tabs">
      <div 
        class="card-tab" 
        :class="{'card-tab-active':num == index}" 
        v-for="(tab, index) in typeList" 
        :key="tab.name" 
        @click="orderTabHandler(index)">
        <span>{{ tab.name }}</span>
      </div>
    </div>
    <div v-if="num == index"  v-for="(i,index) in typeList" :key="index">
      <div class="card" v-for="(item) in i.data" :key="item.doctorId">
        <div class="card-item" @click="viewDetail(item.doctorId)">
          <div class="doctor-img">
            <img :src="item.doctorHeadPictureURL ? item.doctorHeadPictureURL : defautDoctor"/>
          </div>
          <div class="doctor-info">
            <p><span class="doctor-name">{{item.doctorName}}</span> &nbsp;&nbsp;<span class="doctor-title">{{item.doctorPost}}</span></p>
            <p>{{item.medicalInstitutionsName}} {{item.doctorMedicalSectionName}} <span class="hospital-level">{{item.hospitalLevelCode}}</span></p>
            <div class="comment-word">
              <span v-for="it in splitStr(item.doctorTags)">{{it}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {doctorTeam} from '@/api'
  const defautDoctor = require('@/assets/images/default-doctor.png');
    export default {  
      data(){
        return{
          num: 0,
          typeList:[],
          defautDoctor: defautDoctor
        }
      },
      methods:{
        orderTabHandler(index){
          this.num = index
        },
        viewDetail(doctorId){
          this.$router.push('team-detail?' + doctorId)
        },
        splitStr(str){
          const arr = []
          const newStr = (str || '').split('#')
          newStr.map(function (val) {
            if (val !== "" && val != undefined) {
              arr.push(val);
            }
          })
          return arr
        }
      },
      mounted(){
        document.title = '医生团队'
        doctorTeam().then(data =>{
          if(data.data.code == '200'){
            const list = data.data
            this.typeList.push({name : '推荐', data : list.recommendDoctoList})
            this.typeList.push({name : "儿科", data : list.childrenDoctoList})
            this.typeList.push({name : '全科', data : list.allDoctoList})
            this.typeList.push({name : '营养科', data : list.nutritionDoctoList})
          }
        })
      }
    }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .doctor-team{
    background: @bg-white;
    min-height: 100vh;
    overflow: hidden;
  }
  .card-tabs {
    width: 100%;
    height: 88px;
    line-height: 85px;
    display: flex;
    align-items: center;
    font-size: 32px;
    font-weight: bold;
    color: #333333;
    background: @bg-white;
    margin-top:0;
    margin-bottom: 10px;
    box-shadow: 0 4px 10px 0 rgba(78,0,0,0.08);
  }

  .card-tab {
    width: 33.33%;
    text-align: center;
    span {
      display: inline-block;
    }
  }

  .card-tab-active {
    color:#F39700;
    border-bottom: 4px solid #F39800;
  }
  .card{
    padding: 40px;
    border-top: 0;
    margin-top: 0;
    border-bottom: 1px solid #E1E1E1;
  }
  .card-item{
    height:auto;
    width: 670px;
    border-bottom: 0;
    padding: 0;
  }
  .doctor-img{
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .doctor-info{
    text-align: left;
    line-height: 40px;
    margin-left: 20px;
    color: #999999;
    font-size: 24px;
    .doctor-name{
      font-size: 32px;
      color: #333333;
      font-weight: bold;
    }
    .doctor-title{
      font-size: 24px;
      color: #333333;
    }
    .hospital-level{
      font-size: 20px;
      line-height: 24px;
      color: #2C5CE1;
      background: #E2F5FF;
      border: 1px solid #83BBFF;
      border-radius: 5px;
      padding: 2px 4px;
      margin-left: 8px;
    }
  }
  .comment-word{
    color: #999999;
    font-size: 18px;
    span{
      padding: 4px 8px;
      margin-right: 8px;
      background: #F1F1F1;
      border-radius: 100px;
      line-height: 20px;
    }
  }

</style>
