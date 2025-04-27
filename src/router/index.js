import { createRouter, createWebHistory } from "vue-router";
import users from "./client";

const routes = [...users];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
