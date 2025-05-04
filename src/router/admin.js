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

      //food
      {
        path: "foods",
        name: "admin-foods",
        component: () => import("../pages/admin/Food/MenuFoodAdmin.vue"),
      },
      {
        path: "foods/add-foods",
        name: "admin-add-foods",
        component: () => import("../pages/admin/Food/AddFoodAdmin.vue"),
      },
      {
        path: "foods/details-foods/:id?",
        name: "admin-details-foods",
        component: () => import("../pages/admin/Food/DetailFoodAdmin.vue"),
      },
      {
        path: "foods/edit-foods/:id?",
        name: "admin-edit-foods",
        component: () => import("../pages/admin/food/EditFoodAdmin.vue"),
      },

      //category
      {
        path: "categories",
        name: "admin-categories",
        component: () =>
          import("../pages/admin/Category/MenuCategoryAdmin.vue"),
      },
      {
        path: "categories/add-categories",
        name: "admin-add-categories",
        component: () => import("../pages/admin/Category/AddCategoryAdmin.vue"),
      },
      {
        path: "categories/edit-categories/:id?",
        name: "admin-edit-categories",
        component: () =>
          import("../pages/admin/Category/EditCategoryAdmin.vue"),
      },
      {
        path: "categories/details-categories/:id?",
        name: "admin-details-categories",
        component: () =>
          import("../pages/admin/Category/DetailCategoryAdmin.vue"),
      },

      //type
      {
        path: "types",
        name: "admin-types",
        component: () => import("../pages/admin/Type/MenuTypeAdmin.vue"),
      },
      {
        path: "types/details-types",
        name: "admin-details-types",
        component: () => import("../pages/admin/Type/DetailTypeAdmin.vue"),
      },

      //user
      {
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/Users/MenuUserAdmin.vue"),
      },

      //table
      {
        path: "tables",
        name: "admin-tables",
        component: () => import("../pages/admin/Table/MenuTableAdmin.vue"),
      },
      {
        path: "tables/details-tables",
        name: "admin-details-tables",
        component: () => import("../pages/admin/Table/DetailTableAdmin.vue"),
      },

      //sale
      {
        path: "sale",
        name: "admin-sales",
        component: () => import("../pages/admin/Sale/MenuSaleAdmin.vue"),
      },

      //rank
      {
        path: "rank",
        name: "admin-ranks",
        component: () => import("../pages/admin/Rank/MenuRankAdmin.vue"),
      },

      //customer
      {
        path: "customers",
        name: "admin-customers",
        component: () =>
          import("../pages/admin/Customer/MenuCustomerAdmin.vue"),
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
        component: () => import("../pages/admin/Booking/MenuBookingAdmin.vue"),
      },
      {
        path: "booking/details-booking",
        name: "admin-details-booking",
        component: () =>
          import("../pages/admin/Booking/DetailBookingAdmin.vue"),
      },

      //category
      {
        path: "categories",
        name: "admin-categories",
        component: () =>
          import("../pages/admin/Category/MenuCategoryAdmin.vue"),
      },
      {
        path: "categories/add-categories",
        name: "admin-add-categories",
        component: () => import("../pages/admin/Category/AddCategoryAdmin.vue"),
      },
      {
        path: "categories/edit-categories/:id?",
        name: "admin-edit-categories",
        component: () =>
          import("../pages/admin/Category/EditCategoryAdmin.vue"),
      },
      {
        path: "categories/details-categories/:id?",
        name: "admin-details-categories",
        component: () =>
          import("../pages/admin/Category/DetailCategoryAdmin.vue"),
      },

      //type
      {
        path: "types",
        name: "admin-types",
        component: () => import("../pages/admin/Type/MenuTypeAdmin.vue"),
      },
      {
        path: "types/add-types/",
        name: "admin-add-types",
        component: () => import("../pages/admin/Type/AddTypeAdmin.vue"),
      },
      {
        path: "types/edit-types/:id?",
        name: "admin-edit-types",
        component: () => import("../pages/admin/Type/EditTypeAdmin.vue"),
      },
      {
        path: "types/details-types/:id?",
        name: "admin-details-types",
        component: () => import("../pages/admin/Type/DetailTypeAdmin.vue"),
      },

      //table
      {
        path: "tables",
        name: "admin-tables",
        component: () => import("../pages/admin/Table/MenuTableAdmin.vue"),
      },
      {
        path: "tables/add-tables",
        name: "admin-add-tables",
        component: () => import("../pages/admin/Table/AddTableAdmin.vue"),
      },
      {
        path: "tables/details-tables/:id?",
        name: "admin-details-tables",
        component: () => import("../pages/admin/Table/DetailTableAdmin.vue"),
      },
      {
        path: "tables/edit-tables/:id?",
        name: "admin-edit-tables",
        component: () => import("../pages/admin/Table/EditTableAdmin.vue"),
      },

      //rank
      {
        path: "ranks",
        name: "admin-ranks",
        component: () => import("../pages/admin/Rank/MenuRankAdmin.vue"),
      },
      {
        path: "ranks/add-ranks",
        name: "admin-add-ranks",
        component: () => import("../pages/admin/Rank/AddRankAdmin.vue"),
      },
      {
        path: "ranks/edit-ranks/:id?",
        name: "admin-edit-ranks",
        component: () => import("../pages/admin/Rank/EditRankAdmin.vue"),
      },
      {
        path: "ranks/detail-ranks/:id?",
        name: "admin-detail-ranks",
        component: () => import("../pages/admin/Rank/DetailRankAdmin.vue"),
      },

      //user
      {
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/Users/MenuUserAdmin.vue"),
      },

      //sale
      {
        path: "sale",
        name: "admin-sales",
        component: () => import("../pages/admin/Sale/MenuSaleAdmin.vue"),
      },

      //customer
      {
        path: "customers",
        name: "admin-customers",
        component: () =>
          import("../pages/admin/Customer/MenuCustomerAdmin.vue"),
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
        component: () => import("../pages/admin/Booking/MenuBookingAdmin.vue"),
      },
      {
        path: "booking/details-booking",
        name: "admin-details-booking",
        component: () =>
          import("../pages/admin/Booking/DetailBookingAdmin.vue"),
      },

      //warehouse
      {
        path: "warehouse",
        component: () => import("../layout/warehouse/index.vue"),
        children: [
          {
            path: "",
            redirect: { name: "menu-warehouse-admin" }, // Tự động chuyển sang route con cụ thể
          },

          //warehouse menu
          {
            path: "menu-warehouse-admin",
            name: "menu-warehouse-admin",
            component: () =>
              import(
                "../pages/admin/Warehouse/MenuWarehouseAdmin/MenuWarehouseAdmin.vue"
              ),
          },
          {
            path: "detail-warehouse-admin/:id?",
            name: "detail-warehouse-admin",
            component: () =>
              import(
                "../pages/admin/Warehouse/MenuWarehouseAdmin/DetailWarehouseAdmin.vue"
              ),
          },
          {
            path: "edit-warehouse-admin/:id?",
            name: "edit-warehouse-admin",
            component: () =>
              import(
                "../pages/admin/Warehouse/MenuWarehouseAdmin/EditWarehouseAdmin.vue"
              ),
          },

          //warehouse ingredient
          {
            path: "ingredient-warehouse",
            name: "ingredient-warehouse-admin",
            component: () =>
              import(
                "../pages/admin/Warehouse/IngredientWarehouse/IngredientWarehouseAdmin.vue"
              ),
          },
          {
            path: "import-warehouse",
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
