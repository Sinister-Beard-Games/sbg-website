<template>
  <SimpleHero :featuredImage="props.content.content.hero_image.filename" />
  <div class="heading_container">
    <h1>{{content.name}}</h1>
  </div>
  <div class="list_container">
    <div @click="handleGameClick(game.slug)" v-for="game in games" class="game_single" :style="`background-image: url(${game.content.cover_art_plain.filename})`">
      <img class="logo" :src="game.content.logo.filename" :alt="game.name" />
      <img class="focus_image" :src="game.content.focus_image.filename" alt="featured game image" />
    </div>
  </div>
</template>

<script setup>

import SimpleHero from "./SimpleHero.vue";
import {onMounted, ref} from "vue";
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

let activeClick = true

import {useRouter} from "vue-router";
const router = useRouter()

const handleGameClick = (path) => {
  if(activeClick) {
    router.push(path)
  }
}



</script >

<style scoped lang="scss">

.list_container {
  color: white;
  display: grid;
  padding: 5rem 9rem;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)  );
  @media (max-width: 50rem) {
    padding: 2rem;
  }
}



</style>
