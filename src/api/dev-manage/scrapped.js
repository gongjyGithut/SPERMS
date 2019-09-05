import request from '@/utils/request'
import qs from 'qs'

export function getScrappedList(data) { //查询报废设备信息列表
    return request({
        url: '/scrapp/page_search',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
        }
    })
}

export function getScrappedListById(data) { //根据ID查询报废设备信息
    return request({
        url: '/scrapp/find_by_id',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
        }
    })
}

export function addScrapped(data) { //添加报废设备信息
    return request({
        url: '/scrapp/add',
        method: 'POST',
        data
    })
}

export function deleteScrapped(data) { //删除报废设备信息
    return request({
        url: '/scrapp/delete',
        method: 'POST',
        data
    })
}

export function updateScrapped(data) { //修改报废设备信息
    return request({
        url: '/scrapp/update',
        method: 'POST',
        data
    })
}