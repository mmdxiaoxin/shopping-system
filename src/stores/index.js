import { createStore } from "vuex";
import { getUserInfoApi, loginApi } from "@/api/modules/user";
import { removeToken, setToken } from "@/utils/auth";

const store = createStore({
  state() {
    return {
      // 用户信息
      user: {},

      asideWidth: "250px",
    };
  },
  mutations: {
    // 记录用户信息
    SET_USERINFO(state, user) {
      state.user = user;
    },
    HANDLE_ASIDE_WIDTH(state) {
      state.asideWidth = state.asideWidth === "250px" ? "64px" : "250px";
    },
  },
  actions: {
    // 登录
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        loginApi(username, password)
          .then((res) => {
            setToken(res.token);

            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 获取当前登录用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfoApi()
          .then((res) => {
            commit("SET_USERINFO", res);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    // 退出登录
    logout({ commit }) {
      // 移除cookie里的token
      removeToken();
      // 清除当前用户状态 vuex
      commit("SET_USERINFO", {});
    },
  },
});

export default store;
