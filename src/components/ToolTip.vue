<template>
  <div class="tooltip">
    <slot></slot>
    <span class="triangle"></span>
  </div>
</template>
<script>
export default {
  name: "ToolTip"
};
</script>
<style scoped>
.tooltip {
  width: 200px;
  background: #59c7f9;
  color: #ffffff;
  text-align: center;
  padding: 10px 20px 10px 20px;
  border-radius: 3px;
  top: calc(100% + 11px);
  transform: translate-x(-50%);
  position: relative;
}
.triangle:after {
  /*Triangulo*/
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  border-top: 20px solid transparent;
  border-right: 10px solid transparent;
  /*Faz seta "apontar para baixo. Definir o valor como 'top' fará ela "apontar para cima" */
  /*Aqui entra a cor da "aba" do balão */
  border-top: 20px solid #edf0f2;
  left: 10%;
}
</style>