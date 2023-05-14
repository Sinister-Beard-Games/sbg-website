<template>
  <PostHero :featuredImage="props.post.content.FeaturedImage.filename" />
  <div class="heading_container">
    <h1>{{post.name}}</h1>
  </div>
  <div class="post_content">
    <div v-if="content" v-html="content" />
    <div class="buttons">
      <router-link to="/posts/" class="secondary button">&lt; All posts</router-link>
      <router-link to="/" class="secondary button">&lt;&lt; Home</router-link>
    </div>
  </div>


</template>
<script setup>
import {computed, ref} from "vue";
import {renderRichText} from "@storyblok/vue";
import PostHero from "@/components/shared/SimpleHero.vue";

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
  padding: 3rem 9rem;
  grid-gap: 2.5rem;
  justify-items: left;
  @media (max-width: 50rem) {
    padding: 2rem;
  }
}

.buttons {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: left;
  grid-gap: 1rem;
}
</style>
