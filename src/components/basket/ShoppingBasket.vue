<template>
  <div v-if="content">
    <SimpleHero :featuredImage="content.content.hero_image.filename" />
    <div class="heading_container">
      <h1>{{content.name}}</h1>
    </div>
    <div class="basket_container">
      <table class="basket_items">
        <tr>
          <th>Item</th>
          <th>Number</th>
          <th>Cost</th>
          <th>Total</th>
          <th></th>
        </tr>
        <tr v-for="item in summarisedItems">
          <td>{{item.item.description}}</td>
          <td>{{item.count}}</td>
          <td>£{{itemPrice(item)}}</td>
          <td>£{{itemPrice(item) * item.count}}</td>
          <td>
            <div class="adjust">
              <a class="round secondary button" @click="addAnother(item)">+</a>
              <a class="round secondary button" @click="remove(item)">-</a>
               <button @click="testStockFunction(item)">Test stock function</button>
            </div>
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script setup>

import {computed, ref} from "vue";
import {useProductsStore} from "../../stores/products.js";
import SimpleHero from "@/components/shared/SimpleHero.vue";
import {useStoryblok} from "@storyblok/vue";
import {useRoute} from "vue-router";

const content = ref(null)
const error = ref(null)

const itemPrice = (item) => {
  return item.item.sales_price ? item.item.sales_price : item.item.price
}

const compare = ( a, b ) => {
  if ( a.description < b.description ){
    return -1;
  }
  if ( a.description > b.description ){
    return 1;
  }
  return 0;
}

const products = useProductsStore()

const summarisedItems = computed(
  () => {
    const items = {}
    console.log(products.basket)
    products.basket.forEach(
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
    const arrayOfItems = Object.values(items)
    arrayOfItems.sort(compare)
    return arrayOfItems
  }
)

const remove = (basketItem) => {
  console.log('remove')
  for (let i=0; i < products.basket.length; i++) {
    const item = products.basket[i]
    if(item._uid === basketItem.item._uid) {
      products.basket.splice(i, 1)
      return
    }
  }
}

const addAnother = (item) => {
  console.log(item)
  products.basket.push(item.item)
}

const testStockFunction = (item) => {
  products.reduceStock(item.item, item.count);
}



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
.basket_container {
  padding: 3rem 9rem;
  table {
    background: rgba(255,255,255,.3);
    border-collapse: collapse;
    border: 1px solid #fff;
    border-radius: .25rem;
    color: whitesmoke;
    tr {
      border: 1px solid rgba(255,255,255,.2);
    }
    td, th {
      padding: 1rem;


    }
    th {
      background: rgba(0,0,0,.5);
      color: whitesmoke;
      font-weight: 600;
    }
  }
}
.adjust {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  .round {
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
  }
}
</style>
