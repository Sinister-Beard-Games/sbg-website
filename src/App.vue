<template>
  <div v-if="content">
    <header>
      <img :src="content.logo.filename" :alt="content.logo.alt" class="site_logo"/>
    </header>
    <router-view />
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
const content = ref(null)
onMounted(
    async () => {
      const response = await useStoryblok(
          "site-settings",
          {resolve_relations: ["site_settings.social_links", "site_settings.other_links"]},
          {resolveRelations: ["site_settings.social_links", "site_settings.other_links"]}
      )
      content.value = response.value.content
      console.log(content)
    }
)

const copyrightText = computed(()=> {
  const year = new Date().getFullYear()
  return content.value.copyright_text.replaceAll("#current_year#", year)
})

</script>

<style lang="scss">

$red: rgb(192, 11, 11);
$red-dark: rgb(142, 11, 11);
$grey: rgb(48, 43, 43);

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;800&display=swap');

html, body {
  background: $grey;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  @media (max-width: 60rem) {
    font-size: 14px;
  }
}

h1, h2, h3 {
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  margin-top:0;
  color: white;
  text-transform: uppercase;
  font-size: 3rem;
  line-height: .9em;
}

a {
  &.button {
    background-color: $red;
    color: white;
    display: inline-block;
    text-transform: uppercase;
    padding: .5rem 1rem;
    text-align: center;
    text-decoration: none;
    border-radius: 2rem;
    font-weight: 800;
    transition: background-color .25s ease-in-out;
    &:hover {
      background-color: $red-dark;
    }
  }
}

.site_logo {
  width: 6rem;
  height: auto;
  position: fixed;
  z-index: 101;
  left:1.5rem;
  @media (max-width: 50rem) {
      position: absolute;
  }
}

footer {
  padding: 1rem;
  color: rgb(255, 255, 255);
  .social_link {
    width: 2rem; height: 2rem;
    display: inline-block;
    margin-right: 1rem;
    img {
      width: 100%;
    }
  }

}
</style>
