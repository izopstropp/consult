import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SelecaoTipoConsulta from "../views/SelecaoTipoConsulta.vue";
import ConsultaAcoes from "../views/ConsultaAcoes";
import ResultadoConsultaAcoes from "../views/ResultadoConsultaAcoes.vue";
import RelatorioConsultaAcoes from "../views/RelatorioConsultaAcoes.vue";
import HistoricoConsulta from "../views/HistoricoConsulta";
import ConsultaPreditivo from "../views/ConsultaPreditivo";
import MultiConsult from "../components/input/select/multiSelect/MultiConsult.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/selecao",
        name: "selecaoTipoConsulta",
        component: SelecaoTipoConsulta,
      },
      {
        path: "/consulta",
        name: "consulta-acoes",
        component: ConsultaAcoes,
      },
      {
        path: "/volumetria",
        name: "ResultadoConsultaAcoes",
        component: ResultadoConsultaAcoes,
      },
      {
        path: "/volumetria/:id/:pag",
        name: "RelatorioConsultaAcoes",
        component: RelatorioConsultaAcoes,
        props: true,
      },
      {
        path: "/historico",
        name: "historico",
        component: HistoricoConsulta,
      },
      {
        path: "/consulta",
        name: "consulta-preditivo",
        component: ConsultaPreditivo,
      },
    ],
  },
  {
    path: "/multi",
    MultiConsult: "multi",
    component: MultiConsult,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
