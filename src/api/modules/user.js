import service from "@/api";

/*用户登陆
* @param {username, password}
* */
export const loginApi = (username, password) => {
    return service.post("/admin/login", {
        username,
        password
    });
}

export const getUserInfoApi = () => {
    return service.post("/admin/getinfo");
}
