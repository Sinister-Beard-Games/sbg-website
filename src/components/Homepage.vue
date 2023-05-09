<template>
  <div v-if="content">
    <img :src="content.logo.filename" :alt="content.logo.alt" class="site_logo"/>
    <HeroCell
        v-for="(cell, index) in content.hero"
        :cell="cell"
        :key="cell.name"
        :current="0"
        :index="index"
    />
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

<style lang="scss" scoped>

.site_logo {
  width: 6rem;
  height: auto;
  position: absolute;
  z-index: 101;
  left:1.5rem;
}
</style>