import { DO_LOGIN, DO_LOGOUT } from "../actions";
import { SET_AUTH } from "../mutations";

export default {
  state: {
    usuario: "",
    token: "",
    perfilName: null,
  },
  getters :{
    autenticado:(state) => {
      return state.usuario != null && state.usuario != '' ? true : false;
    }
  },
  actions: {
    [DO_LOGIN]({ commit }, payload) {
      commit(SET_AUTH, payload);
    },
    [DO_LOGOUT]({ commit }) {
      let obj = { usuario: null, access_token: null, perfil: null };
      commit(SET_AUTH, obj);
    },
  },
  mutations: {
    [SET_AUTH](state, payload) {
      state.usuario = payload.usuario;
      state.token = payload.access_token;
      state.perfilName = payload.perfil;
    },
  },
};
