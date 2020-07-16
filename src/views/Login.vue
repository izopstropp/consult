<template>
  <div class="container-page-login">
    <Autenticacao />
  </div>
</template>
<script>
import Autenticacao from "@/components/Autenticacao.vue";
export default {
  components: {
    Autenticacao: Autenticacao,
  },
  mounted() {},
};
</script>

<style>
.container-page-login {
  background-color: #f5f5f5;
}
</style>
