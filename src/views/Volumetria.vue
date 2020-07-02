<template>
  <div class="container-resultado-volumetria">
    <div class="container-filtro">
      <div class="filtro-resumo"></div>
      <div class="filtro-selecao">
        <div class="selecao-filtro">
          <p>Selecionar Volumetria</p>
        </div>
      </div>
    </div>
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
          <!-- <table :class="[!versaoDetalhada ? 'height-animation-table':'']"> -->
          <table>
            <thead style="border-bottom: 1px solid #9494949c !important;">
              <tr>
                <th :class="[versaoDetalhada ? 'background-blue':'']">Descrição</th>
                <th :class="[versaoDetalhada ? 'background-blue':'']">Quantidade de processos</th>
                <th :class="[versaoDetalhada ? 'background-blue':'']">Valor</th>
              </tr>
            </thead>
            <tbody>
              <!-- <template v-show="versaoDetalhada"> -->
              <tr :class="[versaoDetalhada ? 'active': '','background-blue']">
                <td
                  :class="[versaoDetalhada ? 'background-blue ajust-height-uf ajust-width-uf':'ajust-width-uf']"
                >
                  <div>
                    <p>RS;SPRS;SPRS;SPRS;SPRS;SPRS;SPRS;SPRS;SPRS;SPRS;SPRS; SPRS;SPRS;SPRS;SPRS;SPRS;SPRS;SPRS;SPRS ;SPRS;SPRS;SPRS; SPRS;SPRS;SPRS;SPRS;SP</p>
                  </div>
                </td>
                <td :class="[versaoDetalhada ? 'background-blue':'']">
                  <div>
                    <div>447</div>
                  </div>
                </td>
                <td :class="[versaoDetalhada ? 'background-blue':'']">
                  <div>
                    <p>R$570,00</p>
                  </div>
                </td>
              </tr>
              <tr :class="[versaoDetalhada ? 'active': '','background-blue']">
                <td :class="[versaoDetalhada ? 'background-blue':'']">
                  <div>
                    <p>Preditivo</p>
                  </div>
                </td>
                <td :class="[versaoDetalhada ? 'background-blue':'']">
                  <div>
                    <p>447</p>
                  </div>
                </td>
                <td :class="[versaoDetalhada ? 'background-blue':'']">
                  <div>
                    <p>R$275,00</p>
                  </div>
                </td>
              </tr>
              <!-- </template> -->
              <!-- <template v-show="!versaoDetalhada"> -->
              <tr :class="[!versaoDetalhada ? 'active': 'change-color-bg']">
                <td>
                  <div>
                    <p>Total consumido</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>50</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>R$10,00</p>
                  </div>
                </td>
              </tr>
              <!-- </template> -->
              <!-- <template v-if="!versaoDetalhada">
                <tr>
                  <td :class="[!versaoDetalhada ? '': 'hide']">Total Consumido</td>
                  <td :class="[!versaoDetalhada ? '': 'hide']">50</td>
                  <td :class="[!versaoDetalhada ? '': 'hide']">R$ 10,00</td>
                </tr>
              </template>-->
              <tr :class="[versaoDetalhada ? 'border-blue':'', 'active']">
                <td :class="[versaoDetalhada ? 'background-blue background-dark-blue':'bg-grey']">
                  <div class="font-weight-bold">Total de Consumo</div>
                </td>
                <td :class="[versaoDetalhada ? 'background-blue background-dark-blue':'bg-grey']">
                  <div class="font-weight-bold">447</div>
                </td>
                <td
                  :class="[versaoDetalhada ? 'background-blue background-dark-blue':'bg-grey','valor-total']"
                >
                  <div class="font-weight-bold">R$ 845,00</div>
                </td>
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
      datacollectionUf: {},
      versaoDetalhada: false
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
.ajust-height-uf {
  height: 80px !important;
}
.ajust-width-uf {
  width: 1px;
}

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
  width: 486px;
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
  margin-bottom: 16px;
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
  max-width: 949px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.container-chart-item-justica {
  max-width: 541px;
  flex-grow: 0.8;
}
.chart-justica {
  background-color: #ffffff;
  height: 142px;
  border-radius: 2px;
  border: 1px solid #c9c9c9;
}
.container-chart-item-parte {
  max-width: 390px;
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
  max-width: 949px;
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
/* .volumetria-grid-resultado { */
/* margin-top: 12px; */
/* display: flex; */
/* } */
/* table {
  width: 949px;
  max-height: 10px !important;
  transition: height 0.2s ease-in-out !important;
} */
/* .height-animation-table {
  height: 137px !important;
} */
/* td {
  opacity: 1;
  line-height: 20px !important;
  transition: all 0.2s ease-in-out;
}
.hide {
  opacity: 0;
  line-height: 0px !important;
  position: absolute;
  visibility: hidden;
  right: 40000px;
} */

table {
  border-collapse: collapse;
  margin-top: 14px;
  width: 949px;
}
td div {
  height: 123px;
}
tr {
  width: 200px !important;
}
/* tr,
td {
  padding: 0;
  background-color: #1d375c;
} */
tr,
td {
  padding: 0;
}
tr .background-blue {
  background-color: #1d375c;
  color: #edf0f2;
  font-weight: normal !important;
}

.font-weight-bold {
  font-weight: bold !important;
}
.background-dark-blue {
  background-color: #0f2a50 !important;
}
tr .background-white {
  background-color: #edf0f2;
}

.change-color-bg {
  background-color: #1d375c;
}
tr.active td div p {
  margin-top: 10px;
  text-align: center;
}
tr td div {
  max-height: 0px;
  opacity: 0;
  box-sizing: border-box;
  transition: max-height 0.2s;
  text-align: center;
}
tr.active td div {
  max-height: 30px;
  opacity: 1;
  transition: max-height 0.2s;
  margin-top: 10px;
}

thead tr th {
  border: 1px solid #9494949c;
  border-left: none;
  border-bottom: none;
  background-color: #edf0f2;
  height: 43px;
  font-size: 1em;
  text-align: center;
  color: #59595a;
}
thead tr th.background-blue {
  background-color: #1d375c;
  color: #edf0f2;
}

table thead tr th {
  font-weight: normal;
  font-size: 1.1em;
}
thead > tr > th {
  border-top: 1px solid #edf0f2;
}
thead > tr > th:nth-child(3) {
  border-right: 1px solid #edf0f2;
}
tbody > tr:nth-of-type(n + 2).border-blue {
  border-top: 1px solid #1d375c !important;
}

tbody > tr > td:nth-child(n + 1) {
  border-right: 1px solid #9494949c;
}
tbody > tr > td:nth-of-type(3) {
  border-right: 1px solid #edf0f2;
}
tbody > tr {
  font-weight: bold;
  font-size: 0.9em;
  /* min-height: 86px !important; */
}
.volumetria-grid-resultado {
  max-width: 940px;
  display: flex;
}

/* .valor-total {
  font-size: 1.2em;
  font-weight: bold;
} */

/* .group1-enter-active,
.group1-leave-active {
  transition: all 0.4s ease-in-out;
}
.group1-enter, .group1-leave-to {
  opacity: 0;
}
.group2-enter-active,
.group2-leave-active {
  transition: all 0.4s ease-in-out;
}
.group2-enter, .group2-leave-to {
  opacity: 0;
}

.group3-enter-active,
.group3-leave-active {
  transition: all 0.4s ease-in-out;
}
.group3-enter, .group3-leave-to {
  opacity: 0;
} */

/* --- fim grid --- */
</style>