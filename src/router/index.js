import {createRouter, createWebHistory} from 'vue-router'
import {staticRouter, errorRouter} from '@/router/modules/staticRouter'
import {getToken} from "@/utils/auth";
import {toast} from "@/utils/common";
import {useStore} from "vuex";


const store = useStore();

const router = createRouter({
    history: createWebHistory(),
    routes: [...staticRouter, ...errorRouter],
});

//全局路由守卫
router.beforeEach(async (to, from, next) => {
    const token = getToken();

    //没有登陆，跳转回登陆页面
    if (!token && to.path !== '/login') {
        toast('请先登录', 'error');
        return next('/login');
    }

    //已经登陆，跳转到首页
    if (token && to.path === '/login') {
        toast("请勿重复登录","error")
        return next({path: from.path ? from.path : "/"});
    }

    //登陆后，自动获取用户信息
    if (token && store) {
        await store.dispatch("getUserInfo");
    }

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "-商城后台管理系统";
    document.title = title;

    next();
});

export default router;
