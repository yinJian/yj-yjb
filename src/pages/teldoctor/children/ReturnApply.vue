<template>
  <div>
    <div class="card" style="margin-top:0; ">
      <div class="card-desc-item">
        <textarea v-model="customerConsultationQuestion" class="apply-desc" maxlength="200" placeholder="不支持输入表情包!!! 请详细描述不舒服部位、主要症状、持续时间、全面的信息可以让您获得医生更准确详细的回答"></textarea>
      </div>
      <div class="file-list">
        <div class="file-item" v-for="(file, file_index) in enclosure">
          <div class="file-item-wrapper">
            <!--<img src="../../../assets/images/icon_close@2x.png" class="file-delete" @click="deleteHandler(file_index)" v-if="orderDetail.orderStates == '0001' || orderDetail.orderStates == '0002'">-->
            <img :src="file.enclosureUrl" class="file-img" @click="previewImgHandler(file.enclosureUrl)">
          </div>
        </div>
      </div>
      <div class="upload-container">
        <div class="upload-wrapper" @click="uploadMainFile">
          <img src="../../../assets/images/camera1.png" class="camera-img">
          <span v-if="enclosure.length == 0">点击添加图片</span>
        </div>
      </div>
    </div>
    <!--<div class="card">
      <div class="card-item">
        <div class="card-item-label">科室</div>
        <div class="card-default-value"><input v-model="sectionChoosedName"/></div>
        <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
      </div>
    </div>-->
    <div class="bg-white">
      <div class="card">
        <div style="padding: 0 0.3rem; line-height: 1rem; height: 1rem">
          <group title="" gutter="0.8em" >
            <popup-picker
              title="接听电话时间"
              placeholder="请选择您方便接听电话的时间"
              confirm-text="确定"
              :data="list"
              v-model="chooseTime"
              style="font-size:0.4rem;"
              :fixed-columns=2
              :columns="2"
              :column-width="width"
              value-text-align="right"
            ></popup-picker>
          </group>
        </div>
        <div class="card-item">
          <div class="card-item-label">接听电话</div>
          <div class="card-default-value"><input v-model="oldPhone"/></div>
        </div>
      </div>
      <div class="upload-submit" @click="finishHandler">提交</div>
    </div>
    <div class="img-preview-wrapper" v-show="previewShow" @click="previewShow = false">
      <div class="img-preview-cover"></div>
      <div class="img-preview-content">
        <img :src="previewImg">
      </div>
    </div>
  </div>
</template>

<script>
  import { PopupPicker, Group } from 'vux'
  import {mapState} from 'vuex'
  import {
    myOrderDetail,
    phoneFindFile,
    createOrderMain,
    phoneSaveFile,
    deleteFile,
    initJssdk,
    fideTime
  } from '@/api';
  const oldOrderMainId = (window.location.href || '').split("?")[1]
  export default {
    data () {
      return {
        configOK: false,
        orderId: '',
        previewShow: false,
        enclosure: {},
        customerConsultationQuestion: '',
        oldPhone: '',
        sex: 0,
        age: 0,
        who: '',
        sectionChoosedName: '',
        previewImg: '',
        chooseTime: [],
        width: [2/5, 3/5],
        list: [],
      }
    },
    mounted () {
      document.title = '复诊';
      /*var timestamp = (new Date()).getTime();
      this.orderId = JSON.stringify(timestamp);*/
      this.orderId = this.GenNonDuplicateID()
      this.initJssdk();
      if (this.orderId) {
        this.getOrderDetail();
      }
     // this.oldPhone = this.userinfo.phone
      this.getOrderInfo()
      this.chooseConsultTime()
    },
    methods: {
      /*initUserinfo () {
        if (this.userinfo) {
          this.phone = this.userinfo.phone;
        }
      },*/
      GenNonDuplicateID(){
        var idStr="";  //订单号
        for(var i=0;i<6;i++) //6位随机数，用以加在时间戳后面。
        {
          idStr += Math.floor(Math.random()*10);
        }
        idStr = new Date().getTime() + idStr;  //时间戳，用来生成订单号。
        return idStr
      },
      initJssdk () {
        var that = this;
        initJssdk().then(data => {
          that.$yjToast('初始化中..');
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.data.appId, // 必填，公众号的唯一标识
            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.signature,// 必填，签名
            jsApiList: ['uploadImage', 'chooseImage'] // 必填，需要使用的JS接口列表
          });

          wx.ready(function(res){
            console.log(res);
            that.configOK = true;
          });
          wx.error(function(res){

          });
        });
      },
      uploadMainFile () {
        var that = this;
        if (this.configOK) {
          wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              var localIds = res.localIds;
              if(localIds.length > 1){

                var len = localIds.length;
                var i=0;

                function uploadImage(){
                  wx.uploadImage({
                    localId: localIds[i],
                    isShowProgressTips: 1,
                    success: function (res) {
                      var serviceId = res.serverId;
                      i++;
                      phoneSaveFile(that.orderId, serviceId, '04').then(data => {
                        if (data.data.success == 'OK') {
                          that.$yjToast('文件上传成功！');
                          that.getOrderDetail();

                          if(i<len){
                            uploadImage();
                          }

                        } else {
                          that.$yjToast(data.data.message);
                        }
                      });
                    },
                    fail: function (res) {
                      //alert('上传图片失败，请重试')
                    },
                    complete: function (res) {
                      //alert('上传强行失败，未知错误请联系开发人员')
                      console.log(res);
                      var serviceId = res.serverId;

                    }
                  });
                }

                uploadImage();

              }else{
                //alert('获取的照片ID'+localIds);
                wx.uploadImage({
                  localId: localIds.toString(),
                  isShowProgressTips: 1,
                  success: function (res) {
                    var serviceId = res.serverId;
                    phoneSaveFile(that.orderId, serviceId, '04').then(data => {
                      if (data.data.success == 'OK') {
                        that.$yjToast('文件上传成功！');
                        that.getOrderDetail();
                      } else {
                        that.$yjToast(data.data.message);
                      }
                    });
                  },
                  fail: function (res) {
                    //alert('上传图片失败，请重试')
                  },
                  complete: function (res) {
                    //alert('上传强行失败，未知错误请联系开发人员')
                    console.log(res);
                    var serviceId = res.serverId;

                  }
                });
              }
            },
            complete: function (res) {
              //alert('选择图片失败，未知错误请联系开发人员')
              console.log(res);
            }
          });
        } else {
          this.$yjToast('微信jssdk配置失败！');
        }
      },
      getOrderDetail () {
        phoneFindFile(this.orderId).then(data => {
          this.enclosure = data.data.data;
        });
      },
      previewImgHandler (img) {
        this.previewImg = img;
        this.previewShow = true;
      },
      /*deleteHandler (idx) {
        const id = this.enclosure.enclosureName[idx].enclosureId;
        deleteFile(id).then(data => {
          if (data.data.success == 'OK') {
            this.$yjToast('删除文件成功！');
            this.orderDetail.enclosureName.splice(idx, 1);
          } else {
            this.$yjToast(data.data.msg);
          }
        })
      },*/
      getOrderInfo(){
        myOrderDetail(oldOrderMainId).then(data =>{
          if(data.data.code == '200'){
            console.log(data.data)
            this.sex = data.data.telephoneDoctor.sex;
            this.age = data.data.telephoneDoctor.age;
            this.who = data.data.telephoneDoctor.who;
            this.sectionChoosedName = data.data.doctor.medicalSectionName;
            this.oldPhone = data.data.doctor.telephone;
          }
        })
      },
      chooseConsultTime(){
        fideTime().then(data =>{
          console.log(data.data)
          const todayItem = data.data['今天'];
          const tomorrowItem = data.data['明天'];
          let todayLi = {
            name: '今天',
            value: '今天',
            parent: 0
          };
          let tomorrowLi = {
            name: '明天',
            value: '明天',
            parent: 0
          };
          if(todayItem.length != 0){
            for(var i=0; i<todayItem.length; i++){
              const obj1 = {};
              obj1.parent = '今天'
              obj1.name = obj1.value = todayItem[i]
              this.list.push(obj1);
            }
            for(var j=0; j<tomorrowItem.length; j++){
              const obj2 = {};
              obj2.parent = '明天'
              obj2.name = obj2.value = tomorrowItem[j]
              this.list.push(obj2);
            }
            this.list.push(todayLi,tomorrowLi)
          }else {
            for(var k=0; k<tomorrowItem.length; k++){
              const obj3 = {};
              obj3.parent = '明天'
              obj3.name = obj3.value = tomorrowItem[k]
              this.list.push(obj3);
            }
            this.list.push(tomorrowLi)
          }
        })
      },
      finishHandler () {
        const sendTime = this.chooseTime.join('');
        const legalConsultationQuestion = this.customerConsultationQuestion.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')
        console.log(sendTime)
        if(this.customerConsultationQuestion == ''||this.customerConsultationQuestion == null){
          this.$yjToast("请填写症状描述")
        }else if(sendTime == '' || sendTime == null){
          this.$yjToast("请选择复诊时间")
        }else {
          createOrderMain(legalConsultationQuestion,this.oldPhone,this.sectionChoosedName,this.orderId, parseInt(this.sex), parseInt(this.age), this.who, '0001',oldOrderMainId,sendTime).then(data => {
            console.log(data)
            if (data.data.code == '200') {
              console.log(data)
              this.$router.push('success');
            } else {
              this.$yjToast(data.data.msg);
            }
          })
        }
      },
      onChange (val) {
        console.log('change', val)
      }
    },
    components: {
      PopupPicker,
      Group
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

  textarea::-webkit-input-placeholder{
    color: #C8C8C8;
  }
  textarea:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #C8C8C8;
  }
  textarea:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: #C8C8C8;
  }
  .bg-white{
    min-height: calc(100vh - 4.7rem);
    background: @bg-white;
  }
  .card{
    margin-top: 20px;
  }
  .card-item{
    padding: 0 40px 15px 40px;
    height: 80px;
  }
  .card-item-label{
    font-size: 32px;
    color: #333333;
  }
  .card-default-value{
    width: calc(100% - 0.58rem - 2.3rem);
    font-size: 28px;
    color: #999999;
  }
  .apply-desc {
    width: 100%;
    height: 250px;
    padding: 38px;
    border: none;
    outline: none;
    font-size: 28px;
    color: #333333;
  }

  .upload-container {
    padding: 0 0 30px 38px;
  }

  .upload-wrapper {
    width: 100%;
    height: 100px;
    position: relative;
    span{
      line-height: 100px;
      font-size: 28px;
      color: #999999;
      margin-left: 20px;
    }
  }

  .camera-img {
    width: 100px;
    height: 100px;
    max-width: 100%;
    max-height: 100%;
    float: left;
  }

  .upload-submit {
    width: 600px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 32px;
    color: #FFFFFF;
    background: #F39800;
    box-shadow: 0 6px 14px 0 rgba(255,153,62,0.40);
    border-radius: 60px;
    margin: 60px auto;
  }

  .file-list {
    width: 100%;
    padding-left: 38px;
    display: flex;
    flex-wrap: wrap;
  }

  .file-item {
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .file-item:nth-child(3n+3) {
    margin-right: 0;
  }

  .file-item-wrapper {
    position: relative;
  }

  .file-img {
    width: 100px;
    height: 100px;
    display: block;

    .border-radius(4px);
  }

  .file-delete {
    width: 0.5866rem;
    height: 0.5866rem;
    position: absolute;
    right: -0.2933rem;
    top: -0.2933rem;
    z-index: 1000;
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
  .choose-time{
    height: 110px;
    line-height: 110px;
    .vux-no-group-title{
      margin-top: 0;
    }
  }
  .vux-popup-header{
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 0.4rem;
  }
</style>
