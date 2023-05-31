<template>
  <header>
    <router-link to="/">
      <img :src="logo" alt="Sinister Beard Games" class="site_logo"/>
    </router-link>
    <router-link to="/basket" class="basket">
      <img :src="basket_logo" alt="Your basket" />
      <a v-if="products.basket.length > 0" class="basket_count">{{products.basket.length}}</a>
    </router-link>
  </header>
</template>

<script setup>

import {useProductsStore} from "../../stores/products.js";

const products = useProductsStore()

const props = defineProps({
    logo: {
      type: String,
      required: true
    },
    basket_logo: {
      type: String,
      required: true
    }
  }
)

</script>

<style lang="scss" scoped>
$red: rgb(192, 11, 11);
$red-dark: rgb(142, 11, 11);

header {
  position: fixed;
  z-index: 101;
  .site_logo {
    width: 6rem;
    height: auto;
    left:1.5rem;
    position: absolute;
  }
  .basket {
    width: 2.25rem;
    height: auto;
    position: fixed;
    right: 1rem;
    top: 1rem;
    text-decoration: none;
    &:hover {
      .basket_count {
        background: ($red, .8);
      }
    }
    .basket_count {
      height: 1rem;
      width: 1rem;
      aspect-ratio: 1/1;
      padding: 0.35rem;
      display: grid;
      background: rgba($red-dark, 1);
      align-content: center;
      justify-content: center;
      border-radius: 1rem;
      font-size: .9rem;
      font-weight: 600;
      position: fixed;
      top: 0.5rem;
      right: 0.5rem;
      color:white !important;
      border:1px solid rgba(white, 1)

    }
  }
  @media (max-width: 50rem) {
      position: absolute;
  }
}
</style>
