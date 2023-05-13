<template>
  <div
     class="game_slide"
     @click="handleGameClick(game.full_slug)"
     @mouseenter="setRolloverOpacity(0.3, index)"
     @mouseleave="setRolloverOpacity(0, index)"
     :style="`background-image: linear-gradient( rgba(255, 255, 255, ${rolloverOpacity}), rgba(255, 255, 255, 0) ), url(${game.content.cover_art_plain.filename})`"
  >
    <img class="logo" :src="game.content.logo.filename" :alt="game.name"/>
    <img class="focus_image" :src="game.content.focus_image.filename" alt="featured game image"/>
  </div>
</template>
<script setup>

import {ref} from "vue";

const props = defineProps(
   {
    game: {
      type: Object,
      required: true
    },
    activeClick: {
      type: Boolean,
      required: true
    }
  }
)

const rolloverOpacity = ref(0)
const setRolloverOpacity = (opacity) => {
  rolloverOpacity.value = opacity
}

import {useRouter} from "vue-router";
const router = useRouter()

const handleGameClick = (path) => {
  console.log("Boooooop")
  if(props.activeClick) {
    router.push("/" + path)
  }
}


</script>
