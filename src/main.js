import Vue from "vue";
import "babel-polyfill";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import store from "./store";
import Notifications from "vue-notification";
Vue.use(Notifications);

// or a lite version without inline css, then you have to style yourself or manually import 'vue-easy-toast.css'

Vue.config.productionTip = false;

Vue.use(Antd);
new Vue({
  router: router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
