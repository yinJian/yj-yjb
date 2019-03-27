<template>
  <div class="container-with-bar">
    <div class="card-with-padding">
      <div class="card-title">
        <div class="order-detail-title">
           <p>体检安排中</p>
           <span>正在为您安排体检，请耐心等待</span>
        </div>
        <button class="button-cancel" @click="cancelOrderHandler">取消订单</button>
      </div>
    </div>
    <div class="card-with-padding">
      <div class="card-title">健康体检</div>
      <div class="order-detail-list">
        <div class="order-detail-item">
          <div class="order-detail-label">姓名：</div>
          <div class="order-detail-value">{{orderDetail.username}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-label">手机号：</div>
          <div class="order-detail-value">{{orderDetail.phone}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-label">身份证号：</div>
          <div class="order-detail-value">{{orderDetail.idNumber}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-label">体检中心：</div>
          <div class="order-detail-value">{{orderDetail.examinationCenter}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-label">机构地址：</div>
          <div class="order-detail-value">{{orderDetail.examinationAddress}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-label">首选体检时间：</div>
          <div class="order-detail-value">{{orderDetail.firstExaminationDate}}</div>
        </div>
        <div class="order-detail-item">
          <div class="order-detail-label">备选体检时间：</div>
          <div class="order-detail-value">{{orderDetail.secondExaminationDate}}</div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="order-time">
        <p>订单编号：{{ orderDetail.orderNumber }}</p>
        <p>创建时间：{{ orderDetail.createTime }}</p>
      </div>
    </div>
    <YjModal
      content="确定要取消该订单？"
      :modalShow="cancelOrderShow"
      @on-close="cancelOrderShow = false"
      @on-confirm="cancelOrderConfirm"
    ></YjModal>
    <YjModal
      content="确定要删除该订单？"
      :modalShow="deleteOrderShow"
      @on-close="deleteOrderShow = false"
      @on-confirm="deleteOrderConfirm"
    ></YjModal>
  </div>
</template>

<script>
  import {
    cancelOrder,
    deleteOrder,
    getOrderDetail
  } from '@/api';

  export default {
    data () {
      return {
        orderId: '',
        deleteOrderShow: false,
        cancelOrderShow: false,
        previewShow: false,
        orderDetail: {
            username: "",
            phone: "",
            idNumber: "",
            examinationCenter: "",
            examinationAddress: "",
            firstExaminationDate: "",
            secondExaminationDate: "",
            orderNumber: "",
            createTime: "",
            orderType: "",
            serviceName: "",
            orderStates: ""
        }
      }
    },
    mounted () {
      document.title = '订单详情';
      this.orderId = this.$route.params.id;
      this.getOrderDetail();
    },
    methods: {
      getOrderDetail () {
        getOrderDetail(this.orderId).then(data => {
          if (data.data.success == 'OK') {
            this.orderDetail = data.data.data;
          }
        });
      },
      cancelOrderHandler (orderNumber) {
        this.cancelOrderShow = true;
      },
      deleteOrderHandler (orderNumber) {
        this.deleteOrderShow = true;
      },
      cancelOrderConfirm () {
        cancelOrder(this.orderId).then(data => {
          this.cancelOrderShow = false;
          if (data.data.success == 'OK') {
            this.$yjToast('订单删除成功！');
            this.getOrderDetail();
          } else {
            this.$yjToast(data.data.message);
          }
        });
      },
      serviceLink () {
        window.location.href = 'http://a1.7x24cc.com/phone_webChat.html?accountId=N000000011451&chatId=yjjb-a4cc2e60-ae54-11e7-a274-af708c4babc4';
      },
      deleteOrderConfirm () {
        deleteOrder(this.orderId).then(data => {
          this.deleteOrderShow = false;
          if (data.data.success == 'OK') {
            this.$yjToast('订单取消成功！');
            this.getOrderDetail();
          } else {
            this.$yjToast(data.data.message);
          }
        });
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .order-process {
    padding: 0.56rem 0.72rem;
    background: @bg-white;
    position: relative;
  }

  .order-process-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .order-process-line {
    width: 6.5rem;
    height: 0.08rem;
    background: #E2E2E2;
    position: absolute;
    top: 1.04rem;
    left: 0;
    right: 0;
    margin: auto;
  }

  .order-process-item {
    width: 1.86rem;
    text-align: center;
    color: #e2e2e2;

    p {
      margin-top: 0.24rem;
    }
  }

  .order-detail-list{
    margin-bottom: 0.5rem;
  }

  .order-detail-item {
    display: flex;
    padding-top: 0.4rem;
  }

  .order-detail-label {
    width: calc(~"100% - 5.333rem");
    color: #999999;
  }

  .process-img-wrapper {
    width: 1.86rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .process-img {
    width: 0.64rem;
    height: 0.64rem;
    position: relative;
    z-index: 101;
  }

  .order-process-item-active {
    color: #E49A2D;
  }

  .order-process-item-active .process-img {
    width: 1rem;
    height: 1rem;
  }

  .order-opts {
    margin-top: 0.56rem;
    display: flex;
    justify-content: center;
  }

  .button-cancel, .button-call {
    color: #8A8A8A;
    border: 1px solid #626262;
    margin: 0 0.4266rem;

    .button-order();
  }

  .button-profile {
    color: #E49A2D;
    border: 1px solid #E49A2D;
    margin: 0 0.4266rem;

    .button-order();
  }

  .appointment-list {
    padding: 0.32rem 0;
    border-bottom: 1px solid #EBECF1;
  }

  .appointment-item {
    margin-bottom: 0.4266rem;
    display: flex;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .appointment-label {
    width: 2.666rem;
    color: #999999;
  }

  .appointment-value {
    width: calc(~"100% - 2.666rem");
    margin-left: auto;
    text-align: right;

    .text-ellipsis();
  }

  .appointment-desc {
    padding-bottom: 0.4266rem;
    line-height: 0.6133rem;
    margin-top: 0.1866rem;
  }

  .appointment-desc-text {
    color: #A5A5A5;
  }

  .diagnosis-list {
    clear: both;
    overflow: hidden;
    margin-top: 0.56rem;

    img {
      width: 2.8rem;
      height: 1.84rem;
      margin-right: 0.32rem;
      margin-bottom: 0.32rem;

      &:nth-child(3n+3) {
        margin-right: 0;
      }
    }
  }

  .order-time {
    color: #999999;
    font-size: 0.32rem;
    padding: 0.4533rem 0.32rem;

    p {
      margin-bottom: 0.3733rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .order-close {
    p {
      &:first-child {
        font-size: 0.4266rem;
        color: #333333;
      }

      &:last-child {
        font-size: 0.3733rem;
        color: #A5A5A5;
        margin-top: 0.1333rem;
      }
    }
  }

  .img-preview-content {
    width: 100%;
    height: 100vh;
    padding: 1rem 0;
    background: #000000;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;

    img {
      width: 100%;
    }
  }

  .order-detail-title{
    font-size: 0.48rem;
    width: calc(~"100% - 2.333rem");
    color: #333;
    span{
      font-size: 0.3rem;
      color: #999;
    }
  }
</style>
