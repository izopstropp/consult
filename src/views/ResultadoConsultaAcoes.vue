<template>
  <div class="container-resultado-consulta">
    <div class="titulo">
      <p>
        <span>Volumetria</span
        ><span> - Total de 530 Processos encontrados</span>
      </p>
    </div>
    <div class="container-chart">
      <!-- <div class="container-chart-item">
        <LineChart
          class="chart-justica"
          :chart-data="datacollectionJustica"
        ></LineChart>
      </div>
      <div class="container-chart-item">
        <LineChart
          class="chart-parte"
          :chart-data="datacollectionParte"
        ></LineChart>
      </div> -->

      <div class="container-chart-item">
        <LineChart class="chart-uf" :chart-data="datacollectionUf"></LineChart>
      </div>
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
      datacollectionJustica: {},
      datacollectionParte: {},
      datacollectionUf: {},
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
      this.datacollectionJustica = {
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
      this.datacollectionUf = {
        labels: [
          "AC",
          "AL",
          "AM",
          "AP",
          "BA",
          "CE",
          "DF",
          "ES",
          "GO",
          "MA",
          "MG",
          "MS",
          "MT",
          "PA",
          "PB",
          "PE",
          "PI",
          "PR",
          "RJ",
          "RN",
          "RO",
          "RR",
          "RS",
          "SC",
          "SE",
          "SP",
          "TO",
        ],

        datasets: [
          {
            label: "Data One",
            backgroundColor: "#FFFFFF",
            barThickness: 6,
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
          },
        ],
      };
      this.datacollectionParte = {
        labels: ["Réu", "Autor"],

        datasets: [
          {
            label: "Data One",
            backgroundColor: "#FFFFFF",
            barThickness: 6,
            data: [this.getRandomInt(), this.getRandomInt()],
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
.container-resultado-consulta {
  padding: 10px 20px 0px 20px;
}
.titulo p {
  margin-bottom: 10px;
}
.titulo p span:nth-child(2) {
  color: #525252;
  font-size: 1.1em;
}
.titulo p span:nth-child(1) {
  color: #525252;
  font-size: 20px;
  font-weight: bold;
}
.container-chart {
  max-width: 100vw;
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* justify-content: space-around; */
}
.container-chart-item {
  margin-right: 11px;
  max-width: 100vw;
  float: left;
}
.chart-justica {
  background-color: #1d375c;
  max-width: 292px;
  height: 160px;
  border-radius: 10px;
}
.chart-parte {
  background-color: #1d375c;
  max-width: 123px;
  height: 160px;
  border-radius: 10px;
}
.chart-uf {
  background-color: #1d375c;
  max-width: 880px;
  height: 160px;
  border-radius: 10px;
  min-width: 0;
}
</style>
