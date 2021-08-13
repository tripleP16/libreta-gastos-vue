import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/materialize-css/dist/css/materialize.css'; 
import '../node_modules/materialize-css/dist/js/materialize.js';
Vue.config.productionTip = true


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
