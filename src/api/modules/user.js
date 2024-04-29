import service from "@/api";

/**
 * 登录
 * @param username
 * @param password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const loginApi = (username, password) => {
    return service.post("/admin/login", {
        username,
        password
    });
}

/**
 * 获取用户信息
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getUserInfoApi = () => {
    return service.post("/admin/getinfo");
}

/**
 * 退出登录
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const logoutApi = () => {
    return service.post("/admin/logout");
}

/**
 * 修改密码
 * @param {Object<{
 *     oldPassword: string,
 *     newPassword: string,
 *     confirmPassword: string
 * }>} data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const changePasswordApi = (data) => {
    return service.post("/admin/updatepassword", data);
}
