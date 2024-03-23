import axios from "axios";
import {getToken} from "@/utils/auth";
import {toast} from "@/utils/common";

const config = {
    // 默认地址请求地址，可在 .env.** 文件中修改
    baseURL: "/api",
    // 设置超时时间
    timeout: 10000,
    // 跨域时候允许携带凭证
    withCredentials: true
};

const service = axios.create(config);

// 请求拦截器
service.interceptors.request.use((config) => {
    // 在请求头中添加 token
    const token = getToken()
    if (token) {
        config.headers['token'] = token;
    }

    return config;
}, (error) => {

    return Promise.reject(error);
});

//响应拦截器
service.interceptors.response.use((response) => {

    //处理响应数据
    return response.data.data;
}, (error) => {

    toast(error.response.data.msg || "请求失败","error")

    return Promise.reject(error);
});

export default service;
