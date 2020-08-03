<template>
  <div class="rel-bl">
    <div class="rel-bl-titulo">
      <p>RESULTADO CONSULTA AÇÕES</p>
    </div>
    <div class="rel-bl1">
      <p class="rel-bl1-titulo">Listagem dos Processos</p>
      <div class="rel-bl1-filtro">
        <div class="rel-bl1-filtro-input">
          <div class="rel-col-input">
            <label for="nomeParte">Réu/Autor</label>
            <a-input class="wtam294" name="nomeParte" v-model="nomeParte"/>
          </div>
          <div class="rel-col-input">
            <label for="nomeParte">Tipo Ação</label>
            <a-input class="wtam294" v-model="tipoAcao" />
          </div>
          <!-- <a-button class="rel-bl1-filtro-btn">FILTRAR RESULTADO</a-button> -->
        </div>
        <div class="rel-bl1-page">
          <div class="rel-bl1-page-selec">
            <a-input
              class="rel-bl1-page-selec-input"
              :value="this.$route.params.pag"
            />
            <p>/{{ totalPage }}</p>
          </div>
          <div class="rel-bl1-page-direc">
            <div
              @click="navegacaoPagina('a')"
              :class="[
                this.$route.params.pag <= '1' ? 'page-direct-disable' : '',
                'rel-bl1-page-direc-a',
              ]"
            >
              <p>&lt;</p>
            </div>
            <div
              @click="navegacaoPagina('p')"
              :class="[
                this.$route.params.pag >= totalPage
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
      <!-- <div class="rel-bl1-num-pag"></div> -->
    </div>
    <div class="rel-bl2">
      <div class="rel-bl2-titulo">Nº de identificação {{numeracaoConsultaFormatada}}</div>
      <div clas="rel-bl2-table">
        <table class="rel-bl2-tabela">
          <tr>
            <th>UF</th>
            <th>Justiça</th>
            <th>NPU</th>
            <th>Fórum</th>
            <th>Cidade</th>
            <th>Vara</th>
            <th>Réu</th>
            <th>Autor</th>
            <th>Tipo Ação</th>
            <th>Valor Ação</th>
            <th>Data distribuição</th>
            <th>Adv. Autor</th>
            <th>Adv. Réu</th>
          </tr>

          <template v-for="(reg, index) in gerarRegistroPorPagina">
            <!-- <tr v-for="(item,index) in reg" :key="index"> -->
            <tr :key="index">
              <td>{{ reg.UF }}</td>
              <td>{{ reg.Justica }}</td>
              <td>{{ reg.NPU }}</td>
              <td>{{ reg.Forum }}</td>
              <td>{{ reg.Cidade }}</td>
              <td>{{ reg.Vara }}</td>
              <td>{{ formatacaoParte(reg.Partes,2) }}</td>
              <td>{{ formatacaoParte(reg.Partes,1) }}</td>
              <td>{{ reg.TipoAcao }}</td>
              <td>{{ reg.ValorAcao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}</td>
              <td>{{ formatacaoData(reg.DataDistribuicao) }}</td>
              <td>{{ reg.AdvogadoAutor }}</td>
              <td>{{ reg.AdvogadoReu }}</td>
            </tr>
          </template>
        </table>

        <div class="rel-bl1-page-direc-bottom">
          <div class="rel-bl1-page-direc-bottom-selec">
            <a-input
              class="rel-bl1-page-selec-input"
              :value="this.$route.params.pag"
            />
            <p>/{{ totalPage }}</p>
          </div>
          <div class="rel-bl1-page-direc-bottom-itens">
            <div
              @click="navegacaoPagina('a')"
              :class="[
                this.$route.params.pag <= '1' ? 'page-direct-disable' : '',
                'rel-bl1-page-direc-a',
              ]"
            >
              <p>&lt;</p>
            </div>
            <div
              @click="navegacaoPagina('p')"
              :class="[
                this.$route.params.pag >= totalPage
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
    </div>
  </div>
</template>
<script>
export default {
  name: "RelatorioConsultaAcoes",
  props: ["consultaId", "pag"],
  data() {
    return {
      registrosVolumetria:  this.$store.getters.getProcessosDetalhados,
      paginacao: {
        limiteItensPagina: 9,
      },
      nomeParte:"",
      tipoAcao:""
    };
  },

  computed: {
    processosDetalhadosFiltrados(){
       return this.registrosVolumetria.filter(p => p.Partes.map(x=> x.Nome).toString().toLowerCase().includes(this.nomeParte.toLowerCase()) && p.TipoAcao.toString().toLowerCase().includes(this.tipoAcao.toLowerCase()))
    },
    numeracaoConsultaFormatada(){
      return ("0000000" + this.consultaId ).slice(-7)
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
        this.$route.params.pag * this.paginacao.limiteItensPagina -
        this.paginacao.limiteItensPagina;
      let qtdRegistroExibicao =
        qtdRegistrosAnteriores + this.paginacao.limiteItensPagina;
      if (this.$route.params.pag <= totalPage) {
        for (let i = qtdRegistrosAnteriores; i < qtdRegistroExibicao; i++) {
          if (this.processosDetalhadosFiltrados[i] != null) {
            registrosPorPagina.push(this.processosDetalhadosFiltrados[i]);
          }
        }
      }
      return registrosPorPagina;
    },
  },
  watch: {
    nomeParte:{
      handler() {
       this.$router.push({
        path: `/volumetria/${this.consultaId}/1`,
      })
      }
    },
    tipoAcao:{
      handler() {
       this.$router.push({
        path: `/volumetria/${this.consultaId}/1`,
      })
      }
    }
  },
  methods: {
    navegacaoPagina(tipo) {
      let direcao =
        tipo == "p"
          ? parseInt(this.$route.params.pag) + 1
          : parseInt(this.$route.params.pag) - 1;
      this.$router.push({
        path: `/volumetria/${this.consultaId}/${direcao}`,
      });
    },
    formatacaoData(data){
      var d = new Date(data);
      return d.toLocaleDateString();
    },
    formatacaoParte(parte,tipo){
      return parte.filter(x=> x.TipoParte == tipo).map(p=> p.Nome).reduce((acc,el)=> acc+= " | "+el,"")
        // return parte.filter(x=> x.TipoParte == tipo).map(x=> x.Nome).reduce((acc,el)=> acc+= " | "+el)
    }
  },
};
</script>
<style scoped>
p {
  margin: 0px;
}
.wtam294 {
  width: 294px;
}
.rel-bl {
  max-width: 1320px;
  margin: 65px auto;
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
.rel-col-input {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}
.rel-col-input > label {
  margin-bottom: 9px;
  font-size: 0.9em;
}

.rel-bl-titulo {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 30px;
}
.rel-bl1 {
  margin: 0 auto;
  max-width: 1362px;
  margin-bottom: 29px;
}
.rel-bl1-titulo {
  margin-bottom: 15px;
  font-size: 1.5em;
  font-weight: bold;
}
.rel-bl1-filtro {
  display: flex;
  max-width: 1480px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.rel-bl1-filtro-input {
  max-width: 900px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  /* flex: 1; */
}
.rel-bl1-filtro-btn {
  width: 251px;
  background-color: #001a3f;
  height: 35px;
  color: #cfd5dc;
  font-size: 0.9em;
}
.ant-btn:active {
  background-color: #001a3f81;
}
.rel-bl1-page {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  /* max-width: 200px;  */
  width: 200px;
  /* width: 50px; */
  /* flex: 2; */
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
.rel-bl2 {
  margin: 0 auto;
  max-width: 1362px;
}
.rel-bl2-titulo {
  font-size: 1.5em;
  margin-bottom: 13px;
}
.rel-bl2-tabela {
  width: 100%;
}
table,
th,
td {
  border: 1px solid #a8b2c0;
  border-collapse: collapse;
  padding: 10px;
  fonst-size: 0.9em;
}
th {
  text-align: center;
  height: 73px;
  background-color: #1d375c;
  color: white;
  font-size: 1.3em;
}
td:first-child + td {
  width: 170px;
}
</style>
