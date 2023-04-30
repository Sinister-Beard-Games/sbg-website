<template ref="game_container">

  <div v-if="game">
    <h1>{{game.title}}</h1>
    <div v-html="description.value" />
  </div>

  <div v-else-if="error">
    Couldn't find this bro
  </div>

  <div v-else>Loading...</div>

</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStoryblok, renderRichText } from "@storyblok/vue";
import {useRoute} from "vue-router"

const game = ref(null)
const description = ref(null)
const route = useRoute()
const error = ref(null)

onMounted(
    async () => {
      try {
        const response = await useStoryblok(route.path)
        game.value = response.value.content
        description.value = computed(() => renderRichText(game.value.description));
        console.log(game.value)
      }
      catch(e) {
        error.value = e
      }
    }
)

</script>

<style scoped lang="scss">

</style>