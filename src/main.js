// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import routes from './router';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import WechatAuth from 'vue-wechat-auth';
import yjModal from './components/common/yjModal/yjModal';
import callModal from './components/common/callModal';
import yjToast from './components/common/yjToast';
import Tabs from 'vue-tabs-component';
import 'lib-flexible/flexible.js';
import { DatetimeRange } from 'vux'
import { setLocalStorage, getLocalStorage, removeLocalStorage, API_URL, AppId } from '@/assets/scripts/utils.js';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(yjToast);
Vue.component('CallModal', callModal)
Vue.component('YjModal', yjModal);
Vue.component('datetime-range', DatetimeRange)
Vue.use(Tabs);
//Vue.use(Tab);

// 全局时间过滤
import moment from 'moment'
Vue.filter('dateFilter', function (value, pattern) {
  if (!value) return ''
  return moment(value).format(pattern)
})

const router = new VueRouter({
  routes
});

const store = new Vuex.Store({
	state: {
		userinfo: null,
    wechatInfo: null,
	},
	mutations: {
		updateUserinfo (state, payload) {
			state.userinfo = payload.userinfo;
		},
		updateWechatInfo (state, payload) {
      console.log(payload);
      state.wechatInfo = payload.wechatInfo;
    }
	}
});

// 微信授权插件初始化
// Vue.use(WechatAuth , {
//   router, // 路由实例对象
//   appid: AppId, // 您的微信appid
//   responseType: 'code',  // 返回类型，请填写code
//   scope: 'snsapi_userinfo', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
//   getCodeCallback (code, next) {
//     // 用户同意授权后回调方法
//     // code：用户同意授权后，获得code值
//     // code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
//     // next： 无论access_token是否获取成功,一定要调用该方法
//     // next说明：next方法接收两个参数
//     // 参数1为通过code值请求后端获取到的access_token值，如果获取失败请填入空字符串''
//     // 参数2(非必填，默认获取access_token切换到当前路由对象)，指定切换对象 next('/') 或者 next({ path: '/' })
//     axios.get(API_URL + '/portal/user/getOAuth2UserInfo', {
//       params: {
//         code,
//         state: ''
//       }
//     }).then(response => {
//       let data = response.data;
//       let token = data.datum.openId;
//       if (data.result) {
//         store.commit('updateWechatInfo', {
//             wechatInfo: data
//         });
//         setLocalStorage('avatar', data.datum.headImgUrl);
//         setLocalStorage('nickname', data.datum.nickname);
//       }
//       next(token);
//     }).catch(() => {
//       next('');
//     });
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
});
