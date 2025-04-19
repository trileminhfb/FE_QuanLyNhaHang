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
        path: "staffs",
        name: "admin-staffs",
        component: () => import("../pages/admin/StaffMenuAdmin.vue"),
      },
      {
        path: "orders",
        name: "admin-orders",
        component: () => import("../pages/admin/OrderAdmin.vue"),
      },
      {
        path: "details-orders",
        name: "admin-details-orders",
        component: () => import("../pages/admin/DetailOrderAdmin.vue"),
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
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/UsersMenuAdmin.vue"),
      },
    ],
  },
];

export default admin;
