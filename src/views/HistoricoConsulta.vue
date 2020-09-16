<template>
  <div class="his-bl">
    <div class="his-bl-block">
      <div class="his-bl-titulo">HISTÓRICO DE CONSULTAS</div>
       <div class="rel-bl1">
          <div class="rel-bl1-filtro">
            <div>
              <label for="data">Data</label>
               <a-month-picker
                format="MM/YYYY"
                class="consulta-form-calender-item"
                placeholder="Mês / Ano"
                v-model="dataConsulta"
                defaultValue=""
              />
            </div>
            <div>
              <label for="data">Tipo Consulta</label>
              <a-input v-model="tipoAcao"/>
            </div>
          </div>
          <div class="rel-bl1-page">
            <div class="rel-bl1-page-selec">
              <a-input
                class="rel-bl1-page-selec-input"
                :value="this.paginaAtual"
              />
              <p>/{{ totalPage }}</p>
            </div>
            <div class="rel-bl1-page-direc">
              <div
                @click="navegacaoPagina('a')"
                :class="[
                  this.paginaAtual <= '1' ? 'page-direct-disable' : '',
                  'rel-bl1-page-direc-a',
                ]"
              >
                <p>&lt;</p>
              </div>
              <div
                @click="navegacaoPagina('p')"
                :class="[
                  this.paginaAtual >= totalPage
                    ? 'page-direct-disable'
                    : '',
                  'rel-bl1-page-direc-p',
                ]"
              >
                <p>&gt;</p>
              </div>
            </div>
          </div>
        </div>
      <div class="his-bl-table">
        <table v-if="gerarRegistroPorPagina.length">
          <thead>
            <th></th>
            <th>Nº Identificação</th>
            <th>Data</th>
            <th>Tipo de consulta</th>
            <th>Valor</th>
            
          </thead>
          <tbody>
              <tr :key="index" v-for="(item, index) in gerarRegistroPorPagina">
                <td class="btn-detalhe" @click="exibirDetalheConsulta(item)"><p :class="[item.exibirDetalhe ? 'item-exib-detalhe-ativo':'','item-exib-detalhe']">+</p>
                  <div style="border:none" :class="[item.exibirDetalhe ? 'model-detalhe-aberto':'','modal-detalhe']">
                    <p class="modal-detalhe-titulo" v-if="item.exibirDetalhe">Detalhes da Consulta</p>
                    <div class="modal-detalhe-container" v-if="item.exibirDetalhe">
                        <p><strong>Termo pesquisado:</strong> {{item.DetalheConsulta.Nome}}</p>
                        <p v-if="item.DetalheConsulta.Sigla"><strong>Sigla</strong>: {{item.DetalheConsulta.Sigla}}</p>
                        <p v-if="item.DetalheConsulta.Documento"><strong>Numero Documento:</strong> {{documentoFormatado(item.DetalheConsulta.Documento)}}</p>
                        <p v-if="item.DetalheConsulta.TipoPessoa"><strong>Tipo Pessoa:</strong> {{item.DetalheConsulta.TipoPessoa.replace(/;/g, ",")}}</p>
                        <p v-if="item.DetalheConsulta.TipoParte"><strong>Tipo Parte:</strong> {{item.DetalheConsulta.TipoParte.replace(/;/g, ",")}}</p>
                        <p v-if="item.DetalheConsulta.Justica"><strong>Justiça:</strong> {{item.DetalheConsulta.Justica.replace(/;/g, ",")}}</p>
                        <p v-if="item.DetalheConsulta.UF"><strong>UF:</strong> {{item.DetalheConsulta.UF.replace(/;/g, ",")}}</p>
                        <p v-if="item.DetalheConsulta.DataDistribuicaoInicio"><strong>Data Distribuicao:</strong> {{formatacaoData(item.DetalheConsulta.DataDistribuicaoInicio)}} - {{formatacaoData(item.DetalheConsulta.DataDistribuicaoFim)}}</p>
                    </div>
                  </div>
                </td>
                <td>{{ formatarId(item.ID) }}</td>
                <td>{{ item.DataCriacao }}</td>
                <td>{{ item.TipoConsulta }}</td>
                <td>{{ item.ValorConsulta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</td>
              </tr>
            <!-- </template> -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import consultProcessosApi from "../api/consultProcessosApi.js";
import Vue from "vue";

export default {
  name: "HistoricoConsulta",

  data() {
    return {
      dadosHistorico: [],
      paginaAtual:1,
      limiteItensPagina:15,
      tipoAcao:'',
      dataConsulta:''
    };
  },
  computed: {
     totalPage() {
      let totalPage = Math.ceil(
        this.consultasFiltradas.length / this.limiteItensPagina
      );
      return totalPage;
    },
    consultasFiltradas(){
      let valorDataFiltro = this.formatarDataFiltro
      return this.dadosHistorico.
      filter(x=>x.TipoConsulta.toLowerCase().includes(this.tipoAcao.toLowerCase()) && x.DataCriacao.includes(valorDataFiltro))
    },
    formatarDataFiltro(){
      if(this.dataConsulta == ""){ 
        return ""
      }
      var d = new Date(this.dataConsulta);
      if(d.getFullYear() == "1969")
      return ""
      let mes=parseInt(d.getMonth())+ 1
      if(mes <= 9){
        mes = "0"+mes
      }
      let resultDataFormat = mes +'/'+ d.getFullYear()
      
      return resultDataFormat
    },
    gerarRegistroPorPagina() {
      let registrosPorPagina = [];
      let totalPage = this.totalPage;
      let qtdRegistrosAnteriores =
        this.paginaAtual * this.limiteItensPagina -
        this.limiteItensPagina;
      let qtdRegistroExibicao =
        qtdRegistrosAnteriores + this.limiteItensPagina;
      if (this.paginaAtual <= totalPage) {
        for (let i = qtdRegistrosAnteriores; i < qtdRegistroExibicao; i++) {
          if (this.consultasFiltradas[i] != null) {
            registrosPorPagina.push(this.consultasFiltradas[i]);
          }
        }
      }
      return registrosPorPagina;
    },
  },

  beforeMount(){
    consultProcessosApi.buscarAcoesPorUsuario().then(response => {
      if(response.status == 200){
        this.dadosHistorico = response.data.Result.Content
        
        this.dadosHistorico.map(x=>Vue.set(x,'exibirDetalhe',false))
        // this.dadosHistorico.response.data.Content
      }

    })
  },
  methods: {
    documentoFormatado(numeroDocumento){
      if(numeroDocumento){
        if(numeroDocumento.length == 14){
        return numeroDocumento.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        }else{
          return numeroDocumento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }
      }
    },
    formatacaoData(data){
      var d = new Date(data);
      return d.toLocaleDateString();
    },
    fomatarCampoExibicao(string){
       return string.charAt(0).toUpperCase() + string.slice(1);
    },
    formatarId(id){
      return ("0000000" + id.toString().slice(-7))
    },
     navegacaoPagina(tipo) {
        tipo == "p"
          ? this.paginaAtual++
          : this.paginaAtual--;
    },
    exibirDetalheConsulta(item){
      // alert(item.ID)
      let statusDetalhe = item.exibirDetalhe;
      this.dadosHistorico.map(x => x.exibirDetalhe = false)
      item.exibirDetalhe = !statusDetalhe;
      console.log(item)
    }
  },
};
</script>
<style scoped>
p{
  margin:0px;
}
.his-bl-block{
  padding-bottom: 100px;
}
@media screen and (max-width: 700px) {
  .his-bl-block{
    padding: 30px;
  }
}
.his-bl-titulo {
  padding-top: 65px;
  margin: 0 auto;
  width: 300px;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 68px;
  animation: fadeOut 0.3s;
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
.his-bl-table {
  display: flex;
  max-width: 862px;
  margin: 0 auto;
}
table {
  width: 100%;
  margin: 0 auto;
  position: relative;
}
thead {
  font-size: 1.3em;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  border-color: #a8b2c0;
  padding: 6px;
  font-size: 0.9em;
  text-align: center;
}
th {
  text-align: center;
  height: 32px;
  background-color: #1d375c;
  color: white;
}

tr{
  position: relative;
}
.item-exib-detalhe{
  font-size: 1.2em;
  color: #1d375c;
  transition: all 0.3s ease;
}
.item-exib-detalhe-ativo{
  transform: rotate(45deg) scale(1.5);
}
.modal-detalhe-container{
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
  margin: 0 auto;
  max-width: 700px;
  margin-bottom: 10px;
}
.modal-detalhe-container div p{
}
.modal-detalhe{
  width: 100%;
  height: 0px;
  left: 0;
  position: absolute;
  background: white;
  z-index: 20;
  margin-top: 9px;
  transition: all 0.2s ease-in;
  opacity: 0;
}
.modal-detalhe-titulo{
  color:rgba(0, 0, 0, 0.65);
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
}
.model-detalhe-aberto{
  height: 100px;
  opacity: 1;
}
.modal-detalhe-campo{

}
.btn-detalhe{
  cursor: pointer;
}

/*_____paginação_____ */
.rel-bl1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 10px auto;
  max-width: 862px; 
}
.rel-bl1-filtro{
  display: flex;
  justify-content: space-between;
  width: 400px
}
.rel-bl1-filtro div{
  width :190px
}
.rel-bl1-page{
  display: flex;
  justify-content: space-between;
  width: 200px
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
.rel-bl2-page-selec > p {
  font-size: 1.2em;
  margin-left: 10px;
}

/*_______paginacão fim____*/

</style>
