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
  {
    path: "/user/list",
    name: "/user/list",
    component: () => import("@/views/user/list.vue"),
    meta: {
      title: "用户列表",
    },
  },
  {
    path: "/order/list",
    name: "/order/list",
    component: () => import("@/views/order/list.vue"),
    meta: {
      title: "订单列表",
    },
  },
  {
    path: "/comment/list",
    name: "/comment/list",
    component: () => import("@/views/comment/list.vue"),
    meta: {
      title: "评价列表",
    },
  },
  {
    path: "/image/list",
    name: "/image/list",
    component: () => import("@/views/image/list.vue"),
    meta: {
      title: "图库列表",
    },
  },
  {
    path: "/notice/list",
    name: "/notice/list",
    component: () => import("@/views/notice/list.vue"),
    meta: {
      title: "公告列表",
    },
  },
  {
    path: "/setting/base",
    name: "/setting/base",
    component: () => import("@/views/setting/base.vue"),
    meta: {
      title: "配置",
    },
  },
  {
    path: "/coupon/list",
    name: "/coupon/list",
    component: () => import("@/views/coupon/list.vue"),
    meta: {
      title: "优惠券列表",
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
