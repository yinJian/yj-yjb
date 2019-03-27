
// 测试
// export const API_URL = 'http://192.168.1.58:8080/healthcloud365common/static/wechat';
// export const APP_URL = 'http://test2-app.youjiajk.com/';


// 正式环境
// export const API_URL = 'https://yjhealth.yjhealth-china.com/healthcloud365common/static/wechat';
// export const APP_URL = 'https://yjhealth-app.yjhealth-china.com/';

export const API_URL = 'https://admin.youjiajk.com/healthcloud365common/static/wechat';
export const APP_URL = 'https://yjhealth-app.youjiajk.com/';
export const AppId = 'wx36e66aa957f079a7'; //合并后

// export const AppId = 'wx93333dae6b8e8b4f';//合并前  已弃
// export const AppId = 'wx072fa38aced8d8f4';

export const SERVICE_MAP = {
	'0001': '预约门诊',
	'0002': '预约手术',
	'0003': '预约住院',
	'0004': '二次诊疗',
	'0005': '押金垫付',
  '0007': '体检预约'
};


/**
 * [保存localStorage]
 * @param  {[type]} name  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export const setLocalStorage = (name, value) => {
	if (!name || !value) {
		return;
	}
	if (typeof value !== 'String') {
		value = JSON.stringify(value)
	}
	window.localStorage.setItem(name, value);
}


/**
 * [获取localStorage]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export const getLocalStorage = name => {
	if (!name) {
		return;
	}
	return window.localStorage.getItem(name);
}


/**
 * [删除localStorage]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export const removeLocalStorage = name => {
	if (!name) {
		return;
	}
	window.localStorage.removeItem(name);
}
