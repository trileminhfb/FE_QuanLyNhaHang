const admin = [
  {
    path: "/admin",
    component: () => import("../layout/admin/index.vue"),
    children: [
      {
        path: "",
        name: "admin-home",
        component: () => import("../pages/admin/Home.vue"),
      },
      {
        path: "foods",
        name: "admin-foods",
        component: () => import("../pages/admin/FoodMenuAdmin.vue"),
      },
      {
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/UserMenuAdmin.vue"),
      },
      {
        path: "orders",
        name: "admin-orders",
        component: () => import("../pages/admin/OrderAdmin.vue"),
      },
      {
        path: "tables",
        name: "admin-tables",
        component: () => import("../pages/admin/TableMenuAdmin.vue"),
      },
      {
        path: "types",
        name: "admin-types",
        component: () => import("../pages/admin/TypeMenuAdmin.vue"),
      },
      {
        path: "categories",
        name: "admin-categories",
        component: () => import("../pages/admin/CategoryMenuAdmin.vue"),
      },
      {
        path: "customer",
        name: "admin-customer",
        component: () => import("../pages/admin/CustomerMenuAdmin.vue"),
      },
      {
        path: "orders/details-orders",
        name: "admin-details-orders",
        component: () => import("../pages/admin/DetailOrderAdmin.vue"),
      },
      {
        path: "foods/details-foods",
        name: "admin-details-foods",
        component: () => import("../pages/admin/DetailFoodAdmin.vue"),
      },
      {
        path: "categories/details-categories",
        name: "admin-details-categories",
        component: () => import("../pages/admin/DetailCategoryAdmin.vue"),
      },
    ],
  },
];

export default admin;
