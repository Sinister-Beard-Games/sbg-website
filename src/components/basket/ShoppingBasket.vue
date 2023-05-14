<template>
  <SimpleHero :featuredImage="content.content.hero_image.filename" />
  <table class="basket_items">
    <tr>
      <th>Item</th>
      <th>Number</th>
      <th>Cost</th>
      <th>Total</th>
    </tr>
    <tr v-for="item in summarisedItems">
      <td>{{item.item.description}}</td>
      <td>{{item.count}}</td>
      <td>£{{itemPrice(item)}}</td>
      <td>£{{itemPrice(item) * item.count}}</td>
    </tr>
  </table>


</template>

<script setup>

import {computed, ref} from "vue";
import {useBasketStore} from "../stores/basketStore.js";
import SimpleHero from "@/components/shared/SimpleHero.vue";
import {useStoryblok} from "@storyblok/vue";
import {useRoute} from "vue-router";

const content = ref(null)
const error = ref(null)

const itemPrice = (item) => {
  return item.item.sales_price ? item.item.sales_price : item.item.price
}

const basket = useBasketStore()

const summarisedItems = computed(
  () => {
    const items = {}
    console.log(basket.items)
    basket.items.forEach(
        (item) => {
          if(!items[item._uid]) {
            items[item._uid] = {
              count: 1,
              item: item
            }
          } else {
            items[item._uid].count++
          }
        }
    )
    console.log({items})
    return items
  }
)

const route = useRoute()

const refreshPage = async () => {
  const splitRoute = route.path.split("/").filter( route_element => route_element )
  try {
    const response = await useStoryblok(route.path.replace(/^\/|\/$/g, ''))
    content.value = response.value
    console.log({repsonse})
  }
  catch(e) {
    error.value = e
  }
}

refreshPage()


</script>

<style lang="scss" scoped>

</style>
