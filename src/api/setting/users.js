import request from '@/utils/request'
import qs from 'qs'

export function getUsersList(data) { // 查询用户信息列表
    return request({
        url: '/users/page_search',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;'
        }
    })
}

export function getUsersListById(data) { // 查询用户信息列表
    return request({
        url: '/users/find_by_id',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;'
        }
    })
}

export function addUsers(data) { // 添加用户
    return request({
        url: '/users/add',
        method: 'POST',
        data
    })
}

export function deleteUsers(data) { // 删除用户
    return request({
        url: '/users/delete',
        method: 'POST',
        data

    })
}

export function updateUsers(data) { // 编辑用户
    return request({
        url: '/users/update',
        method: 'POST',
        data
    })
}