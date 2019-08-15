import request from '@/utils/request'
import qs from 'qs'

export function getEqList(data){//查询设备列表
    return request({
        url:'/equipment/page_search',
        method:'POST',
        data:qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
        }
    })
}

export function addEq(data){//添加设备
    return request({
        url:'/equipment/add',
        method:'POST',
        data
    })
}

export function deleteEq(data){//删除设备
    return request({
        url:'/equipment/delete',
        method:'POST',
        data
    })
}

export function updateEq(data){//修改设备
    return request({
        url:'/equipment/update',
        method:'POST',
        data
    })
}

