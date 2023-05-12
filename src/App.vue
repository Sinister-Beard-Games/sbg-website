<template>
  <div v-if="content" class="site_content">
    <header>
      <router-link to="/">
        <img :src="content.logo.filename" :alt="content.logo.alt" class="site_logo"/>
      </router-link>
    </header>
    <div class="page_content">
      <router-view />
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
$light-grey: rgb(68, 63, 63);

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;800&display=swap');

html, body {

  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  height: 100vh;
  @media (max-width: 60rem) {
    font-size: 14px;
  }
  @media (min-width: 120rem) {
    font-size: 1.1rem
  }
}

.site_content {
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: $grey;
  background-image: linear-gradient($light-grey, $grey);
  overflow-x: hidden;
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
  color: white;
  &:hover {
    color: $red;
  }
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
      color: white;
    }
  }
}
header {
  position: fixed;
  z-index: 101;
  .site_logo {
    width: 6rem;
    height: auto;

    left:1.5rem;
    position: absolute;
  }
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


.heading_container {
  text-align: right;
  margin-top: -10rem;
  right:5rem;
  z-index:22;
  position: absolute;
}

h1, h2 {
    font-size: 6rem;
    color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: white;
    @media (max-width: 72rem) {
      font-size: 5rem
    }
    @media (max-width: 65rem) {
      font-size: 4rem
    }
    @media (max-width: 50rem) {
      display: none;
    }
  }

h2 {
    font-size: 5rem;
    text-align: left;
    margin-top:-2.5rem;
    margin-left: 9rem;
    margin-bottom: 1.5rem;
    z-index: 31;
    position: relative;
    @media (max-width: 65rem) {
      font-size: 3rem;
      margin-top:-1.5rem;
    }
}

.hero {
  position: relative;
  background-size: 100% auto;
  background-position: center 40%;
  display: grid;
  justify-items: center;
  align-content: center;
  width: 100%;
  aspect-ratio: 22/9;
  transition: background-size .5s ease-in-out, opacity 2s ease-in-out;
  clip-path: polygon(0 0, 100% 0%, 100% 66%, 0% 100%);
  top:0;
  z-index: 20;
  @media (max-width: 50rem) {
    clip-path: polygon(0 0, 100% 0%, 100% 85%, 0% 100%);
    justify-items: right;
    margin-right:1rem;
  }
  &.current {
    opacity: 100;
    z-index:21;
  }
  &:hover {
    background-size: 110% auto;
  }
  .hero_info {
    width: 66%;
    grid-gap: 1rem;
    display: grid;
    justify-items: center;
    align-content: center;
    margin-top: -7.5%;
    @media (max-width: 50rem) {
      margin-right:1.5rem;

    }
    .logo {
      max-width: 45rem;
      width: 100%;
      @media (max-width: 50rem) {
        width: calc(100% - 5rem);
      }
    }
  }
}

.desktop_text{
  display: none;
  @media (min-width: 30rem) {
    display: block;
  }
}

.mobile_text{
  display: none;
  @media (max-width: 30rem) {
    display: block;
  }
}
</style>
