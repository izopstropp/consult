import Vue from "vue";
// import "babel-polyfill";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
// import store from "./store";
import VueNotibar from "vue-notibar";
import VueTheMask from "vue-the-mask";

Vue.config.productionTip = false;
Vue.use(VueTheMask);

Vue.use(VueNotibar, {
  position: "right",
  backgroundColor: "#001a3f",
  dismiss: {
    show: true, // default false
    color: "#FFFFFF", // default '#FFFFFF'
  },
});

Vue.use(Antd);
new Vue({
  router: router,
  // store: store,
  render: (h) => h(App),
}).$mount("#app");
