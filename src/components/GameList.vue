<template>
  <SimpleHero :featuredImage="props.content.content.hero_image.filename" />
  <div class="heading_container">
    <h1>{{content.name}}</h1>
  </div>
  <div class="list_container">
      <GameSlide :game="game" v-for="game in games" :activeClick="true"/>
  </div>
</template>

<script setup>

import SimpleHero from "./SimpleHero.vue";
import {onMounted, ref} from "vue";
import StoryblokClient from "storyblok-js-client";
import GameSlide from "./GameSlide.vue";

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

</script>

<style scoped lang="scss">

.list_container {
  color: white;
  display: grid;
  padding: 3rem 9rem;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)  );
  @media (max-width: 50rem) {
    padding: 2rem;
  }
}

</style>
