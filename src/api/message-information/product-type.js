import request from '@/utils/request'
import qs from 'qs'

export function getProductTypeList(data) { // 查询产品类型信息列表
    return request({
        url: '/product/page_search',
        method: 'POST',
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;'
        }
    })
}

export function addProductType(data) { // 添加产品类型
    return request({
        url: '/product/add',
        method: 'POST',
        data
    })
}


export function deleteProductType(data) { // 删除产品类型
    return request({
        url: '/product/delete',
        method: 'POST',
        data

    })
}

export function updateProductType(data) { // 编辑客户
    return request({
        url: '/product/update',
        method: 'POST',
        data
    })
}