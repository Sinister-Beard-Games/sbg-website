
<template ref="posts_container">
  <PostList :key="`list_${content._uid}`" v-if="content && listView" :content="content" />
  <PostSingle :key="`post_${content._uid}`" v-else-if="content" :post="content"/>
  <FourOhFour v-else-if="error" />
  <LoadingIndicator v-else />
</template>

<script setup>
import {ref, watch} from "vue";
import {useStoryblok} from "@storyblok/vue";
import {useRoute} from "vue-router"
import FourOhFour from "@/components/shared/FourOhFour.vue"
import LoadingIndicator from "@/components/shared/LoadingIndicator.vue"
import PostList from "@/components/posts/PostList.vue";
import PostSingle from "@/components/posts/PostSingle.vue";

const listView = ref(false)
const content = ref(null)
const error = ref(null)
const route = useRoute()

const refreshPage = async () => {
  const splitRoute = route.path.split("/").filter( route_element => route_element )
  listView.value = splitRoute[splitRoute.length-1] === "posts"
  try {
    const response = await useStoryblok(route.path)
    content.value = response.value
    console.log(content.value)
  }
  catch(e) {
    error.value = e
  }
}

refreshPage()

</script>

