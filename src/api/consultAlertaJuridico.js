import axios from "axios";
import tokenInterceptor from "./config/tokenInterceptor";
import unauthorizedAccessInterceptor from "./config/unauthorizedAccessInterceptor";

const baseURL = process.env.VUE_APP_KURIERCONSULTAPI + "/alertaJuridico";
const instanceAxios = axios.create();

instanceAxios.interceptors.request.use(tokenInterceptor);

instanceAxios.interceptors.response.use((response) => {
  return response;
}, unauthorizedAccessInterceptor);

export default {
    buscarAlertasPorUsuario(){
        return instanceAxios({
          method:"get",
          baseURL,
          url:"/AlertaUsuario",
          responseType:"json",
        })
    },
    confirmarVisualizacaoResumo(id){
        return instanceAxios({
            method:"patch",
            baseURL,
            url:`/AlertaUsuario/${id}`,
            responseType:"json"
        })
    },
    solicitarDadosAlerta(dados){
        return instanceAxios({
            method:"patch",
            baseURL,
            url:"/AlertaUsuario/SolicitarDados",
            responseType:"json",
            data:dados
        })
    },
    solicitarQtdNovosAlertas(dados){
        return instanceAxios({
            method:"get",
            baseURL,
            url:"/AlertaUsuario/QtdNovosAlertas",
            responseType:"json",
        })
    }
}