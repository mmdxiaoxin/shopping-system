import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { showModal, toast } from "@/utils/common";
import { changePasswordApi, logoutApi } from "@/api/modules/user";

/**
 * 修改密码
 * @returns {{formRef: Ref<UnwrapRef<null>>,
 * formDrawerRef: Ref<UnwrapRef<null>>,
 * form: UnwrapNestedRefs<{password: string,
 * repassword: string, oldpassword: string}>,
 * onSubmit: onSubmit, openRePasswordForm: (function(): *),
 * rules: {password: [{trigger: string, message: string, required: boolean}],
 * repassword: [{trigger: string, message: string, required: boolean}],
 * oldpassword: [{trigger: string, message: string, required: boolean}]}}}
 */
export function useResetPassword() {
  const router = useRouter();
  const store = useStore();

  const formDrawerRef = ref(null);
  const formRef = ref(null);
  const form = reactive({
    oldpassword: "",
    password: "",
    repassword: "",
  });

  const rules = {
    oldpassword: [
      {
        required: true,
        message: "旧密码不能为空",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "新密码不能为空",
        trigger: "blur",
      },
    ],
    repassword: [
      {
        required: true,
        message: "确认密码不能为空",
        trigger: "blur",
      },
    ],
  };

  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return false;
      }
      formDrawerRef.value.showLoading();
      changePasswordApi(form)
        .then((res) => {
          toast("修改密码成功，请重新登录");
          store.dispatch("logout");
          // 跳转回登录页
          router.push("/login");
        })
        .finally(() => {
          formDrawerRef.value.hideLoading();
        });
    });
  };

  const openRePasswordForm = () => formDrawerRef.value.open();

  return {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRePasswordForm,
  };
}

/**
 * 退出登录
 * @returns {{handleLogout: handleLogout}}
 */
export function useLogout() {
  const router = useRouter();
  const store = useStore();

  const handleLogout = () => {
    showModal("是否要退出登录？").then((res) => {
      logoutApi().finally(() => {
        store.dispatch("logout");
        // 跳转回登录页
        router.push("/login");
        // 提示退出登录成功
        toast("退出登录成功");
      });
    });
  };

  return {
    handleLogout,
  };
}
