const authRoutes = [
  {
    path: "/register",
    name: "users-register",
    component: () => import("../pages/loginclient/register.vue"),
  },
  {
    path: "/users-login",
    name: "users-login",
    component: () => import("../pages/loginclient/login.vue"),
  },
  {
    path: "/admin-login",
    name: "admin-login",
    component: () => import("../pages/login/Home.vue"),
  },
  {
    path: "/reset-password",
    name: "users-reset-password",
    component: () => import("../pages/loginclient/resetPassword.vue"),
  },
];

export default authRoutes;
