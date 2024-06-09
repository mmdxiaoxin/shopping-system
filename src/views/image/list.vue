<template>
  <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
    <el-header class="image-header">Header</el-header>
    <el-container>
      <ImageAside />
      <ImageMain />
    </el-container>
  </el-container>
</template>
<script setup>
import ImageAside from "@/views/image/Components/ImageAside.vue";
import ImageMain from "@/views/image/Components/ImageMain.vue";

const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 108 - 40;
</script>
<style scoped lang="scss">
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex
  items-center;
}
</style>
