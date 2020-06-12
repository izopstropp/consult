import axios from "@axios";
import tokenInterceptor from "./config/tokenInterceptor";
import unauthorizedAccessInterceptor from "./config/unauthorizedAccessInterceptor";

const baseURL = process.env.kurierConsultApiUrl;
const instanceAxios = axios.create();

instanceAxios.interceptores.resquest.use(tokenInterceptor);
