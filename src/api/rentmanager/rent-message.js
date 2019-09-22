import request from '@/utils/request'
import qs from 'qs'

export function getRentMessageList(data) { // 查询租赁信息列表
  return request({
    url: '/rentmanager/page_search',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function addRentMessage(data) { // 添加租赁信息
  return request({
    url: '/rentmanager/add',
    method: 'POST',
    data
  })
}

export function updateRentMessage(data) { // 修改租赁信息
  return request({
    url: '/rentmanager/update',
    method: 'POST',
    data
  })
}

export function deleteRentMessage(data) { // 删除租赁信息
  return request({
    url: '/rentmanager/delete',
    method: 'POST',
    data

  })
}
