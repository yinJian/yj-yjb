<template>
  <div>
    <p class="tips">温馨提示:：为保证通话质量，提交订单时请详细描述病情，并上
      传近期检查报告或医嘱，若为他人咨询，提前充分了解患者病情</p>
    <div class="apply_card">
      <div class="apply_card_item">
        <div class="apply_card_label">您要为谁咨询</div>
        <div class="arrow_rg">
          <img src="../../../../assets/images/icon_arrow_r@2x.png" alt="">
        </div>
        <select class="card_data" v-model="fromCon.whoChoosed" :class="{'select_value' : fromCon.whoChoosed != 0}">
          <option value="0">请选择</option>
          <option value="自己">自己</option>
          <option value="配偶">配偶</option>
          <option value="父母">父母</option>
          <option value="子女">子女</option>
        </select>
      </div>
      <div class="apply_card_item">
        <div class="apply_card_label">性别</div>
        <div class="arrow_rg">
          <img src="../../../../assets/images/icon_arrow_r@2x.png" alt="">
        </div>
        <select class="card_data select_value" v-model="fromCon.insured_sex">
          <option value="0">男</option>
          <option value="1">女</option>
        </select>
      </div>
      <div class="apply_card_item">
        <div class="apply_card_label">年龄(岁)</div>
        <div class="card_data">
          <input v-model="fromCon.insured_age" placeholder="请输入数字" maxlength="3"/>
        </div>
      </div>
      <div class="apply_card_item">
        <div class="apply_card_label">接听电话</div>
        <div class="card_data">
          <input v-model="fromCon.insured_phone" placeholder="请输入电话" maxlength="11"/>
        </div>
      </div>
      <p style="height: 10px;background:#f1f1f1;"></p>
      <div class="apply_card_item" >
        <div class="apply_card_label">科室</div>
        <div class="arrow_rg">
          <img src="../../../../assets/images/icon_arrow_r@2x.png" alt="">
        </div>
        <select class="card_data" v-model="fromCon.sectionChoosed" :class="{'select_value' : fromCon.sectionChoosed != 0}">
        <option value="0">请选择</option>
        <option value="全科">全科</option>
        <option value="儿科">儿科</option>
        <option value="营养科">营养科</option>
      </select>
      </div>
      <div class="card-desc-item">
        <textarea
          class="apply-desc"
          v-model="fromCon.symptomDescription"
          maxlength="200"
          placeholder="不支持输入表情包!!!  请详细描述不舒服部位、主要症状、持续时间、全面的信息可以让您获得医生更准确详细的回答"></textarea>
      </div>
      <div class="file-list">
        <div class="file-item" ref="item" @click="previewImgHandler(enclosureUrl)" v-for="(enclosureUrl, file_index) in enclosure" :key="file_index">
          <div class="file-item-wrapper">
            <img src="../../../../assets/images/icon_close@2x.png" class="file-delete" @click.stop="deleteHandler(file_index)">
            <img :src="enclosureUrl" class="file-img" >
          </div>
        </div>
      </div>
      <div class="upload-container" @click="$refs.img_upload.click()">
        <div class="upload-wrapper">
        <!-- <div class="upload-wrapper" @click="uploadMainFile"> -->
          <input type="file" v-show="false" accept="image/*"  ref="img_upload" @change="uploadMainFile">
          <img src="../../../../assets/images/camera1.png" class="camera-img">
          <span v-if="enclosure.length == 0">点击添加图片</span>
        </div>
      </div>
    </div>
    <div class="upload-submit" @click="finishHandler">提交</div>
    <!-- 图片预览 -->
    <div class="img-preview-wrapper" v-show="previewShow" @click="previewShow = false">
      <div class="img-preview-cover"></div>
      <div class="img-preview-content">
        <img :src="previewImg">
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {API_URL} from "../../../../assets/scripts/utils"
  import {
    phoneFindFile,
    huataiCreateOrderMain,
    phoneSaveFile,
    huataiSaveFile,  // 华泰单独上传文件接口
    deleteFile,
    // initJssdk,
    getOrderInfo  // 获取用户id
  } from '@/api';

  export default {
    data () {
      return {
        fromCon : {   // 表单内容
          whoChoosed : '0',
          insured_sex: '0',
          insured_age: '',
          insured_phone: '',
          sectionChoosed: '0',
          symptomDescription: '',
        },
        userId : '',    // 用户id
        orderId: '',    // 订单id
        enclosure: [],   // 图片

        previewImg: '',  // 预览图片
        previewShow: false,
      }
    },
    mounted () {
      document.title = '问诊';
      // 解析 url
      let url = window.location.hash
      let param = url.split("?")[1]
      let arr = param.split("&");
      let obj = {};
      for(let i=0;i<arr.length;i++){
        let arr_param = arr[i].split("=");
        this.fromCon[arr_param[0]] = arr_param[1];
      }

      // 初始化订单 id
      this.orderId = this.GenNonDuplicateID()

      // 查询保单号对应的用户 id
      getOrderInfo(this.fromCon.policy_number)
      .then(res => {
        if (res.data.code == 200) {
          if (res.data.data) {
            this.userId = res.data.data.userId
            window.sessionStorage.setItem('userId', this.userId)
          }else {
            alert('您暂时没有使用电话医生权限，请与客服确认')
            window.history.go(-1)
          }
        }
      })
    },
    methods: {
      GenNonDuplicateID() {
        var idStr="";  //订单号
        for(var i=0;i<6;i++) //6位随机数，用以加在时间戳后面。
        {
          idStr += Math.floor(Math.random()*10);
        }
        idStr = new Date().getTime() + idStr;  //时间戳，用来生成订单号。
        return idStr
      },

      // 上传图片
      uploadMainFile() {
        let imgOrg = this.$refs.img_upload.files[0]
        this.imgCompress(imgOrg)
        },

      // 删除图片
      deleteHandler(index) {
        this.$refs.item[index].remove()
      },

      // 压缩 并 上传图片
      imgCompress(file) {
        let self = this;
        if (!file || !window.FileReader) return;
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend =  function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              upImg(this.result)
            }else {
              img.onload = function () {
                let src = compress(img);
                upImg(src);
              }
            }
          }
          // 压缩
          function compress(img) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext('2d');
                //瓦片canvas
            let tCanvas = document.createElement("canvas");
            let tctx = tCanvas.getContext("2d");
            let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            let ratio;
            if ((ratio = width * height / 4000000) > 1) {
                console.log("大于400万像素")
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            //   铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            let count;
            if ((count = width * height / 1000000) > 1) {
                console.log("超过100W像素");
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
              //  计算每块瓦片的宽和高
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                for (let j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
                }
              } else {
                  ctx.drawImage(img, 0, 0, width, height);
              }
              //进行最小压缩
              let ndata = canvas.toDataURL('image/jpeg', 0.3);
              tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
              return ndata;
            }
          
          // 上传
          function upImg(src) {
            const data = {
                fileBase64: src,
                enclosureType: '04',
                mobile : self.orderId
              }
            axios({
              method: 'post',
              url: API_URL + '/newsystem/nurseUploadfileH5',
              data: data,
              transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
            .then((res) => {
              let data = res.data
              if (data.code == 200) {
                self.$yjToast('文件上传成功！');
                self.enclosure.push(data.data)
              } else {
                self.$yjToast(data.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          self.$refs.img_upload.value = null
        }
      },

      // 预览图片
      previewImgHandler (img) {
        this.previewImg = img;
        this.previewShow = true;
      },

      // 提交表单
      finishHandler () {
        let {
          symptomDescription,
          sectionChoosed,
          insured_sex,
          insured_age,
          insured_phone,
          whoChoosed
        } = this.fromCon;

        if(whoChoosed == '0'){
          this.$yjToast('请选择您要为谁咨询！')
          return
        }
        if(!insured_sex){
          this.$yjToast('请填写性别！')
          return
        }
        if(!insured_age){
          this.$yjToast('请填写年龄！')
          return
        }
        if(!/^([0-9]|[1-9][0-9]{1,2})$/.test(insured_age)){
          this.$yjToast('请填写真实年龄！')
          return
        }
        if(!insured_phone){
          this.$yjToast('请填电话！')
          return
        }
        if(sectionChoosed == '0'){
          this.$yjToast('请选择科室！')
          return
        }
        if(!symptomDescription){
          this.$yjToast('请填写症状描述！')
          return
        }

        this.fromCon.tranSymptom = symptomDescription.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')
        // createOrderMain(legalConsultationQuestion,this.oldPhone,sectionChoosedName,this.orderId,insured_sex,insured_age,whoChoosedName)
        huataiCreateOrderMain(this.orderId, this.fromCon).then(data => {
          if (data.data.code == '200') {
            this.$router.push('huataiTelDoctorSuccess/' + this.fromCon.open_id);
          } else {
            this.$yjToast(data.data.msg);
          }
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/styles/base.less';

  // 提示
  .tips {
    text-align: left;
    font-size: 24px;
    color: #F39700;
    line-height: 28px;
    padding: 20px 34px;
    background: #FFF8E6;
    height: 98px;
  }

  // 表单列表
  .apply_card {
    background: #fff;
    margin-bottom: 98px;
    .apply_card_item{
      position: relative;
      padding: 32px 40px;
      height: 110px;
      line-height: 50px;
      border-bottom: #e1e1e1 1px solid;
      .arrow_rg {
        float: right;
        width: 30px;
        height: 100%;
        padding: 7px;
        padding-top: 3px;
        margin-left: 8px;
      }
      img {
        width: 100%;
      }
    }
    .apply_card_label{
      float: left;
      font-size: 32px;
      color: #333333;
    }
    .card_data{
      float: right;
      width: 50%;
      font-size: 28px;
      color: #999999;
      input {
        font-size: 0.373333rem;
        text-align: right;
        border: none;
        outline-style: none;
      }
    }
    select {
      outline-style: none;
      border: none;
      direction: rtl;
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
    }
    input, select {
      background: #fff;
    }
    .select_value {
      color: #000;
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
  }

  textarea::-webkit-input-placeholder{
    color: #C8C8C8;
  }
  textarea:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #C8C8C8;
  }
  textarea:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: #C8C8C8;
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
    width: 100%;
    height: 98px;
    line-height: 98px;
    text-align: center;
    font-size: 32px;
    color: #FFFFFF;
    background: #0A5690;
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
    margin: 20px 20px 20px 0;
  }

  // .file-item:nth-child(3n+3) {
  //   margin-right: 0;
  // }

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
      margin-top: 100px; 
    }
  }
</style>