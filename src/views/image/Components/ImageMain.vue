<template>
  <el-main class="image-main">
    <div class="main-top p-3">
      <el-row :gutter="10">
        <el-col
          :span="6"
          :offset="0"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-card
            shadow="hover"
            class="relative mb-3"
            :body-style="{ padding: 0 }"
          >
            <el-image
              :src="item.url"
              fit="cover"
              class="h-40"
              style="width: 100%"
              :lazy="true"
            ></el-image>
            <div class="image-title">{{ item.name }}</div>
            <div class="flex items-center justify-center p-2">
              <el-button type="primary" size="small" text>重命名</el-button>
              <el-button type="primary" size="small" text>删除</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="main-bottom">
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

  .main-top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;

    .image-title {
      position: absolute;
      top: 122px;
      left: -1px;
      right: -1px;
      @apply text-sm
      truncate
      text-gray-100
      bg-opacity-50
      bg-gray-800
      px-2
      py-1;
    }
  }

  .main-bottom {
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
