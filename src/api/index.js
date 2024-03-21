import axios from "axios";
import {useCookies} from '@vueuse/integrations/useCookies';
import {ElNotification} from "element-plus";

const config = {
    // 默认地址请求地址，可在 .env.** 文件中修改
    baseURL: "/api",
    // 设置超时时间
    timeout: 10000,
    // 跨域时候允许携带凭证
    withCredentials: true
};

const service = axios.create(config);

service.interceptors.request.use((config) => {
    // 在请求头中添加 token
    const cookie = useCookies()
    const token = cookie.get("admin-token")
    if (token) {
        config.headers["token"] = token
    }

    return config;
}, (error) => {

    return Promise.reject(error);
});

service.interceptors.response.use((response) => {
    return response.data.data;
}, (error) => {

    ElNotification({
        message: error.response.data.msg || "请求失败",
        type: 'error',
        duration: 3000
    })

    return Promise.reject(error);
});

export default service;
