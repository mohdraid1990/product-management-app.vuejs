import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "@/views/ProductsView.vue";

const routes = [
  {
    path: "/",
    name: "products",
    component: ProductsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
