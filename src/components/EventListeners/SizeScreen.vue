<template>
    <div></div>
</template>
<script>
export default {
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.$emit('sizeScreen', {dados : {width: window.innerWidth, height: window.innerHeight}})
        }
    }
}
</script>