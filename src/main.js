import { createApp } from "vue";
import router from "./router/router.js";
import { StoryblokVue, apiPlugin } from "@storyblok/vue";
import {createPinia} from "pinia";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia()

app
.use(StoryblokVue, {
  accessToken: "On63krEoz1rtKmqF4QSMSAtt",
  use: [apiPlugin],
})
.use(router)
.use(pinia)
.mount('#app')
