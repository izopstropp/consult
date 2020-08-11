import { DO_LOGIN, DO_LOGOUT } from "../actions";
import { DO_VALIDAR_SECAO } from "../actions"
import { SET_AUTH } from "../mutations";
import router from '../../router'

export default {
  state: {
    usuario: "",
    token: "",
    perfilName: null,
    issued:"",
    expires:""
  },
  getters :{
    autenticado:(state) => {
      return state.usuario != null && state.usuario != '' ? true : false;
    },
    nomeUsuario:(state)=>{
      return state.usuario;
    },
    // sessaoUsuarioSistema:(state) => {
     
      
    //   return tempoFaltante
    // //   if (tempoFaltante < 1780000){
    // //     return false;
    // //   }
    // //   return true;
    // }
    
  },
  actions: {
    [DO_LOGIN]({ commit }, payload) {
      commit(SET_AUTH, payload);
    },
    [DO_LOGOUT]({ commit }) {
      let obj = { usuario: null, access_token: null, perfil: null };
      commit(SET_AUTH, obj);
    },
    [DO_VALIDAR_SECAO]({state}){
      let dataAtualAcrescidoHora = new Date()
      dataAtualAcrescidoHora.setHours(dataAtualAcrescidoHora.getHours() + 3 )
      let tempoFaltante = new Date(state.expires) - dataAtualAcrescidoHora
      if (tempoFaltante < 1780000){
        router.push({ name: "login" });
      }
    }
  },
  mutations: {
    [SET_AUTH](state, payload) {
      state.usuario = payload.usuario;
      state.token = payload.access_token;
      state.perfilName = payload.perfil;
      state.issued = payload[".issued"];
      state.expires = payload[".expires"];
    },
  },
};
