import Vue from "vue";
import Vuex from "vuex";
import auth from "./Modules/auth";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    auth: auth,
  },
  strict: process.env.NODE_ENV !== "production",
});
