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

      <div class="games_slider">
        <div
            @click="handleGameClick(game.full_slug)" class="game_slide"
            @mouseenter="setRolloverOpacity(0.6, index)"
            @mouseleave="setRolloverOpacity(0, index)"
            v-for="(game, index) in content.featured_games"
            :key="index"
            :style="`background-image: linear-gradient( rgba(0, 0, 0, ${rolloverOpacity[index]}), rgba(0, 0, 0, 0) ), url(${game.content.cover_art_plain.filename})`">
            <img class="logo" :src="game.content.logo.filename" :alt="game.name" />
            <img class="focus_image" :src="game.content.focus_image.filename" alt="featured game image" />
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import {useStoryblok} from "@storyblok/vue";
import {onMounted, ref} from "vue";
import HeroCell from "./HeroCell.vue";
import { useRouter } from 'vue-router';

const content = ref(null)
const current = ref(0)
const rolloverOpacity = ref([0, 0, 0]);
const router = useRouter()

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

const handleGameClick = (path) => {
  router.push(path)
}

const setRolloverOpacity = (opacity, index) => {
  rolloverOpacity.value[index] = opacity
}

</script>

<style lang="scss" scoped>

$red: rgb(192, 11, 11);
$red-dark: rgb(142, 11, 11);

.site_logo {
  width: 6rem;
  height: auto;
  position: fixed;
  z-index: 101;
  left:1.5rem;
}

.padding {
  background-color: $red;
  aspect-ratio: 22/9;
  transform: rotate(180deg);
  background-size: cover;
}

.games {
  margin-top: -2px;
  background-color: $red;
  aspect-ratio: 22/9;
  background-size: cover;
  padding: 0rem 3rem;
  position: relative;
  .games_slider {
    padding: 5rem;
    overflow: hidden;
    .game_slide {
      display: inline-grid;
      justify-items: center;
      align-items: end;
      margin-right:2rem;
      width:15rem;
      background-size: cover;
      background-color: white;
      border-radius: .75rem;
      aspect-ratio: 3/4;
      background-position: center;
      position: relative;
      cursor: pointer;
      transition: background-image .5s ease-in-out;
      .logo {
        position: absolute;
        margin-bottom:.5rem;
        width: 75%;
        transition: all .2s ease-in-out;
        z-index: 31
      }
      .focus_image {
        width:140%;
        opacity: 0;
        position: absolute;
        transition: all .3s ease-in-out;
        top:3rem;
        z-index: 30
      }
      &:hover {
        .logo {
          width: 95%;
          margin-bottom: 1rem;
        }
        .focus_image {
            opacity: 1;
            top:-1.5rem;
        }
      }
    }
  }
}

.heading_container {
  text-align: right;
  top: -27.5%;
  right:5rem;
  z-index:22;
  position: absolute;
  max-width: 80rem;
  h1 {
    font-size: 6rem;
    color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: white;
  }
}
</style>