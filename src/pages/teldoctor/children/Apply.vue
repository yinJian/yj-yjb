<template>
   <div>
     <div class="card" style="margin-top: 0">
       <!--<div class="card-item">
         <div class="card-item-label">性别</div>
         <div class="card-default-value">
           <input class="radio" type="radio" id="man" value="0" v-model="sex"> <label for="man">男</label>
           <input class="radio" type="radio" id="woman" value="1" v-model="sex"> <label for="woman">女</label>
         </div>
         <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
       </div>-->
       <p class="tips">温馨提示:：为保证通话质量，提交订单时请详细描述病情，并上
         传近期检查报告或医嘱，若为他人咨询，提前充分了解患者病情</p>
       <div class="card-item" @click="whoChoosedShow = true">
         <div class="card-item-label" style="width: 3rem;">您要为谁咨询</div>
         <div style="width: calc(100% - 0.58rem - 3rem)" :class="whoChoosedName ? 'card-item-value' : 'card-default-value'">{{ whoChoosedName ? whoChoosedName : '请选择' }}</div>
         <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
       </div>
       <div class="card-item" @click="sexChoosedShow = true">
         <div class="card-item-label">性别</div>
         <div :class="sexChoosedName ? 'card-item-value' : 'card-default-value'">{{ sexChoosedName ? sexChoosedName : '请选择' }}</div>
         <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
       </div>
       <div class="card-item">
         <div class="card-item-label">年龄(岁)</div>
         <div class="card-default-value"><input v-model="age" placeholder="请输入数字" maxlength="3"/></div>
         <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
       </div>
       <div class="card-item">
         <div class="card-item-label">接听电话</div>
         <div class="card-default-value"><input v-model="oldPhone" maxlength="11"/></div>
         <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
       </div>
     </div>
     <div class="bg-white">
       <div class="card" style="border-bottom: 0;">
         <div class="card-item" @click="sectionChoosedShow = true">
           <div class="card-item-label">科室</div>
           <div :class="sectionChoosedName ? 'card-item-value' : 'card-default-value'">{{ sectionChoosedName ? sectionChoosedName : '请选择' }}</div>
           <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
         </div>
         <div class="card-desc-item">
           <!-- <div class="card-desc-label">症状描述</div>-->
           <textarea v-model="customerConsultationQuestion" class="apply-desc" maxlength="200" placeholder="不支持输入表情包!!!  请详细描述不舒服部位、主要症状、持续时间、全面的信息可以让您获得医生更准确详细的回答"></textarea>
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
       <div class="upload-submit" @click="finishHandler">提交</div>
     </div>
     <div class="img-preview-wrapper" v-show="previewShow" @click="previewShow = false">
       <div class="img-preview-cover"></div>
       <div class="img-preview-content">
         <img :src="previewImg">
       </div>
     </div>
     <SectionList
       @sectionChooseCancel="sectionChooseCancelHandler"
       @sectionChooseConfirm="sectionChooseConfirmHandler"
       v-show="sectionChoosedShow"
     />
     <SexList
       @sexChooseCancel="sexChooseCancelHandler"
       @sexChooseConfirm="sexChooseConfirmHandler"
       v-show="sexChoosedShow"
     />
     <WhoList
       @whoChooseCancel="whoChooseCancelHandler"
       @whoChooseConfirm="whoChooseConfirmHandler"
       v-show="whoChoosedShow"
     />
   </div>
</template>

<script>
  import SectionList from '@/components/service/SectionList'
  import SexList from '@/components/service/SexList'
  import WhoList from '@/components/service/WhoList'
  import {mapState} from 'vuex'
  import {
    phoneFindFile,
    createOrderMain,
    phoneSaveFile,
    deleteFile,
    initJssdk
  } from '@/api';
  import {getLocalStorage} from "../../../assets/scripts/utils";

  export default {
    data () {
      return {
        configOK: false,
        orderId: '',
        previewShow: false,
        // phone: '',
        enclosure: {},
        whoChoosedName: '',
        whoChoosedShow: false,
        sectionChoosedShow: false,
        sectionChoosedName: '',
        sexChoosedShow: false,
        sexChoosedName: '',
        customerConsultationQuestion: '',
        sex: '',
        age: '',
        oldPhone: '',
        previewImg: '',
      }
    },
    mounted () {
      document.title = '问诊';
      /*var timestamp = (new Date()).getTime();
      this.orderId = JSON.stringify(timestamp);*/
      this.orderId = this.GenNonDuplicateID()
      console.log(this.orderId)
      this.initJssdk();
      if (this.orderId) {
        this.getOrderDetail();
      }
      this.oldPhone = this.userinfo.phone
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
        /*let idStr = Date.now().toString(36)
        idStr += Math.random().toString(36).substr(3)*/
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
      parseIntSex(){
        if(this.sexChoosedName == '男'){
          return this.sex = '0'
        }else if(this.sexChoosedName == '女'){
          return this.sex = '1'
        }else {
          return this.sex = NaN
        }
      },
      finishHandler () {
        let {
          customerConsultationQuestion,
          sectionChoosedName,
          sex,
          age,
          whoChoosedName
        } = this;
        if(!sex){
          this.$yjToast('请填写性别！')
          return
        }
        if(!age){
          this.$yjToast('请填写年龄！')
          return
        }
        if(!/^([0-9]|[1-9][0-9]{1,2})$/.test(age)){
          this.$yjToast('请填写真实年龄！')
          return
        }
        if(!customerConsultationQuestion){
          this.$yjToast('请填写症状描述！')
          return
        }
        if(!sectionChoosedName){
          this.$yjToast('请选择科室！')
          return
        }
        if(!whoChoosedName){
          this.$yjToast('请选择您要为谁咨询！')
          return
        }
        const sexToNum = parseInt(sex)
        const legalConsultationQuestion = customerConsultationQuestion.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')
        createOrderMain(legalConsultationQuestion,this.oldPhone,sectionChoosedName,this.orderId,sexToNum,age,whoChoosedName).then(data => {
          console.log(data)
          if (data.data.code == '200') {
            console.log(data)
            this.$router.push('success');
          } else {
            this.$yjToast(data.data.msg);
          }
        })
      },
      whoChooseCancelHandler () {
        this.whoChoosedShow = false;
      },
      whoChooseConfirmHandler (data) {
        this.whoChoosedShow = false;
        this.whoChoosedName = data.name;
      },
      sectionChooseCancelHandler () {
        this.sectionChoosedShow = false;
      },
      sectionChooseConfirmHandler (data) {
        this.sectionChoosedShow = false;
        this.sectionChoosedName = data.name;
      },
      sexChooseCancelHandler () {
        this.sexChoosedShow = false;
      },
      sexChooseConfirmHandler (data) {
        this.sexChoosedShow = false;
        this.sexChoosedName = data.name;
        this.parseIntSex()
      }
    },
    components: {
      SectionList,
      SexList,
      WhoList
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
    min-height: calc(100vh - 7.5rem);
    background: @bg-white;
  }
  .card{
    margin-top: 20px;
  }
  .card-item{
    padding: 0 40px;
    height: 110px;
    line-height: 110px;
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
    width: 750px;
    height: 98px;
    line-height: 98px;
    text-align: center;
    font-size: 32px;
    color: #FFFFFF;
    background: #F39800;
    box-shadow: 0 -4px 10px 0 rgba(78,0,0,0.08);
    position: fixed;
    bottom: 0;
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
  .tips {
    text-align: left;

    font-size: 24px;
    color: #F39700;
    line-height: 28px;
    padding: 20px 34px;
    background: #FFF8E6;
    height: 98px;
  }

</style>
