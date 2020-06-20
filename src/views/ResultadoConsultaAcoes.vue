<template>
  <div class="container-resultado-consulta">
    <div class="resultado-consulta-indicador">
      <div class="titulo">
        <p>
          <span>Volumetria</span>
          <span>- Total de 530 Processos encontrados</span>
        </p>
      </div>
      <div class="container-chart">
        <div class="container-chart-item-justica">
          <LineChart
            class="chart-justica"
            tituloChart="Justiça"
            :chart-data="datacollectionJustica"
          ></LineChart>
        </div>
        <div class="container-chart-item-parte">
          <LineChart class="chart-parte" tituloChart="Partes" :chart-data="datacollectionParte"></LineChart>
        </div>

        <div class="container-chart-item-uf">
          <LineChart class="chart-uf" tituloChart="UF" :chart-data="datacollectionUf"></LineChart>
        </div>
      </div>
    </div>
    <div class="consulta-filtro">
      <div class="consulta-filtro-titulo">
        <p>Selecionar Volumetria</p>
      </div>
      <div class="consulta-filtro-form">
        <div class="consulta-filtro-form-item">
          <a-select
            v-model="parametrosConsulta.justica"
            style="max-width: 180px; min-width:180px;"
            placeholder="Justiça"
            mode="multiple"
          >
            <a-select-option value="ESTADUAL">Estadual</a-select-option>
            <a-select-option value="FEDERAL">Federal</a-select-option>
            <a-select-option value="TRABALHISTA">Trabalhista</a-select-option>
          </a-select>
        </div>
        <div class="consulta-filtro-form-item">
          <a-select
            v-model="parametrosConsulta.partes"
            mode="multiple"
            placeholder="Partes"
            style="width: 100px"
          >
            <a-select-option value="REU">Réu</a-select-option>
            <a-select-option value="AUTOR">Autor</a-select-option>
          </a-select>
        </div>
        <div class="consulta-filtro-form-item">
          <a-select
            v-model="parametrosConsulta.uf"
            mode="multiple"
            style="max-width: 340px;min-width:340px"
            placeholder="UF"
          >
            <a-select-option value=" Todas">Todas</a-select-option>
            <a-select-option value="AC">AC</a-select-option>
            <a-select-option value="AL">AL</a-select-option>
            <a-select-option value="AP">AP</a-select-option>
            <a-select-option value="AM">AM</a-select-option>
            <a-select-option value="BA">BA</a-select-option>
            <a-select-option value="CE">CE</a-select-option>
            <a-select-option value="DF">DF</a-select-option>
            <a-select-option value="ES">ES</a-select-option>
            <a-select-option value="GO">GO</a-select-option>
            <a-select-option value="MA">MA</a-select-option>
            <a-select-option value="MT">MT</a-select-option>
            <a-select-option value="MS">MS</a-select-option>
            <a-select-option value="MG">MG</a-select-option>
            <a-select-option value="PA">PA</a-select-option>
            <a-select-option value="PB">PB</a-select-option>
            <a-select-option value="PR">PR</a-select-option>
            <a-select-option value="PE">PE</a-select-option>
            <a-select-option value="PI">PI</a-select-option>
            <a-select-option value="RJ">RJ</a-select-option>
            <a-select-option value="RN">RN</a-select-option>
            <a-select-option value="RS">RS</a-select-option>
            <a-select-option value="RO">RO</a-select-option>
            <a-select-option value="RR">RR</a-select-option>
            <a-select-option value="SC">SC</a-select-option>
            <a-select-option value="SP">SP</a-select-option>
            <a-select-option value="SE">SE</a-select-option>
            <a-select-option value="TO">TO</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div class="consulta-form-filtro-btn">
      <table class="consulta-tabela-preco">
        <tr class="consulta-tabela-preco-item">
          <td class="preco-item-titulo">Desc</td>
          <td class="preco-item-titulo">Qt. de processos</td>
          <td class="preco-item-titulo">R$</td>
        </tr>
        <tr class="consulta-tabela-preco-item">
          <td class="colorTableCell">RS;SP</td>
          <td class="colorTableCell">447</td>
          <td class="colorTableCell">575,00</td>
        </tr>
        <tr class="consulta-tabela-preco-item">
          <td>Predito</td>
          <td>447</td>
          <td>275,00</td>
        </tr>
        <tr class="consulta-tabela-preco-item">
          <td class="colorTableCell">total de consumo</td>
          <td class="colorTableCell">447</td>
          <td class="colorTableCell colorTableCellValorTotal">845,00</td>
        </tr>
      </table>
      <div class="consulta-form-pesquisa">
        <div class="pesquisa-preditivo">
          <a-checkbox>Adicionar o Preditivo</a-checkbox>
        </div>
        <div class="consulta-form-filtro-btn-block-item">
          <div class="consulta-form-filtro-btn-item">
            <a style="user-select:none">ADIQUERIR TODA VOLUMETRIA</a>
          </div>
          <div class="consulta-form-filtro-btn-item">
            <a style="user-select:none">ADIQUERIR VOLUMETRIA SELECIONADA</a>
          </div>
        </div>
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
    LineChart
  },
  data() {
    return {
      agrupamentoUf: "",
      agrupamentoJustica: "",
      datacollectionJustica: {},
      datacollectionParte: {},
      datacollectionUf: {},
      parametrosConsulta: {
        justica: [],
        partes: [],
        uf: []
      }
    };
  },

  mounted() {
    this.buscarProcessosResumo();
    this.fillData();
  },
  methods: {
    buscarProcessosResumo() {
      consultProcessosApi.buscarProcessosResumo().then(response => {
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
            // label: "Qtd",
            backgroundColor: "#FFFFFF",
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
              this.getRandomInt()
            ]
          }
        ]
      };
      this.datacollectionParte = {
        labels: ["Réu", "Autor"],

        datasets: [
          {
            // label: "Data One",
            backgroundColor: "#FFFFFF",
            barThickness: 6,
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
}
.container-resultado-consulta {
  padding: 4px 20px 0px 20px;
}
.resultado-consulta-indicador {
  background-color: #f2f4f5;
  height: 228px;
  display: block;
}
.titulo p {
  margin-bottom: 10px;
  margin-left: 8px;
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
  max-width: 1480px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
.container-chart-item-justica {
  margin-right: 0px;
  max-width: 100vw;
  flex-grow: 0.8;
}
.container-chart-item-parte {
  margin-right: 11px;
  max-width: 100vw;
  flex-grow: 0;
}
.container-chart-item-uf {
  margin-right: 11px;
  max-width: 100vw;
  flex-grow: 2;
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
  max-width: 890px;
  height: 160px;
  border-radius: 10px;
}
.consulta-filtro {
  max-width: 100vw;
  flex-wrap: wrap;
  height: 147px;
}
.consulta-filtro-titulo {
  margin-top: 28px;
}
.consulta-filtro-titulo > p {
  text-align: center;
  color: #525252;
  font-size: 1.5em;
  font-weight: bold;
}
.consulta-filtro-form {
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 23px;
}
.consulta-filtro-form-item {
}
.consulta-form-pesquisa {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 660px;
}
.pesquisa-preditivo {
  max-width: 200px;
  margin-top: 30px;
  margin-left: 320px;
  flex-wrap: wrap;
}
.consulta-form-filtro-btn {
  display: flex;
  max-width: 1480px;
  padding-left: 10px;
  flex-wrap: wrap;

  margin: 35px auto;
}
.consulta-form-filtro-btn .consulta-form-filtro-btn-block-item {
  display: flex;
  max-width: 510px;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 150px;
}
/* .consulta-form-pesquisa > div {
  width: 510px;
  display: flex;  
} */
a {
  text-decoration: none;
  color: #caced4;
}
.consulta-form-filtro-btn-item:nth-child(1) {
  background-color: #648362;
  height: 34px;
  width: 249px;
  font-size: 0.9em;
  text-align: center;
  padding-top: 7px;
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
.consulta-tabela-preco {
  max-width: 243px;
  height: 96px;
  padding: 10px;
  flex: 1;
}

.consulta-tabela-preco-item td {
  font-size: 0.8em;
  padding-bottom: 8px;
  color: #878889;
}

.colorTableCell {
  background-color: #edf0f2;
}
.colorTableCellValorTotal {
  color: #525252 !important;
  font-size: 11px !important;
  font-weight: bold !important;
}
.consulta-tabela-preco-item td:nth-child(2) {
  font-size: 0.8em;
  padding-bottom: 7px;
  text-align: center;
}
.consulta-tabela-preco-item td:nth-child(3) {
  font-size: 0.8em;
  padding-bottom: 7px;
  text-align: center;
}
.preco-item-titulo {
  font-size: 0.9 !important;
  color: #1d375c !important;
  font-weight: bold;
}
.btn-login > .ant-btn:active {
  background-color: #001a3f81;
}
</style>
