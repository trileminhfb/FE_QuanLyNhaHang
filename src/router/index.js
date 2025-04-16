import { createRouter, createWebHistory } from "vue-router";
import users from "./client";
import admin from "./admin";

const routes = [...users, ...admin];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
