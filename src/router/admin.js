const admin = [
  {
    path: "/admin",
    component: () => import("../layout/admin/index.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../pages/admin/Home.vue"),
      },
      //user
      {
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/Users/UserMenuAdmin.vue"),
      },
      //table
      {
        path: "tables",
        name: "admin-tables",
        component: () => import("../pages/admin/Table/TableMenuAdmin.vue"),
      },
      {
        path: "tables/details-tables",
        name: "admin-details-tables",
        component: () => import("../pages/admin/Table/DetailTableAdmin.vue"),
      },
      //type
      {
        path: "types",
        name: "admin-types",
        component: () => import("../pages/admin/Type/TypeMenuAdmin.vue"),
      },
      {
        path: "types/details-types",
        name: "admin-details-types",
        component: () => import("../pages/admin/Type/DetailTypeAdmin.vue"),
      },
      //category
      {
        path: "categories",
        name: "admin-categories",
        component: () =>
          import("../pages/admin/Category/CategoryMenuAdmin.vue"),
      },
      {
        path: "categories/details-categories",
        name: "admin-details-categories",
        component: () =>
          import("../pages/admin/Category/DetailCategoryAdmin.vue"),
      },
      //sale
      {
        path: "sale",
        name: "admin-sales",
        component: () => import("../pages/admin/Sale/SaleMenuAdmin.vue"),
      },
      //rank
      {
        path: "rank",
        name: "admin-ranks",
        component: () => import("../pages/admin/Rank/RankMenuAdmin.vue"),
      },
      //customer
      {
        path: "customers",
        name: "admin-customers",
        component: () =>
          import("../pages/admin/Customer/CustomerMenuAdmin.vue"),
      },
      {
        path: "customers/details-customers",
        name: "admin-details-customers",
        component: () =>
          import("../pages/admin/Customer/DetailCustomerAdmin.vue"),
      },
      //booking
      {
        path: "booking",
        name: "admin-booking",
        component: () => import("../pages/admin/Booking/BookingAdmin.vue"),
      },
      {
        path: "booking/details-booking",
        name: "admin-details-booking",
        component: () =>
          import("../pages/admin/Booking/DetailBookingAdmin.vue"),
      },
      //food
      {
        path: "foods",
        name: "admin-foods",
        component: () => import("../pages/admin/Food/FoodMenuAdmin.vue"),
      },
      {
        path: "foods/details-foods/:id?",
        name: "admin-details-foods",
        component: () => import("../pages/admin/Food/DetailFoodAdmin.vue"),
      },
      {
        path: "foods/edit-foods",
        name: "admin-edit-foods",
        component: () => import("../pages/admin/Food/EditFoodAdmin.vue"),
      },
    ],
  },
];

export default admin;
