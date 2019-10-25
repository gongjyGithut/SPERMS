import request from '@/utils/request'
import qs from 'qs'

export function getProductStatList(data) { // 查询生产统计列表
  return request({
    url: '/production_stat/page_search',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function addProductStat(data) { // 添加生产统计
  return request({
    url: '/production_stat/add',
    method: 'POST',
    data
  })
}

export function updateProductStat(data) { // 编辑生产统计
  return request({
    url: '/production_stat/update',
    method: 'POST',
    data
  })
}

export function deleteProductStat(data) { // 删除生产统计
  return request({
    url: '/production_stat/delete',
    method: 'POST',
    data

  })
}
