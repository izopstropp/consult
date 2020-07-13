<template>
  <div class="home">
    <Header />
    <router-view v-on:resultadoPesquisaVolumetria="resultadoVolumetria" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Header
  },
  data() {
    return {
      dadosVolumetria: []
    };
  },
  methods: {
    resultadoVolumetria() {
      console.log("Entrei aqui");
    }
  }
};
</script>
<style></style>
