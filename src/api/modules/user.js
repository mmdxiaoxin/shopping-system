import service from "@/api";

/*用户登陆
* @param {username, password} params
* */
export const loginApi = (params) => {
    return service.post("/admin/login", params);
}

export const getUserInfoApi = () => {
    return service.post("/admin/getinfo");
}
