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
            <a-input class="wtam294" name="nomeParte" placeholder="Basic usage" />
          </div>
          <div class="rel-col-input">
            <label for="nomeParte">Tipo Réu</label>
            <a-input class="wtam294" placeholder="Basic usage" />
          </div>
          <a-button class="rel-bl1-filtro-btn">FILTRAR RESULTADO</a-button>
        </div>
        <div class="rel-bl1-page">
          <a-input placeholder="Pag" />
        </div>
      </div>
      <!-- <div class="rel-bl1-num-pag"></div> -->
    </div>
    <div class="rel-bl2">
      <div>Nº de identificação 0006721</div>
      <div clas="rel-bl2-table">
        <table class="rel-bl2-tabela">
          <tr>
            <th>UF</th>
            <th>NPU</th>
            <th>Fórum</th>
            <th>Cidade</th>
            <th>Vará</th>
            <th>Réu</th>
            <th>Autor</th>
            <th>Tipo Ação</th>
            <th>Valor Ação</th>
            <th>Data distribuição</th>
            <th>Adv. Autor</th>
            <th>Adv. Réu</th>
          </tr>

          <template v-for=" (reg,index) in gerarRegistroPorPagina">
            <!-- <tr v-for="(item,index) in reg" :key="index"> -->
            <tr :key="index">
              <td>{{reg.uf}}</td>
              <td>{{reg.npu}}</td>
              <td>{{reg.forum}}</td>
              <td>{{reg.cidade}}</td>
              <td>{{reg.vara}}</td>
              <td>{{reg.reu}}</td>
              <td>{{reg.autor}}</td>
              <td>{{reg.tipoAcao}}</td>
              <td>{{reg.valorAcao}}</td>
              <td>{{reg.dataDistri}}</td>
              <td>{{reg.advAutor}}</td>
              <td>{{reg.advRéu}}</td>
            </tr>
          </template>
        </table>
        {{$route.params}}
        <a
          v-if="this.$route.params.pag > '1'"
          @click="navegacaoPagina('v')"
        >voltar pagina</a>
        <a v-if="this.$route.params.pag < totalPage" @click="navegacaoPagina('p')">passa pagina</a>
      </div>
    </div>
  </div>
</template>
<script>
import { resultaConsulta } from "../../dadosFake/resultadoConsulta";
export default {
  props: ["id", "pag"],
  data() {
    return {
      registrosVelumetria: resultaConsulta,
      qtdrefres: 0,
      paginacao: {
        limiteItensPagina: 2
      }
    };
  },

  computed: {
    totalPage() {
      let totalPage = Math.ceil(
        this.registrosVelumetria.length / this.paginacao.limiteItensPagina
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
          if (this.registrosVelumetria[i] != null) {
            registrosPorPagina.push(this.registrosVelumetria[i]);
          }
        }
      }
      return registrosPorPagina;
    }
  },
  methods: {
    navegacaoPagina(tipo) {
      let direcao =
        tipo == "p"
          ? parseInt(this.$route.params.pag) + 1
          : parseInt(this.$route.params.pag) - 1;
      this.$router.push({
        path: `/volumetria/${this.id}/${direcao}`
      });
    }
  }
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
  max-width: 1480px;
  margin: 65px auto;
}
.rel-col-input {
  display: flex;
  flex-direction: column;
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
  max-width: 1162px;
}
.rel-bl1-titulo {
  margin-bottom: 15px;
  font-size: 1.5em;
  font-weight: bold;
}
.rel-bl1-filtro {
  display: flex;
  justify-content: space-between;
}
.rel-bl1-filtro-input {
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex: 3;
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
  align-items: flex-end;
  max-width: 100px;
  flex: 1;
  border: 1px solid yellow;
}
.rel-bl2 {
  margin: 0 auto;
  max-width: 1162px;
}
.rel-bl2-tabela {
  width: 1162px;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  border-color: #a8b2c0;
  padding: 10px;
  font-size: 0.9em;
}
th {
  text-align: center;
  height: 73px;
  background-color: #1d375c;
  color: white;
}
td:first-child + td {
  width: 170px;
}
</style>