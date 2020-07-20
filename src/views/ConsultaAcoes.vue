<template>
  <div class="container-Consulta">
    <div class="container-titulo">
      <p>CONSULTAR AÇÕES</p>
    </div>
    <div class="tooltip-extendido">
      <tooltip :class="[exibicaoTooltip ? 'tootip-exibir' : '', 'tooltip']">
        <div @click="exibirTooltip = false" class="fechar-tooltip">
          <img src="../assets/btn-fecha-tootip.png" alt="fechar" />
        </div>
        <div style="width:220px">
          <p>
            Este campo não é obrigatório, porém sua pesquisa será ainda mais
            assertiva caso seja preenchido corretamente.
          </p>
        </div>
        <div class="conf-exib-msg">
          <p @click="exibirTooltip = false">Não exibir essa mensagem novamente</p>
        </div>
      </tooltip>
    </div>
    <div class="consulta-formulario-line">
      <div class="consulta-form-input">
        <p>Nome*</p>
        <a-input
          v-model="parametrosConsulta.nome"
          @click="nomeValidado = true"
          :class="[!nomeValidado ? 'erroInput' : 'erroResetInput']"
          style="width: 340px"
        />
        <p v-if="!nomeValidado" style="color:red">Preencha o campo corretamente</p>
      </div>
      <div class="consulta-form-input">
        <p style="z-index:-99">CPF/CNPJ</p>
        <a-input
          @click.once="exibirTooltip = true"
          v-mask="['###.###.###-##', '##.###.###/####-##']"
          v-model="parametrosConsulta.documento"
          style="width: 340px"
        />
      </div>
    </div>
    <div class="consulta-formulario-line align-items-end">
      <div class="consulta-form-input">
        <a-checkbox
          v-model="parametrosConsulta.possuiSigla"
          class="consulta-form-checkbox"
          @click="resetarInputSigla"
        >O nome possui sigla?</a-checkbox>
        <a-input
          @click="resetarInputSigla"
          :class="[
            !siglaValidado ? 'erroInput' : 'erroResetInput',
            'tam-input-340',
          ]"
          v-model="parametrosConsulta.sigla"
          :disabled="!parametrosConsulta.possuiSigla"
        />
        <p v-if="!siglaValidado" style="color:red">Preencha o campo corretamente</p>
      </div>
      <div style="width:340px">
        <p style="margin-bottom:4px">Data de distribuição</p>
        <div class="consulta-form-calender">
          <a-month-picker
            format="MM/YYYY"
            class="consulta-form-calender-item"
            placeholder="Mês / Ano"
            v-model="dataDistIni"
          />
          <a-month-picker
            format="MM/YYYY"
            class="consulta-form-calender-item"
            placeholder="Mês / Ano"
            v-model="dataDistFim"
          />
        </div>
      </div>
    </div>
    <div class="consulta-formulario-line consulta-form-top-33">
      <div class="consulta-form-input" style="min-width: 172px;height: 32px;">
        <multiSelect
          textAlignTextButtom="center"
          nomeCampo="Tipo Pessoa"
          paddingLeftTextButtom="45px"
          v-model="dataSetTipoPessoa"
          :desmarcarItem="false"
          :exibirIndicadorItem="false"
        />
        <div class="result alt-input-100">
          <div v-for="(item, index) in dataSetTipoPessoaSelecionado" :key="index">
            <span>{{ item.nome }}</span>
            <span @click="desmarcarItemTipoPessoa(item)">
              <small>
                <img src="../assets/minix.png" alt="fechar" />
              </small>
            </span>
          </div>
        </div>
      </div>
      <div class="consulta-form-input" style="min-width: 158px;height: 32px;">
        <multiSelect
          textAlignTextButtom="center"
          nomeCampo="Justiça"
          paddingLeftTextButtom="45px"
          v-model="dataSetJustica"
          :desmarcarItem="false"
          :exibirIndicadorItem="false"
        />
        <div class="result alt-input-100">
          <div v-for="(item, index) in dataSetJusticaSelecinado" :key="index">
            <span>{{ item.nome }}</span>
            <span @click="desmarcarItemJustica(item)">
              <small>
                <img src="../assets/minix.png" alt="fechar" />
              </small>
            </span>
          </div>
        </div>
      </div>
      <div class="consulta-form-input" style="min-width: 169px;height: 32px;">
        <multiSelect
          textAlignTextButtom="center"
          nomeCampo="Partes"
          paddingLeftTextButtom="45px"
          v-model="dataSetParte"
          :desmarcarItem="false"
          :exibirIndicadorItem="false"
        />
        <div class="result">
          <div v-for="(item, index) in dataSetParteSelecinado" :key="index">
            <span>{{ item.nome }}</span>
            <span @click="desmarcarItemParte(item)">
              <small>
                <img src="../assets/minix.png" alt="fechar" />
              </small>
            </span>
          </div>
        </div>
      </div>
      <div class="consulta-form-input" style="min-width: 158px;height: 32px;">
        <multiSelect
          textAlignTextButtom="center"
          nomeCampo="UF"
          paddingLeftTextButtom="45px"
          :desmarcarItem="false"
          :exibirBarraRolagem="true"
          :exibirIndicadorItem="false"
          v-model="dataSetUf"
        />
      </div>
    </div>
    <div class="form-input-extendido">
      <div class="result result-expandido">
        <div v-for="(item, index) in dataSetUfSelecinado" :key="index">
          <span>{{ item.nome }}</span>
          <span @click="desmarcarItemUf(item)">
            <small>
              <img src="../assets/minix.png" alt="fechar" />
            </small>
          </span>
        </div>
      </div>
    </div>
    <div class="btn-consulta">
      <div>
        <a-button @click="consultar" class="consulta-form-btn">Consultar</a-button>
      </div>
      <div>
        <p>Essa primeira Consulta tem um valor de R$10,00</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import multiSelect from "@/components/input/select/multiSelect/MultiConsult.vue";
import { dataSetUf } from "../valuesInput/dataSetUf.js";
import { dataSetJustica } from "../valuesInput/dataSetJustica.js";
import { dataSetParte } from "../valuesInput/dataSetParte.js";
import { dataSetTipoPessoa } from "../valuesInput/dataSetTipoPessoa.js";
import consultProcessosApi from "../api/consultProcessosApi.js";
import tooltip from "@/components/ToolTip.vue";
import { SET_RESULT_VOLUMETRIA } from "../store/actions";
import { SET_PARAMETROS_CONSULT_VOLUMETRIA } from "../store/actions";
import { SET_STATUS_PESQUISA } from "../store/actions";

export default {
  name: "consulta-acoes",
  directives: { mask },
  components: {
    tooltip,
    multiSelect
  },
  data() {
    return {
      parametrosConsulta: {
        nome: "",
        documento: "",
        possuiSigla: false,
        sigla: "",
        ufs: [],
        tipoPessoa: [],
        justicas: [],
        partes: [],
        dataDistribuicaoInicio: "",
        dataDistribuicaoFim: ""
      },
      dataDistIni: "",
      dataDistFim: "",
      nomeValidado: true,
      siglaValidado: true,
      exibirTooltip: false,
      dataSetUf: dataSetUf,
      dataSetJustica: dataSetJustica,
      dataSetParte: dataSetParte,
      dataSetTipoPessoa: dataSetTipoPessoa
    };
  },

  mounted() {
    this.cleanInput();
  },
  computed: {
    dataSetJusticaSelecinado() {
      let result = this.dataSetJustica.filter(item => {
        return item.marcado == true;
      });
      return result;
    },
    dataSetParteSelecinado() {
      let result = this.dataSetParte.filter(item => {
        return item.marcado == true;
      });
      return result;
    },
    dataSetUfSelecinado() {
      let result = this.dataSetUf.filter(item => {
        return item.marcado == true && item.nome != "Todas";
      });

      // console.log(ok);

      return result;
    },
    dataSetTipoPessoaSelecionado() {
      let result = this.dataSetTipoPessoa.filter(item => {
        return item.marcado == true;
      });
      return result;
    },

    exibicaoTooltip() {
      if (this.exibirTooltip === true) {
        return true;
      }
      return false;
    }
  },
  methods: {
    desmarcarItemJustica(index) {
      this.dataSetJustica.map(function(item) {
        if (item.nome == index.nome) {
          item.marcado = false;
        }
      });
    },
    desmarcarItemParte(index) {
      this.dataSetParte.map(function(item) {
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
      let itemPrincipal = this.dataSetUf
        .map(x => x)
        .filter(y => y.nome == "Todas");
      itemPrincipal[0].marcado = false;
    },
    desmarcarItemTipoPessoa(index) {
      this.dataSetTipoPessoa.map(function(item) {
        if (item.nome == index.nome) {
          item.marcado = false;
        }
      });
    },

    tratarData(data, tipo) {
      var d = new Date(data);
      var anoC = d.getFullYear();
      var mesC = d.getMonth();
      var d1 = new Date(anoC, mesC, 1);
      var d2 = new Date(anoC, mesC + 1, 0);

      if (tipo == "I") {
        return (
          parseInt(d1.getMonth()) +
          1 +
          "/" +
          d1.getDate() +
          "/" +
          d1.getFullYear()
        );
      } else {
        return (
          parseInt(d2.getMonth()) +
          1 +
          "/" +
          d2.getDate() +
          "/" +
          d2.getFullYear()
        );
      }
    },
    consultar() {
      this.parametrosConsulta.ufs = this.getOpcoesSelecionadas(
        this.dataSetUfSelecinado
      );
      this.parametrosConsulta.justicas = this.getOpcoesSelecionadas(
        this.dataSetJusticaSelecinado
      );
      this.parametrosConsulta.partes = this.getOpcoesSelecionadas(
        this.dataSetParteSelecinado
      );
      this.parametrosConsulta.tipoPessoa = this.getOpcoesSelecionadas(
        this.dataSetTipoPessoa
      );

      if (this.dataDistIni && this.dataDistFim) {
        this.parametrosConsulta.dataDistribuicaoInicio = this.tratarData(
          this.dataDistIni,
          "I"
        );
        this.parametrosConsulta.dataDistribuicaoFim = this.tratarData(
          this.dataDistFim,
          ""
        );
      }
      console.log(dadosFakeResul);

      let dadosFakeResul = {
        Key: "nomeamericanasltda;documento072479707656678413ufperj",
        ResultPesq: {
          totalConsultaAcoes: {
            quantidade: "20000",
            valor: "10,00"
          },
          totalVolumetriaConsumo: {
            quantidade: "20000",
            valor: "200,00"
          },

          justica: [
            {
              Nome: "Estadual",
              Qtd: "20"
            },
            {
              Nome: "Federal",
              Qtd: "20"
            },
            {
              Nome: "Trabalhista",
              Qtd: "20"
            }
          ],
          parte: [
            {
              Nome: "reu",
              Qtd: "200"
            },
            {
              Nome: "autor",
              Qtd: "200"
            }
          ],
          UF: [
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
      let test = {
        AC: "10",
        AL: "4567",
        PE: "2",
        RJ: "1",
        BA: "4"
      };

      for (var [key, value] of Object.entries(test)) {
        dadosFakeResul.ResultPesq.UF.filter(n => n.Nome === key)[0].Qtd = value;
      }

      if (this.validar()) {
        consultProcessosApi
          .buscarProcessosVolumetria(this.parametrosConsulta)
          .then(response => {
            if (response.status == 200) {
              console.log("entrei");
            }
          });
        this.$store.dispatch(
          SET_PARAMETROS_CONSULT_VOLUMETRIA,
          this.parametrosConsulta
        );
        this.$store.dispatch(SET_STATUS_PESQUISA, true);
        this.$store.dispatch(SET_RESULT_VOLUMETRIA, dadosFakeResul);
        this.$router.push({ name: "ResultadoConsultaAcoes" });
      }
    },
    validar() {
      let validado = true;
      if (!this.parametrosConsulta.nome) {
        this.nomeValidado = false;
        validado = false;
      }

      if (
        this.parametrosConsulta.possuiSigla &&
        !this.parametrosConsulta.sigla
      ) {
        this.siglaValidado = false;
        validado = false;
      }

      return validado;
    },
    resetarInputSigla() {
      this.parametrosConsulta.sigla = "";
      this.siglaValidado = true;
    },
    cleanInput() {
      // console.log("MOUNTED");
      dataSetJustica.map(x => (x.marcado = false));
      dataSetParte.map(x => (x.marcado = false));
      dataSetUf.map(x => (x.marcado = false));
      dataSetTipoPessoa.map(x => (x.marcado = false));
    },
    getOpcoesSelecionadas(dataSet) {
      let arrItem = dataSet
        .map(arr => arr.nome)
        .reduce(function(arr, item) {
          arr.push(item);
          return arr;
        }, []);
      return arrItem;
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
  font-size: 0.8em;
}
.container-Consulta {
  margin-top: 65px;
  animation: fadeOut 0.3s;
}
@keyframes fadeOut {
  from {
    opacity: 0;
    margin-top: 50px;
  }
  to {
    opacity: 1;
    /* margin-top: 17px; */
  }
}

.container-titulo {
  height: 1px;
}
.container-titulo > p {
  margin: 0px;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  color: #525252;
}
.consulta-formulario-line {
  display: flex;
  align-items: unset;
  align-content: center;
  flex-wrap: wrap;
  margin: 0 auto 7px auto;
  max-width: 690px;
  justify-content: space-between;
}
.tooltip-extendido {
  max-width: 890px;
  margin: 5px auto;
  display: flex;
  justify-content: flex-end;
}
.tooltip {
  transition: all 0.3s;
  /* z-index: 9999; */
  opacity: 0;
  width: 264px;
  height: 95px;
  background-color: #edf0f2;
  color: #676868;
  text-align: initial;
  font-size: 1.1em !important;
  padding: 3px 5px 3px 13px;
}
.tootip-exibir {
  opacity: 1;
}

.conf-exib-msg {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 10px;
}
.conf-exib-msg p {
  font-size: 0.6em;
  color: #406bd1;
  cursor: pointer;
}
.fechar-tooltip {
  display: flex;
  justify-content: flex-end;
}
.fechar-tooltip img {
  width: 13px;
  cursor: pointer;
}

.consulta-formulario-line .consulta-form-input {
  max-width: 340px;
  padding: 0;
  margin: 0;
}
.consulta-formulario-line .consulta-form-input p {
  margin-bottom: 11px;
}
.consulta-form-top-33 {
  margin-top: 33px;
}
.consulta-form-checkbox {
  margin-bottom: 8px;
  font-size: 0.8em;
}
.tam-input-340 {
  width: 340px;
}
.alt-input-100 {
  max-height: 147px;
}
.consulta-form-select {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 694px;
  max-height: 100px;
}
.align-items-end {
  align-items: flex-end;
}
.consulta-form-calender {
  display: flex;
  max-width: 490px;
  justify-content: space-between;
}
.consulta-form-calender-item {
  /* margin-right: 50px; */
  width: 166px;
}
.consulta-form-btn {
  margin: 67px auto auto auto;
  font-size: 0.9em;
}
.ant-btn {
  background-color: #001a3f;
  width: 148px;
  height: 35px;
  color: #c1c8d1;
}
.ant-btn:active {
  background-color: #001a3f81;
}
p {
  color: #837878;
}
.result {
  display: flex;
  max-width: 155px;
  flex-wrap: wrap;

  margin-top: 6px;
  height: 1px;
}
.result-expandido {
  max-width: 325px;
  margin-left: 71%;

  height: 1px;
}
.form-input-extendido {
  max-width: 890px;
  padding: 0;
  margin: 0 auto;
  margin-top: -3px;
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
  flex: 1 1 1;
  font-size: 0.8em;
  margin-top: 3px;
}
.result div span:nth-child(2) {
  margin-top: -2px;
}
.result div span img {
  width: 14px;
  border-radius: 50%;
  margin-left: 4px;
}
.btn-consulta {
  margin: 56px auto;
}
.btn-consulta div:nth-child(1) {
  margin: 0 auto;
  width: 149px;
}
.btn-consulta div:nth-child(2) {
  margin: 0 auto;
  max-width: 220px;
}
.btn-consulta p {
  margin-top: 3px;
  font-size: 0.7em;
  color: #888888;
}
</style>
