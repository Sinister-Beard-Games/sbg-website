<template>
  <SimpleHero :featuredImage="props.content.content.hero_image.filename" />
  <div class="heading_container">
    <h1>{{content.name}}</h1>
  </div>
  <div class="list_container">
    <PostSlide v-for="article in posts" :article="article" />
  </div>
</template>

<script setup>

import SimpleHero from "@/components/shared/SimpleHero.vue";
import {onMounted, ref} from "vue";
import StoryblokClient from "storyblok-js-client";
import PostSlide from "@/components/posts/PostSlide.vue";

const Storyblok = new StoryblokClient({
  accessToken:  import.meta.env.VITE_STORYBLOK_TOKEN,
});

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const posts = ref(null)

onMounted(async ()=>{
  const response = await Storyblok.get(
      "cdn/stories",
      {
        content_type: "post",
        sort_by: "published:asc"
      }
  )
  posts.value = response.data.stories
})

</script>

<style scoped lang="scss">

.list_container {
  color: white;
  display: grid;
  padding: 3rem 9rem;
  grid-gap: 2rem;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 87.5rem) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 50rem) {
    padding: 2rem;
  }
}

</style>
