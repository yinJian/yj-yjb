import axios from 'axios';
import Vue from 'vue';
import { API_URL, APP_URL, getLocalStorage} from '../assets/scripts/utils.js';

const REQ_INSTANCE = axios.create({
	timeout: 50000,
	withCredentials: true,
	baseURL: API_URL
});

/**
 * [请求统一处理代码]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
REQ_INSTANCE.interceptors.request.use(config => {
	Vue.yjToast('加载中...');

	// 线上
	config.data['openid'] = getLocalStorage('access_token') || '1234';
  config.data['openId'] = getLocalStorage('access_token') || '1234';
	config.data['userId'] = JSON.parse(getLocalStorage('uid'));
	config.data['wechatOpenId'] = getLocalStorage('access_token') || '1234';

	// 华泰接口储存用户 id
	let userId = window.sessionStorage.getItem('userId')
	if (userId) {
		config.data['userId'] = userId
	}

	// 本地
  // config.data['openid'] = '1234';
  // config.data['openId'] = '1234';
  // config.data['userId'] = JSON.parse(getLocalStorage('uid'));
  // config.data['wechatOpenId'] = '1234';

  //console.log(config);
	return config;
}, error => {
	console.log(error);
	return Promise.reject(error)
})

/**
 * [响应统一处理代码]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
REQ_INSTANCE.interceptors.response.use(response => {
	Vue.yjToast.end();
	if (response.status > 300) {
		Vue.yjToast('服务器出错，请联系客服！');
	}
	return response;
}, error => {
	return Promise.reject(error)
})


/**
 * [获取优加服务列表]
 * @return {[type]} [description]
 */
export const getServices = () => {
	return REQ_INSTANCE.post('/WeixinApi/query/yjService', {

	})
}

/**
 * [判断用户是否享有该服务]
 * @param  {[type]} yjServiceId   [description]
 * @param  {[type]} yjServiceName [description]
 * @return {[type]}               [description]
 */
export const checkService = (yjServiceId) => {
	return REQ_INSTANCE.post('/WeixinApi/query/isService', {
		yjServiceId: yjServiceId
	})
}

/**
 * [登录验证]
 * @param  {[type]} phone      [description]
 * @param  {[type]} rsPassword [description]
 * @return {[type]}            [description]
 */
export const userValidate = (phone, rsPassword) => {
	return REQ_INSTANCE.post('/WeixinApi/login/Validate', {
		phone: phone,
		rsPassword: rsPassword
	})
}

/**
 * [获取用户订单列表]
 * @return {[type]} [description]
 */
export const getOrders = () => {
	return REQ_INSTANCE.post('/WeixinApi/find/order', {

	})
}

/**
 * [获取订单详情]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export const getOrderDetail = (id) => {
	return REQ_INSTANCE.post('/WeixinApi/find/OrderDetail', {
		orderId: id
	})
}

/**
 * [取消订单]
 * @param  {[type]} orderId [description]
 * @return {[type]}         [description]
 */
export const cancelOrder = (orderId) => {
	return REQ_INSTANCE.post('/WeixinApi/colseOrder', {
		orderId: orderId
	})
}

/**
 * [删除订单]
 * @param  {[type]} orderId [description]
 * @return {[type]}         [description]
 */
export const deleteOrder = (orderId) => {
	return REQ_INSTANCE.post('/WeixinApi/colseByOrder', {
		orderId: orderId
	})
}

/**
 * [校验手机号码]
 * @param  {[type]} phone [description]
 * @param  {[type]} code  [description]
 * @return {[type]}       [description]
 */
export const checkMobileCode = (phone, code) => {
	return REQ_INSTANCE.post('/WeixinApi/audit/MobileCode', {
		phone: phone,
		code: code
	})
}

/**
 * [更换手机号]
 * @param  {[type]} phone [description]
 * @return {[type]}       [description]
 */
export const updatePhone = (phone) => {
	return REQ_INSTANCE.post('/WeixinApi/update/Mobile', {
		phone: phone
	})
}

/**
 * [微信绑定]
 * @param  {[type]} name     [description]
 * @param  {[type]} idNumber [description]
 * @param  {[type]} phone    [description]
 * @return {[type]}          [description]
 */
export const bindWechat = (name, idNumber, phone) => {
	return REQ_INSTANCE.post('/userInfo/bound/weChatBoundSysUser', {
		name: name,
		idNumber: idNumber,
		phone: phone
	});
}

/**
 * [解绑]
 * @return {[type]} [description]
 */
export const unBindWechat = () => {
	return REQ_INSTANCE.post('/WeixinApi/bound/unbindWeChat', {

	})
}

/**
 * [判断微信是否绑定]
 * @return {[type]} [description]
 */
export const isBind = () => {
	return REQ_INSTANCE.post('/WeixinApi/bound/judgeWechatIsBound', {

	})
}

/**
 * [发送手机验证码]
 * @param  {[type]} phone [description]
 * @return {[type]}       [description]
 */
export const sendCode = (phone) => {
	return REQ_INSTANCE.post('/WeixinApi/send/MobileCode', {
		phone: phone
	});
}

/**
 * [验证验证码]
 * @param  {[type]} phone [description]
 * @param  {[type]} code  [description]
 * @return {[type]}       [description]
 */
export const codeCheck = (phone, code) => {
	return REQ_INSTANCE.post('/WeixinApi/audit/MobileCode', {
		phone: phone,
		code: code
	})
}

/**
 * [获取省市]
 * @return {[type]} [description]
 */
export const getChina = (id) => {
	return REQ_INSTANCE.post('/WeixinApi/getChina', {
		pid: id
	});
}

/**
 * [初始化jssdk配置]
 * @return {[type]} [description]
 */
export const initJssdk = () => {
	 return REQ_INSTANCE.post('/medicalservice/newWeiXinJsapiSignature', {
	 	url: APP_URL
	 });
}

/**
 * [评价订单]
 * @return {[type]} [description]
 */
export const comment = (orderMainId, serviceScore, serviceComment, hosScore, hosComment, consultantScore, consultantComment) => {
	return REQ_INSTANCE.post('/CustomerApr/AddUserReview', {
		"orderMainId": orderMainId,
	  "hospitalEvaluate": hosScore,
	  "hospitalEvaluateContext": hosComment,
	  "serviceEmpathy": consultantComment,
	  "serviceEvaluate": serviceScore,
	  "serviceEvaluateContext": serviceComment,
	  "serviceSecurity": consultantScore
	});
}

/**
 * [初始化评价]
 * @param  {[type]} orderMainId [description]
 * @return {[type]}             [description]
 */
export const initCommentInfo = (orderMainId) => {
	return REQ_INSTANCE.post('/CustomerApr/orderAppraise', {
		orderMainId: orderMainId
	});
}

/**
 * [保存文件信息]
 * @param  {[type]} orderNumber   [description]
 * @param  {[type]} serverId      [description]
 * @param  {[type]} enclosureName [description]
 * @return {[type]}               [description]
 */
export const saveFile = (orderNumber, serverId, enclosureType) => {
	return REQ_INSTANCE.post('/medicalservice/uploadAndDownMedia', {
		orderNumber: orderNumber,
		serverId: serverId,
		enclosureType: enclosureType
	})
}

/**
 * [删除文件]
 * @param  {[type]} enclosureId [description]
 * @return {[type]}             [description]
 */
export const deleteFile = (enclosureId) => {
	return REQ_INSTANCE.post('/medicalservice/delete', {
		enclosureId: enclosureId
	});
}

/**
 * [用户身份验证]
 * @param  {[type]} name     [description]
 * @param  {[type]} idNumber [description]
 * @return {[type]}          [description]
 */
export const checkUserInfo = (name, idNumber) => {
	return REQ_INSTANCE.post('/WeixinApi/find/pduan', {
		name: name,
		idNumber: idNumber
	});
}

/**
 * [评价详情]
 * @param  {[type]} orderMainId [description]
 * @return {[type]}             [description]
 */
export const commentDetail = (orderMainId) => {
	return REQ_INSTANCE.post('/CustomerApr/QueryAppointmentHospital', {
		orderMainId: orderMainId
	});
}

/**
 * [初始化用户信息]
 * @return {[type]} [description]
 */
export const getUserinfo = () => {
	return REQ_INSTANCE.post('/WeixinApi/find/userDetail', {

	});
}

export const codeGetOpenid = (code) => {
	return REQ_INSTANCE.post('/portal/user/getOAuth2UserInfo', {

	});
}

/**
 * [绑定用户]
 * @param  {[type]} idNumber [description]
 * @param  {[type]} username [description]
 * @param  {[type]} phone    [description]
 * @return {[type]}          [description]
 */
export const bindUser = (IDcod, idNumber, username, phone) => {
	return REQ_INSTANCE.post('/WeixinApi/bound/weChatBoundSysUser', {
    idType: IDcod,
		idNumber: idNumber,
		name: username,
		phone: phone
	});
}

/**
 * [添加预约住院]
 * @param  {[type]} city               [description]
 * @param  {[type]} province           [description]
 * @param  {[type]} county            [description]
 * @param  {[type]} diseaseDescription [description]
 * @param  {[type]} expectRemark       [description]
 * @param  {[type]} patientAddress     [description]
 * @param  {[type]} remark             [description]
 * @return {[type]}                    [description]
 */
export const appointmentInHospital = (province, city, county, diseaseDescription, expectRemark, patientAddress, remark, followProductId) => {
	return REQ_INSTANCE.post('WeixinApi/add/BespeakHospitalization', {
  	"bespeakCity": city,
	  "bespeakCounty": county,
	  "bespeakProvince": province,
	  "createDate": "2018-02-05 11:30:59",
	  "diseaseDescription": diseaseDescription,
	  "expectRemark": expectRemark,
	  "patientAddress": patientAddress,
	  "phone": "",
	  "remark": remark,
	  "wechatName": "berlin",
	  "yjServiceId": "0003",
	  "yjServiceName": "预约住院",
    followProductId: followProductId
	});
}

/**
 * [添加预约手术]
 * @param  {[type]} city               [description]
 * @param  {[type]} province           [description]
 * @param  {[type]} county            [description]
 * @param  {[type]} diseaseDescription [description]
 * @param  {[type]} expectRemark       [description]
 * @param  {[type]} patientAddress     [description]
 * @param  {[type]} remark             [description]
 * @return {[type]}                    [description]
 */
export const bespeakOperation = (province, city, county, diseaseDescription, expectRemark, patientAddress, remark, followProductId) => {
	return REQ_INSTANCE.post('/WeixinApi/add/BespeakOperation', {
		"bespeakCity": city,
	  "bespeakCounty": county,
	  "bespeakProvince": province,
	  "createDate": "2018-02-05 11:30:59",
	  "diseaseDescription": diseaseDescription,
	  "expectRemark": expectRemark,
	  "patientAddress": patientAddress,
	  "phone": "",
	  "remark": remark,
	  "wechatName": "berlin",
	  "yjServiceId": "0002",
	  "yjServiceName": "预约手术",
    followProductId: followProductId
	});
}

/**
 * [预约门诊]
 * @param  {[type]} city               [description]
 * @param  {[type]} province           [description]
 * @param  {[type]} county            [description]
 * @param  {[type]} diseaseDescription [description]
 * @param  {[type]} expectRemark       [description]
 * @param  {[type]} patientAddress     [description]
 * @param  {[type]} remark             [description]
 * @return {[type]}                    [description]
 */
export const BespeakOutpatient = (province, city, county, diseaseDescription, expectRemark, patientAddress, remark, followProductId) => {
	return REQ_INSTANCE.post('/WeixinApi/add/BespeakOutpatient', {
		"bespeakCity": city,
	  "bespeakCounty": county,
	  "bespeakProvince": province,
	  "createDate": "2018-02-05 11:30:59",
	  "diseaseDescription": diseaseDescription,
	  "expectRemark": expectRemark,
	  "patientAddress": patientAddress,
	  "phone": "",
	  "remark": remark,
	  "wechatName": "berlin",
	  "yjServiceId": "0001",
  	"yjServiceName": "预约门诊",
    followProductId: followProductId
	});
}

/**
 * [添加押金垫付]
 * @param  {[type]}  diseaseDescription    [description]
 * @param  {[type]}  expectRemark          [description]
 * @param  {[type]}  patientAddress        [description]
 * @param  {[type]}  hospitalInformation   [description]
 * @param  {[type]}  hospitalizedDate      [description]
 * @param  {Boolean} isSocialSecurity      [description]
 * @param  {[type]}  socialSecurityAddress [description]
 * @param  {[type]}  remark                [description]
 * @return {[type]}                        [description]
 */
export const depositSpot = (diseaseDescription, expectRemark, hospitalInformation, hospitalizedDate, isSocialSecurity, socialSecurityAddress, remark, followProductId) => {
	return REQ_INSTANCE.post('/WeixinApi/add/DepositSpot', {
	  "diseaseName": diseaseDescription,
	  "description": expectRemark,
	  "hospitalInformation": hospitalInformation ? hospitalInformation : '顺义医院',
	  "hospitalizedDate": hospitalizedDate,
	  "isSocialSecurity":isSocialSecurity,
	  "remark": remark,
	  "address": socialSecurityAddress,
	  "yjServiceId": "0005",
	  "yjServiceName": "押金垫付",
    followProductId: followProductId
	});
}

/**
 * [添加二次诊疗订单]
 * @param  {[type]} diseaseName [description]
 * @param  {[type]} description [description]
 * @param  {[type]} remark      [description]
 * @param  {[type]} name        [description]
 * @param  {[type]} phone       [description]
 * @param  {[type]} address     [description]
 * @param  {[type]}             [description]
 * @return {[type]}             [description]
 */
export const twoDiagnosis = (diseaseName, description, remark, name, phone, address, addressDetail, followProductId) => {
	return REQ_INSTANCE.post('/WeixinApi/add/TwoDiagnosis', {
		diseaseName: diseaseName,
		description: description,
		remark: remark,
		name: name,
		phone: phone,
		address: addressDetail,
		twoAddress: address,
		"yjServiceId": "0004",
	  "yjServiceName": "二次诊疗",
    followProductId: followProductId
	});
}


/**
 * [申请前查看保单信息]
 * @param  {[type]}  [description]
 * @param  {[type]}  [description]
 */
export const viewPolicy = ( classificationType ) => {
  return REQ_INSTANCE.post('/WeixinApi/find/weixinFollowProductList', {
    classificationType: classificationType
  });
}


/* 电话医生 */
/**
 * [快速问诊]
 * @param  {[type]} name [description]
 * @param  {[type]} idType [description]
 * @param  {[type]} idNumber [description]
 */
export const quickVisit = (name, idType, idNumber) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/quickVisit', {
    name: name,
    idType:  idType,
    idNumber: idNumber
  });
}

/**
 * [提交诊断描述]
 * @param  {[type]} userId [description]
 * @param  {[type]} customerConsultationQuestion [description]
 * @param  {[type]} phone [description]
 * @param  {[type]} medicalSectionName [description]
 * @param  {[type]} orderNumber [description]
 */
export const createOrderMain = (customerConsultationQuestion, phone, medicalSectionName, orderNumber, sex, age, isReferral, oldOrderMainId, answerPhoneTime ) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/createOrderMain', {
    customerConsultationQuestion: customerConsultationQuestion,
    phone: phone,
    medicalSectionName: medicalSectionName,
    orderNumber: orderNumber,
    sex: sex,
    age: age,
    isReferral: isReferral,
    oldOrderMainId: oldOrderMainId,
    answerPhoneTime: answerPhoneTime
  });
}

/**
 * [华泰-增加电话咨询]
 * @param  {[string]} orderNumber [订单id]
 * @param  {[string]} userId [用户id]
 * @param  {[json]} formCon [表单内容]
 */
export const huataiCreateOrderMain = (orderNumber, formCon, isReferral, oldOrderMainId, answerPhoneTime) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/createOrderMain', {
    customerConsultationQuestion: formCon.tranSymptom,
    phone: formCon.insured_phone,
    medicalSectionName: formCon.sectionChoosed,
    sex: formCon.insured_sex,
		age: formCon.insured_age,
    orderNumber: orderNumber,
    isReferral: isReferral,
    oldOrderMainId: oldOrderMainId,
    answerPhoneTime: answerPhoneTime
  });
}
/**
 * [华泰-用户id]
 * @param  {[type]} policyNumber [保单号]
 * @param  {[classificationType]} policyNumber []
 */
export const getOrderInfo = (policyNumber) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/getOrderInfo', {
		policyNumber: policyNumber,
		classificationType : '0008',
  });
}

/**
 * [个人中心列表]
 * @param  {[type]} userId [description]
 * @param  {[type]}  [description]
 */
export const personCenter = () => {
  return REQ_INSTANCE.post('/telePhoneDoctor/getMyOrderMain', {

  });
}

/**
 * [我的订单详情]
 * @param  {[type]} orderMainId [description]
 * @param  {[type]}  [description]
 */
export const myOrderDetail = ( orderMainId ) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/telePhoneDoctorOrderMainDetail', {
    orderMainId: orderMainId
  });
}

/**
 * [测试微信支付]
 * @param  {[type]} openId [description]
 * @param  {[type]} cardType [description]
 * @param  {[type]} productCode [description]
 */
export const paymentTest = (cardType,productCode) => {
  return REQ_INSTANCE.post('/pay/wxPay', {
    cardType: cardType,
    productCode: productCode
  });
}

/**
 * [医生评价]
 * @param  {[type]} orderMainId [description]
 * @param  {[type]} evaluation [description]
 * @param  {[type]} evaluationContent [description]
 */
export const doctorComment = (orderMainId, evaluation, evaluationContent) => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/addTelePhoneDoctorAppraise', {
    orderMainId: orderMainId,
    evaluation: evaluation,
    evaluationContent: evaluationContent
  });
}

/**
 * [判断是否绑定用户]
 * @param  {[type]} wechatOpenId [description]
 * @param  {[type]}  [description]
 */
export const bindPhDoctorUsers= () => {
  return REQ_INSTANCE.post('/WeixinApi/bound/judgeWechatIsBound', {

  });
}

/**
 * [判断是否夜间模式]
 * @param  {[type]} checkDate [description]
 * @param  {[type]}  [description]
 */
export const checkNightDate= (checkDate) => {
  return REQ_INSTANCE.post('/alicom/checkNightDate', {
    checkDate: checkDate
  });
}

/**
 * [判断是否日间模式]
 * @param  {[type]} checkDate [description]
 * @param  {[type]}  [description]
 */
export const checkDayDate = (checkDate) => {
  return REQ_INSTANCE.post('/alicom/checkDayDate', {
    checkDate: checkDate
  });
}

/**
 * [患者拨号]
 * @param  {[type]} openId [description]
 * @param  {[type]}  [description]
 */
export const patientPhone = () => {
  return REQ_INSTANCE.post('/alicom/userPhone', {

  });
}

/**
 * [电话医生图片上传]
 * @param  {[type]} openId [description]
 * @param  {[type]}  [description]
 */
export const phoneSaveFile = (orderNumber, serverId, enclosureType) => {
  return REQ_INSTANCE.post('/medicalservice/fileUpload/', {
    orderNumber: orderNumber,
    serverId: serverId,
    enclosureType: enclosureType
  });
}

/**
 * [华泰上传图片]
 * @param  {[type]} openId [description]
 * @param  {[type]}  [description]
 */
export const huataiSaveFile = (orderNumber, serverId, enclosureType) => {
  return REQ_INSTANCE.post('/medicalservice/fileUpload/', {
    orderNumber: orderNumber,
    serverId: serverId,
    enclosureType: enclosureType
  });
}

/**
 * [电话医生图片回显]
 * @param  {[type]} openId [description]
 * @param  {[type]}  [description]
 */
export const phoneFindFile = (orderNumber) => {
  return REQ_INSTANCE.post('/alicom/findImg', {
    orderNumber: orderNumber,
  });
}

/**
 * [联系复诊]
 * @param  {[type]} orderMainId [description]
 * @param  {[type]}  [description]
 */
export const returnApply = (orderMainId) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/referralDoctor', {
    orderMainId: orderMainId
  });
}

/**
 * [激活卡]
 * @param  {[type]} cardNumber [description]
 * @param  {[type]} activationCode [description]
 * @param  {[type]} wechatOpenId [description]
 */
export const activeCard = (cardNumber, activationCode) => {
  return REQ_INSTANCE.post('/telePhoneDoctor/activationCard', {
    cardNumber: cardNumber,
    activationCode: activationCode
  });
}


/**
 * [查询复诊可选时间]
 * @param  {[type]}  [description]
 */
export const fideTime = () => {
  return REQ_INSTANCE.post('/alicom/findTime', {

  });
}

/**
 * [医生团队列表]
 * @param  {[type]}  [description]
 */
export const doctorTeam = () => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/queryDoctorInfoList', {

  });
}

/**
 * [医生团队详情]
 * @param  {[type]}  [description]
 */
export const doctorTeamDetail = (doctorId) => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/queryDoctorInfo', {
    doctorId: doctorId
  });
}

/**
 * [去评价显示医生信息]
 * @param  {[type]} orderMainId [description]
 */
export const doctorInfo = (orderMainId) => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/queryDoctorInfoByOrderMainId', {
    orderMainId: orderMainId
  });
}

/**
 * [取消我的订单]
 * @param  {[type]} orderMainId [description]
 */
export const cancleOrder = (orderMainId) => {
  return REQ_INSTANCE.post('/TelePhoneDoctorInterface/cancelOrderByUser', {
    orderMainId: orderMainId
  });
}
