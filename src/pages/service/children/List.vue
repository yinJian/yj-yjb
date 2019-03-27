<template>
  <div>
    <div class="service-list">
      <div class="service-item" v-for="(item, index) in itemsInfo" :key="index">
        <div class="service-content">
          <img :src="srcJoint(item.img)">
          <div class="service-info">
            <p class="service-title">{{item.title}}</p>
            <p class="service-tip">{{item.describe}}</p>
          </div>
        </div>
        <router-link :to="'introduction/'+item.id" class="service-apply">{{item.applyClick}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getServices,
    initJssdk
  } from '@/api'
  export default {
    data () {
      return {
        itemsInfo:[
          { 
            id: 1,
            img : 'zhongji@2x',
            title: '疾病绿色通道',
            describe: '顶级三甲医院专家门诊，一键获得一站式就医服务与保障。',
            applyClick: '快速就医',
          },
          { 
            id: 2,
            img : 'yajindianfu@2x',
            title: '住院押金垫付',
            describe: '住院不筹款，代付医疗费。',
            applyClick: '申请垫付',
          },
          { 
            id: 3,
            img : 'eczhenliao@2x',
            title: '二次诊疗',
            describe: '重大疾病不用怕，顶级专家提供优化治疗方案。',
            applyClick: '预约专家',
          },
          { 
            id: 4,
            img : 'tjyuyue@2x',
            title: '健康体检',
            describe: '美年大健康、爱康国宾、慈铭体检、瑞慈体检、东软熙康全国5大专业体检机构在线体检预约。',
            applyClick: '预约体检',
          },
        ]
      }
    },
    mounted () {

    },
    methods: {
      srcJoint(val){
        return require("@/assets/images/" + val + '.png')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .service-list {
    padding: 0 0.32rem;
  }

  .service-item {
    width: 100%;
    margin-top: 0.32rem;
    background: @bg-white;
    border: 1px solid #EEEEEE;

    .border-radius(0.1333rem);
    .box-shadow(0px, 2px, 6px, 0px, rgba(238,238,238,1));
  }

  .service-content {
    width: 100%;
    height: 3.8666rem;
    padding: 0.7466rem 0.3466rem 0.6666rem 0.5866rem;
    display: flex;
    align-items: center;

    img {
      width: 2.4533rem;
      height: 2.4533rem;
    }
  }

  .service-info {
    width: 5.44rem;
    margin-left: auto;
  }

  .service-title {
    font-size: 0.4266rem;
    font-weight: 600;
    color: @text-color-black;
  }

  .service-tip {
    font-size: 0.32rem;
    line-height: 0.5066rem;
    color: #747474;
    margin-top: 0.16rem;
  }

  .service-apply {
    width: 100%;
    height: 1.0666rem;
    background: #E49A2D;
    color: @text-color-white;
    display: block;
    font-size: 0.4266rem;
    text-align: center;
    line-height: 1rem;
    border-bottom-left-radius: 0.1333rem;
    border-bottom-right-radius: 0.1333rem;
  }
</style>
