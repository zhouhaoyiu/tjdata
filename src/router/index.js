import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/user/login.vue";
Vue.use(VueRouter);
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/primer",
    name: "getPrimer",
    component: () =>
      import(
        /* webpackChunkName: "getPrimer" */ "../views/Primer/getPrimer.vue"
      ),
  },
  {
    path: "/vector",
    name: "getVector",
    component: () =>
      import(
        /* webpackChunkName: "getVector" */ "../views/Vector/getVector.vue"
      ),
  },
  {
    path: "/order",
    name: "getOrder",
    component: () =>
      import(/* webpackChunkName: "getOrder" */ "../views/Order/getOrder.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
