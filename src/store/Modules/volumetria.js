import { SET_RESULT_VOLUMETRIA, CLEAR_RESULT_VOLUMETRIA } from "../actions";
import { SET_PARAMETROS_CONSULT_VOLUMETRIA } from "../actions";
import { CLEAR_VALUES_PARAMETER_CONSULT } from "../actions";
import { SET_STATUS_PESQUISA } from "../actions";
import { SET_PROCESSO_DETALHADOS } from "../actions";
import { CHANGE_VALUES_VOLUMETRIA } from "../mutations";
import { CHANGE_VALUES_PARAMETER_VOLUMETRIA } from "../mutations";
import { CLEAR_VALUES_PARAMETER } from "../mutations";
import { MOD_STATUS_PESQUISA } from "../mutations";
import { CHANGE_PROCESSO_DETALHADOS } from "../mutations";

export default {
  state: {
    parametrosPesquisa: {
      consultaId:"",
      nome: "",
      documento: "",
      sigla: "",
      tipoPessoa: [],
      dataDistribuicaoInicio: "",
      dataDistribuicaoFim: "",
      justicas: [],
      partes: [],
      ufs: [],
    },
    ResultadoVolumetria: {},
    pesquisaRealizada: false,
    //-- Temporário
    processosDetalhados:[]
    //------------------
  },
  getters: {
    getResultadoPesquisaVolumetria: (state) => {
      return state.ResultadoVolumetria.ResultPesq;
    },
    getParametrosPesquisa: (state) => {
      return state.parametrosPesquisa;
    },
    getStatusRealizacaoPesquisa: (state) => {
      return state.pesquisaRealizada;
    },
    getProcessosDetalhados: (state)=>{
      return state.processosDetalhados
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
    [SET_STATUS_PESQUISA]({ commit }, payload) {
      commit(MOD_STATUS_PESQUISA, payload);
    },
    [SET_PROCESSO_DETALHADOS]({ commit }, payload) {
      commit(CHANGE_PROCESSO_DETALHADOS, payload);
    },
  },
  mutations: {
    [CHANGE_VALUES_VOLUMETRIA](state, payload) {
      state.ResultadoVolumetria = payload;
    },
    [CHANGE_VALUES_PARAMETER_VOLUMETRIA](state, payload) {
      state.parametrosPesquisa.consultaId = payload.consultaId
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
      state.parametrosPesquisa.consultaId = "";
      state.parametrosPesquisa.nome = "";
      state.parametrosPesquisa.documento = "";
      state.parametrosPesquisa.sigla = "";
      state.parametrosPesquisa.tipoPessoa = [];
      state.parametrosPesquisa.dataDistribuicaoInicio = "";
      state.parametrosPesquisa.dataDistribuicaoFim = "";
      state.parametrosPesquisa.justicas = [];
      state.parametrosPesquisa.partes = [];
      state.parametrosPesquisa.ufs = [];
      //s
    },
    [MOD_STATUS_PESQUISA](state, payload) {
      state.pesquisaRealizada = payload;
    },
    [CHANGE_PROCESSO_DETALHADOS](state, payload) {
      state.processosDetalhados = payload;
    },
  },
};
