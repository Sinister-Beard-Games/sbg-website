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
    </div>
    <div class="game_art">
      <img :src="game.cover_art.filename" alt="" />
      <img v-for="screenshot in game.screenshots" :src="screenshot.filename" alt="" />
    </div>
  </div>

</template>
<script setup>
import {computed} from "vue";
import {renderRichText} from "@storyblok/vue";
import GameHero from "./GameHero.vue";

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})
const game = props.game
const description = computed(() => renderRichText(game.description));
</script>

<style lang="scss" scoped>

.game_content {
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 5rem 9rem;
  grid-gap:2.5rem;
  .game_art {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    align-content: start;
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
    a {
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
  }
}
</style>
