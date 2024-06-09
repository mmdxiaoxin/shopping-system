<template>
  <el-aside width="220px" class="image-aside">
    <div class="top">
      <AsideItem
        :active="activeId === item.id"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item.name }}
      </AsideItem>
    </div>
    <div class="bottom">分页区域</div>
  </el-aside>
</template>
<script setup>
import AsideItem from "@/views/image/Components/AsideItem.vue";
import { ref } from "vue";
import { getImageClassList } from "@/api/modules/image-class";

const loading = ref(false);
const list = ref([]);
const activeId = ref(0);

function getListData() {
  loading.value = true;
  getImageClassList(1)
    .then(({ list: listData }) => {
      list.value = listData;
      let item = list.value[0];
      if (item) {
        activeId.value = item.id;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
getListData();
</script>
<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;

  .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
  }

  .bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex
    items-center
    justify-center;
  }
}
</style>
