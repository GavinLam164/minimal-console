import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n/index';
import Components from './components/index';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(ElementUI);
Vue.use(Components);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
