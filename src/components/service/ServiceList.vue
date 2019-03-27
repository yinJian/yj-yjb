<template>
  <div class="hospitalization">
    <div class="hospitalization-cover"></div>
    <div class="hospitalization-wrapper">
      <div class="hospitalization-bar">
        <div class="hospitalization-cancel" @click="cancelHandler">取消</div>
        <div class="hospitalization-title">住院信息确认</div>
        <div class="hospitalization-confirm" @click="confirmHandler">确认</div>
      </div>
      <div class="hospitalization-list">
        <div class="hospitalization-item" :class="hospitalization.selected ? 'hospitalization-item-active' : ''" v-for="hospitalization in hospitalizationList" @click="hosItemHandler(hospitalization)">{{ hospitalization.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { SERVICE_MAP } from '@/assets/scripts/utils';
  import {
    checkService
  } from '@/api';

  export default {
    data () {
      return {
        choosedServiceId: '',
        choosedServiceName: '',
        hospitalizationList: [
          {
            name: '门诊预约',
            id: '0001',
            selected: false
          },
          {
            name: '住院安排',
            id: '0003',
            selected: false
          },
          {
            name: '手术安排',
            id: '0002',
            selected: false
          }
        ]
      }
    },
    methods: {
      cancelHandler () {
        this.$emit('serviceChooseCancel');
      },
      hosItemHandler (hospitalizationCur) {
        this.hospitalizationList.forEach(hospitalization => {
          hospitalization.selected = false;
        });
        hospitalizationCur.selected = true;
        this.choosedServiceId = hospitalizationCur.id;
        this.choosedServiceName = hospitalizationCur.name;
      },
      confirmHandler () {
        this.$emit('serviceChooseConfirm', {
          id: this.choosedServiceId,
          name: this.choosedServiceName
        });
      }
    },
    mounted(){
      for(var i=0; i<this.hospitalizationList.length; i++){
        const hospitalId = this.hospitalizationList[i].id
        const hospitalname = this.hospitalizationList[i].name
        checkService(hospitalId, hospitalname).then(data => {
          if (data.data.success != 'OK') {
            this.hospitalizationList.splice(i,1)
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/base.less';

  .hospitalization-cover {
    width: 100%;
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #000000;
    opacity: 0.3;
    z-index: 998;
  }

  .hospitalization-wrapper {
    width: 100%;
    height: 5.3333rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: @bg-white;
    z-index: 999;
    font-size: 0.3733rem;
  }

  .hospitalization-bar {
    width: 100%;
    height: 1.3333rem;
    padding: 0 0.32rem;
    display: flex;
    align-items: center;
    border-top: 1px solid @border-default;
    border-bottom: 1px solid @border-default;
  }

  .hospitalization-cancel {
    width: 0.8rem;
    color: #BFBFBF;
  }

  .hospitalization-title {
    width: calc(~"100% - 1.6rem");
    text-align: center;
  }

  .hospitalization-confirm {
    width: 0.8rem;
    color: #E49A2D;
  }

  .hospitalization-item {
    width: 100%;
    height: 1.3333rem;
    text-align: center;
    line-height: 1.3rem;
    color: #BBBBBB;
    border-bottom: 1px solid @border-default;
  }

  .hospitalization-item-active {
    color: #E49A2D;
  }
</style>
