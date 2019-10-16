import request from '@/utils/request'
import qs from 'qs'

export function getSysmenuList(data) { // 查询菜单信息列表
  return request({
    url: '/sysmenu/page_search',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function getSysmenuAllList(data) { // 查询全部菜单信息列表
  return request({
    url: '/sysmenu/list_all',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function getSysmenuListById(data) { // 按ID查询菜单信息列表
  return request({
    url: '/sysmenu/find_by_id',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function getSysmenuListByRoleid(data) { // 按角色ID查询菜单信息列表
  return request({
    url: '/sysmenu/find_by_roleid',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function addSysmenu(data) { // 添加菜单
  return request({
    url: '/sysmenu/add',
    method: 'POST',
    data
  })
}

export function deleteSysmenu(data) { // 删除菜单
  return request({
    url: '/sysmenu/delete',
    method: 'POST',
    data

  })
}

export function updataSysmenu(data) { // 编辑菜单
  return request({
    url: '/sysmenu/update',
    method: 'POST',
    data
  })
}
