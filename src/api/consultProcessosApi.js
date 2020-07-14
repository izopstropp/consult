import axios from "axios";
import tokenInterceptor from "./config/tokenInterceptor";
import unauthorizedAccessInterceptor from "./config/unauthorizedAccessInterceptor";

const baseURL = process.env.VUE_APP_KURIERCONSULTAPI+"/acoes";
const instanceAxios = axios.create();

instanceAxios.interceptors.request.use(tokenInterceptor);

instanceAxios.interceptors.response.use((response) => {
  return response;
}, unauthorizedAccessInterceptor);



export default {
  buscarProcessosVolumetria() {
    return instanceAxios({
      method: "get",
      baseURL,
      url: "/consulta?usuarioId=1&nome=12",
      responseType: "json",
      // headers: {
      //   "X-Requested-With": "XMLHttpRequest",
      // },
      // params:{
      //   usuarioId:1,
      //   nome:12
      // }
    });
  },
};
