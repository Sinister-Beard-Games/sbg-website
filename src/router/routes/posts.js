import Posts from "@/components/Posts.vue"

export default [
  {
    path: "/posts/:catchAll(.*)",
    name: "Games",
    component: Posts,
    id: "posts",
  },
];
