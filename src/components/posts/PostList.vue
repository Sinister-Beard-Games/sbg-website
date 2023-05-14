<template>
  <pre>LIST COMPONENT</pre>

<!--  <h1>{{ content.title }}</h1>-->
<!--   <div v-html="description"/>-->

<!--   <div id="games_list">-->
<!--     <router-link :to="game.slug" v-for="game in content.attachments">-->
<!--       <div-->
<!--         class="game_preview"-->
<!--         :style="`background-image: url('${coverPreview(game)}')`"-->
<!--       >-->
<!--         <h2>{{game.name}}</h2>-->
<!--       </div>-->
<!--     </router-link>-->
<!--   </div>-->
</template>

<!--<script setup>-->
<!--import {computed} from "vue";-->
<!--import {renderRichText} from "@storyblok/vue";-->

<!--const props = defineProps({-->
<!--  content: {-->
<!--    type: Object,-->
<!--    required: true-->
<!--  }-->
<!--})-->
<!--const content = props.content-->
<!--const description = computed(() => renderRichText(content.content));-->
<!--const coverPreview = (game) => {-->
<!--  return game.content.cover_preview.filename ? game.content.cover_preview.filename : game.content.cover_full.filename-->
<!--}-->

<!--</script >-->

<!--<style scoped lang="scss">-->
<!--#games_list {-->
<!--  display: grid;-->
<!--  grid-template-columns: repeat( auto-fill, minmax(20rem, 20rem) );-->
<!--  justify-content: center;-->
<!--  grid-gap:2rem;-->
<!--  .game_preview {-->
<!--    display: block;-->
<!--    height: 20rem;-->
<!--    background-size: cover;-->
<!--  }-->
<!--}-->

<!--</style>-->
