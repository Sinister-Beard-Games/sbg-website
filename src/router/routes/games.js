import Games from "@/components/Games.vue"

export default [
  {
    path: "/games/:catchAll(.*)",
    name: "Games",
    component: Games,
    id: "games",
  },
];
