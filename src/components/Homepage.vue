<template>
  <div v-if="content">
    <HeroCell v-for="cell in content.hero" :cell="cell" :key="cell.name"/>
  </div>
</template>
<script setup>
import {useStoryblok} from "@storyblok/vue";
import {onMounted, ref} from "vue";
import HeroCell from "./HeroCell.vue";

const content = ref(null)


onMounted(
    async () => {
      const response = await useStoryblok(
        "home",
        {resolve_relations: ["homepage.hero", "homepage.featured_games", "hero_cell.link"]},
        {resolveRelations: ["homepage.hero", "homepage.featured_games", "hero_cell.link"]}
      )
      content.value = response.value.content
      console.log(content.value)
    }
)

</script>

