<template>
  <div v-if="content" @mouseup="handleMouseUp" @touchend="handleMouseDown">

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

      <div
          class="games_slider"
          ref="slider"
          :class="{loaded: gameSlideLoaded}"
          @mousemove="horizontalScroll"
          @mousedown="handleMouseDown"
          @touchstart="handleMouseDown"
          @touchmove="horizontalScroll"
          :style="`grid-template-columns: repeat(${content.featured_games.length}, 15rem);`"
      >
        <GameSlide
          v-for="game in content.featured_games"
          :game="game"
          :activeClick="activeClick"
        />
      </div>
    </div>
    <div class="news">
      <h2>{{ content.news_heading }}</h2>
      <div class="articles">
        <PostSlide class="featured article" :article="featuredArticle"/>
        <div class="other_articles">
          <PostSlideSmall :article="article" v-for="article in otherArticles" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {renderRichText, useStoryblok} from "@storyblok/vue";
import {computed, onMounted, ref} from "vue";
import HeroCell from "@/components/homepage/HeroCell.vue";
import {useRouter} from 'vue-router';
import GameSlide from "@/components/games/GameSlide.vue";
import PostSlide from "@/components/posts/PostSlide.vue";
import PostSlideSmall from "../posts/PostSlideSmall.vue";

const content = ref(null)
const current = ref(0)
const rolloverOpacity = ref([]);
const router = useRouter()
const gameSlideLoaded = ref(false)

onMounted(
    async () => {
      const response = await useStoryblok(
        "home",
        {resolve_relations: ["homepage.hero", "homepage.featured_games", "homepage.featured_article", "hero_cell.link"]},
        {resolveRelations: ["homepage.hero", "homepage.featured_games", "homepage.featured_article", "hero_cell.link"]}
      )
      content.value = response.value.content
      content.value.featured_games.forEach(
        () => {
           rolloverOpacity.value.push(0)
        })
      setTimeout(
          () => {
            gameSlideLoaded.value = true
          }, 100
      )
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

const slider = ref(null)
let sliding = false;
let startX;
let scrollLeft;
const activeClick = ref(false)
let clickTimeOut

const horizontalScroll = (e) => {
  if(sliding) {
    e.preventDefault()
    const pageX = e.pageX ? e.pageX : Math.round(e.changedTouches[0].clientX)
    const x = pageX - slider.value.offsetLeft;
    const walk = (x - startX); //scroll-fast
    slider.value.scrollLeft = scrollLeft - walk;
  }
}

const handleMouseDown = (e) => {
  sliding = true
  const pageX = e.pageX ? e.pageX : Math.round(e.changedTouches[0].clientX)
  startX = pageX - slider.value.offsetLeft;
  scrollLeft = slider.value.scrollLeft;
  activeClick.value = true
  clickTimeOut = setTimeout(
      () => {
        activeClick.value = false
      }, 500
  )
}

const handleMouseUp = () => {
  sliding = false
}

const handleGameClick = (path) => {
  if(activeClick) {
    router.push(path)
  }
}

const featuredArticle = computed(() => {
  return content.value.featured_article[0]
})

const otherArticles = computed(
  () => {
    return content.value.featured_article.slice(1)
  }
)

</script>


<style lang="scss" scoped>

$red: rgb(192, 11, 11);
$red-dark: rgb(142, 11, 11);


.heading_container {
  @media (max-width: 50rem) {
    display: none;
  }
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
  background-size: cover;
  position: relative;

  .games_slider {
    padding: 5rem 9rem;
    overflow: hidden;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    display: grid;
    grid-gap: 1.5rem;
    @media (max-width: 50rem) {
      padding: 2rem;
    }
     &.loaded {
        opacity: 1;
     }

  }
}

.heading_container {
  margin-top:0;
    top: -27.5%;
  max-width: calc(100% - 8rem);
  @media (min-width: 80rem) {
    max-width: 80rem;
  }
  @media (max-width: 60rem) {
    top: -4rem;
  }
}

.news {
  .articles {

    padding: 0 8rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "featured other";
    grid-gap:2rem;
    align-content: start;
    @media (max-width: 50rem) {
      padding: 0 2rem;
    }
    @media (max-width: 95rem) {
      grid-template-columns: 1fr;
      grid-template-areas: "featured"
                           "other";
    }
  }

}

</style>
