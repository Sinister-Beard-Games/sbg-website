import PostRouter from "@/components/posts/PostRouter.vue";

export default [
  {
    path: "/posts/:catchAll(.*)",
    name: "Posts",
    component: PostRouter,
    id: "posts",
  },
];
