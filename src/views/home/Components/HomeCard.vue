<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">{{ props.title }}</span>
        <el-tag type="danger" effect="plain">
          {{ props.tip }}
        </el-tag>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col
        :span="6"
        :offset="0"
        v-for="(item, index) in props.buttons"
        :key="index"
      >
        <el-card shadow="hover" class="border-0 bg-gray-100">
          <div class="flex flex-col items-center justify-center">
            <span class="text-xl mb-2">{{ item.value }}</span>
            <span class="text-xs text-gray-500">{{ item.label }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
const props = defineProps({
  title: String,
  tip: String,
  buttons: Array,
});
</script>
<style scoped></style>
