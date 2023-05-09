<template>
  <div v-if="content">
    <img :src="content.logo.filename" :alt="content.logo.alt" class="site_logo"/>
    <HeroCell
        v-for="(cell, index) in content.hero"
        :cell="cell"
        :key="cell.name"
        :current="current"
        :index="index"
        :total="content.hero.length"
    />
    <div
        class="padding"
        :style="`background-image: linear-gradient(rgba(192, 11, 11,.55), rgba(142, 11, 11, .95)), url(${content.background_video.filename});`"
    />
    <div
        class="games"
        :style="`background-image: linear-gradient(rgba(192, 11, 11,.55), rgba(142, 11, 11, .95)), url(${content.background_video.filename});`"
    >
      Hello world
    </div>
  </div>
</template>
<script setup>
import {useStoryblok} from "@storyblok/vue";
import {onMounted, ref} from "vue";
import HeroCell from "./HeroCell.vue";

const content = ref(null)
const current = ref(0)

onMounted(
    async () => {
      const response = await useStoryblok(
        "home",
        {resolve_relations: ["homepage.hero", "homepage.featured_games", "hero_cell.link"]},
        {resolveRelations: ["homepage.hero", "homepage.featured_games", "hero_cell.link"]}
      )
      content.value = response.value.content
      cycleHero();
    }
)

const cycleHero = () => {
  setTimeout(
      () => {
        if(current.value < content.value.hero.length - 1) {
          current.value += 1
        } else {
          current.value = 0
        }
        cycleHero()
      }, 7500
  )
}

</script>

<style lang="scss" scoped>

$red: rgb(192, 11, 11);

.site_logo {
  width: 6rem;
  height: auto;
  position: absolute;
  z-index: 101;
  left:1.5rem;
}

.padding {
  background-color: $red;
  width: 100%;
  aspect-ratio: 22/9;
  transform: rotate(180deg);
  background-size: cover;
}

.games {
  margin-top: -2px;
  background-color: $red;
  width: 100%;
  aspect-ratio: 22/9;
  clip-path: polygon(0 0, 100% 0%, 100% 66%, 0% 100%);
  background-size: cover;
}
</style>