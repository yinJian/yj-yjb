<template>
  <div id="evaluation">
    <div :class="{'eva_label': true,'autoH':unfold}">
      <div v-if="type == 'main'" :class="{'activeLabel' : activeItem == 0}" @click="labelFiltrate(0)">全部</div>
      <div 
        v-for="item in 8" 
        :key="item" 
        @click="labelFiltrate(item)"
        :class="{'activeLabel' :item == activeItem}">
        解答清晰(<span>30</span>)</div>
    </div>
    <p @click="unfold = !unfold" v-if="type == 'main'"><img :class="{'up' : unfold}" src="../../assets/images/icon_arrow_r@2x.png" alt=""></p>

    <div class="eva_content" v-for="(item) in 5" :key="item">
      <div class="eva_information">
        <span class="name">名字</span>
        &nbsp; <span class="star"><i class="star_icon star4"></i></span>
        <span class="date flr">{{date | dateFilter('YYYY-MM-DD')}}</span>
      </div>
      <div class="eva_detail">医生辛苦啦，下次遇到问题再麻烦您哦</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['type'],
    data() {
      return {
        unfold : false,
        activeItem: 0,
        date : new Date()
      }
    },
    methods: {
      labelFiltrate(index) {
        this.activeItem = index
      },
    },
  }
</script>

<style lang="less" scoped>
  .eva_label {
    height: 144px;
    overflow: hidden;
    padding: 0 28px;
    div {
      display: inline-block;
      padding: 14px 20px;
      margin: 0 10px 27px 10px;
      background: #F7F6F4;
      border-radius: 52px;
      text-align: center;
      color: #666666;
    }
    .activeLabel {
      color: #fff;
      background: #F39800;
    }
  }
  #evaluation {
    .autoH {
      height: initial;
      }
    p {
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #e1e1e1;
      img {
        width: 20px;
        transform: rotateZ(90deg);
      }
      .up {
        transform: rotateZ(-90deg);
      }
    }
  }
  .eva_content {
    padding: 30px 38px;
    border-bottom: 1px solid #E1E1E1;
    .eva_information {
      color: #999999;
      .name {
        font-size: 28px;
      }
      .date {
        margin-top: 8px;
        font-size: 24px;
      }
    }
  }
  .eva_detail {
    padding-top: 28px;
    font-size: 28px;
    color: #333333;
  }
  
</style>