<template>
  <div tabindex="-1" @blur="handleFocusOut" class="container">
    <div
      :style="{textAlign:textAlignTextButtom, paddingLeft:paddingLeftTextButtom, backgroundColor:colorButtomActive, borderColor:borderColorButtom}"
      @click="exibirMulti = !exibirMulti"
      class="btn-item"
    >
      <div
        :style="{fontSize:fonteSizeTextButtom}"
        style="display:flex;justify-content: flex-end; margin-top:3px"
      >
        <div style="flex:1;width:50px;">{{ nomeCampo }}</div>
        <div style="width:50px">&#8681;</div>
      </div>
    </div>
    <transition-group
      tag="ul"
      class="lista-itens"
      :class="[exibirMulti ? 'animation-height' : '']"
      :style="{paddingLeft:paddingLeftList}"
    >
      <li
        v-show="exibirMulti"
        v-for="item in dataSet"
        :key="item.nome"
        @click="item.marcado = !item.marcado"
        class="lista-itens-excluir"
      >
        <span>&#8680;{{ item.nome }}</span>
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
    },

    paddingLeftList: {
      type: String,
      default: "10px"
    },
    textAlignTextButtom: {
      type: String,
      default: "left"
    },
    paddingLeftTextButtom: {
      type: String,
      default: ""
    },
    backgroudColorButtom: {
      type: String,
      default: "#EDF0F2"
    },
    fonteSizeTextButtom: {
      type: String,
      default: "1em"
    },
    borderColorButtom: {
      type: String,
      default: "#c5c5c5"
    },
    blurCloseList: {
      type: Boolean,
      default: true
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
    },
    colorButtomActive() {
      if (this.exibirMulti) {
        return this.backgroudColorButtom;
      }
      return "";
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
    handleFocusOut() {
      if (this.blurCloseList) {
        this.exibirMulti = false;
      }
    }
  }
};
</script>
<style scoped>
p,
ul {
  margin: 0;
}
.container {
  width: 100%;
  position: relative;
  height: 100%;
  border-radius: 2px;
  cursor: pointer;
}
.btn-item {
  background-color: #ffffff;
  border: 1px solid #d11515;
  max-width: 100vw;
  height: 32px;
  position: relative;
}

.btn-item p {
  margin-top: 2px;
  color: #78797a;
}

.lista-itens::-webkit-scrollbar {
  width: 1px;
}

.lista-itens {
  padding: 0px 10px 0px 10px;
  background-color: #ffffff;
  transition: max-height 0.3s;
  max-height: 0px;
  overflow-y: scroll;
  max-width: 100vw;
  -webkit-box-shadow: 10px 14px 23px -15px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 14px 23px -15px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 14px 15px -23px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  scrollbar-width: 0px;
  -webkit-scrollbar: 0px;
}
.animation-height {
  max-height: 176px;
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
  min-height: 0;
}
.v-enter-active {
  transition: opacity 0.2s;
}
.v-leave-active {
  transition: opacity 0.2s;
}
</style>
