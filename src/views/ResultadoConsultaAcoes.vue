<template>
  <div class="container-resultado-consulta">
    <div class="titulo">
      <p>Volumetria</p>
      <p>Total de 530 Processos encont</p>
    </div>
    <div class="container-chart">
      <div class="title-graphic">Metríca por operadores</div>
      <LineChart class="chart-justica" :chart-data="datacollection"></LineChart>
    </div>
  </div>
</template>
<script>
import consultProcessosApi from "../api/consultProcessosApi";
import LineChart from "../components/Graficos/Barras/BarChart.vue";

export default {
  name: "resultado-consulta",
  components: {
    LineChart,
  },
  data() {
    return {
      agrupamentoUf: "",
      agrupamentoJustica: "",
      datacollection: {},
      numero: 500,
    };
  },

  mounted() {
    this.buscarProcessosResumo();
    this.fillData();
  },
  methods: {
    buscarProcessosResumo() {
      consultProcessosApi.buscarProcessosResumo().then((response) => {
        if (response.status === 200) {
          this.criarEstruturaFiltroProcessosResumido(response.data);
        }
      });
    },
    criarEstruturaFiltroProcessosResumido(processosResumido) {
      this.agrupamentoUf = this.agruparProcessos(processosResumido, "uf");
      this.agrupamentoJustica = this.agruparProcessos(
        processosResumido,
        "justica"
      );
      console.log(this.agrupamentoJustica);
    },

    agruparProcessos(processos, colunaAgrupamento) {
      var objColuna = {},
        objetoColunaAtual;
      for (let index = 0; index < processos.length; index++) {
        objetoColunaAtual = processos[index];
        if (!(objetoColunaAtual[colunaAgrupamento] in objColuna)) {
          objColuna[objetoColunaAtual[colunaAgrupamento]] = 0;
        }
        objColuna[objetoColunaAtual[colunaAgrupamento]] += 1;
      }
      return objColuna;
    },
    fillData() {
      this.datacollection = {
        labels: ["Estadual", "Federal", "Trabalhista"],

        datasets: [
          {
            label: "Data One",
            backgroundColor: "#FFFFFF",
            barThickness: 6,
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>
<style scoped>
p {
  margin: 0;
}
.container-chart {
  padding: 10px;
  /* background-color: #1d375c; */
}
.chart-justica {
  background-color: #1d375c;
  width: 292px;
  height: 160px !important;
  border-radius: 10px;
}
</style>
