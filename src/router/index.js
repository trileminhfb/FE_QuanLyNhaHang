import { createRouter, createWebHistory } from "vue-router";
import users from "./client";
import admin from "./admin";
import account from "./account";
import authRoutes from "./auth";

const routes = [...users, ...admin, ...account, ...authRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🛡️ Navigation Guard: kiểm tra login trước khi truy cập các trang cần đăng nhập
router.beforeEach((to, from, next) => {
  const publicPages = ["login", "register", "users-home"]; // các route không cần login
  const authRequired = !publicPages.includes(to.name);
  const isLoggedIn = !!localStorage.getItem("auth_token");

  if (authRequired && !isLoggedIn) {
    // Nếu chưa login, chuyển sang trang login
    return next({ name: "login" });
  }

  next(); // Cho phép đi tiếp nếu đã login hoặc là trang công khai
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
