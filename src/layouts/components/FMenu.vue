<template>
  <div class="f-menu" :style="{ width: store.state.asideWidth }">
    <el-menu
      :default-active="defaultActive"
      class="border-0"
      @select="handleSelect"
      :collapse="isCollapse"
      :collapse-transition="false"
      unique-opened
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const router = useRouter();
const store = useStore();
const route = useRoute();

/**
 * data
 */
const isCollapse = computed(() => store.state.asideWidth === "64px");
const asideMenus = computed(() => store.state.menus);
const defaultActive = ref(route.path);

/**
 * methods
 */
const handleSelect = (e) => {
  console.log(e);
  router.push(e);
};
</script>

<style lang="scss">
.f-menu {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md
  fixed
  bg-white;

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
