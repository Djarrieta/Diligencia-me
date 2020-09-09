import Vue from "vue";
import Router from "vue-router";
import Items from "@/views/Items";
import ItemDetalle from "@/views/ItemDetalle";
import ItemNuevo from "@/views/ItemNuevo";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Items,
    },
    {
      path: "/items",
      name: "Items",
      component: Items,
    },
    {
      path: "/items/:cod",
      name: "ItemDetalle",
      component: ItemDetalle,
    },
    {
      path: "/itemnuevo",
      name: "ItemNuevo",
      component: ItemNuevo,
    },
    {
      path: "*",
      name: "Error",
      component: Error,
    },
  ],
});
