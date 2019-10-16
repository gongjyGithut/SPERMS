import request from '@/utils/request'
import qs from 'qs'

export function getRoleList(data) { // 查询角色信息列表
  return request({
    url: '/sysrole/page_search',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function addRole(data) { // 添加角色
  return request({
    url: '/sysrole/add',
    method: 'POST',
    data
  })
}

export function addRoleRelation(data) { // 角色关联菜单
  return request({
    url: '/sysrole/add_menu_relation',
    method: 'POST',
    data
  })
}

export function deleteRole(data) { // 删除角色
  return request({
    url: '/sysrole/delete',
    method: 'POST',
    data

  })
}

export function deleteRelationByRoleId(data) { // 根据角色ID删除关联信息
  return request({
    url: '/sysrole/del_relation_by_role_ids',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function deleteRelationByRoleIdAndMenuId(data) { // 根据角色和菜单ID删除关联信息
  return request({
    url: '/sysrole/del_relation_by_role_menu_id',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function updateRole(data) { // 编辑角色信息
  return request({
    url: '/sysrole/update',
    method: 'POST',
    data
  })
}
