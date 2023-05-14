<template>
<pre>{{basket.items}}</pre>
</template>

<script setup>

import {useBasketStore} from "../stores/basketStore.js";

const basket = useBasketStore()

</script>

<style lang="scss" scoped>

</style>
