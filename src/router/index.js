import {createRouter, createWebHistory} from 'vue-router'
import {staticRouter, errorRouter} from '@/router/modules/staticRouter'

const router = createRouter({
    history: createWebHistory(),
    routes: [...staticRouter, ...errorRouter],
});

export default router;
