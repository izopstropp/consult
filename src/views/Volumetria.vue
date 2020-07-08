<template>
  <div class="container-resultado-volumetria">
    <div v-if="solicitarVolume" @click="solicitarVolume = false" class="modal">
      <div class="modal-container">
        <img src="../assets/confir-envio.png" alt="imagem de confirmação" />
        <p>Sua pesquisa</p>
        <p>0006721</p>
        <p>foi enviada para seu e-email</p>
        <router-link
          :to="{ name: 'RelatorioConsultaAcoes', params: { id: 123, pag: 1 } }"
          tag="p"
        >Pré-Visualizar</router-link>
      </div>
    </div>

    <div class="container-filtro">
      <div class="filtro-resumo">
        <div class="resumo-justica">
          <div class="result">
            <div v-for="(item, index) in dataSetJusticaSelecinadoFiltroSec" :key="index">
              Justiça
              <span>{{ item.nome }}</span>
              <span @click="desmarcarItem(item, parametrosFiltro.dataSetJustica)">
                <small>
                  <img src="../assets/minix.png" alt="fechar" />
                </small>
              </span>
            </div>
          </div>
        </div>
        <div class="resumo-parte">
          <div class="result">
            <div v-for="(item, index) in dataSetParteSelecinadoFiltroSec" :key="index">
              Parte
              <span>{{ item.nome }}</span>
              <span @click="desmarcarItem(item, parametrosFiltro.dataSetParte)">
                <small>
                  <img src="../assets/minix.png" alt="fechar" />
                </small>
              </span>
            </div>
          </div>
        </div>
        <div class="resumo-uf">
          <div class="result">
            <div v-for="(item, index) in dataSetUfSelecinadoFiltroSec" :key="index">
              UF
              <span>{{ item.nome }}</span>
              <span @click="desmarcarItem(item, parametrosFiltro.dataSetUf)">
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
              v-model="parametrosFiltro.dataSetJustica"
              borderColorButtom="#ededed"
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
              v-model="parametrosFiltro.dataSetParte"
              paddingLeftTextButtom="51px"
              borderColorButtom="#ededed"
              :blurCloseList="false"
            />
          </div>
          <div class="uf-selec-animation">
            <multiSelect
              paddingLeftList="51px"
              nomeCampo="UF"
              textAlignTextButtom="51px"
              fonteSizeTextButtom="1.2em"
              v-model="parametrosFiltro.dataSetUf"
              paddingLeftTextButtom="51px"
              borderColorButtom="#ededed"
              :blurCloseList="false"
            />
          </div>
        </div>
      </div>
      <div class="pesquisa-preditivo">
        <a-checkbox>Adicionar o Preditivo</a-checkbox>
      </div>
      <div class="filtro-acao">
        <div class="consulta-form-filtro-btn-block-item">
          <div @click="solicitarVolumetria(1)" class="consulta-form-filtro-btn-item">
            <a style="user-select:none">ADIQUERIR TODA VOLUMETRIA</a>
          </div>
          <div @click="solicitarVolumetria(2)" class="consulta-form-filtro-btn-item">
            <a style="user-select:none">ADIQUERIR VOLUMETRIA SELECIONADA</a>
          </div>
        </div>
      </div>
    </div>
    <div class="container-volumetria">
      <div @click="versaoDetalhada = !versaoDetalhada" class="valor-consumo">
        <p>R$ 10,00</p>
      </div>
      <div class="container-volumetria-principal">
        <div class="volumetria-titulo">
          <span>Volumetria -</span>
          <span>Total de {{$store.getters.getResultadoPesquisaVolumetria.QtdProcessos}} Processos encontrados</span>
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
                <th :class="[versaoDetalhada ? 'background-blue' : '']">Descrição</th>
                <th :class="[versaoDetalhada ? 'background-blue' : '']">Quantidade de processos</th>
                <th :class="[versaoDetalhada ? 'background-blue' : '']">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr
                :class="[
                  versaoDetalhada ? 'active ajust-height-uf' : '',
                  'background-blue',
                ]"
              >
                <!-- <td
                  :class="[versaoDetalhada ? 'background-blue ajust-height-uf ajust-width-uf':'ajust-width-uf']"
                >-->
                <td :class="[versaoDetalhada ? 'background-blue' : '']">
                  <div class="ajust-height-uf">
                    <p>
                      <span
                        v-for="(item, index) in this.dataSetUfSelecinadoFiltroSec"
                        :key="index"
                      >{{ item.nome + "; " }}</span>
                    </p>
                  </div>
                </td>
                <td :class="[versaoDetalhada ? 'background-blue' : '']">
                  <div>
                    <p>{{$store.getters.getResultadoPesquisaVolumetria.QtdProcessos}}</p>
                  </div>
                </td>
                <td :class="[versaoDetalhada ? 'background-blue' : '']">
                  <div>
                    <p>R$570,00</p>
                  </div>
                </td>
              </tr>
              <tr :class="[versaoDetalhada ? 'active' : '', 'background-blue']">
                <td :class="[versaoDetalhada ? 'background-blue' : '']">
                  <div>
                    <p>Preditivo</p>
                  </div>
                </td>
                <td :class="[versaoDetalhada ? 'background-blue' : '']">
                  <div>
                    <p>{{$store.getters.getResultadoPesquisaVolumetria.QtdProcessos}}</p>
                  </div>
                </td>
                <td :class="[versaoDetalhada ? 'background-blue' : '']">
                  <div>
                    <p>R$275,00</p>
                  </div>
                </td>
              </tr>
              <tr :class="[!versaoDetalhada ? 'active' : 'change-color-bg']">
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

              <tr :class="[versaoDetalhada ? 'border-blue' : '', 'active']">
                <td
                  :class="[
                    versaoDetalhada
                      ? 'background-blue background-dark-blue'
                      : 'bg-grey',
                  ]"
                >
                  <div class="font-weight-bold">
                    <p>Total de Consumo</p>
                  </div>
                </td>
                <td
                  :class="[
                    versaoDetalhada
                      ? 'background-blue background-dark-blue'
                      : 'bg-grey',
                  ]"
                >
                  <div class="font-weight-bold">
                    <p>{{$store.getters.getResultadoPesquisaVolumetria.QtdProcessos}}</p>
                  </div>
                </td>
                <td
                  :class="[
                    versaoDetalhada
                      ? 'background-blue background-dark-blue'
                      : 'bg-grey',
                    'valor-total',
                  ]"
                >
                  <div class="font-weight-bold">
                    <p>R$ 845,00</p>
                  </div>
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
import { dataSetUfFiltroSec } from "../valuesInput/dataSetUfFiltroSec.js";
import { dataSetJusticaFiltroSec } from "../valuesInput/dataSetJusticaFiltroSec.js";
import { dataSetParteFiltroSec } from "../valuesInput/dataSetParteFiltroSec.js";
import _ from "lodash";
import { SET_RESULT_VOLUMETRIA } from "../store/actions";

export default {
  name: "volumetria",
  components: { LineChart, MultiSelect },
  data() {
    return {
      datacollectionJustica: {},
      datacollectionParte: {},
      datacollectionUf: {},
      versaoDetalhada: true,
      parametrosFiltro: {
        dataSetJustica: dataSetJusticaFiltroSec,
        dataSetParte: dataSetParteFiltroSec,
        dataSetUf: dataSetUfFiltroSec
      },
      solicitarVolume: false
    };
  },
  beforeMount() {
    console.log("BEFORE mounted");
    this.cleanInput();
  },

  created() {
    console.log("CREATED");
    this.realizarRequicaoFiltro = _.debounce(this.realizarRequicaoFiltro, 2000);
  },
  computed: {
    dataSetParteSelecinadoFiltroSec() {
      let result = this.parametrosFiltro.dataSetParte.filter(item => {
        return item.marcado == true;
      });
      return result;
    },
    dataSetJusticaSelecinadoFiltroSec() {
      let result = this.parametrosFiltro.dataSetJustica.filter(item => {
        return item.marcado == true;
      });
      return result;
    },
    dataSetUfSelecinadoFiltroSec() {
      let result = this.parametrosFiltro.dataSetUf.filter(item => {
        return item.marcado == true;
      });
      return result;
    }
  },
  watch: {
    parametrosFiltro: {
      handler() {
        this.realizarRequicaoFiltro();
      },
      deep: true
    }

    // dataSetParte: lodash.debounce(function() {
    //   alert("funcionou");
    // }, 2000),
  },
  mounted() {
    this.fillData();
  },
  methods: {
    cleanInput() {
      // console.log("MOUNTED");
      dataSetJusticaFiltroSec.map(x => (x.marcado = false));
      dataSetParteFiltroSec.map(x => (x.marcado = false));
      dataSetUfFiltroSec.map(x => (x.marcado = false));
    },
    realizarRequicaoFiltro() {
      if (this.existeValorFiltro()) {
        let pesquisaPrincipal = JSON.parse(
          JSON.stringify(this.$store.getters.getParametrosPesquisa)
        );
        pesquisaPrincipal.justica = this.parametrosFiltro.justica;
        pesquisaPrincipal.parte = this.parametrosFiltro.parte;
        pesquisaPrincipal.uf = this.parametrosFiltro.uf;

        let dadosFakeResul = {
          Key: "nomeamericanasltda;documento072479707656678413ufperj",
          ResultPesq: {
            QtdProcessos: "1000",
            QtdEstadual: "100",
            QtdFederal: "1",
            QtdTrabalhista: "111",
            QtdReu: "2",
            QtdAutor: "20",
            QtdUF: [
              {
                Nome: "AC",
                Qtd: "1"
              },
              {
                Nome: "AL",
                Qtd: "10"
              },
              {
                Nome: "AM",
                Qtd: "20"
              },
              {
                Nome: "AP",
                Qtd: "10"
              },
              {
                Nome: "BA",
                Qtd: "50"
              },
              {
                Nome: "PE",
                Qtd: "11"
              },
              {
                Nome: "CE",
                Qtd: "0"
              },
              {
                Nome: "DF",
                Qtd: "11"
              },
              {
                Nome: "ES",
                Qtd: "11"
              },
              {
                Nome: "ES",
                Qtd: "11"
              },
              {
                Nome: "GO",
                Qtd: "11"
              },

              {
                Nome: "MA",
                Qtd: "11"
              },
              {
                Nome: "MG",
                Qtd: "11"
              },
              {
                Nome: "MS",
                Qtd: "11"
              },
              {
                Nome: "MT",
                Qtd: "11"
              },
              {
                Nome: "PA",
                Qtd: "11"
              },
              {
                Nome: "PB",
                Qtd: "11"
              },
              {
                Nome: "PE",
                Qtd: "11"
              },
              {
                Nome: "PI",
                Qtd: "11"
              },
              {
                Nome: "PR",
                Qtd: "11"
              },
              {
                Nome: "RJ",
                Qtd: "11"
              },
              {
                Nome: "RN",
                Qtd: "11"
              },
              {
                Nome: "RO",
                Qtd: "11"
              },
              {
                Nome: "RR",
                Qtd: "11"
              },
              {
                Nome: "RS",
                Qtd: "11"
              },
              {
                Nome: "SC",
                Qtd: "11"
              },
              {
                Nome: "SE",
                Qtd: "11"
              },
              {
                Nome: "SP",
                Qtd: "11"
              },
              {
                Nome: "TO",
                Qtd: "11"
              }
            ]
          }
        };
        this.$store.dispatch(SET_RESULT_VOLUMETRIA, dadosFakeResul);
        this.fillData();
      }
    },
    desmarcarItem(index, dataset) {
      dataset.map(function(item) {
        if (item.nome == index.nome) {
          item.marcado = false;
        }
      });
    },
    getOpcoesSelecionadas(dataSet) {
      let arrItem = dataSet
        .map(arr => arr.nome)
        .reduce(function(arr, item) {
          arr.push(item);
          return arr;
        }, []);
      return arrItem;
    },
    solicitarVolumetria(tipoSolicitacao) {
      // FAZER REQUISIÇÃO
      if (tipoSolicitacao === 2) {
        let pesquisaPrincipal = JSON.parse(
          JSON.stringify(this.$store.getters.getParametrosPesquisa)
        );

        let filtroJustica = this.getOpcoesSelecionadas(
          this.dataSetJusticaSelecinado
        );
        if (filtroJustica.length > 0) {
          pesquisaPrincipal.justica = pesquisaPrincipal.parte = filtroJustica;
        }
        let filtroParte = this.getOpcoesSelecionadas(
          this.dataSetParteSelecinado
        );
        if (filtroParte.length > 0) {
          pesquisaPrincipal.parte = filtroParte;
        }

        let filtroUf = this.getOpcoesSelecionadas(
          this.dataSetUfSelecinadoFiltroSec
        );
        if (filtroUf.length > 0) {
          pesquisaPrincipal.uf = filtroUf;
        }

        this.solicitarVolume = true;
      }
      // } else if (tipoSolicitacao === 1) {
      //   console.log(this.$store.getters.getParametrosPesquisa);
      // }
    },
    existeValorFiltro() {
      let qtdJustica = dataSetJusticaFiltroSec.filter(x => x.marcado == true)
        .length;
      if (qtdJustica) {
        return true;
      }
      let qtdParte = dataSetParteFiltroSec.filter(x => x.marcado == true)
        .length;
      if (qtdParte) {
        return true;
      }

      let qtdUf = dataSetUfFiltroSec.filter(x => x.marcado == true).length;
      if (qtdUf) {
        return true;
      }
      return false;
    },
    fillData() {
      let resultadoPesquisa = this.$store.getters
        .getResultadoPesquisaVolumetria;
      this.datacollectionParte = {
        labels: ["Réu", "Autor"],

        datasets: [
          {
            // label: "Data One",
            backgroundColor: "#1d375c",
            barThickness: 6,
            data: [resultadoPesquisa.QtdReu, resultadoPesquisa.QtdAutor]
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
              resultadoPesquisa.QtdEstadual,
              resultadoPesquisa.QtdFederal,
              resultadoPesquisa.QtdTrabalhista
            ]
          }
        ]
      };

      this.datacollectionUf = {
        labels: resultadoPesquisa.QtdUF.map(x => x.Nome),
        // labels: [resu~],
        datasets: [
          {
            // label: "Data One",
            backgroundColor: "#1d375c",
            barThickness: 6,
            data: resultadoPesquisa.QtdUF.map(x => x.Qtd)
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
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

/* --- modal --- */
.modal::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  /* background: rgba(0, 0, 0, 0.644); */
  filter: blur(20px);
  border: none;
  background: url("../assets/back-desf.png") no-repeat;
  z-index: 1;
}
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  padding: 80px;
}
.modal-container {
  /* position: relative; */
  background-color: #ffffff;
  text-align: center;
  margin-top: 100px;
  width: 646px;
  height: 349px;
  z-index: 2;
}
.modal-container {
  line-height: 4em;
}
.modal-container img:nth-child(1) {
  margin-top: 38px;
}
.modal-container p:nth-child(2),
.modal-container p:nth-child(4) {
  font-size: 2.6em;
  font-weight: bold;
  color: #648362;
}
.modal-container p:nth-child(3) {
  font-size: 3.7em;
  color: #2e4668;
}
.modal-container p:nth-child(5) {
  margin-top: 10px;
  color: #2e4668;
  cursor: pointer;
}
/* --- fim modal -- */

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
  max-width: 358px;
  flex-wrap: wrap;
  padding-left: 42px;
  padding-bottom: 10px;
}
.filtro-acao {
  display: flex;
  width: 358px;
  align-items: center;
  flex-direction: column;
}
.uf-selec-animation {
  min-height: 95px;
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
  width: 279px;
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
  width: 279px;
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
tr,
td {
  padding: 0;
  max-width: 100px;
}
tr > td > div > p {
  padding: 10px;
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
  text-align: center;
}
tr td div {
  max-height: 0px;
  opacity: 0;
  box-sizing: border-box;
  transition: max-height 0.3s;
  text-align: center;
}
tr.active td div {
  max-height: 50px;
  opacity: 1;
  transition: max-height 0.3s;
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
