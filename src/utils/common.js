import { ElMessageBox, ElNotification } from "element-plus";
import nprogress from "nprogress";

// 消息提示
export const toast = (
  message,
  type = "success",
  dangerouslyUseHTMLString = true,
) => {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000,
  });
};

// 显示全局Loading
export const showFullLoading = () => {
  nprogress.start();
};

// 隐藏全局Loading
export const hideFullLoading = () => {
  nprogress.done();
};

// 模态框确认提示
export const showModal = (
  content = "提示内容",
  type = "warning",
  title = "",
) => {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type,
  });
};
