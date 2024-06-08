<template>
  <el-row :gutter="20" class="mt-5">
    <el-col
      :span="3"
      :offset="0"
      v-for="(item, index) in iconNavs"
      :key="index"
    >
      <el-card shadow="hover" @click="router.push(item.path)">
        <div class="home-navs">
          <el-icon :size="16" :style="{ color: item.color + ` !important` }">
            <component :is="item.icon" />
          </el-icon>
          <span class="text-sm mt-2">{{ item.title }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.home-navs {
  @apply flex
  flex-col
  items-center
  justify-center
  cursor-pointer;
}
</style>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const iconNavs = [
  {
    icon: "user",
    color: "rgb(59 130 246)",
    title: "用户",
    path: "/user/list",
  },
  {
    icon: "shopping-cart",
    color: "rgb(139 92 246)",
    title: "商品",
    path: "/goods/list",
  },
  {
    icon: "tickets",
    color: "rgb(217 70 239)",
    title: "订单",
    path: "/order/list",
  },
  {
    icon: "chat-dot-square",
    color: "rgb(20 184 166)",
    title: "评价",
    path: "/comment/list",
  },
  {
    icon: "picture",
    color: "rgb(244 63 94)",
    title: "图库",
    path: "/image/list",
  },
  {
    icon: "bell",
    color: "rgb(34 197 94)",
    title: "公告",
    path: "/notice/list",
  },
  {
    icon: "set-up",
    color: "rgb(115 115 115)",
    title: "配置",
    path: "/setting/base",
  },
  {
    icon: "files",
    color: "rgb(234 179 8)",
    title: "优惠券",
    path: "/coupon/list",
  },
];
</script>
