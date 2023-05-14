import GameRouter from "@/components/games/GameRouter.vue";
export default [
  {
    path: "/:catchAll(.*)",
    name: "Games",
    component: GameRouter,
    id: "games",
  },
];


