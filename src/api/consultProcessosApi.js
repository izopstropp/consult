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
  
      params: {
        consultaId : dadosConsulta.consultaId,
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
  buscarProcessosDetalhados(dadosConsulta){
    return instanceAxios({
      method:"get",
      baseURL,
      url:"/consultaProcessos",
      responseType:"json",
      params: {
        consultaId : dadosConsulta.consultaId,
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
    })
  },
  buscarAcoesPorUsuario(){
    return instanceAxios({
      method:"post",
      baseURL,
      url:"consulta/historicoUsuario",
      responseType:"json",
    })
  },
  enviarSolicitacaoPreditivo(dados){
    return instanceAxios({
      method:"post",
      baseURL,
      url:"consulta/preditivo",
      data:dados
    })
  }
};
