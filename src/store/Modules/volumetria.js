import { SET_RESULT_VOLUMETRIA, CLEAR_RESULT_VOLUMETRIA } from "../actions";
import { CHANGE_VALUES_VOLUMETRIA } from "../mutations";
import { SET_PARAMETROS_CONSULT_VOLUMETRIA } from "../actions";
import { CLEAR_VALUES_PARAMETER_CONSULT } from "../actions";
import { CHANGE_VALUES_PARAMETER_VOLUMETRIA } from "../mutations";
import { CLEAR_VALUES_PARAMETER } from "../mutations";

export default {
  state: {
    parametrosPesquisa: {
      nome: "",
      documento: "",
      sigla: "",
      tipoPessoa: "",
      dataDistribuicaoInicio: "",
      dataDistribuicaoFim: "",
      justicas: [],
      partes: [],
      ufs: [],
    },
    ResultadoVolumetria: {},
  },
  getters: {
    getResultadoPesquisaVolumetria: (state) => {
      return state.ResultadoVolumetria.ResultPesq;
    },
    getParametrosPesquisa: (state) => {
      return state.parametrosPesquisa;
    }
  },
  actions: {
    [SET_PARAMETROS_CONSULT_VOLUMETRIA]({ commit }, payload) {
      commit(CHANGE_VALUES_PARAMETER_VOLUMETRIA, payload);
    },
    [SET_RESULT_VOLUMETRIA]({ commit }, payload) {
      commit(CHANGE_VALUES_VOLUMETRIA, payload);
    },
    [CLEAR_RESULT_VOLUMETRIA]({ commit }, payload) {
      commit(CHANGE_VALUES_VOLUMETRIA, payload);
    },
    [CLEAR_VALUES_PARAMETER_CONSULT]({ commit }, payload) {
      commit(CLEAR_VALUES_PARAMETER, payload);
    },
  },
  mutations: {
    [CHANGE_VALUES_VOLUMETRIA](state, payload) {
      state.ResultadoVolumetria = payload;
    },
    [CHANGE_VALUES_PARAMETER_VOLUMETRIA](state, payload) {
      state.parametrosPesquisa.nome = payload.nome;
      state.parametrosPesquisa.documento = payload.documento;
      state.parametrosPesquisa.sigla = payload.sigla;
      state.parametrosPesquisa.tipoPessoa = payload.tipoPessoa;
      state.parametrosPesquisa.dataDistribuicaoInicio =
        payload.dataDistribuicaoInicio;
      state.parametrosPesquisa.dataDistribuicaoFim =
        payload.dataDistribuicaoFim;
      state.parametrosPesquisa.justicas = payload.justicas;
      state.parametrosPesquisa.partes = payload.partes;
      state.parametrosPesquisa.ufs = payload.ufs;
      //
    },
    [CLEAR_VALUES_PARAMETER](state) {
      state.parametrosPesquisa.nome = "";
      state.parametrosPesquisa.documento = "";
      state.parametrosPesquisa.sigla = "";
      state.parametrosPesquisa.tipoPessoa = "";
      state.parametrosPesquisa.dataDistribuicaoInicio = "";
      state.parametrosPesquisa.dataDistribuicaoFim = "";
      state.parametrosPesquisa.justicas = [];
      state.parametrosPesquisa.partes = [];
      state.parametrosPesquisa.ufs = [];
    },
  },
};
