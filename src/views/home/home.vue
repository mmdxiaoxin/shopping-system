<template>
  <div>
    后台首页
    <el-button @click="setCookie">设置</el-button>
    <el-button @click="getCookie">读取</el-button>
    <el-button v-auth="[`delete`]" @click="removeCookie">删除</el-button>
  </div>
</template>
<script setup>
import { useCookies } from "@vueuse/integrations/useCookies";

const cookie = useCookies();

const setCookie = () => {
  cookie.set("admin-token", 123456);
  console.log("设置成功");
};

const getCookie = () => {
  console.log(cookie.get("admin-token"));
};

const removeCookie = () => {
  cookie.remove("admin-token");
};
</script>
