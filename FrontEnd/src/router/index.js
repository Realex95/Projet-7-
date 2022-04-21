import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "Connexion",
        component: () => import("../views/Connexion"),
    },
    {
        path: "/Signup",
        name: "Inscription",
        component: () => import("../views/Signup")
    },
    {
        path: "/Admin",
        name: "Admin",
        component: () => import("../views/Admin"),
    }  
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ["/", "/Signup"]
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem("userId")
    const loggedToken = localStorage.getItem("token")
    if (authRequired && !loggedIn && !loggedToken) {
        return next("/")
    }
    next()
})

export default router