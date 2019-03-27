<template>
  <div class="container-with-bar">
    <div class="order-process">
      <img src="../../../assets/images/zhongji@2x.png" class="order-type-img">
      <p class="order-process-tip">服务已提交审核</p>
      <p class="order-process-time">需要3-5个工作日</p>
    </div>
    <div class="card-with-padding">
      <div class="card-title">
        <div>如何加快审核速度</div>
        <div class="card-title-opt" @click="uploadFile">上传资料</div>
        <!-- <router-link :to="'/service/upload/'+orderDetail.orderNumber" class="card-title-opt">上传资料</router-link> -->
      </div>
      <div class="appointment-info">
        <div class="appointment-desc">
          <div class="appointment-desc-text">请上传重大疾病诊断文件，以协助工作人员尽快为您安排 最佳就医服务。</div>
        </div>
      </div>
    </div>
    <div class="card-with-padding">
      <div class="card-title">
        <span>服务过程中遇到问题如何解决？</span>
        <div class="card-title-opt" @click="serviceLink">咨询顾问</div>
        <!-- <router-link to="/consult" class="card-title-opt">咨询顾问</router-link> -->
      </div>
      <div class="appointment-info">
        <div class="appointment-desc">
          <div class="appointment-desc-text">一对一专属医学顾问，服务全程跟踪。</div>
        </div>
      </div>
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
    <div class="card">
      <div class="order-time">
        <p>订单编号：{{ orderDetail.orderNumber }}</p>
        <p>创建时间：{{ orderDetail.createTime }}</p>
      </div>
    </div>
    <!-- <div class="bottom-bar" v-if="orderDetail.orderStates == '0001'">
      <div class="apply-cancel" @click="cancelOrderHandler">取消申请</div>
    </div> -->
    <div class="bottom-bar">
      <div class="apply-cancel" @click="cancelOrderHandler2">完成</div>
    </div>
    <YjModal
      content="确定要取消该订单？"
      :modalShow="cancelOrderShow"
      @on-close="cancelOrderShow = false"
      @on-confirm="cancelOrderConfirm"
    ></YjModal>
  </div>
</template>

<script>
  import {
    cancelOrder,
    getOrderDetail
  } from '@/api';

  export default {
    data () {
      return {
        orderId: '',
        deleteOrderShow: false,
        cancelOrderShow: false,
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
          "enclosureName": [],
          "number": "YJ000123",
          "serviceName": null
        }
      }
    },
    mounted () {
      this.orderId = this.$route.params.id;
      this.getOrderDetail();
    },
    methods: {
      getOrderDetail () {
        getOrderDetail(this.orderId).then(data => {
          if (data.data.success == 'OK') {
            console.log(data.data.data);
            this.orderDetail = data.data.data;
          } else {
            this.$yjToast(data.data.message);
          }
        });
      },
      uploadFile () {
        this.$router.push({ path: `/service/upload/${this.orderDetail.orderNumber}` })
      },
      cancelOrderHandler (orderNumber) {
        this.cancelOrderShow = true;
      },
      cancelOrderHandler2 () {
        this.$router.push({ path: '/service/list' });
      },
      deleteOrderHandler (orderNumber) {
        this.deleteOrderShow = true;
      },
      cancelOrderConfirm () {
        cancelOrder(this.orderId).then(data => {
          this.cancelOrderShow = false;
          if (data.data.success == 'OK') {
            this.$yjToast('操作成功！');
            this.$router.replace({ path: `/order/detail/${this.orderDetail.orderNumber}`});
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
            this.$yjToast('操作成功！');
          } else {
            this.$yjToast(data.data.message);
          }
        });
      },
      serviceLink () {
        window.location.href = 'http://a1.7x24cc.com/phone_webChat.html?accountId=N000000011451&chatId=yjjb-a4cc2e60-ae54-11e7-a274-af708c4babc4';
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
    text-align: center;
  }

  .order-type-img {
    width: 2.4533rem;
  }

  .order-process-tip {
    font-size: 0.4266rem;
    color: #494949;
  }

  .order-process-time {
    font-size: 0.32rem;
    color: #A9A9A9;
    margin-top: 0.1333rem;
  }

  .order-opts {
    margin-top: 0.56rem;
    display: flex;
    justify-content: center;
  }

  .button-cancel, .button-call {
    color: #8A8A8A;
    border: 1px solid #626262;
    margin-left: 0.4266rem;

    .button-order();
  }

  .button-profile {
    color: #E49A2D;
    border: 1px solid #E49A2D;
    margin-left: 0.4266rem;

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

  .apply-cancel {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.3rem;
    text-align: center;
    background: @bg-orange;
    color: @text-color-white;
  }
</style>