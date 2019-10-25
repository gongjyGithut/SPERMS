import request from '@/utils/request'
import qs from 'qs'

export function getCaculationList(data) { // 查询计费方式列表
  return request({
    url: '/caculation_method/page_search',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function addCaculation(data) { // 添加计费方式
  return request({
    url: '/caculation_method/add',
    method: 'POST',
    data
  })
}

export function deleteCaculation(data) { // 删除计费方式
  return request({
    url: '/caculation_method/delete',
    method: 'POST',
    data

  })
}

export function updateCaculation(data) { // 编辑计费方式
  return request({
    url: '/caculation_method/update',
    method: 'POST',
    data
  })
}
