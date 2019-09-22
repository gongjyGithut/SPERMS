import request from '@/utils/request'
import qs from 'qs'

export function getCustomerList(data) { // 查询客户信息列表
  return request({
    url: '/customer/page_search',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function addCustomer(data) { // 添加客户
  return request({
    url: '/customer/add',
    method: 'POST',
    data
  })
}

export function addUserRelation(data) { // 客户关联系统用户
  return request({
    url: '/customer/add_user_relation',
    method: 'POST',
    data
  })
}

export function deleteCustomer(data) { // 删除客户
  return request({
    url: '/customer/delete',
    method: 'POST',
    data

  })
}

export function deleteUserRelation(data) { // 删除客户关联信息
  return request({
    url: '/customer/del_relation_by_customernos',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function updateCustomer(data) { // 修改客户
  return request({
    url: '/customer/update',
    method: 'POST',
    data
  })
}
