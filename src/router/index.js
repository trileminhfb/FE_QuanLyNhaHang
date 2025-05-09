import { createRouter, createWebHistory } from "vue-router";
import users from "./client";
import admin from "./admin";
import account from "./account";

const routes = [...users, ...admin, ...account];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (!token && to.path.startsWith("/admin")) {
    return next("/account/login");
  }

  if (
    token &&
    (to.path === "/account/login" || to.path === "/account/register")
  ) {
    return next("/admin");
  }

  next();
});

export default router;
