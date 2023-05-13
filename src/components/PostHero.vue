<template>
    <div
        class="hero"
        :style="`background-image: linear-gradient(rgba(48, 43, 43,0), rgba(48, 43, 43, .85)), url(${props.featuredImage})`"
    />
</template>
<script setup>

const props = defineProps({
  featuredImage: {
    type: Object,
    required: true
  },
})

</script>
