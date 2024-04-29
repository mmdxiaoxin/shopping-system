import {ElNotification} from 'element-plus'
import nprogress from 'nprogress'

// 消息提示
export const toast = (message, type = "success", dangerouslyUseHTMLString = false) => {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}

// 显示全局Loading
export  const showFullLoading = () => {
    nprogress.start()
}

// 隐藏全局Loading
export  const hideFullLoading = () => {
    nprogress.done()
}
