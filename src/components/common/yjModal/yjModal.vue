<template>
  <div class="yj-modal" v-show="modalShow">
    <div class="yj-modal-cover"></div>
    <div class="yj-modal-container">
      <div class="yj-modal-content">
        {{ content }}
      </div>
      <div class="yj-modal-opts">
        <div class="modal-cancel" @click="closeModal">取消</div>
        <div class="modal-confirm" @click="confirmModal">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      modalShow: {
        type: Boolean,
        default: true
      },
      title: {
        type: String
      },
      content: {
        type: String,
        default: '确认执行该操作？'
      }
    },
    data () {
      return {

      }
    },
    mounted() {
      console.log(this.modalShow)
    },
    watch: {
      modalShow: {
        handler (newValue) {

        }
      }
    },
    methods: {
      closeModal () {
        this.$emit('on-close');
      },
      confirmModal () {
        this.$emit('on-confirm');
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .yj-modal-cover {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #000000;
    opacity: 0.3;
    z-index: 1000;
  }

  .yj-modal-container {
    width: 7.2rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: @bg-white;
    z-index: 1001;

    .border-radius(0.1333rem);
  }

  .yj-modal-content {
    font-size: 0.48rem;
    width: 100%;
    text-align: center;
    padding: 0.666rem 0.4rem;
  }

  .yj-modal-opts {
    width: 100%;
    height: 1.0666rem;
    font-size: 0.4266rem;
    display: flex;
    align-items: center;
    border-top: 1px solid #EEEEEE;
  }

  .modal-cancel {
    width: 50%;
    line-height: 1rem;
    text-align: center;
    border-right: 1px solid #EEEEEE;
  }

  .modal-confirm {
    width: 50%;
    line-height: 1rem;
    text-align: center;
  }
</style>
