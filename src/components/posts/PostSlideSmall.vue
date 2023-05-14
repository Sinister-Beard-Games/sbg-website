<template>
  <div class="article" >
    <div class="image" :style="`background-image: url(${article.content.FeaturedImage.filename})`" />
    <h3>{{article.name }}</h3>
    <div v-html="renderRichText(article.content.preview)" />
    <router-link :to="`/${article.full_slug}`" class="button">
       More
    </router-link>
  </div>
</template>

<script setup>

import {renderRichText} from "@storyblok/vue";

const props = defineProps(
  {
    article: {
      type: Object,
      required: true
    }
  }
)

</script>

<style lang="scss" scoped>
.article {
  color: white;
  padding: 1rem;
  display: grid;
  justify-content: left;
  justify-items: left;
  align-content: start;
  grid-template-areas: "heading"
                       "content"
                       "button";
  h3 {
    margin-block-end: 0;
  }
}
</style>
