import Vue from "vue";
import VueRouter from "vue-router";
import { routePropResolver } from './util'

const Home = () => import(/* webpackChunkName: "home" */ "../views/Home.vue");
const Edit = () => import(/* webpackChunkName: "edit" */ "../views/Edit.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: routePropResolver
  },
  {
    path: "/edit",
    name: "edit",
    component: Edit,
    props: routePropResolver
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
