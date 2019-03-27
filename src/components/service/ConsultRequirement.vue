<template>
  <div class="requirement-container container-with-bar">
    <div class="card-piece">咨询需求（最多选择三项）</div>
    <div class="card card-no-margin">
      <div class="card-item" :class="choose.selected ? 'card-item-active' : ''" v-for="choose in chooseList" :key="choose.name" @click="consultItemHandler(choose)">
        <div class="card-requirement-name">{{ choose.name }}</div>
        <img src="../../assets/images/icon_choose@2x.png" class="icon-choose" v-if="choose.selected">
        <div class="icon-choose-empty" v-else></div>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="requirement-confirm" @click="consultSubmit">确认</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chooseList: [
          {
            name: '手术治疗咨询',
            selected: true
          },
          {
            name: '放化疗咨询',
            selected: false
          },
          {
            name: '内科保守治疗咨询',
            selected: false
          },
          {
            name: '其他诊疗意见咨询',
            selected: false
          }
        ]
      }
    },
    methods: {
      consultItemHandler (chooseCur) {
        let count = 0;
        this.chooseList.forEach(item => {
          if (item.selected) {
            count++;
          }
        });
        if (count >= 3 && !chooseCur.selected) {
          return;
        }
        chooseCur.selected = !chooseCur.selected;
      },
      consultSubmit () {
        const choosed = [];
        this.chooseList.forEach(choose => {
          if (choose.selected) {
            choosed.push(choose.name);
          }
        });
        this.$emit('consultSubmit', choosed);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/base.less';

  .requirement-container {
    width: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    z-index: 1000;
    background: @bg-default;
  }

  .icon-choose {
    width: 0.64rem;
    height: 0.64rem;
    margin-left: auto;
  }

  .icon-choose-empty {
    width: 0.64rem;
    height: 0.64rem;
    margin-left: auto;
    border: 0.0533rem solid #E3E3E3;

    .border-radius(50%);
  }

  .card-item-active {
    color: #E49A2D;
  }

  .requirement-confirm {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.3rem;
    text-align: center;
    background: @bg-orange;
    color: @text-color-white;
  }
</style>