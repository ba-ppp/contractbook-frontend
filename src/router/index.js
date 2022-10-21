import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/add-contact",
    name: "contact.add",
    component: () => import("@/views/ContactEdit.vue"),
    props: () => ({ isAdd: true }),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: (route) => ({ contactId: parseInt(route.params.id) }),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
