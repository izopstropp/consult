import store from "@/store/index";

export default function(config) {
  
  if (store.getters.autenticado) {
    config.headers["Authorization"] = `Bearer ${store.state.auth.token}`;
  }
  return config;
}
