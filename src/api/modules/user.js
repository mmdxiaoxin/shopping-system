import service from "@/api";

/*用户登陆
* @param {username, password} params
* */
export const login = (params) => {
    return service.post("/admin/login", params);
}
