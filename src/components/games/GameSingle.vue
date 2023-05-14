<template>
  <GameHero :game="game" />
  <div class="heading_container">
    <h1>{{game.subtitle}}</h1>
  </div>
  <div class="game_content">
    <div class="game_info">
      <div class="game_description" v-html="description" />
      <div class="game_products">
        <div v-for="product in game.products">
          <a class="button">
            {{product.description}}
            <span :class="{reduced: product.sales_price}">£{{product.price}}</span>
            <span v-if="product.sales_price">£{{product.sales_price}}</span></a>
        </div>
      </div>
      <div>
        <router-link class="button" to="/games/">&lt; All games</router-link>
      </div>
    </div>
    <div class="game_art">
      <img @click="setScreenshot(game.cover_art.filename)" class="screenshot" :src="game.cover_art.filename" :alt="`Cover art from ${props.game.name}`" />
      <img @click="setScreenshot(screenshot.filename)" class="screenshot" v-for="screenshot in game.screenshots" :src="screenshot.filename" :alt="`Example pages from ${game.title}`" />
    </div>
  </div>
  <div @click="clearOverlay" class="screenshot_overlay" :class="{visible: overlayVisible}">
    <img :src="currentScreenshot" />
  </div>

</template>
<script setup>
import {computed, ref} from "vue";
import {renderRichText} from "@storyblok/vue";
import GameHero from "@/components/games/GameHero.vue";

const currentScreenshot = ref(null)
const overlayVisible = ref(false)

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})
const game = props.game.content
const description = computed(() => renderRichText(game.description));

const setScreenshot = (v) => {
  currentScreenshot.value = v
  overlayVisible.value = true
}

const clearOverlay = () => {
  overlayVisible.value = false
}

</script>

<style lang="scss" scoped>

.screenshot {
  cursor: pointer;
  transition: all .1s ease-in-out;
  &:hover {
    transform: scale(1.15);
    box-shadow: rgba(0,0,0,.5) 0 0 2rem;
  }
}

.screenshot_overlay {
  position: fixed;
  top:0;
  z-index:1000;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.4);
  backdrop-filter: blur(.5rem);
  display: grid;
  opacity: 0;
  pointer-events: none;
  &.visible {
    pointer-events: all;
    opacity: 1;
  }
  img {
    max-width: 80vw;
    max-height: 80vh;
  }
}

.game_content {
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 5rem 9rem;
  grid-gap:2.5rem;
  @media (max-width: 65rem) {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
  .game_art {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    align-content: start;
    @media (max-width: 35rem) {
      grid-template-columns: 1fr;
    }
    img {
      max-width: 100%;
    }
  }
  .game_products {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 1rem;
    justify-content: left;
    margin-top: 2.5rem;
    margin-bottom: 2rem;
    @media (max-width: 72rem) {
      grid-template-columns: 1fr;
    }

  }
}

a.button {
      font-weight: 400;
      text-transform: none;
      cursor: pointer;
      .reduced {
        text-decoration: line-through;
      }
      span {
        margin-left: .5rem;
      }
    }
</style>