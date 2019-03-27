<template>
  <div class="myPolicy">
    <div class="card" v-for="(item,index) in myPolicys" :key="index">
      <div class="policy" @click="applyHandle(item.classificationType,item.followProductId)">
        <p><span>保单号：</span>{{item.policyNumber}}</p>
        <p><span>保险机构：</span>{{item.insuranceName}}</p>
        <p><span>保险产品：</span>{{item.productName}}</p>
        <p><span>服务类型：</span>{{ item.classificationType | typeFilter}}</p>
        <p><span>服务次数：</span>{{item.serviceNumber}} &nbsp;&nbsp;&nbsp;&nbsp; <span>使用次数：</span>{{item.userNumber}} &nbsp;&nbsp;&nbsp; <span>剩余次数：</span>{{item.raiseNumber}}</p>
        <div class="order-more">
          <div class="order-detail-link">立即申请</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {viewPolicy} from '@/api'
  const ID_MAPS = [
    {
      name: '重疾绿通',
      id: '0000'
    },
    {
      name: '押金垫付',
      id: '0005'
    },
    {
      name: '二次诊疗',
      id: '0004'
    },
    {
      name: '预约体检',
      id: '0007'
    }
  ];
    export default {
      data (){
        return {
          serviceType: 0,
          myPolicys: [],
        }
      },
      methods: {
        applyHandle(serviceId,followProductId){
          this.$router.push(`/service/apply/${this.serviceType}/`+ serviceId + `/` + followProductId)
        }
      },
      filters:{
        typeFilter(type){
          switch(type)
          {
            case '0001':
              return '预约门诊';
            case '0002':
              return '预约手术';
            case '0003':
              return '预约住院';
            case '0005':
              return '押金垫付';
            case '0004':
              return '二次诊疗';
          }
        }
      },
      mounted(){
        this.serviceType = this.$route.params.type;
        const id = ID_MAPS[this.serviceType - 1].id;
        viewPolicy(id).then(data =>{
          if(data.data.code == '200'){
            this.myPolicys = data.data.data
            console.log(data.data.data)
          }
        })
      }
    }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';
  .policy{
    padding: 0.4rem;
    line-height:0.6rem;
    span{
      color: @text-color-gray;
    }
  }
  .order-more {
    width: 100%;
    height: 1.3333rem;
    padding: 0 0.32rem;
    margin-top: 0.4rem;
    border-top: 1px solid @border-default;
  }
  .order-detail-link {
    //width: 2.16rem;
    padding:0 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border: 1px solid #E49A2D;
    color: #E49A2D;
    border-radius: 0.3rem;
    text-align: center;
    margin-left: 0.5rem;
    margin-top:0.25rem;
    float: right;
  }
</style>
