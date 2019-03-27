<template>
  <div class="container-with-bar">
    <div v-if="serviceType == 1">
      <div class="card" @click="jumpLink('/user/verify')">
        <div class="card-item">
          <div class="card-item-label">申请人姓名</div>
          <div class="card-default-value">{{ oldName }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="card-item">
          <div class="card-item-label">手机号</div>
          <div class="card-default-value">{{ oldPhone }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
      </div>
      <div class="card">
        <div class="card-item">
          <div class="card-item-label">所患疾病</div>
          <input type="" name="" v-model="diseaseDescription" maxlength="30" placeholder="必填">
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
        </div>
        <div class="card-item">
          <div class="card-item-label">所需服务</div>
          <div class="card-default-value">{{ service }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
        </div>
        <div class="card-item address-picker-trigger" @click="chooseHomeMiniAddress">
          <div class="card-item-label">所在城市</div>
          <div :class="homeAddress ? 'card-item-value' : 'card-default-value'">{{ homeAddress ? homeAddress : '必选' }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="card-item" @click="chooseHospitalAddress">
          <div class="card-item-label">期望就诊城市</div>
          <div :class="hosAddress ? 'card-item-value' : 'card-default-value'">{{ hosAddress ? hosAddress : '必填' }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="card-item" @click="medicalChooseShow = true">
          <div class="card-item-label">就医需求确认</div>
          <div class="card-default-value">必填</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="medical-list" v-if="medicalChoosed.length > 0">
          <div class="medical-item" v-for="name in medicalChoosed">{{ name }}</div>
        </div>
      </div>
      <div class="card">
        <textarea class="apply-desc" v-model="remark" maxlength="200" placeholder="请输入相关描述，如病情描述、既往就诊情况、备注信息"></textarea>
      </div>
    </div>
    <div v-if="serviceType == 2">
      <div class="card" @click="jumpLink('/user/verify')">
        <div class="card-item">
          <div class="card-item-label">申请人姓名</div>
          <div class="card-default-value">{{ oldName }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="card-item">
          <div class="card-item-label">手机号</div>
          <div class="card-default-value">{{ oldPhone }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
      </div>
      <div class="card">
        <div class="card-item">
          <div class="card-item-label">所患疾病</div>
          <input type="" name="" v-model="diseaseDescription" maxlength="30" placeholder="必填">
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
        </div>
        <div class="card-item" @click="hospitalizationChooseShow = true">
          <div class="card-item-label">住院信息确认</div>
          <div :class="hosChoosedStatus > 0 ? 'card-item-value' : 'card-default-value'">{{ hosChoosedStatus > 0 ? choosedStatusName : '必选' }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="card-item" v-show="hosChoosedStatus == 1 || hosChoosedStatus == 3">
          <div class="card-item-label">医院名称</div>
          <input type="" name="" maxlength="10" v-model="hospitalName" placeholder="必填">
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
        </div>
        <div class="card-item hospital-date-trigger" v-show="hosChoosedStatus == 1">
          <div class="card-item-label">入院时间</div>
          <div :class="hosChooseTime ? 'card-item-value' : 'card-default-value'">{{ hosChooseTime ? hosChooseTime : '必选' }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="card-item" @click="medicalChooseShow = true">
          <div class="card-item-label">就医需求确认</div>
          <div class="card-default-value">必填</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="medical-list" v-if="medicalChoosed.length > 0">
          <div class="medical-item" v-for="name in medicalChoosed">{{ name }}</div>
        </div>
        <!-- <div class="card-item address-picker-trigger" @click="chooseHomeAddress">
          <div class="card-item-label">所在城市</div>
          <div :class="homeAddress ? 'card-item-value' : 'card-default-value'">{{ homeAddress ? homeAddress : '必选' }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div> -->
      </div>
      <div class="card">
        <div class="card-item" @click="socialSecurityTypeChooseShow = true">
          <div class="card-item-label">社保信息</div>
          <div :class="socialSecurityTypeChoosed > 0 ? 'card-item-value' : 'card-default-value'">{{ socialSecurityTypeChoosed > 0 ? socialSecurityTypeName : '必选' }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="card-item" @click="chooseSocialSecurityAddress">
          <div class="card-item-label">社保归属地</div>
          <div :class="socialSecurityAddress ? 'card-item-value' : 'card-default-value'">{{ socialSecurityAddress ? socialSecurityAddress : '必填' }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
      </div>
      <div class="card">
        <div class="card-desc-item">
          <div class="card-desc-label">备注</div>
          <textarea class="apply-desc" v-model="remark" maxlength="200" placeholder="请输入相关描述，如病情描述、既往就诊情况、备注信息"></textarea>
        </div>
      </div>
    </div>
    <div v-if="serviceType == 3">
      <div class="card" @click="jumpLink('/user/verify')">
        <div class="card-item">
          <div class="card-item-label">申请人姓名</div>
          <div class="card-default-value">{{ oldName }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="card-item">
          <div class="card-item-label">手机号</div>
          <div class="card-default-value">{{ oldPhone }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
      </div>
      <div class="card">
        <div class="card-item">
          <div class="card-item-label">所患疾病</div>
          <input type="" name="" v-model="diseaseDescription" maxlength="30" placeholder="必填">
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
        </div>
        <div class="card-item" @click="consultChooseShow = true">
          <div class="card-item-label">咨询需求</div>
          <div class="card-default-value">必选</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="medical-list medical-list-bordered" v-if="consultChoosed.length > 0">
          <div class="medical-item" v-for="name in consultChoosed">{{ name }}</div>
        </div>
        <div class="card-desc-item">
          <div class="card-desc-label">备注</div>
          <textarea class="apply-desc" placeholder="请输入相关描述，如病情描述、既往就诊情况、备注信息" maxlength="200" v-model="remark"></textarea>
        </div>
      </div>
      <div class="card-piece">如需诊断报告邮寄，请填写以下地址</div>
      <div class="card card-no-margin">
        <div class="card-item">
          <div class="card-item-label">收货人姓名</div>
          <input type="" name="" placeholder="选填" maxlength="5" v-model="username">
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
        </div>
        <div class="card-item">
          <div class="card-item-label">电话</div>
          <input type="" name="" placeholder="选填" v-model="phone">
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right arrow-none">
        </div>
        <div class="card-item address-picker-trigger" @click="chooseHomeAddress">
          <div class="card-item-label">地区</div>
          <div :class="homeAddress ? 'card-item-value' : 'card-default-value'">{{ homeAddress ? homeAddress : '选填' }}</div>
          <img src="../../../assets/images/icon_arrow_r@2x.png" class="icon-arrow-right">
        </div>
        <div class="card-desc-item">
          <div class="card-desc-label">详细地址</div>
          <textarea class="apply-desc" placeholder="选填" maxlength="30" v-model="addressDetail"></textarea>
        </div>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="apply-submit" @click="applyNow">立即申请</div>
    </div>
    <ConsultRequirement
      v-show="consultChooseShow"
      @consultSubmit="consultSubmit"
    />
    <MedicalRequirement
      v-show="medicalChooseShow"
      @medicalSubmit="medicalSubmit"
    />
    <HospitalizationList
      @hosChooseConfirm="hosChooseConfirmHandler"
      @hosChooseCancel="hosChooseCancelHandler"
      v-show="hospitalizationChooseShow"
    />
    <SocialSecurityType
      @socialSecurityTypeConfirm="socialSecurityTypeConfirm"
      @socialSecurityTypeCancel="socialSecurityTypeCancel"
      v-show="socialSecurityTypeChooseShow"
    />
    <ServiceList
      @serviceChooseCancel="serviceChooseCancelHandler"
      @serviceChooseConfirm="serviceChooseConfirmHandler"
      v-show="serviceChooseShow"
    />
    <Address
      @addressConfirm="addressConfirmHandler"
      @addressCancel="addressCancelHandler"
      :addressChooseShow="addressChooseShow"
    />
    <AddressMini
      @addressConfirm="addressMiniConfirmHandler"
      @addressCancel="addressMiniCancelHandler"
      :addressChooseShow="addressMiniChooseShow"
    />
  </div>
</template>

<script>
  import ConsultRequirement from '@/components/service/ConsultRequirement';
  import MedicalRequirement from '@/components/service/MedicalRequirement';
  import HospitalizationList from '@/components/service/HospitalizationList';
  import SocialSecurityType from '@/components/service/SocialSecurityType';
  import ServiceList from '@/components/service/ServiceList';
  import Address from '@/components/service/Address';
  import AddressMini from '@/components/service/AddressMini';

  import {
    appointmentInHospital, // 添加预约住院
    bespeakOperation,// 添加预约手术
    BespeakOutpatient,// 添加预约门诊
    depositSpot,//添加押金垫付
    twoDiagnosis //添加二次诊疗订单
  } from '@/api';
  import {
    mapState
  } from 'vuex';
  const HOME_ADDRESS = 1;
  const HOSPITAL_ADDRESS = 2;
  const SOCIAL_SECURITY_ADDRESS = 3;

  const HOSPITAL_APPO_STATUS = ['已确认住院医院及时间', '未确认住院医院及时间', '已确认住院医院，未确认时间'];
  const SOCIAL_SECURITY_TYPE = ['有社保，社保状态正常', '无法正常使用社保'];

  const getAddressCode = function (address) {
    return address.split(',')[0];
  };

  const getAddressName = function (address) {
    return address.split(',')[1];
  };

  export default {
    data () {
      return {
        oldNumber: '',
        oldName: '',
        avatar: '',
        oldPhone: '',
        addressType: 0,
        serviceId: '',
        service: '',
        serviceType: 0,
        username: '',
        homeAddress: '',
        hosAddress: '',
        hosChoosedStatus: 0,
        socialSecurityAddressCode: '',
        socialSecurityAddress: '',
        addressDetail: '',
        homeAddressCode: '',
        hosAddressCode: '',
        diseaseDescription: '',
        socialSecurityInfo: '',
        socialSecurityTypeChoosed: '',
        hospitalName: '',
        hosChooseTime: '',
        remark: '',
        phone: '',
        expectRemark: '',
        addressChooseShow: false,
        addressMiniChooseShow: false,
        consultChooseShow: false,
        medicalChooseShow: false,
        hospitalizationChooseShow: false,
        socialSecurityTypeChooseShow: false,
        serviceChooseShow: false,
        consultChoosed: [],
        medicalChoosed: [],
        serviceChoosedId: '',
        serviceChoosedName: ''
      }
    },
    mounted () {
      document.title = '服务申请';
      this.serviceType = this.$route.params.type;
      this.serviceId = this.$route.params.service;
      if(this.serviceType == 1){
        if(this.serviceId == '0001'){
          this.service = '预约门诊'
        }else if(this.serviceId == '0002'){
          this.service = '预约手术'
        }else {
          this.service = '预约住院'
        }
      }
      if (this.serviceType == 2) {
        this.serviceChoosedId = '0005';
      } else if (this.serviceType == 3) {
        this.serviceChoosedId = '0004';
      }
      this.initUserinfo();
      this.$nextTick(() => {
        this.initPicker();
      });
    },
    methods: {
      initUserinfo () {
        if (this.userinfo) {
          this.oldPhone = this.userinfo.phone;
          this.oldName = this.userinfo.name;
          this.oldNumber = this.userinfo.idNumber;
        } else {
          this.$router.push('/signin?redirect='+encodeURIComponent(this.$route.path));
        }
      },
      initPicker () {
        const that = this;
        const selectDate = new MobileSelectDate();
        selectDate.init({
          trigger: '.hospital-date-trigger',
          value: '',
          max: `${new Date().getFullYear()+6}/${new Date().getMonth()}/${new Date().getDate()}`,
          position: 'bottom',
          title: '选择入院时间',
          callback:function(){
              that.hosChooseTime = $('.hospital-date-trigger').attr('data-value').replace(/,/g, '-');
          }
        })
      },
      jumpLink(url) {
        this.$router.push(url);
      },
      applyNow () {
        const {
          username,
          addressDetail,
          hosAddress,
          hosAddressCode,
          homeAddress,
          homeAddressCode,
          diseaseDescription,
          serviceChoosedId,
          consultChoosed,
          serviceId,
          serviceChoosedName,
          socialSecurityTypeChoosed,
          socialSecurityAddressCode,
          medicalChoosed,
          hosChooseTime,
          hospitalName,
          expectRemark,
          phone,
          remark
        } = this;
        this.followProductId = this.$route.params.followProductId;
        //后端对应了五个接口...
        /*if (!serviceChoosedId) {
          if (!serviceChoosedId) {
            this.$yjToast('请选择所需服务！');
            return;
          }
        }*/
        if (serviceId == '0001') {
          if (!diseaseDescription) {
            this.$yjToast('请填写所患疾病！');
            return;
          }
          /*if (!serviceChoosedId) {
            this.$yjToast('请选择所需服务！');
            return;
          }*/
          if (!homeAddress) {
            this.$yjToast('请选择所在城市！');
            return;
          }
          if (!hosAddress) {
            this.$yjToast('请选择期望就诊城市！');
            return;
          }
          if (medicalChoosed.length <= 0) {
            this.$yjToast('请选择就医需求！');
            return;
          }
          // if (!remark) {
          //   this.$yjToast('请填写相关描述！');
          //   return;
          // }
          BespeakOutpatient(hosAddressCode.split(',')[0], hosAddressCode.split(',')[1], '', diseaseDescription, medicalChoosed.toString(), homeAddressCode, remark, this.followProductId).then(data => {
            if (data.data.success == 'OK') {
              console.log(this.$router);
              this.$router.replace({ path: '/service/success/'+data.data.data.orderNumber });
              this.$yjToast('添加成功！');
            } else {
              this.$yjToast(data.data.message);
            }
          });
        } else if (serviceId == '0002') {
          if (!diseaseDescription) {
            this.$yjToast('请填写所患疾病！');
            return;
          }
          /*if (!serviceChoosedId) {
            this.$yjToast('请选择所需服务！');
            return;
          }*/
          if (!homeAddress) {
            this.$yjToast('请选择所在城市！');
            return;
          }
          if (medicalChoosed.length <= 0) {
            this.$yjToast('请选择就医需求！');
            return;
          }
          // if (!remark) {
          //   this.$yjToast('请填写相关描述！');
          //   return;
          // }
          bespeakOperation(hosAddressCode.split(',')[0], hosAddressCode.split(',')[1], '', diseaseDescription, medicalChoosed.toString(), homeAddressCode, remark,this.followProductId).then(data => {
            if (data.data.success == 'OK') {
              this.$router.replace({ path: `/service/success/${data.data.data.orderNumber}` });
              this.$yjToast('添加成功！');
            } else {
              this.$yjToast(data.data.message);
            }
          });
        } else if (serviceId == '0003') {
          if (!diseaseDescription) {
            this.$yjToast('请填写所患疾病！');
            return;
          }
          /*if (!serviceChoosedId) {
            this.$yjToast('请选择所需服务！');
            return;
          }*/
          if (!homeAddress) {
            this.$yjToast('请选择所在城市！');
            return;
          }
          if (medicalChoosed.length <= 0) {
            this.$yjToast('请选择就医需求！');
            return;
          }
          // if (!remark) {
          //   this.$yjToast('请填写相关描述！');
          //   return;
          // }
          appointmentInHospital(hosAddressCode.split(',')[0], hosAddressCode.split(',')[1], '', diseaseDescription, medicalChoosed.toString(), homeAddressCode, remark,this.followProductId).then(data => {
            if (data.data.success == 'OK') {
              this.$router.replace({ path: `/service/success/${data.data.data.orderNumber}` });
              this.$yjToast('添加成功！');
            } else {
              this.$yjToast(data.data.message)
            }
          });
        } else if (serviceChoosedId == '0004') {
          if (!diseaseDescription) {
            this.$yjToast('请填写所患疾病！');
            return;
          }
          if (consultChoosed.length <= 0) {
            this.$yjToast('请选择咨询需求！');
            return;
          }
          // if (!remark) {
          //   this.$yjToast('请填写相关描述！');
          //   return;
          // }
          // if (!username) {
          //   this.$yjToast('请填写邮寄收件人姓名！');
          //   return;
          // }
          // if (!phone) {
          //    this.$yjToast('请填写邮寄收件人电话号码！');
          //   return;
          // }
          if (phone && !/^1[34578]\d{9}$/.test(phone)) {
            this.$yjToast('请输入正确的手机号！');
            return;
          }
          // if (!homeAddress) {
          //   this.$yjToast('请填写邮寄城市！');
          //   return;
          // }
          // if (!addressDetail) {
          //   this.$yjToast('请填写邮寄详细地址！');
          //   return;
          // }
          twoDiagnosis(diseaseDescription, consultChoosed.toString(), remark, username, phone, homeAddressCode, addressDetail,this.followProductId).then(data => {
            if (data.data.success == 'OK') {
              this.$router.replace({ path: `/service/success/${data.data.data.orderNumber}` });
              this.$yjToast('添加成功！');
            } else {
              this.$yjToast(data.data.message);
            }
          });
        } else if (serviceChoosedId == '0005') {
          if (!diseaseDescription) {
            this.$yjToast('请填写所患疾病！');
            return;
          }
          if (medicalChoosed.length <= 0) {
            this.$yjToast('请选择就医需求！');
            return;
          }
          // if (!remark) {
          //   this.$yjToast('请填写相关描述！');
          //   return;
          // }
          if (socialSecurityTypeChoosed < 0) {
            this.$yjToast('请选择社保信息！');
            return;
          }
          if (!socialSecurityAddressCode) {
            this.$yjToast('请选择社保归属地！');
            return;
          }
          depositSpot(diseaseDescription, medicalChoosed.toString(), hospitalName, hosChooseTime, SOCIAL_SECURITY_TYPE[this.socialSecurityTypeChoosed-1], socialSecurityAddressCode, remark,this.followProductId).then(data => {
            if (data.data.success == 'OK') {
              this.$router.replace({ path: `/service/success/${data.data.data.orderNumber}` });
              this.$yjToast('添加成功！');
            } else {
              this.$yjToast(data.data.message);
            }
          });
        }
      },
      chooseHomeAddress () {
        this.addressChooseShow = true;
        this.addressType = HOME_ADDRESS;
      },
      chooseHomeMiniAddress () {
        this.addressMiniChooseShow = true;
        this.addressType = HOME_ADDRESS;
      },
      chooseHospitalAddress () {
        this.addressMiniChooseShow = true;
        this.addressType = HOSPITAL_ADDRESS;
      },
      chooseSocialSecurityAddress () {
        this.addressChooseShow = true;
        this.addressType = SOCIAL_SECURITY_ADDRESS;
      },
      consultSubmit (data) {
        this.consultChooseShow = false;
        this.consultChoosed = data;
      },
      medicalSubmit (data) {
        this.medicalChooseShow = false;
        this.medicalChoosed = data;
      },
      hosChooseCancelHandler () {
        this.hospitalizationChooseShow = false;
      },
      hosChooseConfirmHandler (data) {
        this.hosChoosedStatus = data.choosedStatus;
        this.hospitalizationChooseShow = false;
      },
      serviceChooseCancelHandler () {
        this.serviceChooseShow = false;
      },
      serviceChooseConfirmHandler (data) {
        this.serviceChooseShow = false;
        this.serviceChoosedId = data.id;
        this.serviceChoosedName = data.name;
      },
      socialSecurityTypeCancel () {
        this.socialSecurityTypeChooseShow = false;
      },
      socialSecurityTypeConfirm (data) {
        this.socialSecurityTypeChoosed = data.choosedStatus;
        this.socialSecurityTypeChooseShow = false;
      },
      addressConfirmHandler (data) {
        console.log(data)
        const { addressType } = this;
        if (addressType == HOME_ADDRESS) {
          this.homeAddressCode = `${getAddressCode(data.provinceChoosed)},${getAddressCode(data.cityChoosed)},${getAddressCode(data.areaChoosed)}`;
          this.homeAddress = `${getAddressName(data.provinceChoosed)},${getAddressName(data.cityChoosed)},${getAddressName(data.areaChoosed)}`;
        } else if (addressType == HOSPITAL_ADDRESS) {
          this.hosAddressCode = `${getAddressCode(data.provinceChoosed)},${getAddressCode(data.cityChoosed)},${getAddressCode(data.areaChoosed)}`;
          this.hosAddress = `${getAddressName(data.provinceChoosed)},${getAddressName(data.cityChoosed)},${getAddressName(data.areaChoosed)}`;
        } else if (addressType == SOCIAL_SECURITY_ADDRESS) {
          this.socialSecurityAddressCode = `${getAddressCode(data.provinceChoosed)},${getAddressCode(data.cityChoosed)},${getAddressCode(data.areaChoosed)}`;
          this.socialSecurityAddress = `${getAddressName(data.provinceChoosed)},${getAddressName(data.cityChoosed)},${getAddressName(data.areaChoosed)}`;
        }
      },
      addressCancelHandler () {
        document.body.style.overflowY = 'auto';
        this.addressChooseShow = false;
      },
      addressMiniConfirmHandler (data) {
        console.log(data)
        const { addressType } = this;
        if (addressType == HOME_ADDRESS) {
          this.homeAddressCode = `${getAddressCode(data.provinceChoosed)},${getAddressCode(data.cityChoosed)}`;
          this.homeAddress = `${getAddressName(data.provinceChoosed)},${getAddressName(data.cityChoosed)}`;
        } else if (addressType == HOSPITAL_ADDRESS) {
          this.hosAddressCode = `${getAddressCode(data.provinceChoosed)},${getAddressCode(data.cityChoosed)}`;
          this.hosAddress = `${getAddressName(data.provinceChoosed)},${getAddressName(data.cityChoosed)}`;
        } else if (addressType == SOCIAL_SECURITY_ADDRESS) {
          this.socialSecurityAddressCode = `${getAddressCode(data.provinceChoosed)},${getAddressCode(data.cityChoosed)},${getAddressCode(data.areaChoosed)}`;
          this.socialSecurityAddress = `${getAddressName(data.provinceChoosed)},${getAddressName(data.cityChoosed)},${getAddressName(data.areaChoosed)}`;
        }
      },
      addressMiniCancelHandler () {
        document.body.style.overflowY = 'auto';
        this.addressMiniChooseShow = false;
      }
    },
    watch: {
      consultChooseShow (newVal) {
        if (newVal) {
          document.body.style.overflowY = 'hidden';
        } else {
          document.body.style.overflowY = 'auto';
        }
      },
      addressChooseShow (newVal) {
        if (newVal) {
          document.body.style.overflowY = 'hidden';
        } else {
          document.body.style.overflowY = 'auto';
        }
      },
      userinfo: {
        handler (newValue) {
          this.initUserinfo();
        },
        deep: true
      }
    },
    computed: {
       choosedStatusName () {
        return HOSPITAL_APPO_STATUS[this.hosChoosedStatus-1];
      },
      socialSecurityTypeName () {
        return SOCIAL_SECURITY_TYPE[this.socialSecurityTypeChoosed-1];
      },
      ...mapState([
        'userinfo'
      ])
    },
    components: {
      ConsultRequirement,
      MedicalRequirement,
      HospitalizationList,
      SocialSecurityType,
      ServiceList,
      Address,
      AddressMini
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/styles/base.less';

  .apply-submit {
    width: 100%;
    height: 1.3333rem;
    line-height: 1.3rem;
    text-align: center;
    background: @bg-orange;
    color: @text-color-white;
  }

  .apply-desc {
    width: 100%;
    height: 4.7733rem;
    padding: 0.32rem;
    border: none;
    outline: none;
    font-size: 0.3733rem;
  }

  .medical-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.18rem 0.32rem 0.5066rem 0.32rem;
    font-size: 0.3733rem;
    color: #A7A7A7;
  }

  .medical-item {
    background: @bg-default;
    padding: 0.2933rem 0.9066rem;
    margin-top: 0.32rem;

    .border-radius(0.5066rem);
  }

  .card-item-select {

    .icon-arrow-right {
      margin-left: 0.2666rem;
    }
  }

  .social-security-select {
    text-align: right;
    margin-left: auto;
    height: 100%;
    border: none;
    outline: none;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;

    option {
      text-align: right;
    }
  }

  .medical-list-bordered {
    border-bottom: 1px solid #EBECF1;
  }
</style>
