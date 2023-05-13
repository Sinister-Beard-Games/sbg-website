import Posts from "@/components/Posts.vue"

export default [
  {
    path: "/posts/:catchAll(.*)",
    name: "Posts",
    component: Posts,
    id: "posts",
  },
];
