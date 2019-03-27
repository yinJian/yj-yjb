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
        <div 
        class="hospitalization-item" 
        :class="hospitalization.selected ? 'hospitalization-item-active' : ''" 
        v-for="(hospitalization , index) in hospitalizationList" 
        :key="index"
        @click="hosItemHandler(hospitalization)">
        {{ hospitalization.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        choosedStatus: 1,
        hospitalizationList: [
          {
            name: '已确认住院医院及时间',
            status: 1,
            selected: true
          },
          {
            name: '未确认住院医院及时间',
            status: 2,
            selected: false
          },
          {
            name: '已确认住院医院，未确认时间',
            status: 3,
            selected: false
          }
        ]
      }
    },
    methods: {
      cancelHandler () {
        this.$emit('hosChooseCancel');
      },
      hosItemHandler (hospitalizationCur) {
        this.hospitalizationList.forEach(hospitalization => {
          hospitalization.selected = false;
        });
        this.choosedStatus = hospitalizationCur.status;
        hospitalizationCur.selected = true;
      },
      confirmHandler () {
        this.$emit('hosChooseConfirm', {
          choosedStatus: this.choosedStatus
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