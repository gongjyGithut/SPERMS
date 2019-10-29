import request from '@/utils/request'
import qs from 'qs'

export function getOutputStatistics(data) { // 查询设备状态统计
    return request({
        url: '/stats/prod_mount',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;'
        }
    })
}

export function getModelStatistics(data) { // 查询设备状态统计
    return request({
        url: '/stats/prod_mount_by_type',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;'
        }
    })
}