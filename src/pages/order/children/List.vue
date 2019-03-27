<template>
  <div>
    <div class="card-with-padding" v-for="(order, index) in orders" :key="index">
      <router-link :to="'/order/tijiandetail/'+order.orderNumber" class="order-type" v-if="order.orderType == '0007'">
        <img src="../../../assets/images/tjyuyue@2x.png" class="order-type-img">
        <div class="order-type-info">
          <p class="order-type-name">体检预约</p>
          <p class="order-time">{{ order.createDate | dateFilter('YYYY-MM-DD hh:mm:ss') }}</p>
        </div>
        <div class="order-status">
          <div class="order-status-text">{{ order.customerOrderStatus | orderStatusFilter(order.orderType) }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
      </router-link>
      <router-link :to="'/order/detail/'+order.orderNumber" class="order-type" v-else>
        <img src="../../../assets/images/zhongji@2x.png" v-if="order.orderType == '0001' || order.orderType == '0002' || order.orderType == '0003'" class="order-type-img">
        <img src="../../../assets/images/eczhenliao@2x.png" v-if="order.orderType == '0004'" class="order-type-img">
        <img src="../../../assets/images/yajindianfu@2x.png" v-if="order.orderType == '0005'" class="order-type-img">
        <div class="order-type-info">
          <p class="order-type-name">{{ order.orderType | orderTypeFilter }}</p>
          <p class="order-time">{{ order.createDate | dateFilter('YYYY-MM-DD hh:mm:ss') }}</p>
        </div>
        <div class="order-status">
          <div class="order-status-text">{{ order.customerOrderStatus | orderStatusFilter(order.orderType) }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
      </router-link>
      <div class="order-detail">
        <div class="order-opts">
          <template v-if="order.customerOrderStatus == '0001'">
            <button class="button-cancel" @click="cancelOrderHandler(order.orderNumber)">取消订单</button>
            <button class="button-call" @click="serviceLink">咨询顾问</button>
            <router-link :to="'/service/upload/'+order.orderNumber" class="button-profile" v-if="order.orderType != '0007'">上传资料</router-link>
          </template>
          <template v-if="order.customerOrderStatus == '0002'">
            <button class="button-cancel" @click="cancelOrderHandler(order.orderNumber)">取消订单</button>
            <button class="button-profile" @click="serviceLink">咨询顾问</button>
          </template>
          <template v-if="order.customerOrderStatus == '0003'">
            <button class="button-call" @click="serviceLink">咨询顾问</button>
            <router-link :to="'/order/comment/'+order.orderNumber" class="button-profile">立即评价</router-link>
          </template>
          <template v-if="order.customerOrderStatus == '0004'">
              <button class="button-cancel" @click="deleteOrderHandler(order.orderNumber)">删除订单</button>
          </template>
          <template v-if="order.customerOrderStatus == '0005'">
            <router-link :to="'/order/commentdetail/'+order.orderNumber" class="button-profile">查看评价</router-link>
          </template>
          <template v-if="order.orderType == '0007' && order.customerOrderStatus == '0012' ">
            <button class="button-cancel" @click="deleteOrderHandler(order.orderNumber)">删除订单</button>
          </template>
          <template v-if="order.orderType == '0007' && order.customerOrderStatus == '0009' ">
            <router-link :to="'/order/comment/'+order.orderNumber" class="button-profile">立即评价</router-link>
          </template>
        </div>
      </div>
    </div>
    <div class="no-order" v-if="orders.length <= 0 && loaded">
      <img src="../../../assets/images/no-order.png">
      <p>暂无服务记录！</p>
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
    getOrders,
    cancelOrder,
    deleteOrder,
    getUserinfo
  } from '@/api';
  import {
    mapState
  } from 'vuex';
  import {
    SERVICE_MAP,
    getLocalStorage,
    setLocalStorage
  } from '@/assets/scripts/utils';

  export default {
    data () {
      return {
        currentOrderNumber: '',
        deleteOrderShow: false,
        cancelOrderShow: false,
        orders: [],
        loaded: false
      }
    },
    mounted () {
      document.title = '我的订单';
      this.initOrders();
      this.initUserinfo(false);
      this.getUserinfo();
    },
    methods: {
      initUserinfo (isJump) {
        if (this.userinfo) {
          this.oldPhone = this.userinfo.phone;
          this.oldName = this.userinfo.name;
          this.oldNumber = this.userinfo.idNumber;
        } else {
          if (isJump) {
            this.$router.push('/signin?redirect='+encodeURIComponent(this.$route.path));
          }
        }
      },
      initOrders () {
         //获取用户订单列表
        getOrders().then(data => {
          this.loaded = true;
          if (data.data.success == 'OK') {
            this.orders = data.data.data;
          }
        });
      },
      getUserinfo () {
        //初始化用户信息
        getUserinfo().then(data => {
          if (data.data.success == 'OK') {
            const userinfo = {
              idNumber: data.data.data.idNumber,
              name: data.data.data.name,
              phone: data.data.data.phone
            };
            setLocalStorage('uid', data.data.data.userId);
            this.$store.commit('updateUserinfo', {
              userinfo: userinfo
            });
          } else {
            this.$router.push('/signin?redirect='+encodeURIComponent(this.$route.path));
          }
        });
      },
      cancelOrderHandler (orderNumber) {
        this.cancelOrderShow = true;
        this.currentOrderNumber = orderNumber;
      },
      deleteOrderHandler (orderNumber) {
        this.currentOrderNumber = orderNumber;
        this.deleteOrderShow = true;

      },
      serviceLink () {
        window.location.href = 'http://a1.7x24cc.com/phone_webChat.html?accountId=N000000011451&chatId=yjjb-a4cc2e60-ae54-11e7-a274-af708c4babc4';
      },
      cancelOrderConfirm () {
        cancelOrder(this.currentOrderNumber).then(data => {
          this.cancelOrderShow = false;
          if (data.data.success == 'OK') {
            this.$yjToast('操作成功！');
            this.initOrders();
          } else {
            this.$yjToast(data.data.message);
          }
        });
      },
      deleteOrderConfirm () {
        deleteOrder(this.currentOrderNumber).then(data => {
          this.deleteOrderShow = false;
          if (data.data.success == 'OK') {
            this.$yjToast('操作成功！');
            this.initOrders();
          } else {
            this.$yjToast(data.data.message);
          }
        });
      },
    },
    filters: {
      orderTypeFilter (value) {
        return SERVICE_MAP[value];
      },
      orderStatusFilter (value,type) {
        if(type == '0007'){
          if (value == '0001') {
            return '体检安排中';
          } else if (value == '0009') {
            return '预约完成';
          } else if (value == '0012') {
            return '订单关闭';
          }
        }else{
          if (value == '0001') {
            return '服务审核中';
          } else if (value == '0002') {
            return '服务安排中';
          } else if (value == '0003') {
            return '服务已完成';
          } else if (value == '0004') {
            return '订单关闭';
          } else if (value == '0005') {
            return '已评价';
          } else {
            return '未知状态';
          }
        }
      },
    },
    watch: {
      userinfo: {
        handler (newValue) {
          this.initUserinfo(true);
        },
        deep: true
      }
    },
    computed: {
      ...mapState([
        'userinfo'
      ])
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .order-type {
    padding: 0.1333rem 0 0.1866rem 0;
    border-bottom: 1px solid @border-default;
    display: flex;
    align-items: flex-start;
  }

  .order-type-img {
    width: 1.4933rem;
    height: 1.4933rem;
  }

  .order-type-info {
    padding: 0.2666rem 0 0.16rem 0.2133rem;
  }

  .order-type-name {
    font-size: 0.48rem;
    color: #4A4A4A;
  }

  .order-time {
    font-size: 0.4rem;
    color: #AEAEAE;
  }

  .order-status {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-top: 0.2666rem;
  }

  .order-status-text {
    width: 2rem;
    text-align: right;
    margin-left: auto;
    margin-right: 0.32rem;
    font-size: 0.3733rem;
    color: #E49A2D;
  }

  .order-detail {
    font-size: 0.3733rem;
    padding: 0.3733rem 0 0.32rem 0;
    color: #939393;

    .text-ellipsis();

    span {
      color: #333333;
    }
  }

  .order-opts {
    display: flex;
    align-items: center;
    float: right;
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

  .no-order {
    padding: 3rem 0;
    text-align: center;
    font-size: 0.3733rem;
    color: #9A9A9A;

    img {
      width: 7rem;
    }
  }
</style>
