import Vue from 'vue';
import App from './App.vue';
import router from './router'
import store from './store';

Vue.config.productionTip = false;

Vue.filter('numberFormat', (value: number) => {
  return new Intl.NumberFormat('pt').format(value);
});

Vue.filter('capitalize', function (value: string) {
  return value
    .split(' ')
    .map((word) => {
      if (word.length <= 2) return word;

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
