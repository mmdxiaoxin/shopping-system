<template>
  <div class="f-tag-list" :style="{ left: store.state.asideWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      @tab-remove="removeTab"
      @tab-change="changeTab"
      style="min-width: 100px"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path !== '/'"
      ></el-tab-pane>
    </el-tabs>

    <span class="tag-btn">
      <el-dropdown @command="handleTabList">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px"></div>
</template>
<script setup>
import { useTabList } from "@/hooks/useTabList";
import { ArrowDown } from "@element-plus/icons-vue";
import { useStore } from "vuex";

const { activeTab, tabList, removeTab, changeTab, handleTabList } =
  useTabList();
const store = useStore();
</script>
<style scoped>
.f-tag-list {
  @apply fixed bg-gray-100
  flex
  items-center
  px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;

  .tag-btn {
    @apply bg-white
    rounded
    ml-auto
    flex
    items-center
    justify-center
    px-2;
    height: 32px;
  }

  :deep(.el-tabs__header) {
    @apply mb-0;
  }

  :deep(.el-tabs__nav) {
    border: 0 !important;
  }

  :deep(.el-tabs__item) {
    border: 0 !important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
  }

  :deep(.el-tabs__nav-next),
  :deep(.el-tabs__nav-prev) {
    line-height: 32px;
    height: 32px;
  }

  :deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300;
  }
}
</style>
