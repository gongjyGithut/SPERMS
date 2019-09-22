import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
  return request({
    url: '/auth',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(data) {
  return request({
    url: '/users/find_by_id',
    method: 'post',
    data: qs.stringify(data)

  })
}
