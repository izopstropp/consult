<template>
  <div>
    <slot v-if="exibirModal"></slot>
  </div>
</template>
<script>
export default {
  name: "modal",
  props: {
    exibirModal: Boolean,
  },
};
</script>
<style scoped></style>
