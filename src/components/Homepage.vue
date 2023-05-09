<template>
  <div v-if="content">
    <div class="hero" v-for="cell in content.hero" :style="`background-image: url(${cell.content.background.filename})`">
      <div class="hero_info">
        <img class="logo" :src="cell.content.logo.filename" :alt="cell.content.link.name" />
        <router-link :to="cell.content.link.full_slug" class="button">
          {{cell.content.link_text}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useStoryblok} from "@storyblok/vue";
import {ref, onMounted} from "vue";
const content = ref(null)


onMounted(
    async () => {
      const response = await useStoryblok(
        "home",
        {resolve_relations: ["homepage.hero", "homepage.featured_games", "hero_cell.link"]},
        {resolveRelations: ["homepage.hero", "homepage.featured_games", "hero_cell.link"]}
      )
      content.value = response.value.content
      console.log(content.value)
    }
)

</script>

<style lang="scss" scoped>
.hero {
  max-width: 100%;
  background-size: 100% auto;
  background-position: center 40%;
  display: grid;
  justify-items: center;
  align-content: center;
  aspect-ratio: 22/9;
  transition: background-size .5s ease-in-out;
  clip-path: polygon(0 0, 100% 1%, 100% 66%, 0% 100%);
  &:hover {
    background-size: 110% auto;
  }
  .hero_info {
    width: 66%;
    grid-gap: 1rem;
    display: grid;
    justify-items: center;
    align-content: center;
    margin-top:-7.5%;
    .logo {
      max-width: 45rem;
      width:100%
    }
  }

}
</style>
