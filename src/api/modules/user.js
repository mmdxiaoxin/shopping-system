import axios from "axios";

/*用户登陆
* @param {username, password} params
* */
export const login = (params) => {
    return axios.post("/admin/login", params);
}
