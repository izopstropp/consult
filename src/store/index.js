import Vue from "vue";
import Vuex from "vuex";
import auth from "./Modules/auth";
import volumetria from "./Modules/volumetria";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    volumetria,
    auth,
  },
  strict: process.env.NODE_ENV !== "production",
});
