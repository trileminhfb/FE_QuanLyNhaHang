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
    }
  ];
  
  export default authRoutes;

