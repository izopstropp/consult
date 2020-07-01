<template>
  <div class="container-resultado-volumetria">
    <div class="container-filtro"></div>
    <div class="container-volumetria">
      <div class="valor-consumo">
        <p>R$ 10,00</p>
      </div>
      <div class="container-volumetria-principal">
        <div class="volumetria-titulo">
          <span>Volumetria -</span>
          <span>Total de 530 Processos encontrados</span>
        </div>
        <div class="grafico-volumetria">
          <div class="container-chart">
            <div class="container-chart-item-justica">
              <LineChart
                key="1"
                class="chart-justica"
                tituloChart="Justiça"
                :chart-data="datacollectionJustica"
              ></LineChart>
            </div>
            <div class="container-chart-item-parte">
              <LineChart
                key="2"
                class="chart-parte"
                tituloChart="Partes"
                :chart-data="datacollectionParte"
              ></LineChart>
            </div>
          </div>
          <div>
            <div class="container-chart-item-uf">
              <LineChart class="chart-uf" tituloChart="UF" :chart-data="datacollectionUf"></LineChart>
            </div>
          </div>
        </div>
        <div class="volumetria-grid-resultado">
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Quantidade de processos</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Consumido</td>
                <td>50</td>
                <td>R$ 10,00</td>
              </tr>
              <tr>
                <td>Total de Consumo</td>
                <td>447</td>
                <td>R$ 10,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "../components/Graficos/Barras/BarChart.vue";
export default {
  name: "volumetria",
  components: { LineChart },
  data() {
    return {
      datacollectionJustica: {},
      datacollectionParte: {},
      datacollectionUf: {}
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollectionParte = {
        labels: ["Réu", "Autor"],

        datasets: [
          {
            // label: "Data One",
            backgroundColor: "#1d375c",
            barThickness: 6,
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
      this.datacollectionJustica = {
        labels: ["Estadual", "Federal", "Trabalhista"],

        datasets: [
          {
            // label: "Qtd",
            backgroundColor: "#1d375c",
            barThickness: 6,
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
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
          "TO"
        ],

        datasets: [
          {
            // label: "Data One",
            backgroundColor: "#1d375c",
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
              this.getRandomInt()
            ]
          }
        ]
      };
    },

    getRandomInt() {
      return Math.floor(Math.random() * (10000000 - 5 + 1)) + 5;
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
}
.container-resultado-volumetria {
  display: flex;
  max-width: 100vw;
}
/* --- container filtro --- */
.container-filtro {
  border: 1px solid #c3c3c3;
  border-left: none;
  width: 472px;
  height: 571px;
}
/* --- fim container filtro --- */

/* --- container  volumetria --- */
.container-volumetria {
  width: 100vw;
}
.valor-consumo {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  height: 32px;
  background-color: #edf0f2;
  padding-right: 42px;
}
.valor-consumo p {
  font-size: 1.2em;
  color: #8a8b8b;
}
.container-volumetria-principal {
  margin: auto auto auto 21px;
}
.volumetria-titulo {
  margin-bottom: 10px;
}
.volumetria-titulo span:nth-child(1) {
  color: #525252;
  font-size: 20px;
  font-weight: bold;
}
.volumetria-titulo span:nth-child(2) {
  color: #525252;
  font-size: 1.1em;
  margin-left: 5px;
}

.container-chart {
  max-width: 940px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.container-chart-item-justica {
  max-width: 542px;
  flex-grow: 0.8;
}
.chart-justica {
  background-color: #ffffff;
  height: 142px;
  border-radius: 2px;
  border: 1px solid #c9c9c9;
}
.container-chart-item-parte {
  max-width: 386px;
  flex-grow: 0;
}
.chart-parte {
  background-color: #ffffff;
  /* max-width: 386px; */
  height: 142px;
  border-radius: 2px;
  border: 1px solid #c9c9c9;
}
.container-chart-item-uf {
  margin-right: 11px;
  margin-top: 10px;
  max-width: 940px;
}
.chart-uf {
  background-color: #ffffff;
  /* max-width: 940px; */
  height: 142px;
  border-radius: 2px;
  border: 1px solid #c9c9c9;
}
/* --- fim  volumetria --- */

/* --- inicio grid --- */
.volumetria-grid-resultado {
  margin-top: 10px;
}
table,
th,
td {
  border: 1px solid black;
  border-left: none;
  border-bottom: none;
  background-color: #edf0f2;
  border-collapse: collapse;
  border-color: #a8b2c0;
  padding: 10px;
  font-size: 1em;
  text-align: center;
  color: #78797a;
}
table thead tr th {
  font-weight: normal;
  font-size: 1.1em;
}
thead > tr > th {
  border-top: 2px solid #ffffff;
}
thead > tr > th:nth-child(3) {
  border-right: 2px solid #ffffff;
}
tbody > tr:nth-child(2) {
  border-top: 2px solid #ffffff;
}
tbody > tr > td:nth-child(3) {
  border-right: 2px solid #ffffff;
}

tbody > tr {
  font-weight: bold;
}
.volumetria-grid-resultado {
  /* max-width: 940px; */
  display: flex;
}
table {
  width: 940px;
}

/* --- fim grid --- */
</style>