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


.hero {
  position: absolute;
  opacity: 0;
}

</style>
