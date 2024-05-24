import router from "@/router/index";

const asyncRoutes = [
  {
    path: "/",
    name: "/",
    component: () => import("@/views/home/home.vue"),
    meta: {
      title: "后台首页",
    },
  },
  {
    path: "/goods/list",
    name: "/goods/list",
    component: () => import("@/views/goods/list.vue"),
    meta: {
      title: "商品管理",
    },
  },
  {
    path: "/category/list",
    name: "/category/list",
    component: () => import("@/views/category/list.vue"),
    meta: {
      title: "分类列表",
    },
  },
];

function addRoutes(menus) {
  // 是否有新的路由
  let hasNewRoutes = false;
  const findAndAddRoutesByMenus = (menuArr) => {
    menuArr.forEach((menu) => {
      let findPath = asyncRoutes.find((route) => route.path === menu.frontpath);
      if (findPath && !router.hasRoute(findPath.path)) {
        router.addRoute("admin", findPath);
        hasNewRoutes = true;
      }
      if (menu.child && menu.child.length > 0) {
        findAndAddRoutesByMenus(menu.child);
      }
    });
  };

  findAndAddRoutesByMenus(menus);

  return hasNewRoutes;
}
export { addRoutes };
