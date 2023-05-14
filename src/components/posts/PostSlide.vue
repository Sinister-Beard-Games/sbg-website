<template>

  <div v-if="article" class="big_post">
    <router-link :to="article.full_slug" class="image" :style="`background-image: url(${article.content.FeaturedImage.filename})`"/>
    <h3>{{article.name }}</h3>
    <div v-html="renderRichText(article.content.preview)" class="news_content"/>
    <router-link :to="article.full_slug" class="button">
      Read on, reader
    </router-link>
  </div>
</template>
<script setup>

import {renderRichText} from "@storyblok/vue";

const props =defineProps( {
  article: {
    type: Object,
    required: true
  }
})

</script>

<style lang="scss">
.news_content {
  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
</style>


<style scoped lang="scss">

 .big_post {
  grid-template-areas: "heading heading"
                       "image content"
                       "image button";
  grid-template-columns: 1fr 1fr;
  grid-gap:1.5rem;
  color: white;
  display: grid;
  justify-content: left;
  justify-items: left;
   align-content: start;
  .image {
    border-radius: .5rem;
    grid-area: image;
    background-size: cover;
    background-position: 10% center;
    width: 100%;
    @media (max-width: 60rem) {
      aspect-ratio: 16/9;
    }
  }
  p {
    margin-block-end: 0 !important;
    margin-block-start: 0 !important;
  }


  h3 {
    grid-area: heading;
    font-size: 3rem;
    margin-block-end: 0;
     @media (max-width: 60rem) {
      font-size: 2rem
    }
  }

   .content {
     grid-area: content;
   }

   .button {
     grid-area: button;
   }

  @media (max-width: 60rem) {
    grid-template-areas: "heading"
                         "image"
                         "content"
                         "button";
      grid-template-columns: 1fr;
    }
  }


</style>
