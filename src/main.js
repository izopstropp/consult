import Vue from "vue";
import "babel-polyfill";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Antd);
new Vue({
  router: router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
