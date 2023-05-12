<template>

    <div
        class="hero"
        :style="`background-image: linear-gradient(rgba(48, 43, 43,0), rgba(48, 43, 43, .85)), url(${game.cover_art_plain.filename})`"
    >
      <div class="hero_info">
        <img class="logo" :src="game.logo.filename" :alt="game.name"/>
      </div>
    </div>



</template>
<script setup>


const props = defineProps({
  game: {
    type: Object,
    required: true
  },
})



</script>
<style lang="scss" scoped>



pre {
  position: relative;
  z-index: 10000;
  color: white;
  background: deeppink;
}


</style>
