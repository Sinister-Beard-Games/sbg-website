<template>
  <header>
    <router-link to="/">
      <img :src="logo" alt="Sinister Beard Games" class="site_logo"/>
    </router-link>
  </header>
</template>

<script setup>

const props = defineProps(
    {
     logo: {
      type: String,
      required: true
    }
  }
)

</script>

<style lang="scss" scoped>

</style>
