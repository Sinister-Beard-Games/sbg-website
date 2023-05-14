import Posts from "@/components/posts/Posts.vue"

export default [
  {
    path: "/posts/:catchAll(.*)",
    name: "Posts",
    component: Posts,
    id: "posts",
  },
];
