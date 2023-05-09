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
      <div class="heading_container">
        <h1>{{content.games_heading}}</h1>
      </div>

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
$red-dark: rgb(142, 11, 11);

.site_logo {
  width: 6rem;
  height: auto;
  position: absolute;
  z-index: 101;
  left:1.5rem;
}

.padding {
  background-color: $red;
  //width: 100%;
  aspect-ratio: 22/9;
  transform: rotate(180deg);
  background-size: cover;
}

.games {
  margin-top: -2px;
  background-color: $red;
  //width: 100%;
  aspect-ratio: 22/9;

  background-size: cover;
  padding: 0rem 3rem;
  position: relative;
}

.heading_container {
  text-align: right;
  top: -27.5%;
  right:3rem;
  z-index:22;
  position: absolute;
  max-width: 40rem;
  text-shadow: -2px -2px 0 $red-dark, 2px -2px 0 $red-dark, -2px 2px 0 $red-dark, 2px 2px 0 $red-dark;
}
</style>