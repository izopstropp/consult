<template>
  <div class="container-resultado-volumetria" v-if="paginaCarregada">
    <div v-if="solicitarVolume" @click="fecharModal" class="modal">
      <transition appear name="slide-resul-volum">
        <div class="modal-container">
          <div class="fecharModal" @click="fecharModalClick">
            <p>X</p>
          </div>
          <img src="../assets/confir-envio.png" alt="imagem de confirmação" />
          <p>Sua pesquisa</p>
          <p>{{numeracaoConsulta}}</p>
          <p>foi enviada para seu e-email</p>
          <router-link
            :to="{
              name: 'RelatorioConsultaAcoes',
              params: { id: 123, pag: 1 },
            }"
            tag="p"
          >Pré-Visualizar</router-link>
        </div>
      </transition>
    </div>

    <div :class="[solicitarVolume ? 'blur-container' : '', 'container-filtro']">
      <div class="filtro-resumo">
        <div class="resumo-justica">
          <div class="result">
            <div
              :class="[!item.marcado ? 'excluido' : '']"
              v-for="(item, index) in dataSetJusticaSelecinadoFiltroSec"
              :key="index"
            >
              Justiça
              <span>{{ item.nome }}</span>
              <!-- <span v-if="!item.fixo" @click="desmarcarItem(item, parametrosFiltro.dataSetJustica)">
                <small>
                  <img src="../assets/minix.png" alt="fechar" />
                </small>
              </span>-->
            </div>
          </div>
        </div>

        <div class="resumo-parte">
          <div class="result">
            <div
              :class="[!item.marcado ? 'excluido' : '']"
              v-for="(item, index) in dataSetParteSelecinadoFiltroSec"
              :key="index"
            >
              Parte
              <span>{{ item.nome }}</span>
              <!-- <span v-if="!item.fixo" @click="desmarcarItem(item, parametrosFiltro.dataSetParte)">
                <small>
                  <img src="../assets/minix.png" alt="fechar" />
                </small>
              </span>-->
            </div>
          </div>
        </div>
        <div class="resumo-uf">
          <div class="result">
            <div
              :class="[!item.marcado ? 'excluido' : '']"
              v-for="(item, index) in dataSetUfSelecinadoFiltroSec"
              :key="index"
            >
              UF
              <span>{{ item.nome }}</span>
              <!-- <span v-if="!item.fixo" @click="desmarcarItem(item, parametrosFiltro.dataSetUf)">
                <small>
                  <img src="../assets/minix.png" alt="fechar" />
                </small>
              </span>-->
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="filtro-selecao">
        <div
          :class="[
            realizandoRequisicaoFiltro ? 'opacity-filtro' : '',
            'selecao-filtro',
          ]"
        >
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
              :permitirZeroSelecionado="false"
              @clickInvalido="exibirAvisoOpcaoInvalido"
            />
          </div>
          <div>
            <multiSelect
              paddingLeftList="51px"
              nomeCampo="Parte"
              textAlignTextButtom="51px"
              fonteSizeTextButtom="1.2em"
              v-model="parametrosFiltro.dataSetParte"
              paddingLeftTextButtom="51px"
              borderColorButtom="#ededed"
              :blurCloseList="false"
              :permitirZeroSelecionado="false"
              @clickInvalido="exibirAvisoOpcaoInvalido"
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
              :permitirZeroSelecionado="false"
              @clickInvalido="exibirAvisoOpcaoInvalido"
            />
          </div>
        </div>
      </div>
      <div class="animation-fadeout">
        <div class="filtro-acao">
          <div
            :class="[
            realizandoRequisicaoFiltro ? 'opacity-filtro' : '',
            'pesquisa-preditivo',
          ]"
          >
            <a-checkbox @click="preditivo = !preditivo">Adicionar o Preditivo</a-checkbox>
          </div>
          <div class="consulta-form-filtro-btn-block-item">
            <div
              @click="solicitarVolumetria"
              :class="[
                realizandoRequisicaoFiltro ? 'btn-disabled' : '',
                'consulta-form-filtro-btn-item',
              ]"
            >
              <a style="user-select:none">ADQUIRIR VOLUMETRIA SELECIONADA</a>
            </div>
            <div
              @click="$router.push({ name: 'consulta-acoes' })"
              :class="[
                realizandoRequisicaoFiltro ? 'btn-disabled' : '',
                'consulta-form-filtro-btn-item',
              ]"
            >
              <a style="user-select:none">VOLTAR PARA TELA DE PESQUISA</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="[solicitarVolume ? 'blur-container' : '', 'container-volumetria']">
      <div class="registro">
        <img src="../assets//icons/05.png" alt />
        <img src="../assets/icons/06.png" alt />
      </div>
      <div class="container-volumetria-principal">
        <div class="volumetria-titulo">
          <span>Volumetria -</span>
          <span>
            Total de
            {{ this.totalVolumetriaConsumo.QtdProcessos }}
            Processos encontrados
          </span>
        </div>
        <div class="grafico-volumetria">
          <div class="container-chart">
            <div class="container-chart-item-justica">
              <LoadCircle :exibirLoad="realizandoRequisicaoFiltro" />
              <LineChart
                key="1"
                class="chart-justica"
                tituloChart="Justiça"
                :chart-data="datacollectionJustica"
              ></LineChart>
            </div>
            <div class="container-chart-item-parte">
              <LoadCircle :exibirLoad="realizandoRequisicaoFiltro" />
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
              <LoadCircle :exibirLoad="realizandoRequisicaoFiltro" />
              <LineChart class="chart-uf" tituloChart="UF" :chart-data="datacollectionUf"></LineChart>
            </div>
          </div>
        </div>
        <div class="volumetria-grid-resultado">
          <table>
            <thead style="border-bottom: 1px solid #9494949c !important;">
              <tr>
                <th>
                  Descrição
                  <img
                    @click="[exibirtooltipTable = !exibirtooltipTable, exibirCorpoTooltip = false]"
                    src="../assets/icons/08.png"
                    alt="info"
                    style="cursor:pointer"
                  />
                  <div class="tooltipTable">
                    <div :class="[exibirtooltipTable ? 'tooltipAberto' : '', 'tooltip']">
                      <div :class="[exibirCorpoTooltip ? 'exibirTextoToltip':'','tooltipTexto']">
                        <p class="tooltipTitulo">Total da consulta das ações</p>
                        <p
                          class="tooltipCorpo"
                        >Este campo informa o que você já consumiu na consulta das ações</p>
                        <p class="tooltipTitulo">Total da volumetria a ser consumida</p>
                        <p
                          class="tooltipCorpo"
                        >Este campo sinaliza o total da volumetria que você ira consumir seguindo a pesquisa já realizada.</p>
                        <p class="tooltipTitulo">Total de consumo</p>
                        <p
                          class="tooltipCorpo"
                        >É a soma da consulta das ações mais a volumetria. Caso você queira obter essa informação, basta clicar em "Adquirir volumetria selecionada."</p>
                      </div>
                    </div>
                  </div>
                </th>
                <th>Quantidade de processos</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr class="active">
                <td>
                  <div class="font-weight-bold">
                    <p>Total da consulta das ações</p>
                  </div>
                </td>
                <td>
                  <div class="font-weight-bold">
                    <p>
                      {{
                      $store.getters.getResultadoPesquisaVolumetria
                      .totalConsultaAcoes.quantidade
                      }}
                    </p>
                  </div>
                </td>
                <td>
                  <div class="font-weight-bold">
                    <p>
                      {{
                      parseFloat($store.getters.getResultadoPesquisaVolumetria
                      .totalConsultaAcoes.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                      }}
                    </p>
                  </div>
                </td>
              </tr>
              <tr class="active">
                <td>
                  <div class="font-weight-bold">
                    <p>Total da volumetria a ser consumida</p>
                  </div>
                </td>
                <td>
                  <div class="font-weight-bold">
                    <p>{{ this.totalVolumetriaConsumo.QtdProcessos }}</p>
                  </div>
                </td>
                <td>
                  <div class="font-weight-bold">
                    <p>{{ parseFloat(this.totalVolumetriaConsumo.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</p>
                  </div>
                </td>
              </tr>
              <tr :class="[preditivo ? 'active' : '', 'background-blue']">
                <td>
                  <div>
                    <p>Preditivo</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p
                      :class="[
                        indicarQtdPreditivo ? 'scale-preditivo-ativado' : '',
                        'scale-preditivo',
                      ]"
                    >{{ this.totalPreditivoConsumo.QtdProcessos }}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{{ valorPreditivoAcoes.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</p>
                  </div>
                </td>
              </tr>
              <tr>
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

              <tr class="active">
                <td>
                  <div class="font-weight-bold">
                    <p>Total de Consumo</p>
                  </div>
                </td>
                <td>
                  <div class="font-weight-bold">
                    <p>
                      {{
                      $store.getters.getResultadoPesquisaVolumetria
                      .QtdProcessos
                      }}
                    </p>
                  </div>
                </td>
                <td>
                  <div class="font-weight-bold">
                    <p>{{valorTotalConsumido}}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <notifications
        v-if="$store.getters.getStatusRealizacaoPesquisa"
        classes="style-notification"
        group="general"
        position="bottom center"
        :ignoreDuplicates="true"
        animation-name="v-fade-left"
        :width="350"
      />
    </div>
  </div>
</template>
<script>
import LineChart from "../components/Graficos/Barras/BarChart.vue";
import MultiSelect from "../components/input/select/multiSelect/MultiConsult.vue";
import { dataSetUf } from "../valuesInput/dataSetUf.js";
import { dataSetJustica } from "../valuesInput/dataSetJustica.js";
import { dataSetParte } from "../valuesInput/dataSetParte.js";
import _ from "lodash";
import LoadCircle from "../components/Load/LoadCircle.vue";
import { CLEAR_VALUES_PARAMETER_CONSULT } from "../store/actions";
import { SET_STATUS_PESQUISA } from "../store/actions";
import {MapperVolumetriaToModel} from "../mapper/MapearVolumetriaToModel.js"
import consultProcessosApi from "../api/consultProcessosApi.js";

export default {
  name: "volumetria",
  components: { LineChart, MultiSelect, LoadCircle },
  data() {
    return {
      datacollectionJustica: {},
      datacollectionParte: {},
      datacollectionUf: {},
      preditivo: false,
      parametrosFiltro: {
        dataSetJustica: [],
        dataSetParte: [],
        dataSetUf: []
      },
      totalVolumetriaConsumo: {
        QtdProcessos: 0,
        valor: "0,00"
      },
      totalPreditivoConsumo: {
        QtdProcessos: 0,
        valor: "0,00"
      },
      solicitarVolume: false,
      isLoading: false,
      fullPage: false,
      realizandoRequisicaoFiltro: false,
      qtdTrocaFiltro: 0,
      paginaCarregada: false,
      indicarQtdPreditivo: false,
      exibirtooltipTable: false,
      exibirCorpoTooltip: false
    };
  },

  created() {
    this.realizarRequicaoFiltro = _.debounce(this.realizarRequicaoFiltro, 1600);
  },
  computed: {
    dataSetParteSelecinadoFiltroSec() {
      let result = dataSetParte
        .map(u => u)
        .filter(y =>
          this.$store.getters.getParametrosPesquisa.partes.includes(y.value)
        );
      result.map(x => (x.marcado = true));
      return result;
    },
    dataSetJusticaSelecinadoFiltroSec() {
      let result = dataSetJustica
        .map(u => u)
        .filter(y =>
          this.$store.getters.getParametrosPesquisa.justicas.includes(y.value)
        );
      result.map(x => (x.marcado = true));
      return result;
    },
    dataSetUfSelecinadoFiltroSec() {
      let result = dataSetUf
        .map(u => u)
        .filter(y =>
          this.$store.getters.getParametrosPesquisa.ufs.includes(y.value)
        );
      let opcaoTodasUf = result.filter(x => x.nome === "Todas");
      if (opcaoTodasUf.length > 0)
        result = dataSetUf.filter(x => x.nome !== "Todas");

      result.map(x => (x.marcado = true));
      return result;
    },
    valorPreditivoAcoes() {
      return parseFloat(this.totalPreditivoConsumo.valor)
    },
    valorTotalConsumido(){
      let valorTotal = 0
      let valorPreditivo = 0
      if(this.preditivo){
        valorPreditivo = this.valorPreditivoAcoes;
      }else{
        valorPreditivo = 0
      }
      valorTotal = parseFloat(this.totalVolumetriaConsumo.valor) + parseFloat(this.$store.getters.getResultadoPesquisaVolumetria
                      .totalConsultaAcoes.valor) + valorPreditivo;
                      
      return valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      // parseFloat(this.totalVolumetriaConsumo.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 
      // parseFloat(this.totalConsultAcoes.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) 
    },
    numeracaoConsulta(){
      return ("0000000" + this.$store.getters.getParametrosPesquisa.consultaId ).slice(-7)
    }
  },
  watch: {
    parametrosFiltro: {
      handler() {
        this.qtdTrocaFiltro += 1;
        if (this.qtdTrocaFiltro > 1) {
          this.realizarRequicaoFiltro();
        }
      },
      deep: true
    },
    exibirtooltipTable: {
      handler() {
        if (this.exibirtooltipTable) {
          setTimeout(() => {
            this.exibirCorpoTooltip = true;
          }, 600);
        }
      }
    }
  },
  beforeMount() {
    if (!this.$store.getters.getStatusRealizacaoPesquisa) {
      this.$router.push({ name: "consulta-acoes" });
    }
    this.parametrosFiltro.dataSetUf = this.dataSetUfSelecinadoFiltroSec;
    this.parametrosFiltro.dataSetJustica = this.dataSetJusticaSelecinadoFiltroSec;
    this.parametrosFiltro.dataSetParte = this.dataSetParteSelecinadoFiltroSec;

    this.fillData(this.$store.getters.getResultadoPesquisaVolumetria);

  },
  mounted() {
    this.paginaCarregada = true;
  },
  destroyed() {
    this.$store.dispatch(CLEAR_VALUES_PARAMETER_CONSULT);
  },
  methods: {
    fecharModal(event) {
      if (event.target === event.currentTarget) {
        this.fecharModalClick();
      }
    },
    fecharModalClick() {
      this.$router.push({ name: "consulta-acoes" });
    },
    cleanInput() {
      dataSetJustica.map(x => (x.marcado = false));
      dataSetParte.map(x => (x.marcado = false));
      dataSetUf.map(x => (x.marcado = false));
    },
    realizarRequicaoFiltro() {
      
      let corpoRequest = this.prepararCorpoRequest()

      this.realizandoRequisicaoFiltro = true;
     consultProcessosApi
          .buscarProcessosVolumetria(corpoRequest)
          .then(response => {
            
            if (response.status == 200) {
              let dadosModel = MapperVolumetriaToModel.MapearToModel(response.data.Content)
    
              this.fillData(dadosModel.ResultPesq);
            }
          this.realizandoRequisicaoFiltro = false;  
          });
          
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
        .map(arr => arr)
        .filter(arr => arr.marcado == true)
        .reduce(function(arr, item) {
          arr.push(item.value);
          return arr;
        }, []);
      return arrItem;
    },
    prepararCorpoRequest(){
       let pesquisaPrincipal = JSON.parse(
        JSON.stringify(this.$store.getters.getParametrosPesquisa)
      );
      pesquisaPrincipal.justicas = this.getOpcoesSelecionadas(
        this.parametrosFiltro.dataSetJustica
      );
      pesquisaPrincipal.partes = this.getOpcoesSelecionadas(
        this.parametrosFiltro.dataSetParte
      );
      pesquisaPrincipal.ufs = this.getOpcoesSelecionadas(
        this.parametrosFiltro.dataSetUf
      );
      this.parametrosFiltro.consultaId = this.$store.getters.getParametrosPesquisa.consultaId
      return pesquisaPrincipal;

    },
    solicitarVolumetria() {
      if (this.validarSolicitacaoAcoes() && !this.solicitarVolume) {
        // FAZER REQUISIÇÃO
        let corpoRequest = this.prepararCorpoRequest();

         this.realizandoRequisicaoFiltro = true;
        consultProcessosApi
          .buscarProcessosDetalhados(corpoRequest)
          .then(response => {
            
            if (response.status == 200) {
              // let dadosModel = MapperVolumetriaToModel.MapearToModel(response.data.Content)
            }
          this.realizandoRequisicaoFiltro = false;  
          });
          

        this.solicitarVolume = true;
        this.$store.dispatch(SET_STATUS_PESQUISA, false);
      }
    },
    validarSolicitacaoAcoes() {
      if (this.preditivo && this.totalVolumetriaConsumo.QtdProcessos > 50) {
        this.$notify({
          group: "general",
          title: "Somente é possível adquirir Preditivo de até 50 processos.",
          duration: 2000,
          speed: 700
        });
        setTimeout(() => {
          this.indicarQtdPreditivo = true;
        }, 3000);
        setTimeout(() => {
          this.indicarQtdPreditivo = false;
        }, 4200);
        return false;
      }
      return true;
    },
    exibirAvisoOpcaoInvalido() {
      this.$notify({
        group: "general",
        title: "É necessario que haja uma opção selecionada.",
        duration: 2800,
        speed: 600
      });
      //
    },
    existeValorFiltro() {
      let qtdJustica = dataSetJustica.filter(x => x.marcado == true).length;
      if (qtdJustica) {
        return true;
      }
      let qtdParte = dataSetParte.filter(x => x.marcado == true).length;
      if (qtdParte) {
        return true;
      }

      let qtdUf = dataSetUf.filter(x => x.marcado == true).length;
      if (qtdUf) {
        return true;
      }
      return false;
    },
    fillData(data) {
      this.totalVolumetriaConsumo.QtdProcessos = data.totalVolumetriaConsumo.quantidade;
      this.totalVolumetriaConsumo.valor = data.totalVolumetriaConsumo.valor;
      this.totalPreditivoConsumo.QtdProcessos = data.totalPreditivoConsumo.quantidade;
      this.totalPreditivoConsumo.valor = data.totalPreditivoConsumo.valor;

      let resultadoPesquisa = data;
      this.datacollectionParte = {
        labels: ["Réu", "Autor"],

        datasets: [
          {
            // label: "Data One",
            backgroundColor: "#1d375c",
            barThickness: 6,
            data: resultadoPesquisa.parte.map(x => x.Qtd)
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
            data: resultadoPesquisa.justica.map(x => x.Qtd)
          }
        ]
      };

      let QtdUf = resultadoPesquisa.UF.map(x => x.Qtd)
      let NomeUf = resultadoPesquisa.UF.map(x => x.Nome)
      this.datacollectionUf = {
        labels: NomeUf.slice(1,27),
        // labels: [resu~],
        datasets: [
          {
            // label: "Data One",
            backgroundColor: "#1d375c",
            barThickness: 6,
            data: QtdUf.slice(1,27)
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
  flex-wrap: wrap;
  max-width: 100vw;
  margin: 0 auto;
}
.blur-container {
  filter: blur(2px);
}

/* --- modal --- */
.slide-resul-volum-enter-active {
  transition: all 0.9s ease;
  z-index: 1;
}
.slide-resul-volum-enter, .slide-resul-volum-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
.modal::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.644);
  /* background: url("../assets/back-desf.png") no-repeat; */
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
  position: relative;
  background-color: #ffffff;
  text-align: center;
  margin-top: 100px;
  width: 646px;
  height: 349px;
  z-index: 2;
  border-radius: 4px;
}
.modal-container {
  line-height: 4em;
}
.fecharModal {
  position: absolute;
  top: -4px;
  right: 6px;
  color: #001a3f;
  font-size: 2.3em;
  width: 30px;
  cursor: pointer;
}
.modal-container img:nth-child(2) {
  margin-top: 38px;
}
.modal-container p:nth-child(3),
.modal-container p:nth-child(5) {
  font-size: 1.5em;
  font-weight: bold;
  color: #595959;
}
.modal-container p:nth-child(4) {
  font-size: 3.7em;
  color: #668464;
}
.modal-container p:nth-child(6) {
  background-color: #001a3f;
  margin: 10px auto;
  width: 416px;
  height: 36px;
  color: #c4cad2;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
/* --- fim modal -- */

/* --- container filtro --- */
.container-filtro {
  margin: 0;
  border: 1px solid #c3c3c3;
  border-top: none;
  border-left: none;
  /* max-width: 358px; */
  max-width: 28vw;
  padding-bottom: 20px;
  min-height: 30vw;
  flex: 1;
}

/* --- container-resumo ---*/
.filtro-resumo {
  margin-left: 29px;
  margin-top: 17px;
  max-height: 300px;
  animation: fadeOut 0.5s;
}
@keyframes fadeOut {
  from {
    opacity: 0;
    margin-top: -7px;
  }
  to {
    opacity: 1;
    margin-top: 17px;
  }
}
.result {
  display: flex;
  max-width: 558px;
  flex-wrap: wrap;

  margin-top: 6px;
  /* height: 1px; */
}
.result div {
  height: 23px;
  margin-right: 5px;
  border-radius: 100px;
  background-color: #354a68;
  color: rgb(219, 216, 216);
  font-size: 0.9em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px 5px 8px;
  flex: 1 1 1;
  font-size: 0.8em;
  margin-top: 3px;
  transition: all 0.4s;
}
.result div span {
  color: rgb(73, 72, 72);
}

.result div.excluido {
  color: rgb(73, 72, 72);
  background-color: #e8ebed;
  text-decoration: line-through;
  transition: all 0.4s;
}
.risco-exclusao {
  border: 1px solid black;
  position: absolute;
  /*  width: 100%; */
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
/* --- fim-resumo ----*/
.opacity-filtro {
  opacity: 0.8;
  pointer-events: none;
}
.filtro-selecao {
  animation: fadeOut 1s;
}
.selecao-filtro > p {
  margin-left: 29px;
  font-size: 1.5em;
  margin-bottom: 25px;
  margin-top: 20px;
}
.pesquisa-preditivo {
  flex-wrap: wrap;
  width: 70%;
  padding-bottom: 10px;
}
.filtro-acao {
  display: flex;
  max-width: 548px;
  align-items: center;
  flex-direction: column;
}
.uf-selec-animation {
  min-height: 95px;
}
.animation-fadeout {
  animation: fadeOut-btn 1.5s;
  -webkit-animation: fadeOut-btn 1.5s;
}
@keyframes fadeOut-btn {
  from {
    opacity: 0;
    /* margin-top: -7px; */
  }
  to {
    opacity: 1;
    /* margin-top: 7px; */
  }
}
.consulta-form-filtro-btn-block-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 77px;
  width: 70%;
}
.consulta-form-filtro-btn-item:nth-child(2) {
  background-color: #648362;
  min-height: 34px;
  max-width: 379px;
  font-size: 0.9em;
  padding-top: 7px;
  text-align: center;
  cursor: pointer;
}
.consulta-form-filtro-btn-item:nth-child(2):active {
  background-color: #70a06d;
}
.consulta-form-filtro-btn-item:nth-child(1) {
  min-height: 34px;
  max-width: 379px;
  font-size: 0.9em;
  background-color: #001a3f;
  text-align: center;
  padding-top: 7px;
  cursor: pointer;
}
.consulta-form-filtro-btn-item:nth-child(1):active {
  background-color: #052f6b;
}
.btn-disabled {
  pointer-events: none;
  opacity: 0.7;
}
/* --- fim container filtro --- */

/* --- container  volumetria --- */
.container-volumetria {
  max-width: 72vw;
  flex: 1;
}
.registro {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  height: 32px;
  background-color: #edf0f2;
  padding-right: 42px;
}
.registro p {
  font-size: 1.2em;
  color: #8a8b8b;
}
.container-volumetria-principal {
  margin: auto auto auto 21px;
  max-width: 100%;
}
.grafico-volumetria {
  max-width: 100%;
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
  max-width: 96%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.container-chart-item-justica {
  position: relative;
  max-width: 57%;
  margin-right: 1%;
  flex: 2;
  /* overflow-x: scroll; */
}
.chart-justica {
  background-color: #ffffff;
  height: 142px;
  border-radius: 2px;
  border: 1px solid #c9c9c9;
}
.container-chart-item-parte {
  max-width: 42%;
  position: relative;
  flex: 1;
  /* overflow-x: scroll; */
}
.chart-parte {
  background-color: #ffffff;
  /* max-width: 386px; */
  height: 142px;
  border-radius: 2px;
  border: 1px solid #c9c9c9;
}
.container-chart-item-uf {
  position: relative;
  margin-right: 11px;
  margin-top: 10px;
  max-width: 96%;
  /* overflow-x: scroll; */
}
.chart-uf {
  background-color: #ffffff;
  height: 142px;
  border-radius: 2px;
  border: 1px solid #c9c9c9;
  
}
/* --- fim  volumetria --- */

/* --- inicio grid --- */

table {
  border-collapse: collapse;
  margin-top: 14px;
  width: 100%;
}
.tooltipTable {
  position: relative;
  height: 0px;
}
.tooltip {
  position: absolute;
  background-color: white;
  padding: 15px 20px;
  overflow: hidden;
  opacity: 0;
  width: 0px;
  height: 0px;
  left: calc(100% - 40%);
  top: 0px;
  right: 0px;
  transition: all 0.6s ease-in-out;
  -webkit-box-shadow: 2px 2px 21px 1px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 2px 2px 21px 1px rgba(0, 0, 0, 0.41);
  box-shadow: 2px 2px 21px 1px rgba(0, 0, 0, 0.41);
  /* overflow-y: scroll; */
}
/* .tooltip::-webkit-scrollbar {
  width: 2px;
} */

/* .tooltip::-webkit-scrollbar-thumb {
  background: #1d375c;
} */
.tooltipTitulo {
  font-weight: bold;
  font-size: 0.8em;
  text-align: left;
}
.tooltipCorpo {
  text-align: left;
  font-size: 0.6em;
  margin-left: 8px;
  margin-bottom: 10px;
}
.tooltipTexto {
  transition: all 1s;
  opacity: 0;
}
.exibirTextoToltip {
  opacity: 1;
}
.tooltipAberto {
  height: 170px;
  width: 384px;
  opacity: 1;
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
  height: 43px;
  font-size: 1em;
  text-align: center;
  color: #59595a;
  background: #F6F6F6
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
tbody > tr:last-of-type {
  background-color: #edf0f2;
}
tbody > tr {
  font-weight: bold;
  font-size: 0.9em;
}
.scale-preditivo {
  -webkit-transition: 1s ease-in-out;
  -moz-transition: 1s ease-in-out;
  -o-transition: 1s ease-in-out;
  transition: 1s ease-in-out;
}
.scale-preditivo-ativado {
  transform: scale(1.6);
  -moz-transform: scale(1.6);
  -o-transform: scale(1.6);
  -webkit-transform: scale(1.6);
  color: #1d375c;
}
.volumetria-grid-resultado {
  display: flex;
  max-width: 96%;
}

/* --- fim grid --- */
</style>
