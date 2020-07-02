<template>
  <div tabindex="-1" @blur="handleFocusOut" class="container">
    <div @click="exibirMulti = !exibirMulti" class="btn-item">
      <p>{{ nomeCampo }}</p>
    </div>
    <transition-group tag="ul" class="lista-itens">
      <li
        v-show="exibirMulti"
        v-for="item in dataSet"
        :key="item.nome"
        @click="item.marcado = !item.marcado"
        class="lista-itens-excluir"
      >
        <span>{{ item.nome }}</span>
        <span v-if="item.marcado">&#10003;</span>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "multiSelectConsult",
  props: {
    nomeExibicao: {
      type: String
    },
    dataSet: {
      type: Array,
      required: true
    },
    nomeCampo: {
      type: String,
      required: true
    }
  },
  model: {
    prop: "dataSet",
    event: "change"
  },
  computed: {
    dataSetSelecionado() {
      let result = this.dataSet.filter(item => {
        return item.marcado == true;
      });
      return result;
    }
  },
  data() {
    return {
      exibirMulti: false
    };
  },

  methods: {
    additenselected(item) {
      if (item.marcado == false) {
        item.marcado = true;
      } else {
        item.marcado = false;
      }
    },
    handleFocus() {
      this.exibirMulti = true;
    },
    handleFocusOut(e) {
      console.log(e);
      this.exibirMulti = false;
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
}
.container {
  width: 100vw;
  position: relative;
  height: 32px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
}
.btn-item {
  border: 1px solid #c5c5c5;
  background-color: #ffffff;
  max-width: 100vw;
  height: 32px;
  position: relative;
}

.btn-item p {
  text-align: center;
  margin-top: 3px;
  color: #78797a;
}

.lista-itens::-webkit-scrollbar {
  width: 1px;
}

.lista-itens {
  padding: 0px 10px 0px 10px;
  background-color: #ffffff;
  /* background-color: red; */
  max-height: 200px;
  overflow-y: scroll;
  max-width: 100vw;
  -webkit-box-shadow: 10px 14px 23px -15px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 14px 23px -15px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 14px 15px -23px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  scrollbar-width: 0px;
  -webkit-scrollbar: 0px;
}
span {
  color: #8d8e8f;
}
.lista-itens-excluir {
  display: flex;
  max-width: 100vw;
  justify-content: space-between;
}
.hide-item {
  display: none;
}

li {
  cursor: pointer;
}
.data-list {
  display: flex;
  max-width: 100vw;
  justify-content: space-between;
}

.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 0.4s;
}
</style>
