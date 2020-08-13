<template>
  <div class="his-bl">
    <LoadCircle :exibirLoad="realizandoRequisicao" sizeCircle="100px" pwidth="100%" pheight="92%" />
    <div class="his-bl-block">
      <div class="his-bl-titulo">PASSIVO JURÍDICO</div>
      <div class="his-bl-form">
        <div class="consulta-form-input">
          <p>Razão Social</p>
          <a-input v-model="parametrosConsulta.razao_social" style="width: 340px" />
        </div>
        <div class="consulta-form-input">
          <p>CNPJ</p>

          <a-input
            v-mask="['##.###.###/####-##']"
            v-model="parametrosConsulta.cnpj"
            style="width: 340px"
          />
        </div>
      </div>
      <div @click="consultar" class="btn-consulta">
        <a class="consulta-form-btn">Consultar</a>
      </div>
    </div>
    <p style="text-align:center" v-if="msgRetornoRequest">{{this.msgRetornoRequest}}</p>
    <table :class="[resultRequestEvjd.evjd ? 'exibirTable' : '']">
      <thead>
        <th>Passivo Jurídico</th>
        <th>Lower Bound</th>
        <th>Upper Bound</th>
        <th>Qtde Processos
            <img
              @click="[exibirtooltipTable = !exibirtooltipTable, exibirCorpoTooltip = false]"
              src="../../assets/icons/incon-info-negativo.png"
              alt="info"
              style="cursor:pointer; width:15px"
            />
            <div class="tooltipTable">
              <div :class="[exibirtooltipTable ? 'tooltipAberto' : '', 'tooltip']">
                <div :class="[exibirCorpoTooltip ? 'exibirTextoToltip':'','tooltipTexto']">
                  <p class="tooltipTitulo">Processos identificados na base Kurier que não possuem evidência de terem sido sentenciados</p>
                </div>
              </div>
            </div>
        </th>
      </thead>
      <tbody>
        <tr>
          <td>{{resultRequestEvjd.evjd}}</td>
          <td>{{resultRequestEvjd.lowerBound}}</td>
          <td>{{resultRequestEvjd.upperBound}}</td>
          <td>{{resultRequestEvjd.totalProcesso}}</td>
        </tr>
      </tbody>
    </table>
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
</template>
<script>
import consultProcessosApi from "../../api/consultEvjdApi.js";
import LoadCircle from "../../components/Load/LoadCircle.vue";
import { mask } from "vue-the-mask";

export default {
  name: "PassivoJuridico",
  components: { LoadCircle },
  directives: { mask },
  data() {
    return {
      parametrosConsulta:
        {
          razao_social: "",
          cnpj: "",
        },
      resultRequestEvjd: {
        evjd: "",
        lowerBound: "",
        upperBound: "",
        totalProcesso: "",
      },
      msgRetornoRequest:"",
      realizandoRequisicao: false,
      exibirtooltipTable: false,
      exibirCorpoTooltip: false,
    };
  },
  watch: {
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
  methods: {
    consultar() {
      this.resultRequestEvjd.evjd = ""
      this.resultRequestEvjd.lowerBound = ""
      this.resultRequestEvjd.upperBound = ""
      this.resultRequestEvjd.totalProcesso = ""
      this.msgRetornoRequest=""
      if(this.parametrosConsulta.razao_social != "" && this.parametrosConsulta.cnpj != ""){
      this.parametrosConsulta.cnpj = this.parametrosConsulta.cnpj.replace("-", "")
        .replace(".", "")
        .replace(".", "")
        .replace("/", "")
        this.realizandoRequisicao = true;
      consultProcessosApi
        .solicitarDadosEvjd(this.parametrosConsulta)
        .then((response) => {
          if (response.status == 200) {
            this.realizandoRequisicao = false;
            if(response.data.Success == true){
              let result = response.data.Content;
              console.log(result)
              this.resultRequestEvjd.evjd = result.evjd.toLocaleString(
                "pt-BR", { style: "currency", currency: "BRL" }
              );
              this.resultRequestEvjd.lowerBound = result.lower_bound.toLocaleString(
                "pt-BR", { style: "currency", currency: "BRL" }
              );
              this.resultRequestEvjd.upperBound = result.upper_bound.toLocaleString(
                "pt-BR", { style: "currency", currency: "BRL" }
              );
              this.resultRequestEvjd.totalProcesso = result.total_processo.toLocaleString(
                "pt-BR"
              );
            }else{
              this.msgRetornoRequest = "Não foi possível gerar o Passivo Jurídico, pois não identificamos processos ativos na base Kurier para esta empresa."
            }
          } else {
            this.realizandoRequisicao = false;
            this.$notify({
              group: "general",
              title:
                "Ocorreu um erro inesperado, tente novamente em alguns instantes.",

              duration: 5000,

              speed: 700,
            });
          }
        }).catch(()=>{
          this.realizandoRequisicao = false;
            this.$notify({
              group: "general",
              title:
                "Ocorreu um erro inesperado, tente novamente em alguns instantes.",

              duration: 5000,

              speed: 700,
            });
        });
      }
    },
  },
};
</script>
<style scoped>
p {
  margin: 0px;
}
.his-bl {
  margin: 0 auto;
  /* position: relative; */
}
@media screen and (max-width:700px) {
  .his-bl {
    padding: 30px;
  }
}
@keyframes fadeOut {
  from {
    opacity: 0;
    padding-top: 50px;
  }
  to {
    opacity: 1;
    /* margin-top: 17px; */
  }
}
.his-bl-titulo {
  animation: fadeOut 0.3s;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 131px;
  padding-top: 65px;
}
.his-bl-form {
  display: flex;
  margin: 0 auto;
  max-width: 700px;
  justify-content: space-between;
}
@media screen and (max-width:700px) {
  .his-bl-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 700px;
  justify-content: space-between;
}
}
.btn-consulta:active {
  background-color: rgb(3, 51, 119);
}
.btn-consulta {
  cursor: pointer;
  width: 144px;
  margin: 59px auto;
  padding-top: 5px;
  height: 32px;
  background-color: #001a3f;

  text-align: center;
}
a {
  color: rgb(194, 189, 189);
}
.consulta-form-btn {
  margin: 67px auto auto auto;
  font-size: 0.9em;
}
table {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-collapse: collapse;
  transition: all 0.4s;
  opacity: 0;
}
.exibirTable {
  opacity: 1;
}
table,
th,
td {
  border: 1px solid #a8b2c0;
  text-align: center;
}
th {
  height: 32px;
  background-color: #1d375c;
  color: white;
  font-size: 0.9em;
}
td {
  height: 60px;
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
  left: calc(100% - 25%);
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
  color:#59595a;
}
.tooltipTexto {
  transition: all 1s;
  opacity: 0;
}
.exibirTextoToltip {
  opacity: 1;
}
.tooltipAberto {
  height: 60px;
  width: 384px;
  opacity: 1;
}

</style>