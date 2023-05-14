<template ref="game_container">
  <GameList :key="`list_${content._uid}`" v-if="content && listView" :content="content" />
  <GameSingle :key="`game_${content._uid}`" v-else-if="content" :game="content"/>
  <FourOhFour v-else-if="error" />
  <LoadingIndicator v-else />
</template>

<script setup>
import {ref, watch} from "vue";
import {useStoryblok} from "@storyblok/vue";
import {useRoute} from "vue-router"
import GameSingle from "@/components/games/GameSingle.vue";
import FourOhFour from "@/components/shared/FourOhFour.vue"
import LoadingIndicator from "@/components/shared/LoadingIndicator.vue"
import GameList from "@/components/games/GameList.vue";

const listView = ref(false)
const content = ref(null)
const error = ref(null)
const route = useRoute()

const refreshPage = async () => {
  const splitRoute = route.path.split("/").filter( route_element => route_element )
  listView.value = splitRoute[splitRoute.length-1] === "games"
  console.log(listView.value)
  try {
    const response = await useStoryblok(
        route.path.replace(/^\/|\/$/g, '')
    )
    content.value = response.value
    console.log(content.value.component)
  }
  catch(e) {
    error.value = e
  }
}

watch(
    () => route.path,
    (currentState, prevState)=> {
      console.log('Page refresh')
      console.log({currentState})
      console.log({prevState})
      refreshPage()
    },
    { immediate: true }
)

</script>


<style>
pre {
  background-color: deeppink;
  color: white;
}
</style>
