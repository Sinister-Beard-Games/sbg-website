import { createApp } from "vue";
import router from "./router/router.js";
import { StoryblokVue, apiPlugin } from "@storyblok/vue";
import App from "./App.vue";

const app = createApp(App);

app
.use(StoryblokVue, {
  accessToken: "On63krEoz1rtKmqF4QSMSAtt",
  use: [apiPlugin],
})
.use(router).
mount('#app')
