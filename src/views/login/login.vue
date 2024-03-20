<script setup>
import {reactive} from 'vue'

const form = reactive({
  username: "",
  password: ""
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="login-left">
      <div>
        <div>商品管理后台</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="login-right">
      <h2 class="title">欢迎回来</h2>
      <div class="sub-title">
        <span class="h-px w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-px w-16 bg-gray-200"></span>
      </div>
      <el-form :model="form" class="w-64">
        <el-form-item>
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon>
                <lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button round color="#626aef" class="w-64" type="primary" @click="onSubmit">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.login-container {
  @apply bg-indigo-500;
  @apply min-h-screen;
  .login-left {
    @apply flex;
    @apply items-center;
    @apply justify-center;

    div {
      @apply font-bold text-5xl text-indigo-50 mb-4;
    }
  }

  .login-right {
    @apply flex;
    @apply items-center;
    @apply justify-center;
    @apply bg-white;
    @apply flex-col;

    .title {
      @apply font-bold text-3xl text-gray-800;
    }

    .sub-title {
      @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
    }
  }
}
</style>
