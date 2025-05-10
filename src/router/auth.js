const authRoutes = [
  {
    path: "/register",
    name: "users-register",
    component: () => import("../pages/loginclient/register.vue"),
  },
  {
    path: "/login",
    name: "users-login",
    component: () => import("../pages/loginclient/login.vue"),
  },
  {
    path: "/login-admin",
    name: "admin-login",
    component: () => import("../pages/login/Home.vue"),
  },
  // {
  //   path: "/forgot-password",
  //   name: "forgot-password",
  //   component: () => import("../pages/loginclient/ForgotPassword.vue"),
  // },
];

export default authRoutes;
