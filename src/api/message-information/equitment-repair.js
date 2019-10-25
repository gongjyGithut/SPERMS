import request from '@/utils/request'
import qs from 'qs'

export function getRepairList(data) { // 查询设备维修信息列表
    return request({
        url: '/repair/page_search',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
        }
    })
}

export function getRepairListById(data) { // 根据ID查询设备维修列表
    return request({
        url: '/repair/find_by_id',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
        }
    })
}

export function addRepair(data) { // 添加设备维修信息
    return request({
        url: '/repair/add',
        method: 'POST',
        data
    })
}

export function deleteRepair(data) { // 删除设备维修信息
    return request({
        url: '/repair/delete',
        method: 'POST',
        data
    })
}

export function updateRepair(data) { // 编辑设备维修信息
    return request({
        url: '/repair/update',
        method: 'POST',
        data
    })
}