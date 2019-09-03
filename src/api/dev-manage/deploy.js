import request from '@/utils/request'
import qs from 'qs'

export function getEqEnableList(data) { //查询设备列表
    return request({
        url: '/equipment_enable/page_search',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
        }
    })
}

export function getEqEnableListById(data) { //根据ID查询设备应用信息列表
    return request({
        url: '/equipment_enable/find_by_id',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
        }
    })
}

export function addEqEnable(data) { //添加设备应用
    return request({
        url: '/equipment_enable/add',
        method: 'POST',
        data
    })
}

export function deleteEqEnable(data) { //删除设备
    return request({
        url: '/equipment_enable/delete',
        method: 'POST',
        data
    })
}

export function updateEqEnable(data) { //修改设备
    return request({
        url: '/equipment_enable/update',
        method: 'POST',
        data
    })
}