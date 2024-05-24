import { createRouter, createWebHistory } from "vue-router";
import { staticRouter, errorRouter } from "@/router/modules/staticRouter";
import { getToken } from "@/utils/auth";
import { toast, showFullLoading, hideFullLoading } from "@/utils/common";
import store from "@/stores";
import { addRoutes } from "@/router/modules/dynamicRouter";

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRouter, ...errorRouter],
});

//全局路由守卫
router.beforeEach(async (to, from, next) => {
  //显示全局Loading
  showFullLoading();

  const token = getToken();

  //没有登陆，跳转回登陆页面
  if (!token && to.path !== "/login") {
    toast("请先登录", "error");
    return next("/login");
  }

  //已经登陆，跳转到首页
  if (token && to.path === "/login") {
    toast("请勿重复登录", "error");
    return next({ path: from.path ? from.path : "/" });
  }

  //登陆后，自动获取用户信息
  let hasNewRoutes = false;
  if (token && store) {
    const { menus } = await store.dispatch("getUserInfo");
    hasNewRoutes = addRoutes(menus);
  }

  // 设置页面标题
  let title = (to.meta.title ? to.meta.title : "") + "-商城后台管理系统";
  document.title = title;

  hasNewRoutes ? next(to.fullPath) : next();
});

//全局后置路由守卫
router.afterEach((to, from) => {
  //隐藏全局Loading
  hideFullLoading();
});

export default router;
