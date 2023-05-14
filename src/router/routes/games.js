import Games from "@/components/games/Games.vue";
export default [
  {
    path: "/:catchAll(.*)",
    name: "Games",
    component: Games,
    id: "games",
  },
];


