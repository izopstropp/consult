zz<template>
  <div v-if="exibirLoad" :class="[exibirLoad ? 'bg-opacity' : '', 'circleContainer']" :style="{ width:pwidth ,height:pheight}">
    <div  :style="{ width: sizeCircle, height:sizeCircle}" class="circleAnimation"></div>
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
    sizeCircle:{
      type:String,
      default:"30px"
    },
    pwidth:{
      type:String,
      default:"100%"
    },
    pheight:{
      type:String,
      default:"100%"
    }
  },
};
</script>
<style scoped>
.circleContainer {
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
  z-index: 1000;
}
.circleAnimation {
  border: 2px solid rgb(160, 142, 142);
  border-top-color: #1d375c;
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
