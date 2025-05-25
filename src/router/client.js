const users = [
  {
    path: "/",
    component: () => import("../layout/client/index.vue"),
    children: [
      {
        path: "",
        name: "users-home",
        component: () => import("../pages/client/Home.vue"),
      },
      {
        path: "contact",
        name: "users-contact",
        component: () => import("../pages/client/Contact.vue"),
      },
      {
        path: "booking",
        name: "users-booking",
        component: () => import("../pages/client/Booking.vue"),
      },
      {
        path: "news",
        name: "users-news",
        component: () => import("../pages/client/News.vue"),
      },
      {
        path: "introduce",
        name: "users-introduce",
        component: () => import("../pages/client/Introduce.vue"),
      },
      {
        path: "shoppingCart",
        name: "users-shoppingCart",
        component: () => import("../pages/client/shoppingCart.vue"),
      },
      {
        path: "pay",
        name: "users-pay",
        component: () => import("../pages/client/pay.vue"),
      },
      {
        path: "category",
        name: "users-category",
        component: () => import("../pages/client/categoryappetizer.vue"),
      },
      {
        path: "personalinformation",
        name: "users-personalinformation",
        component: () => import("../pages/client/personalinformation.vue"),
      },
      {
        path: "evaluation",
        name: "users-evaluation",
        component: () => import("../pages/client/evaluation.vue"),
      },
      {
        path: "/history",
        name: "History",
        component: () => import("../pages/client/history.vue"),
      },
      {
        path: "/booking-history",
        name: "booking-history",
        component: () => import("../pages/client/bookinghistory.vue"),
      },
      {
        path: "/detail-booking-history/:id?",
        name: "detail-booking-history",
        component: () => import("../pages/client/detailbooking.vue"),
      },
      {
        path: "/rank",
        name: "users-rank",
        component: () => import("../pages/client/rank.vue"),
      },
      {
        path: "/payment",
        name: "users-payment",
        component: () => import("../pages/client/Payment.vue"),
      },
      {
        path: "/history-payment",
        name: "users-historypayment",
        component: () => import("../pages/client/historyPayment.vue"),
      },
     
      //   {
      //     path: '/register',
      //     name: 'users-register',
      //     component: () => import('../pages/loginclient/register.vue')
      //   },
      //   {
      //     path: '/login',
      //     name: 'users-login',
      //     component: () => import('../pages/loginclient/login.vue')
      //   }
      {
        path: "/scan",
        name: "scan",
        component: () => import("../components/Users/Scan.vue"),
        meta: {
          public: true,
        },
      },
    ],
  },
];

export default users;
