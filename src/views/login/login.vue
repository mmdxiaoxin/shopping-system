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
      <el-form ref="formRef" :rules="rules" :model="loginForm" class="w-64">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" show-password>
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button round color="#626aef" class="w-64" type="primary" @click="onSubmit" :loading="loading">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {Lock, User} from "@element-plus/icons-vue";
import {login} from "@/api/modules/user";
import {ElMessage, ElNotification} from "element-plus";
import {useCookies} from "@vueuse/integrations/useCookies";
import router from "@/router";


const formRef = ref(null);
const loading = ref(false);

const loginForm = reactive({
  username: "",
  password: ""
})

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
  ]
}

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      login({username: loginForm.username, password: loginForm.password}).then(res => {

        // 提示成功
        ElNotification({
          message: "登录成功",
          type: 'success',
          duration:3000
        })

        // 存储token
        const cookie = useCookies()
        cookie.set("admin-token",res.token)

        router.push('/home');
      }).finally(
          ()=>{
            loading.value = false;
          }
      )
    } else {
      ElMessage.error('用户名或密码不能为空')
      return false
    }
  })
}
</script>

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
