import request from '@/utils/request'
import qs from 'qs'

export function getLockRuleList(data) { // 查询锁机策略列表
  return request({
    url: '/lockrule/page_search',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
  })
}

export function addLockRule(data) { // 添加锁机策略
  return request({
    url: '/lockrule/add',
    method: 'POST',
    data
  })
}

export function updateLockRule(data) { // 修改锁机策略
  return request({
    url: '/lockrule/update',
    method: 'POST',
    data
  })
}

export function deleteLockRule(data) { // 删除锁机策略
  return request({
    url: '/lockrule/delete',
    method: 'POST',
    data

  })
}
