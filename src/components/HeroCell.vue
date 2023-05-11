<template>
  <div class="all_slides">
    <div
        class="hero"
        :class="{current: currentSlide, next: nextSlide}"
        :style="`background-image: linear-gradient(rgba(48, 43, 43,0), rgba(48, 43, 43, .85)), url(${cell.content.background.filename})`"
    >
      <div class="hero_info">
        <img class="logo" :src="cell.content.logo.filename" :alt="cell.content.link.name"/>
        <router-link :to="cell.content.link.full_slug" class="button">
          <span class="desktop_text">
            {{cell.content.link_text}}
          </span>
          <span class="mobile_text">
            More info
          </span>
        </router-link>
      </div>
    </div>
  </div>

</template>
<script setup>

import {computed} from "vue";

const props = defineProps({
  cell: {
    type: Object,
    required: true
  },
  current: {
    type: Number,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})

const currentSlide = computed(
    () => {
      return props.current === props.index
    }
)

const nextSlide = computed(
    () => {
      if (props.current === props.index - 1 || props.current === props.total-1 && props.index === 0) {
        return true
      }
      return false
    }
)

</script>
<style lang="scss" scoped>
.all_slides {
  background-color: lime;
  .hero {
    position: absolute;
    background-size: 100% auto;
    background-position: center 40%;
    display: grid;
    justify-items: center;
    align-content: center;
    width: 100%;
    aspect-ratio: 22/9;
    transition: background-size .5s ease-in-out, opacity 2s ease-in-out;
    clip-path: polygon(0 0, 100% 0%, 100% 66%, 0% 100%);
    opacity: 0;
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
