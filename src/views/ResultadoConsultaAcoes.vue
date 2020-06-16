<template>
  <div class="container-resultado-consulta">
    <div>
      <p>Estado</p>
      <div v-for="(item, index) in agrupamentoUf" :key="index">
        <div>
          <a-checkbox :name="index" @change="filtrarUf" />
          {{index}} - {{item}}
        </div>
      </div>
    </div>
    <div>
      <p>Justiça</p>
      <div v-for="(item, index) in agrupamentoJustica" :key="index">
        <div>
          <a-checkbox :name="index" @change="filtrarJustica" />
          {{index}} - {{item}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import consultProcessosApi from "../api/consultProcessosApi";

export default {
  components: {},
  data() {
    return {
      agrupamentoUf: "",
      agrupamentoJustica: ""
    };
  },

  mounted() {
    this.buscarProcessosResumo();
  },
  methods: {
    filtrarUf(e) {
      console.log(e);
    },
    filtrarJustica(e) {
      console.log(e);
    },
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
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
}
.container-resultado-consulta {
  display: flex;
  margin-right: 20px;
}
.container-resultado-consulta div {
  margin-right: 20px;
}
.container-resultado-consulta div:active {
  background: red;
  order: -1 !important;
  -webkit-transition: order 2s ease-in-out;
  transition: order 2s;
}
.order1 {
  order: 1;
}

.order2 {
  order: 2;
}

.order3 {
  order: 3;
}

.order4 {
  order: 4;
}
</style>
