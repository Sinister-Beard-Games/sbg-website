<template>
  <div v-if="content" class="site_content">
    <SiteHeader :logo="content.logo.filename" :basket_logo="content.basket_logo.filename" />
    <div class="page_content">
      <router-view :key="route.path" />
    </div>
    <footer>
      <div v-for="link in content.social_links" class="social_link">
        <a :href="link.content.link" target="_blank">
          <img :src="link.content.logo.filename" />
        </a>
      </div>
      <p>{{copyrightText}}</p>
    </footer>
  </div>
</template>

<script setup>
import {onMounted, ref, computed} from "vue";
import {useStoryblok} from "@storyblok/vue";
import {useRoute} from "vue-router";
const content = ref(null)
import SiteHeader from "@/components/shared/SiteHeader.vue";

const route = useRoute()

onMounted(
    async () => {
      const response = await useStoryblok(
          "site-settings",
          {resolve_relations: ["site_settings.social_links", "site_settings.other_links"]},
          {resolveRelations: ["site_settings.social_links", "site_settings.other_links"]}
      )
      content.value = response.value.content
    }
)

const copyrightText = computed(()=> {
  const year = new Date().getFullYear()
  return content.value.copyright_text.replaceAll("#current_year#", year)
})

</script>

<style lang="scss">
@import "style";
</style>
