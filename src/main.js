/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import "./index.css";
import vClickOutside from "v-click-outside";
import router from './router'

Vue.config.productionTip = false;
Vue.use(vClickOutside);
new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
