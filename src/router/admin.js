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

      // Food
      {
        path: "foods",
        children: [
          {
            path: "",
            name: "admin-foods",
            component: () => import("../pages/admin/Food/MenuFoodAdmin.vue"),
          },
          {
            path: "add",
            name: "admin-add-foods",
            component: () => import("../pages/admin/Food/AddFoodAdmin.vue"),
          },
          {
            path: "detail/:id?",
            name: "admin-detail-foods",
            component: () => import("../pages/admin/Food/DetailFoodAdmin.vue"),
          },
          {
            path: "edit/:id?",
            name: "admin-edit-foods",
            component: () => import("../pages/admin/food/EditFoodAdmin.vue"),
          },
        ],
      },

      // Category
      {
        path: "categories",
        children: [
          {
            path: "",
            name: "admin-categories",
            component: () =>
              import("../pages/admin/Category/MenuCategoryAdmin.vue"),
          },
          {
            path: "add",
            name: "admin-add-categories",
            component: () =>
              import("../pages/admin/Category/AddCategoryAdmin.vue"),
          },
          {
            path: "edit/:id?",
            name: "admin-edit-categories",
            component: () =>
              import("../pages/admin/Category/EditCategoryAdmin.vue"),
          },
          {
            path: "detail/:id?",
            name: "admin-detail-categories",
            component: () =>
              import("../pages/admin/Category/DetailCategoryAdmin.vue"),
          },
        ],
      },

      // Type
      {
        path: "types",
        children: [
          {
            path: "",
            name: "admin-types",
            component: () => import("../pages/admin/Type/MenuTypeAdmin.vue"),
          },
          {
            path: "add",
            name: "admin-add-types",
            component: () => import("../pages/admin/Type/AddTypeAdmin.vue"),
          },
          {
            path: "edit/:id?",
            name: "admin-edit-types",
            component: () => import("../pages/admin/Type/EditTypeAdmin.vue"),
          },
          {
            path: "detail/:id?",
            name: "admin-detail-types",
            component: () => import("../pages/admin/Type/DetailTypeAdmin.vue"),
          },
        ],
      },

      // Table
      {
        path: "tables",
        children: [
          {
            path: "",
            name: "admin-tables",
            component: () => import("../pages/admin/Table/MenuTableAdmin.vue"),
          },
          {
            path: "add",
            name: "admin-add-tables",
            component: () => import("../pages/admin/Table/AddTableAdmin.vue"),
          },
          {
            path: "edit/:id?",
            name: "admin-edit-tables",
            component: () => import("../pages/admin/Table/EditTableAdmin.vue"),
          },
          {
            path: "detail/:id?",
            name: "admin-detail-tables",
            component: () =>
              import("../pages/admin/Table/DetailTableAdmin.vue"),
          },
        ],
      },

      // Rank
      {
        path: "ranks",
        children: [
          {
            path: "",
            name: "admin-ranks",
            component: () => import("../pages/admin/Rank/MenuRankAdmin.vue"),
          },
          {
            path: "add",
            name: "admin-add-ranks",
            component: () => import("../pages/admin/Rank/AddRankAdmin.vue"),
          },
          {
            path: "edit/:id?",
            name: "admin-edit-ranks",
            component: () => import("../pages/admin/Rank/EditRankAdmin.vue"),
          },
          {
            path: "detail/:id?",
            name: "admin-detail-ranks",
            component: () => import("../pages/admin/Rank/DetailRankAdmin.vue"),
          },
        ],
      },

      // Sale
      {
        path: "sales",
        children: [
          {
            path: "",
            name: "admin-sales",
            component: () => import("../pages/admin/Sale/MenuSaleAdmin.vue"),
          },
          {
            path: "add",
            name: "admin-add-sales",
            component: () => import("../pages/admin/Sale/AddSaleAdmin.vue"),
          },
          {
            path: "edit/:id?",
            name: "admin-edit-sales",
            component: () => import("../pages/admin/Sale/EditSaleAdmin.vue"),
          },
          {
            path: "detail/:id?",
            name: "admin-detail-sales",
            component: () => import("../pages/admin/Sale/DetailSaleAdmin.vue"),
          },
        ],
      },

      // User
      {
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/Users/MenuUserAdmin.vue"),
      },
      {
        path: "add",
        name: "admin-add-users",
        component: () => import("../pages/admin/Users/AddUserAdmin.vue"),
      },
      {
        path: "edit/:id?",
        name: "admin-edit-users",
        component: () => import("../pages/admin/Users/EditUserAdmin.vue"),
      },
      {
        path: "detail/:id?",
        name: "admin-detail-users",
        component: () => import("../pages/admin/Users/DetailUserAdmin.vue"),
      },

      // Customer
      {
        path: "customers",
        children: [
          {
            path: "",
            name: "admin-customers",
            component: () =>
              import("../pages/admin/Customer/MenuCustomerAdmin.vue"),
          },
          {
            path: "detail",
            name: "admin-detail-customers",
            component: () =>
              import("../pages/admin/Customer/DetailCustomerAdmin.vue"),
          },
        ],
      },

      // Booking
      {
        path: "booking",
        children: [
          {
            path: "",
            name: "admin-booking",
            component: () =>
              import("../pages/admin/Booking/MenuBookingAdmin.vue"),
          },
          {
            path: "detail",
            name: "admin-detail-booking",
            component: () =>
              import("../pages/admin/Booking/DetailBookingAdmin.vue"),
          },
        ],
      },

      // Warehouse
      {
        path: "warehouse",
        component: () => import("../layout/warehouse/index.vue"),
        children: [
          {
            path: "",
            redirect: { name: "menu-warehouse-admin" },
          },
          {
            path: "menu",
            name: "menu-warehouse-admin",
            component: () =>
              import(
                "../pages/admin/Warehouse/MenuWarehouseAdmin/MenuWarehouseAdmin.vue"
              ),
          },
          {
            path: "detail/:id?",
            name: "detail-warehouse-admin",
            component: () =>
              import(
                "../pages/admin/Warehouse/MenuWarehouseAdmin/DetailWarehouseAdmin.vue"
              ),
          },
          {
            path: "edit/:id?",
            name: "edit-warehouse-admin",
            component: () =>
              import(
                "../pages/admin/Warehouse/MenuWarehouseAdmin/EditWarehouseAdmin.vue"
              ),
          },
          {
            path: "ingredients",
            name: "ingredient-warehouse-admin",
            component: () =>
              import(
                "../pages/admin/Warehouse/IngredientWarehouse/IngredientWarehouseAdmin.vue"
              ),
          },
          {
            path: "import",
            name: "import-warehouse-admin",
            component: () =>
              import(
                "../pages/admin/Warehouse/ImportWarehouse/ImportWarehouseAdmin.vue"
              ),
          },
        ],
      },
    ],
  },
];

export default admin;
