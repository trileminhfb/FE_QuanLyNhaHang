const users = [
    {
        path: "/users",
        component: () => import("../layout/client/index.vue"),
        children: [
            {
                path: " ", 
                name: "users-home",
                component: () => import("../pages/client/Home.vue") 
            }   ,
            {
                path: "contact", 
                name: "users-contact",
                component: () => import("../pages/client/Contact.vue")
            }  ,
            {
                path: "booking", 
                name: "users-booking",
                component: () => import("../pages/client/Booking.vue")
            }  
        ]
    }
];

export default users;
