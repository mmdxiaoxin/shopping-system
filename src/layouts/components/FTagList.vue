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
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px"></div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { ArrowDown } from "@element-plus/icons-vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";

const store = useStore();
const route = useRoute();
const router = useRouter();
const cookies = useCookies();

const activeTab = ref(route.path);
const tabList = ref([
  {
    title: "后台首页",
    path: "/",
  },
]);

onBeforeRouteUpdate((to) => {
  activeTab.value = to.path;
  addTab({
    title: to.meta.title,
    path: to.path,
  });
});

const initTabList = () => {
  const tabs = cookies.get("tabList");
  if (tabs) {
    tabList.value = tabs;
  }
};

const addTab = (tab) => {
  tabList.value.findIndex((item) => item.path === tab.path) === -1 &&
    tabList.value.push(tab);
  cookies.set("tabList", tabList.value);
};

const removeTab = (targetName) => {
  const tabs = tabList.value;
  let activeName = activeTab.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.path;
        }
      }
    });
  }

  activeTab.value = activeName;
  tabList.value = tabList.value.filter((tab) => tab.path !== targetName);
  cookies.set("tabList", tabList.value);
};

const changeTab = (tab) => {
  router.push(tab);
};

onBeforeMount(() => {
  initTabList();
});
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
