<template>
  <div class="container-with-bar">
    <div class="order-process">
      <template v-if="orderDetail.orderStates == '0001'">
        <div class="order-process-line"></div>
        <div class="order-process-list">
          <div class="order-process-item order-process-item-active">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/Oval@2x.png" class="process-img">
            </div>
            <p>审核中</p>
          </div>
          <div class="order-process-item">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/OvalCopy@2x.png" class="process-img">
            </div>
            <p>进行中</p>
          </div>
          <div class="order-process-item">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/OvalCopy@2x.png" class="process-img">
            </div>
            <p>完成</p>
          </div>
        </div>
        <div class="order-opts">
          <button class="button-cancel" @click="cancelOrderHandler">取消订单</button>
          <button class="button-call" @click="serviceLink">咨询顾问</button>
            <router-link :to="'/service/upload/'+orderDetail.orderNumber" class="button-profile">上传资料</router-link>
        </div>
      </template>
      <template v-if="orderDetail.orderStates == '0002'">
        <div class="order-process-line"></div>
        <div class="order-process-list">
          <div class="order-process-item order-process-item-active">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/Oval@2x.png" class="process-img">
            </div>
            <p>审核中</p>
          </div>
          <div class="order-process-item order-process-item-active">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/Oval@2x.png" class="process-img">
            </div>
            <p>进行中</p>
          </div>
          <div class="order-process-item">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/OvalCopy@2x.png" class="process-img">
            </div>
            <p>完成</p>
          </div>
        </div>
        <div class="order-opts">
          <button class="button-cancel" @click="cancelOrderHandler">取消订单</button>
          <button class="button-call" @click="serviceLink">咨询顾问</button>
        </div>
      </template>
      <template v-if="orderDetail.orderStates == '0003'">
        <div class="order-process-line"></div>
        <div class="order-process-list">
          <div class="order-process-item order-process-item-active">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/Oval@2x.png" class="process-img">
            </div>
            <p>审核中</p>
          </div>
          <div class="order-process-item order-process-item-active">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/Oval@2x.png" class="process-img">
            </div>
            <p>进行中</p>
          </div>
          <div class="order-process-item order-process-item-active">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/Oval@2x.png" class="process-img">
            </div>
            <p>完成</p>
          </div>
        </div>
        <div class="order-opts">
          <button class="button-call" @click="serviceLink">咨询顾问</button>
          <router-link :to="'/order/comment/'+orderDetail.orderNumber" class="button-profile">立即评价</router-link>
        </div>
      </template>
      <template v-if="orderDetail.orderStates == '0004'">
        <div class="order-process-list">
          <div class="order-close">
            <p>服务已关闭</p>
           <!-- <p>关闭原因：保险未通过</p>-->
          </div>
        </div>
      </template>
      <template v-if="orderDetail.orderStates == '0005'">
        <div class="order-process-line"></div>
        <div class="order-process-list">
          <div class="order-process-item order-process-item-active">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/Oval@2x.png" class="process-img">
            </div>
            <p>审核中</p>
          </div>
          <div class="order-process-item order-process-item-active">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/Oval@2x.png" class="process-img">
            </div>
            <p>进行中</p>
          </div>
          <div class="order-process-item order-process-item-active">
            <div class="process-img-wrapper">
              <img src="../../../assets/images/Oval@2x.png" class="process-img">
            </div>
            <p>完成</p>
          </div>
        </div>
        <!-- <div class="order-opts">
          <router-link :to="'/order/comment/'+orderDetail.orderNumber" class="button-profile">服务评价</router-link>
        </div> -->
      </template>
    </div>
    <div class="card-with-padding">
      <template  v-if="orderDetail.orderType == '0001' || orderDetail.orderType == '0002' || orderDetail.orderType == '0003'">
        <div class="card-title">
          <div>重疾绿色通道</div>
          <!-- <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right"> -->
        </div>
        <div class="appointment-info">
          <div class="appointment-list">
            <div class="appointment-item">
              <div class="appointment-label">所患疾病</div>
              <div class="appointment-value">{{ orderDetail.diseaseName }}</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-label">期望就诊城市</div>
              <div class="appointment-value">{{ orderDetail.expectAddress }}</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-label">就医需求确认</div>
              <div class="appointment-value">{{ orderDetail.expect }}</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-label">患者所在城市</div>
              <div class="appointment-value">{{ orderDetail.nowAddress }}</div>
            </div>
          </div>
          <div class="appointment-desc" v-if="orderDetail.remark">
            <p>备注</p>
            <div class="appointment-desc-text">{{ orderDetail.remark }}</div>
          </div>
        </div>
      </template>
      <template v-else-if="orderDetail.orderType == '0004'">
        <div class="card-title">
          <div>二次诊疗</div>
          <!-- <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right"> -->
        </div>
        <div class="appointment-info">
          <div class="appointment-list">
            <div class="appointment-item">
              <div class="appointment-label">所患疾病</div>
              <div class="appointment-value">{{ orderDetail.diseaseName }}</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-label">咨询需求</div>
              <div class="appointment-value">{{ orderDetail.expect }}</div>
            </div>
            <div class="appointment-item" v-if="orderDetail.remark">
              <div class="appointment-label">备注</div>
              <div class="appointment-value">{{ orderDetail.remark }}</div>
            </div>
          </div>
          <div class="appointment-desc">
            <div class="appointment-item">
              <div class="appointment-label">收货人姓名</div>
              <div class="appointment-value">{{ orderDetail.name }}</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-label">收货人电话</div>
              <div class="appointment-value">{{ orderDetail.phone }}</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-label">收货人地区</div>
              <div class="appointment-value">{{ orderDetail.expectAddress }}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="orderDetail.orderType == '0005'">
        <div class="card-title">
          <div>住院押金垫付</div>
          <!-- <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right"> -->
        </div>
        <div class="appointment-info">
          <div class="appointment-list">
            <div class="appointment-item">
              <div class="appointment-label">所患疾病</div>
              <div class="appointment-value">{{ orderDetail.diseaseName }}</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-label">住院信息确认</div>
              <div class="appointment-value">{{ orderDetail.expect }}</div>
            </div>
            <div class="appointment-item" v-if="orderDetail.hosName">
              <div class="appointment-label">医院名称</div>
              <div class="appointment-value">{{ orderDetail.hosName }}</div>
            </div>
            <div class="appointment-item" v-if="orderDetail.hosTime">
              <div class="appointment-label">住院时间</div>
              <div class="appointment-value">{{ orderDetail.hosTime }}</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-label">社保信息</div>
              <div class="appointment-value">{{ orderDetail.isSocial }}</div>
            </div>
            <div class="appointment-item">
              <div class="appointment-label">社保属地</div>
              <div class="appointment-value">{{ orderDetail.number }}</div>
            </div>
          </div>
          <div class="appointment-desc" v-if="orderDetail.remark">
            <p>备注</p>
            <div class="appointment-desc-text">{{ orderDetail.remark }}</div>
          </div>
        </div>
      </template>
    </div>
    <div class="card" v-if="orderDetail.orderStates == '0005'">
      <router-link :to="'/order/commentdetail/'+orderDetail.orderNumber" class="card-item">
        <div class="card-item-label">我的评价</div>
        <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
      </router-link>
    </div>
    <div class="card-with-padding">
      <div class="card-title">
        <span>诊断说明书</span>
        <router-link :to="'/service/upload/'+orderDetail.orderNumber" class="card-title-opt">修改/补充资料</router-link>
      </div>
      <div class="diagnosis-list">
        <img :src="file.enclosureUrl" class="diagnosis-img" v-for="(file, file_index) in orderDetail.enclosureName" @click="previewImgHandler(file.enclosureUrl)">
        <div class="no-data" v-if="orderDetail.enclosureName.length <= 0">暂无文件！</div>
      </div>
    </div>
    <div class="card">
      <div class="order-time">
        <p>订单编号：{{ orderDetail.orderNumber }}</p>
        <p>创建时间：{{ orderDetail.createTime }}</p>
      </div>
    </div>
    <div class="img-preview-wrapper" v-show="previewShow" @click="previewShow = false">
      <div class="img-preview-cover"></div>
      <div class="img-preview-content">
        <img :src="previewImg">
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
        currentOrderNumber: '',
        deleteOrderShow: false,
        cancelOrderShow: false,
        previewShow: false,
        orderDetail: {
          "expectAddress": null,
          "nowAddress": null,
          "diseaseName": "用户所患的疾病",
          "expect": "用户的描述",
          "remark": null,
          "orderNumber": null,
          "createTime": "2018-04-17 00:00:00",
          "hosName": "北京医院",
          "name": null,
          "phone": null,
          "orderStates": '',
          number: '',
          isSocialSecurity: '',
          "enclosureName": [],
          "number": "YJ000123",
          "serviceName": null
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
      previewImgHandler (img) {
        this.previewImg = img;
        this.previewShow = true;
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

</style>
