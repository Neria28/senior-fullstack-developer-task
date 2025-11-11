import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import authGuard from "./guards/auth";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/AdminView.vue"),
    meta: { requiresAuth: true, roles: ["Admin"] },
  },
  {
    path: "/editor",
    name: "Editor",
    component: () => import("../views/EditorView.vue"),
    meta: { requiresAuth: true, roles: ["Editor"] },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);

export default router;
