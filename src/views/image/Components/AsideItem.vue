<template>
  <div class="aside-item" :class="{ active: props.active }">
    <span class="truncate"><slot /></span>
    <el-button
      class="ml-auto px-1"
      text
      type="primary"
      size="small"
      @click="emit('edit')"
    >
      <el-icon :size="12">
        <Edit />
      </el-icon>
    </el-button>
    <el-popconfirm
      title="是否要删除该分类？"
      confirmButtonText="确认"
      cancelButtonText="取消"
      @confirm="emit('delete')"
    >
      <template #reference>
        <el-button text class="px-1" type="primary" size="small">
          <el-icon :size="12">
            <Close />
          </el-icon>
        </el-button>
      </template>
    </el-popconfirm>
  </div>
</template>
<script setup>
import { Close, Edit } from "@element-plus/icons-vue";

const props = defineProps({
  active: Boolean,
});
const emit = defineEmits(["edit", "delete"]);
</script>

<style scoped lang="scss">
.aside-item {
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex
  items-center
  p-3
  text-sm
  text-gray-600;

  &:hover {
    @apply bg-blue-50;
  }
}

.active {
  @apply bg-blue-50;
}
</style>
