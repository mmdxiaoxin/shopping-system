<template>
  <el-upload
    drag
    :action="uploadUrl"
    multiple
    :headers="{
      token,
    }"
    name="img"
    :data="props.data"
    :on-success="uploadSuccess"
    :on-error="uploadError"
  >
    <el-icon class="el-icon--upload">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>
<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { getToken } from "@/utils/auth";
import { toast } from "@/utils/common";

const props = defineProps({
  data: Object,
});
const emit = defineEmits(["success"]);
const uploadUrl = "/api/admin/image/upload";

function uploadSuccess(response, file, fileList) {
  emit("success", { response, file, fileList });
}

function uploadError(error, file, fileList) {
  let msg = JSON.parse(error.message).msg || "上传失败";
  toast(msg, "error");
}

const token = getToken();
</script>
<style scoped></style>
