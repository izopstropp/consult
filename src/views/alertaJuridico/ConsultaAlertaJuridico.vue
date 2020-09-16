<template>
  <div class="aj-container">
    <p class="aj-titulo">ALERTAS DE MONITORAMENTO</p>
    <div class="aj-bl1">
      <div>
        <p>Filtrar pelo termo:</p>
        <a-input v-model="termoFiltro" class="aj-filtro"></a-input>
      </div>
    </div>
    <div class="aj-bl2">
      <p>
        Você possui
        <span class="color-red">{{qtdDadosNaoObtidos}}</span> novo(s) alerta(s)!
      </p>
      <!-- <p>
        
      </p> -->
    </div>
    <table>
      <thead>
        <th>Termo Monitorado</th>
        <th>Data do Alerta</th>
        <th style="width: 290px">Descrição do Alerta</th>
        <th style="width: 30px"></th>
        <th>Obter Dados <a-checkbox v-model="selecionarTodos" class='check-obter-todos' @click="selecionarTodosAlertas"></a-checkbox></th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in gerarRegistroPorPagina" :key="index">
          <td>{{item.TermoMonitorado}}</td>
          <td>{{formatacaoData(item.DataAlerta)}}</td>
          <td
            v-if="item.ResumoVisualizado || item.DadosObtidos"
            class="text-align-left padding-left-20"
          >
            Foram encontrados <strong>{{item.Volumetria.QtdProcesso}}</strong> novo(s) processo(s).
            <br />
            <strong>Justiça:</strong> {{item.Volumetria.Justica.reduce((acc,cur) =>acc + cur.Qtd +" "+fomatarCampoExibicao(cur.Nome) +", ","").slice(0, -2)}}
            <br />
            <strong>Partes:</strong> {{item.Volumetria.Partes.reduce((acc,cur) =>acc + cur.Qtd +" "+ fomatarCampoExibicao(cur.Nome) +", ","").slice(0, -2)}}
            <br />
            <strong>UF:</strong> {{item.Volumetria.UF.reduce((acc,cur) =>acc + cur.Qtd +" "+cur.Nome +", ","").slice(0, -2)}}
          </td>
          <td v-else :class="[!item.ResumoVisualizado ? 'link-alert-open':'text-align-left padding-left-20']">
            <p
              @click="[item.ResumoVisualizado = true, confirmarVisualizacaoResumo(item.AlertaId)]"
            >Acesse Aqui</p>
          </td>
          <td></td>
          <td style="width:90px">
            <!-- <a-checkbox v-model="item.dadosObtidos" v-if="!item.resumoVisualizado"></a-checkbox> -->
            <a-checkbox v-model="item.ObterDados"></a-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="display: flex; justify-content: flex-end; margin-top: 10px">
      <a-checkbox v-model="selecionarTodos" @click="selecionarTodosAlertas">Selecionar todos</a-checkbox>
    </p>
    <div class="rel-bl1">
      <div>
        <router-link
          :to="{name:'monitoramento-cadastrado'}"
          tag="a-button"
          a-button
          class="ant-btn-green"
        >Consultar meus monitoramentos</router-link>
      </div>
      <div class="rel-bl1-page">
        <div>
          <div class="rel-bl1-page-selec">
            <a-input class="rel-bl1-page-selec-input" :value="this.paginacao.paginaAtual" />
            <p>/{{ totalPage }}</p>
          </div>
          <div class="rel-bl1-page-direc">
            <div
              @click="navegacaoPagina('a')"
              :class="[
                this.paginacao.paginaAtual <= 1? 'page-direct-disable' : '',
                'rel-bl1-page-direc-a',
              ]"
            >
              <p>&lt;</p>
            </div>
            <div
              @click="navegacaoPagina('p')"
              :class="[
                this.paginacao.paginaAtual>= totalPage
                  ? 'page-direct-disable'
                  : '',
                'rel-bl1-page-direc-p',
              ]"
            >
              <p>&gt;</p>
            </div>
          </div>
        </div>
        <div>
          <a-button @click="solicitarDadosAlerta" :disabled="dadosSelecionados.length > 0 ? false : true">Obter dados selecionados</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import alertaJuridicoApi from "../../api/consultAlertaJuridico.js"

export default {
  name: "alertaMonitoramento",
  
  data() {
    return {
      selecionarTodos: false,
      paginacao: {
        limiteItensPagina: 7,
        paginaAtual: 1,
      },
      listaAlerta:[],
      termoFiltro:""
     
    };
  },

  computed: {
    processosDetalhadosFiltrados(){
       return this.listaAlerta.filter(x => x.TermoMonitorado.toString().toLowerCase().includes(this.termoFiltro.toLowerCase()))
    },
    dadosSelecionados(){
      return this.listaAlerta.filter(x=> x.ObterDados === true)
    },
    qtdDadosNaoObtidos() {
      return this.listaAlerta.filter((x) => x.ResumoVisualizado === false && x.DadosObtidos === false).length;
    },
    totalPage() {
      let totalPage = Math.ceil(
        this.processosDetalhadosFiltrados.length / this.paginacao.limiteItensPagina
      );
      return totalPage;
    },
    gerarRegistroPorPagina() {
      let registrosPorPagina = [];
      let totalPage = this.totalPage;
      let qtdRegistrosAnteriores =
        this.paginacao.paginaAtual * this.paginacao.limiteItensPagina -
        this.paginacao.limiteItensPagina;
      let qtdRegistroExibicao =
        qtdRegistrosAnteriores + this.paginacao.limiteItensPagina;
      if (this.paginacao.paginaAtual <= totalPage) {
        for (let i = qtdRegistrosAnteriores; i < qtdRegistroExibicao; i++) {
          if (this.processosDetalhadosFiltrados[i] != null) {
            registrosPorPagina.push(this.processosDetalhadosFiltrados[i]);
          }
        }
      }
      return registrosPorPagina;
    },
  },
  // watch: {
  //   selecionarTodos: {
  //     handler() {
  //       this.listaAlerta.map((y) => (y.ObterDados = this.selecionarTodos));
  //     },
  //   },
  // },
  beforeMount() {
    this.carregarAlertasJuridico();
  },
  
  methods: {
    formatacaoData(data){
      var d = new Date(data);
      return d.toLocaleDateString();
    },
    selecionarTodosAlertas(){
      this.selecionarTodos = !this.selecionarTodos
      this.listaAlerta.map((y) => (y.ObterDados = this.selecionarTodos));
    },
    solicitarDadosAlerta(){
       alertaJuridicoApi.solicitarDadosAlerta(this.dadosSelecionados.map(x=> x.AlertaId)).then(response => {
        if(response.status == 200){
          let alertasId= this.dadosSelecionados.map(x=> x.AlertaId)
          
           alertasId.map(x => this.listaAlerta.filter(y => y.AlertaId == x ).map(h=> h.DadosObtidos = true))
      
          
        }
      })
    },
    confirmarVisualizacaoResumo(alertaId){
      alertaJuridicoApi.confirmarVisualizacaoResumo(alertaId).then(response => {
        if(response.status == 200){
          // console.log()
        }
      })
    },
    carregarAlertasJuridico(){
      alertaJuridicoApi.buscarAlertasPorUsuario().then(response =>{
        if(response.status == 200){
          this.listaAlerta = response.data.Content
        }
      })
    },
    navegacaoPagina(tipo) {
      if (tipo == "p") {
        this.paginacao.paginaAtual++;
      } else {
        this.paginacao.paginaAtual--;
      }
    },
    fomatarCampoExibicao(string){
       return string.charAt(0).toUpperCase() + string.slice(1);
    },
    test() {
      let listaAlerta2 = [
        {
          termoMonitorado: "NOVO",
          dataAlerta: "12/01/2010",
          descricaoAlerta: "NOVO",
          resumoVisualizado: false,
          dadosObtidos: false,
        },
      ];

      let r1 = listaAlerta2;
      let r2 = this.listaAlerta;
      let r3 = r1.filter((a) => !r2.includes(a));
      r3.map((y) => this.listaAlerta.unshift(y));
    },
  },
};
</script>
<style scoped>
p {
  margin: 0px;
}
/* *{
    border: 1px solid red;
} */
.aj-container {
  margin: 65px auto;
  max-width: 1000px;
  animation: fadeOut 0.3s;
}
@media screen and (max-width: 700px) {
  .aj-container{
    padding: 30px;
  }
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
.aj-titulo {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 80px;
}
.aj-bl1 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.aj-filtro {
  width: 300px;
}
.ant-btn-green {
  background-color: #648362 !important;
  height: 35px;
  color: #c1c8d1;
  border: none;
}
.ant-btn-green:active {
  background-color: #83a081 !important;
}
.ant-btn {
  background-color: #1d375c;
  height: 35px;
  color: #c1c8d1;
  border: none;
}
button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

.ant-btn:active {
  background-color: #001a3f81;
}
.aj-bl2 {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 4px;
}
.color-red {
  color: rgba(187, 7, 7, 0.657);
  text-decoration: underline;
  font-weight: bold;
}
.link-alert-open{
  color: rgba(70, 68, 68, 0.863);
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
}
.text-align-left {
  text-align: left;
}
.padding-left-20 {
  padding-left: 20px;
}
/* TABLE */
table {
  width: 100%;
  border-collapse: collapse;
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
table th:nth-last-child(2),td:nth-last-child(2){
  border-top:hidden;
  background-color: white;
}
table th:nth-last-child(1){
  width: 140px;

}
tr:last-child td:nth-last-child(2){
  border-bottom:hidden;
}
.check-obter-todos{
  margin-left:6px;
}
/* FIM-TABLE */
.rel-bl1 {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 100px;
  flex-wrap: wrap;
}
.rel-bl1-page {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  /* max-width: 200px;  */
  width: 420px;
  /* width: 50px; */
  /* flex: 2; */
}
.rel-bl1-page > div {
  display: flex;
  width: 190px;
  justify-content: space-between;
}
.rel-bl1-page-selec {
  display: flex;
  align-items: center;
}
.rel-bl1-page-selec-input {
  width: 51px;
  height: 31px;
  font-size: 1.2em;
  text-align: center;
}
.rel-bl1-page-selec > p {
  font-size: 1.2em;
  margin-left: 10px;
}
.rel-bl1-page-direc-bottom p {
  font-size: 1.2em;
  margin-left: 10px;
}

.page-direct-disable {
  background-color: #edf0f2 !important;
  pointer-events: none;
  cursor: default;
}
.rel-bl1-page-direc {
  display: flex;
  width: 86px;
  justify-content: space-between;
}
.rel-bl1-page-direc-bottom {
  display: flex;
  margin-top: 34px;
  max-width: 1480px;
  justify-content: flex-end;
}
.rel-bl1-page-direc-bottom-itens {
  display: flex;
  justify-content: space-between;
  width: 86px;
}
.rel-bl1-page-direc-bottom-selec {
  display: flex;
  align-items: center;
  margin-right: 40px;
}
.rel-bl1-page-direc-a {
  height: 33px;
  width: 33px;
  background-color: #1d375c;
  border-radius: 20px 0px 0px 20px;
  cursor: pointer;
}
.rel-bl1-page-direc-a p {
  color: #cacdcf;
  font-weight: bold;
  margin-top: 4px;
  margin-left: 13px;
}
.rel-bl1-page-direc-p {
  height: 33px;
  width: 33px;
  background-color: #1d375c;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
}
.rel-bl1-page-direc-p p {
  color: #cacdcf;
  font-weight: bold;
  margin-top: 4px;
  margin-left: 13px;
}
</style>