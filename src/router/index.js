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
import Volumetria from "../views/Volumetria";
// import LoadCircle from "../components/Load/loadCircle.vue";

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
        path: "/consulta-acoes",
        name: "consulta-acoes",
        component: ConsultaAcoes,
      },
      {
        path: "/volumetria",
        name: "ResultadoConsultaAcoes",
        component: Volumetria,
      },
      {
        path: "/volumetria1",
        name: "ResultadoConsultaAcoes1",
        component: ResultadoConsultaAcoes,
      },
      {
        path: "/volumetria/:consultaId/:pag",
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
        path: "/consulta-preditivo",
        name: "consulta-preditivo",
        component: ConsultaPreditivo,
      },
    ],
  },
  // {
  //   path: "/LoadCircle",
  //   name: "LoadCircle",
  //   component: LoadCircle,
  // },
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
