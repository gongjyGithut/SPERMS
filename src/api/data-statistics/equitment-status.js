import request from '@/utils/request'
import qs from 'qs'

export function getEquitmentStatus(data) { // 查询设备状态统计
  return request({
    url: '/stats/dev_state',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}