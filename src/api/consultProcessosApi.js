import axios from "axios";
import tokenInterceptor from "./config/tokenInterceptor";
import unauthorizedAccessInterceptor from "./config/unauthorizedAccessInterceptor";

const baseURL = process.env.VUE_APP_KURIERCONSULTAPI + "/acoes";
const instanceAxios = axios.create();

instanceAxios.interceptors.request.use(tokenInterceptor);

instanceAxios.interceptors.response.use((response) => {
  return response;
}, unauthorizedAccessInterceptor);

export default {
  buscarProcessosVolumetria(dadosConsulta) {
    console.log(dadosConsulta)
    return instanceAxios({
      method: "get",
      baseURL,
      url: "/consulta",
      responseType: "json",
      // headers: {
      //   "X-Requested-With": "XMLHttpRequest",
      // },
      params: {
        nome: dadosConsulta.nome,
        documento: dadosConsulta.documento,
        sigla: dadosConsulta.sigla,
        tipoPessoa: dadosConsulta.tipoPessoa,
        justica: dadosConsulta.justicas,
        partes: dadosConsulta.partes,
        ufs: dadosConsulta.ufs,
        dataDistribuicaoInicio: dadosConsulta.dataDistribuicaoInicio,
        dataDistribuicaoFim: dadosConsulta.dataDistribuicaoFim,
      },
    });
  },
};
