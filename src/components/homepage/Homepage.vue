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
        <div class="featured article">
          <router-link :to="featuredArticle.full_slug" class="image"  :style="`background-image: url(${featuredArticle.content.FeaturedImage.filename})`" />


          <h3>{{featuredArticle.name }}</h3>
          <div v-html="renderRichText(featuredArticle.content.preview)" />
          <router-link :to="featuredArticle.full_slug" class="button">
             Read on, reader
          </router-link>
        </div>
        <div class="other_articles">
          <div class="article" v-for="article in otherArticles">
            <div class="image" :style="`background-image: url(${article.content.FeaturedImage.filename})`" />
            <h3>{{article.name }}</h3>
            <div v-html="renderRichText(article.content.preview)" />
            <router-link :to="article.full_slug" class="button">
               More
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useStoryblok} from "@storyblok/vue";
import {onMounted, ref, computed} from "vue";
import HeroCell from "@/components/homepage/HeroCell.vue";
import {useRouter} from 'vue-router';
import {renderRichText} from "@storyblok/vue";
import GameSlide from "@/components/shared/GameSlide.vue";

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

<style lang="scss">

    .article {
      &.featured {
        p {
          padding: 0;
          margin:0;
        }
      }
    }

</style>

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
    @media (max-width: 50rem) {
      padding: 0 2rem;
    }
    @media (max-width: 95rem) {
      grid-template-areas: "featured featured"
                           "other other";
    }
    p {
      padding: 0;
      margin:0;
    }

    .other_articles {
      grid-area: other;
      @media (max-width: 95rem) and (min-width: 60rem) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap:1rem;
      }
    }

    .article {
      color: white;
      padding: 1rem;
      display: grid;
      justify-content: left;
      justify-items: left;
      align-content: start;
      grid-template-areas: "heading"
                           "content"
                           "button";
      &.featured {
        grid-template-areas: "heading heading"
                             "image content"
                             "image button";
        grid-template-columns: 1fr 1fr;
        grid-gap:1.5rem;
        grid-area: featured;
        h3 {
          font-size: 3rem;
           @media (max-width: 60rem) {
            font-size: 2rem
          }
        }
        @media (max-width: 60rem) {
          grid-template-areas: "heading"
                               "image"
                               "content"
                               "button";
          grid-template-columns: 1fr;
        }
      }
      .image {
        grid-area: image;
        background-size: cover;
        background-position: center;
        width: 100%;
        @media (max-width: 60rem) {
          aspect-ratio: 16/9;
        }
      }
      h3 {
        grid-area: heading;
        margin:0;
        font-size: 2rem;
      }
      a {
        grid-area: button;
      }
      div {
        grid-area: content;
      }
    }
  }

}

</style>
