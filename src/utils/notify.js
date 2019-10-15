import { Message } from 'element-ui'

// 成功的通知
export function notifySuccess(message) {
  Message.success({
    showClose: true,
    message: message,
    customClass: 'md-message-success',
    iconClass: 'md-message-success-icon'
  })
}
// 失败的通知
export function notifyError(message) {
  Message.error({
    showClose: true,
    message: message,
    customClass: 'md-message-error',
    iconClass: 'md-message-error-icon'
  })
}
// 警告的通知
export function notifyWarning(message) {
  Message.warning({
    showClose: true,
    message: message,
    customClass: 'md-message-warning',
    iconClass: 'md-message-warning-icon'
  })
}
