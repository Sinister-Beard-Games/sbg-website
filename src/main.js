import { createApp } from "vue";
import router from "./router/router.js";
import { StoryblokVue, apiPlugin } from "@storyblok/vue";
import {createPinia} from "pinia";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia()
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

app
.use(StoryblokVue, {
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  use: [apiPlugin],
})
.use(router)
.use(pinia)
.mount('#app')
