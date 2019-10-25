import request from '@/utils/request'
import qs from 'qs'

export function getStoreMessageList(data) { // 查询仓库信息列表
  return request({
    url: '/store/page_search',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function addStoreMessage(data) { // 添加仓库信息
  return request({
    url: '/store/add',
    method: 'POST',
    data
  })
}

export function updateStoreMessage(data) { // 编辑仓库信息
  return request({
    url: '/store/update',
    method: 'POST',
    data
  })
}

export function deleteStoreMessage(data) { // 删除仓库信息
  return request({
    url: '/store/delete',
    method: 'POST',
    data

  })
}
