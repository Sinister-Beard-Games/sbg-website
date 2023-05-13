<template>
  <SimpleHero :featuredImage="props.content.content.hero_image.filename" />
  <div class="heading_container">
    <h1>{{content.name}}</h1>
  </div>
  <div class="list_container">
    <pre>{{games}}</pre>
  </div>
</template>

<script setup>

import SimpleHero from "./SimpleHero.vue";
import {computed, onMounted, ref} from "vue";
import {renderRichText, useStoryblok} from "@storyblok/vue";
import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
  accessToken: "On63krEoz1rtKmqF4QSMSAtt",
});

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const games = ref(null)

onMounted(async ()=>{
  const response = await Storyblok.get(
      "cdn/stories",
      {
        content_type: "game",
        sort_by: "name:asc"
      }
  )
  games.value = response.data.stories
})



</script >

<style scoped lang="scss">

.list_container {
  color: white;
  display: grid;
  padding: 5rem 9rem;
  grid-gap: 2.5rem;
  @media (max-width: 50rem) {
    padding: 2rem;
  }
}
</style>
