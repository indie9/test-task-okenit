import Vue from "vue";
import VueRouter from "vue-router";
import Post from "../views/Post.vue";
import Main from "../views/Main.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    props: true,
  },
  {
    path: "/post",
    name: "Post",
    component: Post,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
