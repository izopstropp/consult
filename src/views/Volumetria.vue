<template>
  <div class="container-resultado-volumetria">
    <div class="container-filtro">
      <div class="filtro-resumo">
        <div class="resumo-justica">
          <div class="result">
            <div v-for="(item, index) in dataSetJusticaSelecinado" :key="index">
              Justiça
              <span>{{ item.nome }}</span>
              <span @click="desmarcarItemJustica(item)">
                <small>
                  <img src="../assets/minix.png" alt="fechar" />
                </small>
              </span>
            </div>
          </div>
        </div>
        <div class="resumo-parte">
          <div class="result">
            <div v-for="(item, index) in dataSetParteSelecinado" :key="index">
              Parte
              <span>{{ item.nome }}</span>
              <span @click="desmarcarItemParte(item)">
                <small>
                  <img src="../assets/minix.png" alt="fechar" />
                </small>
              </span>
            </div>
          </div>
        </div>
        <div class="resumo-uf">
          <div class="result">
            <div v-for="(item, index) in dataSetUfSelecinado" :key="index">
              UF
              <span>{{ item.nome }}</span>
              <span @click="desmarcarItemUf(item)">
                <small>
                  <img src="../assets/minix.png" alt="fechar" />
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="filtro-selecao">
        <div class="selecao-filtro">
          <p>Selecionar Volumetria</p>
          <div>
            <multiSelect
              paddingLeftList="51px"
              nomeCampo="Justiça"
              textAlignTextButtom="48px"
              fonteSizeTextButtom="1.2em"
              v-model="dataSetJustica"
              borderColorButtom="#fbf3f3e7"
              paddingLeftTextButtom="48px"
              :blurCloseList="false"
            />
          </div>
          <div>
            <multiSelect
              paddingLeftList="51px"
              nomeCampo="Réu"
              textAlignTextButtom="51px"
              fonteSizeTextButtom="1.2em"
              v-model="dataSetParte"
              paddingLeftTextButtom="51px"
              borderColorButtom="#fbf3f3e7"
              :blurCloseList="false"
            />
          </div>
          <div class="uf-selec-animation">
            <multiSelect
              paddingLeftList="51px"
              nomeCampo="UF"
              textAlignTextButtom="51px"
              fonteSizeTextButtom="1.2em"
              v-model="dataSetUf"
              paddingLeftTextButtom="51px"
              borderColorButtom="#fbf3f3af"
              :blurCloseList="false"
            />
          </div>
        </div>
      </div>
      <div class="filtro-acao">
        <div class="pesquisa-preditivo">
          <a-checkbox>Adicionar o Preditivo</a-checkbox>
        </div>
        <div class="consulta-form-filtro-btn-block-item">
          <div class="consulta-form-filtro-btn-item">
            <a style="user-select:none">ADIQUERIR TODA VOLUMETRIA</a>
          </div>
          <div @click="solicitarVolumetria('selecionada')" class="consulta-form-filtro-btn-item">
            <a style="user-select:none">ADIQUERIR VOLUMETRIA SELECIONADA</a>
          </div>
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
          <table>
            <thead style="border-bottom: 1px solid #9494949c !important;">
              <tr>
                <th :class="[versaoDetalhada ? 'background-blue':'']">Descrição</th>
                <th :class="[versaoDetalhada ? 'background-blue':'']">Quantidade de processos</th>
                <th :class="[versaoDetalhada ? 'background-blue':'']">Valor</th>
              </tr>
            </thead>
            <tbody>
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
import MultiSelect from "../components/input/select/multiSelect/MultiConsult.vue";
import { dataSetUf } from "../valuesInput/dataSetUf.js";
import { dataSetJustica } from "../valuesInput/dataSetJustica.js";
import { dataSetParte } from "../valuesInput/dataSetParte.js";

export default {
  name: "volumetria",
  components: { LineChart, MultiSelect },
  data() {
    return {
      datacollectionJustica: {},
      datacollectionParte: {},
      datacollectionUf: {},
      versaoDetalhada: true,
      dataSetJustica: dataSetJustica,
      dataSetParte: dataSetParte,
      dataSetUf: dataSetUf,
      solicitarVolume: false
    };
  },
  computed: {
    dataSetParteSelecinado() {
      let result = this.dataSetParte.filter(item => {
        return item.marcado == true;
      });
      return result;
    },
    dataSetJusticaSelecinado() {
      let result = this.dataSetJustica.filter(item => {
        return item.marcado == true;
      });
      return result;
    },
    dataSetUfSelecinado() {
      let result = this.dataSetUf.filter(item => {
        return item.marcado == true;
      });
      return result;
    }
  },
  mounted() {
    this.fillData();
  },
  methods: {
    desmarcarItemParte(index) {
      this.dataSetParte.map(function(item) {
        if (item.nome == index.nome) {
          item.marcado = false;
        }
      });
    },
    desmarcarItemJustica(index) {
      this.dataSetJustica.map(function(item) {
        if (item.nome == index.nome) {
          item.marcado = false;
        }
      });
    },
    desmarcarItemUf(index) {
      this.dataSetUf.map(function(item) {
        if (item.nome == index.nome) {
          item.marcado = false;
        }
      });
    },
    solicitarVolumetria(tipoSolicitacao) {
      if (tipoSolicitacao === "selecionada") {
        this.solicitarVolume = true;
      }
    },
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
hr {
  border-color: #fbf3f34b;
}
p {
  margin: 0;
}
a {
  text-decoration: none;
  color: #caced4;
}
.container-resultado-volumetria {
  display: flex;
  max-width: 1349px;
  margin: 0 auto;
}

/* --- container filtro --- */
.container-filtro {
  margin: 0;
  border: 1px solid #c3c3c3;
  border-top: none;
  border-left: none;
  max-width: 358px;
  height: 610px;

  flex: 1;
}
/* --- container-resumo ---*/
.filtro-resumo {
  margin-left: 29px;
  margin-top: 17px;
  max-height: 300px;
}
.result {
  display: flex;
  max-width: 358px;
  flex-wrap: wrap;

  margin-top: 6px;
  /* height: 1px; */
}
.result div {
  height: 23px;
  margin-right: 5px;
  border-radius: 100px;
  background-color: #e8ebed;
  font-size: 0.9em;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px 5px 8px;
  flex-grow: 0.04;
  font-size: 0.8em;
  margin-top: 3px;
}
.result div span:nth-child(1) {
  background-color: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 10px;
  /* flex: 1; */

  border-radius: 10px 10px 10px 10px;
}
.result div span:nth-child(2) {
  margin-top: -2px;
}
.result div span img {
  width: 14px;
  border-radius: 50%;
  margin-left: 2px;
}
/* --- fim-resumo ---*/
.selecao-filtro {
  max-width: 486px;
}
.selecao-filtro > p {
  margin-left: 29px;
  font-size: 1.5em;
  margin-bottom: 25px;
  margin-top: 20px;
}
.pesquisa-preditivo {
  max-width: 200px;
  flex-wrap: wrap;
}
.filtro-acao {
  display: flex;
  width: 358px;
  align-items: center;
  flex-direction: column;
  /* justify-content: space-between; */
}
.uf-selec-animation {
  min-height: 95px;
  /* transition: all 4s; */
}
.consulta-form-filtro-btn-block-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 77px;
}
.consulta-form-filtro-btn-item:nth-child(1) {
  background-color: #648362;
  height: 34px;
  width: 249px;
  font-size: 0.9em;
  padding-top: 7px;
  text-align: center;
  cursor: pointer;
}
.consulta-form-filtro-btn-item:nth-child(1):active {
  background-color: #70a06d;
}
.consulta-form-filtro-btn-item:nth-child(2) {
  height: 34px;
  width: 249px;
  font-size: 0.9em;
  background-color: #001a3f;
  text-align: center;
  padding-top: 7px;
  cursor: pointer;
}
.consulta-form-filtro-btn-item:nth-child(2):active {
  background-color: #052f6b;
}
/* --- fim container filtro --- */

/* --- container  volumetria --- */
.container-volumetria {
  max-width: 1006px;
  flex: 1;
}
.valor-consumo {
  display: flex;
  max-width: 1006px;
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
  max-width: 100vw;
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

table {
  border-collapse: collapse;
  margin-top: 14px;
  width: 98%;
}
td div {
  height: 123px;
}
tr {
  width: 200px !important;
}
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
  transition: max-height 0.4s;
  text-align: center;
}
tr.active td div {
  max-height: 30px;
  opacity: 1;
  transition: max-height 0.4s;
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
}
.volumetria-grid-resultado {
  display: flex;
}

/* --- fim grid --- */
</style>