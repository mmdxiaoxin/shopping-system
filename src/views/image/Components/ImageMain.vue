<template>
  <el-main class="image-main">
    <div class="top">
      <div v-for="(item, index) in list" :key="index">{{ item.url }}</div>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev,pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getListData"
      />
    </div>
  </el-main>
</template>
<script setup>
import { ref } from "vue";
import { getImageList } from "@/api/modules/image-list";

/**
 * Main基本模块
 */
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
const list = ref([]);
const loading = ref(false);
const image_class_id = ref(0);

function getListData(page = null) {
  if (typeof page === "number") {
    currentPage.value = page;
  }
  loading.value = true;
  getImageList(image_class_id.value, currentPage.value)
    .then(({ list: listData, totalCount }) => {
      list.value = listData;
      total.value = totalCount;
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
}

function loadListData(id) {
  currentPage.value = 1;
  image_class_id.value = id;
  getListData();
}

defineExpose({
  loadListData,
});
</script>
<style scoped>
.image-main {
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
