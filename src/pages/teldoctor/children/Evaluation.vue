<template>
  <div id="evaluation_page">
    <evaluation-detail type='main'></evaluation-detail>
  </div>
</template>

<script>
  import evaluationDetail from '@/components/doctor/evaluation.vue'
  export default {
    components: {
      evaluationDetail
    },
    data() {
      return {
      }
    },
    methods: {

    },
    mounted(){
      document.title = '患者评价'
    }
  }
</script>

<style lang="less" scoped>
  #evaluation_page {
    padding-top: 40px;
    background: #fff;
  }
</style>
