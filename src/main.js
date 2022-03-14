import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../src/assets/reset.scss";
import axios from "axios";
import VueAxios from "vue-axios";
import _ from "lodash";

Vue.prototype._ = _;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
//axios.defaults.baseURL = "http://114.115.175.108:8099/";
axios.defaults.baseURL = "http://localhost:8099/";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
