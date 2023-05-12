<template>
  <GameHero :game="game" />
  <div class="heading_container">
    <h1>{{game.subtitle}}</h1>
  </div>
</template>
<script setup>
import {computed} from "vue";
import {renderRichText} from "@storyblok/vue";
import GameHero from "./GameHero.vue";

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})
const game = props.game
const description = computed(() => renderRichText(game.description));
</script>
