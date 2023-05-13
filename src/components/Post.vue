<template>
  <PostHero :featuredImage="props.post.content.FeaturedImage.filename" />
  <div class="heading_container">
    <h1>{{post.name}}</h1>
  </div>
  <div class="post_content">
    <div v-if="content" v-html="content" />
    <router-link to="/" class="button">&lt;&lt; Home</router-link>
  </div>


</template>
<script setup>
import {computed, ref} from "vue";
import {renderRichText} from "@storyblok/vue";
import PostHero from "./PostHero.vue";

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const content = computed(() => renderRichText(props.post.content.Content));


</script>

<style lang="scss" scoped>

.post_content {
  color: white;
  display: grid;
  grid-template-columns: 1fr;
  padding: 5rem 9rem;
  grid-gap: 2.5rem;
  justify-items: left;
  @media (max-width: 65rem) {
    padding: 2rem;
  }
}
</style>
