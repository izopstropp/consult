import { DO_LOGIN, DO_LOGOUT } from "../actions";
import { SET_AUTH } from "../mutations";

export default {
  state: {
    usuario: "",
    token: "",
    perfilName: null,
  },
  actions: {
    [DO_LOGIN]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        var usuario = {
          usuario: payload.username,
          access_token: btoa(payload.username + ":" + payload.password),
          perfil: "ADMINISTRADOR",
        };
        commit(SET_AUTH, usuario);

        resolve(true);
        // kurierAcoesTratamentoApi.doLogin(payload.username, payload.password)
        //     .then(response => {
        //         if (response.status === 200) {
        //             console.log('perfil',response.data.perfil)
        //             commit(SET_AUTH, response.data)
        //             resolve(response)
        //         } else {
        //             console.log(response.data.status)
        //             reject(response.data)
        //         }
        //     })
        //     .catch(error => {
        //         reject(error)
        //     })
      });
    },
    [DO_LOGOUT]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let obj = { usuario: null, access_token: null, perfil: null };
        commit(SET_AUTH, obj);
        resolve(obj);
      });
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
