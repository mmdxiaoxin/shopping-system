<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="main-top">
      <AsideItem
        :active="activeId === item.id"
        v-for="(item, index) in list"
        :key="index"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
        @click="handleChangeActive(item.id)"
      >
        {{ item.name }}
      </AsideItem>
    </div>
    <div class="main-bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getListData"
      />
    </div>
  </el-aside>
  <FormDrawer title="新增" ref="formDrawerRef" @submit="handleSubmit">
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="80px"
      :inline="false"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" :min="0" :max="1000" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>
<script setup>
import AsideItem from "@/views/image/Components/AsideItem.vue";
import { ref, reactive, computed } from "vue";
import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass,
} from "@/api/modules/image-class";
import FormDrawer from "@/components/FormDrawer/FormDrawer.vue";
import { toast } from "@/utils/common";

const emit = defineEmits(["change"]);

/**
 * Aside基本模块
 */
const loading = ref(false);
const list = ref([]);
const activeId = ref(0);
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

function handleChangeActive(id) {
  activeId.value = id;
  emit("change", id);
}

function getListData(page = null) {
  if (typeof page === "number") {
    currentPage.value = page;
  }
  loading.value = true;
  getImageClassList(currentPage.value)
    .then(({ list: listData, totalCount }) => {
      total.value = totalCount;
      list.value = listData;
      let item = list.value[0];
      if (item) {
        handleChangeActive(item.id);
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

function handleDelete(id) {
  loading.value = true;
  deleteImageClass(id)
    .then(() => {
      toast("删除成功");
      getListData(currentPage.value);
    })
    .finally(() => {
      loading.value = false;
    });
}

getListData();

/**
 * Drawer表格模块
 */
const formDrawerRef = ref(null);
const form = reactive({
  name: "",
  order: 50,
});
const formRef = ref(null);
const rules = {
  name: [
    {
      required: true,
      message: "图库分类名称不能为空",
      trigger: "blur",
    },
  ],
};
const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));

// 新增
function handleCreate() {
  editId.value = 0;
  form.name = "";
  form.order = 50;
  formDrawerRef.value.open();
}

// 编辑
function handleEdit(row) {
  editId.value = row.id;
  form.name = row.name;
  form.order = row.order;
  formDrawerRef.value.open();
}

// 提交
function handleSubmit() {
  formRef.value.validate((valid) => {
    if (!valid) return;
    formDrawerRef.value.showLoading();
    const activeFunction = editId.value
      ? updateImageClass(editId.value, form)
      : createImageClass(form);
    activeFunction
      .then(() => {
        toast(drawerTitle.value + "成功");
        getListData(currentPage.value);
        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoading();
      });
  });
}

defineExpose({
  handleCreate,
});
</script>
<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;

  .main-top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
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
