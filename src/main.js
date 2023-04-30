import { createApp } from "vue";
import { StoryblokVue, apiPlugin } from "@storyblok/vue";
import App from "./App.vue";

const app = createApp(App);

app.use(StoryblokVue, {
  accessToken: "u3nYmzq16AkG3brA1DyOswtt",
  use: [apiPlugin],
}).mount('#app')
