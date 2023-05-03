<template>
  <pre>GAME COMPONENT</pre>
  <div>
    <h1>{{game.title}}</h1>
    <p class="subtitle">{{game.subtitle}}</p>
    <div v-html="description"/>
    <pre>{{game}}</pre>
  </div>
</template>
<script setup>
import {computed} from "vue";
import {renderRichText} from "@storyblok/vue";

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})
const game = props.game
const description = computed(() => renderRichText(game.description));
</script>
