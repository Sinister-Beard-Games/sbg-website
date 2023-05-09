import Page from "@/components/Page.vue"
import Homepage from "@/components/Homepage.vue"

export default [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
    id: "homepage",
  },
  {
    path: "/:catchAll(.*)",
    name: "Pages",
    component: Page,
    id: "page",
  },
];
