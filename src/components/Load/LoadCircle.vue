<template>
  <div :class="[exibirLoad ? 'bg-opacity' : '', 'circleContainer']">
    <div v-if="exibirLoad" class="circleAnimation"></div>
  </div>
</template>
<script>
export default {
  name: "LoadCircle",
  props: {
    exibirLoad: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.circleContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
}
.circleAnimation {
  border: 3px solid rgb(160, 142, 142);
  border-top-color: #1d375c;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  animation: is-rotating 1s infinite;
  z-index: 1000;
}
.bg-opacity {
  background-color: rgba(223, 222, 226, 0.438);
}

@keyframes is-rotating {
  to {
    transform: rotate(1turn);
  }
}
</style>
