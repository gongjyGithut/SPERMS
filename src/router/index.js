import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [{
  path: '/login',
  component: () =>
            import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () =>
            import('@/views/404'),
  hidden: true
},
{
  path: '/personal',
  component: Layout,
  redirect: '/personal/index',
  hidden: true,
  children: [{
    path: 'index',
    name: '个人中心',
    component: () =>
                import('@/views/personal/index'),
    meta: { title: '个人中心' }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  // hidden: true,
  children: [{
    path: 'dashboard',
    component: () =>
                import('@/views/dashboard/index'),
    meta: { title: '工作台', icon: 'workplace' }
  }]
},
{
  path: '/operational-analysis',
  component: Layout,
  redirect: '/operational-analysis/index',
  meta: { title: '运营分析', icon: 'charts' },
  // hidden: true,
  children: [{
    path: 'equitment-status',
    name: '设备状态统计',
    component: () =>
                import('@/views/operational-analysis/equitment-status/index'),
    meta: { title: '设备状态统计' }
  }, {
    path: 'prod-mount',
    name: '产量统计',
    component: () =>
    import('@/views/operational-analysis/prod-mount/index'),
    meta: { title: '产量统计' }
  }, {
    path: 'sales-account',
    name: '营业额统计',
    component: () =>
                import('@/views/operational-analysis/sales-account/index'),
    meta: { title: '营业额统计' }
  },
  {
    path: 'picture',
    name: '设备生产查询',
    component: () =>
                    import('@/views/operational-analysis/picture/index'),
    meta: { title: '设备生产查询' }
  }
  ]
},
{
  path: '/rent-manager',
  redirect: '/rent-manager/index',
  component: Layout,
  meta: { title: '租赁管理', icon: 'rentmanager' },
  children: [{
    path: 'rent-message',
    name: '租赁信息',
    component: () =>
                import('@/views/rent-manager/rent-message/index'),
    meta: { title: '租赁信息' }
  },
  {
    path: 'deploy',
    name: '地图预览',
    component: () =>
                    import('@/views/rent-manager/map-preview/index'),
    meta: { title: '地图预览' }
  }, {
    path: 'store-message',
    name: '仓库信息',
    hidden: true,
    component: () =>
                import('@/views/rent-manager/store-message/index'),
    meta: { title: '仓库信息' }
  }, {
    path: 'lock-rule',
    name: '锁机策略',
    hidden: true,
    component: () =>
                import('@/views/rent-manager/lock-rule/index'),
    meta: { title: '锁机策略' }
  }]
},
{
  path: '/message-information',
  component: Layout,
  redirect: '/message-information/index',
  meta: { title: '信息与资料', icon: 'equitment-manager' },
  children: [{
    path: 'equitment-message',
    name: '设备信息',
    component: () =>
                    import('@/views/message-information/equitment-message/index'),
    meta: { title: '设备信息' }
  }, {
    path: 'customer-message',
    name: '客户信息',
    component: () =>
                import('@/views/message-information/customer-message/index'),
    meta: { title: '客户信息' }
  }, {
    path: 'cacula-methods',
    name: '计费方式',
    component: () =>
                import('@/views/message-information/cacula-methods/index'),
    meta: { title: '计费方式' }
  },
  {
    path: 'equitment-repair',
    name: '设备维修信息',
    component: () =>
                    import('@/views/message-information/equitment-repair/index'),
    meta: { title: '设备维修信息' }
  },
  {
    path: 'equitment-scrapped',
    name: '设备报废',
    hidden: true,
    component: () =>
                    import('@/views/message-information/equitment-scrapped/index'),
    meta: { title: '设备报废' }
  }, {
    path: 'product-stat',
    name: '生产计划信息',
    component: () =>
                import('@/views/message-information/product-stat/index'),
    meta: { title: '生产计划信息' }
  }, {
    path: 'product-type',
    name: '产品类型',
    component: () =>
                import('@/views/message-information/product-type/index'),
    meta: { title: '产品类型' }
  }]
},
{
  path: '/system-manager',
  redirect: '/system-manager/index',
  component: Layout,
  meta: { title: '系统管理', icon: 'setting' },
  children: [{
    path: 'sysmenu',
    name: '菜单信息',
    component: () =>
                import('@/views/system-manager/sysmenu/index'),
    meta: { title: '菜单信息' }
  }, {
    path: 'users',
    name: '用户管理',
    component: () =>
                import('@/views/system-manager/users/index'),
    meta: { title: '用户管理' }
  }, {
    path: 'sysrole',
    name: '角色管理',
    component: () =>
                import('@/views/system-manager/sysrole/index'),
    meta: { title: '角色管理' }
  }]
},

{ path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
