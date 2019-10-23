import request from '@/utils/request'
import qs from 'qs'

export function getPictureList(data) { // 查询设备图片
    return request({
        url: '/monitor_pic/page_search',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
        }
    })
}