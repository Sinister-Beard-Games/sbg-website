<template>
<div class="next_steps" v-if="props.visible">
  <div class="lastItem"><span class="tick"/> <p>{{lastItem.description}} added to basket!</p></div>
  <div class="buttons">
    <router-link class="button" to="/checkout">
      Proceed to checkout ({{numberOfItems}} item{{ess}})
    </router-link>
    <router-link to="/basket" class="button secondary">
      Go to basket
    </router-link>
  </div>
</div>
</template>

<script setup>
import {useProductsStore} from "../../stores/products.js";
import {computed} from "vue";
const products = useProductsStore()
const numberOfItems = computed(()=> {
  return products.basket.length
})
const ess = computed(() => {
  return numberOfItems.value === 1 ? "" : "s"
})
const lastItem = products.basket[numberOfItems.value-1]
const props = defineProps({
  "visible": {
    type: Boolean,
    required: true
  }
})
// import imagePath from '@/assets/green_stick.svg'
</script>

<style scoped lang="scss">
.next_steps {
    background: rgba(255,255,255,.1);
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    display: grid;
    grid-gap: 1rem;
  .buttons {
    display: grid;
    grid-template-columns: auto auto;
    justify-items: left;
    justify-content: left;
    grid-gap: 1rem;
    .button {
      text-transform: none;
    }
  }
  .lastItem {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: left;
    align-content: center;
    grid-gap: 1rem;
    .tick {
      width: 2rem;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      display: inline-block;
      //background-image: url("/green_tick.svg");
    }
  }

}
</style>