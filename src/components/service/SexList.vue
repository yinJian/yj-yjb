<template>
  <div class="hospital-section">
    <div class="hospital-section-cover"></div>
    <div class="hospital-section-wrapper">
      <div class="hospital-section-bar">
        <div class="hospital-section-cancel" @click="cancelHandler">取消</div>
        <div class="hospital-section-title"></div>
        <div class="hospital-section-confirm" @click="confirmHandler">确认</div>
      </div>
      <div class="hospital-section-list">
        <div class="hospital-section-item" :class="sex.selected ? 'hospital-section-item-active' : ''" v-for="sex in sexList" @click="sexItemHandler(sex)">{{ sex.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        choosedSexName: '',
        sexList: [
          {
            name: '男',
            selected: false
          },
          {
            name: '女',
            selected: false
          }
        ]
      }
    },
    methods: {
      cancelHandler () {
        this.$emit('sexChooseCancel');
      },
      sexItemHandler (sexCur) {
        this.sexList.forEach(sex => {
          sex.selected = false;
        });
        sexCur.selected = true;
        this.choosedSexName = sexCur.name;
      },
      confirmHandler () {
        this.$emit('sexChooseConfirm', {
          name: this.choosedSexName
        });
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/base.less';

  .hospital-section-cover {
    width: 100%;
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #000000;
    opacity: 0.3;
    z-index: 998;
  }

  .hospital-section-wrapper {
    width: 100%;
    height: 5.3333rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: @bg-white;
    z-index: 999;
    font-size: 0.3733rem;
  }

  .hospital-section-bar {
    width: 100%;
    height: 1.3333rem;
    padding: 0 0.32rem;
    display: flex;
    align-items: center;
    border-top: 1px solid @border-default;
    border-bottom: 1px solid @border-default;
  }

  .hospital-section-cancel {
    width: 0.8rem;
    color: #BFBFBF;
  }

  .hospital-section-title {
    width: calc(~"100% - 1.6rem");
    text-align: center;
  }

  .hospital-section-confirm {
    width: 0.8rem;
    color: #f39800;
  }

  .hospital-section-item {
    width: 100%;
    height: 1.3333rem;
    text-align: center;
    line-height: 1.3rem;
    color: #BBBBBB;
    border-bottom: 1px solid @border-default;
  }

  .hospital-section-item-active {
    color: #f39800;
  }
</style>
