<template>
  <div class="home">
    <Header />
    <ConsultaAcoes />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import ConsultaAcoes from "@/components/ConsultaAcoes.vue";

export default {
  name: "Home",
  components: {
    Header,
    ConsultaAcoes
  }
};
</script>
<style>
.home {
}
</style>
