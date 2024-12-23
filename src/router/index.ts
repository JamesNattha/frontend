import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
/* The line `import HomeView from "../views//HomeView.vue";` is importing the `HomeView` component from
the file located at "../views/HomeView.vue". This allows the component to be used within the code
where it is imported. */

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
