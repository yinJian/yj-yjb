import Vue from 'vue';
import yjToast from './yjToast';

export default {
  install (Vue) {
    const yjToastConstructor = Vue.extend(yjToast);
    const yjToastInstance = new yjToastConstructor();

    function Toast (content) {
      yjToastInstance.content = content;
      yjToastInstance.toastShow = true;
      if (!yjToastInstance.$el) {
        let vm = yjToastInstance.$mount();
        document.querySelector('body').append(vm.$el);
      }
    }

    Toast.end = () => {
      yjToastInstance.closeToast();
    }

    Vue.yjToast = Vue.prototype.$yjToast = Toast;
  }
}